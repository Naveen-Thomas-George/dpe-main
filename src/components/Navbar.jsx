import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Navbar({ isScrolled }) {
  const [isServicesHovered, setIsServicesHovered] = useState(false);
  const [isNavHovered, setIsNavHovered] = useState(false);
  const timeoutRef = useRef(null);

  const handleServicesEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsServicesHovered(true);
  };

  const handleServicesLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsServicesHovered(false);
    }, 150); // small delay to prevent flickering
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div className="fixed top-6 left-0 w-full z-50 flex justify-center px-4 pointer-events-none">
      <motion.nav
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: isScrolled ? -100 : 0, opacity: isScrolled ? 0 : 1, scale: isScrolled ? 0.95 : 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        onHoverStart={() => setIsNavHovered(true)}
        onHoverEnd={() => setIsNavHovered(false)}
        className="pointer-events-auto relative flex items-center justify-between w-full max-w-4xl px-6 py-3 bg-zinc-950/70 backdrop-blur-xl border border-zinc-800/60 shadow-[0_8px_32px_rgba(0,0,0,0.5)] rounded-full transition-shadow duration-300"
        style={{
          boxShadow: isNavHovered
            ? '0 15px 40px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.05)'
            : '0 8px 32px rgba(0,0,0,0.5)'
        }}
      >
        {/* Left: Brand Logo + Name */}
        <Link to="/" className="flex items-center gap-3 cursor-pointer group">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-zinc-200 to-zinc-500 flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform">
            {/* Minimal inner icon */}
            <img src="/dpe.logo.svg" alt="logo" className="w-8 h-8 rounded-full bg-gradient-to-br from-zinc-200 to-zinc-500 flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform" />
          </div>
        </Link>

        {/* Center: Navigation Links */}
        <div className="hidden md:flex items-center gap-8 h-full">
          {/* About us Link */}
          <Link to="/about" className="text-sm font-medium text-zinc-300 hover:text-white transition-colors py-2 relative group cursor-pointer">
            About us
            <span className="absolute bottom-1 left-0 w-0 h-[1.5px] bg-zinc-400 transition-all duration-300 ease-out group-hover:w-full" />
          </Link>

          <Link to="/committees" className="text-sm font-medium text-zinc-300 hover:text-white transition-colors relative group py-2">
            Committees
            <span className="absolute bottom-1 left-0 w-0 h-[1.5px] bg-zinc-400 transition-all duration-300 ease-out group-hover:w-full" />
          </Link>

          <a href="#pricing" className="text-sm font-medium text-zinc-300 hover:text-white transition-colors relative group py-2">
            Facilities
            <span className="absolute bottom-1 left-0 w-0 h-[1.5px] bg-zinc-400 transition-all duration-300 ease-out group-hover:w-full" />
          </a>
        </div>

        {/* Right: Login Button */}
        <Link to="/login">
          <motion.button
            whileHover="hover"
            whileTap="tap"
            variants={{
              hover: { scale: 1.02 },
              tap: { scale: 0.98 }
            }}
            className="relative px-6 py-2.5 rounded-full text-sm font-medium text-white bg-gradient-to-b from-zinc-800 to-zinc-900 border border-zinc-700/50 shadow-inner overflow-hidden group cursor-pointer"
          >
            {/* Soft border animation / inner glow absolute element */}
            <motion.div
              variants={{
                hover: { opacity: 1 },
                tap: { opacity: 0.8 }
              }}
              initial={{ opacity: 0 }}
              className="absolute inset-0 rounded-full border border-zinc-400/30 bg-white/5 opacity-0 transition-opacity duration-300 pointer-events-none"
              style={{ boxShadow: 'inset 0 0 15px rgba(255,255,255,0.1)' }}
            />
            <span className="relative z-10 transition-colors group-hover:text-white text-zinc-300">Login</span>
          </motion.button>
        </Link>

      </motion.nav>
    </div>
  );
}
