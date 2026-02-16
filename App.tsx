
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCalculator } from './hooks/useCalculator';
import { CalcMode } from './types';
import Display from './components/Display';
import Keypad from './components/Keypad';
import HistorySidebar from './components/HistorySidebar';
import GraphingView from './components/GraphingView';
import ProgrammerView from './components/ProgrammerView';
import { 
  Calculator, 
  History, 
  Settings, 
  Grid3X3, 
  Binary, 
  LineChart, 
  ChevronDown 
} from 'lucide-react';

const App: React.FC = () => {
  const {
    expression,
    setExpression,
    result,
    mode,
    setMode,
    history,
    handleInput,
    clearHistory
  } = useCalculator();

  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isModeSelectorOpen, setIsModeSelectorOpen] = useState(false);

  const modeIcons = {
    [CalcMode.BASIC]: <Calculator size={18} />,
    [CalcMode.SCIENTIFIC]: <Grid3X3 size={18} />,
    [CalcMode.GRAPHING]: <LineChart size={18} />,
    [CalcMode.PROGRAMMER]: <Binary size={18} />,
    [CalcMode.MATRIX]: <Grid3X3 size={18} />,
    [CalcMode.CONVERTER]: <Settings size={18} />,
  };

  return (
    <div className="flex h-screen w-screen bg-black overflow-hidden font-sans text-zinc-100 selection:bg-indigo-500/30">
      {/* Mobile-centric centered container */}
      <div className="flex flex-col w-full max-w-lg mx-auto bg-zinc-950 border-x border-zinc-900 relative">
        
        {/* Header / Mode Selector */}
        <div className="p-4 flex items-center justify-between border-b border-zinc-900 bg-zinc-950/80 backdrop-blur-md sticky top-0 z-30">
          <div className="relative">
            <motion.button 
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsModeSelectorOpen(!isModeSelectorOpen)}
              className="flex items-center gap-2 px-3 py-1.5 bg-zinc-900 border border-zinc-800 rounded-full hover:bg-zinc-800 transition-colors"
            >
              <span className="text-indigo-400">{modeIcons[mode]}</span>
              <span className="text-sm font-semibold tracking-wide uppercase">{mode}</span>
              <ChevronDown size={14} className={`transition-transform duration-300 ${isModeSelectorOpen ? 'rotate-180' : ''}`} />
            </motion.button>

            <AnimatePresence>
              {isModeSelectorOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute top-12 left-0 w-56 bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl p-2 z-50 overflow-hidden"
                >
                  {Object.values(CalcMode).map((m) => (
                    <button
                      key={m}
                      onClick={() => {
                        setMode(m);
                        setIsModeSelectorOpen(false);
                      }}
                      className={`w-full text-left px-4 py-3 rounded-xl flex items-center gap-3 transition-colors ${mode === m ? 'bg-indigo-600/10 text-indigo-400' : 'hover:bg-zinc-800 text-zinc-400'}`}
                    >
                      {modeIcons[m]}
                      <span className="text-sm font-medium">{m}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="flex gap-2">
            <button 
              onClick={() => setIsHistoryOpen(true)}
              className="p-2 hover:bg-zinc-900 rounded-full transition-colors relative"
            >
              <History size={20} className="text-zinc-400" />
              {history.length > 0 && <span className="absolute top-1 right-1 w-2 h-2 bg-indigo-500 rounded-full"></span>}
            </button>
            <button className="p-2 hover:bg-zinc-900 rounded-full transition-colors">
              <Settings size={20} className="text-zinc-400" />
            </button>
          </div>
        </div>

        {/* Dynamic Main View */}
        <div className="flex-grow flex flex-col overflow-hidden">
          <AnimatePresence mode="wait">
            {mode === CalcMode.GRAPHING ? (
              <motion.div 
                key="graph"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full"
              >
                 <GraphingView expression={expression} />
              </motion.div>
            ) : mode === CalcMode.PROGRAMMER ? (
              <motion.div 
                key="prog"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full"
              >
                <Display expression={expression} result={result} mode={mode} />
                <ProgrammerView value={result || expression} />
              </motion.div>
            ) : (
              <motion.div 
                key="standard"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full flex flex-col"
              >
                <Display expression={expression} result={result} mode={mode} />
                <Keypad onInput={handleInput} mode={mode} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Global Floating Action / Indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 bg-zinc-900/50 backdrop-blur-md rounded-full border border-zinc-800 shadow-xl pointer-events-none opacity-50">
           <span className="text-[10px] font-bold tracking-widest text-zinc-500 uppercase">OMNICALC ENGINE V1.0.4</span>
        </div>

        {/* History Sidebar */}
        <HistorySidebar 
          isOpen={isHistoryOpen} 
          onClose={() => setIsHistoryOpen(false)} 
          history={history}
          onSelect={(expr) => setExpression(expr)}
          onClear={clearHistory}
        />
      </div>
    </div>
  );
};

export default App;
