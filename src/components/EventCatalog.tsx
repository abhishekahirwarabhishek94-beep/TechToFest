import React, { useState, useMemo } from 'react';
import { FestEvent, CATEGORIES, DATES } from '../data/events';
import { Search, RotateCcw, MapPin, Calendar, Clock, Trophy, Bookmark, BookmarkCheck, ArrowRight, Terminal } from 'lucide-react';

interface EventCatalogProps {
  events: FestEvent[];
  onSelectEventForRegistration: (eventTitle: string) => void;
  bookmarkedIds: number[];
  onToggleBookmark: (eventId: number) => void;
}

export const EventCatalog: React.FC<EventCatalogProps> = ({
  events,
  onSelectEventForRegistration,
  bookmarkedIds,
  onToggleBookmark,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedDay, setSelectedDay] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [failedImages, setFailedImages] = useState<Record<number, boolean>>({});

  const filteredEvents = useMemo(() => {
    return events.filter((ev) => {
      const matchCat = selectedCategory === 'All' || ev.category === selectedCategory;
      const matchDay = selectedDay === 'All' || ev.date === selectedDay;
      const matchSearch =
        searchQuery.trim() === '' ||
        ev.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ev.venue.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ev.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchDay && matchSearch;
    });
  }, [events, selectedCategory, selectedDay, searchQuery]);

  const handleResetFilters = () => {
    setSelectedCategory('All');
    setSelectedDay('All');
    setSearchQuery('');
  };

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

  const getFallbackGradient = (badgeClass: string) => {
    switch (badgeClass) {
      case 'startup':
        return 'from-[#ffb703]/20 via-[#090912] to-[#05050A]';
      case 'tech':
        return 'from-[#39ff14]/20 via-[#090912] to-[#05050A]';
      case 'robo':
        return 'from-[#00f0ff]/20 via-[#090912] to-[#05050A]';
      default:
        return 'from-[#ff007f]/20 via-[#090912] to-[#05050A]';
    }
  };

  return (
    <section id="events" className="py-16 border-t border-[#00f0ff]/15 relative bg-[#05050A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="text-xs font-tech text-[#00f0ff] uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-[#39ff14]" />
              <span>&gt; DATABASE_QUERY // CURATED_MODULES</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-orbitron font-extrabold text-white tracking-tight glitch-hover">
              Event Modules Catalog
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1 max-w-xl font-sans">
              Discover active robotics arenas, startup incubation stages, poster innovation displays, and code sprints.
            </p>
          </div>

          <div className="text-xs font-tech text-[#00f0ff] bg-[#090912] px-3 py-1.5 rounded border border-[#00f0ff]/30 self-start md:self-auto">
            LOADED: <span className="text-[#39ff14] font-bold tabular-nums">{filteredEvents.length}</span> / {events.length} MODULES
          </div>
        </div>

        {/* Multi-Criteria Filters Bar */}
        <div className="bg-[#090912]/90 border border-neutral-800 rounded-lg p-4 mb-8 backdrop-blur-md space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            {/* Search Input */}
            <div className="md:col-span-5 relative">
              <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search modules, venues, keywords..."
                className="w-full pl-9 pr-3 py-2 text-xs font-tech bg-[#05050A] border border-neutral-800 rounded text-white placeholder-neutral-500 focus:outline-none focus:border-[#00f0ff] focus:ring-1 focus:ring-[#00f0ff]"
              />
            </div>

            {/* Category Filter dropdown (matching prompt ID #categoryFilter) */}
            <div className="md:col-span-3">
              <select
                id="categoryFilter"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 text-xs font-tech bg-[#05050A] border border-neutral-800 rounded text-neutral-200 focus:outline-none focus:border-[#00f0ff]"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    Category: {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Day Filter dropdown (matching prompt ID #dayFilter) */}
            <div className="md:col-span-3">
              <select
                id="dayFilter"
                value={selectedDay}
                onChange={(e) => setSelectedDay(e.target.value)}
                className="w-full px-3 py-2 text-xs font-tech bg-[#05050A] border border-neutral-800 rounded text-neutral-200 focus:outline-none focus:border-[#00f0ff]"
              >
                {DATES.map((d) => (
                  <option key={d.value} value={d.value}>
                    Date: {d.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Reset Filters Button (matching prompt ID #resetFilters) */}
            <div className="md:col-span-1 flex justify-end">
              <button
                id="resetFilters"
                onClick={handleResetFilters}
                title="Reset all filters"
                className="w-full md:w-auto p-2 bg-[#05050A] hover:bg-[#00f0ff]/10 text-neutral-300 hover:text-[#00f0ff] rounded border border-neutral-700 hover:border-[#00f0ff]/50 flex items-center justify-center transition-colors text-xs font-tech cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span className="md:hidden ml-2">RESET</span>
              </button>
            </div>
          </div>

          {/* Quick Category Chips for Rapid Cyber Navigation */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
            <span className="text-neutral-500 font-tech text-[11px] mr-1 shrink-0">// DISCIPLINE:</span>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 rounded text-xs font-tech whitespace-nowrap transition-all cursor-pointer shrink-0 ${
                  selectedCategory === cat
                    ? 'bg-[#00f0ff]/20 text-[#00f0ff] border border-[#00f0ff]/60 shadow-[0_0_10px_rgba(0,240,255,0.3)]'
                    : 'bg-[#05050A] text-neutral-400 border border-neutral-800 hover:text-neutral-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Events Grid (matching prompt ID #eventsGrid) */}
        {filteredEvents.length === 0 ? (
          <div className="text-center py-12 px-4 rounded border border-dashed border-[#ffb703]/40 bg-[#ffb703]/5 max-w-2xl mx-auto">
            <p className="terminal-log text-[#ffb703] font-tech text-sm mb-3">
              &gt; ZERO_MODULES_FOUND // ADJUST_FILTERS
            </p>
            <p className="text-xs text-neutral-400 mb-4 font-tech">
              No festival events matched your current category, date, or search parameters.
            </p>
            <button
              onClick={handleResetFilters}
              className="px-4 py-2 bg-[#ffb703]/20 hover:bg-[#ffb703]/30 text-[#ffb703] border border-[#ffb703]/40 rounded text-xs font-tech transition-colors cursor-pointer"
            >
              &gt; RECALIBRATE_ALL_FILTERS
            </button>
          </div>
        ) : (
          <div
            id="eventsGrid"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredEvents.map((ev) => {
              const isBookmarked = bookmarkedIds.includes(ev.id);
              const imageFailed = failedImages[ev.id];

              return (
                <article
                  key={ev.id}
                  className="event-card group bg-[#090912]/80 border border-neutral-800 hover:border-[#00f0ff]/50 rounded-lg overflow-hidden flex flex-col transition-all duration-200 hover:shadow-[0_0_20px_rgba(0,240,255,0.2)]"
                >
                  {/* Card Banner Image with Zero-Broken-Image Fallback */}
                  <div className="relative h-48 w-full bg-[#05050A] overflow-hidden">
                    {!imageFailed ? (
                      <img
                        src={ev.image}
                        alt={ev.title}
                        referrerPolicy="no-referrer"
                        loading="lazy"
                        onError={() => setFailedImages((prev) => ({ ...prev, [ev.id]: true }))}
                        className="card-banner w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-85 group-hover:opacity-100"
                      />
                    ) : (
                      <div className={`w-full h-full bg-gradient-to-br ${getFallbackGradient(ev.badgeClass)} flex flex-col justify-end p-4 border-b border-neutral-800`}>
                        <div className="font-tech text-xs text-neutral-400 uppercase tracking-wider">
                          &gt; MODULE #{ev.id}
                        </div>
                        <div className="font-orbitron font-bold text-white text-base mt-1">
                          {ev.title}
                        </div>
                      </div>
                    )}

                    {/* Gradient Scrim */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#090912] via-[#090912]/30 to-transparent" />

                    {/* Category Label and Bookmark */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                      <span
                        className={`text-[11px] font-tech px-2 py-0.5 rounded border ${getBadgeStyle(
                          ev.badgeClass
                        )} backdrop-blur-md`}
                      >
                        {ev.category}
                      </span>

                      <button
                        onClick={() => onToggleBookmark(ev.id)}
                        title={isBookmarked ? "Remove from my itinerary" : "Save to my itinerary"}
                        className="p-1.5 rounded bg-[#05050A]/80 backdrop-blur-md border border-neutral-700 text-neutral-300 hover:text-[#00f0ff] transition-colors cursor-pointer"
                      >
                        {isBookmarked ? (
                          <BookmarkCheck className="w-4 h-4 text-[#00f0ff]" />
                        ) : (
                          <Bookmark className="w-4 h-4" />
                        )}
                      </button>
                    </div>

                    {/* Parallel Session Indicator */}
                    {ev.isParallel && (
                      <div className="absolute bottom-2 left-3">
                        <span className="text-[10px] font-tech bg-[#ff007f]/20 text-[#ff007f] border border-[#ff007f]/50 px-2 py-0.5 rounded flex items-center gap-1 backdrop-blur-sm shadow-[0_0_10px_rgba(255,0,127,0.3)]">
                          <span>⚡</span> PARALLEL_SLOT (22/11/26)
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Card Body */}
                  <div className="card-body p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="glitch-hover text-lg font-orbitron font-bold text-white tracking-tight mb-2">
                        {ev.title}
                      </h3>

                      <p className="text-xs text-neutral-300 line-clamp-3 leading-relaxed mb-4 font-sans">
                        {ev.description}
                      </p>
                    </div>

                    {/* Meta info details */}
                    <div className="space-y-2 pt-3 border-t border-neutral-800 text-xs text-neutral-400 font-tech">
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-1.5 text-neutral-300">
                          <Calendar className="w-3.5 h-3.5 text-[#00f0ff] shrink-0" />
                          <span>DATE: {ev.date}</span>
                        </span>
                        <span className="flex items-center gap-1.5 text-neutral-300">
                          <Clock className="w-3.5 h-3.5 text-[#00f0ff] shrink-0" />
                          <span>TIME: {ev.time}</span>
                        </span>
                      </div>

                      <div className="flex items-start gap-1.5 text-neutral-300">
                        <MapPin className="w-3.5 h-3.5 text-[#39ff14] shrink-0 mt-0.5" />
                        <span className="truncate">VENUE: {ev.venue}</span>
                      </div>

                      {ev.prizePool && (
                        <div className="flex items-center justify-between pt-1">
                          <span className="flex items-center gap-1 text-[#ffb703]">
                            <Trophy className="w-3 h-3 text-[#ffb703]" />
                            <span>PRIZE: {ev.prizePool}</span>
                          </span>
                          {ev.coordinator && (
                            <span className="text-neutral-500 text-[10px] truncate max-w-[120px]">
                              {ev.coordinator}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Card Action footer */}
                  <div className="p-3 bg-[#05050A] border-t border-neutral-800 flex items-center justify-between">
                    <span className="text-[10px] font-tech text-neutral-500">
                      ID: #{String(ev.id).padStart(2, '0')}
                    </span>
                    <button
                      onClick={() => onSelectEventForRegistration(ev.title)}
                      className="inline-flex items-center gap-1.5 text-xs font-orbitron font-bold text-[#00f0ff] hover:text-[#39ff14] transition-colors cursor-pointer"
                    >
                      <span>REGISTER_NOW</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
