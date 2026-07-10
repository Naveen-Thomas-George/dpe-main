"use client";
import {
  useMotionValueEvent,
  useScroll,
  useTransform,
  motion,
} from "motion/react";
import React, { useEffect, useRef, useState } from "react";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

interface TimelineProps {
  data: TimelineEntry[];
  title?: string;
  description?: string;
}

export const Timeline = ({ data, title, description }: TimelineProps) => {
  // Positioning context for the vertical line
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // State variables to store the calculated start offset (top) and height of the vertical line
  const [height, setHeight] = useState(0);
  const [startY, setStartY] = useState(0);

  // Refs to measure the first and last marker elements dynamically
  const firstMarkerRef = useRef<HTMLDivElement | null>(null);
  const lastMarkerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let frameId: number;
    const updateDimensions = () => {
      if (ref.current && firstMarkerRef.current && lastMarkerRef.current) {
        const containerRect = ref.current.getBoundingClientRect();
        const firstRect = firstMarkerRef.current.getBoundingClientRect();
        const lastRect = lastMarkerRef.current.getBoundingClientRect();

        // Calculate center positions relative to the container top.
        // Reading getBoundingClientRect() directly on scroll captures the actual 
        // real-time visual coordinate of the dots even as they stick/unstick.
        const firstCenterY = firstRect.top - containerRect.top + firstRect.height / 2;
        const lastCenterY = lastRect.top - containerRect.top + lastRect.height / 2;

        setStartY(firstCenterY);
        setHeight(lastCenterY - firstCenterY);
      }
    };

    const handleScroll = () => {
      cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(updateDimensions);
    };

    updateDimensions();

    // Use ResizeObserver to automatically recalculate dimensions when elements reflow or resize
    const resizeObserver = new ResizeObserver(() => {
      updateDimensions();
    });
    if (ref.current) {
      resizeObserver.observe(ref.current);
    }

    // Attach scroll listener to update line boundaries dynamically as sticky nodes float
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(frameId);
    };
  }, [data]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div
      className="w-full max-w-7xl mx-auto font-sans md:px-10 bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-[40px] shadow-[0_8px_32px_rgba(0,0,0,0.5)] my-12"
      ref={containerRef}
    >
      <div className="max-w-7xl mx-auto py-20 px-4 md:px-8 lg:px-10">
        {title && (
          <h2 className="text-lg md:text-5xl mb-4 text-zinc-100 max-w-4xl font-outfit font-bold tracking-tight drop-shadow-lg">
            {title}
          </h2>
        )}
        {description && (
          <p className="text-neutral-700 dark:text-neutral-300 text-sm md:text-base max-w-sm font-inter">
            {description}
          </p>
        )}
      </div>

      <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
        {data.map((item, index) => (
          <div
            key={index}
            // Explicitly relative parent wrapper to constrain the sticky boundary to this item's height
            className="relative flex justify-start pt-10 md:pt-40 md:gap-10"
          >
            {/* Year/dot container is sticky inside its relative parent, so it scrolls away naturally with its content */}
            <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
              <div 
                ref={index === 0 ? firstMarkerRef : index === data.length - 1 ? lastMarkerRef : null}
                className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-zinc-900/80 backdrop-blur-md flex items-center justify-center border border-zinc-700/50 shadow-xl"
              >
                <div className="h-4 w-4 rounded-full bg-zinc-400 border-2 border-zinc-300 p-2 shadow-[0_0_15px_rgba(255,255,255,0.4)]" />
              </div>
              <h3 className="hidden md:block text-xl md:pl-20 md:text-6xl font-black text-zinc-500/50 tracking-tighter drop-shadow-sm">
                {item.title}
              </h3>
            </div>

            <div className="relative pl-20 pr-4 md:pl-4 w-full">
              <h3 className="md:hidden block text-2xl mb-4 text-left font-bold text-neutral-500 dark:text-neutral-500">
                {item.title}
              </h3>
              {item.content}{" "}
            </div>
          </div>
        ))}
        
        {/* Absolutely positioned single line track starting and ending precisely at first and last dot centers */}
        {/* Changed bg-neutral-800 to bg-transparent to remove the background track line completely */}
        <div
          style={{
            top: startY + "px",
            height: height + "px",
          }}
          className="absolute md:left-8 left-8 overflow-hidden w-[2px] bg-transparent"
        >
          {/* Animated active scroll progress line (rendered as the only vertical line) */}
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0  w-[2px] bg-gradient-to-t from-purple-500 via-blue-500 to-transparent from-[0%] via-[10%] rounded-full"
          />
        </div>
      </div>
    </div>
  );
};
