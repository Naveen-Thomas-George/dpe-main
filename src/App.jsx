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
import SmoothCursor from './components/SmoothCursor';
import ClickSpark from './components/ClickSpark';
import AuthPage from './components/AuthPage';
import GlobalBreadcrumb from './components/GlobalBreadcrumb';
import { Routes, Route, useLocation } from 'react-router-dom';

import Home from './pages/Home';
import About from './pages/About';
import Gallery from './pages/Gallery';
import PreloaderDemo from './pages/PreloaderDemo';
import PedagogicLeague from './pages/PedagogicLeague';
import Committees from './pages/Committees';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
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
      
      <SmoothCursor />
      
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
            <GlobalBreadcrumb />
            
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
                <Route path="/pedagogic-league/registration" element={<PedagogicLeague />} />
                <Route path="/pedagogic-league/rules" element={<PedagogicLeague />} />
                <Route path="/committees" element={<Committees />} />
              </Routes>

              {/* Comprehensive Structured Footer */}
              <Footer />




            </main>

          </PageTransitionWrapper>
        )}
      </AnimatePresence>

      </div>
    </ClickSpark>
  );
}

export default App;
