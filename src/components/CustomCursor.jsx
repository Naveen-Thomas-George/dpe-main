import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Core motion values mapped to mouse coordinates
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Premium spring physics for that buttery trailing delay you see on Awwwards
  // High stiffness gives responsiveness, damping controls the "drag" weight
  const springConfig = { damping: 28, stiffness: 200, mass: 0.6 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Only mount these tracking listeners on the client
    const onMouseMove = (e) => {
      // Offset by 10px so the 20x20 ring is perfectly centered on the actual mouse point
      cursorX.set(e.clientX - 10);
      cursorY.set(e.clientY - 10);
      if (!isVisible) setIsVisible(true);
    };

    const onMouseEnter = () => setIsVisible(true); // Window focus
    const onMouseLeave = () => setIsVisible(false); // Mouse leaves browser window

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseenter', onMouseEnter);
    document.addEventListener('mouseleave', onMouseLeave);

    // Magnetic interaction detection via event delegation
    const handleMouseOver = (e) => {
      const target = e.target;
      
      // We check if the actual target or any parent up the tree is clickable
      // Or if the tailwind class manually enforces a pointer
      const isInteractive = 
        target.tagName?.toLowerCase() === 'a' ||
        target.tagName?.toLowerCase() === 'button' ||
        target.closest('a') !== null ||
        target.closest('button') !== null ||
        window.getComputedStyle(target).cursor === 'pointer';

      setIsHovered(isInteractive);
    };

    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY, isVisible]);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-5 h-5 rounded-full border border-zinc-50 pointer-events-none z-[9999] mix-blend-difference flex items-center justify-center transform-gpu"
        style={{
          x: smoothX,
          y: smoothY,
          opacity: isVisible ? 1 : 0
        }}
        animate={{
          // On hover over a link, double the scale and fill solidly
          scale: isHovered ? 2.5 : 1,
          backgroundColor: isHovered ? 'rgba(250, 250, 250, 1)' : 'rgba(250, 250, 250, 0)',
          borderWidth: isHovered ? '0px' : '1px'
        }}
        transition={{
          scale: { type: 'spring', stiffness: 300, damping: 20 },
          backgroundColor: { duration: 0.2 },
          borderWidth: { duration: 0.2 }
        }}
      />
      
      {/* 
        Conceal the native OS mouse cursor exclusively on desktop/mouse devices.
        We preserve it for touch devices so we don't break default behavior.
      */}
      <style>{`
        @media (hover: hover) and (pointer: fine) {
          body, a, button, [class*="cursor-pointer"] {
            cursor: none !important;
          }
        }
      `}</style>
    </>
  );
}
