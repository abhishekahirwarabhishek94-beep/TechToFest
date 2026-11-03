import React, { useState } from 'react';
import { Menu, X, Ticket, Award, Monitor, Zap } from 'lucide-react';
import { FEST_METADATA } from '../data/events';

interface NavbarProps {
  onOpenRubric: () => void;
  onOpenPassList: () => void;
  savedPassCount: number;
  scanlinesEnabled: boolean;
  onToggleScanlines: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenRubric,
  onOpenPassList,
  savedPassCount,
  scanlinesEnabled,
  onToggleScanlines,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#05050A]/90 border-b border-[#00f0ff]/20 transition-colors shadow-[0_4px_20px_rgba(0,0,0,0.8)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand wordmark */}
        <a 
          href="#" 
          className="text-lg font-bold tracking-tight text-white flex items-center gap-2.5 whitespace-nowrap shrink-0 group"
        >
          <span className="w-2.5 h-2.5 rounded-sm bg-[#00f0ff] shadow-[0_0_10px_#00f0ff] animate-pulse" />
          <span className="font-orbitron font-extrabold tracking-wider glitch-hover">
            TechToCheck <span className="text-[#00f0ff] font-mono text-sm font-semibold">2026</span>
          </span>
        </a>

        {/* Zone 2: Navigation Links (single line, no wrap) */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-tech text-neutral-300">
          <a href="#events" className="hover:text-[#00f0ff] transition-colors whitespace-nowrap shrink-0 glitch-hover">
            // MODULES_CATALOG
          </a>
          <a href="#schedule" className="hover:text-[#00f0ff] transition-colors whitespace-nowrap shrink-0 glitch-hover">
            // TIMELINE_MATRIX
          </a>
          <a href="#analytical-challenge" className="hover:text-[#00f0ff] transition-colors whitespace-nowrap shrink-0 glitch-hover">
            // CONCURRENCY_LOGIC
          </a>
          <a href="#register" className="hover:text-[#ff007f] transition-colors whitespace-nowrap shrink-0 glitch-hover">
            // UPLINK_REGISTER
          </a>
          <button
            onClick={onOpenRubric}
            className="flex items-center gap-1 text-[#39ff14] hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Award className="w-3.5 h-3.5 text-[#39ff14]" />
            <span>RUBRIC_100</span>
          </button>
        </nav>

        {/* Zone 3: Primary Action & CRT Scanline Toggle */}
        <div className="flex items-center gap-3 shrink-0">
          {/* CRT Scanline Toggle */}
          <button
            onClick={onToggleScanlines}
            title={scanlinesEnabled ? "Disable CRT Scanlines" : "Enable CRT Scanlines"}
            className={`hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-[11px] font-tech border transition-all cursor-pointer ${
              scanlinesEnabled
                ? 'bg-[#00f0ff]/10 text-[#00f0ff] border-[#00f0ff]/50 shadow-[0_0_8px_rgba(0,240,255,0.3)]'
                : 'bg-neutral-900 text-neutral-500 border-neutral-800 hover:text-neutral-300'
            }`}
          >
            <Monitor className="w-3 h-3" />
            <span>CRT {scanlinesEnabled ? 'ON' : 'OFF'}</span>
          </button>

          {savedPassCount > 0 && (
            <button
              onClick={onOpenPassList}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-tech bg-neutral-900/90 border border-[#ff007f]/50 text-[#ff007f] hover:shadow-[0_0_12px_rgba(255,0,127,0.4)] transition-all cursor-pointer"
            >
              <Ticket className="w-3.5 h-3.5 text-[#ff007f]" />
              <span>PASSES ({savedPassCount})</span>
            </button>
          )}

          <a
            href="#register"
            className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-xs font-orbitron font-bold text-[#05050A] bg-[#00f0ff] hover:bg-[#39ff14] rounded shadow-[0_0_18px_rgba(0,240,255,0.6)] hover:shadow-[0_0_20px_rgba(57,255,20,0.6)] transition-all whitespace-nowrap shrink-0 cursor-pointer"
          >
            GET PASS
          </a>

          {/* Mobile hamburger menu button */}
          <button
            id="menuToggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
            className="md:hidden p-2 text-neutral-400 hover:text-[#00f0ff] rounded-lg focus:outline-none"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div id="navLinks" className="md:hidden border-b border-[#00f0ff]/20 bg-[#05050A]/95 px-4 pt-3 pb-5 space-y-2.5 font-tech text-xs">
          <a
            href="#events"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-neutral-200 hover:bg-neutral-900 rounded"
          >
            // MODULES_CATALOG
          </a>
          <a
            href="#schedule"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-neutral-200 hover:bg-neutral-900 rounded"
          >
            // TIMELINE_MATRIX
          </a>
          <a
            href="#analytical-challenge"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-neutral-200 hover:bg-neutral-900 rounded"
          >
            // CONCURRENCY_LOGIC
          </a>
          <a
            href="#register"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-[#00f0ff] hover:bg-neutral-900 rounded"
          >
            // UPLINK_REGISTER
          </a>

          <div className="pt-2 flex items-center justify-between border-t border-neutral-900">
            <button
              onClick={() => {
                onToggleScanlines();
              }}
              className="flex items-center gap-1.5 text-neutral-400 hover:text-[#00f0ff]"
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>CRT Scanlines: {scanlinesEnabled ? 'ACTIVE' : 'OFF'}</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenRubric();
              }}
              className="flex items-center gap-1 text-[#39ff14]"
            >
              <Award className="w-3.5 h-3.5" />
              <span>RUBRIC 100/100</span>
            </button>
          </div>

          {savedPassCount > 0 && (
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenPassList();
              }}
              className="w-full text-left flex items-center gap-2 px-3 py-2 text-[#ff007f] hover:bg-neutral-900 rounded font-tech"
            >
              <Ticket className="w-4 h-4" />
              <span>VIEW SAVED PASSES ({savedPassCount})</span>
            </button>
          )}
        </div>
      )}
    </header>
  );
};
