import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Monitor,
  Megaphone,
  Truck,
  Coffee,
  X,
  ChevronRight,
  Users,
  Target,
  Search,
  BarChart3,
  Shield
} from 'lucide-react';
import PrismBackground from '../components/PrismBackground';
import { TextGenerateEffect } from '../components/ui/text-generate-effect';
import { CanvasText } from '../components/ui/canvas-text';

type RegStatus = 'open' | 'soon' | 'closed';

const COMMITTEES = [
  {
    id: 'logistics',
    name: 'Logistics Committee',
    subtitle: 'OPERATIONS & EQUIPMENT MANAGEMENT',
    icon: Truck,
    shortDesc: 'Handling equipment, transport, and ground arrangements.',
    responsibilities: 'Ensuring sports equipment is available, ground preparation, transport for teams, and inventory management.',
    faculty: 'Prof. Logistics Head',
    studentHeads: ['Arjun Nair', 'Joshua Baby'],
    coreResponsibility: 'Resource & Equipment Operations',
    projects: ['Inventory Audit', 'Ground Revamp'],
    email: 'logistics.dpe@christuniversity.in',
    tags: ['Operations', 'Management'],
    registrationStatus: 'open' as RegStatus
  },
  {
    id: 'it-records',
    name: 'IT & Records Committee',
    subtitle: 'SOFTWARE, SCORE SYSTEMS & PORTALS',
    icon: Monitor,
    shortDesc: 'Managing digital presence, data, and technology infrastructure.',
    responsibilities: 'Maintains website, handles player records, manages event registrations, and ensures smooth digital operations during sports events.',
    faculty: 'Prof. Digital Head',
    studentHeads: ['Naveen Thomas George', 'Paul Joel'],
    coreResponsibility: 'System Administration & Data Management',
    projects: ['Player Tracking System', 'Tournament Portal'],
    email: 'it.dpe@christuniversity.in',
    tags: ['Technology', 'Data', 'Systems'],
    registrationStatus: 'open' as RegStatus
  },
  {
    id: 'media',
    name: 'Media Committee',
    subtitle: 'PHOTOGRAPHY, VIDEO EDITING & JOURNALISM',
    icon: Megaphone,
    shortDesc: 'Capturing moments and managing external communications and social media.',
    responsibilities: 'Photography, videography, social media management, and writing press releases for sports events and achievements.',
    faculty: 'Prof. Media Head',
    studentHeads: ['Gautham Shaji', 'Stuthi Harish'],
    coreResponsibility: 'Content Creation & Brand Management',
    projects: ['Sports Newsletter', 'DPE Instagram Reel Series'],
    email: 'media.dpe@christuniversity.in',
    tags: ['Media', 'Creative'],
    registrationStatus: 'open' as RegStatus
  },
  {
    id: 'pr',
    name: 'Public Relations (PR) Committee',
    subtitle: 'OUTREACH, SPONSORSHIPS & ANNOUNCEMENTS',
    icon: Users,
    shortDesc: 'Managing external communications, outreach, and securing sponsorships.',
    responsibilities: 'Reaching out to sponsors, managing announcements, and coordinating with external entities for sports events.',
    faculty: 'Prof. PR Head',
    studentHeads: ['Ajay Krishna', 'Ashley R S'],
    coreResponsibility: 'Outreach & Sponsorships',
    projects: ['Sponsorship Drive', 'Campus Outreach'],
    email: 'pr.dpe@christuniversity.in',
    tags: ['Public Relations', 'Outreach'],
    registrationStatus: 'open' as RegStatus
  },
  {
    id: 'creatives',
    name: 'Creatives Committee',
    subtitle: 'GRAPHIC DESIGN & EVENT AESTHETICS',
    icon: Target,
    shortDesc: 'Designing visual assets, posters, and ensuring aesthetic appeal of events.',
    responsibilities: 'Creating promotional materials, designing event branding, and managing the overall visual aesthetics of DPE.',
    faculty: 'Prof. Creatives Head',
    studentHeads: ['Nebin ', 'Janaki'],
    coreResponsibility: 'Graphic Design & Aesthetics',
    projects: ['Event Branding', 'Social Media Graphics'],
    email: 'creatives.dpe@christuniversity.in',
    tags: ['Creative', 'Design'],
    registrationStatus: 'open' as RegStatus
  },
  {
    id: 'hospitality',
    name: 'Hospitality & Emcee Committee',
    subtitle: 'GUEST COORDINATION & CERTIFICATION',
    icon: Coffee,
    shortDesc: 'Taking care of guests, teams, and officials during events.',
    responsibilities: 'Welcoming visiting teams, arranging refreshments for officials, hosting ceremonies, and managing certificates.',
    faculty: 'Prof. Hospitality Head',
    studentHeads: ['Arya Makkat', 'Tanisha'],
    coreResponsibility: 'Guest Management & Hosting',
    projects: ['Chief Guest Protocols', 'Award Ceremonies'],
    email: 'hospitality.dpe@christuniversity.in',
    tags: ['Hospitality', 'Operations'],
    registrationStatus: 'open' as RegStatus
  },
  {
    id: 'data-analytics',
    name: 'Data Analytics Committee',
    subtitle: 'PLAYER ANALYTICS, PERFORMANCE DATA & INSIGHTS',
    icon: BarChart3,
    shortDesc: 'Analyzing player statistics, match performance, and team performance insights.',
    responsibilities: 'Analyze player statistics, match performance, tournament data, and team insights. Support coaches and the department with data-driven reports and performance analytics.',
    faculty: 'Prof. Analytics Head',
    studentHeads: ['Analytics Lead 1', 'Data Head 2'],
    coreResponsibility: 'Performance Analytics & Insights',
    projects: ['Performance Dashboard', 'Tournament Analytics'],
    email: 'analytics.dpe@christuniversity.in',
    tags: ['Data Analytics', 'Statistics', 'Performance'],
    registrationStatus: 'open' as RegStatus
  },
  {
    id: 'discipline-heads',
    name: 'Discipline Heads ',
    subtitle: 'SPORT DISCIPLINE & TEAM COORDINATION',
    icon: Shield,
    shortDesc: 'Coordinating discipline, practice sessions, and player management for sports teams.',
    responsibilities: 'Coordinate discipline and communication within each sport. Ensure smooth execution of practice sessions, tournaments, attendance, and player management for every sports team.',
    faculty: 'Prof. Discipline Head',
    studentHeads: ['Discipline Lead 1', 'Team Coordinator 2'],
    coreResponsibility: 'Discipline & Team Coordination',
    projects: ['Attendance Tracking System', 'Disciplinary Standards'],
    email: 'discipline.dpe@christuniversity.in',
    tags: ['Leadership', 'Sports', 'Coordination'],
    registrationStatus: 'open' as RegStatus
  },
  {
    id: 'student-representatives',
    name: 'Student Representatives ',
    subtitle: 'SCHOOL REPRESENTATION & STUDENT ENGAGEMENT',
    icon: Users,
    shortDesc: 'Representing school requirements and strengthening student-department interactions.',
    responsibilities: 'Represent individual schools within the university, communicate student requirements, coordinate participation, and strengthen interaction between students and the Department of Physical Education.',
    faculty: 'Prof. Student Rep Head',
    studentHeads: ['Student Rep Lead 1', 'Engagement Head 2'],
    coreResponsibility: 'School Representation & Engagement',
    projects: ['Student Requirements Portal', 'School Engagement Drive'],
    email: 'reps.dpe@christuniversity.in',
    tags: ['Representation', 'Communication', 'Leadership'],
    registrationStatus: 'open' as RegStatus
  }
];

const STATS = [
  { label: 'Committees', value: 9, suffix: '' },
  { label: 'Volunteers', value: 150, suffix: '+' },
  { label: 'Events Organized', value: 35, suffix: '+' },
  { label: 'Students Engaged', value: 1000, suffix: '+' }
];

interface CounterProps {
  value: number;
  suffix: string;
}

const Counter = ({ value, suffix }: CounterProps) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const increment = value / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [value]);

  return <span>{count}{suffix}</span>;
};

export default function Committees() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const selectedCommittee = COMMITTEES.find(c => c.id === selectedId);

  const filteredCommittees = useMemo(() => {
    return COMMITTEES.filter(c => {
      return c.name.toLowerCase().includes(searchQuery.toLowerCase());
    });
  }, [searchQuery]);

  const getStatusColor = (status: RegStatus) => {
    switch (status) {
      case 'open': return 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]';
      case 'soon': return 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]';
      case 'closed': return 'bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.5)]';
    }
  };

  const getStatusText = (status: RegStatus) => {
    switch (status) {
      case 'open': return 'Registration Open';
      case 'soon': return 'Opening Soon';
      case 'closed': return 'Closed';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative min-h-screen bg-zinc-950 font-sans selection:bg-zinc-100 selection:text-zinc-900"
    >
      {/* Faux parallax background elements */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <PrismBackground glow={0.2} noise={0.4} hueShift={0.3} />
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/20 via-zinc-950/60 to-zinc-950 z-0" />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 w-full flex flex-col items-center pt-40 pb-24 px-4 md:px-8">

        {/* 1. Hero Section */}
        <div className="flex flex-col items-center justify-center text-center w-full max-w-5xl mb-16">
          <TextGenerateEffect
            duration={2}
            filter={true}
            words="Department of Physical Education"
            className="text-xs md:text-sm font-light tracking-[0.5em] text-zinc-400 uppercase drop-shadow-2xl mb-6"
          />

          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl md:text-8xl font-black leading-none tracking-tighter text-zinc-50 drop-shadow-[0_30px_50px_rgba(0,0,0,0.8)] inline-flex flex-wrap items-center justify-center gap-x-4 md:gap-x-6 mb-8"
          >
            <span className="relative">
              <CanvasText
                text="Committees"
                className="text-6xl md:text-8xl font-black"
                backgroundClassName="bg-zinc-950"
                colors={[
                  "#0ea5e9",
                  "#3b82f6",
                  "#8b5cf6",
                  "#14b8a6",
                ]}
                lineGap={4}
                lineWidth={2}
                animationDuration={8}
                curveIntensity={50}
              />
            </span>
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="max-w-2xl text-lg md:text-xl font-light leading-relaxed text-zinc-400"
          >
            Meet the dedicated teams responsible for organizing, managing, and promoting sports excellence within the Department of Physical Education.
          </motion.p>
        </div>

        {/* Statistics Section (Moved Above Filters as requested) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-5xl border-y border-zinc-800/50 py-12 mb-16 relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-900/20 to-zinc-950 pointer-events-none" />
          <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 divide-x-0 md:divide-x divide-zinc-800/50">
            {STATS.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="flex flex-col items-center justify-center text-center px-4"
              >
                <h4 className="text-4xl md:text-5xl font-black text-white mb-2 tracking-tight drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </h4>
                <p className="text-xs md:text-sm font-medium text-zinc-400 uppercase tracking-wider">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Search & Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-6xl flex flex-col items-center mb-12 space-y-8"
        >
          <div className="relative w-full max-w-md group">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Search className="w-5 h-5 text-zinc-500 group-focus-within:text-white transition-colors duration-300" />
            </div>
            <input
              type="text"
              placeholder="Search committees..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-zinc-900/50 border border-zinc-800 focus:border-zinc-500 rounded-full py-3.5 pl-12 pr-6 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-700/50 transition-all backdrop-blur-md shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)]"
            />
          </div>

        </motion.div>

        {/* 2. Committee Overview Grid */}
        <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-32">
          <AnimatePresence mode="popLayout">
            {filteredCommittees.map((committee, idx) => (
              <motion.div
                layout
                key={committee.id}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -20 }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                whileHover={{ y: -6, scale: 1.02 }}
                onClick={() => setSelectedId(committee.id)}
                className="group cursor-pointer relative p-6 rounded-3xl bg-zinc-900/40 backdrop-blur-md border border-zinc-800/60 hover:border-zinc-500/80 transition-all duration-300 overflow-hidden flex flex-col h-full"
                style={{
                  boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)'
                }}
              >
                {/* Glow border on hover */}
                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-[inset_0_0_20px_rgba(255,255,255,0.05),0_0_20px_rgba(255,255,255,0.05)] pointer-events-none" />

                {/* Background gradient transition */}
                <div className="absolute inset-0 bg-gradient-to-br from-zinc-800/0 via-zinc-800/0 to-zinc-800/0 group-hover:from-zinc-700/20 group-hover:via-zinc-800/5 group-hover:to-zinc-900/20 transition-colors duration-500 pointer-events-none" />

                {/* Shimmer light sweep */}
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/5 to-transparent group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />

                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-zinc-800/80 flex items-center justify-center border border-zinc-700/50 group-hover:border-zinc-400/50 group-hover:shadow-[0_0_15px_rgba(255,255,255,0.15)] transition-all">
                      <committee.icon className="w-6 h-6 text-zinc-300 group-hover:text-white group-hover:scale-105 transition-transform duration-300" />
                    </div>

                    {/* Status Badge */}
                    <div className="flex items-center gap-2 bg-zinc-950/60 border border-zinc-800/80 px-2.5 py-1 rounded-full backdrop-blur-sm">
                      <span className={`w-2 h-2 rounded-full ${getStatusColor(committee.registrationStatus)}`} />
                      <span className="text-[10px] font-semibold text-zinc-300 uppercase tracking-wider">{getStatusText(committee.registrationStatus)}</span>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-zinc-100 mb-1 group-hover:text-white transition-colors">{committee.name}</h3>
                  <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-3">{committee.subtitle}</p>
                  <p className="text-sm text-zinc-400 mb-4 flex-grow leading-relaxed line-clamp-3">{committee.shortDesc}</p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {committee.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="text-[10px] font-medium text-zinc-400 bg-zinc-800/30 border border-zinc-700/50 px-2 py-1 rounded-md">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center text-sm font-medium text-zinc-500 group-hover:text-white transition-colors mt-auto pt-4 border-t border-zinc-800/50 group-hover:border-zinc-600/50">
                    View Details <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1.5 group-hover:text-white transition-transform duration-300" />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {filteredCommittees.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="col-span-full py-12 text-center text-zinc-500"
            >
              No committees found matching your criteria.
            </motion.div>
          )}
        </div>

      </div>

      {/* 3. Committee Details Modal / Overlay */}
      <AnimatePresence>
        {selectedId && selectedCommittee && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
          >
            <div className="absolute inset-0 bg-zinc-950/80 backdrop-blur-md" onClick={() => setSelectedId(null)} />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-zinc-900 border border-zinc-800 rounded-3xl shadow-2xl p-6 md:p-10 custom-scrollbar"
            >
              <button
                onClick={() => setSelectedId(null)}
                className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full bg-zinc-800/50 text-zinc-400 hover:text-white hover:bg-zinc-700/50 transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-400"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-5 mb-8">
                <div className="w-16 h-16 rounded-2xl bg-zinc-800/80 flex items-center justify-center border border-zinc-700">
                  <selectedCommittee.icon className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">{selectedCommittee.name}</h2>
                  <div className="flex flex-wrap gap-2">
                    {selectedCommittee.tags.map(tag => (
                      <span key={tag} className="text-xs font-medium text-zinc-400 bg-zinc-800/30 border border-zinc-700/50 px-2 py-1 rounded-md">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <div>
                  <h4 className="flex items-center gap-2 text-sm font-semibold text-zinc-300 uppercase tracking-wider mb-3">
                    <Target className="w-4 h-4 text-zinc-500" /> Core Responsibilities
                  </h4>
                  <p className="text-zinc-400 leading-relaxed bg-zinc-950/50 p-4 rounded-2xl border border-zinc-800/50">
                    {selectedCommittee.responsibilities}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="flex items-center gap-2 text-sm font-semibold text-zinc-300 uppercase tracking-wider mb-3">
                      <Users className="w-4 h-4 text-zinc-500" /> Leadership
                    </h4>
                    <div className="bg-zinc-950/50 p-4 rounded-2xl border border-zinc-800/50 space-y-4">
                      <div>
                        <span className="text-xs text-zinc-500 block mb-1">Faculty Coordinator</span>
                        <span className="text-zinc-200 font-medium">{selectedCommittee.faculty}</span>
                      </div>
                      <div>
                        <span className="text-xs text-zinc-500 block mb-1">Student Heads</span>
                        <ul className="text-zinc-200 font-medium space-y-1">
                          {selectedCommittee.studentHeads.map((head, i) => (
                            <li key={i}>{head}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h4 className="text-sm font-semibold text-zinc-300 uppercase tracking-wider mb-3">
                        Current Projects
                      </h4>
                      <ul className="bg-zinc-950/50 p-4 rounded-2xl border border-zinc-800/50 space-y-2">
                        {selectedCommittee.projects.map((proj, i) => (
                          <li key={i} className="flex items-center gap-2 text-zinc-400 text-sm">
                            <span className="w-1.5 h-1.5 rounded-full bg-zinc-600" /> {proj}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold text-zinc-300 uppercase tracking-wider mb-3">
                        Contact
                      </h4>
                      <a href={`mailto:${selectedCommittee.email}`} className="inline-flex items-center justify-center w-full bg-zinc-800/50 hover:bg-zinc-700/50 border border-zinc-700/50 text-zinc-300 text-sm font-medium py-3 px-4 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-400">
                        {selectedCommittee.email}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
