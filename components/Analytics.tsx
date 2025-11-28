import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell, PieChart, Pie, AreaChart, Area } from 'recharts';
import { TrendingUp, TrendingDown, Target, Zap, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

const PNL_BY_PAIR = [
  { pair: 'BTC/USDT', pnl: 4500 },
  { pair: 'ETH/USDT', pnl: 1200 },
  { pair: 'XAU/USD', pnl: 3200 },
  { pair: 'EUR/USD', pnl: -850 },
  { pair: 'GBP/JPY', pnl: -400 },
  { pair: 'NVDA', pnl: 2100 },
];

const WIN_LOSS_DATA = [
  { name: 'Wins', value: 65, color: '#10b981' },
  { name: 'Losses', value: 35, color: '#f43f5e' },
];

const EQUITY_GROWTH = [
  { date: 'W1', value: 10000 },
  { date: 'W2', value: 10500 },
  { date: 'W3', value: 10300 },
  { date: 'W4', value: 11200 },
  { date: 'W5', value: 11800 },
  { date: 'W6', value: 11600 },
  { date: 'W7', value: 12400 },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export const Analytics: React.FC = () => {
  return (
    <div className="p-8 max-w-7xl mx-auto h-full overflow-y-auto custom-scrollbar">
      <div className="mb-8">
        <h1 className="text-3xl font-light text-white tracking-tight">Performance Analytics</h1>
        <p className="text-zinc-500 text-sm mt-1">Deep dive into your trading metrics.</p>
      </div>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={itemVariants} className="glass-panel p-6 rounded-2xl border-l-4 border-l-[#00ff9d]">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp size={16} className="text-[#00ff9d]" />
            <span className="text-xs uppercase text-zinc-500 font-bold">Net P&L</span>
          </div>
          <div className="text-3xl font-mono text-white font-bold">+$9,750</div>
          <div className="text-xs text-emerald-500 mt-1">+12.5% this month</div>
        </motion.div>

        <motion.div variants={itemVariants} className="glass-panel p-6 rounded-2xl border-l-4 border-l-emerald-500">
          <div className="flex items-center gap-2 mb-2">
            <Target size={16} className="text-emerald-500" />
            <span className="text-xs uppercase text-zinc-500 font-bold">Profit Factor</span>
          </div>
          <div className="text-3xl font-mono text-white font-bold">2.41</div>
          <div className="text-xs text-zinc-500 mt-1">Gross Profit / Gross Loss</div>
        </motion.div>

        <motion.div variants={itemVariants} className="glass-panel p-6 rounded-2xl border-l-4 border-l-blue-500">
          <div className="flex items-center gap-2 mb-2">
            <Zap size={16} className="text-blue-500" />
            <span className="text-xs uppercase text-zinc-500 font-bold">Win Streak</span>
          </div>
          <div className="text-3xl font-mono text-white font-bold">5</div>
          <div className="text-xs text-zinc-500 mt-1">Current active streak</div>
        </motion.div>

        <motion.div variants={itemVariants} className="glass-panel p-6 rounded-2xl border-l-4 border-l-purple-500">
          <div className="flex items-center gap-2 mb-2">
            <Activity size={16} className="text-purple-500" />
            <span className="text-xs uppercase text-zinc-500 font-bold">Avg R:R</span>
          </div>
          <div className="text-3xl font-mono text-white font-bold">1:2.8</div>
          <div className="text-xs text-zinc-500 mt-1">Risk to Reward Ratio</div>
        </motion.div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 h-[400px]">
        {/* PnL By Pair Bar Chart */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 glass-panel p-6 rounded-2xl flex flex-col"
        >
          <h3 className="text-sm font-bold text-zinc-400 uppercase mb-6">P&L Distribution by Asset</h3>
          <div className="flex-1 w-full min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={PNL_BY_PAIR} layout="vertical" margin={{ left: 20 }}>
                <XAxis type="number" hide />
                <YAxis dataKey="pair" type="category" width={80} tick={{fill: '#71717a', fontSize: 12}} axisLine={false} tickLine={false} />
                <Tooltip 
                  cursor={{fill: 'rgba(255,255,255,0.05)'}}
                  contentStyle={{ backgroundColor: '#111', border: '1px solid #333', borderRadius: '8px' }}
                />
                <Bar dataKey="pnl" radius={[0, 4, 4, 0]} barSize={20}>
                  {PNL_BY_PAIR.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.pnl > 0 ? '#10b981' : '#f43f5e'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Win Rate Donut */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="glass-panel p-6 rounded-2xl flex flex-col relative"
        >
          <h3 className="text-sm font-bold text-zinc-400 uppercase mb-2">Win / Loss Ratio</h3>
          <div className="flex-1 relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={WIN_LOSS_DATA}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {WIN_LOSS_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#111', borderRadius: '8px', border: 'none' }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center flex-col pointer-events-none">
               <span className="text-3xl font-bold text-white">65%</span>
               <span className="text-xs text-zinc-500 uppercase">Win Rate</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Equity Curve (Area) */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass-panel p-6 rounded-2xl mt-6 h-[300px]"
      >
         <h3 className="text-sm font-bold text-zinc-400 uppercase mb-4">Account Growth (Cumulative)</h3>
         <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={EQUITY_GROWTH}>
              <defs>
                <linearGradient id="colorGrowth" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <Tooltip 
                 contentStyle={{ backgroundColor: '#111', border: '1px solid #333', borderRadius: '8px' }}
              />
              <Area type="monotone" dataKey="value" stroke="#8b5cf6" strokeWidth={3} fillOpacity={1} fill="url(#colorGrowth)" />
            </AreaChart>
         </ResponsiveContainer>
      </motion.div>
    </div>
  );
};