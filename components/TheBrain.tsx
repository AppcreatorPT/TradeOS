import React from 'react';
import { BrainCircuit, AlertTriangle, CheckCircle2, TrendingUp, Sparkles, Lock } from 'lucide-react';
import { MOCK_TRADES } from '../constants';

export const TheBrain: React.FC = () => {
  return (
    <div className="p-8 max-w-7xl mx-auto h-full overflow-y-auto">
      <div className="flex items-center gap-4 mb-10">
        <div className="p-3 bg-[#00ff9d]/10 rounded-2xl border border-[#00ff9d]/20 shadow-[0_0_20px_rgba(0,255,157,0.15)]">
          <BrainCircuit size={32} className="text-[#00ff9d]" />
        </div>
        <div>
           <h1 className="text-3xl font-light text-white tracking-tight">The Brain</h1>
           <p className="text-zinc-500 text-sm mt-1">AI-powered pattern recognition and behavioral analysis.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Feed */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-sm font-bold text-zinc-500 uppercase tracking-widest mb-4">Live Insights</h2>
          
          {MOCK_TRADES.slice().reverse().map((trade) => (
            <div key={trade.id} className="glass-panel p-6 rounded-2xl border-l-2 border-l-transparent hover:border-l-[#00ff9d] transition-all group">
               <div className="flex justify-between items-start mb-3">
                 <div className="flex items-center gap-2">
                    <span className="text-white font-mono font-medium">{trade.pair}</span>
                    <span className="text-zinc-600 text-xs">•</span>
                    <span className="text-zinc-500 text-xs">{trade.date}</span>
                 </div>
                 <div className={`px-2 py-0.5 rounded text-[10px] border ${
                   trade.status === 'WIN' ? 'border-emerald-500/20 text-emerald-500' : 'border-rose-500/20 text-rose-500'
                 }`}>
                   {trade.status}
                 </div>
               </div>
               
               <div className="flex gap-4">
                 <div className="mt-1">
                   {trade.aiAnalysis?.includes('⚠️') 
                      ? <AlertTriangle size={18} className="text-rose-500" />
                      : <Sparkles size={18} className="text-[#00ff9d]" />
                   }
                 </div>
                 <div>
                   <p className="text-zinc-300 text-sm leading-relaxed">
                     <span className="text-zinc-500 font-mono text-xs block mb-1">ANALYSIS</span>
                     {trade.aiAnalysis}
                   </p>
                 </div>
               </div>
            </div>
          ))}
        </div>

        {/* Side Panel Stats */}
        <div className="space-y-6">
           {/* Psychological Profile */}
           <div className="glass-panel p-6 rounded-2xl">
              <h3 className="text-white font-medium mb-4 flex items-center gap-2">
                <CheckCircle2 size={16} className="text-[#00ff9d]" /> Psychological Profile
              </h3>
              
              <div className="space-y-4">
                <div>
                   <div className="flex justify-between text-xs mb-1">
                      <span className="text-zinc-400">Discipline</span>
                      <span className="text-white">82/100</span>
                   </div>
                   <div className="h-1 bg-zinc-800 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 w-[82%]"></div>
                   </div>
                </div>
                <div>
                   <div className="flex justify-between text-xs mb-1">
                      <span className="text-zinc-400">Patience</span>
                      <span className="text-white">65/100</span>
                   </div>
                   <div className="h-1 bg-zinc-800 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-yellow-500 to-orange-500 w-[65%]"></div>
                   </div>
                </div>
                <div>
                   <div className="flex justify-between text-xs mb-1">
                      <span className="text-zinc-400">Risk Mgmt</span>
                      <span className="text-white">94/100</span>
                   </div>
                   <div className="h-1 bg-zinc-800 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-emerald-500 to-[#00ff9d] w-[94%]"></div>
                   </div>
                </div>
              </div>

              <div className="mt-6 p-3 bg-white/5 rounded-lg border border-white/5">
                 <p className="text-xs text-zinc-400 italic">
                   "You tend to overtrade on Tuesdays after 2pm EST. Consider locking the terminal."
                 </p>
              </div>
           </div>

           {/* Premium Lock */}
           <div className="glass-panel p-6 rounded-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#ffd700]/10 to-transparent pointer-events-none"></div>
              <div className="relative z-10 text-center py-6">
                 <div className="mx-auto w-12 h-12 bg-[#ffd700]/20 rounded-full flex items-center justify-center mb-4 text-[#ffd700]">
                    <Lock size={20} />
                 </div>
                 <h3 className="text-white font-medium mb-1">Unlock Predictive AI</h3>
                 <p className="text-xs text-zinc-500 mb-4 px-4">Get real-time probability scores before you enter a trade.</p>
                 <button className="bg-[#ffd700] text-black text-xs font-bold px-4 py-2 rounded-full hover:bg-[#ffd700]/90 transition-colors shadow-[0_0_15px_rgba(255,215,0,0.3)]">
                   Upgrade to Pro
                 </button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};