
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HistoryItem } from '../types';
import { Trash2, X } from 'lucide-react';

interface HistorySidebarProps {
  isOpen: boolean;
  onClose: () => void;
  history: HistoryItem[];
  onSelect: (expr: string) => void;
  onClear: () => void;
}

const HistorySidebar: React.FC<HistorySidebarProps> = ({ isOpen, onClose, history, onSelect, onClear }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-80 bg-zinc-900 z-50 shadow-2xl border-l border-zinc-800 p-6 flex flex-col"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                History
              </h2>
              <button onClick={onClose} className="p-2 hover:bg-zinc-800 rounded-full transition-colors text-zinc-400 hover:text-white">
                <X size={20} />
              </button>
            </div>

            <div className="flex-grow overflow-y-auto space-y-4 pr-2 custom-scrollbar">
              {history.length === 0 ? (
                <div className="text-center py-20">
                  <p className="text-zinc-500 text-sm">No history yet</p>
                </div>
              ) : (
                history.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    whileHover={{ scale: 1.02 }}
                    onClick={() => {
                      onSelect(item.expression);
                      onClose();
                    }}
                    className="p-4 bg-zinc-950 rounded-2xl border border-zinc-800 cursor-pointer hover:border-indigo-500 group transition-all"
                  >
                    <div className="text-xs text-zinc-500 mb-1 mono truncate">{item.expression}</div>
                    <div className="text-lg font-bold text-white mono break-all">= {item.result}</div>
                    <div className="text-[10px] text-zinc-600 mt-2 uppercase tracking-tighter">
                      {new Date(item.timestamp).toLocaleTimeString()}
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {history.length > 0 && (
              <button 
                onClick={onClear}
                className="mt-6 flex items-center justify-center gap-2 w-full py-3 bg-red-500/10 text-red-400 rounded-xl hover:bg-red-500/20 transition-all font-medium border border-red-500/20"
              >
                <Trash2 size={16} />
                Clear All
              </button>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default HistorySidebar;
