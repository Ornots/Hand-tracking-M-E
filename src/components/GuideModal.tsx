import React from 'react';
import { X, Sparkles, Shield, Crop, Zap, Palette } from 'lucide-react';

interface GuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GuideModal: React.FC<GuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-purple-950/40 backdrop-blur-md animate-fade-in">
      <div 
        className="relative w-full max-w-lg bg-white/95 text-slate-900 rounded-3xl p-6 sm:p-8 shadow-2xl border border-purple-200 shadow-purple-500/20 backdrop-blur-xl max-h-[90vh] overflow-y-auto"
        id="guide-modal"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-purple-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center shadow-xs">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Guia de Recursos e Gestos</h2>
              <p className="text-xs text-purple-700 font-medium">10 Mandalas, Fenda Estável e Cores</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-purple-50 hover:bg-purple-100 text-purple-700 flex items-center justify-center transition-colors cursor-pointer"
            id="close-guide-btn"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Gestos e Ações */}
        <div className="py-4 space-y-3">
          {/* Recurso 1: Modo Detecção da Mão Pura */}
          <div className="p-3.5 rounded-2xl bg-purple-50/70 border border-purple-100 flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-purple-600 text-white font-black flex items-center justify-center shrink-0 shadow-md shadow-purple-600/30">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <h3 className="text-xs font-bold text-purple-950">Modo Detecção da Mão (Puro)</h3>
                <span className="px-2 py-0.5 rounded-full bg-purple-600 text-white text-[9px] font-bold">
                  NOVO
                </span>
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Exibe <strong>exclusivamente a anatomia e telemetria</strong> da mão: esqueleto em 21 pontos com nós articulados, caixas cibernéticas HUD com confiança, giroscópio na palma e vetor de distância entre duas mãos — sem efeitos mágicos adicionais.
              </p>
            </div>
          </div>

          {/* Recurso 2: Modo Laser Super Interativo */}
          <div className="p-3.5 rounded-2xl bg-purple-50/70 border border-purple-100 flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-white font-black flex items-center justify-center shrink-0 shadow-md shadow-amber-500/30">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <h3 className="text-xs font-bold text-purple-950">Laser Super Interativo (5 Submodos)</h3>
                <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[9px] font-bold border border-amber-200">
                  APRIMORADO
                </span>
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Escolha entre <strong>Laser Pentagonal</strong> (conecta todas as pontas dos dedos), <strong>Raio Direcional de Energia</strong> (disparado pela ponta do indicador), <strong>Relâmpagos de Alta Voltagem</strong>, <strong>Teia Geométrica</strong> e o clássico <strong>Indicador/Polegar</strong>!
              </p>
            </div>
          </div>

          {/* Recurso 3: 10 Opções de Mandalas & Esferas */}
          <div className="p-3.5 rounded-2xl bg-purple-50/70 border border-purple-100 flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 font-black flex items-center justify-center shrink-0">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <h3 className="text-xs font-bold text-purple-950">10 Mandalas & Círculos Arcanos</h3>
                <span className="px-2 py-0.5 rounded-full bg-purple-200 text-purple-900 text-[9px] font-bold">
                  10 Total
                </span>
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Explore a <strong>Mandala do Dr. Estranho</strong> (com escritas rúnicas e estrelas entrelaçadas), <strong>Vórtice Cósmico</strong>, <strong>Chakram de Plasma</strong>, <strong>Lótus Solar</strong>, <strong>Núcleo Cibernético HUD</strong>, <strong>Supernova Etérea</strong>, <strong>Astrolábio Cronos</strong> e o <strong>Selo do Dragão Astral</strong>!
              </p>
            </div>
          </div>

          {/* Recurso 4: Customização de Cores */}
          <div className="p-3.5 rounded-2xl bg-purple-50/70 border border-purple-100 flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 font-black flex items-center justify-center shrink-0">
              <Palette className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <h3 className="text-xs font-bold text-purple-950">Personalização de Cores</h3>
                <span className="px-2 py-0.5 rounded-full bg-purple-200 text-purple-900 text-[9px] font-bold">
                  Temas & RGB
                </span>
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Alterne entre paletas pré-definidas (Púrpura Original, Ciano Elétrico, Ouro Solar, Rubi, Esmeralda) ou ajuste manualmente as cores Primária, Secundária e Brilho pelo seletor RGB nas <strong>Configurações</strong>.
              </p>
            </div>
          </div>

          {/* Gesto 5: Modo Fenda com 1 ou 2 Mãos */}
          <div className="p-3.5 rounded-2xl bg-purple-50/70 border border-purple-100 flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 font-black flex items-center justify-center shrink-0">
              <Crop className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <h3 className="text-xs font-bold text-purple-950">Modo Fenda (Sem Piscar)</h3>
                <span className="px-2 py-0.5 rounded-full bg-purple-100 text-purple-800 text-[9px] font-bold border border-purple-200">
                  1 ou 2 Mãos
                </span>
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Com <strong>2 mãos</strong>, a fenda se prende aos 4 dedos. Com <strong>1 mão</strong>, projeta o visor dinamicamente. A detecção conta com interpolação anti-flicker e permanece ativa mesmo com punho fechado!
              </p>
            </div>
          </div>
        </div>

        {/* Botão de Fechar */}
        <div className="pt-2">
          <button
            onClick={onClose}
            className="w-full py-3 rounded-full bg-purple-600 hover:bg-purple-700 active:scale-95 text-white font-semibold text-xs shadow-lg shadow-purple-600/30 transition-all cursor-pointer"
          >
            Entendi, Vamos Usar!
          </button>
        </div>
      </div>
    </div>
  );
};
