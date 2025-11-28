import React, { useState } from 'react';
import { Plus, Search, Filter, UploadCloud, X, Hash, Zap, Activity, AlertCircle, Calendar as CalendarIcon, List as ListIcon } from 'lucide-react';
import { useTradeContext } from '../context/TradeContext';
import { AnimatePresence, motion } from 'framer-motion';
import { Trade } from '../types';

const ASSETS = ['BTC/USDT', 'ETH/USDT', 'SOL/USDT', 'XAU/USD', 'EUR/USD', 'GBP/JPY', 'NVDA', 'TSLA'];
const SETUPS = ['Breakout', 'Pullback', 'Reversal', 'Range Bound', 'Liquidity Sweep', 'Gap Fill'];
const EMOTIONS = ['Disciplined', 'FOMO', 'Hesitant', 'Confident', 'Revenge', 'Boredom'];
const TIMEFRAMES = ['1m', '5m', '15m', '1h', '4h', '1D'];

export const Journal: React.FC = () => {
  const { trades, addTrade } = useTradeContext();
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');
  const [isEntryOpen, setIsEntryOpen] = useState(false);
  const [filter, setFilter] = useState('');
  
  // Form State
  const [tradeStatus, setTradeStatus] = useState<'OPEN' | 'CLOSED'>('CLOSED');
  const [selectedAsset, setSelectedAsset] = useState(ASSETS[0]);
  const [direction, setDirection] = useState<'LONG' | 'SHORT'>('LONG');
  const [quantity, setQuantity] = useState(1);
  const [entryPrice, setEntryPrice] = useState('');
  const [exitPrice, setExitPrice] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedTimeframe, setSelectedTimeframe] = useState('15m');

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleLogTrade = () => {
    if (!entryPrice) return;

    const entry = parseFloat(entryPrice);
    const exit = exitPrice ? parseFloat(exitPrice) : 0;
    
    // Logic: Calculate PnL if closed
    let pnl = 0;
    let pnlPercent = 0;
    let finalStatus: Trade['status'] = 'WIN'; // Default

    if (tradeStatus === 'CLOSED' && exit > 0) {
       // PnL = (Exit - Entry) * Quantity * DirectionMultiplier
       const multiplier = direction === 'LONG' ? 1 : -1;
       pnl = (exit - entry) * quantity * multiplier;
       pnlPercent = parseFloat((((exit - entry) / entry) * 100 * multiplier).toFixed(2));
       
       if (pnl > 0) finalStatus = 'WIN';
       else if (pnl < 0) finalStatus = 'LOSS';
       else finalStatus = 'BE';
    } else {
       finalStatus = 'RUNNING'; // Or whatever logic for open trades
    }

    const newTrade: Trade = {
      id: Math.random().toString(36).substr(2, 9),
      pair: selectedAsset,
      type: direction,
      entryPrice: entry,
      exitPrice: exit,
      pnl: pnl,
      pnlPercent: pnlPercent,
      date: new Date().toISOString().replace('T', ' ').substring(0, 16),
      status: finalStatus,
      aiAnalysis: "Analysis pending..."
    };

    addTrade(newTrade);
    setIsEntryOpen(false);
    
    // Reset Form (Optional but good UX)
    setEntryPrice('');
    setExitPrice('');
  };

  // Calendar Logic
  const getDaysInMonth = () => {
    const now = new Date();
    const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1).getDay(); // 0 = Sun
    // Adjust so 0 = Mon for standard trading calendars
    const offset = firstDay === 0 ? 6 : firstDay - 1; 
    
    const days = [];
    for(let i = 0; i < offset; i++) days.push(null);
    for(let i = 1; i <= daysInMonth; i++) days.push(i);
    return days;
  };

  const getTradesForDay = (day: number) => {
    if (!day) return [];
    const now = new Date();
    // Format: YYYY-MM-DD
    const dateStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return trades.filter(t => t.date.startsWith(dateStr));
  };

  const calendarDays = getDaysInMonth();

  const listVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  const rowVariants = {
    hidden: { opacity: 0, x: -10 },
    show: { opacity: 1, x: 0 }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto h-full flex flex-col">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-light text-white tracking-tight">Trade Journal</h1>
          <p className="text-zinc-500 text-sm mt-1">Record, reflect, and refine your edge.</p>
        </div>
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsEntryOpen(true)}
          className="bg-white text-black px-4 py-2 rounded-lg font-medium text-sm hover:bg-zinc-200 transition-colors flex items-center gap-2 shadow-[0_0_15px_rgba(255,255,255,0.1)]"
        >
          <Plus size={16} /> New Entry
        </motion.button>
      </div>

      {/* Controls & Filters */}
      <div className="flex justify-between gap-4 mb-6">
        <div className="flex gap-4 flex-1">
            <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
            <input 
                type="text" 
                placeholder="Search symbols..." 
                className="w-full bg-[#0a0a0a] border border-zinc-800 rounded-lg py-2 pl-10 pr-4 text-sm text-white focus:border-zinc-600 focus:outline-none placeholder:text-zinc-700 transition-colors"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
            />
            </div>
        </div>

        {/* View Toggle */}
        <div className="flex bg-[#0a0a0a] border border-zinc-800 rounded-lg p-1">
            <button 
                onClick={() => setViewMode('list')}
                className={`px-3 py-1.5 rounded-md flex items-center gap-2 text-xs font-medium transition-all ${viewMode === 'list' ? 'bg-zinc-800 text-white' : 'text-zinc-500 hover:text-white'}`}
            >
                <ListIcon size={14} /> List
            </button>
            <button 
                onClick={() => setViewMode('calendar')}
                className={`px-3 py-1.5 rounded-md flex items-center gap-2 text-xs font-medium transition-all ${viewMode === 'calendar' ? 'bg-zinc-800 text-white' : 'text-zinc-500 hover:text-white'}`}
            >
                <CalendarIcon size={14} /> Calendar
            </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-auto rounded-xl border border-white/5 bg-[#0c0c0c] custom-scrollbar relative">
        
        {viewMode === 'list' && (
           <>
            <div className="grid grid-cols-12 gap-4 border-b border-white/5 py-3 px-4 bg-zinc-900/30 sticky top-0 backdrop-blur-sm z-10 text-xs uppercase text-zinc-500 font-medium">
              <div className="col-span-2">Date</div>
              <div className="col-span-2">Pair</div>
              <div className="col-span-1">Type</div>
              <div className="col-span-2">Entry</div>
              <div className="col-span-2">Exit</div>
              <div className="col-span-1">P&L</div>
              <div className="col-span-2 text-right">Status</div>
            </div>

            <motion.div className="divide-y divide-white/5" variants={listVariants} initial="hidden" animate="show">
              {trades.length === 0 && <div className="p-8 text-center text-zinc-600 text-sm">No trades found. Start logging!</div>}
              {trades.map((trade) => (
                <motion.div 
                  key={trade.id} 
                  variants={rowVariants}
                  className="grid grid-cols-12 gap-4 py-4 px-4 items-center hover:bg-white/5 transition-colors cursor-default text-sm"
                >
                  <div className="col-span-2 text-zinc-400 font-mono text-xs">{trade.date}</div>
                  <div className="col-span-2 font-medium text-white">{trade.pair}</div>
                  <div className="col-span-1">
                    <span className={`text-[10px] px-1.5 py-0.5 rounded border ${
                      trade.type === 'LONG' ? 'border-emerald-500/30 text-emerald-500' : 'border-rose-500/30 text-rose-500'
                    }`}>
                      {trade.type}
                    </span>
                  </div>
                  <div className="col-span-2 text-zinc-300 font-mono">{trade.entryPrice}</div>
                  <div className="col-span-2 text-zinc-300 font-mono">{trade.exitPrice || '-'}</div>
                  <div className={`col-span-1 font-mono font-medium ${trade.pnl > 0 ? 'text-emerald-400' : trade.pnl < 0 ? 'text-rose-400' : 'text-zinc-500'}`}>
                    {trade.pnl !== 0 ? (trade.pnl > 0 ? `+${trade.pnl}` : trade.pnl) : '-'}
                  </div>
                  <div className="col-span-2 flex justify-end">
                    <div className={`flex items-center gap-2 px-2 py-1 rounded-full border ${
                        trade.status === 'WIN' ? 'border-emerald-500/20 bg-emerald-500/10' : 
                        trade.status === 'LOSS' ? 'border-rose-500/20 bg-rose-500/10' :
                        trade.status === 'RUNNING' ? 'border-blue-500/20 bg-blue-500/10' :
                        'border-zinc-500/20 bg-zinc-500/10'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${
                          trade.status === 'WIN' ? 'bg-emerald-500 shadow-[0_0_5px_#10b981]' : 
                          trade.status === 'LOSS' ? 'bg-rose-500' :
                          trade.status === 'RUNNING' ? 'bg-blue-500 animate-pulse' :
                          'bg-zinc-500'
                      }`} />
                      <span className={`text-xs ${
                          trade.status === 'WIN' ? 'text-emerald-400' : 
                          trade.status === 'LOSS' ? 'text-rose-400' :
                          trade.status === 'RUNNING' ? 'text-blue-400' :
                          'text-zinc-400'
                      }`}>{trade.status}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
           </>
        )}

        {viewMode === 'calendar' && (
            <div className="p-6 h-full flex flex-col">
                {/* Calendar Grid Header */}
                <div className="grid grid-cols-7 mb-2 text-center">
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(d => (
                        <div key={d} className="text-xs font-bold text-zinc-600 uppercase tracking-widest">{d}</div>
                    ))}
                </div>
                
                {/* Calendar Grid Body */}
                <div className="grid grid-cols-7 grid-rows-5 flex-1 gap-2">
                    {calendarDays.map((day, idx) => {
                        const dayTrades = getDaysInMonth() && day ? getTradesForDay(day) : [];
                        const dailyPnL = dayTrades.reduce((sum, t) => sum + t.pnl, 0);
                        const hasTrades = dayTrades.length > 0;
                        const isProfit = dailyPnL > 0;

                        return (
                            <div key={idx} className={`relative bg-zinc-900/40 border border-white/5 rounded-xl p-2 min-h-[100px] flex flex-col ${!day ? 'opacity-0 pointer-events-none' : ''}`}>
                                {day && (
                                    <>
                                        <span className="text-xs text-zinc-500 font-mono">{day}</span>
                                        {hasTrades && (
                                            <div className="flex-1 flex flex-col justify-center items-center gap-1 mt-1">
                                                <div className={`text-sm font-bold font-mono ${isProfit ? 'text-emerald-400' : 'text-rose-400'}`}>
                                                    {isProfit ? '+' : ''}{dailyPnL}
                                                </div>
                                                <div className="flex gap-1">
                                                    {dayTrades.map((t, i) => (
                                                        <div key={i} className={`w-1 h-3 rounded-full ${t.pnl > 0 ? 'bg-emerald-500' : t.pnl < 0 ? 'bg-rose-500' : 'bg-blue-500'}`}></div>
                                                    ))}
                                                </div>
                                                <span className="text-[10px] text-zinc-600">{dayTrades.length} trades</span>
                                            </div>
                                        )}
                                        {/* Background Glow for Winning/Losing Days */}
                                        {hasTrades && (
                                            <div className={`absolute inset-0 rounded-xl opacity-5 pointer-events-none ${isProfit ? 'bg-emerald-500' : 'bg-rose-500'}`}></div>
                                        )}
                                    </>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        )}

      </div>

      {/* GAMIFIED ENTRY MODAL */}
      <AnimatePresence>
        {isEntryOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
             <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsEntryOpen(false)}
                className="absolute inset-0 bg-black/80 backdrop-blur-md"
             />

             <motion.div 
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="relative w-full max-w-3xl bg-[#0a0a0a] rounded-2xl border border-zinc-800 shadow-2xl overflow-hidden"
             >
                {/* Header */}
                <div className="p-5 border-b border-zinc-800 flex justify-between items-center bg-[#111]">
                  <div className="flex items-center gap-4">
                     <div className="flex items-center gap-2">
                        <div className="p-1.5 bg-zinc-800 rounded-md"><Zap size={14} className="text-[#00ff9d]" /></div>
                        <span className="text-zinc-200 text-sm font-medium tracking-wide">Quick Log</span>
                     </div>
                     {/* Toggle Live/History */}
                     <div className="bg-zinc-900 rounded-lg p-1 flex border border-zinc-800">
                        <button onClick={() => setTradeStatus('CLOSED')} className={`px-3 py-1 text-xs rounded-md transition-all ${tradeStatus === 'CLOSED' ? 'bg-zinc-800 text-white shadow-sm' : 'text-zinc-500'}`}>History</button>
                        <button onClick={() => setTradeStatus('OPEN')} className={`px-3 py-1 text-xs rounded-md transition-all ${tradeStatus === 'OPEN' ? 'bg-zinc-800 text-white shadow-sm' : 'text-zinc-500'}`}>Live</button>
                     </div>
                  </div>
                  <button onClick={() => setIsEntryOpen(false)} className="text-zinc-500 hover:text-white transition-colors">
                    <X size={18} />
                  </button>
                </div>
                
                <div className="p-8 max-h-[75vh] overflow-y-auto custom-scrollbar">
                  <div className="space-y-8">
                    
                    {/* 1. Asset Selection (Chips) */}
                    <div>
                      <label className="text-xs uppercase text-zinc-500 font-bold mb-3 block flex items-center gap-2">
                        <Hash size={12} /> Asset
                      </label>
                      <div className="flex flex-wrap gap-3">
                        {ASSETS.map((asset) => (
                          <motion.button
                            key={asset}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setSelectedAsset(asset)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all border ${
                              selectedAsset === asset
                                ? 'bg-[#00ff9d]/10 border-[#00ff9d] text-[#00ff9d] shadow-[0_0_10px_rgba(0,255,157,0.2)]'
                                : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:bg-zinc-800 hover:border-zinc-700'
                            }`}
                          >
                            {asset}
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    {/* 2. Direction Toggle (Segmented) */}
                    <div className="grid grid-cols-2 gap-4">
                       <motion.button
                         whileTap={{ scale: 0.98 }}
                         onClick={() => setDirection('LONG')}
                         className={`relative h-16 rounded-xl border flex flex-col items-center justify-center transition-all ${
                           direction === 'LONG'
                             ? 'bg-emerald-500/10 border-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.2)]'
                             : 'bg-zinc-900/50 border-zinc-800 opacity-50 hover:opacity-100'
                         }`}
                       >
                         <span className={`text-lg font-bold tracking-widest ${direction === 'LONG' ? 'text-emerald-400' : 'text-zinc-500'}`}>LONG</span>
                         {direction === 'LONG' && <div className="absolute inset-0 bg-emerald-500/5 blur-xl rounded-xl" />}
                       </motion.button>

                       <motion.button
                         whileTap={{ scale: 0.98 }}
                         onClick={() => setDirection('SHORT')}
                         className={`relative h-16 rounded-xl border flex flex-col items-center justify-center transition-all ${
                           direction === 'SHORT'
                             ? 'bg-rose-500/10 border-rose-500/50 shadow-[0_0_20px_rgba(244,63,94,0.2)]'
                             : 'bg-zinc-900/50 border-zinc-800 opacity-50 hover:opacity-100'
                         }`}
                       >
                         <span className={`text-lg font-bold tracking-widest ${direction === 'SHORT' ? 'text-rose-400' : 'text-zinc-500'}`}>SHORT</span>
                         {direction === 'SHORT' && <div className="absolute inset-0 bg-rose-500/5 blur-xl rounded-xl" />}
                       </motion.button>
                    </div>

                    {/* 3. Inputs Row */}
                    <div className="grid grid-cols-3 gap-6">
                       <div>
                          <label className="text-[10px] uppercase text-zinc-500 font-bold mb-2 block">Entry Price</label>
                          <input 
                            type="number" 
                            className="w-full bg-[#111] border border-zinc-800 rounded-lg p-3 text-lg font-mono text-white focus:border-[#00ff9d] focus:ring-1 focus:ring-[#00ff9d] outline-none transition-all placeholder:text-zinc-700" 
                            placeholder="0.00"
                            value={entryPrice}
                            onChange={(e) => setEntryPrice(e.target.value)}
                          />
                       </div>
                       <div>
                          <label className="text-[10px] uppercase text-zinc-500 font-bold mb-2 block">{tradeStatus === 'CLOSED' ? 'Exit Price' : 'Target Price'}</label>
                          <input 
                            type="number" 
                            className="w-full bg-[#111] border border-zinc-800 rounded-lg p-3 text-lg font-mono text-white focus:border-[#00ff9d] focus:ring-1 focus:ring-[#00ff9d] outline-none transition-all placeholder:text-zinc-700" 
                            placeholder="0.00"
                            value={exitPrice}
                            onChange={(e) => setExitPrice(e.target.value)}
                          />
                       </div>
                       <div>
                          <label className="text-[10px] uppercase text-zinc-500 font-bold mb-2 block">Size / Qty</label>
                          <input 
                            type="number" 
                            className="w-full bg-[#111] border border-zinc-800 rounded-lg p-3 text-lg font-mono text-white focus:border-[#00ff9d] focus:ring-1 focus:ring-[#00ff9d] outline-none transition-all placeholder:text-zinc-700" 
                            value={quantity}
                            onChange={(e) => setQuantity(parseFloat(e.target.value))}
                          />
                       </div>
                    </div>

                    {/* 4. Context Tags */}
                    <div className="space-y-4">
                      <div>
                        <label className="text-[10px] uppercase text-zinc-500 font-bold mb-2 flex items-center gap-1">
                          <Activity size={12} /> Setup
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {SETUPS.map(tag => (
                            <motion.button
                              key={tag}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => toggleTag(tag)}
                              className={`px-3 py-1.5 rounded-md text-xs font-medium border transition-colors ${
                                selectedTags.includes(tag)
                                  ? 'bg-blue-500/20 border-blue-500/50 text-blue-400'
                                  : 'bg-zinc-900 border-zinc-800 text-zinc-500 hover:border-zinc-700 hover:text-zinc-300'
                              }`}
                            >
                              {tag}
                            </motion.button>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <label className="text-[10px] uppercase text-zinc-500 font-bold mb-2 flex items-center gap-1">
                          <AlertCircle size={12} /> Emotion
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {EMOTIONS.map(tag => (
                            <motion.button
                              key={tag}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => toggleTag(tag)}
                              className={`px-3 py-1.5 rounded-md text-xs font-medium border transition-colors ${
                                selectedTags.includes(tag)
                                  ? 'bg-purple-500/20 border-purple-500/50 text-purple-400'
                                  : 'bg-zinc-900 border-zinc-800 text-zinc-500 hover:border-zinc-700 hover:text-zinc-300'
                              }`}
                            >
                              {tag}
                            </motion.button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* 5. Dropzone */}
                    <motion.div 
                      whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.03)" }}
                      className="border-2 border-dashed border-zinc-800 rounded-xl p-6 flex items-center justify-center gap-4 cursor-pointer group"
                    >
                       <div className="p-3 bg-zinc-900 rounded-full group-hover:scale-110 transition-transform">
                          <UploadCloud size={20} className="text-zinc-400 group-hover:text-[#00ff9d] transition-colors" />
                       </div>
                       <div className="text-left">
                          <p className="text-sm text-zinc-300 font-medium">Drop screenshot</p>
                          <p className="text-xs text-zinc-600">or click to browse</p>
                       </div>
                    </motion.div>

                  </div>
                </div>
                
                {/* Footer Action */}
                <div className="p-5 border-t border-zinc-800 bg-[#111]">
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleLogTrade}
                    className="w-full py-4 bg-[#00ff9d] text-black rounded-xl font-bold text-lg tracking-wide hover:bg-[#00ff9d]/90 transition-colors shadow-[0_0_20px_rgba(0,255,157,0.3)] relative overflow-hidden"
                  >
                    LOG {tradeStatus === 'OPEN' ? 'OPENING' : 'CLOSED'} TRADE
                    <div className="absolute inset-0 bg-white/20 -skew-x-12 -translate-x-full hover:animate-[shine_1s_infinite]" />
                  </motion.button>
                </div>
             </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};