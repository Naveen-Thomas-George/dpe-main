import Image from 'next/image';

export type HeroMedia =
  | { type: 'video'; src: string }
  | { type: 'image'; src: string }
  | { type: 'svg'; src: string };

interface HeroProps {
  media: HeroMedia;
  title: string;
  subtitle?: string;
  actionText?: string;
  onActionClick?: () => void;
}

export default function Hero({ media, title, subtitle, actionText, onActionClick }: HeroProps) {
  return (
    <section className="relative w-full h-screen overflow-hidden flex items-center justify-center bg-zinc-950 select-none">
      
      {/* Background Media Container */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden select-none pointer-events-none">
        
        {media.type === 'video' ? (
          <video
            src={media.src}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover origin-center scale-[1.01]"
          />
        ) : (
          /* Using next/image for 'image' or 'svg' */
          <Image
            src={media.src}
            alt="Hero background"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        )}
      </div>

      {/* Dark gradient scrim (absolutely positioned between media and text content) */}
      <div 
        className="absolute inset-0 z-10 bg-gradient-to-b from-black/40 via-zinc-950/50 to-zinc-950 pointer-events-none"
        aria-hidden="true"
      />

      {/* Foreground Content */}
      <div className="relative z-20 flex flex-col items-center justify-center text-center px-4 max-w-5xl">
        <h1 className="text-3xl sm:text-6xl md:text-8xl lg:text-9xl font-black leading-none tracking-tighter text-zinc-50 drop-shadow-[0_15px_30px_rgba(0,0,0,0.8)] uppercase px-2">
          {title}
        </h1>
        
        {subtitle && (
          <p className="mt-6 text-xs sm:text-lg md:text-xl lg:text-2xl font-light tracking-[0.2em] sm:tracking-[0.6em] md:tracking-[0.8em] text-zinc-300 uppercase drop-shadow-lg leading-relaxed max-w-3xl">
            {subtitle}
          </p>
        )}

        {actionText && (
          <button
            onClick={onActionClick}
            className="mt-10 px-8 py-3.5 bg-zinc-50 text-zinc-950 font-sans text-xs tracking-[0.3em] font-bold uppercase rounded-xl hover:bg-zinc-200 hover:scale-105 transition-all shadow-xl hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] cursor-pointer"
          >
            {actionText}
          </button>
        )}
      </div>

      {/* Cinematic subtle scroll indicator */}
      <div className="absolute z-20 bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center opacity-60 pointer-events-none">
        <span className="text-[9px] md:text-[10px] uppercase tracking-[0.4em] text-zinc-400 mb-3" style={{ writingMode: 'vertical-rl' }}>
          Explore
        </span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-zinc-500 to-transparent" />
      </div>
    </section>
  );
}
