import React from 'react';
import AboutSection from '../components/AboutSection';
import PrismBackground from '../components/PrismBackground';
import { CanvasText } from '../components/ui/canvas-text';
import { TextGenerateEffect } from '../components/ui/text-generate-effect';

export default function About() {
  return (
    <div className="relative min-h-screen pt-24 bg-zinc-950">
      {/* Implements the gradient backgrounds replication for the About page */}
      <PrismBackground glow={0.3} noise={0.4} hueShift={0.1} />
      
      {/* A dark overlay gradient descending into the page content to merge the components visually */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/10 via-zinc-950/50 to-zinc-950 z-0 pointer-events-none" />

      {/* Main Content Container inside About Us */}
      <div className="relative z-10 w-full flex flex-col items-center">
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 w-full min-h-[60vh] pt-20">
          
          <TextGenerateEffect 
            duration={2} 
            filter={true} 
            words="Department of Physical Education" 
            className="text-xs md:text-sm font-light tracking-[0.6em] text-zinc-400 uppercase drop-shadow-2xl mb-8"
          />

          <h1 className="text-6xl md:text-8xl font-black leading-none tracking-tighter text-zinc-50 drop-shadow-[0_30px_50px_rgba(0,0,0,0.8)] inline-flex flex-wrap items-center justify-center gap-x-4 md:gap-x-6">
            <span>About Our</span>
            <span className="relative">
              <CanvasText
                text="Legacy"
                className="text-6xl md:text-8xl font-black"
                backgroundClassName="bg-zinc-950"
                colors={[
                   "#0ea5e9", // sky 500
                   "#3b82f6", // blue 500
                   "#8b5cf6", // violet 500
                   "#14b8a6", // teal 500
                 ]}
                lineGap={4}
                lineWidth={2}
                animationDuration={8}
                curveIntensity={50}
              />
            </span>
          </h1>
          <p className="mt-10 text-xl md:text-2xl font-light tracking-[0.4em] text-zinc-300 uppercase drop-shadow-2xl flex items-center gap-6">
            Pioneers of Excellence
          </p>
        </div>
        
        {/* Render the core About Section component */}
        <div className="w-full">
            <AboutSection />
        </div>
      </div>
    </div>
  );
}
