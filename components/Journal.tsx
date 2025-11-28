import React, { useState } from 'react';
import { Plus, Search, Calendar, DollarSign, UploadCloud, X, Filter } from 'lucide-react';
import { MOCK_TRADES } from '../constants';
import { Trade } from '../types';

export const Journal: React.FC = () => {
  const [isEntryOpen, setIsEntryOpen] = useState(false);
  const [filter, setFilter] = useState('');

  // Styles for the Command Palette Modal
  const modalOverlayClass = isEntryOpen 
    ? "fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center opacity-100 transition-opacity duration-200" 
    : "fixed inset-0 pointer-events-none opacity-0 transition-opacity duration-200 z-50";

  const modalContentClass = isEntryOpen 
    ? "bg-[#111] w-full max-w-2xl rounded-2xl border border-zinc-800 shadow-2xl transform scale-100 transition-all duration-200" 
    : "transform scale-95 opacity-0";

  return (
    <div className="p-8 max-w-7xl mx-auto h-full flex flex-col">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-light text-white tracking-tight">Trade Journal</h1>
          <p className="text-zinc-500 text-sm mt-1">Record, reflect, and refine your edge.</p>
        </div>
        <button 
          onClick={() => setIsEntryOpen(true)}
          className="bg-white text-black px-4 py-2 rounded-lg font-medium text-sm hover:bg-zinc-200 transition-colors flex items-center gap-2 shadow-[0_0_15px_rgba(255,255,255,0.1)]"
        >
          <Plus size={16} /> New Entry
        </button>
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

      {/* Table-ish List */}
      <div className="flex-1 overflow-auto rounded-xl border border-zinc-900 bg-[#0c0c0c]">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-zinc-900 text-xs uppercase text-zinc-500">
              <th className="py-3 px-4 font-medium">Date</th>
              <th className="py-3 px-4 font-medium">Pair</th>
              <th className="py-3 px-4 font-medium">Type</th>
              <th className="py-3 px-4 font-medium">Price In</th>
              <th className="py-3 px-4 font-medium">Price Out</th>
              <th className="py-3 px-4 font-medium">P&L</th>
              <th className="py-3 px-4 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {MOCK_TRADES.map((trade, idx) => (
              <tr key={trade.id} className="border-b border-zinc-900/50 hover:bg-zinc-900/30 transition-colors group">
                <td className="py-4 px-4 text-zinc-400 font-mono text-xs">{trade.date.split(' ')[0]}</td>
                <td className="py-4 px-4 font-medium text-white">{trade.pair}</td>
                <td className="py-4 px-4">
                  <span className={`text-[10px] px-1.5 py-0.5 rounded border ${
                    trade.type === 'LONG' 
                      ? 'border-emerald-500/30 text-emerald-500' 
                      : 'border-rose-500/30 text-rose-500'
                  }`}>
                    {trade.type}
                  </span>
                </td>
                <td className="py-4 px-4 text-zinc-300">{trade.entryPrice}</td>
                <td className="py-4 px-4 text-zinc-300">{trade.exitPrice}</td>
                <td className={`py-4 px-4 font-mono ${trade.pnl > 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {trade.pnl > 0 ? '+' : ''}{trade.pnl}
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-2">
                    <span className={`w-1.5 h-1.5 rounded-full ${trade.status === 'WIN' ? 'bg-emerald-500 shadow-[0_0_5px_#10b981]' : 'bg-rose-500'}`} />
                    <span className="text-xs text-zinc-400">{trade.status}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* COMMAND PALETTE MODAL (Simulated) */}
      <div className={modalOverlayClass}>
        <div className={modalContentClass}>
          <div className="p-4 border-b border-zinc-800 flex justify-between items-center bg-[#0e0e0e] rounded-t-2xl">
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
          
          <div className="p-6 space-y-6">
            {/* Command Input Area */}
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
              <div className="border-2 border-dashed border-zinc-800 rounded-xl p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:border-zinc-600 hover:bg-white/5 transition-all group">
                <div className="bg-zinc-900 p-3 rounded-full mb-3 group-hover:scale-110 transition-transform">
                  <UploadCloud size={20} className="text-zinc-400 group-hover:text-white" />
                </div>
                <p className="text-sm text-zinc-400 font-medium">Drop TradingView screenshot</p>
                <p className="text-xs text-zinc-600 mt-1">AI will analyze chart patterns automatically</p>
              </div>
            </div>
          </div>
          
          <div className="p-4 border-t border-zinc-800 bg-[#0e0e0e] rounded-b-2xl flex justify-end gap-3">
            <button onClick={() => setIsEntryOpen(false)} className="px-4 py-2 text-sm text-zinc-400 hover:text-white transition-colors">Cancel</button>
            <button onClick={() => setIsEntryOpen(false)} className="px-6 py-2 bg-white text-black rounded-lg text-sm font-medium hover:bg-zinc-200 transition-colors shadow-[0_0_10px_rgba(255,255,255,0.1)]">Log Trade</button>
          </div>
        </div>
      </div>
    </div>
  );
};