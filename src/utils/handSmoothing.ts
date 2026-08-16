import { Landmark, SmoothedHand, HandGesture, CircleFilter, FendaFilter, ARState, DualHandInteraction, FendaQuad } from '../types';

export const CIRCLE_FILTERS: CircleFilter[] = [
  'MYSTIC_MANDALA',       // 1. Mandala Rúnica Doutor Estranho
  'COSMIC_VORTEX',        // 2. Vórtice Cósmico
  'PLASMA_CHAKRAM',       // 3. Chakram de Plasma
  'DIMENSIONAL_PORTAL',   // 4. Portal Dimensional
  'SACRED_RINGS',         // 5. Anéis Sagrados
  'SOLAR_RUNIC_LOTUS',    // 6. Lótus Rúnica Solar
  'CYBER_TECH_MATRIX',    // 7. Núcleo Cibernético HUD
  'ETHEREAL_SUPERNOVA',   // 8. Supernova Etérea
  'CELESTIAL_CHRONO',     // 9. Astrolábio Cronos Sagrado
  'DRAGON_SEAL_VORTEX',   // 10. Selo do Dragão Arcano
];

export const FENDA_FILTERS: FendaFilter[] = [
  'FENDA_PRISMA',        // Prisma Pop-Art / Térmico (Foto de Referência)
  'FENDA_COSMICA',       // Inversão Cósmica Violeta com Poeira Estelar
  'FENDA_QUANTICA',      // Visor Matrix Quântico com Scanlines
  'FENDA_NEGATIVO',      // Eletro-Negativo de Alto Contraste
  'FENDA_MANDALA',       // Geometria Sagrada e Runas na Fenda
];

interface TrackedHandState {
  hand: SmoothedHand;
  lastSeen: number;
}

export class CircleHandTracker {
  private trackedHands: Map<number, TrackedHandState> = new Map();
  private smoothingFactor = 0.65;
  private currentFilterIndex = 0;
  private currentFendaFilterIndex = 0;
  private lastFilterSwitchTime = 0;
  private wasVSignDetected = false;

  // Persistência e Interpolação da Fenda para NUNCA piscar
  private smoothedFendaQuad: FendaQuad | null = null;
  private lastFendaSeenTime = 0;
  private fendaSmoothingFactor = 0.75; // Alta suavização para estabilidade sólida

  public setSmoothing(factor: number) {
    this.smoothingFactor = Math.max(0.05, Math.min(0.95, factor));
  }

  public setFilter(filter: CircleFilter) {
    const idx = CIRCLE_FILTERS.indexOf(filter);
    if (idx !== -1) {
      this.currentFilterIndex = idx;
    }
  }

  public setFendaFilter(filter: FendaFilter) {
    const idx = FENDA_FILTERS.indexOf(filter);
    if (idx !== -1) {
      this.currentFendaFilterIndex = idx;
    }
  }

  // Detecção anatômica dos gestos
  private detectGestures(lm: Landmark[]): { 
    isVSign: boolean; 
    isThumbIndexActive: boolean; 
    isLShape: boolean;
    isClosedFist: boolean;
    thumbIndexDistance: number;
    gesture: HandGesture;
  } {
    if (!lm || lm.length < 21) {
      return { 
        isVSign: false, 
        isThumbIndexActive: false, 
        isLShape: false, 
        isClosedFist: false,
        thumbIndexDistance: 100, 
        gesture: 'NONE' 
      };
    }

    const wrist = lm[0];
    const thumbTip = lm[4];
    const indexTip = lm[8];
    const middleTip = lm[12];
    const ringTip = lm[16];
    const pinkyTip = lm[20];

    const indexPip = lm[6];
    const middlePip = lm[10];
    const ringPip = lm[14];
    const pinkyPip = lm[18];

    const dist = (p1: Landmark, p2: Landmark) => Math.hypot(p1.x - p2.x, p1.y - p2.y);

    const isExtended = (tip: Landmark, pip: Landmark) => dist(tip, wrist) > dist(pip, wrist) * 1.15;
    const isFolded = (tip: Landmark, pip: Landmark) => dist(tip, wrist) < dist(pip, wrist) * 1.05;

    const indexExt = isExtended(indexTip, indexPip);
    const middleExt = isExtended(middleTip, middlePip);
    const ringExt = isFolded(ringTip, ringPip);
    const pinkyExt = isFolded(pinkyTip, pinkyPip);

    const indexFolded = isFolded(indexTip, indexPip);
    const middleFolded = isFolded(middleTip, middlePip);

    // Detecção de Mão Fechada (Fist / Punho Fechado)
    const isClosedFist = indexFolded && middleFolded && ringExt && pinkyExt;

    // 1. Gesto V (Sinal da Paz: Indicador e Médio levantados em V, anelar e mínimo dobrados)
    const isVSign = indexExt && middleExt && ringExt && pinkyExt;

    // 2. Gesto Indicador + Polegar (Aproximação / Pinça)
    // No modo Esferas: não ativa se a mão estiver em punho fechado
    const thumbIndexDistance = dist(thumbTip, indexTip);
    const isThumbIndexActive = !isClosedFist && thumbIndexDistance < 0.28 && (indexExt || dist(indexTip, wrist) > dist(indexPip, wrist) * 0.95);

    // 3. Gesto L (Indicador levantado, polegar esticado em ângulo)
    const isThumbExt = dist(thumbTip, wrist) > dist(lm[2], wrist) * 1.15;
    const isLShape = indexExt && isThumbExt && ringExt && pinkyExt;

    let gesture: HandGesture = 'NONE';
    if (isClosedFist) gesture = 'FIST';
    else if (isVSign) gesture = 'V_SIGN';
    else if (isLShape) gesture = 'FRAME_GESTURE';
    else if (isThumbIndexActive) gesture = 'THUMB_INDEX_PINCH';

    return { isVSign, isThumbIndexActive, isLShape, isClosedFist, thumbIndexDistance, gesture };
  }

  public update(
    rawDetections: { landmarks: Landmark[]; handedness: 'Left' | 'Right'; score: number }[],
    width: number,
    height: number,
    mirror: boolean,
    now: number,
    currentRenderMode: 'MODO_FENDA' | 'MODO_ESFERAS' | 'MODO_CONEXAO' | 'MODO_DETECCAO_PURA' = 'MODO_ESFERAS',
    isEffectLocked: boolean = false
  ): { hands: SmoothedHand[]; arState: ARState } {
    let anyVSignNow = false;

    // 1. Atualizar ou associar detecções às mãos rastreadas
    const matchedTrackIds = new Set<number>();

    rawDetections.forEach((det, idx) => {
      // Normalizar coordenadas brutas
      const rawPoints: Landmark[] = det.landmarks.map((pt) => {
        let x = pt.x * width;
        if (mirror) {
          x = width - x;
        }
        return {
          x,
          y: pt.y * height,
          z: pt.z,
        };
      });

      // Encontrar a mão rastreada mais próxima para evitar troca de IDs
      let bestTrackId = idx;
      let minDistance = 999999;

      this.trackedHands.forEach((state, trackId) => {
        if (!matchedTrackIds.has(trackId)) {
          const currentWrist = rawPoints[0];
          const prevWrist = state.hand.wrist;
          const d = Math.hypot(currentWrist.x - prevWrist.x, currentWrist.y - prevWrist.y);
          if (d < minDistance) {
            minDistance = d;
            bestTrackId = trackId;
          }
        }
      });

      // Se a distância for plausível (< 350px), associa ao ID existente, senão cria novo
      const trackIdToUse = (minDistance < 350 && !matchedTrackIds.has(bestTrackId)) ? bestTrackId : idx;
      matchedTrackIds.add(trackIdToUse);

      const existingState = this.trackedHands.get(trackIdToUse);
      const existing = existingState?.hand;

      // Suavização exponencial a 60 FPS
      const alpha = 1.0 - this.smoothingFactor;
      const smoothedPoints: Landmark[] = rawPoints.map((raw, i) => {
        if (!existing || !existing.smoothedLandmarks[i]) return { ...raw };
        const prev = existing.smoothedLandmarks[i];
        return {
          x: prev.x + (raw.x - prev.x) * alpha,
          y: prev.y + (raw.y - prev.y) * alpha,
          z: prev.z + (raw.z - prev.z) * alpha,
        };
      });

      // Velocidade
      let vx = 0;
      let vy = 0;
      if (existing) {
        vx = smoothedPoints[0].x - existing.wrist.x;
        vy = smoothedPoints[0].y - existing.wrist.y;
      }
      const speed = Math.hypot(vx, vy);

      // Análise dos gestos
      const gestureData = this.detectGestures(det.landmarks);
      if (gestureData.isVSign) {
        anyVSignNow = true;
      }

      const thumbTip = smoothedPoints[4];
      const indexTip = smoothedPoints[8];
      const middleTip = smoothedPoints[12];
      const wrist = smoothedPoints[0];
      const palmCenter = smoothedPoints[9];

      const thumbIndexCenter = {
        x: (thumbTip.x + indexTip.x) / 2,
        y: (thumbTip.y + indexTip.y) / 2,
      };

      const pixelDist = Math.hypot(thumbTip.x - indexTip.x, thumbTip.y - indexTip.y);

      const hand: SmoothedHand = {
        id: trackIdToUse,
        rawLandmarks: rawPoints,
        smoothedLandmarks: smoothedPoints,
        velocity: { vx, vy, speed },
        handedness: det.handedness,
        score: det.score,
        gesture: gestureData.gesture,
        thumbTip: { x: thumbTip.x, y: thumbTip.y },
        indexTip: { x: indexTip.x, y: indexTip.y },
        middleTip: { x: middleTip.x, y: middleTip.y },
        wrist: { x: wrist.x, y: wrist.y },
        palmCenter: { x: palmCenter.x, y: palmCenter.y },
        isThumbIndexActive: gestureData.isThumbIndexActive,
        thumbIndexDistance: pixelDist,
        thumbIndexCenter,
        isVSign: gestureData.isVSign,
        isLShape: gestureData.isLShape,
        isClosedFist: gestureData.isClosedFist,
      };

      this.trackedHands.set(trackIdToUse, { hand, lastSeen: now });
    });

    // 2. Persistência de quadros (Memory Persistence de 400ms):
    // Se a IA perder a mão por 1 ou 2 quadros durante um movimento rápido, mantemos a mão viva suavemente
    const currentHands: SmoothedHand[] = [];
    const MAX_HAND_LIFETIME = 450; // ms

    this.trackedHands.forEach((state, trackId) => {
      const age = now - state.lastSeen;
      if (age < MAX_HAND_LIFETIME) {
        currentHands.push(state.hand);
      } else {
        this.trackedHands.delete(trackId);
      }
    });

    // Ordenar mãos por x para consistência espacial
    currentHands.sort((a, b) => a.palmCenter.x - b.palmCenter.x);

    // 3. Processar mudança de filtro com o gesto de 'V'
    let filterSwitched = false;
    if (anyVSignNow && !this.wasVSignDetected && (now - this.lastFilterSwitchTime > 800)) {
      if (!isEffectLocked) {
        if (currentRenderMode === 'MODO_FENDA') {
          this.currentFendaFilterIndex = (this.currentFendaFilterIndex + 1) % FENDA_FILTERS.length;
        } else {
          this.currentFilterIndex = (this.currentFilterIndex + 1) % CIRCLE_FILTERS.length;
        }
        this.lastFilterSwitchTime = now;
        filterSwitched = true;
      }
      this.wasVSignDetected = true; // Still register the gesture, but do nothing if locked
    } else if (!anyVSignNow) {
      this.wasVSignDetected = false;
    }

    const activeFilter = CIRCLE_FILTERS[this.currentFilterIndex];
    const activeFendaFilter = FENDA_FILTERS[this.currentFendaFilterIndex];

    // 4. Detecção e Interpolação da FENDA com Anti-Flicker (Anti-Piscada)
    const dualHand: DualHandInteraction = {
      isDualActive: currentHands.length >= 2,
      isFendaActive: false,
      fendaQuad: null,
      isMergingShield: false,
      shieldCenter: { x: width / 2, y: height / 2 },
      handDistance: 9999,
    };

    let targetQuad: FendaQuad | null = null;

    if (currentHands.length >= 2) {
      const h1 = currentHands[0];
      const h2 = currentHands[1];
      const hDist = Math.hypot(h1.palmCenter.x - h2.palmCenter.x, h1.palmCenter.y - h2.palmCenter.y);
      dualHand.handDistance = hDist;
      dualHand.shieldCenter = {
        x: (h1.palmCenter.x + h2.palmCenter.x) / 2,
        y: (h1.palmCenter.y + h2.palmCenter.y) / 2,
      };

      // Fusão no modo esferas (aumentado limite de distância e relaxado requisito de pinça)
      if (hDist < 400 && !h1.isClosedFist && !h2.isClosedFist) {
        dualHand.isMergingShield = true;
      }

      // Mão Esquerda e Direita no espaço
      const handLeft = h1.palmCenter.x <= h2.palmCenter.x ? h1 : h2;
      const handRight = h1.palmCenter.x <= h2.palmCenter.x ? h2 : h1;

      // Presilha nos 4 dedos (Indicadores no topo, Polegares na base):
      const leftUpper = handLeft.indexTip.y <= handLeft.thumbTip.y ? handLeft.indexTip : handLeft.thumbTip;
      const leftLower = handLeft.indexTip.y > handLeft.thumbTip.y ? handLeft.indexTip : handLeft.thumbTip;

      const rightUpper = handRight.indexTip.y <= handRight.thumbTip.y ? handRight.indexTip : handRight.thumbTip;
      const rightLower = handRight.indexTip.y > handRight.thumbTip.y ? handRight.indexTip : handRight.thumbTip;

      const pTL = { x: leftUpper.x, y: leftUpper.y };
      const pTR = { x: rightUpper.x, y: rightUpper.y };
      const pBR = { x: rightLower.x, y: rightLower.y };
      const pBL = { x: leftLower.x, y: leftLower.y };

      const cx = (pTL.x + pTR.x + pBR.x + pBL.x) / 4;
      const cy = (pTL.y + pTR.y + pBR.y + pBL.y) / 4;
      const fWidth = Math.hypot(pTR.x - pTL.x, pTR.y - pTL.y);
      const fHeight = Math.hypot(pBL.x - pTL.x, pBL.y - pTL.y);

      targetQuad = {
        pTL,
        pTR,
        pBR,
        pBL,
        center: { x: cx, y: cy },
        width: Math.max(30, fWidth),
        height: Math.max(20, fHeight),
      };
      this.lastFendaSeenTime = now;
    } else if (currentHands.length === 1 && currentRenderMode === 'MODO_FENDA') {
      // SUPORTE PARA 1 MÃO NO MODO FENDA: Visor Estável
      const h = currentHands[0];
      const p1 = h.thumbTip;
      const p2 = h.indexTip;
      const dx = p2.x - p1.x;
      const dy = p2.y - p1.y;
      const dist = Math.hypot(dx, dy);
      
      const span = Math.max(80, dist * 1.7);
      const angle = Math.atan2(dy, dx);
      const perpX = -Math.sin(angle) * (span * 0.55);
      const perpY = Math.cos(angle) * (span * 0.55);

      const pTL = { x: p1.x - perpX, y: p1.y - perpY };
      const pTR = { x: p2.x - perpX, y: p2.y - perpY };
      const pBR = { x: p2.x + perpX, y: p2.y + perpY };
      const pBL = { x: p1.x + perpX, y: p1.y + perpY };

      const cx = (pTL.x + pTR.x + pBR.x + pBL.x) / 4;
      const cy = (pTL.y + pTR.y + pBR.y + pBL.y) / 4;
      const fWidth = Math.hypot(pTR.x - pTL.x, pTR.y - pTL.y);
      const fHeight = Math.hypot(pBL.x - pTL.x, pBL.y - pTL.y);

      targetQuad = {
        pTL,
        pTR,
        pBR,
        pBL,
        center: { x: cx, y: cy },
        width: Math.max(30, fWidth),
        height: Math.max(20, fHeight),
      };
      this.lastFendaSeenTime = now;
    }

    // 5. Suavização e Persistência do Quad da Fenda (Garante 0% de piscadas)
    if (targetQuad) {
      if (!this.smoothedFendaQuad) {
        this.smoothedFendaQuad = { ...targetQuad };
      } else {
        const fa = 1.0 - this.fendaSmoothingFactor; // Interpolação suave
        const smoothPt = (pCurrent: { x: number; y: number }, pTarget: { x: number; y: number }) => ({
          x: pCurrent.x + (pTarget.x - pCurrent.x) * fa,
          y: pCurrent.y + (pTarget.y - pCurrent.y) * fa,
        });

        this.smoothedFendaQuad = {
          pTL: smoothPt(this.smoothedFendaQuad.pTL, targetQuad.pTL),
          pTR: smoothPt(this.smoothedFendaQuad.pTR, targetQuad.pTR),
          pBR: smoothPt(this.smoothedFendaQuad.pBR, targetQuad.pBR),
          pBL: smoothPt(this.smoothedFendaQuad.pBL, targetQuad.pBL),
          center: smoothPt(this.smoothedFendaQuad.center, targetQuad.center),
          width: this.smoothedFendaQuad.width + (targetQuad.width - this.smoothedFendaQuad.width) * fa,
          height: this.smoothedFendaQuad.height + (targetQuad.height - this.smoothedFendaQuad.height) * fa,
        };
      }
      dualHand.isFendaActive = true;
      dualHand.fendaQuad = this.smoothedFendaQuad;
    } else {
      // Se não detectou alvo no quadro atual, mantém o último quad válido por até 500ms
      const fendaAge = now - this.lastFendaSeenTime;
      if (this.smoothedFendaQuad && fendaAge < 500 && currentHands.length > 0) {
        dualHand.isFendaActive = true;
        dualHand.fendaQuad = this.smoothedFendaQuad;
      } else if (fendaAge >= 500) {
        this.smoothedFendaQuad = null;
      }
    }

    const arState: ARState = {
      activeFilter,
      activeFendaFilter,
      hands: currentHands,
      dualHand,
      filterSwitchTriggered: filterSwitched,
      filterSwitchTime: this.lastFilterSwitchTime,
      conjureIntensity: currentHands.some(h => (h.isThumbIndexActive || h.isLShape || (currentRenderMode === 'MODO_FENDA' && !h.isClosedFist))) ? 1.0 : 0.0,
    };

    return { hands: currentHands, arState };
  }
}
