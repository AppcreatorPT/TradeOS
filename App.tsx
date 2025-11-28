import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { Journal } from './components/Journal';
import { TheBrain } from './components/TheBrain';
import { Analytics } from './components/Analytics';
import { NavView } from './types';
import { AnimatePresence, motion } from 'framer-motion';

function App() {
  const [currentView, setCurrentView] = useState<NavView>('dashboard');

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard onViewAll={() => setCurrentView('journal')} />;
      case 'journal':
        return <Journal />;
      case 'brain':
        return <TheBrain />;
      case 'analytics':
        return <Analytics />;
      default:
        // For Settings, just show a placeholder for now
        return (
          <div className="flex flex-col items-center justify-center h-full text-zinc-500">
            <h2 className="text-2xl font-light text-white mb-2">Settings</h2>
            <p>Preferences configuration coming soon.</p>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen w-full bg-[#050505] text-zinc-100 bg-grid-pattern relative overflow-hidden">
      {/* Decorative background glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-900/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#00ff9d]/5 rounded-full blur-[120px] pointer-events-none"></div>

      <Sidebar currentView={currentView} onChangeView={setCurrentView} />
      
      <main className="flex-1 ml-20 h-full overflow-hidden relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentView}
            initial={{ opacity: 0, y: 10, scale: 0.99 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.99 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="h-full"
          >
            {renderView()}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

export default App;