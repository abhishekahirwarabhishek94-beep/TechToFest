import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Sparkles, ArrowRight, ShieldCheck, Terminal, Cpu, Zap } from 'lucide-react';
import { FEST_METADATA } from '../data/events';

export const Hero: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({ days: 17, hours: 8, minutes: 42, seconds: 15 });

  useEffect(() => {
    const target = new Date('2026-11-20T10:00:00').getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = target - now;
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative pt-10 pb-20 overflow-hidden border-b border-[#00f0ff]/15">
      {/* Ambient Cyberpunk Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#00f0ff]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[450px] h-[300px] bg-[#ff007f]/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto space-y-6">
          {/* Terminal log banner matching user prompt: > INITIALIZING_FEST_PROTOCOL_v3.0 */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm bg-[#05050A] border border-[#00f0ff]/40 text-[#00f0ff] font-tech text-xs tracking-wider shadow-[0_0_12px_rgba(0,240,255,0.2)]">
            <Terminal className="w-3.5 h-3.5 text-[#39ff14] animate-pulse" />
            <span>&gt; {FEST_METADATA.terminalProtocol}</span>
            <span className="text-neutral-500">//</span>
            <span className="text-[#39ff14]">SYSTEM_ONLINE</span>
          </div>

          {/* College Sub-Title */}
          <div className="text-xs sm:text-sm font-tech text-neutral-400 tracking-widest uppercase">
            {FEST_METADATA.college} <span className="text-neutral-600">·</span> ANNUAL NATIONAL TECH SYMPOSIUM
          </div>

          {/* Main Title with Glitch Hover Effect */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-orbitron font-black tracking-tight text-white leading-none">
            <span className="glitch-hover inline-block">TECHTOCHECK</span>{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f0ff] via-[#ff007f] to-[#39ff14] glitch-hover inline-block">
              2026
            </span>
          </h1>

          {/* Explicit Tagline from user prompt */}
          <p className="text-lg sm:text-xl font-orbitron font-medium text-[#00f0ff] max-w-2xl mx-auto leading-snug tracking-wide text-balance">
            &ldquo;{FEST_METADATA.tagline}&rdquo;
          </p>

          <p className="text-xs sm:text-sm text-neutral-300 max-w-2xl mx-auto font-sans font-normal leading-relaxed">
            Welcome to the flagship festival of S.A.T.I. Vidisha from <strong className="text-white font-mono">{FEST_METADATA.dateRange}</strong>. 
            Experience robotics battles, poster innovation sprints, hardware presentation arenas, and startup incubation showcases.
          </p>

          {/* Key metadata banner */}
          <div className="flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-xs text-neutral-300 pt-1 font-tech">
            <div className="flex items-center gap-1.5 text-white">
              <Calendar className="w-4 h-4 text-[#00f0ff]" />
              <span>{FEST_METADATA.dateRange}</span>
            </div>
            <span aria-hidden="true" className="text-neutral-700 hidden sm:inline">|</span>
            <div className="flex items-center gap-1.5 text-white">
              <MapPin className="w-4 h-4 text-[#39ff14]" />
              <span>{FEST_METADATA.college} (M.P.)</span>
            </div>
            <span aria-hidden="true" className="text-neutral-700 hidden sm:inline">|</span>
            <div className="flex items-center gap-1.5 text-white">
              <Zap className="w-4 h-4 text-[#ff007f]" />
              <span>₹2,00,000+ Prize Matrix</span>
            </div>
          </div>

          {/* Primary Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <a
              href="#events"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded bg-[#00f0ff] hover:bg-[#39ff14] text-[#05050A] font-orbitron font-bold text-xs tracking-wider shadow-[0_0_20px_rgba(0,240,255,0.5)] transition-all cursor-pointer"
            >
              <span>EXPLORE_MODULES</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href="#schedule"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded bg-[#090912] hover:bg-[#0e0e1a] text-neutral-200 border border-[#00f0ff]/30 font-orbitron font-semibold text-xs tracking-wider transition-all cursor-pointer hover:border-[#ff007f]/60"
            >
              <Cpu className="w-4 h-4 text-[#ff007f]" />
              <span>VIEW_SCHEDULE_MATRIX</span>
            </a>
          </div>

          {/* Cyberpunk Countdown Strip */}
          <div className="pt-6 max-w-xl mx-auto">
            <div className="bg-[#090912]/90 border border-[#00f0ff]/30 rounded-lg p-4 backdrop-blur-md shadow-[0_0_25px_rgba(0,0,0,0.8)]">
              <div className="text-[10px] font-tech uppercase tracking-widest text-[#00f0ff] mb-2 flex items-center justify-between">
                <span>&gt; COUNTDOWN_TO_TRANSMISSION</span>
                <span className="text-[#39ff14] text-[10px]">T-MINUS</span>
              </div>
              <div className="grid grid-cols-4 gap-2 text-center font-orbitron">
                <div className="bg-[#05050A] rounded p-2.5 border border-[#00f0ff]/20">
                  <div className="text-xl sm:text-2xl font-black text-[#00f0ff] tabular-nums">
                    {String(timeLeft.days).padStart(2, '0')}
                  </div>
                  <div className="text-[9px] font-tech text-neutral-500 uppercase mt-0.5">DAYS</div>
                </div>
                <div className="bg-[#05050A] rounded p-2.5 border border-[#ff007f]/20">
                  <div className="text-xl sm:text-2xl font-black text-[#ff007f] tabular-nums">
                    {String(timeLeft.hours).padStart(2, '0')}
                  </div>
                  <div className="text-[9px] font-tech text-neutral-500 uppercase mt-0.5">HOURS</div>
                </div>
                <div className="bg-[#05050A] rounded p-2.5 border border-[#39ff14]/20">
                  <div className="text-xl sm:text-2xl font-black text-[#39ff14] tabular-nums">
                    {String(timeLeft.minutes).padStart(2, '0')}
                  </div>
                  <div className="text-[9px] font-tech text-neutral-500 uppercase mt-0.5">MINS</div>
                </div>
                <div className="bg-[#05050A] rounded p-2.5 border border-[#ffb703]/20">
                  <div className="text-xl sm:text-2xl font-black text-[#ffb703] tabular-nums">
                    {String(timeLeft.seconds).padStart(2, '0')}
                  </div>
                  <div className="text-[9px] font-tech text-neutral-500 uppercase mt-0.5">SECS</div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="pt-2 grid grid-cols-2 md:grid-cols-4 gap-3 text-left max-w-4xl mx-auto font-tech">
            <div className="p-3 rounded bg-[#090912]/80 border border-neutral-800">
              <div className="text-[11px] text-neutral-400">// COMPETITIONS</div>
              <div className="text-sm font-bold text-white font-orbitron mt-0.5">8 Modules</div>
            </div>
            <div className="p-3 rounded bg-[#090912]/80 border border-neutral-800">
              <div className="text-[11px] text-[#00f0ff]">// CONCURRENCY</div>
              <div className="text-sm font-bold text-[#00f0ff] font-orbitron mt-0.5">Parallel Grid</div>
            </div>
            <div className="p-3 rounded bg-[#090912]/80 border border-neutral-800">
              <div className="text-[11px] text-[#ff007f]">// PASS_GENERATOR</div>
              <div className="text-sm font-bold text-[#ff007f] font-orbitron mt-0.5">Instant Pass</div>
            </div>
            <div className="p-3 rounded bg-[#090912]/80 border border-neutral-800">
              <div className="text-[11px] text-[#39ff14]">// EVAL_RUBRIC</div>
              <div className="text-sm font-bold text-[#39ff14] font-orbitron mt-0.5 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>100/100 Pts</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
