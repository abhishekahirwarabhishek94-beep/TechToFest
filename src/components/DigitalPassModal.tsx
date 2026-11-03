import React from 'react';
import { RegistrationPayload } from './RegistrationForm';
import { X, Printer, Check, ShieldCheck, Calendar, Clock, MapPin, Terminal } from 'lucide-react';
import { FEST_METADATA } from '../data/events';

interface DigitalPassModalProps {
  pass: RegistrationPayload | null;
  onClose: () => void;
}

export const DigitalPassModal: React.FC<DigitalPassModalProps> = ({ pass, onClose }) => {
  const [copied, setCopied] = React.useState(false);

  if (!pass) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleCopyPassId = () => {
    navigator.clipboard.writeText(pass.passId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-lg bg-[#090912] border border-[#00f0ff]/50 rounded-lg shadow-[0_0_40px_rgba(0,240,255,0.25)] overflow-hidden my-8">
        {/* Header action bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-[#05050A]">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#39ff14]" />
            <span className="text-xs font-tech font-bold text-white uppercase tracking-wider">
              &gt; CYBER_ACCREDITATION_PASS // VERIFIED
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Printable Pass Container */}
        <div id="printable-pass-container" className="p-6 bg-gradient-to-b from-[#090912] to-[#05050A] text-white">
          <div className="border border-[#00f0ff]/40 rounded p-6 relative overflow-hidden bg-[#05050A] shadow-[inset_0_0_20px_rgba(0,240,255,0.05)]">
            {/* Top Pass Brand Bar */}
            <div className="flex items-start justify-between border-b border-neutral-800 pb-4 mb-5">
              <div>
                <div className="text-[10px] font-tech text-[#00f0ff] uppercase tracking-wider">
                  {FEST_METADATA.college}
                </div>
                <h3 className="text-xl font-orbitron font-extrabold text-white tracking-tight mt-0.5 glitch-hover">
                  TechToCheck <span className="text-[#00f0ff] font-mono">2026</span>
                </h3>
                <div className="text-[10px] text-neutral-400 font-tech mt-0.5">
                  &ldquo;{FEST_METADATA.tagline}&rdquo;
                </div>
              </div>

              <div className="text-right">
                <span className="inline-block text-[10px] font-tech px-2 py-0.5 rounded bg-[#39ff14]/10 border border-[#39ff14]/50 text-[#39ff14] shadow-[0_0_8px_rgba(57,255,20,0.3)]">
                  // ACCESS_GRANTED
                </span>
                <div className="text-[10px] text-neutral-400 font-tech mt-1">
                  PASS_ID: {pass.passId}
                </div>
              </div>
            </div>

            {/* Participant Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5 text-xs font-tech">
              <div className="space-y-1">
                <span className="text-[10px] text-neutral-500 uppercase">// OPERATOR</span>
                <div className="text-sm font-bold text-white font-orbitron">{pass.fullName}</div>
                <div className="text-neutral-400 truncate">{pass.email}</div>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] text-neutral-500 uppercase">// INSTITUTION</span>
                <div className="text-xs font-semibold text-neutral-200">{pass.college}</div>
                <div className="text-[10px] text-neutral-500">Vidisha, M.P.</div>
              </div>
            </div>

            {/* Event Module Info Box */}
            <div className="p-3.5 rounded bg-[#090912] border border-neutral-800 space-y-2 mb-5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-tech text-[#00f0ff] uppercase">// REGISTERED_TRACK</span>
                {pass.eventDetails?.category && (
                  <span className="text-[10px] font-tech text-[#ff007f]">
                    {pass.eventDetails.category}
                  </span>
                )}
              </div>
              <div className="text-base font-orbitron font-bold text-white tracking-tight">
                {pass.selectedEvent}
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-neutral-800 text-[11px] font-tech text-neutral-300">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#00f0ff] shrink-0" />
                  <span>{pass.eventDetails?.date || '20/11/26'}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#00f0ff] shrink-0" />
                  <span>{pass.eventDetails?.time || '11:00 AM'}</span>
                </div>
                <div className="col-span-2 flex items-center gap-1.5 text-[#39ff14] truncate">
                  <MapPin className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">{pass.eventDetails?.venue || 'SATI Vidisha Campus'}</span>
                </div>
              </div>
            </div>

            {/* Simulated Vector QR & Barcode Section */}
            <div className="flex items-center justify-between pt-4 border-t border-neutral-800 gap-4">
              {/* High-tech QR representation */}
              <div className="w-16 h-16 bg-white p-1 rounded shrink-0 flex flex-col justify-between">
                <div className="flex justify-between">
                  <div className="w-4 h-4 bg-black border border-white" />
                  <div className="w-4 h-4 bg-black border border-white" />
                </div>
                <div className="flex justify-around items-center">
                  <div className="w-1.5 h-1.5 bg-black" />
                  <div className="w-1.5 h-1.5 bg-black" />
                  <div className="w-1.5 h-1.5 bg-black" />
                </div>
                <div className="flex justify-between">
                  <div className="w-4 h-4 bg-black border border-white" />
                  <div className="w-2 h-2 bg-black self-end" />
                </div>
              </div>

              {/* Barcode Lines */}
              <div className="flex-1 flex flex-col items-center">
                <div className="h-9 w-full flex items-center justify-between gap-0.5 px-1 bg-white/5 py-1 rounded">
                  {[3, 1, 2, 4, 1, 3, 2, 1, 4, 2, 1, 3, 2, 4, 1, 2, 3, 1, 2].map((height, i) => (
                    <div
                      key={i}
                      className="bg-neutral-300 w-1 rounded-full opacity-80"
                      style={{ height: `${height * 6 + 10}px` }}
                    />
                  ))}
                </div>
                <div className="text-[9px] font-tech text-neutral-500 tracking-widest mt-1">
                  *{pass.passId}*
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Action Buttons */}
        <div className="px-6 py-4 bg-[#05050A] border-t border-neutral-800 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={handleCopyPassId}
            className="text-xs font-tech text-neutral-400 hover:text-[#00f0ff] flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-[#39ff14]" /> : null}
            <span>{copied ? 'PASS_ID_COPIED' : `COPY_ID: ${pass.passId}`}</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2 rounded bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-tech flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>PRINT_PASS</span>
            </button>

            <button
              onClick={onClose}
              className="px-4 py-2 rounded bg-[#00f0ff] hover:bg-[#39ff14] text-[#05050A] text-xs font-orbitron font-bold transition-all cursor-pointer shadow-[0_0_12px_rgba(0,240,255,0.4)]"
            >
              DONE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
