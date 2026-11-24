'use client';

import { useState } from 'react';
import { MOCK_CALENDAR, MOCK_CIRCUITS } from '@/lib/mock-data';
import { PageHeader } from '@/components/layout/PageHeader';
import { Calendar as CalendarIcon, MapPin, Flag, ChevronRight, CheckCircle2, Radio } from 'lucide-react';
import Link from 'next/link';
import { formatShortDate } from '@/lib/utils';

function getMonthLabel(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
}

export default function CalendarPage() {
  const [filter, setFilter] = useState<'ALL' | 'UPCOMING' | 'COMPLETED'>('ALL');

  const filteredRaces = MOCK_CALENDAR.filter((race) => {
    if (filter === 'ALL') return true;
    return race.status === filter;
  });

  const grouped = filteredRaces.reduce<Record<string, typeof filteredRaces>>((acc, race) => {
    const key = getMonthLabel(race.startTime);
    if (!acc[key]) acc[key] = [];
    acc[key].push(race);
    return acc;
  }, {});

  return (
    <div className="min-h-screen text-white pb-24">
      <PageHeader
        label="2025 FIA Formula One Season"
        title="Championship Calendar"
        description="24 Grand Prix destinations, sprint weekends, session timetables, and countdowns."
      >
        <div className="flex items-center gap-2">
          {(['ALL', 'UPCOMING', 'COMPLETED'] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setFilter(mode)}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all border ${
                filter === mode
                  ? 'bg-[#e10600] text-white border-[#e10600] shadow-[0_0_15px_rgba(225,6,0,0.5)]'
                  : 'bg-[#12151d] text-gray-400 border-white/5 hover:text-white hover:border-white/20'
              }`}
            >
              {mode === 'ALL' ? 'All 24 Races' : mode}
            </button>
          ))}
        </div>
      </PageHeader>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 space-y-10">
        {Object.entries(grouped).map(([month, races]) => (
          <section key={month}>
            <div className="sticky top-16 z-10 py-3 -mx-4 px-4 md:-mx-8 md:px-8 bg-[#07080a]/90 backdrop-blur-md border-b border-white/5 mb-6">
              <h2 className="text-sm font-black uppercase tracking-widest text-[#a1a8b3] flex items-center gap-2">
                <CalendarIcon size={14} className="text-[#e10600]" />
                {month}
                <span className="text-[10px] font-mono text-gray-500 ml-1">
                  {races.length} {races.length === 1 ? 'RACE' : 'RACES'}
                </span>
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {races.map((race, i) => {
                const isCompleted = race.status === 'COMPLETED';
                const isLive = race.status === 'LIVE';
                const circuit = MOCK_CIRCUITS[race.circuitId] || { name: race.name, flagEmoji: '🏁', laps: 53 };

                return (
                  <Link
                    key={race.id}
                    href={`/races/${race.id}`}
                    className={`group rounded-2xl f1-card-interactive flex flex-col justify-between overflow-hidden border transition-all duration-300 animate-fade-up ${
                      isLive
                        ? 'border-[#e10600] shadow-[0_0_25px_rgba(225,6,0,0.3)]'
                        : 'border-white/10 hover:border-[#e10600]/60'
                    }`}
                    style={{ animationDelay: `${i * 60}ms` }}
                  >
                    <div
                      className={`h-1.5 w-full ${
                        isLive
                          ? 'bg-[#e10600] animate-pulse'
                          : isCompleted
                            ? 'bg-emerald-500/70'
                            : 'bg-white/20'
                      }`}
                    />

                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <span className="px-2.5 py-1 rounded-lg bg-black/60 border border-white/10 font-mono text-xs font-black text-white">
                          ROUND {race.round}
                        </span>

                        <div className="flex items-center gap-1.5">
                          {isLive && (
                            <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#e10600]/20 text-[#ff1801] border border-[#e10600]/50 text-[10px] font-black uppercase font-mono tracking-wider animate-pulse">
                              <Radio size={10} />
                              LIVE NOW
                            </span>
                          )}
                          {isCompleted && (
                            <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold uppercase font-mono">
                              <CheckCircle2 size={11} />
                              FINAL
                            </span>
                          )}
                          <span className="text-xl">{race.flagEmoji}</span>
                        </div>
                      </div>

                      <h3 className="text-2xl font-black text-white tracking-tight leading-snug group-hover:text-[#e10600] transition-colors mb-2">
                        {race.name}
                      </h3>

                      <p className="text-xs text-gray-400 flex items-center gap-1.5 mb-6">
                        <MapPin size={12} className="text-[#00d2be] shrink-0" />
                        <span>{circuit.name}, {race.country}</span>
                      </p>

                      <div className="bg-black/40 border border-white/5 rounded-xl p-3 grid grid-cols-2 gap-3 text-xs font-mono">
                        <div>
                          <div className="text-[10px] text-gray-400 uppercase font-bold font-sans flex items-center gap-1">
                            <CalendarIcon size={10} className="text-gray-400" />
                            <span>Date</span>
                          </div>
                          <div className="text-white font-bold mt-0.5">
                            {formatShortDate(race.startTime)}
                          </div>
                        </div>
                        <div>
                          <div className="text-[10px] text-gray-400 uppercase font-bold font-sans flex items-center gap-1">
                            <Flag size={10} className="text-gray-400" />
                            <span>Laps</span>
                          </div>
                          <div className="text-[#00d2be] font-bold mt-0.5">
                            {circuit.laps} LAPS
                          </div>
                        </div>
                      </div>

                      {isCompleted && race.winner && (
                        <div className="mt-3 flex items-center gap-2 text-xs text-gray-400">
                          <span className="text-yellow-400">🏆</span>
                          <span className="font-bold text-white">{race.winner}</span>
                        </div>
                      )}
                    </div>

                    <div className="px-6 py-3 bg-black/40 border-t border-white/5 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-gray-400 group-hover:text-white transition">
                      <span>Race Hub & Timetable</span>
                      <ChevronRight size={14} className="text-[#e10600] transform group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
