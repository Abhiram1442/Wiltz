'use client';

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
import { CountdownTimer } from '@/components/layout/CountdownTimer';
import { PointsBar } from '@/components/layout/PointsBar';
import {
  Radio,
  Trophy,
  Calendar,
  ArrowRight,
  Gauge,
  Shield,
  Clock,
  MapPin,
  Flag,
  Newspaper,
  ChevronRight,
} from 'lucide-react';

export default function HomePage() {
  const liveRace = MOCK_CALENDAR.find((r) => r.status === 'LIVE');
  const nextUpcoming = MOCK_CALENDAR.find((r) => r.status === 'UPCOMING');
  const nextCircuit = nextUpcoming ? MOCK_CIRCUITS[nextUpcoming.circuitId] : null;

  const top3 = MOCK_DRIVER_STANDINGS.slice(0, 3);
  const constructorLeader = MOCK_CONSTRUCTOR_STANDINGS[0];
  const leaderTeam = constructorLeader ? MOCK_TEAMS[constructorLeader.teamId] : null;
  const leaderMaxPoints = top3[0]?.points || 1;

  const liveLeader = MOCK_LIVE_RACE.positions[0];
  const liveLeaderDriver = liveLeader ? MOCK_DRIVERS[liveLeader.driverId] : null;

  const featured = MOCK_NEWS_ARTICLES.find((a) => a.featured) || MOCK_NEWS_ARTICLES[0];

  return (
    <div className="min-h-screen text-[#F4F6F8] bg-[#0D0F14] pb-24 selection:bg-[#E10600] selection:text-white">
      <MockDataBanner />

      {/* ── HERO: 3D F1 Car + Editorial Overlay ── */}
      <section className="relative min-h-[760px] bg-[#08090C] overflow-hidden border-b border-[#262B38] flex items-center">
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(to right, #262B38 1px, transparent 1px), linear-gradient(to bottom, #262B38 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(circle at 65% 48%, rgba(225, 6, 0, 0.16) 0%, rgba(13, 15, 20, 0.85) 55%, #08090C 100%)',
          }}
        />

        <div className="absolute inset-0 w-full h-full">
          <ThreeF1CarHero />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full px-4 md:px-8 py-16 pointer-events-none">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
            {/* Left: editorial */}
            <div className="flex flex-col gap-5 pointer-events-auto bg-[#08090C]/85 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-[#262B38]/80 shadow-2xl">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E10600] text-white font-mono text-[11px] font-black uppercase tracking-wider shadow-[0_0_15px_rgba(225,6,0,0.4)] w-fit animate-fade-up">
                2025 FIA World Championship
              </span>

              <h1 className="text-4xl sm:text-6xl xl:text-7xl font-black uppercase tracking-tight text-white leading-none animate-fade-up stagger-1">
                Beyond The Apex
              </h1>

              <p className="text-base sm:text-lg text-[#A1A8B3] max-w-lg leading-relaxed animate-fade-up stagger-2">
                Command the pit wall. Interactive 3D aerodynamics, verified championship telemetry, circuit dossiers, and constructor engineering.
              </p>

              <div className="flex flex-wrap items-center gap-3.5 pt-2 animate-fade-up stagger-3">
                <Link
                  href="/live"
                  className="inline-flex items-center justify-center gap-2.5 bg-[#E10600] text-white px-6 py-3.5 rounded-xl font-mono text-xs font-black uppercase tracking-wider transition-all duration-200 hover:bg-[#ff1801] hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(225,6,0,0.5)]"
                >
                  <Radio size={16} className="animate-pulse" />
                  <span>Live Board</span>
                </Link>

                <Link
                  href="/drivers"
                  className="inline-flex items-center justify-center gap-2 bg-[#1B1F29]/90 backdrop-blur-md text-white border border-[#262B38] px-6 py-3.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider transition-all duration-200 hover:bg-[#242936] hover:border-white/20"
                >
                  <Trophy size={15} className="text-[#A1A8B3]" />
                  <span>2025 Grid</span>
                </Link>
              </div>
            </div>

            {/* Right: live race ticker (if live) */}
            {liveRace && liveLeaderDriver && (
              <div className="pointer-events-auto animate-fade-up stagger-4">
                <Link
                  href="/live"
                  className="block bg-[#08090C]/85 backdrop-blur-md p-5 rounded-2xl border border-[#E10600]/30 shadow-[0_0_30px_rgba(225,6,0,0.15)] hover:border-[#E10600]/60 transition-all"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="flex h-2.5 w-2.5 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#e10600] opacity-75" />
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#e10600]" />
                    </span>
                    <span className="font-mono text-[11px] font-black text-[#E10600] uppercase tracking-wider">
                      Race Live — {liveRace.name}
                    </span>
                  </div>
                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <div className="text-xs text-[#A1A8B3] font-mono mb-1">LEADER</div>
                      <div className="text-xl font-black text-white">{liveLeaderDriver.name}</div>
                      <div className="text-xs text-[#A1A8B3] mt-0.5">{liveLeaderDriver.team}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-mono text-3xl font-black text-white tabular-nums">
                        L{liveRace.currentLap}
                        <span className="text-[#A1A8B3] text-lg">/{liveRace.totalLaps}</span>
                      </div>
                      <div className="text-[10px] font-mono text-[#00d2be] font-bold uppercase mt-0.5">Green Flag</div>
                    </div>
                  </div>
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── LIVE RACE BANNER (full-width, below hero) ── */}
      {liveRace && (
        <Link
          href="/live"
          className="block bg-gradient-to-r from-[#E10600] via-[#c40500] to-[#E10600] border-b border-[#262B38] animate-glow-pulse"
        >
          <div className="max-w-7xl mx-auto px-4 md:px-8 py-3 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Radio size={16} className="text-white animate-pulse" />
              <span className="font-mono text-xs font-black text-white uppercase tracking-wider">
                {liveRace.flagEmoji} {liveRace.name} — Lap {liveRace.currentLap}/{liveRace.totalLaps}
              </span>
            </div>
            <div className="flex items-center gap-2 text-white/90 text-xs font-bold">
              <span>Watch Live</span>
              <ArrowRight size={14} />
            </div>
          </div>
        </Link>
      )}

      {/* ── CHAMPIONSHIP BATTLE ── */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-16 border-b border-[#262B38]">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#E10600] flex items-center gap-1.5">
              <Trophy size={14} />
              <span>Championship Battle</span>
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white mt-1">
              2025 Title Contenders
            </h2>
          </div>
          <Link
            href="/standings"
            className="inline-flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-wider text-white hover:text-[#E10600] transition-colors"
          >
            <span>Full Standings</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* Top 3 drivers — podium layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[top3[1], top3[0], top3[2]].map((s, idx) => {
            if (!s) return null;
            const driver = MOCK_DRIVERS[s.driverId];
            const team = MOCK_TEAMS[s.teamId];
            if (!driver) return null;
            const isChampionshipLeader = s.position === 1;
            const teamColor = team?.color || '#e10600';

            return (
              <Link
                key={driver.id}
                href={`/drivers/${driver.id}`}
                className={`group relative rounded-2xl bg-[#14171F] border overflow-hidden transition-all duration-300 hover:-translate-y-1 ${
                  isChampionshipLeader
                    ? 'border-[#ffd700]/30 shadow-[0_0_30px_rgba(255,215,0,0.1)] md:-mt-4 md:mb-4'
                    : 'border-[#262B38] hover:border-[#E10600]/40'
                }`}
                style={{ animationDelay: `${idx * 80}ms` }}
              >
                <div
                  className="h-1.5 w-full"
                  style={{
                    background: `linear-gradient(90deg, ${teamColor}, ${teamColor}88 60%, transparent)`,
                  }}
                />

                <div className="p-5">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span
                        className={`flex items-center justify-center w-8 h-8 rounded-lg font-black font-mono text-sm border ${
                          isChampionshipLeader
                            ? 'bg-[#ffd700]/20 border-[#ffd700]/40 text-[#ffd700]'
                            : 'bg-black/60 border-white/10 text-white'
                        }`}
                      >
                        P{s.position}
                      </span>
                      <span className="text-lg">{driver.flagEmoji}</span>
                    </div>
                    <span
                      className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border"
                      style={{
                        borderColor: `${teamColor}40`,
                        backgroundColor: `${teamColor}15`,
                        color: teamColor,
                      }}
                    >
                      {team?.shortName}
                    </span>
                  </div>

                  {/* Driver portrait */}
                  <div className="relative h-40 flex items-end justify-center overflow-hidden mb-4">
                    {driver.imageUrl ? (
                      <img
                        src={driver.imageUrl}
                        alt={driver.name}
                        className="h-40 w-auto object-contain transform group-hover:scale-105 group-hover:-translate-y-1 transition-all duration-500 drop-shadow-[0_12px_20px_rgba(0,0,0,0.8)]"
                        loading="lazy"
                      />
                    ) : (
                      <div className="h-28 w-28 rounded-full bg-white/5 flex items-center justify-center text-2xl font-black text-white/30">
                        {driver.abbreviation}
                      </div>
                    )}
                  </div>

                  <div className="flex items-baseline justify-between">
                    <h3 className="text-lg font-black text-white group-hover:text-[#E10600] transition-colors leading-tight">
                      {driver.name}
                    </h3>
                    <div className="text-right">
                      <span className="font-mono text-lg font-black text-[#00d2be]">{s.points}</span>
                      <span className="text-[10px] text-[#A1A8B3] ml-1">PTS</span>
                    </div>
                  </div>

                  <div className="mt-3">
                    <PointsBar points={s.points} maxPoints={leaderMaxPoints} color={teamColor} />
                  </div>

                  <div className="flex items-center justify-between mt-3 text-[10px] font-mono text-[#A1A8B3]">
                    <span>{s.wins} Wins</span>
                    <span>{s.podiums} Podiums</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Constructor leader strip */}
        {leaderTeam && constructorLeader && (
          <Link
            href={`/teams/${leaderTeam.id}`}
            className="group flex items-center justify-between gap-6 p-5 bg-[#14171F] border border-[#262B38] rounded-2xl hover:border-[#E10600]/40 transition-all"
          >
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Shield size={16} className="text-[#00d2be]" />
                <span className="text-xs font-mono font-bold text-[#A1A8B3] uppercase tracking-wider">
                  Constructor Leader
                </span>
              </div>
              <div
                className="w-1 h-6 rounded-full"
                style={{ backgroundColor: leaderTeam.color }}
              />
              <div>
                <h3 className="text-lg font-black text-white group-hover:text-[#E10600] transition-colors">
                  {leaderTeam.name}
                </h3>
                <p className="text-xs text-[#A1A8B3]">{leaderTeam.base}</p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              {leaderTeam.carImageUrl && (
                <img
                  src={leaderTeam.carImageUrl}
                  alt={leaderTeam.name}
                  className="hidden sm:block h-12 w-auto object-contain opacity-70 group-hover:opacity-100 transition-opacity"
                />
              )}
              <div className="text-right">
                <div className="font-mono text-xl font-black text-[#00d2be]">{constructorLeader.points}</div>
                <div className="text-[10px] text-[#A1A8B3] font-bold">PTS</div>
              </div>
              <ChevronRight size={16} className="text-[#E10600] group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        )}
      </section>

      {/* ── NEXT RACE COUNTDOWN ── */}
      {nextUpcoming && (
        <section className="max-w-7xl mx-auto px-4 md:px-8 py-16 border-b border-[#262B38]">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#E10600] flex items-center gap-1.5">
                <Clock size={14} />
                <span>Next Race</span>
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-white mt-1">
                Race Countdown
              </h2>
            </div>
            <Link
              href="/calendar"
              className="inline-flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-wider text-white hover:text-[#E10600] transition-colors"
            >
              <span>Full Calendar</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="relative rounded-2xl overflow-hidden border border-[#262B38] bg-[#14171F]">
            {/* Background texture */}
            <div
              className="absolute inset-0 opacity-10 pointer-events-none"
              style={{
                backgroundImage: 'radial-gradient(rgba(255,255,255,0.2) 1px, transparent 1px)',
                backgroundSize: '24px 24px',
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#E10600]/10 via-transparent to-[#00d2be]/5 pointer-events-none" />

            <div className="relative p-8 md:p-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                {/* Left: Race info */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="font-mono text-sm font-black text-[#E10600] bg-black/40 px-3 py-1.5 rounded-lg border border-white/10">
                      R{String(nextUpcoming.round).padStart(2, '0')}
                    </span>
                    <span className="text-3xl">{nextUpcoming.flagEmoji}</span>
                    <span className="text-xs font-mono text-[#A1A8B3] font-bold uppercase">
                      {nextUpcoming.country}
                    </span>
                  </div>

                  <h3 className="text-3xl sm:text-4xl font-black text-white leading-tight mb-3">
                    {nextUpcoming.name}
                  </h3>

                  {nextCircuit && (
                    <div className="flex items-center gap-1.5 text-sm text-[#A1A8B3] mb-6">
                      <MapPin size={14} className="text-[#00d2be]" />
                      <span>{nextCircuit.name}, {nextCircuit.city}</span>
                    </div>
                  )}

                  <div className="flex items-center gap-2 text-xs font-mono text-[#A1A8B3]">
                    <Calendar size={13} />
                    <span>
                      {new Date(nextUpcoming.startTime)
                        .toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })
                        .toUpperCase()}
                    </span>
                  </div>

                  {nextCircuit && (
                    <div className="grid grid-cols-3 gap-3 mt-6">
                      <div className="bg-black/30 rounded-xl p-3 border border-white/5">
                        <div className="text-[10px] text-[#A1A8B3] font-bold uppercase">Track</div>
                        <div className="font-mono text-sm font-black text-white mt-0.5">{nextCircuit.trackLength} km</div>
                      </div>
                      <div className="bg-black/30 rounded-xl p-3 border border-white/5">
                        <div className="text-[10px] text-[#A1A8B3] font-bold uppercase">Laps</div>
                        <div className="font-mono text-sm font-black text-white mt-0.5">{nextCircuit.laps}</div>
                      </div>
                      <div className="bg-black/30 rounded-xl p-3 border border-white/5">
                        <div className="text-[10px] text-[#A1A8B3] font-bold uppercase">Distance</div>
                        <div className="font-mono text-sm font-black text-white mt-0.5">{nextCircuit.raceDistance} km</div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Right: Countdown */}
                <div className="flex flex-col items-center lg:items-end gap-4">
                  <span className="text-xs font-mono font-bold text-[#A1A8B3] uppercase tracking-widest">
                    Lights Out In
                  </span>
                  <CountdownTimer targetDate={nextUpcoming.startTime} />
                  <Link
                    href={`/races/${nextUpcoming.id}`}
                    className="mt-4 inline-flex items-center gap-2 bg-[#E10600] text-white px-5 py-3 rounded-xl font-mono text-xs font-black uppercase tracking-wider hover:bg-[#ff1801] transition-all hover:scale-105 active:scale-95 shadow-[0_0_15px_rgba(225,6,0,0.4)]"
                  >
                    <Flag size={14} />
                    <span>Race Hub</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── NEWS TEASER ── */}
      {featured && (
        <section className="max-w-7xl mx-auto px-4 md:px-8 py-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#E10600] flex items-center gap-1.5">
                <Newspaper size={14} />
                <span>Latest</span>
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-white mt-1">
                Paddock Headlines
              </h2>
            </div>
            <Link
              href="/news"
              className="inline-flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-wider text-white hover:text-[#E10600] transition-colors"
            >
              <span>All Stories</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          <Link
            href="/news"
            className="group grid grid-cols-1 lg:grid-cols-12 rounded-2xl overflow-hidden bg-[#14171F] border border-[#262B38] hover:border-[#E10600]/40 transition-all shadow-xl"
          >
            <div className="lg:col-span-5 relative h-56 lg:h-auto overflow-hidden">
              <img
                src={featured.imageUrl}
                alt={featured.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="lg:col-span-7 p-6 md:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#E10600] text-white">
                    {featured.category}
                  </span>
                  <span className="text-[11px] text-[#A1A8B3] font-mono flex items-center gap-1">
                    <Clock size={12} /> {featured.readTime}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white leading-tight group-hover:text-[#00d2be] transition-colors mb-3">
                  {featured.title}
                </h3>
                <p className="text-sm text-[#A1A8B3] leading-relaxed line-clamp-2">
                  {featured.summary}
                </p>
              </div>
              <div className="flex items-center gap-1.5 mt-6 text-xs font-bold text-white group-hover:text-[#E10600] transition-colors">
                <span>Read Full Story</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>
        </section>
      )}
    </div>
  );
}
