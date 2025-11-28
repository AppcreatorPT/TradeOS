import React, { createContext, useContext, useState, useEffect } from 'react';
import { Trade } from '../types';
import { MOCK_TRADES } from '../constants';

interface TradeContextType {
  trades: Trade[];
  accountBalance: number;
  setAccountBalance: (balance: number) => void;
  addTrade: (trade: Trade) => void;
  deleteTrade: (id: string) => void;
  getMetrics: () => {
    winRate: number;
    profitFactor: number;
    totalPnL: number;
    activeStreak: number;
  };
}

const TradeContext = createContext<TradeContextType | undefined>(undefined);

export const TradeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load initial state from localStorage or fallback to defaults
  const [trades, setTrades] = useState<Trade[]>(() => {
    const saved = localStorage.getItem('tradeos_trades');
    return saved ? JSON.parse(saved) : MOCK_TRADES;
  });

  const [accountBalance, setAccountBalanceState] = useState<number>(() => {
    const saved = localStorage.getItem('tradeos_balance');
    return saved ? parseFloat(saved) : 10000;
  });

  // Persistence effects
  useEffect(() => {
    localStorage.setItem('tradeos_trades', JSON.stringify(trades));
  }, [trades]);

  useEffect(() => {
    localStorage.setItem('tradeos_balance', accountBalance.toString());
  }, [accountBalance]);

  const setAccountBalance = (balance: number) => {
    setAccountBalanceState(balance);
  };

  const addTrade = (trade: Trade) => {
    setTrades(prev => [trade, ...prev]);
  };

  const deleteTrade = (id: string) => {
    setTrades(prev => prev.filter(t => t.id !== id));
  };

  const getMetrics = () => {
    const closedTrades = trades.filter(t => t.status === 'WIN' || t.status === 'LOSS' || t.status === 'BE');
    if (closedTrades.length === 0) return { winRate: 0, profitFactor: 0, totalPnL: 0, activeStreak: 0 };

    const wins = closedTrades.filter(t => t.status === 'WIN').length;
    const winRate = Math.round((wins / closedTrades.length) * 100);

    const grossProfit = closedTrades.filter(t => t.pnl > 0).reduce((acc, t) => acc + t.pnl, 0);
    const grossLoss = Math.abs(closedTrades.filter(t => t.pnl < 0).reduce((acc, t) => acc + t.pnl, 0));
    const profitFactor = grossLoss === 0 ? grossProfit : parseFloat((grossProfit / grossLoss).toFixed(2));

    const totalPnL = closedTrades.reduce((acc, t) => acc + t.pnl, 0);

    // Calculate Streak
    let streak = 0;
    for (let i = 0; i < closedTrades.length; i++) {
        // Since trades are ordered newest first, we check from index 0
        if (closedTrades[i].status === 'WIN') {
            streak++;
        } else {
            break;
        }
    }

    return { winRate, profitFactor, totalPnL, activeStreak: streak };
  };

  return (
    <TradeContext.Provider value={{ trades, accountBalance, setAccountBalance, addTrade, deleteTrade, getMetrics }}>
      {children}
    </TradeContext.Provider>
  );
};

export const useTradeContext = () => {
  const context = useContext(TradeContext);
  if (!context) {
    throw new Error('useTradeContext must be used within a TradeProvider');
  }
  return context;
};