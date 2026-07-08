import { useRef, useState } from 'react';
import { MapPin, Navigation } from 'lucide-react';
import { useGsapAnimation, animateFadeUp } from '../animations';
import { AnimatePresence, motion } from 'framer-motion';

// Hardcoded coordinates on our relative map
const locations = [
  { id: 1, name: "CU | BYC", type: "Campus", x: "25%", y: "40%", details: "Main athletic compound and operational base for DPE events." },
  { id: 2, name: "CU | Central", type: "Main Campus", x: "65%", y: "30%", details: "Base Campus" },
  { id: 3, name: "CU | Kengeri", type: "Kengeri Campus", x: "42%", y: "65%", details: "Athletic Facility" },
  { id: 4, name: "CU | BGR", type: "Bannerghatta Road Campus", x: "80%", y: "75%", details: "" },
];

export default function MapSection() {
  const containerRef = useRef(null);
  const [activeLocation, setActiveLocation] = useState(null);

  useGsapAnimation(() => {
    // Cinematic scroll reveal for the entire map container
    animateFadeUp('.map-block', {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 85%',
      }
    });
  }, [], containerRef);

  return (
    <section ref={containerRef} className="py-32 px-6 md:px-12 bg-zinc-950 w-full relative z-10 border-t border-zinc-900 overflow-hidden">
      <div className="max-w-[1400px] mx-auto map-block opacity-0">

        {/* Editorial NYNJ Header */}
        <div className="mb-16 md:mb-20 flex flex-col md:flex-row justify-between items-start md:items-end">
          <div>
            <h2 className="text-[10px] md:text-xs font-bold tracking-[0.4em] uppercase text-zinc-500 mb-6 flex items-center">
              <Navigation className="w-3 h-3 mr-3" /> Venues
            </h2>
            <h3 className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-none text-zinc-50">
              Global Grid
            </h3>
          </div>
          <p className="mt-8 md:mt-0 text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase text-zinc-400 max-w-xs md:text-right">
            Discover our operational facilities and active event arenas worldwide.
          </p>
        </div>

        {/* Map Container Viewport */}
        <div className="relative w-full aspect-[4/5] md:aspect-[21/9] bg-zinc-900 rounded-lg md:rounded-3xl overflow-hidden border border-zinc-800/80 group">

          {/* Abstract Dark Map Texture 
              Using NASA Earth at night for a premium sports-broadcast cinematic feel.
          */}
          <div className="absolute inset-0 grayscale opacity-80 scale-105 group-hover:scale-100 transition-transform duration-[1.5s] ease-[0.25,1,0.5,1] transform-gpu">
            <img
              src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2000&auto=format&fit=crop"
              alt="Global Grid Background"
              className="w-full h-full object-cover origin-center"
            />
          </div>

          {/* Heavy Dark Overlay to preserve contrast and UX */}
          <div className="absolute inset-0 bg-gradient-to-tr from-zinc-950/90 via-zinc-950/60 to-zinc-950/90 pointer-events-none transition-opacity duration-[1s]" />

          {/* Interactive Plot Points */}
          {locations.map((loc) => (
            <div
              key={loc.id}
              className="absolute z-20"
              style={{ left: loc.x, top: loc.y }}
              onMouseEnter={() => setActiveLocation(loc)}
              onMouseLeave={() => setActiveLocation(null)}
            >
              {/* Infinite Radar Pulse Effect */}
              <div className="absolute -inset-6 bg-zinc-50/10 rounded-full animate-ping pointer-events-none" />

              {/* Physical Map Pin */}
              <div className="relative flex items-center justify-center w-8 h-8 md:w-10 md:h-10 bg-zinc-950/80 backdrop-blur-md border border-zinc-600 rounded-full text-zinc-200 cursor-pointer hover:bg-zinc-50 hover:border-zinc-50 hover:text-zinc-950 hover:scale-[1.3] transition-all duration-300 transform-gpu shadow-xl">
                <MapPin className="w-3 h-3 md:w-4 md:h-4" />
              </div>

              {/* Hover Tooltip / Details popover via Framer Motion Spring */}
              <AnimatePresence>
                {activeLocation?.id === loc.id && (
                  <motion.div
                    initial={{ opacity: 0, y: 15, scale: 0.95, filter: "blur(4px)" }}
                    animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: 10, scale: 0.95, filter: "blur(4px)" }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-4 md:mt-6 w-[200px] md:w-[280px] bg-zinc-950/90 backdrop-blur-xl border border-zinc-800 p-5 md:p-6 rounded-xl shadow-2xl pointer-events-none"
                  >
                    <p className="text-[8px] md:text-[9px] font-bold tracking-[0.3em] uppercase text-zinc-500 mb-2">
                      {loc.type}
                    </p>
                    <h4 className="text-xl md:text-2xl font-black tracking-tight text-zinc-50 mb-3 uppercase leading-none">
                      {loc.name}
                    </h4>
                    <p className="text-[10px] md:text-xs text-zinc-400 font-medium leading-relaxed">
                      {loc.details}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}

          {/* Map Scanning Lines Overlay (creates a CRT / tactical feeling) */}
          <div
            className="absolute inset-0 pointer-events-none opacity-20"
            style={{
              backgroundImage: 'repeating-linear-gradient(transparent, transparent 2px, rgba(250, 250, 250, 0.05) 2px, rgba(250, 250, 250, 0.05) 4px)'
            }}
          />

        </div>
      </div>
    </section>
  );
}
