import React from 'react';
import { motion } from 'framer-motion';

export default function AuthTabs({ mode, setMode }) {
  return (
    <div className="relative flex w-full bg-zinc-900/30 rounded-xl p-1 mb-8 overflow-hidden backdrop-blur-sm border border-white/[0.03]">
      {['login', 'register'].map((tab) => (
        <button
          key={tab}
          onClick={() => setMode(tab)}
          className={`relative z-10 w-1/2 py-2 text-[13px] font-medium font-inter rounded-lg transition-colors duration-300 cursor-target ${
            mode === tab ? 'text-zinc-100' : 'text-zinc-500 hover:text-zinc-300'
          }`}
        >
          {mode === tab && (
            <motion.div
              layoutId="auth-tab-pill"
              className="absolute inset-0 bg-white/5 rounded-lg shadow-sm border border-white/5"
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          )}
          <span className="relative z-20 capitalize">{tab}</span>
        </button>
      ))}
    </div>
  );
}
