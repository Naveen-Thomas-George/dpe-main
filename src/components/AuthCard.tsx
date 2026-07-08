import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';

export default function AuthCard() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const validate = () => {
    if (!email || !password) {
      setError('All fields are required.');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid university email.');
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // TODO: integrate real auth flow
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative max-w-md w-full mx-auto bg-zinc-900/60 backdrop-blur-xl border border-white/[0.05] rounded-[20px] p-8 shadow-[0_0_30px_rgba(255,255,255,0.07)]"
    >
      {/* Logo */}
      <div className="flex justify-center mb-6">
        <img src="/dpe.logo.svg" alt="DPE Logo" className="w-12 h-12 rounded-full" />
      </div>
      {/* Headings */}
      <h2 className="text-2xl font-bold text-white text-center mb-2">Welcome Back</h2>
      <p className="text-sm text-zinc-400 text-center mb-6">Sign in to access the DPE Portal.</p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Email */}
        <div className="relative">
          <input
            type="email"
            placeholder="University Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-zinc-800/50 border border-zinc-700 rounded-xl py-3 px-4 text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-zinc-500 transition"
            disabled={loading}
          />
        </div>
        {/* Password */}
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-zinc-800/50 border border-zinc-700 rounded-xl py-3 px-4 pr-12 text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-zinc-500 transition"
            disabled={loading}
          />
          <button
            type="button"
            onClick={() => setShowPassword((s) => !s)}
            className="absolute inset-y-0 right-3 flex items-center text-zinc-400 hover:text-zinc-200"
            tabIndex={-1}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        {/* Remember & Forgot */}
        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center space-x-2 text-zinc-300">
            <input
              type="checkbox"
              checked={remember}
              onChange={() => setRemember(!remember)}
              className="w-4 h-4 text-indigo-600 bg-zinc-800 border-zinc-600 rounded focus:ring-indigo-500"
            />
            <span>Remember Me</span>
          </label>
          <a href="#" className="text-indigo-400 hover:underline">
            Forgot Password?
          </a>
        </div>
        {/* Error Message */}
        <AnimatePresence>
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="text-sm text-rose-400 text-center"
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>
        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="mt-2 w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-medium transition flex items-center justify-center disabled:opacity-70"
        >
          {loading ? (
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
            >
              ⏳
            </motion.span>
          ) : (
            'Login'
          )}
        </button>
      </form>
    </motion.div>
  );
}
