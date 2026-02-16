
import React from 'react';
import { motion } from 'framer-motion';
import { CalcMode } from '../types';

interface KeypadProps {
  onInput: (val: string) => void;
  mode: CalcMode;
}

// Define interface for key configuration to ensure consistent types
interface KeyConfig {
  label: string;
  val: string;
  type?: string;
  span?: number;
}

const Keypad: React.FC<KeypadProps> = ({ onInput, mode }) => {
  const getKeysForMode = (): KeyConfig[] => {
    const basic: KeyConfig[] = [
      { label: 'AC', val: 'AC', type: 'special' },
      { label: 'DEL', val: 'DEL', type: 'special' },
      { label: '%', val: '%', type: 'operator' },
      { label: '÷', val: '÷', type: 'operator' },
      { label: '7', val: '7' },
      { label: '8', val: '8' },
      { label: '9', val: '9' },
      { label: '×', val: '×', type: 'operator' },
      { label: '4', val: '4' },
      { label: '5', val: '5' },
      { label: '6', val: '6' },
      { label: '−', val: '−', type: 'operator' },
      { label: '1', val: '1' },
      { label: '2', val: '2' },
      { label: '3', val: '3' },
      { label: '+', val: '+', type: 'operator' },
      { label: '0', val: '0', span: 2 },
      { label: '.', val: '.' },
      { label: '=', val: '=', type: 'action' },
    ];

    const scientific: KeyConfig[] = [
      { label: 'sin', val: 'sin(', type: 'fn' },
      { label: 'cos', val: 'cos(', type: 'fn' },
      { label: 'tan', val: 'tan(', type: 'fn' },
      { label: 'log', val: 'log10(', type: 'fn' },
      { label: 'ln', val: 'log(', type: 'fn' },
      { label: 'π', val: 'π', type: 'fn' },
      { label: 'e', val: 'e', type: 'fn' },
      { label: '^', val: '^', type: 'fn' },
      { label: '√', val: 'sqrt(', type: 'fn' },
      { label: '!', val: '!', type: 'fn' },
      { label: '(', val: '(', type: 'fn' },
      { label: ')', val: ')', type: 'fn' },
      ...basic.filter(k => k.label !== 'AC' && k.label !== 'DEL')
    ];

    if (mode === CalcMode.SCIENTIFIC) return scientific;
    return basic;
  };

  const keys = getKeysForMode();

  return (
    <div className={`grid ${mode === CalcMode.SCIENTIFIC ? 'grid-cols-4 sm:grid-cols-6' : 'grid-cols-4'} gap-2 p-4 bg-black flex-grow overflow-y-auto`}>
      {keys.map((key, i) => (
        <motion.button
          key={`${key.label}-${i}`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.95, backgroundColor: 'rgba(255,255,255,0.1)' }}
          onClick={() => onInput(key.val)}
          className={`
            relative overflow-hidden h-16 sm:h-20 rounded-2xl flex items-center justify-center text-lg font-medium transition-colors
            ${key.span === 2 ? 'col-span-2' : ''}
            ${key.type === 'action' ? 'bg-indigo-600 text-white hover:bg-indigo-500' : 
              key.type === 'operator' ? 'bg-zinc-800 text-indigo-400 hover:bg-zinc-700' :
              key.type === 'special' ? 'bg-zinc-800 text-red-400 hover:bg-zinc-700' :
              key.type === 'fn' ? 'bg-zinc-900 text-zinc-300 text-sm hover:bg-zinc-800' :
              'bg-zinc-900 text-zinc-100 hover:bg-zinc-800'}
          `}
        >
          {key.label}
        </motion.button>
      ))}
    </div>
  );
};

export default Keypad;
