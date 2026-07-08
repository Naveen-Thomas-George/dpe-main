import React from 'react';
import { Timeline } from './ui/timeline';
import { Spotlight } from './ui/spotlight-new';
import { PixelatedCanvas } from './ui/pixelated-canvas';

const timelineData = [
  {
    title: "2010",
    content: (
      <div>
        <p className="text-neutral-300 dark:text-neutral-200 text-sm md:text-base font-inter mb-4">
          Foundation of the Department of Physical Education. Establishing core values and setting the basis for competitive sports programs.
        </p>
        <div className="w-full flex">
          <PixelatedCanvas 
            src="https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=800&auto=format&fit=crop" 
            width={400} 
            height={250} 
            className="rounded-xl overflow-hidden border border-white/10 shadow-2xl"
            cellSize={4}
            shape="square"
            distortionMode="swirl"
            responsive={true}
          />
        </div>
      </div>
    ),
  },
  {
    title: "2015",
    content: (
      <div>
        <p className="text-neutral-300 dark:text-neutral-200 text-sm md:text-base font-inter mb-4">
          Expansion of state-of-the-art facilities. Completed the primary stadium, integrating advanced training grounds for multiple disciplines.
        </p>
        <div className="w-full flex">
          <PixelatedCanvas 
            src="https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=800&auto=format&fit=crop" 
            width={400} 
            height={250} 
            className="rounded-xl overflow-hidden border border-white/10 shadow-2xl"
            cellSize={4}
            shape="square"
            distortionMode="swirl"
            tintColor="#0ea5e9"
            tintStrength={0.3}
            responsive={true}
          />
        </div>
      </div>
    )
  },
  {
    title: "2023",
    content: (
      <div>
        <p className="text-neutral-300 dark:text-neutral-200 text-sm md:text-base font-inter mb-4">
          Hosting the National Collegiate Championship, bringing together top athletes nationwide, emphasizing excellence, integrity, and passion.
        </p>
        <div className="w-full flex">
          <PixelatedCanvas 
            src="https://images.unsplash.com/photo-1540747913346-19e32fc3e6ed?q=80&w=800&auto=format&fit=crop" 
            width={400} 
            height={250} 
            className="rounded-xl overflow-hidden border border-white/10 shadow-2xl"
            cellSize={4}
            shape="square"
            distortionMode="repel"
            tintColor="#f43f5e"
            tintStrength={0.3}
            responsive={true}
          />
        </div>
      </div>
    )
  }
];

export default function AboutSection() {
  return (
    <section className="relative w-full min-h-screen py-24 bg-transparent" id="about">
      {/* Background ambient lighting */}
      <Spotlight />
      
      <div className="relative z-10 w-full h-full">
        <Timeline 
          data={timelineData} 
          title="Our Legacy" 
          description="A brief look into the milestones that shaped our sporting excellence and dedication to athletics."
        />
      </div>
    </section>
  );
}
