
import * as math from 'mathjs';
import Decimal from 'decimal.js';

// Configure Decimal.js
Decimal.set({ precision: 64, rounding: Decimal.ROUND_HALF_UP });

export const evaluateExpression = (expr: string, config: { angleMode: 'RAD' | 'DEG' } = { angleMode: 'RAD' }): string => {
  try {
    if (!expr || expr.trim() === '') return '';
    
    // Replace visual operators with math.js compatible ones
    let sanitized = expr
      .replace(/×/g, '*')
      .replace(/÷/g, '/')
      .replace(/−/g, '-')
      .replace(/π/g, 'pi')
      .replace(/e/g, 'e');

    // Handle basic evaluation
    const res = math.evaluate(sanitized);
    
    if (typeof res === 'number') {
      // Use Decimal for high precision formatting
      return new Decimal(res).toSignificantDigits(12).toString();
    }
    
    if (res && typeof res.toString === 'function') {
      return res.toString();
    }
    
    return String(res);
  } catch (error) {
    console.error('Eval error:', error);
    return 'Error';
  }
};

export const simplifyExpression = (expr: string): string => {
  try {
    return math.simplify(expr).toString();
  } catch {
    return expr;
  }
};

export const differentiateExpression = (expr: string, variable: string = 'x'): string => {
  try {
    return math.derivative(expr, variable).toString();
  } catch {
    return 'Error';
  }
};

export const generateGraphPoints = (expr: string, range: { min: number, max: number, steps: number }) => {
  const points: { x: number, y: number }[] = [];
  const step = (range.max - range.min) / range.steps;
  
  try {
    const compiled = math.compile(expr);
    for (let x = range.min; x <= range.max; x += step) {
      try {
        const y = compiled.evaluate({ x });
        if (typeof y === 'number' && isFinite(y)) {
          points.push({ x, y });
        }
      } catch {
        // Skip points that can't be evaluated
      }
    }
  } catch (err) {
    console.error('Graph generation error', err);
  }
  
  return points;
};
