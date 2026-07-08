import { useRef } from 'react';
import { Trophy, ChevronUp, ChevronDown, Minus } from 'lucide-react';
import { useGsapAnimation, animateStaggerFade } from '../animations';

const players = [
  { id: 1, name: "Marcus 'Viper' Thorne", score: 9482, trend: 'up', avatar: "MT" },
  { id: 2, name: "Sarah 'Phantom' Jin", score: 9104, trend: 'up', avatar: "SJ" },
  { id: 3, name: "David 'Crusher' Rossi", score: 8750, trend: 'down', avatar: "DR" },
  { id: 4, name: "Elena Kova", score: 8420, trend: 'stable', avatar: "EK" },
  { id: 5, name: "James 'Ghost' Wu", score: 8100, trend: 'up', avatar: "JW" },
  { id: 6, name: "Michael Chen", score: 7950, trend: 'down', avatar: "MC" },
  { id: 7, name: "Anna 'Blitz' Smith", score: 7800, trend: 'stable', avatar: "AS" },
];

export default function Leaderboard() {
  const containerRef = useRef(null);

  useGsapAnimation(() => {
    // Elegant staggered entrance as the leaderboard enters viewport
    animateStaggerFade('.leaderboard-row', {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 85%',
      }
    });
  }, [], containerRef);

  // Assigns extreme premium aesthetic styling for top tier players
  const getRankStyle = (rank) => {
    switch(rank) {
      case 1: return "bg-gradient-to-r from-amber-500/10 to-transparent border-l-2 border-amber-500";
      case 2: return "bg-gradient-to-r from-zinc-300/10 to-transparent border-l-2 border-zinc-300";
      case 3: return "bg-gradient-to-r from-orange-800/20 to-transparent border-l-2 border-orange-700";
      default: return "border-l-2 border-transparent bg-zinc-900/30";
    }
  };

  const getRankIcon = (rank) => {
    if (rank === 1) return <Trophy className="w-5 h-5 text-amber-500 mb-1" />;
    return <span className={`font-black text-2xl tracking-tighter ${rank <= 3 ? 'text-zinc-50' : 'text-zinc-600'}`}>{rank}</span>;
  };

  const getTrendIcon = (trend) => {
    switch(trend) {
      case 'up': return <ChevronUp className="w-4 h-4 text-emerald-500" />;
      case 'down': return <ChevronDown className="w-4 h-4 text-rose-500" />;
      default: return <Minus className="w-4 h-4 text-zinc-600" />;
    }
  };

  return (
    <section ref={containerRef} className="py-32 px-6 md:px-12 bg-zinc-950 w-full relative z-10 border-t border-zinc-900">
      <div className="max-w-[1200px] mx-auto">
        
        {/* Structural Headers - NYNJ aggressive aesthetic */}
        <div className="mb-16 md:mb-24 flex flex-col md:flex-row justify-between items-start md:items-end">
          <div>
            <h2 className="text-[10px] md:text-xs font-bold tracking-[0.4em] uppercase text-zinc-500 mb-6">Records</h2>
            <h3 className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-none text-zinc-50">Global Ranking</h3>
          </div>
          <div className="mt-8 md:mt-0 flex gap-6 text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase text-zinc-400">
            <span className="text-zinc-50 border-b border-zinc-50 pb-1 cursor-pointer">Global</span>
            <span className="hover:text-zinc-50 transition-colors cursor-pointer">Regional</span>
          </div>
        </div>

        {/* Dynamic Leaderboard Container */}
        <div className="flex flex-col space-y-1">
          {/* Metadata Row */}
          <div className="flex items-center px-6 md:px-10 pb-6 border-b border-zinc-800/80 text-[9px] md:text-[10px] font-bold tracking-[0.2em] uppercase text-zinc-600">
            <div className="w-12 md:w-20">Rank</div>
            <div className="flex-1">Athlete</div>
            <div className="w-24 md:w-32 text-right">Score</div>
            <div className="w-16 flex justify-end md:justify-center">Form</div>
          </div>

          {/* Interactive Player Rows */}
          {players.map((player, index) => {
            const rank = index + 1;
            const isTop3 = rank <= 3;
            
            return (
              <div 
                key={player.id} 
                className={`leaderboard-row group flex items-center px-6 md:px-10 py-5 rounded-r-2xl bg-zinc-900/40 hover:bg-zinc-800 transition-all duration-[400ms] ease-out transform-gpu cursor-pointer hover:shadow-2xl hover:shadow-zinc-950 hover:-translate-y-1 ${getRankStyle(rank)}`}
              >
                {/* Visual Rank Indicator */}
                <div className="w-12 md:w-20 flex items-center justify-start opacity-80 group-hover:opacity-100 transition-opacity">
                  {getRankIcon(rank)}
                </div>

                {/* Identity / Avatar Base */}
                <div className="flex-1 flex items-center space-x-4 md:space-x-8">
                  <div className={`w-10 h-10 md:w-14 md:h-14 rounded-full flex items-center justify-center font-bold text-xs tracking-wider transform-gpu transition-transform duration-500 ease-out group-hover:scale-110 ${isTop3 ? 'bg-zinc-800 text-zinc-50 border border-zinc-700' : 'bg-zinc-900 text-zinc-500 border border-zinc-800/50'}`}>
                    {player.avatar}
                  </div>
                  <div className={`text-sm md:text-xl font-bold uppercase tracking-wide transition-colors duration-300 ${isTop3 ? 'text-zinc-50' : 'text-zinc-400 group-hover:text-zinc-50'}`}>
                    {player.name}
                  </div>
                </div>

                {/* Metrics */}
                <div className="w-24 md:w-32 text-right flex flex-col justify-center transform-gpu transition-all duration-300 group-hover:-translate-x-2">
                  <span className={`font-black text-xl md:text-3xl tracking-tighter ${isTop3 ? 'text-zinc-50' : 'text-zinc-400 group-hover:text-zinc-200'}`}>
                    {player.score.toLocaleString()}
                  </span>
                  <span className="text-[8px] md:text-[9px] uppercase tracking-[0.2em] text-zinc-600 font-bold mt-1">PTS</span>
                </div>

                {/* Form / Trend Identifier */}
                <div className="w-16 flex justify-end md:justify-center items-center">
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-zinc-900/50 flex items-center justify-center border border-zinc-800/80 group-hover:bg-zinc-800 transition-colors duration-300 group-hover:shadow-[0_0_15px_rgba(255,255,255,0.05)]">
                    {getTrendIcon(player.trend)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Expansion Action */}
        <div className="mt-16 flex justify-center">
           <button className="px-10 py-5 text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase border border-zinc-800 text-zinc-400 hover:bg-zinc-50 hover:text-zinc-950 hover:border-zinc-50 transition-all duration-[400ms] transform-gpu hover:-translate-y-1">
             Expand Leaderboard
           </button>
        </div>

      </div>
    </section>
  );
}
