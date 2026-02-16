
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface DisplayProps {
  expression: string;
  result: string;
  mode: string;
}

const Display: React.FC<DisplayProps> = ({ expression, result, mode }) => {
  return (
    <div className="flex flex-col items-end justify-end p-6 bg-zinc-950 border-b border-zinc-800 min-h-[180px] w-full">
      <div className="w-full flex justify-between items-center mb-4">
        <span className="px-2 py-1 text-[10px] font-bold tracking-widest text-zinc-500 bg-zinc-900 rounded border border-zinc-800 uppercase">
          {mode} MODE
        </span>
        <div className="flex gap-2">
           <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
           <span className="text-[10px] text-zinc-500 font-medium">PRECISION ACTIVE</span>
        </div>
      </div>
      
      <div className="w-full overflow-x-auto text-right custom-scrollbar">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-light text-zinc-400 mono break-all min-h-[2rem]"
        >
          {expression || ' '}
        </motion.div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div 
          key={result}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-5xl font-bold text-white mt-4 mono tracking-tighter truncate w-full text-right"
        >
          {result ? `= ${result}` : ''}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Display;
