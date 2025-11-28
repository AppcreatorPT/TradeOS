import { EquityPoint, Trade } from "./types";

export const MOCK_TRADES: Trade[] = [
  {
    id: 't-1',
    pair: 'BTC/USDT',
    type: 'LONG',
    entryPrice: 42000,
    exitPrice: 43500,
    pnl: 1500,
    pnlPercent: 3.57,
    date: '2023-10-24 14:30',
    status: 'WIN',
    aiAnalysis: "Great patience on the retest of the 42k support level. High volume confirmation observed."
  },
  {
    id: 't-2',
    pair: 'EUR/USD',
    type: 'SHORT',
    entryPrice: 1.0850,
    exitPrice: 1.0865,
    pnl: -150,
    pnlPercent: -0.14,
    date: '2023-10-25 09:15',
    status: 'LOSS',
    aiAnalysis: "⚠️ Revenge Trading Detected: You entered this trade 5min after a previous loss on GBPJPY."
  },
  {
    id: 't-3',
    pair: 'XAU/USD',
    type: 'LONG',
    entryPrice: 1950,
    exitPrice: 1980,
    pnl: 3000,
    pnlPercent: 1.54,
    date: '2023-10-26 11:00',
    status: 'WIN',
    aiAnalysis: "Perfect execution of the Golden Pocket setup. Risk to Reward ratio was 1:4."
  },
  {
    id: 't-4',
    pair: 'NVDA',
    type: 'LONG',
    entryPrice: 450,
    exitPrice: 442,
    pnl: -800,
    pnlPercent: -1.7,
    date: '2023-10-27 09:30',
    status: 'LOSS',
    aiAnalysis: "Entered into resistance. Momentum indicators were showing bearish divergence."
  },
  {
    id: 't-5',
    pair: 'ETH/USDT',
    type: 'SHORT',
    entryPrice: 2200,
    exitPrice: 2150,
    pnl: 500,
    pnlPercent: 2.27,
    date: '2023-10-27 15:45',
    status: 'WIN',
    aiAnalysis: "Clean breakdown retest."
  }
];

// Generate a smoothish curve based on the mock trades plus some history
export const EQUITY_DATA: EquityPoint[] = [
  { date: 'Mon', equity: 10000 },
  { date: 'Tue', equity: 10200 },
  { date: 'Wed', equity: 10150 },
  { date: 'Thu', equity: 10400 },
  { date: 'Fri', equity: 10300 },
  { date: 'Sat', equity: 10800 },
  { date: 'Sun', equity: 11200 },
  { date: 'Mon', equity: 11050 },
  { date: 'Tue', equity: 11500 },
  { date: 'Wed', equity: 12100 },
];
