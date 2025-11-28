import React, { useState, useEffect } from 'react';
import { Save, Wallet } from 'lucide-react';
import { useTradeContext } from '../context/TradeContext';
import { motion } from 'framer-motion';

export const Settings: React.FC = () => {
  const { accountBalance, setAccountBalance } = useTradeContext();
  const [localBalance, setLocalBalance] = useState(accountBalance.toString());
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    const val = parseFloat(localBalance);
    if (!isNaN(val)) {
      setAccountBalance(val);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-light text-white tracking-tight mb-8">Settings</h1>
      
      <div className="glass-panel p-8 rounded-2xl border border-white/5">
        <div className="max-w-md space-y-6">
          
          <div>
            <h2 className="text-lg font-medium text-white mb-2 flex items-center gap-2">
              <Wallet size={20} className="text-[#00ff9d]" /> Account Configuration
            </h2>
            <p className="text-sm text-zinc-500 mb-6">
              Set your starting capital. This is used to calculate your equity curve and total percentage growth.
            </p>

            <label className="text-xs uppercase text-zinc-500 font-bold mb-2 block">Initial Account Balance (USD)</label>
            <div className="flex gap-4">
              <input 
                type="number" 
                value={localBalance}
                onChange={(e) => setLocalBalance(e.target.value)}
                className="flex-1 bg-black/50 border border-zinc-800 rounded-lg p-3 text-white focus:border-[#00ff9d] outline-none" 
              />
              <motion.button 
                whileTap={{ scale: 0.95 }}
                onClick={handleSave}
                className="bg-[#00ff9d] text-black px-6 rounded-lg font-bold flex items-center gap-2 hover:bg-[#00ff9d]/90 transition-colors"
              >
                <Save size={18} /> {saved ? 'Saved!' : 'Save'}
              </motion.button>
            </div>
          </div>

          <div className="pt-6 border-t border-white/5">
             <p className="text-xs text-zinc-600">
               TradeOS v1.0.2 &bull; Local Storage Persistence Enabled
             </p>
          </div>

        </div>
      </div>
    </div>
  );
};