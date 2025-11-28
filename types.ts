export type NavView = 'dashboard' | 'journal' | 'brain' | 'analytics' | 'settings';

export interface Trade {
  id: string;
  pair: string;
  type: 'LONG' | 'SHORT';
  entryPrice: number;
  exitPrice: number;
  pnl: number;
  pnlPercent: number;
  date: string;
  status: 'WIN' | 'LOSS' | 'BE' | 'RUNNING';
  notes?: string;
  screenshotUrl?: string;
  aiAnalysis?: string;
}

export interface Metric {
  label: string;
  value: string | number;
  change?: number; // percentage
  trend?: 'up' | 'down' | 'neutral';
}

export interface EquityPoint {
  date: string;
  equity: number;
}