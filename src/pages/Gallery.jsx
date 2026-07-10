import React, { useState } from 'react';
import { HoverEffect, CardTitle } from '../components/ui/card-hover-effect';
import Folder from '../components/ui/Folder';
import { Search } from 'lucide-react';
import PrismBackground from '../components/PrismBackground';

import { HoverBorderGradient } from '../components/ui/hover-border-gradient';

export default function Gallery() {
  const [searchQuery, setSearchQuery] = useState('');

  // Placeholder data for the event folders
  const events = [
    { title: "National Collegiate Championship", color: "#3b82f6" }, // Blue
    { title: "Annual Sports Meet 2024", color: "#10b981" }, // Emerald
    { title: "Inter-University Athletics", color: "#8b5cf6" }, // Violet
    { title: "Basketball League Finals", color: "#f59e0b" }, // Amber
    { title: "Swimming Gala", color: "#06b6d4" }, // Cyan
    { title: "Marathon 2023", color: "#ef4444" }, // Red
  ];

  // Filter logic (currently just filters by title)
  const filteredEvents = events.filter(event => 
    event.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Map to the format HoverEffect expects, using our custom Folder component for content
  const folderItems = filteredEvents.map((event) => ({
    title: event.title,
    content: (
      <HoverBorderGradient
        containerClassName="rounded-[2rem] w-full"
        as="div"
        className="flex flex-col items-center justify-center gap-6 h-full w-full py-8 px-4 bg-transparent border-none"
      >
        <Folder size={1.2} color={event.color} />
        <h4 className="text-center mt-2 text-sm md:text-base font-medium tracking-wider text-zinc-200">
          {event.title}
        </h4>
      </HoverBorderGradient>
    )
  }));

  return (
    <div className="relative min-h-screen pt-40 pb-24 bg-zinc-950">
      <PrismBackground glow={0.2} noise={0.4} hueShift={0.5} />
      
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/40 via-zinc-950/80 to-zinc-950 z-0 pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        
        {/* Header and Search Bar */}
        <div className="flex flex-col items-center justify-center mb-16 text-center">
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase text-zinc-50 mb-8 drop-shadow-md">
            Event Gallery
          </h1>
          
          <div className="relative w-full max-w-md group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-zinc-500 group-focus-within:text-blue-500 transition-colors" />
            </div>
            <input
              type="text"
              placeholder="Search event folders..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-zinc-900/50 border border-zinc-800 text-zinc-100 rounded-full py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all shadow-inner backdrop-blur-sm placeholder:text-zinc-500"
            />
          </div>
        </div>

        {/* Folders Grid */}
        {filteredEvents.length > 0 ? (
          <HoverEffect items={folderItems} />
        ) : (
          <div className="text-center text-zinc-500 mt-20">
            No events found matching "{searchQuery}".
          </div>
        )}

      </div>
    </div>
  );
}
