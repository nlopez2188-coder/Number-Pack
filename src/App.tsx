import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Maximize2, Minimize2, Move, ArrowLeft, Info, ExternalLink, Hash } from 'lucide-react';
import { NumberCharacter, INITIAL_NUMBERS, OC_NUMBERS } from './types';

export default function App() {
  const [selectedNumber, setSelectedNumber] = useState<NumberCharacter | null>(null);
  const [isZoomMode, setIsZoomMode] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isMoveLocked, setIsMoveLocked] = useState(false);
  const [useNeatSteps, setUseNeatSteps] = useState(false);
  const [category, setCategory] = useState<'main' | 'oc'>('main');

  const containerRef = useRef<HTMLDivElement>(null);

  const moveCharacter = (direction: 'up' | 'down' | 'left' | 'right') => {
    const step = useNeatSteps ? 20 : 5;
    switch (direction) {
      case 'up': setPosition(prev => ({ ...prev, y: prev.y - step })); break;
      case 'down': setPosition(prev => ({ ...prev, y: prev.y + step })); break;
      case 'left': setPosition(prev => ({ ...prev, x: prev.x - step })); break;
      case 'right': setPosition(prev => ({ ...prev, x: prev.x + step })); break;
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '=') {
        setIsMoveLocked(prev => !prev);
        return;
      }
      if (!isMoveLocked) return;
      
      const directionMap: Record<string, 'up' | 'down' | 'left' | 'right'> = {
        ArrowUp: 'up',
        ArrowDown: 'down',
        ArrowLeft: 'left',
        ArrowRight: 'right',
      };

      if (directionMap[e.key]) {
        setUseNeatSteps(e.shiftKey);
        moveCharacter(directionMap[e.key]);
        e.preventDefault();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMoveLocked, useNeatSteps]);

  const handleSelect = (num: NumberCharacter) => {
    setSelectedNumber(num);
    setIsZoomMode(true);
    setPosition({ x: 0, y: 0 });
    setIsMoveLocked(false);
  };

  const closeZoom = () => {
    setIsZoomMode(false);
    setSelectedNumber(null);
  };

  return (
    <div className="min-h-screen bg-[#F5F5F0] text-[#1A1A1A] font-sans selection:bg-[#5A5A40] selection:text-white">
      {/* Header */}
      <header className="border-b border-[#1A1A1A] p-6 sticky top-0 bg-[#F5F5F0] z-30">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-6xl font-black tracking-tighter uppercase leading-none italic">
              Numbers Pack <span className="text-[#5A5A40]">Ultimate</span>
            </h1>
            <p className="mt-2 text-sm uppercase tracking-widest font-bold opacity-60">
              The Greatest Collection • Part 5.1 & 5.7
            </p>
          </div>
          <nav className="flex gap-4">
            <button 
              onClick={() => setCategory('main')}
              className={`px-4 py-2 text-xs font-black uppercase tracking-widest border border-[#1A1A1A] transition-colors ${category === 'main' ? 'bg-[#1A1A1A] text-white' : 'hover:bg-[#E4E3E0]'}`}
            >
              Main Pack
            </button>
            <button 
              onClick={() => setCategory('oc')}
              className={`px-4 py-2 text-xs font-black uppercase tracking-widest border border-[#1A1A1A] transition-colors ${category === 'oc' ? 'bg-[#1A1A1A] text-white' : 'hover:bg-[#E4E3E0]'}`}
            >
              OCs (Part 5.7)
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-6 md:p-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {(category === 'main' ? INITIAL_NUMBERS : OC_NUMBERS).map((num) => (
            <motion.div
              layoutId={num.id}
              key={num.id}
              onClick={() => handleSelect(num)}
              className="group cursor-pointer border border-[#1A1A1A] bg-white p-6 relative overflow-hidden"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div 
                className="w-full aspect-square flex items-center justify-center text-8xl font-black mb-6"
                style={{ backgroundColor: num.color, color: num.textColor }}
              >
                {num.value}
              </div>
              <div className="space-y-1">
                <h3 className="text-xl font-black uppercase tracking-tight">{num.name}</h3>
                <p className="text-sm opacity-60 italic leading-snug">{num.description}</p>
              </div>
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 size={20} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Info Section */}
        <section className="mt-24 border-t border-[#1A1A1A] pt-12 grid grid-cols-1 md:grid-cols-3 gap-12 mb-24">
          <div className="space-y-4">
            <h4 className="font-black uppercase tracking-widest flex items-center gap-2">
              <Info size={16} /> Instructions
            </h4>
            <p className="text-sm leading-relaxed opacity-80">
              Select a number to enter <strong>Zoom Mode</strong>. Press <kbd className="bg-[#1A1A1A] text-white px-2 py-0.5 rounded text-xs font-mono">=</kbd> to unlock manipulation controls. Use arrow keys to move the character. Hold <kbd className="bg-[#1A1A1A] text-white px-2 py-0.5 rounded text-xs font-mono">Shift</kbd> to move in larger increments for neat alignment.
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="font-black uppercase tracking-widest flex items-center gap-2">
              <ExternalLink size={16} /> Links & Credits
            </h4>
            <div className="flex flex-col gap-2">
              <a href="https://scratch.mit.edu/projects/1050123013/" target="_blank" rel="noopener noreferrer" className="text-sm border-b border-[#1A1A1A] w-fit hover:bg-[#1A1A1A] hover:text-white transition-colors">
                Scratch Part 5.1
              </a>
              <p className="text-sm opacity-80 italic">(c) Numbers. 10's badge logic inspired by @JOAOPEDROeULIANA.</p>
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="font-black uppercase tracking-widest flex items-center gap-2">
              <Hash size={16} /> Contribute
            </h4>
            <p className="text-sm leading-relaxed opacity-80">
              Want to see your OCs in Part 5.7? Share your links and we might add them to the pack!
            </p>
          </div>
        </section>
      </main>

      {/* Zoom / Interactive Overlay */}
      <AnimatePresence>
        {isZoomMode && selectedNumber && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#F5F5F0] flex flex-col items-center justify-center p-8 overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full p-4 md:p-6 flex flex-col md:flex-row justify-between items-center gap-4 border-b border-[#1A1A1A] bg-[#F5F5F0]">
              <button 
                onClick={closeZoom}
                className="w-full md:w-auto flex items-center justify-center gap-2 font-black uppercase tracking-widest hover:bg-[#1A1A1A] hover:text-white px-4 py-3 transition-colors border border-[#1A1A1A] bg-white"
              >
                <ArrowLeft size={18} /> Back
              </button>
              
              <div className="flex items-center gap-2 w-full md:w-auto">
                <button 
                  onClick={() => setPosition({ x: 0, y: 0 })}
                  className="flex-1 md:flex-none px-4 py-3 text-xs font-black uppercase border border-[#1A1A1A] hover:bg-[#E4E3E0] transition-colors bg-white"
                >
                  Reset
                </button>
                <button 
                  onClick={() => setIsMoveLocked(!isMoveLocked)}
                  className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-3 border border-[#1A1A1A] transition-all ${isMoveLocked ? 'bg-[#1A1A1A] text-white' : 'bg-white'}`}
                >
                  <Move size={18} />
                  <span className="text-xs font-black uppercase tracking-widest">
                    {isMoveLocked ? 'Move: ON' : 'Move: OFF'}
                  </span>
                </button>
              </div>
            </div>

            <div className="flex-1 flex items-center justify-center relative w-full h-full max-w-4xl max-h-4xl mt-24 md:mt-0">
              {/* Mobile D-Pad */}
              {isMoveLocked && (
                <div className="absolute bottom-4 right-4 md:bottom-12 md:right-12 z-50 flex flex-col items-center gap-2">
                   <div className="flex flex-col items-center gap-2 bg-white/80 backdrop-blur-sm p-4 border-2 border-[#1A1A1A] shadow-[8px_8px_0px_#1A1A1A]">
                      <button 
                        onClick={() => moveCharacter('up')}
                        className="w-12 h-12 flex items-center justify-center border-2 border-[#1A1A1A] active:bg-[#1A1A1A] active:text-white"
                      >
                        <ArrowLeft size={20} className="rotate-90" />
                      </button>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => moveCharacter('left')}
                          className="w-12 h-12 flex items-center justify-center border-2 border-[#1A1A1A] active:bg-[#1A1A1A] active:text-white"
                        >
                          <ArrowLeft size={20} />
                        </button>
                        <button 
                          onClick={() => moveCharacter('down')}
                          className="w-12 h-12 flex items-center justify-center border-2 border-[#1A1A1A] active:bg-[#1A1A1A] active:text-white"
                        >
                          <ArrowLeft size={20} className="-rotate-90" />
                        </button>
                        <button 
                          onClick={() => moveCharacter('right')}
                          className="w-12 h-12 flex items-center justify-center border-2 border-[#1A1A1A] active:bg-[#1A1A1A] active:text-white"
                        >
                          <ArrowLeft size={20} className="rotate-180" />
                        </button>
                      </div>
                      <button 
                        onClick={() => setUseNeatSteps(!useNeatSteps)}
                        className={`mt-2 w-full py-2 text-[10px] font-black uppercase tracking-tighter border-2 border-[#1A1A1A] transition-colors ${useNeatSteps ? 'bg-[#5A5A40] text-white' : 'bg-white'}`}
                      >
                        {useNeatSteps ? 'Neat Steps: ON' : 'Neat Steps: OFF'}
                      </button>
                   </div>
                </div>
              )}
              {/* Background Grid for context */}
              <div className="absolute inset-0 grid grid-cols-[repeat(20,minmax(0,1fr))] grid-rows-[repeat(20,minmax(0,1fr))] opacity-[0.03] pointer-events-none">
                {Array.from({ length: 400 }).map((_, i) => (
                  <div key={i} className="border-[0.5px] border-[#1A1A1A]" />
                ))}
              </div>

              <motion.div
                layoutId={selectedNumber.id}
                style={{
                  x: position.x,
                  y: position.y,
                  backgroundColor: selectedNumber.color,
                  color: selectedNumber.textColor
                }}
                className="w-64 h-64 md:w-96 md:h-96 flex items-center justify-center text-[10rem] md:text-[18rem] font-black shadow-[20px_20px_0px_#1A1A1A] border-4 border-[#1A1A1A] relative"
              >
                 {selectedNumber.value}
                 
                 {isMoveLocked && (
                    <div className="absolute inset-0 border-2 border-dashed border-[#1A1A1A] opacity-20" />
                 )}
              </motion.div>
            </div>

            <div className="mt-8 text-center max-w-2xl">
              <h2 className="text-5xl font-black uppercase italic tracking-tighter mb-4">
                {selectedNumber.name}
              </h2>
              <p className="text-lg opacity-60 leading-relaxed font-medium">
                {selectedNumber.description}
              </p>
              {isMoveLocked && (
                <p className="mt-6 text-xs uppercase tracking-tighter font-black text-[#5A5A40] animate-pulse">
                  Use Arrows to move • Hold Shift for neat steps
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="border-t border-[#1A1A1A] p-12 bg-white flex flex-col md:flex-row items-center justify-between gap-8">
        <p className="text-xs font-black uppercase tracking-[0.2em] opacity-40">
          © 2026 Numbers Pack • Crafted for Creatives
        </p>
        <div className="flex gap-4">
           <div className="w-8 h-8 rounded-full bg-[#FF6B6B]" />
           <div className="w-8 h-8 rounded-full bg-[#4ECDC4]" />
           <div className="w-8 h-8 rounded-full bg-[#45B7D1]" />
           <div className="w-8 h-8 rounded-full bg-[#96CEB4]" />
        </div>
      </footer>
    </div>
  );
}
