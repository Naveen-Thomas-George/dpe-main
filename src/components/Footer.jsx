import { useRef } from 'react';
import { Mail, ArrowUpRight } from 'lucide-react';
import { useGsapAnimation, animateFadeUp } from '../animations';

export default function Footer() {
  const containerRef = useRef(null);

  useGsapAnimation(() => {
    // Graceful fade up as the user hits the absolute bottom of the layout
    animateFadeUp('.footer-content', {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 95%', // Triggers just as this enters view
      }
    });
  }, [], containerRef);

  return (
    <footer ref={containerRef} className="relative bg-zinc-950 pt-24 md:pt-32 pb-6 overflow-hidden border-t border-zinc-900 w-full z-10 flex flex-col items-center">

      {/* Primary Footer Content Grid */}
      <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 footer-content bg-zinc-950 opacity-0 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 mb-24">

          {/* Identity & Social Base */}
          <div className="lg:col-span-5 flex flex-col">
            <h4 className="text-5xl md:text-6xl font-black tracking-tighter uppercase text-zinc-50 mb-6 drop-shadow-md">
              DPE
            </h4>
            <p className="text-zinc-400 text-sm md:text-base font-medium max-w-sm tracking-wide leading-relaxed">
              Engineering the global standard for elite operational sports infrastructure and exclusive experiential athletics.
            </p>

            {/* Social Link Row */}
            <div className="mt-10 flex space-x-4">
              {[
                { type: "text", label: "IG", href: "https://instagram.com" },
                { type: "text", label: "IN", href: "https://linkedin.com" },
                { type: "icon", Icon: Mail, href: "mailto:[EMAIL_ADDRESS]" }
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="w-14 h-14 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-zinc-950 hover:bg-zinc-50 hover:border-zinc-50 hover:scale-110 transition-all duration-300 transform-gpu font-bold text-sm tracking-wider"
                >
                  {social.type === 'text' ? social.label : <social.Icon className="w-5 h-5" />}
                </a>
              ))}
            </div>
          </div>

          {/* Navigational Indices */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-12 sm:gap-8">

            {/* Nav */}
            <div className="flex flex-col space-y-5">
              <h5 className="text-[10px] font-bold tracking-[0.4em] uppercase text-zinc-600 mb-2 border-b border-zinc-900 pb-2">
                Index
              </h5>
              {['Roster', 'Schedule', 'Archives', 'Store'].map(item => (
                <a key={item} href={`#${item.toLowerCase()}`} className="text-xs font-bold tracking-[0.2em] uppercase text-zinc-300 hover:text-zinc-50 transition-colors flex items-center group w-max">
                  {item}
                  <ArrowUpRight className="w-3 h-3 ml-1 opacity-0 -translate-y-1 translate-x-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0" />
                </a>
              ))}
            </div>

            {/* Legal / Policy */}
            <div className="flex flex-col space-y-5">
              <h5 className="text-[10px] font-bold tracking-[0.4em] uppercase text-zinc-600 mb-2 border-b border-zinc-900 pb-2">
                Policy
              </h5>
              {['Privacy Protocol', 'Terms & Conditions', 'Athlete Conduct', 'Cookie Framework'].map(item => (
                <a key={item} href="#" className="text-xs font-bold tracking-[0.2em] uppercase text-zinc-300 hover:text-zinc-50 transition-colors w-max">
                  {item}
                </a>
              ))}
            </div>

            {/* Communications */}
            <div className="flex flex-col space-y-5">
              <h5 className="text-[10px] font-bold tracking-[0.4em] uppercase text-zinc-600 mb-2 border-b border-zinc-900 pb-2">
                Communications
              </h5>
              <a href="#" className="text-xs font-bold tracking-[0.1em] text-zinc-300 hover:text-zinc-50 transition-colors w-max">
                dpe.byc@christuniversity.in
              </a>
              <a href="#" className="text-xs font-bold tracking-[0.1em] text-zinc-300 hover:text-zinc-50 transition-colors w-max">
                +1 800.555.0199
              </a>
              <p className="text-[11px] font-medium tracking-wider text-zinc-500 mt-2 leading-relaxed">
                Department of Physical Education<br />Chirst University, Nagasandra<br />Bangalore, Karnataka 560058
              </p>
            </div>

          </div>
        </div>

        {/* Global Copyright Anchor */}
        <div className="flex flex-col sm:flex-row justify-between items-center pt-8 border-t border-zinc-900/50">
          <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-zinc-600">
            © {new Date().getFullYear()} DPE Sports Engine.
          </p>
          <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-zinc-600 mt-4 sm:mt-0">
            All Rights Reserved.
          </p>
        </div>
      </div>

      {/* Massive Moving Background Marquee Overlay 
          Positioned absolute below content but above background to create textural depth
      */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden flex whitespace-nowrap bg-zinc-950 select-none pointer-events-none opacity-[0.02] z-0">
        <div className="marquee-track flex">
          {[1, 2, 3, 4].map((tier) => (
            <div key={tier} className="flex items-center gap-16 px-8">
              <span className="text-[12rem] md:text-[18rem] font-black tracking-tighter uppercase leading-none pb-6">DPE | BYC</span>
              <span
                className="text-[12rem] md:text-[18rem] font-black tracking-tighter uppercase leading-none pb-6 text-transparent"
                style={{ WebkitTextStroke: "2px #fafafa" }}
              >
                DPE | BYC
              </span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .marquee-track {
          /* Continuous infinite scroll loop */
          animation: slideMarquee 25s linear infinite;
        }

        @keyframes slideMarquee {
          0% { transform: translate3d(0, 0, 0); }
          /* Shifting precisely -50% forces seamlessly looping if there are 4 identical blocks */
          100% { transform: translate3d(-50%, 0, 0); } 
        }
      `}</style>

    </footer>
  );
}
