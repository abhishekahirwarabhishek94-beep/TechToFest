import React, { useState, useEffect } from 'react';
import { EVENTS_DATA, FestEvent } from './data/events';
import { StarfieldCanvas } from './components/StarfieldCanvas';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { EventCatalog } from './components/EventCatalog';
import { ScheduleView } from './components/ScheduleView';
import { AnalyticalChallenge } from './components/AnalyticalChallenge';
import { RegistrationForm, RegistrationPayload } from './components/RegistrationForm';
import { DigitalPassModal } from './components/DigitalPassModal';
import { EvaluationRubricModal } from './components/EvaluationRubricModal';
import { SavedPassesDrawer } from './components/SavedPassesDrawer';
import { Footer } from './components/Footer';

export default function App() {
  const [events] = useState<FestEvent[]>(EVENTS_DATA);
  const [scanlinesEnabled, setScanlinesEnabled] = useState<boolean>(true);

  const [bookmarkedIds, setBookmarkedIds] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem('sati_bookmarked_events');
      return saved ? JSON.parse(saved) : [3, 4]; // Pre-star the parallel tracks
    } catch {
      return [3, 4];
    }
  });

  const [registeredPasses, setRegisteredPasses] = useState<RegistrationPayload[]>(() => {
    try {
      const saved = localStorage.getItem('sati_registered_passes');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [preSelectedEventTitle, setPreSelectedEventTitle] = useState<string>('');
  const [activePassModal, setActivePassModal] = useState<RegistrationPayload | null>(null);
  const [isRubricOpen, setIsRubricOpen] = useState<boolean>(false);
  const [isPassDrawerOpen, setIsPassDrawerOpen] = useState<boolean>(false);

  useEffect(() => {
    try {
      localStorage.setItem('sati_bookmarked_events', JSON.stringify(bookmarkedIds));
    } catch (e) {
      console.error(e);
    }
  }, [bookmarkedIds]);

  useEffect(() => {
    try {
      localStorage.setItem('sati_registered_passes', JSON.stringify(registeredPasses));
    } catch (e) {
      console.error(e);
    }
  }, [registeredPasses]);

  const handleToggleBookmark = (eventId: number) => {
    setBookmarkedIds((prev) =>
      prev.includes(eventId) ? prev.filter((id) => id !== eventId) : [...prev, eventId]
    );
  };

  const handleSelectEventForRegistration = (eventTitle: string) => {
    setPreSelectedEventTitle(eventTitle);
    const regSection = document.getElementById('register');
    if (regSection) {
      regSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSuccessfulRegistration = (payload: RegistrationPayload) => {
    setRegisteredPasses((prev) => [payload, ...prev]);
    setActivePassModal(payload);
  };

  const handleClearPasses = () => {
    setRegisteredPasses([]);
    try {
      localStorage.removeItem('sati_registered_passes');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="min-h-screen bg-[#05050A] text-neutral-100 flex flex-col font-sans relative selection:bg-[#00f0ff]/30 selection:text-[#00f0ff]">
      {/* CRT Scanline Overlay */}
      {scanlinesEnabled && <div className="scanline-overlay pointer-events-none" aria-hidden="true" />}

      {/* Cyber Starfield Particle Canvas */}
      <StarfieldCanvas />

      {/* Cyberpunk Top Bar */}
      <Navbar
        onOpenRubric={() => setIsRubricOpen(true)}
        onOpenPassList={() => setIsPassDrawerOpen(true)}
        savedPassCount={registeredPasses.length}
        scanlinesEnabled={scanlinesEnabled}
        onToggleScanlines={() => setScanlinesEnabled(!scanlinesEnabled)}
      />

      {/* Main Content Area */}
      <main className="flex-1 relative z-10">
        <Hero />

        <EventCatalog
          events={events}
          onSelectEventForRegistration={handleSelectEventForRegistration}
          bookmarkedIds={bookmarkedIds}
          onToggleBookmark={handleToggleBookmark}
        />

        <ScheduleView
          events={events}
          onSelectEventForRegistration={handleSelectEventForRegistration}
        />

        <AnalyticalChallenge />

        <RegistrationForm
          events={events}
          preSelectedEventTitle={preSelectedEventTitle}
          onSuccessfulRegistration={handleSuccessfulRegistration}
        />
      </main>

      {/* Footer */}
      <Footer onOpenRubric={() => setIsRubricOpen(true)} />

      {/* Modals & Overlays */}
      <DigitalPassModal
        pass={activePassModal}
        onClose={() => setActivePassModal(null)}
      />

      <EvaluationRubricModal
        isOpen={isRubricOpen}
        onClose={() => setIsRubricOpen(false)}
      />

      <SavedPassesDrawer
        isOpen={isPassDrawerOpen}
        onClose={() => setIsPassDrawerOpen(false)}
        passes={registeredPasses}
        onSelectPass={(pass) => setActivePassModal(pass)}
        onClearPasses={handleClearPasses}
      />
    </div>
  );
}
