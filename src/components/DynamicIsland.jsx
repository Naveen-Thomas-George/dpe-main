import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertTriangle, AlertCircle, Info, Activity, Camera, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const springVariants = {
  hidden: { width: 140, height: 40, borderRadius: 24, opacity: 0, y: -40, scale: 0.9 },
  idle: { width: 140, height: 40, borderRadius: 24, opacity: 1, y: 0, scale: 1 },
  hovered: { width: 160, height: 45, borderRadius: 24, opacity: 1, y: 0, scale: 1 },
  notification: { width: 340, height: 64, borderRadius: 32, opacity: 1, y: 0, scale: 1 },
  expanded: { width: 320, height: 340, borderRadius: 36, opacity: 1, y: 0, scale: 1 },
  live: { width: 280, height: 50, borderRadius: 24, opacity: 1, y: 0, scale: 1 },
};

const iconMap = {
  success: <CheckCircle className="w-6 h-6 text-emerald-100 drop-shadow-[0_0_8px_rgba(52,211,153,0.8)] shrink-0" />,
  warning: <AlertTriangle className="w-6 h-6 text-amber-100 drop-shadow-[0_0_8px_rgba(251,191,36,0.8)] shrink-0" />,
  error: <AlertCircle className="w-6 h-6 text-red-100 drop-shadow-[0_0_8px_rgba(248,113,113,0.8)] shrink-0" />,
  info: <Info className="w-6 h-6 text-blue-100 drop-shadow-[0_0_8px_rgba(96,165,250,0.8)] shrink-0" />,
};

export default function DynamicIsland({
  islandState,
  setIslandState,
  currentNotification,
  liveData,
  isScrolled
}) {
  const [isHovered, setIsHovered] = useState(false);
  const pressTimer = useRef(null);
  const navigate = useNavigate();

  // Determine effective visual state
  let effectiveState = isHovered && islandState === 'idle' 
    ? 'hovered' 
    : islandState === 'notification' && !currentNotification 
    ? 'idle' 
    : islandState;

  // Collapse and hide when at the absolute top of the page
  if (!isScrolled && (islandState === 'idle' || islandState === 'hovered')) {
    effectiveState = 'hidden';
  }

  // Desktop click
  const handleClick = () => {
    // Basic guard: don't expand if hidden or playing a notification
    if (effectiveState === 'hidden' || effectiveState === 'notification') return;
    setIslandState(current => current === 'expanded' ? 'idle' : 'expanded');
  };

  // Mobile Long-Press Logic
  const handleTouchStart = () => {
    if (effectiveState === 'hidden' || effectiveState === 'notification') return;
    pressTimer.current = setTimeout(() => {
      setIslandState(current => current === 'expanded' ? 'idle' : 'expanded');
    }, 400); // 400ms long press
  };

  const handleTouchEnd = () => {
    if (pressTimer.current) clearTimeout(pressTimer.current);
  };

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[99999] flex justify-center pointer-events-none">
      <motion.div
        layout
        variants={springVariants}
        initial="hidden"
        animate={effectiveState}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 24,
          mass: 0.8
        }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        onClick={handleClick}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchEnd}
        className="overflow-hidden bg-[#000000] backdrop-blur-3xl border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.6)] cursor-pointer relative pointer-events-auto group"
      >
        {/* Glow effect based on current notification type */}
        <AnimatePresence>
          {currentNotification && effectiveState === 'notification' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className={`absolute inset-0 pointer-events-none z-0 mix-blend-screen opacity-60
                ${currentNotification.type === 'success' ? 'bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-500 via-emerald-800/20 to-transparent' : ''}
                ${currentNotification.type === 'error' ? 'bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-500 via-red-800/20 to-transparent' : ''}
                ${currentNotification.type === 'warning' ? 'bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-500 via-amber-800/20 to-transparent' : ''}
                ${currentNotification.type === 'info' ? 'bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-500 via-blue-800/20 to-transparent' : ''}
              `} 
            />
          )}
        </AnimatePresence>

        <AnimatePresence mode="popLayout">
          {/* IDLE / HOVERED STATE */}
          {(effectiveState === 'idle' || effectiveState === 'hovered') && (
            <motion.div
              key="idle"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.15 }}
              className="absolute inset-0 flex items-center justify-between px-4 z-10"
            >
              <div className="flex items-center gap-2">
                <Camera className={`w-4 h-4 transition-colors ${effectiveState === 'hovered' ? 'text-zinc-400' : 'text-zinc-700/80'}`} />
              </div>
              <div className={`h-[4px] rounded-full bg-zinc-800 transition-all duration-300 ${effectiveState === 'hovered' ? 'w-24 bg-zinc-700/80' : 'w-12'}`} />
            </motion.div>
          )}

          {/* NOTIFICATION STATE */}
          {effectiveState === 'notification' && currentNotification && (
            <motion.div
              key="notification"
              initial={{ opacity: 0, y: 15, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="absolute inset-0 flex items-center px-4 gap-4 z-10"
            >
              <div className="rounded-full p-2">
                {iconMap[currentNotification.type] || iconMap.info}
              </div>
              <div className="flex flex-col flex-1 truncate text-left pt-1">
                 <span className="text-white font-semibold text-[15px] leading-tight truncate">
                    {currentNotification.title || "Notification"}
                 </span>
                 <span className="text-zinc-300/80 text-[13px] leading-tight mt-0.5 truncate">
                    {currentNotification.message}
                 </span>
              </div>
            </motion.div>
          )}

          {/* LIVE DATA STATE */}
          {effectiveState === 'live' && liveData && (
            <motion.div
              key="live"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-between px-5 z-10"
            >
              <div className="flex items-center gap-3">
                 <Activity className="w-5 h-5 text-emerald-400 animate-pulse" />
                 <span className="text-zinc-100 font-medium text-sm drop-shadow-md">
                   {liveData.title}
                 </span>
              </div>
              <span className="text-emerald-400 font-mono text-sm tracking-tighter drop-shadow-md">
                {liveData.value}
              </span>
            </motion.div>
          )}

          {/* EXPANDED STATE (Replaces Top Navbar natively) */}
          {effectiveState === 'expanded' && (
            <motion.div
              key="expanded"
              initial={{ opacity: 0, filter: 'blur(8px)', scale: 0.95 }}
              animate={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
              exit={{ opacity: 0, filter: 'blur(4px)', scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 p-6 flex flex-col z-10"
            >
              {/* Header inside the island */}
              <div className="flex justify-between items-center mb-6 pb-4 border-b border-white/[0.08]">
                 <div className="flex items-center gap-2">
                   <div className="w-8 h-8 rounded-full bg-gradient-to-br from-zinc-200 to-zinc-500 flex items-center justify-center shadow-inner">
                     <div className="w-3 h-3 rounded-full bg-zinc-950" />
                   </div>
                   <span className="text-lg font-bold tracking-tight text-white uppercase mt-0.5">DPE</span>
                 </div>
                 
                 {/* Close indicator */}
                 <button 
                  onClick={(e) => { e.stopPropagation(); setIslandState('idle'); }}
                  className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-500 hover:text-white hover:bg-zinc-800 transition-colors cursor-target"
                 >
                   <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                   </svg>
                 </button>
              </div>

              {/* Navigation Links inside Island */}
              <nav className="flex flex-col gap-1 mb-auto">
                 {['Services', 'Products', 'Pricing'].map((item) => (
                   <a 
                     key={item}
                     href={`#${item.toLowerCase()}`}
                     className="px-4 py-3 rounded-xl text-[15px] font-medium text-zinc-300 hover:text-white hover:bg-zinc-900/80 transition-colors flex items-center justify-between group cursor-target"
                     onClick={(e) => { e.stopPropagation(); setIslandState('idle'); }}
                   >
                     {item}
                     <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
                   </a>
                 ))}
              </nav>

              {/* Login Action Area */}
              <div className="pt-2">
                <button
                  onClick={(e) => { 
                    e.stopPropagation(); 
                    setIslandState('idle'); 
                    navigate('/login');
                  }}
                  className="w-full py-3.5 rounded-xl text-sm font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/10 transition-colors flex items-center justify-center gap-2 cursor-target"
                >
                  Sign In to Platform
                </button>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </motion.div>
    </div>
  );
}
