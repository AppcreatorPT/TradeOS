import React, { useState } from 'react';
import { Plus, Search, Filter, UploadCloud, X, Hash, Zap, Activity, AlertCircle } from 'lucide-react';
import { MOCK_TRADES } from '../constants';
import { AnimatePresence, motion } from 'framer-motion';

const ASSETS = ['BTC/USDT', 'ETH/USDT', 'SOL/USDT', 'XAU/USD', 'EUR/USD', 'GBP/JPY', 'NVDA', 'TSLA'];
const SETUPS = ['Breakout', 'Pullback', 'Reversal', 'Range Bound', 'Liquidity Sweep', 'Gap Fill'];
const EMOTIONS = ['Disciplined', 'FOMO', 'Hesitant', 'Confident', 'Revenge', 'Boredom'];
const TIMEFRAMES = ['1m', '5m', '15m', '1h', '4h', '1D'];

export const Journal: React.FC = () => {
  const [isEntryOpen, setIsEntryOpen] = useState(false);
  const [filter, setFilter] = useState('');
  
  // Form State
  const [selectedAsset, setSelectedAsset] = useState(ASSETS[0]);
  const [direction, setDirection] = useState<'LONG' | 'SHORT'>('LONG');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedTimeframe, setSelectedTimeframe] = useState('15m');

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

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

      {/* Filters & Search */}
      <div className="flex gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
          <input 
            type="text" 
            placeholder="Search symbols, notes..." 
            className="w-full bg-[#0a0a0a] border border-zinc-800 rounded-lg py-2 pl-10 pr-4 text-sm text-white focus:border-zinc-600 focus:outline-none placeholder:text-zinc-700 transition-colors"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>
        <button className="px-3 py-2 border border-zinc-800 rounded-lg text-zinc-400 hover:text-white hover:border-zinc-600 transition-colors">
          <Filter size={16} />
        </button>
      </div>

      {/* List */}
      <div className="flex-1 overflow-auto rounded-xl border border-white/5 bg-[#0c0c0c] custom-scrollbar">
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
          {MOCK_TRADES.map((trade) => (
            <motion.div 
              key={trade.id} 
              variants={rowVariants}
              className="grid grid-cols-12 gap-4 py-4 px-4 items-center hover:bg-white/5 transition-colors cursor-default text-sm"
            >
              <div className="col-span-2 text-zinc-400 font-mono text-xs">{trade.date.split(' ')[0]}</div>
              <div className="col-span-2 font-medium text-white">{trade.pair}</div>
              <div className="col-span-1">
                <span className={`text-[10px] px-1.5 py-0.5 rounded border ${
                  trade.type === 'LONG' ? 'border-emerald-500/30 text-emerald-500' : 'border-rose-500/30 text-rose-500'
                }`}>
                  {trade.type}
                </span>
              </div>
              <div className="col-span-2 text-zinc-300 font-mono">{trade.entryPrice}</div>
              <div className="col-span-2 text-zinc-300 font-mono">{trade.exitPrice}</div>
              <div className={`col-span-1 font-mono font-medium ${trade.pnl > 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                {trade.pnl > 0 ? '+' : ''}{trade.pnl}
              </div>
              <div className="col-span-2 flex justify-end">
                <div className={`flex items-center gap-2 px-2 py-1 rounded-full border ${trade.status === 'WIN' ? 'border-emerald-500/20 bg-emerald-500/10' : 'border-rose-500/20 bg-rose-500/10'}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${trade.status === 'WIN' ? 'bg-emerald-500 shadow-[0_0_5px_#10b981]' : 'bg-rose-500'}`} />
                  <span className={`text-xs ${trade.status === 'WIN' ? 'text-emerald-400' : 'text-rose-400'}`}>{trade.status}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
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
                  <div className="flex items-center gap-2">
                     <div className="p-1.5 bg-zinc-800 rounded-md"><Zap size={14} className="text-[#00ff9d]" /></div>
                     <span className="text-zinc-200 text-sm font-medium tracking-wide">Quick Log</span>
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
                        <motion.button whileHover={{ scale: 1.05 }} className="px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-500 hover:text-white">
                          <Search size={16} />
                        </motion.button>
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
                          <input type="number" className="w-full bg-[#111] border border-zinc-800 rounded-lg p-3 text-lg font-mono text-white focus:border-[#00ff9d] focus:ring-1 focus:ring-[#00ff9d] outline-none transition-all placeholder:text-zinc-700" placeholder="0.00" />
                       </div>
                       <div>
                          <label className="text-[10px] uppercase text-zinc-500 font-bold mb-2 block">Exit Price</label>
                          <input type="number" className="w-full bg-[#111] border border-zinc-800 rounded-lg p-3 text-lg font-mono text-white focus:border-[#00ff9d] focus:ring-1 focus:ring-[#00ff9d] outline-none transition-all placeholder:text-zinc-700" placeholder="0.00" />
                       </div>
                       <div>
                          <label className="text-[10px] uppercase text-zinc-500 font-bold mb-2 block">Timeframe</label>
                          <select 
                            className="w-full bg-[#111] border border-zinc-800 rounded-lg p-3 text-white focus:border-[#00ff9d] outline-none appearance-none"
                            value={selectedTimeframe}
                            onChange={(e) => setSelectedTimeframe(e.target.value)}
                          >
                            {TIMEFRAMES.map(tf => <option key={tf} value={tf}>{tf}</option>)}
                          </select>
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
                    onClick={() => setIsEntryOpen(false)}
                    className="w-full py-4 bg-[#00ff9d] text-black rounded-xl font-bold text-lg tracking-wide hover:bg-[#00ff9d]/90 transition-colors shadow-[0_0_20px_rgba(0,255,157,0.3)] relative overflow-hidden"
                  >
                    LOG TRADE
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