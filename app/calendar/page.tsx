'use client';

import { useState } from 'react';
import { MOCK_CALENDAR, MOCK_CIRCUITS } from '@/lib/mock-data';
import { MockDataBanner } from '@/components/ui/MockDataBanner';
import { Calendar as CalendarIcon, MapPin, Clock, Flag, ChevronRight, CheckCircle2, Radio } from 'lucide-react';
import Link from 'next/link';
import { formatShortDate } from '@/lib/utils';

export default function CalendarPage() {
  const [filter, setFilter] = useState<'ALL' | 'UPCOMING' | 'COMPLETED'>('ALL');

  const filteredRaces = MOCK_CALENDAR.filter((race) => {
    if (filter === 'ALL') return true;
    return race.status === filter;
  });

  return (
    <div className="min-h-screen text-white pb-24">
      <MockDataBanner />

      {/* Cinematic Motorsport Header */}
      <div className="relative border-b border-white/10 py-12 overflow-hidden bg-gradient-to-b from-[#0e1015] via-[#07080a] to-[#07080a]">
        <div className="absolute top-0 right-1/3 w-96 h-48 bg-[#e10600]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#e10600] animate-pulse" />
            <span className="text-xs font-mono font-bold text-[#e10600] uppercase tracking-widest">
              2025 FIA Formula One Season
            </span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-white leading-none">
            Championship Calendar
          </h1>
          <p className="text-sm text-gray-400 mt-3 max-w-2xl font-medium">
            24 Grand Prix destinations, sprint race weekends, session timetables, and race weekend countdowns.
          </p>

          {/* Segmented Filter Pills */}
          <div className="flex items-center gap-2 mt-8 pt-6 border-t border-white/10">
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
        </div>
      </div>

      {/* Race Grid / Timeline */}
      <div className="container mx-auto px-4 py-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRaces.map((race) => {
            const isCompleted = race.status === 'COMPLETED';
            const isLive = race.status === 'LIVE';
            const circuit = MOCK_CIRCUITS[race.circuitId] || { name: race.name, flagEmoji: '🏁', laps: 53 };

            return (
              <Link
                key={race.id}
                href={`/races/${race.id}`}
                className={`group rounded-2xl f1-card-interactive flex flex-col justify-between overflow-hidden border transition-all duration-300 ${
                  isLive
                    ? 'border-[#e10600] shadow-[0_0_25px_rgba(225,6,0,0.3)]'
                    : 'border-white/10 hover:border-[#e10600]/60'
                }`}
              >
                {/* Top Status Blade */}
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
                  {/* Round & Flag Status */}
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
                      <span className="text-xl">{race.circuit.flagEmoji}</span>
                    </div>
                  </div>

                  {/* Race Name & Circuit */}
                  <h3 className="text-2xl font-black text-white tracking-tight leading-snug group-hover:text-[#e10600] transition-colors mb-2">
                    {race.name}
                  </h3>

                  <p className="text-xs text-gray-400 flex items-center gap-1.5 mb-6">
                    <MapPin size={12} className="text-[#00d2be] shrink-0" />
                    <span>{circuit.name}, {race.country}</span>
                  </p>

                  {/* Date & Track Specs Card */}
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
                </div>

                {/* Footer Action */}
                <div className="px-6 py-3 bg-black/40 border-t border-white/5 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-gray-400 group-hover:text-white transition">
                  <span>Race Hub & Timetable</span>
                  <ChevronRight size={14} className="text-[#e10600] transform group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}