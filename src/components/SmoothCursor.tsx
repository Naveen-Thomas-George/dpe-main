"use client";

import { useEffect, useState, useMemo } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

// CUSTOMIZATION DEFAULTS FOR SPRING MOTION
const DEFAULT_HOVER_SCALE = 1.35;
const DEFAULT_DAMPING = 32;     // High damping for smooth control
const DEFAULT_STIFFNESS = 240;   // High stiffness for responsiveness
const DEFAULT_MASS = 0.5;

interface SmoothCursorProps {
  hoverScale?: number;
  damping?: number;
  stiffness?: number;
  mass?: number;
  hideDefaultCursor?: boolean;
}

export default function SmoothCursor({
  hoverScale = DEFAULT_HOVER_SCALE,
  damping = DEFAULT_DAMPING,
  stiffness = DEFAULT_STIFFNESS,
  mass = DEFAULT_MASS,
  hideDefaultCursor = true,
}: SmoothCursorProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isTextInput, setIsTextInput] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  // Position Tracking
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Custom mobile/touch check
  const isMobile = useMemo(() => {
    if (typeof window === 'undefined') return false;
    const hasTouchScreen = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const isSmallScreen = window.innerWidth <= 768;
    const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
    const mobileRegex = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i;
    return (hasTouchScreen && isSmallScreen) || mobileRegex.test(userAgent.toLowerCase());
  }, []);

  useEffect(() => {
    if (isMobile) return;

    // Track mouse position on viewport
    const onMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const onMouseEnter = () => setIsVisible(true);
    const onMouseLeave = () => setIsVisible(false);

    const onMouseDown = () => setIsClicked(true);
    const onMouseUp = () => setIsClicked(false);

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseenter', onMouseEnter);
    document.addEventListener('mouseleave', onMouseLeave);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);

    // Track cursor target hovering (Interactive links vs Text fields)
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      // 1. Check if hovering text input or editing fields
      const isTextTag =
        target.tagName === 'INPUT' &&
        !['submit', 'button', 'checkbox', 'radio', 'file', 'range'].includes((target as HTMLInputElement).type);
      const isTextarea = target.tagName === 'TEXTAREA';
      const isSelect = target.tagName === 'SELECT';
      const isContentEditable = target.hasAttribute('contenteditable') || target.closest('[contenteditable="true"]') !== null;
      
      const isTextDevice = isTextTag || isTextarea || isSelect || isContentEditable;
      setIsTextInput(isTextDevice);

      // 2. Check if hovering links, buttons, or custom pointer indicators
      const isPointerElement =
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') !== null ||
        target.closest('button') !== null ||
        target.classList.contains('cursor-pointer') ||
        target.closest('.cursor-pointer') !== null ||
        window.getComputedStyle(target).cursor === 'pointer';

      // Hover scale should only activate if we are not over a text entry field
      setIsHovered(isPointerElement && !isTextDevice);
    };

    window.addEventListener('mouseover', onMouseOver);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('mouseover', onMouseOver);
    };
  }, [mouseX, mouseY, isVisible, isMobile]);

  // Framer Motion spring adjustments for smooth trailing lag on the arrowhead pointer
  const smoothDotX = useSpring(mouseX, { damping, stiffness, mass });
  const smoothDotY = useSpring(mouseY, { damping, stiffness, mass });

  if (isMobile) return null;

  return (
    <>
      {hideDefaultCursor && (
        <style dangerouslySetInnerHTML={{
          __html: `
          @media (hover: hover) and (pointer: fine) {
            body, a, button, select, [role="button"], .cursor-pointer {
              cursor: none;
            }
            input:not([type="submit"]):not([type="button"]):not([type="checkbox"]):not([type="radio"]),
            textarea,
            [contenteditable="true"],
            [contenteditable],
            select {
              cursor: auto !important;
            }
          }
        `}} />
      )}

      {/* Main Cursor Wrapper */}
      <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">

        {/* Arrowhead Cursor Pointer - Solid Black with crisp White drop-shadow outline for high contrast on dark backgrounds */}
        <motion.img
          src="/arrowhead.svg"
          alt="Cursor Pointer"
          style={{
            x: smoothDotX,
            y: smoothDotY,
            width: 18,
            height: 18,
            position: 'absolute',
            left: 0, // aligning the hotspot (tip) to the top-left of the coordinate
            top: 0,
            transformOrigin: 'top left',
            display: isVisible ? 'block' : 'none',
            // Keeps the SVG solid black and adds a crisp white outline so it stands out on deep backgrounds
            filter: 'drop-shadow(0px 0px 1px #fff) drop-shadow(0px 0px 1.5px #fff)',
          }}
          animate={{
            scale: isTextInput ? 0 : isClicked ? 0.8 : isHovered ? hoverScale : 1,
            opacity: isTextInput ? 0 : isVisible ? 1 : 0,
          }}
          transition={{
            scale: { type: 'spring', stiffness: 450, damping: 20 },
            opacity: { duration: 0.1 },
          }}
        />

      </div>
    </>
  );
}
