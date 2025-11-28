import React from 'react';
import { ResponsiveContainer, AreaChart, Area, Tooltip, XAxis, YAxis } from 'recharts';
import { TrendingUp, ArrowRight, Activity, Zap } from 'lucide-react';
import { EQUITY_DATA, MOCK_TRADES } from '../constants';
import { motion, Variants } from 'framer-motion';

// Utility for formatting currency
const formatCurrency = (val: number) => 
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(val);

interface DashboardProps {
  onViewAll: () => void;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 }
  }
};

const hoverEffect = {
  scale: 1.02,
  borderColor: "rgba(255, 255, 255, 0.15)",
  transition: { duration: 0.2 }
};

export const Dashboard: React.FC<DashboardProps> = ({ onViewAll }) => {
  const winRate = 60; // Hardcoded mock
  
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 h-full overflow-y-auto custom-scrollbar">
      <header className="flex justify-between items-center mb-8">
        <motion.div 
          initial={{ opacity: 0, x: -20 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-light text-white tracking-tight">
            Welcome back, <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-zinc-100 to-zinc-500">Trader</span>
          </h1>
          <p className="text-zinc-500 text-sm mt-1">Market conditions are optimal. 3 opportunities detected by AI.</p>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-2 px-3 py-1.5 bg-[#00ff9d]/10 border border-[#00ff9d]/20 rounded-full"
        >
           <div className="w-2 h-2 rounded-full bg-[#00ff9d] shadow-[0_0_8px_#00ff9d]"></div>
           <span className="text-xs text-[#00ff9d] font-medium tracking-wide">SYSTEM ONLINE</span>
        </motion.div>
      </header>

      {/* Bento Grid */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-4 grid-rows-4 md:grid-rows-2 gap-4 h-[600px]"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        
        {/* Large Card: Equity Curve */}
        <motion.div 
          variants={itemVariants}
          whileHover={hoverEffect}
          className="md:col-span-3 md:row-span-2 glass-panel rounded-2xl p-6 relative overflow-hidden group cursor-pointer border border-white/5"
        >
          <div className="flex justify-between items-start mb-4 relative z-10">
            <div>
              <h2 className="text-sm font-medium text-zinc-400 uppercase tracking-wider flex items-center gap-2">
                <Activity size={14} /> Total Equity
              </h2>
              <div className="text-4xl font-bold text-white mt-2 font-mono">{formatCurrency(12100)}</div>
              <div className="text-emerald-400 text-sm font-medium mt-1 flex items-center gap-1">
                <TrendingUp size={14} /> +$2,100 (21%) <span className="text-zinc-600">this month</span>
              </div>
            </div>
            <select className="bg-black/30 border border-white/10 text-xs text-zinc-400 rounded-lg px-2 py-1 outline-none focus:border-zinc-600 hover:bg-black/50 transition-colors">
              <option>Oct 2023</option>
              <option>Sept 2023</option>
            </select>
          </div>

          <div className="absolute inset-0 bottom-0 top-20 right-0 left-0 opacity-80 group-hover:opacity-100 transition-opacity duration-500">
             <ResponsiveContainer width="100%" height="100%">
               <AreaChart data={EQUITY_DATA}>
                 <defs>
                   <linearGradient id="colorEquity" x1="0" y1="0" x2="0" y2="1">
                     <stop offset="5%" stopColor="#00ff9d" stopOpacity={0.15}/>
                     <stop offset="95%" stopColor="#00ff9d" stopOpacity={0}/>
                   </linearGradient>
                 </defs>
                 <XAxis dataKey="date" hide />
                 <YAxis hide domain={['dataMin - 1000', 'dataMax + 500']} />
                 <Tooltip 
                   contentStyle={{ backgroundColor: 'rgba(5, 5, 5, 0.8)', border: '1px solid #333', borderRadius: '8px', backdropFilter: 'blur(4px)' }}
                   itemStyle={{ color: '#00ff9d' }}
                   cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 1 }}
                 />
                 <Area 
                    type="monotone" 
                    dataKey="equity" 
                    stroke="#00ff9d" 
                    strokeWidth={2}
                    fillOpacity={1} 
                    fill="url(#colorEquity)" 
                  />
               </AreaChart>
             </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Small Card: Winrate */}
        <motion.div 
          variants={itemVariants}
          whileHover={hoverEffect}
          className="md:col-span-1 md:row-span-1 glass-panel rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden border border-white/5"
        >
          <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
            <TrendingUp size={80} />
          </div>
          <div>
            <h2 className="text-sm font-medium text-zinc-400 uppercase tracking-wider">Win Rate</h2>
          </div>
          <div className="flex items-end gap-2 relative z-10">
            <span className="text-5xl font-bold text-white tracking-tighter">{winRate}%</span>
          </div>
          <div className="w-full bg-zinc-800 h-1.5 rounded-full mt-2 overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${winRate}%` }}
              transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
              className="bg-emerald-500 h-full rounded-full"
            />
          </div>
        </motion.div>

        {/* Small Card: Profit Factor */}
        <motion.div 
          variants={itemVariants}
          whileHover={hoverEffect}
          className="md:col-span-1 md:row-span-1 glass-panel rounded-2xl p-6 flex flex-col justify-between border border-white/5"
        >
          <div>
            <h2 className="text-sm font-medium text-zinc-400 uppercase tracking-wider">Profit Factor</h2>
          </div>
          <div className="relative w-fit">
            <span className="text-5xl font-bold text-white tracking-tighter">2.4</span>
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1 }}
              className="absolute -top-1 -right-16 text-[10px] text-emerald-400 border border-emerald-500/30 bg-emerald-500/10 px-1.5 py-0.5 rounded font-bold tracking-wider"
            >
              EXCELLENT
            </motion.div>
          </div>
           <p className="text-xs text-zinc-500">Gross Profit / Gross Loss</p>
        </motion.div>
      </motion.div>

      {/* Recent Activity Strip */}
      <motion.div 
        variants={itemVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="glass-panel rounded-2xl p-6 border border-white/5"
      >
        <div className="flex justify-between items-center mb-4">
           <h2 className="text-sm font-medium text-zinc-400 uppercase tracking-wider flex items-center gap-2">
             <Zap size={14} /> Recent Trades
           </h2>
           <button onClick={onViewAll} className="text-xs text-[#00ff9d] hover:text-[#00ff9d]/80 flex items-center gap-1 transition-colors group">
             View Journal <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
           </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {MOCK_TRADES.slice(-3).reverse().map((trade) => (
             <motion.div 
               key={trade.id} 
               whileHover={{ y: -2, backgroundColor: "rgba(255,255,255,0.08)" }}
               className="bg-white/5 border border-white/5 rounded-xl p-4 transition-colors cursor-pointer"
             >
                <div className="flex justify-between items-start mb-2">
                   <div className="flex flex-col">
                      <span className="font-bold text-white">{trade.pair}</span>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded w-fit mt-1 font-medium ${trade.type === 'LONG' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'}`}>
                        {trade.type}
                      </span>
                   </div>
                   <div className="text-right">
                      <div className={`text-sm font-bold ${trade.pnl > 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {trade.pnl > 0 ? '+' : ''}{formatCurrency(trade.pnl)}
                      </div>
                      <div className="text-xs text-zinc-500">{trade.pnlPercent}%</div>
                   </div>
                </div>
                <div className="h-10 w-full mt-2 opacity-60">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={[
                        {v: trade.entryPrice}, 
                        {v: trade.type === 'LONG' && trade.pnl > 0 ? trade.exitPrice : (trade.type === 'LONG' ? trade.exitPrice - 10 : trade.exitPrice + 10)},
                        {v: trade.exitPrice}
                      ]}>
                        <Area 
                          type="monotone" 
                          dataKey="v" 
                          stroke={trade.pnl > 0 ? '#10b981' : '#f43f5e'} 
                          strokeWidth={2} 
                          fill="transparent" 
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                </div>
             </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};