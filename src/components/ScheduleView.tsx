import React, { useState } from 'react';
import { FestEvent } from '../data/events';
import { Clock, MapPin, Zap, Calendar, Terminal } from 'lucide-react';

interface ScheduleViewProps {
  events: FestEvent[];
  onSelectEventForRegistration: (eventTitle: string) => void;
}

export const ScheduleView: React.FC<ScheduleViewProps> = ({
  events,
  onSelectEventForRegistration,
}) => {
  const [activeDayTab, setActiveDayTab] = useState<string>('All');

  const daysList = [
    { key: 'All', label: 'ALL_CYCLES', sub: 'Full Matrix' },
    { key: '20/11/26', label: '20/11/26', sub: 'Posters' },
    { key: '21/11/26', label: '21/11/26', sub: 'Idea Stage' },
    { key: '22/11/26', label: '22/11/26', sub: '⚡ PARALLEL' },
    { key: '23/11/26', label: '23/11/26', sub: 'Models' },
    { key: '24/11/26', label: '24/11/26', sub: 'Robo Walk' },
    { key: '25/11/26', label: '25/11/26', sub: 'Startup' },
    { key: '12/02/26', label: '12/02/26', sub: 'Code Sprint' },
  ];

  const datesToRender =
    activeDayTab === 'All'
      ? ['20/11/26', '21/11/26', '22/11/26', '23/11/26', '24/11/26', '25/11/26', '12/02/26']
      : [activeDayTab];

  const getBadgeStyle = (badgeClass: string) => {
    switch (badgeClass) {
      case 'startup':
        return 'text-[#ffb703] bg-[#ffb703]/10 border-[#ffb703]/40';
      case 'tech':
        return 'text-[#39ff14] bg-[#39ff14]/10 border-[#39ff14]/40';
      case 'robo':
        return 'text-[#00f0ff] bg-[#00f0ff]/10 border-[#00f0ff]/40';
      case 'code':
        return 'text-[#ff007f] bg-[#ff007f]/10 border-[#ff007f]/40';
      default:
        return 'text-neutral-300 bg-neutral-900 border-neutral-700';
    }
  };

  return (
    <section id="schedule" className="py-16 border-t border-[#00f0ff]/15 relative bg-[#05050A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="text-xs font-tech text-[#00f0ff] uppercase tracking-wider mb-1 flex items-center justify-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-[#39ff14]" />
            <span>&gt; CHRONO_FLOW // SCHEDULE_MATRIX</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-orbitron font-extrabold text-white tracking-tight glitch-hover">
            Timeline Schedule & Concurrency Grid
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 mt-2 font-sans">
            Consolidated timeline with unified time-slot anchors and dedicated parallel session containers.
          </p>
        </div>

        {/* Schedule Day Tabs */}
        <div className="schedule-tabs flex items-center justify-center gap-2 flex-wrap mb-10">
          {daysList.map((day) => {
            const isActive = activeDayTab === day.key;
            return (
              <button
                key={day.key}
                data-day={day.key}
                onClick={() => setActiveDayTab(day.key)}
                className={`tab-btn px-3.5 py-2 rounded text-xs font-tech transition-all border cursor-pointer ${
                  isActive
                    ? 'active bg-[#00f0ff]/20 text-[#00f0ff] border-[#00f0ff] shadow-[0_0_12px_rgba(0,240,255,0.4)]'
                    : 'bg-[#090912] text-neutral-400 border-neutral-800 hover:text-neutral-200 hover:border-neutral-700'
                }`}
              >
                <span className="font-bold">{day.label}</span>
                <span className="block text-[10px] text-neutral-400 opacity-80">{day.sub}</span>
              </button>
            );
          })}
        </div>

        {/* Schedule Timeline Container (matching prompt ID #scheduleContainer) */}
        <div id="scheduleContainer" className="schedule-container space-y-8 max-w-5xl mx-auto">
          {datesToRender.map((date) => {
            const dayEvents = events.filter((ev) => ev.date === date);
            if (dayEvents.length === 0) return null;

            // Group events sharing the same timestamp
            const groupedByTime: Record<string, FestEvent[]> = {};
            dayEvents.forEach((ev) => {
              if (!groupedByTime[ev.time]) {
                groupedByTime[ev.time] = [];
              }
              groupedByTime[ev.time].push(ev);
            });

            return (
              <div
                key={date}
                className="day-group bg-[#090912]/80 border border-neutral-800 rounded-lg p-5 sm:p-7 backdrop-blur-sm"
              >
                {/* Day Header */}
                <div className="day-heading flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-800 pb-3 mb-6">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#39ff14]" />
                    <h3 className="font-tech text-sm sm:text-base font-bold text-[#39ff14] tracking-wide">
                      &gt; DATE_LOG // {date} {dayEvents[0]?.displayDate ? `(${dayEvents[0].displayDate})` : ''}
                    </h3>
                  </div>
                  <div className="text-xs font-tech text-neutral-400">
                    {dayEvents.length} ACTIVE_SESSION{dayEvents.length > 1 ? 'S' : ''}
                  </div>
                </div>

                {/* Slots Rows */}
                <div className="space-y-6">
                  {Object.entries(groupedByTime).map(([time, slotEvents]) => {
                    const isConcurrent = slotEvents.length > 1;

                    return (
                      <div
                        key={time}
                        className={`time-slot-row flex flex-col md:flex-row md:items-start gap-4 p-4 rounded border ${
                          isConcurrent
                            ? 'bg-[#05050A] border-[#ff007f]/50 shadow-[0_0_15px_rgba(255,0,127,0.2)]'
                            : 'bg-[#05050A]/70 border-neutral-800'
                        }`}
                      >
                        {/* Time Column Anchor */}
                        <div className="time-label md:w-36 shrink-0 flex md:flex-col items-center md:items-start justify-between md:justify-start gap-1">
                          <div className="flex items-center gap-1.5 font-tech text-sm font-bold text-[#00f0ff]">
                            <Clock className="w-4 h-4 text-[#00f0ff]" />
                            <span>{time}</span>
                          </div>

                          {isConcurrent ? (
                            <span className="inline-flex items-center gap-1 text-[10px] font-tech font-bold text-[#ff007f] bg-[#ff007f]/10 border border-[#ff007f]/40 px-2 py-0.5 rounded mt-1 shadow-[0_0_8px_rgba(255,0,127,0.3)]">
                              <Zap className="w-3 h-3 text-[#ff007f]" />
                              <span>PARALLEL TRACKS</span>
                            </span>
                          ) : (
                            <span className="text-[10px] font-tech text-neutral-400">
                              SOLO TRACK
                            </span>
                          )}
                        </div>

                        {/* Slot Events Grid (Side-by-Side if concurrent) */}
                        <div
                          className={`slot-events-grid flex-1 grid gap-4 ${
                            isConcurrent ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'
                          }`}
                        >
                          {slotEvents.map((ev) => (
                            <div
                              key={ev.id}
                              className={`slot-item p-4 rounded border transition-all flex flex-col justify-between ${
                                isConcurrent
                                  ? 'bg-[#090912] border-neutral-700 hover:border-[#00f0ff]/60 shadow-[0_0_10px_rgba(0,0,0,0.5)]'
                                  : 'bg-[#090912]/60 border-neutral-800 hover:border-neutral-700'
                              }`}
                            >
                              <div>
                                <div className="flex items-center justify-between gap-2 mb-2">
                                  <span
                                    className={`text-[11px] font-tech px-2 py-0.5 rounded border ${getBadgeStyle(
                                      ev.badgeClass
                                    )}`}
                                  >
                                    {ev.category}
                                  </span>

                                  {isConcurrent && (
                                    <span className="conflict-flag text-[10px] font-tech text-[#ff007f] bg-[#ff007f]/15 border border-[#ff007f]/40 px-1.5 py-0.5 rounded flex items-center gap-1">
                                      <span>⚡</span> PARALLEL_SLOT // CHOOSE_TRACK
                                    </span>
                                  )}
                                </div>

                                <h4 className="glitch-hover text-base font-orbitron font-bold text-white tracking-tight mb-1.5">
                                  {ev.title}
                                </h4>

                                <p className="text-xs text-neutral-300 leading-relaxed mb-3 font-sans">
                                  {ev.description}
                                </p>
                              </div>

                              <div className="pt-3 border-t border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-tech">
                                <div className="flex items-center gap-1 text-[#39ff14]">
                                  <MapPin className="w-3.5 h-3.5 shrink-0" />
                                  <span className="truncate">{ev.venue}</span>
                                </div>

                                <button
                                  onClick={() => onSelectEventForRegistration(ev.title)}
                                  className="self-start sm:self-auto text-xs text-[#00f0ff] hover:text-[#39ff14] font-bold font-orbitron inline-flex items-center gap-1 cursor-pointer"
                                >
                                  REGISTER_TRACK →
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
