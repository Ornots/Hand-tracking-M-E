import React, { useState } from 'react';
import { AppSettings, CircleFilter, FendaFilter, EffectRenderMode, ColorPaletteTheme } from '../types';
import { FILTER_METADATA, FENDA_METADATA, COLOR_PALETTES } from '../utils/effectsEngine';
import { 
  X, Volume2, VolumeX, Eye, FlipHorizontal, Sliders, Shield, Crop, Zap, 
  Palette, RefreshCw, Sun, Cpu, Flame, Clock, Compass, Disc, Radio, Sparkles
} from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: AppSettings;
  onUpdateSettings: (newSettings: Partial<AppSettings>) => void;
}

type TabType = 'MODES_FILTERS' | 'COLORS' | 'PHYSICS';

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  settings,
  onUpdateSettings,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('MODES_FILTERS');

  if (!isOpen) return null;

  const circleFilterList = Object.values(FILTER_METADATA);
  const fendaFilterList = Object.values(FENDA_METADATA);
  const colorThemes: { id: ColorPaletteTheme; name: string; primary: string; secondary: string }[] = [
    { id: 'DEFAULT_PURPLE', name: 'Púrpura & Branco Astral', primary: '#9333ea', secondary: '#e9d5ff' },
    { id: 'CYAN_NEON', name: 'Ciano Elétrico & Glacial', primary: '#06b6d4', secondary: '#cffafe' },
    { id: 'SOLAR_GOLD', name: 'Ouro Solar & Âmbar', primary: '#eab308', secondary: '#fef08a' },
    { id: 'CRIMSON_RUBY', name: 'Rubi Escarlate & Fogo', primary: '#e11d48', secondary: '#fecdd3' },
    { id: 'EMERALD_NATURE', name: 'Esmeralda & Jade', primary: '#10b981', secondary: '#d1fae5' },
    { id: 'COSMIC_VIOLET', name: 'Violeta Noturno', primary: '#7c3aed', secondary: '#ddd6fe' },
    { id: 'CUSTOM_RGB', name: 'Personalizado (RGB)', primary: settings.customPrimaryColor || '#9333ea', secondary: settings.customSecondaryColor || '#ffffff' },
  ];

  const getFilterIcon = (iconName: string) => {
    switch (iconName) {
      case 'Shield': return <Shield className="w-4 h-4" />;
      case 'Sparkles': return <Sparkles className="w-4 h-4" />;
      case 'Zap': return <Zap className="w-4 h-4" />;
      case 'Radio': return <Radio className="w-4 h-4" />;
      case 'Disc': return <Disc className="w-4 h-4" />;
      case 'Sun': return <Sun className="w-4 h-4" />;
      case 'Cpu': return <Cpu className="w-4 h-4" />;
      case 'Flame': return <Flame className="w-4 h-4" />;
      case 'Clock': return <Clock className="w-4 h-4" />;
      case 'Compass': return <Compass className="w-4 h-4" />;
      default: return <Sparkles className="w-4 h-4" />;
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md animate-fade-in"
      id="settings-modal-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div 
        className="w-full max-w-lg bg-white/95 text-slate-900 rounded-3xl border border-purple-200/90 shadow-2xl shadow-purple-950/40 p-5 sm:p-6 backdrop-blur-xl flex flex-col max-h-[90vh] overflow-hidden"
        id="settings-modal-container"
      >
        {/* Cabeçalho */}
        <div className="flex items-center justify-between pb-3 border-b border-purple-100">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-purple-600 text-white flex items-center justify-center shadow-md shadow-purple-600/30">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-tight">Configurações de Aura AR</h2>
              <p className="text-xs text-purple-700 font-medium">Personalize modos, cores e mandalas</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-purple-50 hover:bg-purple-100 text-purple-700 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Abas de Navegação Internas */}
        <div className="flex items-center gap-1.5 p-1 bg-purple-50 rounded-2xl my-3 border border-purple-100/80">
          <button
            onClick={() => setActiveTab('MODES_FILTERS')}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === 'MODES_FILTERS'
                ? 'bg-white text-purple-800 shadow-xs border border-purple-200/60'
                : 'text-slate-600 hover:text-purple-700'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Mandalas & Modos</span>
          </button>
          
          <button
            onClick={() => setActiveTab('COLORS')}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === 'COLORS'
                ? 'bg-white text-purple-800 shadow-xs border border-purple-200/60'
                : 'text-slate-600 hover:text-purple-700'
            }`}
          >
            <Palette className="w-3.5 h-3.5" />
            <span>Cores & Tema</span>
          </button>

          <button
            onClick={() => setActiveTab('PHYSICS')}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === 'PHYSICS'
                ? 'bg-white text-purple-800 shadow-xs border border-purple-200/60'
                : 'text-slate-600 hover:text-purple-700'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Ajustes & Câmera</span>
          </button>
        </div>

        {/* Conteúdo com Rolagem */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-1 py-1 custom-scrollbar">
          
          {/* =========================================================================
              ABA 1: MANDALAS & MODOS
             ========================================================================= */}
          {activeTab === 'MODES_FILTERS' && (
            <div className="space-y-4">
              {/* Seleção do Modo Principal */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-purple-900 block mb-2">
                  Modo de Exibição
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { mode: 'MODO_ESFERAS' as EffectRenderMode, title: 'Esferas & Mandalas', desc: '10 Mandalas e fusão em escudo', icon: Shield },
                    { mode: 'MODO_FENDA' as EffectRenderMode, title: 'Modo Fenda', desc: 'Visor nos dedos ou 1 mão', icon: Crop },
                    { mode: 'MODO_CONEXAO' as EffectRenderMode, title: 'Laser Interativo', desc: '5 submodos & alta voltagem', icon: Zap },
                    { mode: 'MODO_DETECCAO_PURA' as EffectRenderMode, title: 'Detecção da Mão', desc: 'HUD 21-pts & telemetria pura', icon: Sparkles },
                  ].map((item) => {
                    const isSelected = settings.renderMode === item.mode;
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.mode}
                        onClick={() => onUpdateSettings({ renderMode: item.mode })}
                        className={`p-2.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                          isSelected
                            ? 'bg-purple-600 text-white border-purple-600 shadow-md shadow-purple-600/30'
                            : 'bg-white hover:bg-purple-50 text-slate-800 border-purple-100'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <Icon className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-purple-600'}`} />
                          <span className={`w-2 h-2 rounded-full ${isSelected ? 'bg-white' : 'bg-purple-200'}`} />
                        </div>
                        <div>
                          <div className="font-bold text-[11px] leading-snug">{item.title}</div>
                          <div className={`text-[9px] mt-0.5 ${isSelected ? 'text-purple-100' : 'text-slate-500'}`}>{item.desc}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Opções de Submodos de Laser (Quando em MODO_CONEXAO) */}
              {settings.renderMode === 'MODO_CONEXAO' && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-purple-900">
                      Submodos Interativos do Laser (5 Opções)
                    </label>
                    <span className="text-[10px] font-semibold text-purple-600 bg-purple-100 px-2 py-0.5 rounded-full">
                      ⚡ Máxima Interatividade
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {[
                      { id: 'LASER_CROSS_FINGERS', title: 'Laser Pentagonal Entre Dedos', desc: 'Feixes conectam todas as 5 pontas dos dedos dinamicamente', icon: '🖐️' },
                      { id: 'LASER_ENERGY_BEAM', title: 'Raio Direcional de Energia', desc: 'Disparo de plasma disparado na direção do dedo indicador', icon: '💥' },
                      { id: 'LASER_ARC_LIGHTNING', title: 'Relâmpagos Alta Voltagem', desc: 'Arcos elétricos oscilantes saltando entre as pontas', icon: '⚡' },
                      { id: 'LASER_MATRIX_WEB', title: 'Teia Holográfica Geométrica', desc: 'Malha triangular conectando palma e pontas em laser', icon: '🕸️' },
                      { id: 'LASER_DUAL_CONNECT', title: 'Laser Indicador/Polegar', desc: 'Feixe tradicional com gradiente e núcleo de energia', icon: '✨' },
                    ].map((lMode) => {
                      const isSelected = (settings.activeLaserSubMode || 'LASER_CROSS_FINGERS') === lMode.id;
                      return (
                        <button
                          key={lMode.id}
                          onClick={() => onUpdateSettings({ activeLaserSubMode: lMode.id as any })}
                          className={`p-2.5 rounded-2xl border text-left flex items-start gap-2.5 transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-purple-600 text-white border-purple-600 shadow-sm'
                              : 'bg-white hover:bg-purple-50 text-slate-800 border-purple-100'
                          }`}
                        >
                          <span className="text-lg">{lMode.icon}</span>
                          <div className="flex-1">
                            <span className="block font-bold text-xs leading-tight">{lMode.title}</span>
                            <span className={`text-[10px] line-clamp-2 mt-0.5 ${isSelected ? 'text-purple-100' : 'text-slate-500'}`}>{lMode.desc}</span>
                          </div>
                          <span className={`w-2.5 h-2.5 rounded-full shrink-0 mt-1 ${isSelected ? 'bg-white ring-2 ring-purple-300' : 'bg-purple-200'}`} />
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Opções do Modo Detecção Pura (Quando em MODO_DETECCAO_PURA) */}
              {settings.renderMode === 'MODO_DETECCAO_PURA' && (
                <div className="p-3.5 rounded-2xl bg-purple-50/70 border border-purple-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold uppercase tracking-wider text-purple-900">
                      Estilo do HUD de Detecção
                    </label>
                    <span className="text-[10px] font-bold text-purple-700 bg-purple-100 px-2 py-0.5 rounded-full">
                      Zero Efeitos AR
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'NEON_CYBER', title: 'Neon Cyber HUD', desc: 'Retículos & box' },
                      { id: 'MINIMAL_CLEAN', title: 'Anatômico Clean', desc: 'Linhas nítidas' },
                      { id: 'HOLO_GLOW', title: 'Holográfico Glow', desc: 'Aura intensa' },
                    ].map((s) => {
                      const isSelected = (settings.pureTrackingStyle || 'NEON_CYBER') === s.id;
                      return (
                        <button
                          key={s.id}
                          onClick={() => onUpdateSettings({ pureTrackingStyle: s.id as any })}
                          className={`p-2 rounded-xl text-center border text-xs font-bold transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-purple-600 text-white border-purple-600 shadow-sm'
                              : 'bg-white text-slate-700 border-purple-200 hover:bg-purple-100/60'
                          }`}
                        >
                          {s.title}
                        </button>
                      );
                    })}
                  </div>
                  <p className="text-[11px] text-slate-600">
                    O modo <strong>Detecção da Mão</strong> renderiza exclusivamente a estrutura anatômica de 21 pontos do MediaPipe, giroscópio de palma, retículos de pontas dos dedos e telemetria de distância entre as duas mãos sem mandalas ou filtros visuais intrusivos.
                  </p>
                </div>
              )}

              {/* 10 Mandalas e Círculos (Modo Esferas e Laser) */}
              {settings.renderMode === 'MODO_ESFERAS' && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-purple-900">
                      Coleção de Mandalas & Círculos (10 Opções)
                    </label>
                    <span className="text-[10px] font-semibold text-purple-600 bg-purple-100 px-2 py-0.5 rounded-full">
                      ✌️ Sinal de V troca
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {circleFilterList.map((f) => {
                      const isSelected = settings.activeFilter === f.id;
                      return (
                        <button
                          key={f.id}
                          onClick={() => onUpdateSettings({ activeFilter: f.id as CircleFilter })}
                          className={`p-2.5 rounded-2xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-purple-600 text-white border-purple-600 shadow-sm'
                              : 'bg-white hover:bg-purple-50/80 text-slate-800 border-purple-100'
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <div className={`p-1.5 rounded-xl ${isSelected ? 'bg-purple-700/80 text-white' : 'bg-purple-100 text-purple-700'}`}>
                              {getFilterIcon(f.icon)}
                            </div>
                            <div>
                              <span className="block font-bold text-xs leading-tight">{f.name}</span>
                              <span className={`text-[10px] line-clamp-1 ${isSelected ? 'text-purple-200' : 'text-slate-500'}`}>{f.subtitle}</span>
                            </div>
                          </div>
                          <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${isSelected ? 'bg-white ring-2 ring-purple-300' : 'bg-purple-300'}`} />
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Filtros da Fenda */}
              {settings.renderMode === 'MODO_FENDA' && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-purple-900">
                      Filtros da Fenda Óptica (5 Opções)
                    </label>
                    <span className="text-[10px] font-semibold text-purple-600 bg-purple-100 px-2 py-0.5 rounded-full">
                      ✌️ Sinal de V troca
                    </span>
                  </div>
                  <div className="grid grid-cols-1 gap-2">
                    {fendaFilterList.map((f) => {
                      const isSelected = settings.activeFendaFilter === f.id;
                      return (
                        <button
                          key={f.id}
                          onClick={() => onUpdateSettings({ activeFendaFilter: f.id as FendaFilter })}
                          className={`p-3 rounded-2xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-purple-600 text-white border-purple-600 shadow-sm'
                              : 'bg-white hover:bg-purple-50 text-slate-800 border-purple-100'
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <div className={`p-2 rounded-xl ${isSelected ? 'bg-purple-700 text-white' : 'bg-purple-100 text-purple-700'}`}>
                              <Crop className="w-4 h-4" />
                            </div>
                            <div>
                              <span className="block font-bold text-xs">{f.name}</span>
                              <span className={`text-[10px] ${isSelected ? 'text-purple-200' : 'text-slate-500'}`}>{f.subtitle}</span>
                            </div>
                          </div>
                          <span className={`w-2 h-2 rounded-full ${isSelected ? 'bg-white' : 'bg-purple-400'}`} />
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* =========================================================================
              ABA 2: CORES & TEMAS (NOVO RECURSO PEDIDO PELO USUÁRIO)
             ========================================================================= */}
          {activeTab === 'COLORS' && (
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-purple-900 block mb-2">
                  Paletas & Temas de Cores de Aura
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {colorThemes.map((theme) => {
                    const isSelected = (settings.colorTheme || 'DEFAULT_PURPLE') === theme.id;
                    return (
                      <button
                        key={theme.id}
                        onClick={() => onUpdateSettings({ colorTheme: theme.id })}
                        className={`p-3 rounded-2xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-purple-600 text-white border-purple-600 shadow-md shadow-purple-600/30'
                            : 'bg-white hover:bg-purple-50 text-slate-800 border-purple-100'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          {/* Amostra dupla de cor */}
                          <div className="flex -space-x-2">
                            <span 
                              className="w-5 h-5 rounded-full border-2 border-white shadow-xs" 
                              style={{ backgroundColor: theme.primary }} 
                            />
                            <span 
                              className="w-5 h-5 rounded-full border-2 border-white shadow-xs" 
                              style={{ backgroundColor: theme.secondary }} 
                            />
                          </div>
                          <div>
                            <span className="block font-bold text-xs leading-tight">{theme.name}</span>
                            <span className={`text-[10px] ${isSelected ? 'text-purple-100' : 'text-slate-500'}`}>
                              {theme.id === 'DEFAULT_PURPLE' ? 'Estética Original' : 'Tema Cromático'}
                            </span>
                          </div>
                        </div>
                        <span className={`w-2.5 h-2.5 rounded-full ${isSelected ? 'bg-white' : 'bg-purple-300'}`} />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Seletor Customizado de Cores RGB */}
              {settings.colorTheme === 'CUSTOM_RGB' && (
                <div className="bg-purple-50/80 rounded-2xl p-4 border border-purple-200 space-y-3">
                  <div className="flex items-center justify-between text-xs font-bold text-purple-950 mb-1">
                    <span>Ajuste Manual de Cores (RGB)</span>
                    <button 
                      onClick={() => onUpdateSettings({ 
                        customPrimaryColor: '#9333ea', 
                        customSecondaryColor: '#ffffff',
                        customGlowColor: '#7e22ce'
                      })}
                      className="text-[10px] text-purple-700 hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <RefreshCw className="w-3 h-3" /> Restaurar
                    </button>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    {/* Cor Primária */}
                    <div className="flex flex-col items-center gap-1.5 p-2 bg-white rounded-xl border border-purple-100">
                      <span className="text-[10px] font-bold text-slate-700">Cor Primária</span>
                      <input 
                        type="color" 
                        value={settings.customPrimaryColor || '#9333ea'} 
                        onChange={(e) => onUpdateSettings({ customPrimaryColor: e.target.value })}
                        className="w-9 h-9 rounded-lg cursor-pointer border-0 p-0"
                      />
                    </div>

                    {/* Cor Secundária */}
                    <div className="flex flex-col items-center gap-1.5 p-2 bg-white rounded-xl border border-purple-100">
                      <span className="text-[10px] font-bold text-slate-700">Secundária</span>
                      <input 
                        type="color" 
                        value={settings.customSecondaryColor || '#ffffff'} 
                        onChange={(e) => onUpdateSettings({ customSecondaryColor: e.target.value })}
                        className="w-9 h-9 rounded-lg cursor-pointer border-0 p-0"
                      />
                    </div>

                    {/* Brilho Glow */}
                    <div className="flex flex-col items-center gap-1.5 p-2 bg-white rounded-xl border border-purple-100">
                      <span className="text-[10px] font-bold text-slate-700">Halo Brilho</span>
                      <input 
                        type="color" 
                        value={settings.customGlowColor || '#7e22ce'} 
                        onChange={(e) => onUpdateSettings({ customGlowColor: e.target.value })}
                        className="w-9 h-9 rounded-lg cursor-pointer border-0 p-0"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* =========================================================================
              ABA 3: AJUSTES, FÍSICA & CÂMERA
             ========================================================================= */}
          {activeTab === 'PHYSICS' && (
            <div className="space-y-3">
              {/* Escala do Efeito */}
              <div className="bg-purple-50/60 rounded-2xl p-3 border border-purple-100">
                <div className="flex items-center justify-between text-xs font-medium text-slate-700 mb-2">
                  <span>Tamanho dos Efeitos e Mandala</span>
                  <span className="font-bold text-purple-700">{Math.round(settings.effectScale * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0.7"
                  max="1.5"
                  step="0.05"
                  value={settings.effectScale}
                  onChange={(e) => onUpdateSettings({ effectScale: parseFloat(e.target.value) })}
                  className="w-full accent-purple-600 cursor-pointer"
                />
              </div>

              {/* Velocidade de Rotação */}
              <div className="bg-purple-50/60 rounded-2xl p-3 border border-purple-100">
                <div className="flex items-center justify-between text-xs font-medium text-slate-700 mb-2">
                  <span>Velocidade de Rotação das Mandalas</span>
                  <span className="font-bold text-purple-700">{Math.round((settings.rotationSpeed || 1.0) * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="2.0"
                  step="0.1"
                  value={settings.rotationSpeed || 1.0}
                  onChange={(e) => onUpdateSettings({ rotationSpeed: parseFloat(e.target.value) })}
                  className="w-full accent-purple-600 cursor-pointer"
                />
              </div>

              {/* Densidade de Partículas */}
              <div className="bg-purple-50/60 rounded-2xl p-3 border border-purple-100">
                <div className="flex items-center justify-between text-xs font-medium text-slate-700 mb-2">
                  <span>Densidade de Faíscas e Partículas</span>
                  <span className="font-bold text-purple-700">{Math.round(settings.particleDensity * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="1.5"
                  step="0.1"
                  value={settings.particleDensity}
                  onChange={(e) => onUpdateSettings({ particleDensity: parseFloat(e.target.value) })}
                  className="w-full accent-purple-600 cursor-pointer"
                />
              </div>

              {/* Espessura do Laser */}
              {settings.renderMode === 'MODO_CONEXAO' && (
                <>
                  <div className="bg-purple-50/60 rounded-2xl p-3 border border-purple-100">
                    <div className="flex items-center justify-between text-xs font-medium text-slate-700 mb-2">
                      <span>Espessura e Potência do Laser</span>
                      <span className="font-bold text-purple-700">{Math.round((settings.laserThickness || 1.0) * 100)}%</span>
                    </div>
                    <input
                      type="range"
                      min="0.8"
                      max="2.5"
                      step="0.1"
                      value={settings.laserThickness || 1.0}
                      onChange={(e) => onUpdateSettings({ laserThickness: parseFloat(e.target.value) })}
                      className="w-full accent-purple-600 cursor-pointer"
                    />
                  </div>

                  <div className="bg-purple-50/60 rounded-2xl p-3 border border-purple-100">
                    <div className="flex items-center justify-between text-xs font-medium text-slate-700 mb-2">
                      <span>Instabilidade dos Arcos Elétricos (Jitter)</span>
                      <span className="font-bold text-purple-700">{Math.round((settings.laserArcJitter || 1.0) * 100)}%</span>
                    </div>
                    <input
                      type="range"
                      min="0.4"
                      max="2.0"
                      step="0.1"
                      value={settings.laserArcJitter || 1.0}
                      onChange={(e) => onUpdateSettings({ laserArcJitter: parseFloat(e.target.value) })}
                      className="w-full accent-purple-600 cursor-pointer"
                    />
                  </div>
                </>
              )}

              {/* Toggles */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  onClick={() => onUpdateSettings({ audioEnabled: !settings.audioEnabled })}
                  className={`p-3 rounded-2xl border text-xs font-medium flex items-center gap-2.5 transition-all cursor-pointer ${
                    settings.audioEnabled
                      ? 'bg-purple-100/80 text-purple-800 border-purple-200'
                      : 'bg-slate-100 text-slate-500 border-slate-200'
                  }`}
                >
                  {settings.audioEnabled ? <Volume2 className="w-4 h-4 text-purple-600" /> : <VolumeX className="w-4 h-4" />}
                  <span>{settings.audioEnabled ? 'Áudio Místico Ativo' : 'Mudo'}</span>
                </button>

                <button
                  onClick={() => onUpdateSettings({ showSkeleton: !settings.showSkeleton })}
                  className={`p-3 rounded-2xl border text-xs font-medium flex items-center gap-2.5 transition-all cursor-pointer ${
                    settings.showSkeleton
                      ? 'bg-purple-100/80 text-purple-800 border-purple-200'
                      : 'bg-slate-100 text-slate-500 border-slate-200'
                  }`}
                >
                  <Eye className="w-4 h-4 text-purple-600" />
                  <span>{settings.showSkeleton ? 'Esqueleto Ligado' : 'Esqueleto Oculto'}</span>
                </button>

                <button
                  onClick={() => onUpdateSettings({ mirrorCamera: !settings.mirrorCamera })}
                  className={`col-span-2 p-3 rounded-2xl border text-xs font-medium flex items-center justify-center gap-2.5 transition-all cursor-pointer ${
                    settings.mirrorCamera
                      ? 'bg-purple-100/80 text-purple-800 border-purple-200'
                      : 'bg-slate-100 text-slate-500 border-slate-200'
                  }`}
                >
                  <FlipHorizontal className="w-4 h-4 text-purple-600" />
                  <span>{settings.mirrorCamera ? 'Espelhamento da Câmera Ativo' : 'Câmera Não-Espelhada'}</span>
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Botão de Fechar */}
        <div className="pt-3 border-t border-purple-100 mt-2">
          <button
            onClick={onClose}
            className="w-full py-3 rounded-full bg-purple-600 hover:bg-purple-700 active:scale-95 text-white font-bold text-xs shadow-lg shadow-purple-600/30 transition-all cursor-pointer"
          >
            Concluir Configurações
          </button>
        </div>
      </div>
    </div>
  );
};
