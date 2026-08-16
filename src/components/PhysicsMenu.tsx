import React, { useState } from 'react';
import { Box, Circle, Triangle, PlaySquare, Hexagon, Wand2, X } from 'lucide-react';

interface PhysicsMenuProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  isVisible: boolean;
  currentColor: string;
}

export const PhysicsMenu: React.FC<PhysicsMenuProps> = ({ isOpen, setIsOpen, isVisible, currentColor }) => {
  const [spawnSize, setSpawnSize] = useState<number>(60);

  if (!isVisible) return null;

  const handleSpawn = (type: string) => {
    window.dispatchEvent(
      new CustomEvent('SPAWN_OBJECT', {
        detail: { type, size: spawnSize, color: currentColor },
      })
    );
  };

  return (
    <div className="absolute right-6 top-1/2 -translate-y-1/2 z-30 pointer-events-auto flex items-center gap-4">
      
      {/* Menu Aberto */}
      {isOpen && (
        <div className="bg-white/95 backdrop-blur-md border border-purple-200 rounded-3xl p-4 shadow-2xl shadow-purple-900/20 animate-fade-in flex flex-col gap-4 w-48">
          <div className="flex items-center justify-between border-b border-purple-100 pb-2">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Parquinho</h3>
            <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-purple-600 transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-3">
            <div>
              <label className="text-[10px] font-bold text-slate-500 uppercase">Tamanho: {spawnSize}px</label>
              <input
                type="range"
                min="20"
                max="150"
                value={spawnSize}
                onChange={(e) => setSpawnSize(Number(e.target.value))}
                className="w-full accent-purple-600 mt-1"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => handleSpawn('BOX')}
                className="flex flex-col items-center justify-center gap-1 p-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 transition-colors cursor-pointer"
              >
                <Box className="w-5 h-5" />
                <span className="text-[9px] font-bold">Caixa</span>
              </button>
              
              <button
                onClick={() => handleSpawn('CIRCLE')}
                className="flex flex-col items-center justify-center gap-1 p-2 rounded-xl bg-cyan-50 hover:bg-cyan-100 text-cyan-700 border border-cyan-200 transition-colors cursor-pointer"
              >
                <Circle className="w-5 h-5" />
                <span className="text-[9px] font-bold">Bola</span>
              </button>

              <button
                onClick={() => handleSpawn('POLYGON')}
                className="flex flex-col items-center justify-center gap-1 p-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200 col-span-2 transition-colors cursor-pointer"
              >
                <Hexagon className="w-5 h-5" />
                <span className="text-[9px] font-bold">Polígono Random</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Botão de Toggle do Menu */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          title="Parquinho de Física"
          className="group relative w-14 h-14 rounded-full bg-white/90 hover:bg-white text-purple-700 border-2 border-purple-300/80 hover:border-purple-500 shadow-xl shadow-purple-900/30 flex items-center justify-center backdrop-blur-md transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
        >
          <span className="absolute inset-0 rounded-full bg-cyan-400/20 animate-ping pointer-events-none" />
          <Wand2 className="w-6 h-6 transition-transform duration-500 group-hover:rotate-12" />
        </button>
      )}
    </div>
  );
};
