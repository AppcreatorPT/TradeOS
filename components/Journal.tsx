import React, { useState } from 'react';
import { Plus, Search, Filter, UploadCloud, X } from 'lucide-react';
import { MOCK_TRADES } from '../constants';
import { AnimatePresence, motion } from 'framer-motion';

export const Journal: React.FC = () => {
  const [isEntryOpen, setIsEntryOpen] = useState(false);
  const [filter, setFilter] = useState('');

  const listVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
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

      {/* List - CSS Grid based for better control than table */}
      <div className="flex-1 overflow-auto rounded-xl border border-white/5 bg-[#0c0c0c] custom-scrollbar">
        {/* Header */}
        <div className="grid grid-cols-12 gap-4 border-b border-white/5 py-3 px-4 bg-zinc-900/30 sticky top-0 backdrop-blur-sm z-10 text-xs uppercase text-zinc-500 font-medium">
          <div className="col-span-2">Date</div>
          <div className="col-span-2">Pair</div>
          <div className="col-span-1">Type</div>
          <div className="col-span-2">Entry</div>
          <div className="col-span-2">Exit</div>
          <div className="col-span-1">P&L</div>
          <div className="col-span-2 text-right">Status</div>
        </div>

        {/* Rows */}
        <motion.div 
          className="divide-y divide-white/5"
          variants={listVariants}
          initial="hidden"
          animate="show"
        >
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
                  trade.type === 'LONG' 
                    ? 'border-emerald-500/30 text-emerald-500' 
                    : 'border-rose-500/30 text-rose-500'
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

      {/* COMMAND PALETTE MODAL */}
      <AnimatePresence>
        {isEntryOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
             {/* Backdrop */}
             <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsEntryOpen(false)}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
             />

             {/* Content */}
             <motion.div 
                initial={{ scale: 0.9, opacity: 0, y: 10 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 10 }}
                transition={{ type: "spring", stiffness: 350, damping: 25 }}
                className="relative w-full max-w-2xl bg-[#0F0F0F] rounded-2xl border border-zinc-800 shadow-2xl overflow-hidden"
             >
                <div className="p-4 border-b border-zinc-800 flex justify-between items-center bg-[#141414]">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></span>
                    <span className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></span>
                    <span className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></span>
                    <span className="ml-2 text-zinc-500 text-xs font-mono">New Trade Entry</span>
                  </div>
                  <button onClick={() => setIsEntryOpen(false)} className="text-zinc-500 hover:text-white">
                    <X size={16} />
                  </button>
                </div>
                
                <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                       <div className="group relative">
                          <label className="text-[10px] uppercase text-zinc-500 font-bold mb-1 block">Pair</label>
                          <input type="text" placeholder="e.g. BTC/USDT" className="w-full bg-transparent border-b border-zinc-800 pb-2 text-lg text-white focus:border-[#00ff9d] focus:outline-none transition-colors" autoFocus />
                       </div>
                       <div className="group relative">
                          <label className="text-[10px] uppercase text-zinc-500 font-bold mb-1 block">Direction</label>
                          <select className="w-full bg-transparent border-b border-zinc-800 pb-2 text-lg text-white focus:border-[#00ff9d] focus:outline-none transition-colors appearance-none">
                            <option className="bg-zinc-900">Long</option>
                            <option className="bg-zinc-900">Short</option>
                          </select>
                       </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                       <div>
                          <label className="text-[10px] uppercase text-zinc-500 font-bold mb-1 block">Entry Price</label>
                          <input type="number" className="w-full bg-transparent border-b border-zinc-800 pb-2 text-white focus:border-[#00ff9d] focus:outline-none transition-colors font-mono" />
                       </div>
                       <div>
                          <label className="text-[10px] uppercase text-zinc-500 font-bold mb-1 block">Exit Price</label>
                          <input type="number" className="w-full bg-transparent border-b border-zinc-800 pb-2 text-white focus:border-[#00ff9d] focus:outline-none transition-colors font-mono" />
                       </div>
                       <div>
                          <label className="text-[10px] uppercase text-zinc-500 font-bold mb-1 block">Date</label>
                          <input type="datetime-local" className="w-full bg-transparent border-b border-zinc-800 pb-2 text-white focus:border-[#00ff9d] focus:outline-none transition-colors text-sm" />
                       </div>
                    </div>

                    <div>
                      <label className="text-[10px] uppercase text-zinc-500 font-bold mb-1 block">Notes / Confluence</label>
                      <textarea rows={3} placeholder="What was your rationale?" className="w-full bg-zinc-900/50 rounded-lg p-3 text-sm text-zinc-300 focus:ring-1 focus:ring-[#00ff9d] focus:outline-none border border-transparent resize-none"></textarea>
                    </div>

                    {/* Upload Dropzone */}
                    <motion.div 
                      whileHover={{ scale: 1.01, borderColor: "rgba(255, 255, 255, 0.2)" }}
                      whileTap={{ scale: 0.99 }}
                      className="border-2 border-dashed border-zinc-800 rounded-xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-all group"
                    >
                      <motion.div 
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="bg-zinc-900 p-3 rounded-full mb-3"
                      >
                        <UploadCloud size={20} className="text-zinc-400 group-hover:text-white" />
                      </motion.div>
                      <p className="text-sm text-zinc-400 font-medium">Drop TradingView screenshot</p>
                      <p className="text-xs text-zinc-600 mt-1">AI will analyze chart patterns automatically</p>
                    </motion.div>
                  </div>
                </div>
                
                <div className="p-4 border-t border-zinc-800 bg-[#141414] flex justify-end gap-3">
                  <button onClick={() => setIsEntryOpen(false)} className="px-4 py-2 text-sm text-zinc-400 hover:text-white transition-colors">Cancel</button>
                  <button onClick={() => setIsEntryOpen(false)} className="px-6 py-2 bg-white text-black rounded-lg text-sm font-medium hover:bg-zinc-200 transition-colors shadow-[0_0_10px_rgba(255,255,255,0.1)]">Log Trade</button>
                </div>
             </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};