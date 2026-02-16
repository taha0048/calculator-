
export enum CalcMode {
  BASIC = 'BASIC',
  SCIENTIFIC = 'SCIENTIFIC',
  GRAPHING = 'GRAPHING',
  PROGRAMMER = 'PROGRAMMER',
  MATRIX = 'MATRIX',
  CONVERTER = 'CONVERTER'
}

export interface HistoryItem {
  id: string;
  expression: string;
  result: string;
  timestamp: number;
}

export interface MatrixData {
  rows: number;
  cols: number;
  data: number[][];
}

export interface CalculatorState {
  expression: string;
  result: string;
  history: HistoryItem[];
  mode: CalcMode;
  precision: number;
  isDark: boolean;
  angleMode: 'RAD' | 'DEG';
}
