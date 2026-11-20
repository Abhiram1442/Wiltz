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
} from '@/lib/mock-data';
import { MOCK_NEWS_ARTICLES, MOCK_VIDEOS } from '@/lib/mock-news';
import { MockDataBanner } from '@/components/ui/MockDataBanner';
import { formatCountdown, formatShortDate } from '@/lib/utils';
import { Radio, ChevronRight, Trophy, Zap, Play, Calendar, Flag, ArrowRight, Clock } from 'lucide-react';

export default function HomePage() {
  const liveData = MOCK_LIVE_RACE;
  const leaderPos = liveData.positions[0];
  const leader = MOCK_DRIVERS[leaderPos.driverId];
  const leaderTeam = MOCK_TEAMS[leader?.teamId ?? ''];

  const nextRace = MOCK_CALENDAR.find(r => r.status === 'UPCOMING') || MOCK_CALENDAR[16];
  const lastRace = [...MOCK_CALENDAR].filter(r => r.status === 'COMPLETED').pop();

  const [countdown, setCountdown] = useState('');
  useEffect(() => {
    if (!nextRace) return;
    const update = () => setCountdown(formatCountdown(nextRace.startTime));
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, [nextRace]);

  const featuredArticle = MOCK_NEWS_ARTICLES[0];
  const topDrivers = MOCK_DRIVER_STANDINGS.slice(0, 3);

  return (
    <div className="min-h-screen bg-[#101114] text-white">
      <MockDataBanner />

      {/* ── 1. CINEMATIC HERO SECTION (Formula1.com inspired) ── */}
      <section className="relative min-h-[520px] bg-[#101114] border-b border-[#24272D] overflow-hidden flex items-center">
        {/* Background Motorsport Photography */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30 transform scale-105 hover:scale-100 transition-transform duration-1000"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1920&q=80")',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#101114] via-[#101114]/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#101114] via-[#101114]/80 to-transparent" />

        <div className="relative container mx-auto px-4 py-12">
          <div className="max-w-2xl">
            {/* Live Session Alert Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#E10600]/20 border border-[#E10600]/40 text-[#E10600] text-xs font-black uppercase tracking-widest mb-4">
              <span className="w-2 h-2 rounded-full bg-[#E10600] animate-ping" />
              LIVE GRAND PRIX &bull; LAP {liveData.race.currentLap} / {liveData.race.totalLaps}
            </div>

            <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-white leading-none mb-3">
              {liveData.race.name}
            </h1>
            <p className="text-base sm:text-lg text-[#AEB4BE] font-medium mb-6">
              Autodromo Nazionale Monza &bull; Round {liveData.race.round} &bull; Verstappen defends against Norris charge into Curva Grande.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/live"
                className="flex items-center gap-2 px-6 py-3.5 bg-[#E10600] hover:bg-[#c00500] text-white text-xs font-black uppercase tracking-wider rounded-xl transition shadow-xl shadow-[#E10600]/30 hover:scale-105"
              >
                <Radio size={15} className="animate-pulse" />
                <span>Launch Live Track & Leaderboard</span>
              </Link>

              <Link
                href="/calendar"
                className="flex items-center gap-2 px-5 py-3.5 bg-[#24272D] hover:bg-white/10 text-white text-xs font-bold uppercase tracking-wider rounded-xl border border-white/10 transition"
              >
                <Calendar size={14} />
                <span>Full Race Hub</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12 space-y-16">
        {/* ── 2. NEXT RACE & COUNTDOWN BAR ── */}
        <section className="bg-[#24272D] border border-white/5 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-4">
              <span className="text-xs font-bold text-[#E10600] uppercase tracking-widest block mb-1">
                Upcoming Grand Prix
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white">{nextRace.name}</h2>
              <p className="text-xs text-[#AEB4BE] mt-1">{nextRace.country} &bull; Round {nextRace.round}</p>
            </div>

            <div className="lg:col-span-5 flex items-center justify-center lg:justify-start gap-4">
              <div className="text-center p-3 rounded-xl bg-[#101114]/60 border border-white/5 min-w-[72px]">
                <div className="text-2xl font-black font-mono text-white">06</div>
                <div className="text-[9px] text-[#AEB4BE] uppercase tracking-wider font-bold">DAYS</div>
              </div>
              <div className="text-center p-3 rounded-xl bg-[#101114]/60 border border-white/5 min-w-[72px]">
                <div className="text-2xl font-black font-mono text-white">14</div>
                <div className="text-[9px] text-[#AEB4BE] uppercase tracking-wider font-bold">HRS</div>
              </div>
              <div className="text-center p-3 rounded-xl bg-[#101114]/60 border border-white/5 min-w-[72px]">
                <div className="text-2xl font-black font-mono text-white">32</div>
                <div className="text-[9px] text-[#AEB4BE] uppercase tracking-wider font-bold">MINS</div>
              </div>
              <div className="text-center p-3 rounded-xl bg-[#101114]/60 border border-white/5 min-w-[72px]">
                <div className="text-2xl font-black font-mono text-[#E10600]">18</div>
                <div className="text-[9px] text-[#AEB4BE] uppercase tracking-wider font-bold">SECS</div>
              </div>
            </div>

            <div className="lg:col-span-3 flex justify-end">
              <Link
                href="/calendar"
                className="w-full sm:w-auto text-center px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold text-xs uppercase tracking-wider border border-white/10 transition"
              >
                View Weekend Schedule &rarr;
              </Link>
            </div>
          </div>
        </section>

        {/* ── 3. CHAMPIONSHIP PREVIEW (TOP 3 DRIVERS WITH HEADSHOTS) ── */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-xs font-bold text-[#E10600] uppercase tracking-widest">Championship Fight</span>
              <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white mt-0.5">
                World Championship Leaders
              </h2>
            </div>
            <Link href="/standings" className="text-xs font-bold text-[#00B8D9] hover:underline flex items-center gap-1">
              Complete Standings <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {topDrivers.map((s, idx) => {
              const driver = MOCK_DRIVERS[s.driverId];
              const team = MOCK_TEAMS[s.teamId];
              if (!driver) return null;

              return (
                <div
                  key={s.driverId}
                  className="relative bg-[#24272D] border border-white/5 rounded-2xl p-6 overflow-hidden shadow-xl hover:border-[#E10600]/50 transition-all hover:-translate-y-1 group"
                >
                  <div className="h-1.5 absolute top-0 inset-x-0" style={{ backgroundColor: team?.color }} />
                  <div className="flex items-start justify-between">
                    <span className="font-mono text-4xl font-black text-white/15">0{idx + 1}</span>
                    <span className="text-sm font-bold font-mono text-[#00B8D9]">{s.points} PTS</span>
                  </div>

                  <div className="flex items-center gap-4 my-4">
                    {driver.imageUrl && (
                      <img
                        src={driver.imageUrl}
                        alt={driver.name}
                        className="w-16 h-16 rounded-full object-cover object-top border-2 border-white/10 shrink-0 shadow-lg group-hover:scale-105 transition-transform"
                      />
                    )}
                    <div>
                      <div className="text-xs text-[#AEB4BE] flex items-center gap-1 font-semibold">
                        <span>{driver.flagEmoji}</span>
                        <span>{driver.nationality}</span>
                      </div>
                      <h3 className="font-black text-lg text-white leading-tight">{driver.name}</h3>
                      <p className="text-xs font-bold mt-0.5" style={{ color: team?.color }}>{team?.name}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-[#AEB4BE] pt-3 border-t border-white/5 font-mono">
                    <span>{s.wins} Grand Prix Wins</span>
                    <span>{s.podiums} Podiums</span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── 4. EDITORIAL NEWSROOM & ANALYSIS ── */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-xs font-bold text-[#E10600] uppercase tracking-widest">Paddock Reports</span>
              <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white mt-0.5">
                Latest News & Technical Briefs
              </h2>
            </div>
            <Link href="/news" className="text-xs font-bold text-[#00B8D9] hover:underline flex items-center gap-1">
              Read All News <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid lg:grid-cols-12 gap-6">
            {/* Big Featured Story */}
            <div className="lg:col-span-7 bg-[#24272D] border border-white/5 rounded-2xl overflow-hidden group cursor-pointer shadow-xl flex flex-col justify-between">
              <div className="relative h-64 overflow-hidden">
                <img
                  src={featuredArticle.imageUrl}
                  alt={featuredArticle.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <span className="absolute bottom-3 left-3 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#E10600] text-white">
                  {featuredArticle.category}
                </span>
              </div>
              <div className="p-6">
                <div className="text-xs text-[#AEB4BE] font-mono flex items-center gap-1 mb-2">
                  <Clock size={12} /> {featuredArticle.readTime}
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white leading-tight group-hover:text-[#00B8D9] transition-colors mb-2">
                  {featuredArticle.title}
                </h3>
                <p className="text-xs text-[#AEB4BE] line-clamp-2">
                  {featuredArticle.summary}
                </p>
              </div>
            </div>

            {/* Smaller Supporting Stories */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              {MOCK_NEWS_ARTICLES.slice(1, 3).map((article) => (
                <div
                  key={article.id}
                  className="bg-[#24272D] border border-white/5 rounded-2xl p-4 flex gap-4 group cursor-pointer hover:border-[#E10600]/40 transition shadow-lg"
                >
                  <img
                    src={article.imageUrl}
                    alt={article.title}
                    className="w-28 h-24 rounded-xl object-cover shrink-0 group-hover:scale-105 transition-transform"
                  />
                  <div className="flex flex-col justify-between min-w-0">
                    <div>
                      <span className="text-[10px] font-bold text-[#00B8D9] uppercase tracking-wider block mb-1">
                        {article.category}
                      </span>
                      <h4 className="font-bold text-xs text-white leading-snug line-clamp-2 group-hover:text-[#00B8D9] transition-colors">
                        {article.title}
                      </h4>
                    </div>
                    <span className="text-[10px] text-[#AEB4BE] font-mono">{article.readTime}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 5. MUST-WATCH VIDEOS & ONBOARDS ── */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-xs font-bold text-[#E10600] uppercase tracking-widest">Video Hub</span>
              <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white mt-0.5">
                Must-Watch Race Highlights & Onboards
              </h2>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {MOCK_VIDEOS.map((vid) => (
              <div
                key={vid.id}
                className="bg-[#24272D] border border-white/5 rounded-xl overflow-hidden group hover:border-[#E10600]/50 transition-all cursor-pointer shadow-md"
              >
                <div className="relative h-36 overflow-hidden">
                  <img
                    src={vid.thumbnailUrl}
                    alt={vid.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/20 transition-colors">
                    <div className="w-10 h-10 rounded-full bg-[#E10600] text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Play size={16} className="ml-0.5 fill-white" />
                    </div>
                  </div>
                  <span className="absolute bottom-2 right-2 bg-black/80 px-2 py-0.5 rounded text-[10px] font-mono text-white">
                    {vid.duration}
                  </span>
                </div>
                <div className="p-3">
                  <span className="text-[9px] font-bold text-[#00B8D9] uppercase tracking-wider block mb-1">
                    {vid.category}
                  </span>
                  <h4 className="font-bold text-xs text-white leading-snug line-clamp-2">
                    {vid.title}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
