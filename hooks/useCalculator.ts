
import { useState, useEffect, useCallback } from 'react';
import { CalcMode, HistoryItem } from '../types';
import { evaluateExpression } from '../services/mathEngine';

export const useCalculator = () => {
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState('');
  const [mode, setMode] = useState<CalcMode>(CalcMode.BASIC);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [angleMode, setAngleMode] = useState<'RAD' | 'DEG'>('RAD');

  // Load history from storage
  useEffect(() => {
    const saved = localStorage.getItem('omni_history');
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse history', e);
      }
    }
  }, []);

  // Save history to storage
  useEffect(() => {
    localStorage.setItem('omni_history', JSON.stringify(history));
  }, [history]);

  const handleInput = useCallback((val: string) => {
    if (val === 'AC') {
      setExpression('');
      setResult('');
      return;
    }
    if (val === 'DEL') {
      setExpression(prev => prev.slice(0, -1));
      return;
    }
    if (val === '=') {
      const evalRes = evaluateExpression(expression, { angleMode });
      if (evalRes && evalRes !== 'Error') {
        const newItem: HistoryItem = {
          id: Date.now().toString(),
          expression,
          result: evalRes,
          timestamp: Date.now()
        };
        setHistory(prev => [newItem, ...prev].slice(0, 50));
        setResult(evalRes);
      } else {
        setResult('Error');
      }
      return;
    }
    
    setExpression(prev => prev + val);
  }, [expression, angleMode]);

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('omni_history');
  };

  return {
    expression,
    setExpression,
    result,
    setResult,
    mode,
    setMode,
    history,
    handleInput,
    angleMode,
    setAngleMode,
    clearHistory
  };
};
