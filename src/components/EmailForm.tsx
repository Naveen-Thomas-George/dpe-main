import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function EmailForm({ mode }) {
  const isRegister = mode === 'register';

  return (
    <form className="flex flex-col gap-3 font-inter" onSubmit={(e) => e.preventDefault()}>
      <div className="relative flex items-center mb-1">
        <div className="flex-grow border-t border-zinc-800/30"></div>
        <span className="mx-4 text-[11px] text-zinc-600 uppercase tracking-widest font-medium">Or continue with</span>
        <div className="flex-grow border-t border-zinc-800/30"></div>
      </div>

      <AnimatePresence mode="popLayout">
        {isRegister && (
          <motion.div
            initial={{ opacity: 0, height: 0, scale: 0.98 }}
            animate={{ opacity: 1, height: 'auto', scale: 1 }}
            exit={{ opacity: 0, height: 0, scale: 0.98 }}
            transition={{ duration: 0.4, type: "spring", bounce: 0 }}
            className="flex flex-col overflow-hidden"
          >
            <input 
              type="text" 
              placeholder="Full Name"
              className="w-full bg-white/[0.03] border border-white/5 rounded-xl px-4 py-3 text-[13px] text-zinc-200 placeholder-zinc-600 focus:outline-none focus:bg-white/[0.05] focus:border-white/10 transition-colors"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col">
        <input 
          type="email" 
          placeholder="Email address"
          className="w-full bg-white/[0.03] border border-white/5 rounded-xl px-4 py-3 text-[13px] text-zinc-200 placeholder-zinc-600 focus:outline-none focus:bg-white/[0.05] focus:border-white/10 transition-colors"
        />
      </div>

      <div className="flex flex-col">
        <input 
          type="password" 
          placeholder="Password"
          className="w-full bg-white/[0.03] border border-white/5 rounded-xl px-4 py-3 text-[13px] text-zinc-200 placeholder-zinc-600 focus:outline-none focus:bg-white/[0.05] focus:border-white/10 transition-colors"
        />
      </div>

      <button className="mt-3 w-full bg-zinc-100 text-zinc-950 font-medium text-[13px] py-2.5 rounded-xl hover:bg-white transition-colors duration-300 cursor-target shadow-sm">
        {mode === 'login' ? 'Sign in' : 'Create account'}
      </button>

      <AnimatePresence>
        {mode === 'login' && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden flex justify-center"
          >
            <a href="#" className="text-[12px] text-zinc-500 hover:text-zinc-300 transition-colors mt-3 py-1 cursor-target">
              Forgot password?
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
}
