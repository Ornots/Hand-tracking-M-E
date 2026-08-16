import { useState } from 'react';
import { CircleARCanvas } from './components/CyberCanvas';
import { SettingsModal } from './components/SettingsModal';
import { GuideModal } from './components/GuideModal';
import { AppSettings, CircleFilter, FendaFilter, SmoothedHand } from './types';
import { FILTER_METADATA, FENDA_METADATA } from './utils/effectsEngine';
import { Settings, HelpCircle, Sparkles } from 'lucide-react';

export default function App() {
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [isGuideOpen, setIsGuideOpen] = useState<boolean>(false);
  const [fps, setFps] = useState<number>(60);
  const [handsCount, setHandsCount] = useState<number>(0);
  const [isConjuring, setIsConjuring] = useState<boolean>(false);

  const [settings, setSettings] = useState<AppSettings>({
    renderMode: 'MODO_ESFERAS',
    activeFilter: 'MYSTIC_MANDALA',
    activeFendaFilter: 'FENDA_PRISMA',
    activeLaserSubMode: 'LASER_CROSS_FINGERS',
    colorTheme: 'DEFAULT_PURPLE',
    customPrimaryColor: '#9333ea',
    customSecondaryColor: '#ffffff',
    customGlowColor: '#7e22ce',
    audioEnabled: true,
    audioVolume: 0.6,
    showSkeleton: false,
    mirrorCamera: true,
    smoothingFactor: 0.65,
    effectScale: 1.0,
    particleDensity: 1.0,
    rotationSpeed: 1.0,
    laserThickness: 1.0,
    laserArcJitter: 1.0,
    pureTrackingStyle: 'NEON_CYBER',
  });

  const handleUpdateSettings = (newSettings: Partial<AppSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  const handleFilterSwitched = (newFilter: CircleFilter) => {
    setSettings((prev) => ({ ...prev, activeFilter: newFilter }));
  };

  const handleFendaFilterSwitched = (newFilter: FendaFilter) => {
    setSettings((prev) => ({ ...prev, activeFendaFilter: newFilter }));
  };

  const handleHandsDetected = (hands: SmoothedHand[]) => {
    setHandsCount(hands.length);
    setIsConjuring(hands.some((h) => (h.isThumbIndexActive || h.isLShape) && !h.isClosedFist));
  };

  const getActiveFilterLabel = () => {
    if (settings.renderMode === 'MODO_DETECCAO_PURA') return 'HUD Telemetria 21-Pts';
    if (settings.renderMode === 'MODO_FENDA') {
      return FENDA_METADATA[settings.activeFendaFilter]?.name || 'Fenda Prisma';
    }
    if (settings.renderMode === 'MODO_CONEXAO') {
      const subLabels: Record<string, string> = {
        LASER_CROSS_FINGERS: 'Laser Pentagonal Dedos',
        LASER_ENERGY_BEAM: 'Raio Direcional de Energia',
        LASER_ARC_LIGHTNING: 'Relâmpagos de Alta Voltagem',
        LASER_MATRIX_WEB: 'Teia Holográfica Geométrica',
        LASER_DUAL_CONNECT: 'Laser Indicador/Polegar',
      };
      return subLabels[settings.activeLaserSubMode || 'LASER_CROSS_FINGERS'] || 'Laser Avançado';
    }
    return FILTER_METADATA[settings.activeFilter]?.name || 'Mandala Rúnica (Dr. Estranho)';
  };

  const getModeLabel = () => {
    if (settings.renderMode === 'MODO_DETECCAO_PURA') return 'Detecção da Mão';
    if (settings.renderMode === 'MODO_FENDA') return 'Modo Fenda';
    if (settings.renderMode === 'MODO_CONEXAO') return 'Laser Interativo';
    return 'Esferas & Mandalas';
  };

  return (
    <div 
      className="relative w-screen h-screen bg-slate-950 text-slate-100 overflow-hidden font-sans select-none"
      id="circle-ar-app"
    >
      {/* 1. Canto Superior Esquerdo: Nome do App em Estética Branca e Roxa */}
      <div className="absolute top-6 left-6 z-30 flex items-center pointer-events-auto">
        <div 
          className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-full border border-purple-200/80 shadow-lg shadow-purple-950/20 flex items-center gap-2.5 transition-all hover:bg-white"
          id="app-branding"
        >
          <div className="w-6 h-6 rounded-full bg-purple-600 flex items-center justify-center text-white shadow-xs">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <span className="font-bold text-slate-900 text-xs sm:text-sm tracking-tight">
            Aura <span className="text-purple-600 font-semibold">• {getModeLabel()}</span>
          </span>
        </div>
      </div>

      {/* 2. Meio do Lado Esquerdo da Tela: APENAS O BOTÃO DE CONFIGURAÇÕES */}
      <div className="absolute left-6 top-1/2 -translate-y-1/2 z-30 pointer-events-auto">
        <button
          onClick={() => setIsSettingsOpen(true)}
          title="Configurações"
          id="settings-btn"
          className="group relative w-14 h-14 rounded-full bg-white/90 hover:bg-white text-purple-700 border-2 border-purple-300/80 hover:border-purple-500 shadow-xl shadow-purple-900/30 flex items-center justify-center backdrop-blur-md transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
        >
          {/* Anel de pulso suave roxo */}
          <span className="absolute inset-0 rounded-full bg-purple-400/20 animate-ping pointer-events-none" />
          <Settings className="w-6 h-6 transition-transform duration-500 group-hover:rotate-90" />
        </button>
      </div>

      {/* 3. Canto Superior Direito: Status + Botão de Guia */}
      <div className="absolute top-6 right-6 z-30 flex items-center gap-2.5 pointer-events-auto">
        {/* Status Pills */}
        <div 
          className="hidden sm:flex bg-white/90 backdrop-blur-md px-4 py-2 rounded-full border border-purple-200/80 shadow-lg shadow-purple-950/20 items-center gap-3 text-xs font-semibold text-slate-700"
          id="status-indicators"
        >
          {/* Indicador de Rastreamento */}
          <div className="flex items-center gap-1.5">
            <span 
              className={`w-2 h-2 rounded-full transition-colors ${
                isConjuring
                  ? 'bg-purple-600 animate-pulse'
                  : handsCount > 0
                  ? 'bg-emerald-500'
                  : 'bg-slate-400'
              }`} 
            />
            <span className="text-slate-800">
              {handsCount >= 2 ? (settings.renderMode === 'MODO_FENDA' ? '2 Mãos (Fenda Fixada)' : '2 Mãos (Fusão Ativa)') : handsCount === 1 ? (settings.renderMode === 'MODO_FENDA' ? '1 Mão (Fenda Ativa)' : '1 Mão') : 'Aguardando'}
            </span>
          </div>

          <span className="text-purple-200">|</span>

          {/* Nome do Filtro Ativo */}
          <span className="text-purple-700 font-bold">
            {getActiveFilterLabel()}
          </span>

          <span className="text-purple-200">|</span>

          {/* FPS */}
          <span className="text-slate-500 font-mono text-[11px]">
            {fps} FPS
          </span>
        </div>

        {/* Botão de Guia */}
        <button
          onClick={() => setIsGuideOpen(true)}
          id="guide-btn"
          className="bg-white/90 hover:bg-white text-purple-700 hover:text-purple-900 border border-purple-200/80 px-4 py-2 rounded-full shadow-lg shadow-purple-950/20 backdrop-blur-md flex items-center gap-1.5 text-xs font-bold transition-all hover:scale-105 active:scale-95 cursor-pointer"
        >
          <HelpCircle className="w-4 h-4 text-purple-600" />
          <span>Guia</span>
        </button>
      </div>

      {/* 4. Canvas AR Central */}
      <main className="w-full h-full relative" id="ar-main-viewport">
        <CircleARCanvas
          settings={settings}
          onFilterSwitched={handleFilterSwitched}
          onFendaFilterSwitched={handleFendaFilterSwitched}
          onHandsDetected={handleHandsDetected}
          onFpsUpdate={setFps}
        />
      </main>

      {/* 5. Modais em Estética Branca e Roxa */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={settings}
        onUpdateSettings={handleUpdateSettings}
      />

      <GuideModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
      />
    </div>
  );
}
