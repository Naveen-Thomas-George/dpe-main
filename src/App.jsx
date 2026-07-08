import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import Loader from './components/Loader';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import EventsShowcase from './components/EventsShowcase';
import Leaderboard from './components/Leaderboard';
import MapSection from './components/MapSection';
import Footer from './components/Footer';
import PageTransitionWrapper from './components/PageTransitionWrapper';
import TargetCursor from './components/TargetCursor';
import ClickSpark from './components/ClickSpark';
import AuthPage from './components/AuthPage';

import { useIslandState } from './hooks/useIslandState';
import DynamicIsland from './components/DynamicIsland';
import { Routes, Route, useLocation } from 'react-router-dom';

import Home from './pages/Home';
import About from './pages/About';
import Gallery from './pages/Gallery';
import PreloaderDemo from './pages/PreloaderDemo';
import PedagogicLeague from './pages/PedagogicLeague';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const island = useIslandState();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return (
    <ClickSpark
      sparkColor='#fff'
      sparkSize={10}
      sparkRadius={15}
      sparkCount={8}
      duration={400}
    >
      <div className="bg-zinc-950 min-h-screen text-zinc-50 font-sans selection:bg-zinc-100 selection:text-zinc-900">
      
      <DynamicIsland {...island} isScrolled={isScrolled} />
      <TargetCursor />
      
      {/* 
        AnimatePresence mode="wait" ensures the loader finishes unmounting 
        before the actual page starts entering and taking up DOM space
      */}
      <AnimatePresence mode="wait">
        {isLoading ? (
          <Loader key="loader" onComplete={() => setIsLoading(false)} />
        ) : (
          <PageTransitionWrapper key={location.pathname}>
            <Navbar isScrolled={isScrolled} />
            
            {/* 
              Everything inside here is now wrapped automatically by SmoothScrollProvider 
              (which we set up in main.jsx) ensuring Lenis and GSAP ScrollTrigger 
              are constantly syncing their ticks
            */}
            <main className="relative flex flex-col pt-0">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/login" element={<AuthPage />} />
                <Route path="/preloader-demo" element={<PreloaderDemo />} />
                <Route path="/pedagogic-league" element={<PedagogicLeague />} />
              </Routes>

              {/* Comprehensive Structured Footer */}
              <Footer />

              {/* Tailwind v4 Verification Indicator */}
              <div className="fixed bottom-4 right-4 w-6 h-6 rounded-full bg-red-500 z-[9999] shadow-[0_0_15px_rgba(239,68,68,0.5)] border-2 border-zinc-950 pointer-events-none" />

              {/* Dynamic Island Example Triggers */}
              <div className="fixed bottom-12 right-6 z-[9999] flex flex-col gap-2 pointer-events-auto">
                <button 
                  onClick={() => island.notify({ type: 'success', title: 'Upload Complete', message: 'File was successfully uploaded.' })}
                  className="bg-zinc-900 border border-zinc-800 text-xs px-4 py-2.5 rounded-xl text-white cursor-pointer hover:bg-zinc-800 shadow-xl transition-colors cursor-target"
                >
                  Trigger Success
                </button>
                <button 
                  onClick={() => island.notify({ type: 'error', title: 'Connection Lost', message: 'Unable to reach the server.' })}
                  className="bg-zinc-900 border border-zinc-800 text-xs px-4 py-2.5 rounded-xl text-white cursor-pointer hover:bg-zinc-800 shadow-xl transition-colors cursor-target"
                >
                  Trigger Error
                </button>
                <button 
                  onClick={() => island.notify({ type: 'warning', title: 'Low Battery', message: '10% power remaining.' })}
                  className="bg-zinc-900 border border-zinc-800 text-xs px-4 py-2.5 rounded-xl text-white cursor-pointer hover:bg-zinc-800 shadow-xl transition-colors cursor-target"
                >
                  Trigger Warning
                </button>
                <button 
                  onClick={() => island.islandState === 'live' ? island.clearLive() : island.setLive({ title: 'Live Match', value: '2 - 1' })}
                  className="bg-emerald-900/80 border border-emerald-800/50 text-xs px-4 py-2.5 rounded-xl text-white cursor-pointer hover:bg-emerald-800/80 shadow-xl transition-colors cursor-target"
                >
                  Toggle Live Mode
                </button>
              </div>
            </main>

          </PageTransitionWrapper>
        )}
      </AnimatePresence>

      </div>
    </ClickSpark>
  );
}

export default App;
