import React from 'react';
import { LayoutDashboard, BookOpen, BrainCircuit, LineChart, Settings, User } from 'lucide-react';
import { NavView } from '../types';

interface SidebarProps {
  currentView: NavView;
  onChangeView: (view: NavView) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentView, onChangeView }) => {
  const navItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'journal', icon: BookOpen, label: 'Journal' },
    { id: 'brain', icon: BrainCircuit, label: 'The Brain' },
    { id: 'analytics', icon: LineChart, label: 'Analytics' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-20 flex flex-col items-center py-8 glass-panel border-r border-white/5 z-50 transition-all duration-300">
      <div className="mb-10">
        <div className="w-10 h-10 bg-gradient-to-tr from-[#00ff9d] to-cyan-500 rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(0,255,157,0.3)]">
          <span className="font-bold text-black text-xs tracking-tighter">OS</span>
        </div>
      </div>

      <nav className="flex-1 flex flex-col gap-6 w-full px-2">
        {navItems.map((item) => {
          const isActive = currentView === item.id;
          const Icon = item.icon;
          
          return (
            <button
              key={item.id}
              onClick={() => onChangeView(item.id as NavView)}
              className={`group relative flex items-center justify-center w-full h-12 rounded-xl transition-all duration-200 ${
                isActive 
                  ? 'bg-white/10 text-white shadow-lg backdrop-blur-md' 
                  : 'text-zinc-500 hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon size={20} strokeWidth={isActive ? 2 : 1.5} />
              
              {/* Tooltip-ish label on hover */}
              <span className="absolute left-14 bg-[#1a1a1a] border border-white/10 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50 shadow-xl">
                {item.label}
              </span>

              {/* Active Indicator */}
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-[#00ff9d] rounded-r-full shadow-[0_0_8px_#00ff9d]" />
              )}
            </button>
          );
        })}
      </nav>

      <div className="mt-auto">
        <button className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 p-[1px] relative group">
           <div className="w-full h-full rounded-full bg-black flex items-center justify-center relative overflow-hidden">
             <User size={18} className="text-yellow-500" />
             <div className="absolute inset-0 bg-yellow-400/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
           </div>
           <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-black rounded-full flex items-center justify-center border border-zinc-800">
             <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
           </div>
        </button>
      </div>
    </aside>
  );
};