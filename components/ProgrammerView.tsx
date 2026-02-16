
import React from 'react';
import { motion } from 'framer-motion';

interface ProgrammerViewProps {
  value: string;
}

const ProgrammerView: React.FC<ProgrammerViewProps> = ({ value }) => {
  const num = parseInt(value) || 0;

  const bases = [
    { label: 'HEX', val: num.toString(16).toUpperCase() },
    { label: 'DEC', val: num.toString(10) },
    { label: 'OCT', val: num.toString(8) },
    { label: 'BIN', val: num.toString(2).padStart(8, '0').replace(/(.{4})/g, '$1 ') },
  ];

  return (
    <div className="flex flex-col h-full bg-zinc-950 p-6 space-y-4">
      <h3 className="text-zinc-400 text-xs font-bold uppercase tracking-widest mb-2">Base Conversion</h3>
      <div className="space-y-3">
        {bases.map((base) => (
          <motion.div 
            key={base.label}
            whileHover={{ x: 5 }}
            className="flex items-center justify-between p-4 bg-black border border-zinc-800 rounded-2xl shadow-inner"
          >
            <span className="text-zinc-500 font-bold text-xs mono">{base.label}</span>
            <span className="text-indigo-400 font-bold text-lg mono truncate ml-4">
              {base.val}
            </span>
          </motion.div>
        ))}
      </div>
      
      <div className="mt-auto grid grid-cols-2 gap-3">
        <button className="py-3 bg-zinc-900 rounded-xl text-zinc-400 text-xs font-bold border border-zinc-800">WORD (32-bit)</button>
        <button className="py-3 bg-zinc-900 rounded-xl text-zinc-400 text-xs font-bold border border-zinc-800">UNSIGNED</button>
      </div>
    </div>
  );
};

export default ProgrammerView;
