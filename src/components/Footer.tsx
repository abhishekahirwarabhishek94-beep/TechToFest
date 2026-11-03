import React from 'react';
import { Mail, MapPin, ShieldCheck, Terminal } from 'lucide-react';
import { FEST_METADATA } from '../data/events';

interface FooterProps {
  onOpenRubric: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenRubric }) => {
  return (
    <footer className="border-t border-[#00f0ff]/20 bg-[#05050A] text-neutral-400 text-xs font-tech py-12 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand info */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-2 text-white font-bold text-sm tracking-tight font-orbitron">
              <span className="w-2 h-2 rounded bg-[#00f0ff] shadow-[0_0_8px_#00f0ff]" />
              <span>TechToCheck 2026</span>
            </div>
            <p className="text-[#00f0ff] text-xs font-tech">
              &ldquo;{FEST_METADATA.tagline}&rdquo;
            </p>
            <p className="text-neutral-400 text-xs leading-relaxed font-sans">
              Annual National Tech Symposium of {FEST_METADATA.college}. Established in 1960.
            </p>
          </div>

          {/* Quick links */}
          <div className="space-y-2">
            <div className="text-white font-bold uppercase tracking-wider text-[11px] font-orbitron">
              // FAST_NAVIGATION
            </div>
            <ul className="space-y-1.5 text-neutral-400">
              <li>
                <a href="#events" className="hover:text-[#00f0ff] transition-colors">
                  &gt; Event Modules Catalog
                </a>
              </li>
              <li>
                <a href="#schedule" className="hover:text-[#00f0ff] transition-colors">
                  &gt; Chrono Schedule Matrix
                </a>
              </li>
              <li>
                <a href="#analytical-challenge" className="hover:text-[#00f0ff] transition-colors">
                  &gt; Analytical Concurrency Logic
                </a>
              </li>
              <li>
                <a href="#register" className="hover:text-[#ff007f] transition-colors">
                  &gt; Accreditation Registration
                </a>
              </li>
            </ul>
          </div>

          {/* Venue & Coordinates */}
          <div className="space-y-2">
            <div className="text-white font-bold uppercase tracking-wider text-[11px] font-orbitron">
              // PHYSICAL_CAMPUS_GRID
            </div>
            <div className="space-y-1.5 text-neutral-400">
              <div className="flex items-start gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#39ff14] shrink-0 mt-0.5" />
                <span>Civil Lines, Vidisha, Madhya Pradesh – 464001</span>
              </div>
              <div className="text-neutral-400">
                IT Garden · 1st/2nd Floor Left Wing · Seminar Hall · Room 216 · Smart Classroom
              </div>
            </div>
          </div>

          {/* Contact Helpline */}
          <div className="space-y-2">
            <div className="text-white font-bold uppercase tracking-wider text-[11px] font-orbitron">
              // UPLINK_CHANNELS
            </div>
            <div className="space-y-1.5 text-neutral-400">
              <div className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-[#00f0ff] shrink-0" />
                <a href="mailto:fest@satiengg.in" className="hover:text-[#00f0ff]">
                  fest@satiengg.in
                </a>
              </div>
              <div className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-[#00f0ff] shrink-0" />
                <a href="mailto:fest@example.edu" className="hover:text-[#00f0ff]">
                  fest@example.edu
                </a>
              </div>
              <div className="pt-2">
                <button
                  onClick={onOpenRubric}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#090912] border border-[#39ff14]/50 text-[#39ff14] hover:bg-[#39ff14]/10 transition-colors cursor-pointer text-xs"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>VIEW_RUBRIC_100</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom divider */}
        <div className="pt-6 border-t border-neutral-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500 font-tech">
          <div>
            © 2026 {FEST_METADATA.college}. All rights reserved.
          </div>
          <div className="flex items-center gap-1 text-[#00f0ff]">
            <Terminal className="w-3 h-3 text-[#39ff14]" />
            <span>&gt; THEME: CYBERPUNK // NO_ERRORS_VERIFIED</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
