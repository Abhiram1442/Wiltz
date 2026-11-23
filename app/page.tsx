'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  MOCK_LIVE_RACE,
  MOCK_DRIVER_STANDINGS,
  MOCK_CONSTRUCTOR_STANDINGS,
  MOCK_DRIVERS,
  MOCK_TEAMS,
  MOCK_CALENDAR,
  MOCK_CIRCUITS,
} from '@/lib/mock-data';
import { MOCK_NEWS_ARTICLES } from '@/lib/mock-news';
import { MockDataBanner } from '@/components/ui/MockDataBanner';
import { ThreeF1CarHero } from '@/components/hero/ThreeF1CarHero';
import {
  Radio,
  ChevronRight,
  Trophy,
  Zap,
  Calendar,
  Flag,
  ArrowRight,
  Gauge,
  Activity,
  Compass,
  ArrowUpRight,
  Shield,
  Clock,
} from 'lucide-react';
import { AnimatedDriverCard } from '@/components/cards/AnimatedDriverCard';
import { ConstructorCard } from '@/components/cards/ConstructorCard';
import { CircuitCard } from '@/components/cards/CircuitCard';

export default function HomePage() {
  const liveData = MOCK_LIVE_RACE;
  const top4Drivers = MOCK_DRIVER_STANDINGS.slice(0, 4);
  const featuredTeams = [MOCK_TEAMS['MCL'], MOCK_TEAMS['FER'], MOCK_TEAMS['RBR'], MOCK_TEAMS['MER']].filter(Boolean);
  const silverstoneCircuit = MOCK_CIRCUITS['silverstone'] || MOCK_CIRCUITS['monza'];
  const calendarPreview = MOCK_CALENDAR.slice(0, 4);

  return (
    <div className="min-h-screen text-[#F4F6F8] bg-[#0D0F14] pb-24 selection:bg-[#E10600] selection:text-white">
      <MockDataBanner />

      {/* ── SECTION 1: FULL-SCREEN CINEMATIC 3D F1 HERO (WILTZ ARCHETYPE) ── */}
      <section className="relative min-h-[760px] bg-[#08090C] overflow-hidden border-b border-[#262B38] flex items-center">
        {/* Subtle Carbon Grid Backdrop */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(to right, #262B38 1px, transparent 1px), linear-gradient(to bottom, #262B38 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />

        {/* Dramatic Radial Studio Spotlight */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(circle at 65% 48%, rgba(225, 6, 0, 0.16) 0%, rgba(13, 15, 20, 0.85) 55%, #08090C 100%)',
          }}
        />

        {/* Telemetry Scanline Sweep */}
        <div
          className="absolute inset-x-0 h-32 pointer-events-none animate-track-beam"
          style={{
            background: 'linear-gradient(to bottom, transparent, rgba(225,6,0,0.08), transparent)',
          }}
        />

        {/* Interactive Three.js 3D F1 Car Canvas */}
        <div className="absolute inset-0 w-full h-full">
          <ThreeF1CarHero />
        </div>

        {/* Hero Editorial Overlay Content */}
        <div className="relative z-10 max-w-7xl mx-auto w-full px-4 md:px-8 py-16 pointer-events-none">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-6 flex flex-col gap-5 pointer-events-auto bg-[#08090C]/85 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-[#262B38]/80 shadow-2xl">
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E10600] text-white font-mono text-[11px] font-black uppercase tracking-wider shadow-[0_0_15px_rgba(225,6,0,0.4)]">
                  <span>2025 FIA World Championship</span>
                </span>
                <span className="font-mono text-xs text-[#A1A8B3] tabular-nums font-bold">
                  24 ROUNDS
                </span>
              </div>

              <h1 className="text-4xl sm:text-6xl xl:text-7xl font-black uppercase tracking-tight text-white leading-none">
                Beyond The Apex
              </h1>

              <p className="text-base sm:text-lg text-[#A1A8B3] max-w-lg leading-relaxed font-normal">
                Command the pit wall. Explore interactive 3D aerodynamics, verified 2025 FIA championship telemetry, circuit dossiers, and constructor engineering in real time.
              </p>

              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <Link
                  href="/live"
                  className="inline-flex items-center justify-center gap-2.5 bg-[#E10600] text-white px-6 py-3.5 rounded-xl font-mono text-xs font-black uppercase tracking-wider transition-all duration-200 hover:bg-[#ff1801] hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(225,6,0,0.5)]"
                >
                  <Radio size={16} className="animate-pulse" />
                  <span>Open Live Board</span>
                </Link>

                <Link
                  href="/calendar"
                  className="inline-flex items-center justify-center gap-2 bg-[#1B1F29]/90 backdrop-blur-md text-white border border-[#262B38] px-6 py-3.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider transition-all duration-200 hover:bg-[#242936] hover:border-white/20"
                >
                  <Calendar size={15} className="text-[#A1A8B3]" />
                  <span>2025 Race Calendar</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 2: FEATURED GRAND PRIX (SILVERSTONE DOSSIER) ── */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-16 border-b border-[#262B38]">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#FF5540] flex items-center gap-1.5">
              <Compass size={14} />
              <span>Featured Grand Prix</span>
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white mt-1">
              {silverstoneCircuit.name} — {silverstoneCircuit.country}
            </h2>
          </div>
          <Link
            href="/circuits"
            className="inline-flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-wider text-white hover:text-[#FF5540] transition-colors"
          >
            <span>Circuit Dossier</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="relative rounded-2xl overflow-hidden border border-[#262B38] bg-[#14171F] group">
          <img
            src="https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1920&q=80"
            alt="Silverstone Formula 1 Circuit under dramatic floodlights"
            className="w-full h-[420px] object-cover group-hover:scale-102 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#08090C] via-[#08090C]/75 to-transparent" />
          <div className="relative md:absolute md:inset-x-0 md:bottom-0 p-6 md:p-8 grid grid-cols-2 md:grid-cols-5 gap-6 items-end bg-[#08090C]/90 md:bg-transparent">
            <div>
              <span className="font-mono text-[10px] uppercase text-[#A1A8B3] font-bold">Circuit Length</span>
              <p className="font-mono text-xl font-black text-white tabular-nums mt-1">{silverstoneCircuit.trackLength} km</p>
            </div>
            <div>
              <span className="font-mono text-[10px] uppercase text-[#A1A8B3] font-bold">Race Laps</span>
              <p className="font-mono text-xl font-black text-white tabular-nums mt-1">{silverstoneCircuit.laps} Laps</p>
            </div>
            <div>
              <span className="font-mono text-[10px] uppercase text-[#A1A8B3] font-bold">Corners</span>
              <p className="font-mono text-xl font-black text-white tabular-nums mt-1">18 Turns</p>
            </div>
            <div>
              <span className="font-mono text-[10px] uppercase text-[#A1A8B3] font-bold">Race Distance</span>
              <p className="font-mono text-xl font-black text-white tabular-nums mt-1">{silverstoneCircuit.raceDistance} km</p>
            </div>
            <div className="col-span-2 md:col-span-1">
              <span className="font-mono text-[10px] uppercase text-[#A1A8B3] font-bold">
                Lap Record ({silverstoneCircuit.lapRecordHolder}, {silverstoneCircuit.lapRecordYear})
              </span>
              <p className="font-mono text-xl font-black text-[#FF5540] tabular-nums mt-1">
                {silverstoneCircuit.lapRecord}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 3: FEATURED DRIVERS (2025 GRID CONTENDERS) ── */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-16 border-b border-[#262B38]">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#FF5540] flex items-center gap-1.5">
              <Trophy size={14} />
              <span>2025 FIA Driver Lineup</span>
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white mt-1">
              Championship Contenders
            </h2>
          </div>
          <Link
            href="/drivers"
            className="inline-flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-wider text-white hover:text-[#FF5540] transition-colors"
          >
            <span>Full 2025 Grid</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {top4Drivers.map((s) => {
            const driver = MOCK_DRIVERS[s.driverId];
            const team = MOCK_TEAMS[s.teamId];
            if (!driver) return null;

            return (
              <AnimatedDriverCard
                key={driver.id}
                driver={driver}
                team={team}
                rank={s.position}
                points={s.points}
              />
            );
          })}
        </div>
      </section>

      {/* ── SECTION 4: CONSTRUCTOR HIGHLIGHTS ── */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-16 border-b border-[#262B38]">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#FF5540] flex items-center gap-1.5">
              <Shield size={14} />
              <span>Constructors Portal</span>
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white mt-1">
              2025 Engineering Works
            </h2>
          </div>
          <Link
            href="/teams"
            className="inline-flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-wider text-white hover:text-[#FF5540] transition-colors"
          >
            <span>All 10 Constructors</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {featuredTeams.slice(0, 2).map((team) => {
            const teamDrivers = team.drivers.map((id) => MOCK_DRIVERS[id]).filter(Boolean);
            return (
              <article
                key={team.id}
                className="bg-[#14171F] border border-[#262B38] rounded-2xl overflow-hidden flex flex-col group hover:border-[#E10600]/50 transition-all duration-300"
              >
                <div className="h-64 relative overflow-hidden bg-[#08090C] flex items-center justify-center p-6">
                  {/* Subtle livery watermark */}
                  {team.logoUrl && (
                    <img
                      src={team.logoUrl}
                      alt={team.name}
                      className="absolute h-32 w-auto object-contain opacity-10 group-hover:opacity-20 transition-opacity"
                    />
                  )}
                  <img
                    src={team.carImageUrl || team.logoUrl}
                    alt={team.name}
                    className="max-h-36 max-w-[90%] object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.9)] transform group-hover:scale-105 group-hover:translate-x-2 transition-all duration-500"
                  />
                  <div className="absolute top-4 left-4 px-2.5 py-1 rounded bg-black/60 border border-white/10 text-[10px] font-mono text-white uppercase font-bold">
                    HQ: {team.base}
                  </div>
                </div>

                <div className="p-6 flex items-center justify-between gap-4 border-t border-[#262B38] bg-[#1B1F29]/60">
                  <div>
                    <h3 className="text-2xl font-black text-white group-hover:text-[#E10600] transition-colors">
                      {team.name}
                    </h3>
                    <p className="text-xs text-[#A1A8B3] mt-1 font-mono">
                      {teamDrivers.map((d) => `${d.name} (#${d.number})`).join(' · ')} &bull; {team.powerUnit}
                    </p>
                  </div>
                  <span className="font-mono text-xl font-black text-white shrink-0 bg-black/40 px-3 py-1 rounded-lg border border-white/10">
                    {team.chassis}
                  </span>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* ── SECTION 5: CALENDAR PREVIEW & TELEMETRY ROUNDS ── */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#FF5540] flex items-center gap-1.5">
              <Clock size={14} />
              <span>2025 FIA Calendar</span>
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white mt-1">
              Key Championship Rounds
            </h2>
          </div>
          <Link
            href="/calendar"
            className="inline-flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-wider text-white hover:text-[#FF5540] transition-colors"
          >
            <span>Full 24-Race Schedule</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="bg-[#14171F] border border-[#262B38] rounded-2xl divide-y divide-[#262B38] overflow-hidden">
          {calendarPreview.map((race) => {
            const circuit = MOCK_CIRCUITS[race.circuitId] || { name: race.name };
            return (
              <div
                key={race.id}
                className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-[#1B1F29]/60 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <span className="font-mono text-sm font-black text-[#FF5540] bg-black/40 px-2.5 py-1 rounded-lg border border-white/10">
                    R{race.round.toString().padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="text-lg font-black text-white">{race.name}</h3>
                    <p className="text-xs text-[#A1A8B3] font-mono mt-0.5">
                      {circuit.name} &bull; {race.country}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 self-end sm:self-center">
                  <span className="font-mono text-xs text-white bg-[#08090C] px-3 py-1.5 rounded-lg border border-white/5">
                    {new Date(race.startTime).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).toUpperCase()}
                  </span>
                  <Link
                    href={`/races/${race.id}`}
                    className="p-2 rounded-lg bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition"
                  >
                    <ArrowUpRight size={16} />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}