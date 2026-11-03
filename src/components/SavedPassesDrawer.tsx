import React from 'react';
import { RegistrationPayload } from './RegistrationForm';
import { X, Ticket, Trash2 } from 'lucide-react';

interface SavedPassesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  passes: RegistrationPayload[];
  onSelectPass: (pass: RegistrationPayload) => void;
  onClearPasses: () => void;
}

export const SavedPassesDrawer: React.FC<SavedPassesDrawerProps> = ({
  isOpen,
  onClose,
  passes,
  onSelectPass,
  onClearPasses,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm">
      <div className="w-full max-w-md bg-[#090912] border-l border-[#00f0ff]/30 h-full flex flex-col shadow-2xl">
        {/* Header */}
        <div className="p-5 border-b border-neutral-800 flex items-center justify-between bg-[#05050A]">
          <div className="flex items-center gap-2">
            <Ticket className="w-4 h-4 text-[#00f0ff]" />
            <h3 className="text-sm font-orbitron font-bold text-white tracking-tight">
              // MY_FESTIVAL_PASSES ({passes.length})
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* List of passes */}
        <div className="p-5 flex-1 overflow-y-auto space-y-4">
          {passes.length === 0 ? (
            <div className="text-center py-16 text-neutral-500 font-tech text-xs">
              &gt; NO_PASSES_LOGGED_YET
              <p className="mt-2 text-neutral-400 font-sans">
                Register for any event module to generate an instant digital pass.
              </p>
            </div>
          ) : (
            passes.map((pass, idx) => (
              <div
                key={pass.passId || idx}
                className="p-4 rounded bg-[#05050A] border border-neutral-800 hover:border-[#00f0ff]/50 transition-all space-y-2.5 cursor-pointer group shadow-[0_0_12px_rgba(0,0,0,0.5)]"
                onClick={() => {
                  onSelectPass(pass);
                  onClose();
                }}
              >
                <div className="flex items-center justify-between text-xs font-tech">
                  <span className="text-[#00f0ff] font-bold">{pass.passId}</span>
                  <span className="text-[10px] text-neutral-500">{pass.timestamp}</span>
                </div>

                <div className="text-sm font-orbitron font-bold text-white group-hover:text-[#00f0ff] transition-colors">
                  {pass.selectedEvent}
                </div>

                <div className="text-xs text-neutral-400 font-tech">
                  {pass.fullName} · {pass.college}
                </div>

                <div className="pt-2 border-t border-neutral-900 flex items-center justify-between text-[11px] text-neutral-500 font-tech">
                  <span>Click to view pass</span>
                  <span className="text-[#00f0ff]">VIEW_PASS →</span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer footer */}
        {passes.length > 0 && (
          <div className="p-4 border-t border-neutral-800 bg-[#05050A] flex items-center justify-between">
            <button
              onClick={onClearPasses}
              className="text-xs font-tech text-neutral-400 hover:text-[#ff007f] flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>CLEAR_SAVED_PASSES</span>
            </button>

            <button
              onClick={onClose}
              className="px-4 py-2 rounded bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-tech transition-colors cursor-pointer"
            >
              CLOSE
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
