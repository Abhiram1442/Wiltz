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
import { formatCountdown } from '@/lib/utils';
import { Radio, ChevronRight, Trophy, Zap, Calendar, Flag, ArrowRight, Gauge, Activity, Compass } from 'lucide-react';
import { AnimatedDriverCard } from '@/components/cards/AnimatedDriverCard';
import { ConstructorCard } from '@/components/cards/ConstructorCard';

export default function HomePage() {
  const liveData = MOCK_LIVE_RACE;
  const leaderPos = liveData.positions[0];
  const leader = MOCK_DRIVERS[leaderPos.driverId];
  const leaderTeam = MOCK_TEAMS[leader?.teamId ?? ''];

  const nextRace = MOCK_CALENDAR.find(r => r.status === 'UPCOMING') || MOCK_CALENDAR[16];
  const nextCircuit = MOCK_CIRCUITS[nextRace?.circuitId ?? ''] || MOCK_CIRCUITS['monza'];

  const [countdown, setCountdown] = useState('');
  useEffect(() => {
    if (!nextRace) return;
    const update = () => setCountdown(formatCountdown(nextRace.startTime));
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, [nextRace]);

  const top3Drivers = MOCK_DRIVER_STANDINGS.slice(0, 3);
  const top3Teams = MOCK_CONSTRUCTOR_STANDINGS.slice(0, 3);

  return (
    <div className="min-h-screen text-white pb-24">
      <MockDataBanner />

      {/* ── 1. CINEMATIC BROADCAST HERO ── */}
      <section className="relative min-h-[560px] border-b border-white/10 overflow-hidden flex items-center bg-gradient-to-b from-[#0e1015] via-[#07080a] to-[#07080a]">
        {/* Background Motorsport Visual Atmosphere */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-25 mix-blend-luminosity scale-105 pointer-events-none"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1920&q=80")',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#07080a] via-[#07080a]/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#07080a] via-[#07080a]/90 to-transparent" />

        {/* Ambient Velocity Light Glows */}
        <div className="absolute -top-24 right-1/4 w-[500px] h-[500px] bg-[#e10600]/15 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/2 -left-24 w-[400px] h-[400px] bg-[#00d2be]/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative container mx-auto px-4 py-16">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            {/* Left Telemetry Banner & Action */}
            <div className="lg:col-span-7">
              {/* Live Session Alert Badge */}
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#e10600]/20 border border-[#e10600]/40 text-[#ff1801] text-xs font-black uppercase tracking-widest mb-6 shadow-[0_0_20px_rgba(225,6,0,0.3)]">
                <span className="w-2 h-2 rounded-full bg-[#e10600] animate-ping" />
                <span>LIVE GRAND PRIX &bull; LAP {liveData.race.currentLap} / {liveData.race.totalLaps}</span>
              </div>

              <h1 className="text-4xl sm:text-6xl xl:text-7xl font-black uppercase tracking-tight text-white leading-none mb-4">
                {liveData.race.name}
              </h1>

              <p className="text-base sm:text-lg text-gray-400 font-medium max-w-xl mb-8 leading-relaxed">
                Autodromo Nazionale Monza &bull; Round {liveData.race.round}. High-velocity telemetry stream, real-time car tracking, and sector splits.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href="/live"
                  className="flex items-center gap-2.5 px-6 py-4 bg-[#e10600] hover:bg-[#ff1801] text-white text-xs font-black uppercase tracking-wider rounded-xl transition shadow-[0_0_25px_rgba(225,6,0,0.5)] hover:scale-105 duration-200"
                >
                  <Radio size={16} className="animate-pulse" />
                  <span>Launch Live Telemetry & Track</span>
                </Link>

                <Link
                  href="/calendar"
                  className="flex items-center gap-2 px-5 py-4 bg-[#141720] hover:bg-white/10 text-white text-xs font-bold uppercase tracking-wider rounded-xl border border-white/10 transition"
                >
                  <Calendar size={15} className="text-gray-400" />
                  <span>2025 Race Calendar</span>
                </Link>
              </div>
            </div>

            {/* Right Telemetry Spotlight Pod */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl f1-glass-panel p-6 border border-white/10 relative overflow-hidden">
                <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-3">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-gray-400 uppercase">
                    <Activity size={14} className="text-[#00d2be]" />
                    <span>Current Race Leader</span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-black/60 text-[#00d2be] font-mono text-xs font-black border border-white/10">
                    P1
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  {leader?.imageUrl && (
                    <img
                      src={leader.imageUrl}
                      alt={leader.name}
                      className="w-20 h-20 rounded-2xl object-cover bg-white/5 border border-white/10 drop-shadow-lg"
                    />
                  )}
                  <div>
                    <div className="text-xs font-mono font-bold text-[#e10600] uppercase tracking-wider">
                      #{leader?.number} &bull; {leader?.abbreviation}
                    </div>
                    <h3 className="text-2xl font-black text-white leading-tight">
                      {leader?.name}
                    </h3>
                    <div className="text-xs text-gray-400 mt-1">
                      {leaderTeam?.name} &bull; Gap: <span className="font-mono text-white font-bold">INTERVAL</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 mt-5 pt-4 border-t border-white/5">
                  <div className="bg-black/40 rounded-xl p-2.5 border border-white/5">
                    <div className="text-[10px] text-gray-400 uppercase font-bold">Fastest Lap</div>
                    <div className="text-xs font-mono font-black text-[#b388ff] mt-0.5">
                      {liveData.fastestLap.lapTime}
                    </div>
                  </div>
                  <div className="bg-black/40 rounded-xl p-2.5 border border-white/5">
                    <div className="text-[10px] text-gray-400 uppercase font-bold">Track Status</div>
                    <div className="text-xs font-mono font-black text-[#00d084] mt-0.5 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00d084] animate-pulse" />
                      <span>{liveData.race.raceStatus}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. NEXT GRAND PRIX COUNTDOWN CHRONOGRAPH ── */}
      <div className="container mx-auto px-4 -mt-6 relative z-20">
        <div className="rounded-2xl bg-gradient-to-r from-[#141720] via-[#10131b] to-[#141720] border border-white/10 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="grid lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-5">
              <span className="text-xs font-mono font-bold text-[#e10600] uppercase tracking-widest block mb-1">
                Upcoming Round {nextRace.round}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white">{nextRace.name}</h2>
              <p className="text-xs text-gray-400 mt-1 flex items-center gap-2">
                <span>{nextCircuit?.name}</span>
                <span>&bull;</span>
                <span className="text-gray-300">{nextRace.country}</span>
              </p>
            </div>

            <div className="lg:col-span-7 flex flex-wrap items-center justify-between lg:justify-end gap-6">
              <div className="bg-black/50 border border-white/10 px-5 py-3 rounded-xl flex items-center gap-3">
                <Calendar size={18} className="text-[#00d2be]" />
                <div className="text-left font-mono">
                  <div className="text-[10px] text-gray-400 uppercase font-bold">Session Countdown</div>
                  <div className="text-base sm:text-lg font-black text-[#00d2be] tracking-wider">
                    {countdown || 'Calculating...'}
                  </div>
                </div>
              </div>

              <Link
                href={`/races/${nextRace.id}`}
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white/10 hover:bg-[#e10600] text-white text-xs font-bold uppercase tracking-wider transition border border-white/10"
              >
                <span>Race Schedule</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── 3. WORLD CHAMPIONSHIP PODIUM SHOWCASE ── */}
      <div className="container mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#e10600] uppercase tracking-wider mb-1">
              <Trophy size={14} />
              <span>Championship Standings</span>
            </div>
            <h2 className="text-3xl font-black uppercase text-white tracking-tight">
              Drivers Championship Leaders
            </h2>
          </div>

          <Link
            href="/standings"
            className="flex items-center gap-1.5 text-xs font-bold text-gray-400 hover:text-white uppercase tracking-wider transition"
          >
            <span>Full Standings</span>
            <ChevronRight size={14} className="text-[#e10600]" />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {top3Drivers.map((s) => {
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
      </div>

      {/* ── 4. CONSTRUCTOR VELOCITY CARDS ── */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#00d2be] uppercase tracking-wider mb-1">
              <Gauge size={14} />
              <span>Constructors Championship</span>
            </div>
            <h2 className="text-3xl font-black uppercase text-white tracking-tight">
              Leading Constructors & Liveries
            </h2>
          </div>

          <Link
            href="/teams"
            className="flex items-center gap-1.5 text-xs font-bold text-gray-400 hover:text-white uppercase tracking-wider transition"
          >
            <span>All 10 Constructors</span>
            <ChevronRight size={14} className="text-[#00d2be]" />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {top3Teams.map((s) => {
            const team = MOCK_TEAMS[s.teamId];
            if (!team) return null;
            const teamDrivers = team.drivers.map(id => MOCK_DRIVERS[id]).filter(Boolean);

            return (
              <ConstructorCard
                key={team.id}
                team={team}
                rank={s.position}
                points={s.points}
                drivers={teamDrivers}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}