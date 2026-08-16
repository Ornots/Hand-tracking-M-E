import React, { useEffect, useRef, useState, useCallback } from 'react';
import { FilesetResolver, HandLandmarker } from '@mediapipe/tasks-vision';
import { Hands, Results as HandsResults } from '@mediapipe/hands';
import { AppSettings, SmoothedHand, Landmark, CircleFilter, FendaFilter } from '../types';
import { CircleHandTracker } from '../utils/handSmoothing';
import { CircleParticleSystem } from '../utils/particleSystem';
import { CircleEffectsEngine, FILTER_METADATA, FENDA_METADATA } from '../utils/effectsEngine';
import { circleAudio } from '../utils/audioSynth';
import { Camera, AlertCircle } from 'lucide-react';

interface CircleARCanvasProps {
  settings: AppSettings;
  isCameraOn: boolean;
  onFilterSwitched?: (filter: CircleFilter) => void;
  onFendaFilterSwitched?: (filter: FendaFilter) => void;
  onHandsDetected?: (hands: SmoothedHand[]) => void;
  onFpsUpdate?: (fps: number) => void;
  onCameraStatusChange?: (active: boolean) => void;
}

let sharedLandmarkerPromise: Promise<HandLandmarker | null> | null = null;

async function getSharedHandLandmarker(): Promise<HandLandmarker | null> {
  if (sharedLandmarkerPromise) return sharedLandmarkerPromise;

  sharedLandmarkerPromise = (async () => {
    try {
      const origin = typeof window !== 'undefined' ? window.location.pathname.replace(/\/(index\.html)?$/, '') : '';
      let vision = null;
      try {
        vision = await FilesetResolver.forVisionTasks(`${origin}/tasks-vision-wasm`);
      } catch {
        try {
          vision = await FilesetResolver.forVisionTasks('https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14/wasm');
        } catch {}
      }

      if (!vision) return null;

      let modelBuffer: Uint8Array | null = null;
      try {
        const localRes = await fetch(`${origin}/models/hand_landmarker.task`);
        if (localRes.ok) {
          const ab = await localRes.arrayBuffer();
          if (ab.byteLength > 1000000) {
            modelBuffer = new Uint8Array(ab);
          }
        }
      } catch {}

      if (!modelBuffer) {
        try {
          const cdnRes = await fetch('https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task');
          if (cdnRes.ok) {
            const ab = await cdnRes.arrayBuffer();
            modelBuffer = new Uint8Array(ab);
          }
        } catch {}
      }

      if (modelBuffer) {
        try {
          return await HandLandmarker.createFromOptions(vision, {
            baseOptions: {
              modelAssetBuffer: modelBuffer,
              delegate: 'GPU',
            },
            runningMode: 'VIDEO',
            numHands: 2,
            minHandDetectionConfidence: 0.25,
            minHandPresenceConfidence: 0.25,
            minTrackingConfidence: 0.25,
          });
        } catch {
          return await HandLandmarker.createFromOptions(vision, {
            baseOptions: {
              modelAssetBuffer: modelBuffer,
              delegate: 'CPU',
            },
            runningMode: 'VIDEO',
            numHands: 2,
            minHandDetectionConfidence: 0.25,
            minHandPresenceConfidence: 0.25,
            minTrackingConfidence: 0.25,
          });
        }
      }

      return null;
    } catch (err) {
      console.warn('HandLandmarker init fallback:', err);
      return null;
    }
  })();

  return sharedLandmarkerPromise;
}

function createFallbackHands(): Hands | null {
  try {
    const hands = new Hands({
      locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands@0.4.1675469240/${file}`,
    });

    hands.setOptions({
      maxNumHands: 2,
      modelComplexity: 1,
      minDetectionConfidence: 0.25,
      minTrackingConfidence: 0.25,
    });

    return hands;
  } catch (err) {
    console.warn('Fallback hands creation failed:', err);
    return null;
  }
}

// Demonstração suave se a câmera ainda não foi iniciada
function generateDemoHands(cx: number, cy: number, time: number): { hand1: Landmark[]; hand2: Landmark[] } {
  const scale = 140;
  const cycle = (time * 0.001) % 10;
  const isVSign = cycle > 6.5;

  const h1Center = { x: cx, y: cy + Math.sin(time * 0.002) * 15 };

  const makeHand = (center: { x: number; y: number }): Landmark[] => {
    const pts: Landmark[] = [];
    pts.push({ x: center.x, y: center.y + 0.35 * scale, z: 0 }); // 0: Pulso

    // 1-4: Polegar
    pts.push({ x: center.x - 0.15 * scale, y: center.y + 0.2 * scale, z: 0 });
    pts.push({ x: center.x - 0.22 * scale, y: center.y + 0.05 * scale, z: 0 });
    pts.push({ x: center.x - 0.2 * scale, y: center.y - 0.08 * scale, z: 0 });
    // Dedo polegar curvado em direção ao indicador
    pts.push({ x: center.x - (isVSign ? 0.22 : 0.06) * scale, y: center.y - (isVSign ? 0.1 : 0.16) * scale, z: 0 });

    // 5-8: Indicador
    pts.push({ x: center.x - 0.08 * scale, y: center.y + 0.15 * scale, z: 0 });
    pts.push({ x: center.x - 0.06 * scale, y: center.y + 0.02 * scale, z: 0 });
    pts.push({ x: center.x - 0.04 * scale, y: center.y - 0.1 * scale, z: 0 });
    // Ponta do indicador tocando ou fazendo V
    pts.push({ x: center.x + (isVSign ? -0.12 : 0.04) * scale, y: center.y - 0.28 * scale, z: 0 });

    // 9-12: Médio (levantado se V, dobrado se pinch)
    pts.push({ x: center.x + 0.02 * scale, y: center.y + 0.15 * scale, z: 0 });
    pts.push({ x: center.x + 0.04 * scale, y: center.y + 0.02 * scale, z: 0 });
    pts.push({ x: center.x + 0.05 * scale, y: center.y - (isVSign ? 0.12 : -0.02) * scale, z: 0 });
    pts.push({ x: center.x + (isVSign ? 0.12 : 0.06) * scale, y: center.y - (isVSign ? 0.28 : -0.08) * scale, z: 0 });

    // 13-16: Anelar (dobrado)
    pts.push({ x: center.x + 0.12 * scale, y: center.y + 0.16 * scale, z: 0 });
    pts.push({ x: center.x + 0.13 * scale, y: center.y + 0.06 * scale, z: 0 });
    pts.push({ x: center.x + 0.14 * scale, y: center.y + 0.02 * scale, z: 0 });
    pts.push({ x: center.x + 0.15 * scale, y: center.y + 0.01 * scale, z: 0 });

    // 17-20: Mínimo (dobrado)
    pts.push({ x: center.x + 0.2 * scale, y: center.y + 0.18 * scale, z: 0 });
    pts.push({ x: center.x + 0.21 * scale, y: center.y + 0.09 * scale, z: 0 });
    pts.push({ x: center.x + 0.22 * scale, y: center.y + 0.05 * scale, z: 0 });
    pts.push({ x: center.x + 0.23 * scale, y: center.y + 0.02 * scale, z: 0 });

    return pts;
  };

  return {
    hand1: makeHand(h1Center),
    hand2: makeHand({ x: h1Center.x + 120, y: h1Center.y }),
  };
}

export const CircleARCanvas: React.FC<CircleARCanvasProps> = ({
  settings,
  isCameraOn,
  onFilterSwitched,
  onFendaFilterSwitched,
  onHandsDetected,
  onFpsUpdate,
  onCameraStatusChange,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [cameraActive, setCameraActive] = useState<boolean>(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [isRequestingCamera, setIsRequestingCamera] = useState<boolean>(false);

  const handLandmarkerRef = useRef<HandLandmarker | null>(null);
  const fallbackHandsRef = useRef<Hands | null>(null);

  const trackerRef = useRef<CircleHandTracker>(new CircleHandTracker());
  const particlesRef = useRef<CircleParticleSystem>(new CircleParticleSystem());
  const effectsRef = useRef<CircleEffectsEngine>(new CircleEffectsEngine());

  const latestDetectionsRef = useRef<{ landmarks: Landmark[]; handedness: 'Left' | 'Right'; score: number }[]>([]);
  const isInferringRef = useRef<boolean>(false);
  const lastInferenceTimestampRef = useRef<number>(0);
  const frameCountRef = useRef<number>(0);
  const lastFpsTimeRef = useRef<number>(performance.now());
  const lastFrameTimeRef = useRef<number>(performance.now());
  const animFrameRef = useRef<number | null>(null);
  const wasConjuringRef = useRef<boolean>(false);

  // Inicializa HandLandmarker
  useEffect(() => {
    let mounted = true;

    getSharedHandLandmarker().then((landmarker) => {
      if (mounted) {
        if (landmarker) {
          handLandmarkerRef.current = landmarker;
        } else {
          const fb = createFallbackHands();
          if (fb) {
            fb.onResults((results: HandsResults) => {
              if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
                latestDetectionsRef.current = results.multiHandLandmarks.map((lms, idx) => ({
                  landmarks: lms.map((p) => ({ x: p.x, y: p.y, z: p.z })),
                  handedness: (results.multiHandedness?.[idx]?.label as 'Left' | 'Right') || 'Right',
                  score: results.multiHandedness?.[idx]?.score || 0.95,
                }));
              }
            });
            fallbackHandsRef.current = fb;
          }
        }
      }
    });

    return () => {
      mounted = false;
      if (fallbackHandsRef.current) {
        fallbackHandsRef.current.close();
      }
    };
  }, []);

  // Iniciar Câmera
  const startCamera = useCallback(async () => {
    setIsRequestingCamera(true);
    setCameraError(null);

    try {
      if (videoRef.current && videoRef.current.srcObject) {
        const currentStream = videoRef.current.srcObject as MediaStream;
        currentStream.getTracks().forEach((t) => t.stop());
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'user',
          width: { ideal: 1280 },
          height: { ideal: 720 },
          frameRate: { ideal: 60, min: 30 },
        },
        audio: false,
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
        setCameraActive(true);
        onCameraStatusChange?.(true);
      }
    } catch (err: unknown) {
      console.warn('Erro ao obter câmera:', err);
      const errMsg = err instanceof Error ? err.message : 'Permissão negada para câmera';
      setCameraError(errMsg);
      setCameraActive(false);
      onCameraStatusChange?.(false);
    } finally {
      setIsRequestingCamera(false);
    }
  }, [onCameraStatusChange]);

  const stopCamera = useCallback(() => {
    if (videoRef.current && videoRef.current.srcObject) {
      const currentStream = videoRef.current.srcObject as MediaStream;
      currentStream.getTracks().forEach((t) => t.stop());
      videoRef.current.srcObject = null;
    }
    setCameraActive(false);
    onCameraStatusChange?.(false);
  }, [onCameraStatusChange]);

  // Gerenciar estado da câmera baseado na prop
  useEffect(() => {
    if (isCameraOn) {
      startCamera();
    } else {
      stopCamera();
    }
    
    return () => {
      stopCamera();
    };
  }, [isCameraOn, startCamera, stopCamera]);

  // Loop de Visão Computacional Contínuo
  useEffect(() => {
    let visionRunning = true;

    const runVisionInference = async () => {
      if (!visionRunning) return;

      const video = videoRef.current;
      const landmarker = handLandmarkerRef.current;
      const fallbackHands = fallbackHandsRef.current;

      if (cameraActive && video && video.readyState >= 2 && !isInferringRef.current) {
        const now = performance.now();
        // Dispara inferência o mais rápido possível (a cada ~15-20ms)
        if (now - lastInferenceTimestampRef.current >= 15) {
          lastInferenceTimestampRef.current = now;
          isInferringRef.current = true;

          try {
            if (landmarker) {
              const results = landmarker.detectForVideo(video, now);
              if (results && results.landmarks && results.landmarks.length > 0) {
                latestDetectionsRef.current = results.landmarks.map((lms, idx) => ({
                  landmarks: lms,
                  handedness: (results.handedness?.[idx]?.[0]?.categoryName as 'Left' | 'Right') || 'Right',
                  score: results.handedness?.[idx]?.[0]?.score || 0.95,
                }));
              }
            } else if (fallbackHands) {
              await fallbackHands.send({ image: video });
            }
          } catch {}

          isInferringRef.current = false;
        }
      }

      setTimeout(runVisionInference, 10);
    };

    runVisionInference();

    return () => {
      visionRunning = false;
    };
  }, [cameraActive]);

  // Loop de Renderização a 60 FPS
  useEffect(() => {
    let animActive = true;

    const render = (now: number) => {
      if (!animActive) return;

      const canvas = canvasRef.current;
      const container = containerRef.current;
      const deltaTime = now - lastFrameTimeRef.current;
      lastFrameTimeRef.current = now;

      if (canvas && container) {
        const width = container.clientWidth || 1280;
        const height = container.clientHeight || 720;

        if (canvas.width !== width || canvas.height !== height) {
          canvas.width = width;
          canvas.height = height;
        }

        const ctx = canvas.getContext('2d', { alpha: true });
        if (ctx) {
          ctx.clearRect(0, 0, width, height);

          // Se a câmera não estiver ativa, gerar mãos de demonstração suaves
          if (!cameraActive) {
            const demo = generateDemoHands(width / 2, height / 2, now);
            latestDetectionsRef.current = [
              { landmarks: demo.hand1, handedness: 'Right', score: 0.99 },
            ];
          }

          // Atualizar rastreador e gestos
          trackerRef.current.setSmoothing(settings.smoothingFactor);
          trackerRef.current.setFilter(settings.activeFilter);
          trackerRef.current.setFendaFilter(settings.activeFendaFilter);

          const { hands, arState } = trackerRef.current.update(
            latestDetectionsRef.current,
            width,
            height,
            cameraActive ? settings.mirrorCamera : false,
            now,
            settings.renderMode,
            settings.isEffectLocked || false
          );

          // 1. Troca de Filtro disparada pelo gesto 'V'
          if (arState.filterSwitchTriggered) {
            const switchedName = settings.renderMode === 'MODO_FENDA' 
              ? (FENDA_METADATA[arState.activeFendaFilter]?.name || 'Filtro Fenda')
              : (FILTER_METADATA[arState.activeFilter]?.name || 'Filtro Circular');
            effectsRef.current.triggerFilterSwitch(switchedName);

            if (settings.audioEnabled) {
              circleAudio.playFilterSwitch();
            }
            if (settings.renderMode === 'MODO_FENDA') {
              onFendaFilterSwitched?.(arState.activeFendaFilter);
            } else {
              onFilterSwitched?.(arState.activeFilter);
            }
          }

          // 2. Som de conjuração ao juntar indicador e polegar
          const isConjuringNow = hands.some((h) => h.isThumbIndexActive);
          if (isConjuringNow && !wasConjuringRef.current && settings.audioEnabled) {
            circleAudio.playConjurePulse();
          }
          wasConjuringRef.current = isConjuringNow;

          // 3. Atualizar e renderizar partículas
          particlesRef.current.setMaxParticles(Math.floor(160 * settings.particleDensity));
          particlesRef.current.update(width, height);
          particlesRef.current.render(ctx);

          // 4. Renderizar Efeitos Circulares Brancos e Roxos ou Fenda
          effectsRef.current.render(
            ctx,
            videoRef.current,
            width,
            height,
            hands,
            arState.dualHand,
            settings.activeFilter,
            settings.activeFendaFilter,
            settings,
            particlesRef.current,
            deltaTime
          );

          onHandsDetected?.(hands);

          // 5. Cálculo de FPS
          frameCountRef.current++;
          if (now - lastFpsTimeRef.current >= 1000) {
            const currentFps = Math.round((frameCountRef.current * 1000) / (now - lastFpsTimeRef.current));
            onFpsUpdate?.(currentFps);
            frameCountRef.current = 0;
            lastFpsTimeRef.current = now;
          }
        }
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      animActive = false;
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [cameraActive, settings, onFilterSwitched, onFendaFilterSwitched, onHandsDetected, onFpsUpdate]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full overflow-hidden bg-slate-950 select-none flex items-center justify-center"
      id="circle-ar-container"
    >
      {/* 1. Vídeo da Webcam em Camada Nativa */}
      <video
        ref={videoRef}
        playsInline
        muted
        autoPlay
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 pointer-events-none ${
          cameraActive ? (settings.mirrorCamera ? 'scale-x-[-1] opacity-100' : 'opacity-100') : 'opacity-0'
        }`}
      />

      {/* 2. Se a câmera estiver desligada ou com erro: card circular minimalista branco e roxo */}
      {!cameraActive && (
        <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center z-0">
          <div className="w-20 h-20 rounded-full bg-purple-950/60 border-2 border-purple-500/40 flex items-center justify-center text-purple-300 mb-5 shadow-2xl shadow-purple-900/40">
            <Camera className="w-9 h-9" />
          </div>

          <h2 className="text-xl font-bold text-white mb-2 tracking-tight">
            Ativar Câmera
          </h2>
          <p className="text-sm text-purple-200/80 max-w-sm mb-6 leading-relaxed">
            Faça o sinal de <strong className="text-white">V</strong> para mudar o filtro ou aproxime o <strong className="text-white">indicador e polegar</strong> para conjurar energia circular.
          </p>

          <button
            onClick={startCamera}
            disabled={isRequestingCamera}
            className="px-6 py-3 rounded-full bg-purple-600 hover:bg-purple-500 active:scale-95 text-white font-semibold text-sm shadow-xl shadow-purple-600/30 border border-purple-400/30 flex items-center gap-2.5 transition-all cursor-pointer"
          >
            <Camera className="w-4 h-4" />
            <span>{isRequestingCamera ? 'Conectando...' : 'Iniciar Câmera'}</span>
          </button>

          {cameraError && (
            <div className="mt-4 px-4 py-2 rounded-full bg-red-950/80 border border-red-500/40 text-red-200 text-xs flex items-center gap-2">
              <AlertCircle className="w-3.5 h-3.5 text-red-400 shrink-0" />
              <span>{cameraError}</span>
            </div>
          )}
        </div>
      )}

      {/* 3. Canvas AR 2D com Efeitos a 60 FPS */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block z-10 pointer-events-none"
      />
    </div>
  );
};
