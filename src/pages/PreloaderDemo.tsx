import { useState } from 'react';
import Preloader from '../components/Preloader';
import Hero, { HeroMedia } from '../components/Hero';

// Demo Background Assets matching Physical Education Theme
const MEDIA_PRESETS: Record<'video' | 'image' | 'svg', HeroMedia> = {
  video: {
    type: 'video',
    src: 'https://assets.mixkit.co/videos/preview/mixkit-stadium-lights-shining-brightly-at-night-42289-large.mp4',
  },
  image: {
    type: 'image',
    src: 'https://images.unsplash.com/photo-1541252260730-0412e8e2108e?q=80&w=1920&auto=format&fit=crop',
  },
  svg: {
    type: 'svg',
    src: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%2309090b"/><stop offset="100%" stop-color="%2327272a"/></linearGradient></defs><rect width="100" height="100" fill="url(%23g)"/><circle cx="50" cy="50" r="40" fill="none" stroke="%233f3f46" stroke-width="0.5" stroke-dasharray="2 2"/><path d="M0 50h100M50 0v100" stroke="%2327272a" stroke-width="0.5"/></svg>',
  },
};

export default function PreloaderDemo() {
  const [loaderKey, setLoaderKey] = useState(0);
  const [selectedMediaType, setSelectedMediaType] = useState<'video' | 'image' | 'svg'>('video');
  const [isPreloaderFinished, setIsPreloaderFinished] = useState(false);

  const handleReset = () => {
    setIsPreloaderFinished(false);
    setLoaderKey((prev) => prev + 1);
  };

  const handleFinish = () => {
    setIsPreloaderFinished(true);
    console.log('Preloader completed! Optional callback fired successfully.');
  };

  return (
    <div className="relative min-h-screen bg-zinc-950 text-zinc-50 overflow-hidden font-sans">
      
      {/* 1. Preloader Component (Self-contained, mounts on top) */}
      <Preloader key={loaderKey} onFinish={handleFinish} />

      {/* 2. Hero Section (Always mounted underneath so media buffers early) */}
      <Hero
        media={MEDIA_PRESETS[selectedMediaType]}
        title="Department of Physical Education"
        subtitle="Christ (Deemed to be University) • BYC Campus"
        actionText="Register For Events"
        onActionClick={() => alert('Registration action clicked!')}
      />

      {/* 3. Interactive Control Panel (Only shown/interactive after preloader fades or visible in dev mode) */}
      <div 
        className={`fixed top-24 right-6 z-[80] p-5 bg-zinc-950/80 border border-zinc-800 backdrop-blur-xl rounded-2xl flex flex-col gap-4 shadow-2xl transition-all duration-500 ${
          isPreloaderFinished ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
      >
        <div className="flex flex-col gap-1">
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-200">
            Dev Controls
          </h3>
          <p className="text-[10px] text-zinc-500 font-mono">
            Test preloader transitions & backgrounds
          </p>
        </div>

        <div className="h-[1px] bg-zinc-800 w-full" />

        {/* Media Selector */}
        <div className="flex flex-col gap-2">
          <label className="text-[10px] font-semibold uppercase tracking-[0.1em] text-zinc-400">
            Background Media
          </label>
          <div className="grid grid-cols-3 gap-1 bg-zinc-900/50 p-1 rounded-lg border border-zinc-800/80">
            {(['video', 'image', 'svg'] as const).map((type) => (
              <button
                key={type}
                onClick={() => setSelectedMediaType(type)}
                className={`px-2 py-1.5 text-[10px] uppercase font-bold rounded-md transition-all cursor-pointer ${
                  selectedMediaType === type
                    ? 'bg-zinc-50 text-zinc-950'
                    : 'text-zinc-400 hover:text-zinc-50 hover:bg-zinc-800/40'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <button
          onClick={handleReset}
          className="w-full py-2 bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-zinc-50 text-[10px] font-bold uppercase tracking-[0.2em] rounded-xl transition-all shadow-md cursor-pointer hover:border-zinc-700 active:scale-95"
        >
          Replay Preloader
        </button>
      </div>

      {/* Subtle indicator of current background type on bottom right */}
      <div 
        className={`fixed bottom-4 left-4 z-[80] font-mono text-[9px] text-zinc-500 tracking-widest uppercase transition-opacity duration-500 ${
          isPreloaderFinished ? 'opacity-100' : 'opacity-0'
        }`}
      >
        Active Media: <span className="text-zinc-300 font-bold">{selectedMediaType}</span>
      </div>

    </div>
  );
}
