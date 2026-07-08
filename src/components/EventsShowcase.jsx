import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useGsapAnimation, animateStaggerFade } from '../animations';

const events = [
  {
    id: 1,
    title: "CubycSpo",
    category: "Intercollege-Event",
    date: "Oct 24, 2026",
    location: "CHRIST(Deemed to be University) Yeshwanthpur, Bangalore",
    // Unsplash Premium Photography placeholder
    image: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=2000&auto=format&fit=crop",
    size: "large",
    link: "#"
  },
  {
    id: 2,
    title: "Pedagogic League",
    category: "Intra-Department",
    date: "Oct 20, 2026",
    location: "CHRIST(Deemed to be University) Yeshwanthpur, Bangalore",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1000&auto=format&fit=crop",
    size: "small",
    link: "/pedagogic-league"
  },
  {
    id: 3,
    title: "Annual Sports Meet",
    category: "Inter-College",
    date: "Oct 18, 2026",
    location: "CHRIST(Deemed to be University) Yeshwanthpur, Bangalore",
    image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=1000&auto=format&fit=crop",
    size: "small",
    link: "#"
  }
];

export default function EventsShowcase() {
  const containerRef = useRef(null);

  useGsapAnimation(() => {
    // Utilize our reusable stagger utility to elegantly fade in the grid
    // as it enters the viewport
    animateStaggerFade('.event-card', {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 85%', // Triggers just as the grid enters vision
      }
    });
  }, [], containerRef);

  return (
    <section
      ref={containerRef}
      className="py-32 px-6 md:px-12 bg-zinc-950 text-zinc-50 relative z-10 w-full"
    >
      <div className="max-w-[1400px] mx-auto">
        {/* NYNJ Style Typography Header */}
        <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between">
          <div>
            <h2 className="text-[10px] md:text-xs font-bold tracking-[0.4em] uppercase text-zinc-400 mb-6">
              Discover
            </h2>
            <h3 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-none">
              Our Events
            </h3>
          </div>
          <button className="mt-10 md:mt-0 self-start md:self-auto text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase border-b border-zinc-50 pb-2 hover:text-zinc-600 hover:border-zinc-600 transition-colors duration-300">
            View Full Roster
          </button>
        </div>

        {/* Dave Holloway / Awwwards Inspired Interactive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {events.map((event) => (
            <Link
              to={event.link}
              key={event.id}
              className={`event-card group relative overflow-hidden bg-zinc-900 cursor-pointer ${event.size === 'large'
                ? 'md:col-span-2 aspect-[4/5] md:aspect-[21/9]'
                : 'col-span-1 aspect-[4/5] md:aspect-square'
                }`}
            >
              {/* Background Media wrapper with GPU hardware acceleration */}
              <div className="absolute inset-0 w-full h-full transform-gpu transition-transform duration-[1.2s] ease-[0.25,1,0.5,1] group-hover:scale-105">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700"
                />
              </div>

              {/* Permanent lower gradient for legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/30 to-transparent pointer-events-none" />

              {/* Hover Darkening Overlay - forces focus to the text */}
              <div className="absolute inset-0 bg-zinc-950/30 opacity-0 transition-opacity duration-[1s] ease-[0.25,1,0.5,1] group-hover:opacity-100 pointer-events-none" />

              {/* Text Content Overlay */}
              <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end pointer-events-none">
                {/* 
                  This div shifts up gracefully on hover, revealing the hidden details below it.
                  Using translate-y offsets combined with the parent positioning.
                */}
                <div className="relative transform-gpu transition-transform duration-[0.8s] ease-[0.25,1,0.5,1] group-hover:-translate-y-8">

                  <p className="text-[10px] md:text-xs font-bold tracking-[0.4em] uppercase text-zinc-300 mb-4 drop-shadow-md">
                    {event.category}
                  </p>

                  <h4 className="text-4xl md:text-6xl font-black tracking-tighter uppercase text-zinc-50 drop-shadow-xl">
                    {event.title}
                  </h4>

                  {/* Revealing Sub-details hidden absolutely beneath the title */}
                  <div className="absolute top-full left-0 mt-6 opacity-0 transform-gpu transition-all duration-[0.8s] ease-[0.25,1,0.5,1] group-hover:opacity-100">
                    <p className="text-[10px] md:text-sm font-semibold tracking-[0.2em] text-zinc-200 uppercase">
                      {event.date} <span className="mx-3 opacity-30">|</span> {event.location}
                    </p>
                  </div>

                </div>
              </div>

            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
