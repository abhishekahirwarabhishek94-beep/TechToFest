import React, { useState, useEffect } from 'react';
import { FestEvent } from '../data/events';
import { CheckCircle2, AlertCircle, Send, Terminal, Building, User, Mail, Calendar } from 'lucide-react';

export interface RegistrationPayload {
  passId: string;
  fullName: string;
  email: string;
  college: string;
  selectedEvent: string;
  eventDetails?: FestEvent;
  timestamp: string;
}

interface RegistrationFormProps {
  events: FestEvent[];
  preSelectedEventTitle: string;
  onSuccessfulRegistration: (payload: RegistrationPayload) => void;
}

export const RegistrationForm: React.FC<RegistrationFormProps> = ({
  events,
  preSelectedEventTitle,
  onSuccessfulRegistration,
}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedEvent, setSelectedEvent] = useState(preSelectedEventTitle || '');
  const [college, setCollege] = useState('S.A.T.I. Vidisha');

  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [eventError, setEventError] = useState('');
  const [collegeError, setCollegeError] = useState('');

  const [formSuccessMessage, setFormSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    if (preSelectedEventTitle) {
      setSelectedEvent(preSelectedEventTitle);
      const formEl = document.getElementById('registrationForm');
      if (formEl) {
        formEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [preSelectedEventTitle]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setNameError('');
    setEmailError('');
    setEventError('');
    setCollegeError('');
    setFormSuccessMessage(null);

    let valid = true;
    const trimmedName = fullName.trim();
    const trimmedEmail = email.trim();
    const trimmedCollege = college.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    if (trimmedName.length < 2) {
      setNameError('> ERROR: Operator name required (min 2 chars).');
      valid = false;
    }

    if (!emailPattern.test(trimmedEmail)) {
      setEmailError('> ERROR: Invalid email format (e.g., user@satiengg.in).');
      valid = false;
    }

    if (!selectedEvent) {
      setEventError('> ERROR: Target event module must be selected.');
      valid = false;
    }

    if (trimmedCollege.length < 2) {
      setCollegeError('> ERROR: Institute/Branch required.');
      valid = false;
    }

    if (valid) {
      const targetEvent = events.find((ev) => ev.title === selectedEvent);
      const generatedPassId = `TECH26-${Math.floor(1000 + Math.random() * 9000)}-${(targetEvent?.badgeClass || 'MOD').toUpperCase()}`;
      const successText = `> UPLINK_CONFIRMED: ${trimmedName} registered for "${selectedEvent}" at S.A.T.I. Vidisha! Confirmation packet logged for ${trimmedEmail}.`;

      setFormSuccessMessage(successText);

      const payload: RegistrationPayload = {
        passId: generatedPassId,
        fullName: trimmedName,
        email: trimmedEmail,
        college: trimmedCollege,
        selectedEvent: selectedEvent,
        eventDetails: targetEvent,
        timestamp: new Date().toLocaleString(),
      };

      setFullName('');
      setEmail('');
      setCollege('S.A.T.I. Vidisha');

      onSuccessfulRegistration(payload);
    }
  };

  return (
    <section id="register" className="py-16 border-t border-[#00f0ff]/15 relative bg-[#05050A]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="text-xs font-tech text-[#00f0ff] uppercase tracking-wider mb-1 flex items-center justify-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-[#ff007f]" />
            <span>&gt; UPLINK_GATEWAY // ACCREDITATION_TERMINAL</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-orbitron font-extrabold text-white tracking-tight glitch-hover">
            Register for TechToCheck 2026
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 mt-2 font-sans">
            Submit your credentials to generate an instant digital festival pass with verified authentication QR code.
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-[#090912]/90 border border-neutral-800 rounded-lg p-6 sm:p-8 backdrop-blur-md shadow-[0_0_25px_rgba(0,0,0,0.8)]">
          <form id="registrationForm" onSubmit={handleSubmit} noValidate className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Operator Name */}
              <div className="space-y-1.5">
                <label htmlFor="fullName" className="block text-xs font-tech text-neutral-300">
                  // OPERATOR_NAME <span className="text-[#00f0ff]">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    id="fullName"
                    value={fullName}
                    onChange={(e) => {
                      setFullName(e.target.value);
                      if (nameError) setNameError('');
                    }}
                    placeholder="e.g. Abhishek Ahirwar"
                    className="w-full pl-9 pr-3 py-2.5 text-xs font-tech bg-[#05050A] border border-neutral-800 rounded text-white placeholder-neutral-600 focus:outline-none focus:border-[#00f0ff] focus:ring-1 focus:ring-[#00f0ff]"
                  />
                </div>
                {nameError && (
                  <p id="nameError" className="text-xs font-tech text-[#ff007f] flex items-center gap-1 mt-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{nameError}</span>
                  </p>
                )}
              </div>

              {/* Email Address */}
              <div className="space-y-1.5">
                <label htmlFor="email" className="block text-xs font-tech text-neutral-300">
                  // NETWORK_UPLINK_EMAIL <span className="text-[#00f0ff]">*</span>
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (emailError) setEmailError('');
                    }}
                    placeholder="e.g. user@satiengg.in"
                    className="w-full pl-9 pr-3 py-2.5 text-xs font-tech bg-[#05050A] border border-neutral-800 rounded text-white placeholder-neutral-600 focus:outline-none focus:border-[#00f0ff] focus:ring-1 focus:ring-[#00f0ff]"
                  />
                </div>
                {emailError && (
                  <p id="emailError" className="text-xs font-tech text-[#ff007f] flex items-center gap-1 mt-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{emailError}</span>
                  </p>
                )}
              </div>

              {/* College / Institution */}
              <div className="space-y-1.5">
                <label htmlFor="college" className="block text-xs font-tech text-neutral-300">
                  // ACADEMIC_INSTITUTION / BRANCH <span className="text-[#00f0ff]">*</span>
                </label>
                <div className="relative">
                  <Building className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    id="college"
                    value={college}
                    onChange={(e) => {
                      setCollege(e.target.value);
                      if (collegeError) setCollegeError('');
                    }}
                    placeholder="e.g. S.A.T.I. Vidisha (CSE)"
                    className="w-full pl-9 pr-3 py-2.5 text-xs font-tech bg-[#05050A] border border-neutral-800 rounded text-white placeholder-neutral-600 focus:outline-none focus:border-[#00f0ff] focus:ring-1 focus:ring-[#00f0ff]"
                  />
                </div>
                {collegeError && (
                  <p id="collegeError" className="text-xs font-tech text-[#ff007f] flex items-center gap-1 mt-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{collegeError}</span>
                  </p>
                )}
              </div>

              {/* Event Module Selection */}
              <div className="space-y-1.5">
                <label htmlFor="eventSelect" className="block text-xs font-tech text-neutral-300">
                  // TARGET_MODULE <span className="text-[#00f0ff]">*</span>
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <select
                    id="eventSelect"
                    value={selectedEvent}
                    onChange={(e) => {
                      setSelectedEvent(e.target.value);
                      if (eventError) setEventError('');
                    }}
                    className="w-full pl-9 pr-3 py-2.5 text-xs font-tech bg-[#05050A] border border-neutral-800 rounded text-neutral-200 focus:outline-none focus:border-[#00f0ff]"
                  >
                    <option value="">-- SELECT TARGET EVENT MODULE --</option>
                    {events.map((ev) => (
                      <option key={ev.id} value={ev.title}>
                        {ev.title} ({ev.date} @ {ev.venue})
                      </option>
                    ))}
                  </select>
                </div>
                {eventError && (
                  <p id="eventError" className="text-xs font-tech text-[#ff007f] flex items-center gap-1 mt-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{eventError}</span>
                  </p>
                )}
              </div>
            </div>

            {/* Validation Notice & Submit */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-neutral-800">
              <div className="text-xs text-neutral-400 font-tech text-center sm:text-left">
                // ZERO_FEE_ENTRY · INSTANT DIGITAL PASS GENERATOR
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3 rounded bg-[#00f0ff] hover:bg-[#39ff14] text-[#05050A] font-orbitron font-bold text-xs tracking-wider flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(0,240,255,0.4)] transition-all cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>INITIALIZE_UPLINK & GENERATE PASS</span>
              </button>
            </div>
          </form>

          {/* Form Success Message Container (matching prompt ID #formSuccess) */}
          {formSuccessMessage && (
            <div
              id="formSuccess"
              className="mt-6 p-4 rounded bg-[#39ff14]/10 border border-[#39ff14]/50 text-[#39ff14] text-xs font-tech leading-relaxed shadow-[0_0_15px_rgba(57,255,20,0.2)]"
            >
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#39ff14] shrink-0 mt-0.5" />
                <div className="break-all">{formSuccessMessage}</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
