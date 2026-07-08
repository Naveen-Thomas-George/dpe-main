import { useState, useRef, useEffect } from 'react';
import { useGsapAnimation, gsap } from '../animations';
import { Shield, Users, User, CheckCircle2, ChevronDown, Award, BookOpen, Trophy } from 'lucide-react';

// ACADEMIC DATA MAPPING
const SCHOOLS_DATA = {
  'School of Sciences': [
    'Department of Computer Science',
    'Department of Mathematics',
    'Department of Statistics',
    'Department of Chemistry & Biochemistry',
    'Department of Physics'
  ],
  'School of Business and Management': [
    'Department of Management Studies',
    'Department of Business Administration',
    'Department of Tourism & Travel Management'
  ],
  'School of Commerce, Finance and Accountancy': [
    'Department of Commerce',
    'Department of Professional Studies',
    'Department of Finance'
  ],
  'School of Arts and Humanities': [
    'Department of Psychology',
    'Department of Media Studies',
    'Department of English',
    'Department of Performing Arts & Fine Arts'
  ],
  'School of Law': [
    'School of Law'
  ]
};

type SchoolType = keyof typeof SCHOOLS_DATA;

// EVENT & SPORT CONSTANTS
const INDIVIDUAL_EVENTS = [
  { id: 'chess', name: 'Chess', desc: 'Battle of minds on the 64 squares.' },
  { id: 'carrom', name: 'Carrom', desc: 'Precision strikes & pocketing coins.' },
  { id: 'table-tennis', name: 'Table Tennis', desc: 'Fast-paced table rallies.' },
  { id: 'athletics', name: 'Athletics', desc: 'Track & field sprints.' },
  { id: 'badminton', name: 'Badminton Singles', desc: 'Singles court dominance.' },
  { id: 'esports', name: 'E-Sports', desc: 'Digital arena battlegrounds.' },
];

const TEAM_SPORTS = [
  { id: 'football', name: 'Football', size: 11, desc: '11 players on the turf.' },
  { id: 'basketball', name: 'Basketball', size: 12, desc: 'High flying hoop battles.' },
  { id: 'volleyball', name: 'Volleyball', size: 10, desc: 'Spike, set, and block.' },
  { id: 'cricket', name: 'Cricket', size: 15, desc: '15-man squad operations.' },
  { id: 'throwball', name: 'Throwball', size: 12, desc: 'Court catches and throws.' },
  { id: 'kabaddi', name: 'Kabaddi', size: 12, desc: 'Raids, tackles, and tags.' },
];

export default function PedagogicLeague() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rulesRef = useRef<HTMLDivElement>(null);
  const registrationRef = useRef<HTMLDivElement>(null);

  // CATEGORY & EVENT SELECTION STATES
  const [selectedCategory, setSelectedCategory] = useState<'individual' | 'team' | null>(null);
  const [selectedEventId, setSelectedEventId] = useState<string>('');
  
  // DYNAMIC FORMS SUBMITTED STATES
  const [isIndividualSuccess, setIsIndividualSuccess] = useState(false);
  const [isTeamSuccess, setIsTeamSuccess] = useState(false);

  // RULES EXPAND STATES
  const [expandedRule, setExpandedRule] = useState<number | null>(null);

  // 1. INDIVIDUAL FORM STATES
  const [indName, setIndName] = useState('');
  const [indReg, setIndReg] = useState('');
  const [indEmail, setIndEmail] = useState('');
  const [indPhone, setIndPhone] = useState('');
  const [indSchool, setIndSchool] = useState<SchoolType | ''>('');
  const [indDept, setIndDept] = useState('');
  const [indClass, setIndClass] = useState('');
  const [indSection, setIndSection] = useState('');
  const [indConfirm1, setIndConfirm1] = useState(false);
  const [indConfirm2, setIndConfirm2] = useState(false);
  
  // Validation error states
  const [indErrors, setIndErrors] = useState<Record<string, string>>({});

  // 2. TEAM CAPTAIN FORM STATES
  const [capName, setCapName] = useState('');
  const [capReg, setCapReg] = useState('');
  const [capEmail, setCapEmail] = useState('');
  const [capPhone, setCapPhone] = useState('');
  const [capSchool, setCapSchool] = useState<SchoolType | ''>('');
  const [capDept, setCapDept] = useState('');
  const [capClass, setCapClass] = useState('');
  const [capSection, setCapSection] = useState('');

  // Team players list (dynamic slots)
  interface PlayerData {
    name: string;
    reg: string;
    email: string;
  }
  const [players, setPlayers] = useState<PlayerData[]>([]);
  const [teamConfirm1, setTeamConfirm1] = useState(false);
  const [teamConfirm2, setTeamConfirm2] = useState(false);
  const [teamErrors, setTeamErrors] = useState<Record<string, string>>({});

  // Scroll Helpers
  const scrollTo = (ref: React.RefObject<HTMLDivElement | null>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Dynamic players generator
  useEffect(() => {
    if (selectedCategory === 'team' && selectedEventId) {
      const sport = TEAM_SPORTS.find(s => s.id === selectedEventId);
      if (sport) {
        // Pre-create array slots minus captain (Captain details are separate)
        const sizeMinusCaptain = sport.size - 1;
        setPlayers(
          Array.from({ length: sizeMinusCaptain }, () => ({ name: '', reg: '', email: '' }))
        );
      }
    }
  }, [selectedEventId, selectedCategory]);

  // RESET FORM ERRORS ON EVENT CHANGE
  useEffect(() => {
    setIndErrors({});
    setTeamErrors({});
  }, [selectedEventId, selectedCategory]);

  // ANIMATIONS SETUP
  useGsapAnimation(() => {
    // Cinematic Reveal animations
    gsap.fromTo(
      '.reveal-element',
      { y: 80, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.5,
        stagger: 0.15,
        ease: 'power3.out',
        force3D: true,
      }
    );

    gsap.fromTo(
      '.glow-grid',
      { opacity: 0 },
      { opacity: 0.15, duration: 3, ease: 'sine.inOut' }
    );
  }, [], containerRef);

  // VALIDATORS
  const validateChristEmail = (email: string) => {
    const lower = email.toLowerCase().trim();
    return (
      lower.endsWith('@christuniversity.in') ||
      lower.endsWith('@res.christuniversity.in') ||
      lower.endsWith('@pgr.christuniversity.in')
    );
  };

  const validatePhone = (phone: string) => {
    // 10 digits Indian mobile number check (starts with 6-9)
    return /^[6-9]\d{9}$/.test(phone.trim());
  };

  const validateRegisterNo = (reg: string) => {
    // Exactly 7 digits check
    return /^\d{7}$/.test(reg.trim());
  };

  // INDIVIDUAL SUBMISSION HANDLER
  const handleIndividualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};

    if (!selectedEventId) errors.event = 'Please pick an event category first.';
    if (!indName.trim()) errors.name = 'Full Name is required.';
    if (!validateRegisterNo(indReg)) errors.reg = 'Register number must be exactly 7 digits.';
    if (!validateChristEmail(indEmail)) errors.email = 'Must be a valid CHRIST email domain (@christuniversity.in / @res.christuniversity.in).';
    if (!validatePhone(indPhone)) errors.phone = 'Enter a valid 10-digit Indian phone number.';
    if (!indSchool) errors.school = 'Select your School.';
    if (!indDept) errors.dept = 'Select your Department.';
    if (!indClass.trim()) errors.class = 'Class details required.';
    if (!indSection.trim()) errors.section = 'Section required.';
    if (!indConfirm1 || !indConfirm2) errors.confirm = 'Confirm all checkboxes to submit.';

    if (Object.keys(errors).length > 0) {
      setIndErrors(errors);
      // Find first error field and scroll
      const firstErr = Object.keys(errors)[0];
      const el = document.getElementById(`ind-${firstErr}`);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    setIndErrors({});
    setIsIndividualSuccess(true);
  };

  // TEAM SUBMISSION HANDLER
  const handleTeamSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};

    if (!selectedEventId) errors.event = 'Please pick a team sport first.';
    if (!capName.trim()) errors.capName = 'Captain Full Name is required.';
    if (!validateRegisterNo(capReg)) errors.capReg = 'Register number must be exactly 7 digits.';
    if (!validateChristEmail(capEmail)) errors.capEmail = 'Must be a valid CHRIST email domain.';
    if (!validatePhone(capPhone)) errors.capPhone = 'Enter a valid 10-digit Indian phone number.';
    if (!capSchool) errors.capSchool = 'Select School.';
    if (!capDept) errors.capDept = 'Select Department.';
    if (!capClass.trim()) errors.capClass = 'Class required.';
    if (!capSection.trim()) errors.capSection = 'Section required.';

    // Validate player inputs
    players.forEach((player, idx) => {
      const playerNum = idx + 2;
      if (!player.name.trim()) {
        errors[`player-${idx}-name`] = `Player ${playerNum} name is required.`;
      }
      if (!validateRegisterNo(player.reg)) {
        errors[`player-${idx}-reg`] = `Player ${playerNum} register number must be 7 digits.`;
      }
      if (!validateChristEmail(player.email)) {
        errors[`player-${idx}-email`] = `Player ${playerNum} must have a valid CHRIST email.`;
      }
    });

    if (!teamConfirm1 || !teamConfirm2) errors.confirm = 'Confirm all checkboxes to submit.';

    if (Object.keys(errors).length > 0) {
      setTeamErrors(errors);
      // Find first error and scroll to it
      const firstErrKey = Object.keys(errors)[0];
      const el = document.getElementById(firstErrKey);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    setTeamErrors({});
    setIsTeamSuccess(true);
  };

  // Dynamic player input change helper
  const handlePlayerChange = (index: number, field: keyof PlayerData, value: string) => {
    const updated = [...players];
    updated[index] = { ...updated[index], [field]: value };
    setPlayers(updated);
  };

  // Active sport details
  const activeSport = TEAM_SPORTS.find(s => s.id === selectedEventId);

  // Compute registered players count
  const filledPlayersCount = players.filter(p => p.name.trim() && p.reg.trim() && p.email.trim()).length + 1; // plus captain

  return (
    <div ref={containerRef} className="relative min-h-screen bg-zinc-950 text-zinc-50 overflow-hidden font-sans">
      
      {/* GLOW GRID BACKGROUND */}
      <div 
        className="glow-grid absolute inset-0 z-0 pointer-events-none opacity-10 bg-[linear-gradient(to_right,rgba(63,63,70,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(63,63,70,0.1)_1px,transparent_1px)] bg-[size:4rem_4rem]"
        style={{
          maskImage: 'radial-gradient(ellipse_at_center,black 40%,transparent 85%)',
          WebkitMaskImage: 'radial-gradient(ellipse_at_center,black 40%,transparent 85%)'
        }}
      />
      
      {/* BLUE RADIAL GLOW FOR CINEMATIC SPORTS LOOK */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[60vh] bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.15)_0%,rgba(9,9,11,0)_70%)] pointer-events-none z-0" />
      <div className="absolute top-[80vh] right-0 w-[50vw] h-[50vh] bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.08)_0%,rgba(9,9,11,0)_60%)] pointer-events-none z-0" />

      {/* ================= HERO SECTION ================= */}
      <section className="relative min-h-screen flex items-center justify-center pt-24 px-6 z-10">
        <div className="max-w-5xl mx-auto text-center flex flex-col items-center justify-center">
          
          {/* Badge */}
          <div className="reveal-element inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-[10px] md:text-xs font-semibold tracking-[0.2em] uppercase mb-8 shadow-[0_0_15px_rgba(59,130,246,0.1)]">
            <Trophy className="w-3.5 h-3.5" />
            Intra-Department Championship
          </div>

          <h1 className="reveal-element text-6xl sm:text-8xl md:text-[10rem] font-black leading-none tracking-tighter uppercase select-none drop-shadow-[0_20px_45px_rgba(0,0,0,0.8)] text-zinc-50">
            Pedagogic <br className="sm:hidden" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-500 to-blue-700 filter drop-shadow-[0_0_20px_rgba(59,130,246,0.3)]">League</span>
          </h1>

          <p className="reveal-element mt-6 text-xl sm:text-2xl md:text-3xl font-light tracking-[0.5em] text-zinc-300 uppercase">
            Compete. Collaborate. Conquer.
          </p>

          <p className="reveal-element mt-8 text-sm sm:text-base md:text-lg text-zinc-400 max-w-3xl leading-relaxed font-light tracking-wide">
            An elite sporting arena for department clusters. Represent your academic home, match up against competitor divisions, and push for the ultimate department trophy. Built for players, strategists, and champions.
          </p>

          {/* CTAs */}
          <div className="reveal-element mt-12 flex flex-wrap gap-4 items-center justify-center">
            <button
              onClick={() => scrollTo(registrationRef)}
              className="px-8 py-4 bg-blue-600 hover:bg-blue-500 hover:shadow-[0_0_30px_rgba(59,130,246,0.4)] text-white text-xs tracking-[0.3em] font-bold uppercase rounded-xl transition-all cursor-pointer transform hover:scale-105 active:scale-95"
            >
              Register Now
            </button>
            <button
              onClick={() => scrollTo(rulesRef)}
              className="px-8 py-4 bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 hover:text-white hover:border-zinc-700 text-zinc-400 text-xs tracking-[0.3em] font-bold uppercase rounded-xl transition-all cursor-pointer transform hover:scale-105 active:scale-95"
            >
              View Rules
            </button>
          </div>

        </div>

        {/* Scroll down mouse animation */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center opacity-40 pointer-events-none">
          <div className="w-[1px] h-10 bg-gradient-to-b from-blue-500 to-transparent" />
        </div>
      </section>

      {/* ================= SECTION 2: RULES AND REGULATIONS ================= */}
      <section ref={rulesRef} className="relative py-28 px-6 z-10 border-t border-zinc-900/60 bg-zinc-950/40 backdrop-blur-md">
        <div className="max-w-4xl mx-auto">
          
          <div className="text-center mb-16">
            <h2 className="text-[10px] md:text-xs font-bold tracking-[0.4em] uppercase text-blue-500 mb-4">
              REGULATIONS
            </h2>
            <h3 className="text-4xl md:text-6xl font-black tracking-tighter uppercase">
              Tournament Rules
            </h3>
            <p className="mt-4 text-xs md:text-sm text-zinc-500 max-w-xl mx-auto font-light leading-relaxed">
              Read all requirements carefully. Ensuring compliance maintains high competitive sportsmanship.
            </p>
          </div>

          {/* ACCORDION RULES LIST */}
          <div className="flex flex-col gap-4">
            {[
              {
                title: 'General Rules',
                icon: <Award className="w-5 h-5 text-blue-500" />,
                content: 'All matches will follow international standards modified for departmental cluster guidelines. Strict adherence to schedule timers is required; teams late by more than 10 minutes will automatically forfeit the game. The referees decision remains absolute and final on-court.'
              },
              {
                title: 'Eligibility Criteria',
                icon: <Shield className="w-5 h-5 text-blue-500" />,
                content: 'Participation is open exclusively to active students enrolled in departments under the Christ University Yeshwanthpur campus. Players must display their official University ID cards prior to match entry. Inter-campus transfers must clear athletic boards first.'
              },
              {
                title: 'Individual Events Rules',
                icon: <User className="w-5 h-5 text-blue-500" />,
                content: 'Single players are capped to registration in a maximum of two individual matches (e.g. Chess and Table Tennis). Registrant details must match register cards. No proxy players are permitted under any condition.'
              },
              {
                title: 'Team Sports Rules',
                icon: <Users className="w-5 h-5 text-blue-500" />,
                content: 'Each team registration must designate an active Team Captain. Roster limits must follow strict size standards (e.g. Football 11+substitutions limit, Cricket 15). Captain details are registered separately and act as the principal point of communication.'
              },
              {
                title: 'Code of Conduct',
                icon: <BookOpen className="w-5 h-5 text-blue-500" />,
                content: 'Zero tolerance for unsportsmanlike behavior, vulgar expressions, or physical altercations. Disciplinary infractions will result in immediate disqualification of the entire team and referral to the University Disciplinary Council.'
              }
            ].map((rule, idx) => (
              <div 
                key={idx}
                className="bg-zinc-900/30 border border-zinc-800/80 backdrop-blur-md hover:border-blue-500/20 transition-all duration-300 rounded-2xl overflow-hidden"
              >
                <button
                  onClick={() => setExpandedRule(expandedRule === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-6 cursor-pointer text-left focus:outline-none"
                >
                  <div className="flex items-center gap-4">
                    {rule.icon}
                    <span className="font-sans font-bold text-sm md:text-base uppercase tracking-wider text-zinc-100">
                      {rule.title}
                    </span>
                  </div>
                  <ChevronDown 
                    className={`w-5 h-5 text-zinc-500 transition-transform duration-300 ${
                      expandedRule === idx ? 'transform rotate-180 text-blue-500' : ''
                    }`}
                  />
                </button>
                
                <div 
                  className={`transition-all duration-300 ease-in-out ${
                    expandedRule === idx ? 'max-h-52 opacity-100 border-t border-zinc-900/80' : 'max-h-0 opacity-0 pointer-events-none'
                  }`}
                >
                  <div className="p-6 text-xs md:text-sm text-zinc-400 font-light leading-relaxed bg-zinc-950/20">
                    {rule.content}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ================= SECTION 3: EVENT SELECTION ================= */}
      <section ref={registrationRef} className="relative py-28 px-6 z-10 bg-zinc-950 border-t border-zinc-900/60">
        <div className="max-w-6xl mx-auto">
          
          <div className="text-center mb-16">
            <h2 className="text-[10px] md:text-xs font-bold tracking-[0.4em] uppercase text-blue-500 mb-4">
              REGISTRATION
            </h2>
            <h3 className="text-4xl md:text-6xl font-black tracking-tighter uppercase">
              Choose Event Format
            </h3>
            <p className="mt-4 text-xs md:text-sm text-zinc-500 max-w-xl mx-auto font-light">
              Toggle event category formats below to configure registration inputs.
            </p>
          </div>

          {/* TWO CATEGORY CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            
            {/* Card 1: Individual */}
            <button
              onClick={() => {
                setSelectedCategory('individual');
                setSelectedEventId('');
              }}
              className={`flex flex-col items-center justify-center p-10 bg-zinc-900/30 border text-center transition-all duration-300 rounded-3xl cursor-pointer ${
                selectedCategory === 'individual'
                  ? 'border-blue-500 bg-blue-500/5 shadow-[0_0_35px_rgba(59,130,246,0.15)] scale-[1.02]'
                  : 'border-zinc-800/80 hover:border-zinc-700 hover:bg-zinc-900/50'
              }`}
            >
              <div className={`p-4 rounded-full mb-6 transition-colors ${
                selectedCategory === 'individual' ? 'bg-blue-500/20 text-blue-400' : 'bg-zinc-800 text-zinc-400'
              }`}>
                <User className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold uppercase tracking-wider text-zinc-100">
                Individual Events
              </h4>
              <p className="mt-3 text-xs text-zinc-500 max-w-[280px] font-light leading-relaxed">
                Singles categories, chess matrices, athletics, and custom e-sports formats.
              </p>
            </button>

            {/* Card 2: Team Sports */}
            <button
              onClick={() => {
                setSelectedCategory('team');
                setSelectedEventId('');
              }}
              className={`flex flex-col items-center justify-center p-10 bg-zinc-900/30 border text-center transition-all duration-300 rounded-3xl cursor-pointer ${
                selectedCategory === 'team'
                  ? 'border-blue-500 bg-blue-500/5 shadow-[0_0_35px_rgba(59,130,246,0.15)] scale-[1.02]'
                  : 'border-zinc-800/80 hover:border-zinc-700 hover:bg-zinc-900/50'
              }`}
            >
              <div className={`p-4 rounded-full mb-6 transition-colors ${
                selectedCategory === 'team' ? 'bg-blue-500/20 text-blue-400' : 'bg-zinc-800 text-zinc-400'
              }`}>
                <Users className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold uppercase tracking-wider text-zinc-100">
                Team Sports
              </h4>
              <p className="mt-3 text-xs text-zinc-500 max-w-[280px] font-light leading-relaxed">
                Football turf, basketball hoops, volleyball sets, and department cricket operations.
              </p>
            </button>

          </div>

          {/* DYNAMIC FORMS PANEL CONTAINER */}
          {selectedCategory && (
            <div className="mt-20 pt-16 border-t border-zinc-900/60 max-w-4xl mx-auto">
              
              {/* ================= FORMS BLOCK: INDIVIDUAL ================= */}
              {selectedCategory === 'individual' && (
                <div>
                  <div className="text-center mb-12">
                    <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-zinc-50">
                      Individual Event Registration
                    </h3>
                    <p className="mt-2 text-xs text-zinc-500 font-light">
                      Select your target activity below and fill out the details block.
                    </p>
                  </div>

                  {/* Dynamic picker grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-10">
                    {INDIVIDUAL_EVENTS.map((event) => (
                      <button
                        key={event.id}
                        type="button"
                        onClick={() => setSelectedEventId(event.id)}
                        className={`p-5 text-left border rounded-2xl transition-all cursor-pointer ${
                          selectedEventId === event.id
                            ? 'border-blue-500 bg-blue-500/10 shadow-[0_0_20px_rgba(59,130,246,0.1)]'
                            : 'border-zinc-800 bg-zinc-900/20 hover:border-zinc-700'
                        }`}
                      >
                        <h5 className="font-bold text-xs uppercase tracking-wider text-zinc-200">
                          {event.name}
                        </h5>
                        <p className="mt-1 text-[10px] text-zinc-500 font-light leading-snug">
                          {event.desc}
                        </p>
                      </button>
                    ))}
                  </div>

                  {/* Form validation alert */}
                  {indErrors.event && (
                    <div className="p-4 mb-8 bg-red-950/20 border border-red-900/50 rounded-xl text-xs text-red-400 font-medium">
                      {indErrors.event}
                    </div>
                  )}

                  {/* RENDER FORM IF EVENT IS SELECTED */}
                  {selectedEventId && (
                    <div>
                      {isIndividualSuccess ? (
                        <div className="p-10 bg-zinc-900/40 border border-zinc-800 rounded-3xl backdrop-blur-md flex flex-col items-center justify-center text-center shadow-xl">
                          <CheckCircle2 className="w-16 h-16 text-blue-500 mb-6 filter drop-shadow-[0_0_15px_rgba(59,130,246,0.3)] animate-bounce" />
                          <h4 className="text-2xl font-black uppercase text-zinc-100">
                            Registration Success
                          </h4>
                          <p className="mt-3 text-xs text-zinc-400 max-w-sm leading-relaxed font-light">
                            Congratulations! Your individual registration sheet has been saved. Match schedules will arrive on your registered CHRIST email soon.
                          </p>
                          <button
                            type="button"
                            onClick={() => {
                              setIsIndividualSuccess(false);
                              setSelectedEventId('');
                              setIndName('');
                              setIndReg('');
                              setIndEmail('');
                              setIndPhone('');
                              setIndSchool('');
                              setIndDept('');
                              setIndClass('');
                              setIndSection('');
                              setIndConfirm1(false);
                              setIndConfirm2(false);
                            }}
                            className="mt-8 px-6 py-2.5 bg-blue-600 hover:bg-blue-500 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] text-white text-[10px] tracking-[0.2em] font-bold uppercase rounded-lg transition-all cursor-pointer"
                          >
                            Register Another Event
                          </button>
                        </div>
                      ) : (
                        <form onSubmit={handleIndividualSubmit} className="space-y-6 bg-zinc-900/20 border border-zinc-800/80 p-8 md:p-10 rounded-3xl backdrop-blur-md">
                          
                          {/* Selected display text field */}
                          <div className="p-4 bg-zinc-900/50 border border-zinc-800/80 rounded-xl">
                            <span className="text-[9px] uppercase tracking-widest text-zinc-500 font-bold block">
                              Active Event Format
                            </span>
                            <span className="text-sm font-bold uppercase tracking-wider text-blue-400 mt-1 block">
                              {INDIVIDUAL_EVENTS.find(e => e.id === selectedEventId)?.name}
                            </span>
                          </div>

                          {/* Personal details grid */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div id="ind-name" className="flex flex-col gap-2">
                              <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                                Full Name
                              </label>
                              <input
                                type="text"
                                value={indName}
                                onChange={(e) => setIndName(e.target.value)}
                                className={`bg-zinc-950 border text-zinc-100 text-xs px-4 py-3 rounded-xl focus:outline-none focus:ring-1 ${
                                  indErrors.name ? 'border-red-500 focus:ring-red-500' : 'border-zinc-800 focus:ring-blue-500'
                                }`}
                                placeholder="Enter your full name"
                              />
                              {indErrors.name && <span className="text-[9px] text-red-500">{indErrors.name}</span>}
                            </div>

                            <div id="ind-reg" className="flex flex-col gap-2">
                              <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                                Register Number (7 Digits)
                              </label>
                              <input
                                type="text"
                                value={indReg}
                                onChange={(e) => setIndReg(e.target.value)}
                                className={`bg-zinc-950 border text-zinc-100 text-xs px-4 py-3 rounded-xl focus:outline-none focus:ring-1 ${
                                  indErrors.reg ? 'border-red-500 focus:ring-red-500' : 'border-zinc-800 focus:ring-blue-500'
                                }`}
                                placeholder="e.g. 2410123"
                                maxLength={7}
                              />
                              {indErrors.reg && <span className="text-[9px] text-red-500">{indErrors.reg}</span>}
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div id="ind-email" className="flex flex-col gap-2">
                              <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                                CHRIST Email Address
                              </label>
                              <input
                                type="email"
                                value={indEmail}
                                onChange={(e) => setIndEmail(e.target.value)}
                                className={`bg-zinc-950 border text-zinc-100 text-xs px-4 py-3 rounded-xl focus:outline-none focus:ring-1 ${
                                  indErrors.email ? 'border-red-500 focus:ring-red-500' : 'border-zinc-800 focus:ring-blue-500'
                                }`}
                                placeholder="name@christuniversity.in"
                              />
                              {indErrors.email && <span className="text-[9px] text-red-500">{indErrors.email}</span>}
                            </div>

                            <div id="ind-phone" className="flex flex-col gap-2">
                              <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                                Phone Number (10 Digits)
                              </label>
                              <input
                                type="text"
                                value={indPhone}
                                onChange={(e) => setIndPhone(e.target.value)}
                                className={`bg-zinc-950 border text-zinc-100 text-xs px-4 py-3 rounded-xl focus:outline-none focus:ring-1 ${
                                  indErrors.phone ? 'border-red-500 focus:ring-red-500' : 'border-zinc-800 focus:ring-blue-500'
                                }`}
                                placeholder="e.g. 9876543210"
                                maxLength={10}
                              />
                              {indErrors.phone && <span className="text-[9px] text-red-500">{indErrors.phone}</span>}
                            </div>
                          </div>

                          {/* Academic details grid */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div id="ind-school" className="flex flex-col gap-2">
                              <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                                School
                              </label>
                              <select
                                value={indSchool}
                                onChange={(e) => {
                                  setIndSchool(e.target.value as SchoolType);
                                  setIndDept(''); // reset dept
                                }}
                                className="bg-zinc-950 border border-zinc-800 text-zinc-300 text-xs px-4 py-3 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500"
                              >
                                <option value="">Select School</option>
                                {Object.keys(SCHOOLS_DATA).map((school) => (
                                  <option key={school} value={school}>
                                    {school}
                                  </option>
                                ))}
                              </select>
                              {indErrors.school && <span className="text-[9px] text-red-500">{indErrors.school}</span>}
                            </div>

                            <div id="ind-dept" className="flex flex-col gap-2">
                              <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                                Department
                              </label>
                              <select
                                value={indDept}
                                onChange={(e) => setIndDept(e.target.value)}
                                disabled={!indSchool}
                                className="bg-zinc-950 border border-zinc-800 text-zinc-300 text-xs px-4 py-3 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:opacity-40 disabled:cursor-not-allowed"
                              >
                                <option value="">Select Department</option>
                                {indSchool &&
                                  SCHOOLS_DATA[indSchool].map((dept) => (
                                    <option key={dept} value={dept}>
                                      {dept}
                                    </option>
                                  ))}
                              </select>
                              {indErrors.dept && <span className="text-[9px] text-red-500">{indErrors.dept}</span>}
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div id="ind-class" className="flex flex-col gap-2">
                              <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                                Class
                              </label>
                              <input
                                type="text"
                                value={indClass}
                                onChange={(e) => setIndClass(e.target.value)}
                                className={`bg-zinc-950 border text-zinc-100 text-xs px-4 py-3 rounded-xl focus:outline-none focus:ring-1 ${
                                  indErrors.class ? 'border-red-500 focus:ring-red-500' : 'border-zinc-800 focus:ring-blue-500'
                                }`}
                                placeholder="e.g. 3 BSC CS"
                              />
                              {indErrors.class && <span className="text-[9px] text-red-500">{indErrors.class}</span>}
                            </div>

                            <div id="ind-section" className="flex flex-col gap-2">
                              <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                                Section
                              </label>
                              <input
                                type="text"
                                value={indSection}
                                onChange={(e) => setIndSection(e.target.value)}
                                className={`bg-zinc-950 border text-zinc-100 text-xs px-4 py-3 rounded-xl focus:outline-none focus:ring-1 ${
                                  indErrors.section ? 'border-red-500 focus:ring-red-500' : 'border-zinc-800 focus:ring-blue-500'
                                }`}
                                placeholder="e.g. A"
                              />
                              {indErrors.section && <span className="text-[9px] text-red-500">{indErrors.section}</span>}
                            </div>
                          </div>

                          {/* Confirmations */}
                          <div id="ind-confirm" className="space-y-3 pt-4 border-t border-zinc-900">
                            <label className="flex items-start gap-3 text-zinc-400 text-xs cursor-pointer select-none">
                              <input
                                type="checkbox"
                                checked={indConfirm1}
                                onChange={(e) => setIndConfirm1(e.target.checked)}
                                className="w-4 h-4 mt-0.5 rounded border-zinc-800 bg-zinc-950 text-blue-600 focus:ring-blue-500 cursor-pointer"
                              />
                              <span>I confirm that the information provided is accurate.</span>
                            </label>

                            <label className="flex items-start gap-3 text-zinc-400 text-xs cursor-pointer select-none">
                              <input
                                type="checkbox"
                                checked={indConfirm2}
                                onChange={(e) => setIndConfirm2(e.target.checked)}
                                className="w-4 h-4 mt-0.5 rounded border-zinc-800 bg-zinc-950 text-blue-600 focus:ring-blue-500 cursor-pointer"
                              />
                              <span>I agree to abide by the rules and regulations of the Pedagogic League.</span>
                            </label>

                            {indErrors.confirm && (
                              <span className="text-[9px] text-red-500 block">{indErrors.confirm}</span>
                            )}
                          </div>

                          {/* Submit */}
                          <button
                            type="submit"
                            className="w-full py-4 bg-blue-600 hover:bg-blue-500 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] text-white text-xs tracking-[0.3em] font-bold uppercase rounded-xl transition-all cursor-pointer mt-4"
                          >
                            Submit Registration
                          </button>
                        </form>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* ================= FORMS BLOCK: TEAM SPORTS ================= */}
              {selectedCategory === 'team' && (
                <div>
                  <div className="text-center mb-12">
                    <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-zinc-50">
                      Team Sports Registration
                    </h3>
                    <p className="mt-2 text-xs text-zinc-500 font-light">
                      Register as Team Captain below, pick your sport, and fill out your dynamic player roster.
                    </p>
                  </div>

                  {/* Dynamic picker grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-10">
                    {TEAM_SPORTS.map((event) => (
                      <button
                        key={event.id}
                        type="button"
                        onClick={() => setSelectedEventId(event.id)}
                        className={`p-5 text-left border rounded-2xl transition-all cursor-pointer ${
                          selectedEventId === event.id
                            ? 'border-blue-500 bg-blue-500/10 shadow-[0_0_20px_rgba(59,130,246,0.1)]'
                            : 'border-zinc-800 bg-zinc-900/20 hover:border-zinc-700'
                        }`}
                      >
                        <h5 className="font-bold text-xs uppercase tracking-wider text-zinc-200">
                          {event.name}
                        </h5>
                        <p className="mt-1 text-[9px] text-zinc-500 font-mono tracking-wider">
                          {event.size} PLAYERS
                        </p>
                      </button>
                    ))}
                  </div>

                  {/* Form validation alert */}
                  {teamErrors.event && (
                    <div className="p-4 mb-8 bg-red-950/20 border border-red-900/50 rounded-xl text-xs text-red-400 font-medium">
                      {teamErrors.event}
                    </div>
                  )}

                  {/* RENDER FORM IF SPORT SELECTED */}
                  {selectedEventId && activeSport && (
                    <div>
                      {isTeamSuccess ? (
                        <div className="p-10 bg-zinc-900/40 border border-zinc-800 rounded-3xl backdrop-blur-md flex flex-col items-center justify-center text-center shadow-xl">
                          <CheckCircle2 className="w-16 h-16 text-blue-500 mb-6 filter drop-shadow-[0_0_15px_rgba(59,130,246,0.3)] animate-bounce" />
                          <h4 className="text-2xl font-black uppercase text-zinc-100">
                            Team Registered Successfully
                          </h4>
                          <p className="mt-3 text-xs text-zinc-400 max-w-sm leading-relaxed font-light">
                            High five, Captain! The team roster sheets have been submitted. Final schedule dates and rules updates will be sent to your registered captain email address.
                          </p>
                          <button
                            type="button"
                            onClick={() => {
                              setIsTeamSuccess(false);
                              setSelectedEventId('');
                              setCapName('');
                              setCapReg('');
                              setCapEmail('');
                              setCapPhone('');
                              setCapSchool('');
                              setCapDept('');
                              setCapClass('');
                              setCapSection('');
                              setPlayers([]);
                              setTeamConfirm1(false);
                              setTeamConfirm2(false);
                            }}
                            className="mt-8 px-6 py-2.5 bg-blue-600 hover:bg-blue-500 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] text-white text-[10px] tracking-[0.2em] font-bold uppercase rounded-lg transition-all cursor-pointer"
                          >
                            Register Another Team
                          </button>
                        </div>
                      ) : (
                        <form onSubmit={handleTeamSubmit} className="space-y-8">
                          
                          {/* Selected display text field */}
                          <div className="p-4 bg-zinc-900/50 border border-zinc-800/80 rounded-xl flex items-center justify-between">
                            <div>
                              <span className="text-[9px] uppercase tracking-widest text-zinc-500 font-bold block">
                                Selected Sport
                              </span>
                              <span className="text-base font-bold uppercase tracking-wider text-blue-400 mt-1 block">
                                {activeSport.name}
                              </span>
                            </div>
                            <div className="text-right">
                              <span className="text-[9px] uppercase tracking-widest text-zinc-500 font-bold block">
                                Roster size
                              </span>
                              <span className="text-base font-mono font-bold text-zinc-300 mt-1 block">
                                {activeSport.size} Players
                              </span>
                            </div>
                          </div>

                          {/* ================= CAPTAIN PORTION ================= */}
                          <div className="bg-blue-950/10 border border-blue-500/20 p-8 rounded-3xl backdrop-blur-md relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-full blur-xl pointer-events-none" />
                            
                            <h4 className="text-sm font-bold uppercase tracking-[0.2em] text-blue-400 mb-6 flex items-center gap-2">
                              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 text-[10px]">
                                C
                              </span>
                              Team Captain Details
                            </h4>

                            <div className="space-y-6">
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div id="capName" className="flex flex-col gap-2">
                                  <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                                    Full Name
                                  </label>
                                  <input
                                    type="text"
                                    value={capName}
                                    onChange={(e) => setCapName(e.target.value)}
                                    className={`bg-zinc-950 border text-zinc-100 text-xs px-4 py-3 rounded-xl focus:outline-none focus:ring-1 ${
                                      teamErrors.capName ? 'border-red-500 focus:ring-red-500' : 'border-zinc-800 focus:ring-blue-500'
                                    }`}
                                    placeholder="Captain's full name"
                                  />
                                  {teamErrors.capName && <span className="text-[9px] text-red-500">{teamErrors.capName}</span>}
                                </div>

                                <div id="capReg" className="flex flex-col gap-2">
                                  <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                                    Register Number (7 Digits)
                                  </label>
                                  <input
                                    type="text"
                                    value={capReg}
                                    onChange={(e) => setCapReg(e.target.value)}
                                    className={`bg-zinc-950 border text-zinc-100 text-xs px-4 py-3 rounded-xl focus:outline-none focus:ring-1 ${
                                      teamErrors.capReg ? 'border-red-500 focus:ring-red-500' : 'border-zinc-800 focus:ring-blue-500'
                                    }`}
                                    placeholder="e.g. 2410123"
                                    maxLength={7}
                                  />
                                  {teamErrors.capReg && <span className="text-[9px] text-red-500">{teamErrors.capReg}</span>}
                                </div>
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div id="capEmail" className="flex flex-col gap-2">
                                  <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                                    CHRIST Email Address
                                  </label>
                                  <input
                                    type="email"
                                    value={capEmail}
                                    onChange={(e) => setCapEmail(e.target.value)}
                                    className={`bg-zinc-950 border text-zinc-100 text-xs px-4 py-3 rounded-xl focus:outline-none focus:ring-1 ${
                                      teamErrors.capEmail ? 'border-red-500 focus:ring-red-500' : 'border-zinc-800 focus:ring-blue-500'
                                    }`}
                                    placeholder="name.surname@christuniversity.in"
                                  />
                                  {teamErrors.capEmail && <span className="text-[9px] text-red-500">{teamErrors.capEmail}</span>}
                                </div>

                                <div id="capPhone" className="flex flex-col gap-2">
                                  <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                                    Phone Number (10 Digits)
                                  </label>
                                  <input
                                    type="text"
                                    value={capPhone}
                                    onChange={(e) => setCapPhone(e.target.value)}
                                    className={`bg-zinc-950 border text-zinc-100 text-xs px-4 py-3 rounded-xl focus:outline-none focus:ring-1 ${
                                      teamErrors.capPhone ? 'border-red-500 focus:ring-red-500' : 'border-zinc-800 focus:ring-blue-500'
                                    }`}
                                    placeholder="e.g. 9876543210"
                                    maxLength={10}
                                  />
                                  {teamErrors.capPhone && <span className="text-[9px] text-red-500">{teamErrors.capPhone}</span>}
                                </div>
                              </div>

                              {/* Academic details */}
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div id="capSchool" className="flex flex-col gap-2">
                                  <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                                    School
                                  </label>
                                  <select
                                    value={capSchool}
                                    onChange={(e) => {
                                      setCapSchool(e.target.value as SchoolType);
                                      setCapDept(''); // reset dept
                                    }}
                                    className="bg-zinc-950 border border-zinc-800 text-zinc-300 text-xs px-4 py-3 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500"
                                  >
                                    <option value="">Select School</option>
                                    {Object.keys(SCHOOLS_DATA).map((school) => (
                                      <option key={school} value={school}>
                                        {school}
                                      </option>
                                    ))}
                                  </select>
                                  {teamErrors.capSchool && <span className="text-[9px] text-red-500">{teamErrors.capSchool}</span>}
                                </div>

                                <div id="capDept" className="flex flex-col gap-2">
                                  <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                                    Department
                                  </label>
                                  <select
                                    value={capDept}
                                    onChange={(e) => setCapDept(e.target.value)}
                                    disabled={!capSchool}
                                    className="bg-zinc-950 border border-zinc-800 text-zinc-300 text-xs px-4 py-3 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:opacity-40 disabled:cursor-not-allowed"
                                  >
                                    <option value="">Select Department</option>
                                    {capSchool &&
                                      SCHOOLS_DATA[capSchool].map((dept) => (
                                        <option key={dept} value={dept}>
                                          {dept}
                                        </option>
                                      ))}
                                  </select>
                                  {teamErrors.capDept && <span className="text-[9px] text-red-500">{teamErrors.capDept}</span>}
                                </div>
                              </div>

                              <div className="grid grid-cols-2 gap-4">
                                <div id="capClass" className="flex flex-col gap-2">
                                  <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                                    Class
                                  </label>
                                  <input
                                    type="text"
                                    value={capClass}
                                    onChange={(e) => setCapClass(e.target.value)}
                                    className={`bg-zinc-950 border text-zinc-100 text-xs px-4 py-3 rounded-xl focus:outline-none focus:ring-1 ${
                                      teamErrors.capClass ? 'border-red-500 focus:ring-red-500' : 'border-zinc-800 focus:ring-blue-500'
                                    }`}
                                    placeholder="e.g. 3 BSC CS"
                                  />
                                  {teamErrors.capClass && <span className="text-[9px] text-red-500">{teamErrors.capClass}</span>}
                                </div>

                                <div id="capSection" className="flex flex-col gap-2">
                                  <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                                    Section
                                  </label>
                                  <input
                                    type="text"
                                    value={capSection}
                                    onChange={(e) => setCapSection(e.target.value)}
                                    className={`bg-zinc-950 border text-zinc-100 text-xs px-4 py-3 rounded-xl focus:outline-none focus:ring-1 ${
                                      teamErrors.capSection ? 'border-red-500 focus:ring-red-500' : 'border-zinc-800 focus:ring-blue-500'
                                    }`}
                                    placeholder="e.g. A"
                                  />
                                  {teamErrors.capSection && <span className="text-[9px] text-red-500">{teamErrors.capSection}</span>}
                                </div>
                              </div>

                            </div>
                          </div>

                          {/* ================= DYNAMIC PLAYERS ROSTER ================= */}
                          <div className="space-y-6">
                            <h4 className="text-sm font-bold uppercase tracking-[0.2em] text-zinc-300">
                              Active Roster ({activeSport.size - 1} Additional Members)
                            </h4>

                            <div className="grid grid-cols-1 gap-4">
                              {players.map((player, idx) => {
                                const playerNum = idx + 2;
                                return (
                                  <div
                                    key={idx}
                                    className="p-6 bg-zinc-900/30 border border-zinc-800/80 rounded-2xl flex flex-col gap-4"
                                  >
                                    <div className="flex items-center justify-between border-b border-zinc-800/60 pb-3">
                                      <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest">
                                        Player {playerNum} Details
                                      </span>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                      {/* Player Name */}
                                      <div id={`player-${idx}-name`} className="flex flex-col gap-1.5">
                                        <label className="text-[9px] uppercase tracking-widest text-zinc-500 font-bold">
                                          Full Name
                                        </label>
                                        <input
                                          type="text"
                                          value={player.name}
                                          onChange={(e) => handlePlayerChange(idx, 'name', e.target.value)}
                                          className={`bg-zinc-950 border text-zinc-100 text-xs px-3 py-2.5 rounded-lg focus:outline-none focus:ring-1 ${
                                            teamErrors[`player-${idx}-name`] ? 'border-red-500 focus:ring-red-500' : 'border-zinc-800 focus:ring-blue-500'
                                          }`}
                                          placeholder="Player name"
                                        />
                                        {teamErrors[`player-${idx}-name`] && (
                                          <span className="text-[8px] text-red-500">{teamErrors[`player-${idx}-name`]}</span>
                                        )}
                                      </div>

                                      {/* Player Reg */}
                                      <div id={`player-${idx}-reg`} className="flex flex-col gap-1.5">
                                        <label className="text-[9px] uppercase tracking-widest text-zinc-500 font-bold">
                                          Register No
                                        </label>
                                        <input
                                          type="text"
                                          value={player.reg}
                                          onChange={(e) => handlePlayerChange(idx, 'reg', e.target.value)}
                                          className={`bg-zinc-950 border text-zinc-100 text-xs px-3 py-2.5 rounded-lg focus:outline-none focus:ring-1 ${
                                            teamErrors[`player-${idx}-reg`] ? 'border-red-500 focus:ring-red-500' : 'border-zinc-800 focus:ring-blue-500'
                                          }`}
                                          placeholder="7 digits"
                                          maxLength={7}
                                        />
                                        {teamErrors[`player-${idx}-reg`] && (
                                          <span className="text-[8px] text-red-500">{teamErrors[`player-${idx}-reg`]}</span>
                                        )}
                                      </div>

                                      {/* Player Email */}
                                      <div id={`player-${idx}-email`} className="flex flex-col gap-1.5">
                                        <label className="text-[9px] uppercase tracking-widest text-zinc-500 font-bold">
                                          CHRIST Email
                                        </label>
                                        <input
                                          type="email"
                                          value={player.email}
                                          onChange={(e) => handlePlayerChange(idx, 'email', e.target.value)}
                                          className={`bg-zinc-950 border text-zinc-100 text-xs px-3 py-2.5 rounded-lg focus:outline-none focus:ring-1 ${
                                            teamErrors[`player-${idx}-email`] ? 'border-red-500 focus:ring-red-500' : 'border-zinc-800 focus:ring-blue-500'
                                          }`}
                                          placeholder="name@christuniversity.in"
                                        />
                                        {teamErrors[`player-${idx}-email`] && (
                                          <span className="text-[8px] text-red-500">{teamErrors[`player-${idx}-email`]}</span>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>

                          {/* ================= SUBMISSION CONFIRMATION SUMMARY CARD ================= */}
                          <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-6">
                            <div className="space-y-2">
                              <h4 className="text-sm font-bold uppercase tracking-[0.2em] text-zinc-200">
                                Team Roster Summary Check
                              </h4>
                              <p className="text-xs text-zinc-500 font-light leading-relaxed max-w-md">
                                Confirming {activeSport.name} squad under captain {capName || '[Pending]'}. Roster registration check is currently active.
                              </p>
                              
                              <div className="flex flex-wrap gap-x-6 gap-y-2 pt-2 text-[10px] font-mono tracking-widest text-zinc-400 uppercase">
                                <span>Sport: <b className="text-blue-400">{activeSport.name}</b></span>
                                <span>Captain: <b className="text-zinc-200">{capName || 'Unfilled'}</b></span>
                                <span>Players Entered: <b className="text-zinc-200">{filledPlayersCount} / {activeSport.size}</b></span>
                              </div>
                            </div>

                            <div className="w-full sm:w-auto shrink-0 bg-zinc-950/60 border border-zinc-800/80 px-6 py-4 rounded-2xl text-center">
                              <span className="text-[9px] uppercase tracking-widest text-zinc-500 block">
                                Roster Status
                              </span>
                              <span className={`text-xs font-bold uppercase tracking-wider mt-1 block ${
                                filledPlayersCount === activeSport.size ? 'text-green-500' : 'text-amber-500'
                              }`}>
                                {filledPlayersCount === activeSport.size ? 'Complete' : 'Pending Details'}
                              </span>
                            </div>
                          </div>

                          {/* Checkboxes & Submit */}
                          <div className="space-y-4 pt-4 border-t border-zinc-900">
                            <label className="flex items-start gap-3 text-zinc-400 text-xs cursor-pointer select-none">
                              <input
                                type="checkbox"
                                checked={teamConfirm1}
                                onChange={(e) => setTeamConfirm1(e.target.checked)}
                                className="w-4 h-4 mt-0.5 rounded border-zinc-800 bg-zinc-950 text-blue-600 focus:ring-blue-500 cursor-pointer"
                              />
                              <span>I confirm that the team roster details entered are verified and correct.</span>
                            </label>

                            <label className="flex items-start gap-3 text-zinc-400 text-xs cursor-pointer select-none">
                              <input
                                type="checkbox"
                                checked={teamConfirm2}
                                onChange={(e) => setTeamConfirm2(e.target.checked)}
                                className="w-4 h-4 mt-0.5 rounded border-zinc-800 bg-zinc-950 text-blue-600 focus:ring-blue-500 cursor-pointer"
                              />
                              <span>I agree to abide by the rules of the Pedagogic League and take responsibility as captain.</span>
                            </label>

                            {teamErrors.confirm && (
                              <span className="text-[9px] text-red-500 block">{teamErrors.confirm}</span>
                            )}
                          </div>

                          <button
                            type="submit"
                            className="w-full py-4 bg-blue-600 hover:bg-blue-500 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] text-white text-xs tracking-[0.3em] font-bold uppercase rounded-xl transition-all cursor-pointer"
                          >
                            Submit Team Registration
                          </button>
                        </form>
                      )}
                    </div>
                  )}
                </div>
              )}

            </div>
          )}

        </div>
      </section>

    </div>
  );
}
