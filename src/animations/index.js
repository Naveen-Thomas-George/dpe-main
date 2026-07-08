import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLayoutEffect, useEffect, useRef } from 'react';

// Register core plugins so they are available globally
gsap.registerPlugin(ScrollTrigger);

// Use useLayoutEffect consistently inside browser vs Node environments.
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

/**
 * Reusable hook to handle GSAP context and ensure automatic memory cleanup
 * 
 * @param {Function} animationCallback - Function containing animations. Receives context self instance.
 * @param {Array} dependencies - Dependencies array to trigger effect re-run
 * @param {React.MutableRefObject} scopeRef - Scopes CSS selectors inside this ref element (Optional)
 */
export const useGsapAnimation = (animationCallback, dependencies = [], scopeRef = null) => {
  const ctx = useRef(null);

  useIsomorphicLayoutEffect(() => {
    // Create GSAP context for proper state tracking 
    ctx.current = gsap.context((self) => {
      animationCallback(self);
    }, scopeRef || undefined);

    // Ensures we don't leak memory or leave orphaned ScrollTriggers when component unmounts
    return () => {
      ctx.current.revert();
    };
  }, dependencies);

  return ctx;
};

/**
 * Helper Function: Cinematic Fade & Slide Up Animation
 * Great for section titles, cards, and individual text blocks.
 */
export const animateFadeUp = (target, options = {}) => {
  return gsap.fromTo(
    target,
    { y: 60, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 1.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: target,
        start: 'top 85%', // Triggers when the top of the element hits 85% of the viewport height
        ...options.scrollTrigger,
      },
      ...options, // Can override duration, delay, etc.
    }
  );
};

/**
 * Helper Function: Staggered Fade Up for Lists/Grids
 * Ideal for multiple items emerging sequentially.
 */
export const animateStaggerFade = (targets, options = {}) => {
  return gsap.fromTo(
    targets,
    { y: 40, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: 'power2.out',
      stagger: {
        amount: 0.4,
      },
      scrollTrigger: {
        trigger: targets[0], // Normally overridden by passing the parent container into options.scrollTrigger
        start: 'top 85%',
        ...options.scrollTrigger,
      },
      ...options,
    }
  );
};

export { gsap, ScrollTrigger };
