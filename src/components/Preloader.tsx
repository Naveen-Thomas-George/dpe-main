"use client";

import { useEffect, useState, useRef } from 'react';

// TIMING CONSTANTS (in milliseconds)
const COUNTER_DURATION = 2800; // Counter animates from 0 to 100 over ~2.8s
const COUNTER_FADE_DURATION = 400; // Counter fades out over ~400ms at 100%
const HOLD_DURATION = 500; // Brief hold of 500ms after counter fade
const SLIDE_DURATION = 1100; // Overlay slide-up / reveal transition duration

interface PreloaderProps {
  onFinish?: () => void;
}

export default function Preloader({ onFinish }: PreloaderProps) {
  const [mounted, setMounted] = useState(false);
  const [count, setCount] = useState(0);
  const [isCountFinished, setIsCountFinished] = useState(false);
  const [startReveal, setStartReveal] = useState(false);
  const [isUnmounted, setIsUnmounted] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [statusText, setStatusText] = useState('LOADING MODULES');

  const rafIdRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  
  // Refs for tracking active timeouts to clean up properly
  const fadeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const holdTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const finishTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Check and subscribe to prefers-reduced-motion
  useEffect(() => {
    setMounted(true);
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const listener = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    
    mediaQuery.addEventListener('change', listener);
    return () => {
      mediaQuery.removeEventListener('change', listener);
    };
  }, []);

  // requestAnimationFrame logic
  useEffect(() => {
    if (!mounted) return;

    // Cubic Ease-Out curve (starts fast, slows down towards 100)
    const easeOutCubic = (t: number): number => {
      return 1 - Math.pow(1 - t, 3);
    };

    const animate = (timestamp: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp;
      }

      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / COUNTER_DURATION, 1);
      
      // Calculate current percentage based on the ease-out curve
      const currentPercent = easeOutCubic(progress) * 100;
      setCount(currentPercent);

      // Status text updating based on current progress milestone
      if (currentPercent < 30) {
        setStatusText('INITIALIZING CORE ENGINE');
      } else if (currentPercent < 65) {
        setStatusText('RESOLVING PHYSICAL MEDIA');
      } else if (currentPercent < 90) {
        setStatusText('BUFFERING GRAPHICS & PARALLAX');
      } else {
        setStatusText('OPTIMIZING ENVIRONMENT');
      }

      /* 
        NOTE: SWAPPING FIXED-TIMER FOR REAL ASSET LOADING PROGRESS:
        If you want to drive this loader off real loading assets (such as fonts, background videos, 
        images, or router events) in the future, disable this requestAnimationFrame loop and 
        manually drive the `count` state.
        
        Example Integration:
        ```typescript
        const handleAssetLoaded = (progressFraction: number) => {
          // progressFraction is between 0 and 1
          setCount(progressFraction * 100);
        };
        ```
      */

      if (progress < 1) {
        rafIdRef.current = requestAnimationFrame(animate);
      } else {
        // Counter reached 100%
        setCount(100);
        setIsCountFinished(true);
        setStatusText('SYSTEM READY');

        // Step 1: Counter starts fading out immediately
        fadeTimeoutRef.current = setTimeout(() => {
          // Step 2: Once counter is faded out, hold briefly
          holdTimeoutRef.current = setTimeout(() => {
            // Step 3: Trigger the slide-up/fade reveal
            setStartReveal(true);

            // Step 4: After reveal animation finishes, unmount overlay & fire callback
            finishTimeoutRef.current = setTimeout(() => {
              setIsUnmounted(true);
              if (onFinish) {
                onFinish();
              }
            }, SLIDE_DURATION);
          }, HOLD_DURATION);
        }, COUNTER_FADE_DURATION);
      }
    };

    rafIdRef.current = requestAnimationFrame(animate);

    // Clean up all timers and animation frames on unmount
    return () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
      if (fadeTimeoutRef.current) clearTimeout(fadeTimeoutRef.current);
      if (holdTimeoutRef.current) clearTimeout(holdTimeoutRef.current);
      if (finishTimeoutRef.current) clearTimeout(finishTimeoutRef.current);
    };
  }, [mounted, onFinish]);

  // Unmount completely from tree after slide-up finishes
  if (isUnmounted) return null;

  // Hydration safety: ensure 0 is rendered on initial load for both SSR and client hydration
  const displayCount = mounted ? Math.round(count) : 0;

  // Dynamic CSS styling for transitions
  const overlayStyle: React.CSSProperties = {
    transition: prefersReducedMotion
      ? `opacity ${SLIDE_DURATION}ms cubic-bezier(0.85, 0, 0.15, 1)`
      : `transform ${SLIDE_DURATION}ms cubic-bezier(0.85, 0, 0.15, 1), opacity ${SLIDE_DURATION}ms cubic-bezier(0.85, 0, 0.15, 1)`,
    transform: !prefersReducedMotion && startReveal ? 'translateY(-100%)' : 'translateY(0%)',
    opacity: startReveal && prefersReducedMotion ? 0 : 1,
    pointerEvents: startReveal ? 'none' : 'auto',
  };

  const counterStyle: React.CSSProperties = {
    transition: `opacity ${COUNTER_FADE_DURATION}ms cubic-bezier(0.25, 1, 0.5, 1), filter ${COUNTER_FADE_DURATION}ms ease`,
    opacity: isCountFinished ? 0 : 1,
    filter: isCountFinished ? 'blur(10px)' : 'blur(0px)',
  };

  return (
    <div
      style={overlayStyle}
      className="fixed inset-0 z-[9999] bg-zinc-950 flex flex-col items-center justify-center select-none overflow-hidden"
      aria-hidden={startReveal}
    >
      {/* Background ambient dark glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(63,63,70,0.15)_0%,rgba(9,9,11,0)_80%)] pointer-events-none" />

      {/* Main Counter Centered Layout */}
      <div
        style={counterStyle}
        className="flex flex-col items-center justify-center z-10 px-4"
      >
        <div className="flex items-baseline font-sans font-black text-8xl sm:text-9xl md:text-[14rem] tracking-tighter text-zinc-50 tabular-nums leading-none">
          {displayCount}
          <span className="text-3xl sm:text-4xl md:text-6xl font-light text-zinc-500 ml-1 sm:ml-2 select-none">
            %
          </span>
        </div>

        {/* Dynamic status/progress indicator */}
        <p className="mt-4 font-mono text-[9px] md:text-[10px] tracking-[0.3em] text-zinc-400 uppercase select-none animate-pulse">
          {statusText}
        </p>
      </div>

      {/* Corporate/Department branding at the bottom */}
      <div 
        style={counterStyle}
        className="absolute bottom-12 flex flex-col items-center gap-2 font-sans tracking-[0.4em] text-[9px] md:text-[10px] text-zinc-500 uppercase select-none"
      >
        <span>Department of Physical Education</span>
        <div className="w-10 h-[1px] bg-zinc-800 mt-1" />
        <span className="text-[7px] md:text-[8px] tracking-[0.3em] text-zinc-600 font-light mt-1">
          Christ (Deemed to be University)
        </span>
      </div>
    </div>
  );
}
