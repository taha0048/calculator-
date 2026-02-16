
import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { generateGraphPoints } from '../services/mathEngine';

interface GraphingViewProps {
  expression: string;
}

const GraphingView: React.FC<GraphingViewProps> = ({ expression }) => {
  const [range] = useState({ min: -10, max: 10 });
  const width = 400;
  const height = 400;
  
  const points = useMemo(() => {
    // Attempt to extract f(x) if expression contains x
    const sanitized = expression.includes('x') ? expression : 'x';
    return generateGraphPoints(sanitized, { min: range.min, max: range.max, steps: 100 });
  }, [expression, range]);

  const mapX = (x: number) => ((x - range.min) / (range.max - range.min)) * width;
  const mapY = (y: number) => height - ((y - range.min) / (range.max - range.min)) * height;

  const pathData = useMemo(() => {
    if (points.length < 2) return '';
    return points.reduce((acc, p, i) => {
      const px = mapX(p.x);
      const py = mapY(p.y);
      if (isNaN(px) || isNaN(py)) return acc;
      return acc + (i === 0 ? `M ${px} ${py}` : ` L ${px} ${py}`);
    }, '');
  }, [points]);

  return (
    <div className="flex flex-col h-full bg-zinc-950 p-6 overflow-hidden">
      <div className="mb-4">
        <h3 className="text-zinc-400 text-sm font-semibold uppercase tracking-widest mb-2">Function Plot</h3>
        <p className="mono text-indigo-400 text-lg">y = {expression || 'x'}</p>
      </div>
      
      <div className="relative flex-grow bg-black rounded-3xl border border-zinc-800 flex items-center justify-center overflow-hidden">
        <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`} className="w-full h-full max-w-md">
          {/* Grid Lines */}
          <line x1="0" y1={height/2} x2={width} y2={height/2} stroke="#27272a" strokeWidth="1" />
          <line x1={width/2} y1="0" x2={width/2} y2={height} stroke="#27272a" strokeWidth="1" />
          
          {/* Function Path */}
          <motion.path
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            d={pathData}
            fill="none"
            stroke="#6366f1"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
        
        {/* Info Overlay */}
        <div className="absolute bottom-4 right-4 flex gap-2">
           <span className="text-[10px] text-zinc-500 bg-zinc-900/80 px-2 py-1 rounded border border-zinc-800">X: [-10, 10]</span>
           <span className="text-[10px] text-zinc-500 bg-zinc-900/80 px-2 py-1 rounded border border-zinc-800">Y: [-10, 10]</span>
        </div>
      </div>
    </div>
  );
};

export default GraphingView;
