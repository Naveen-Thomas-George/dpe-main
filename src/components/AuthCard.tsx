import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AuthTabs from './AuthTabs';
import SocialButtons from './SocialButtons';
import EmailForm from './EmailForm';

export default function AuthCard() {
  const [mode, setMode] = useState('login'); // 'login' or 'register'

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.97 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="relative z-10 w-full max-w-[400px] md:max-w-[480px]"
    >
      {/* Significantly softer background glow */}
      <div className="absolute inset-0 bg-white/5 blur-[100px] rounded-full -z-10" />

      {/* Cleaner container: flatter border, floating low-spread shadow, wider desktop padding */}
      <div className="bg-[#09090b]/70 backdrop-blur-2xl border border-white/[0.04] rounded-[24px] p-8 md:p-10 shadow-[0_8px_40px_rgba(0,0,0,0.3)] flex flex-col relative overflow-hidden">
        
        {/* Header - Logo and Title */}
        <div className="flex flex-col items-center mb-8 mt-2">
          <div className="mb-6 cursor-pointer opacity-90 transition-opacity hover:opacity-100">
            <span className="font-outfit font-bold text-[22px] tracking-tight bg-gradient-to-br from-white to-zinc-400 bg-clip-text text-transparent">DPE</span>
          </div>
          
          <div className="relative h-12 w-full flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={mode}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="absolute text-center flex flex-col items-center"
              >
                <h2 className="text-xl font-medium text-zinc-100 tracking-tight mb-1.5 font-outfit">
                  {mode === 'login' ? 'Welcome back' : 'Create your account'}
                </h2>
                <p className="text-[13px] text-zinc-500 font-inter">
                  {mode === 'login' 
                    ? 'Enter your details to securely sign in.' 
                    : 'Sign up to continue to the platform.'}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <AuthTabs mode={mode} setMode={setMode} />
        
        <div className="flex flex-col gap-6">
          <SocialButtons mode={mode} />
          <EmailForm mode={mode} />
        </div>

      </div>
    </motion.div>
  );
}
