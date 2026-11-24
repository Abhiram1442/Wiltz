import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MOCK_CALENDAR, MOCK_DRIVERS, MOCK_TEAMS, MOCK_QUALIFYING, MOCK_LIVE_RACE } from '@/lib/mock-data';
import { formatShortDate } from '@/lib/utils';
import { ArrowLeft, Radio, Calendar, Flag, MapPin, Trophy } from 'lucide-react';
import { TyreBadge } from '@/components/ui/TyreBadge';

interface RacePageProps {
  params: Promise<{ raceId: string }>;
}

export async function generateStaticParams() {
  return MOCK_CALENDAR.map(r => ({ raceId: r.id }));
}

export async function generateMetadata({ params }: RacePageProps) {
  const { raceId } = await params;
  const race = MOCK_CALENDAR.find(r => r.id === raceId);
  return { title: race ? `${race.name} — WILTZ F1` : 'Race — WILTZ F1' };
}

export default async function RacePage({ params }: RacePageProps) {
  const { raceId } = await params;
  const race = MOCK_CALENDAR.find(r => r.id === raceId);
  if (!race) notFound();

  const isLive = race.status === 'LIVE';
  const isCompleted = race.status === 'COMPLETED';
  const winner = race.winner ? MOCK_DRIVERS[race.winner] : null;
  const winnerTeam = winner ? MOCK_TEAMS[winner.teamId] : null;

  return (
    <div className="min-h-screen text-white pb-20">
      {/* Cinematic Race Header */}
      <div className="relative border-b border-white/10 overflow-hidden bg-gradient-to-b from-[#0e1015] via-[#07080a] to-[#07080a]">
        {isLive && (
          <div className="h-1 bg-[#e10600] animate-pulse" />
        )}

        <div className="absolute top-0 left-1/4 w-96 h-48 bg-[#e10600]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 md:px-8 py-10 relative z-10">
          <Link href="/calendar" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-white mb-6 transition-colors">
            <ArrowLeft size={14} />
            Calendar
          </Link>

          <div className="flex items-start justify-between gap-6 flex-wrap">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-4xl">{race.flagEmoji}</span>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-lg bg-black/60 border border-white/10 font-mono text-xs font-black text-white">
                    ROUND {race.round}
                  </span>
                  {isLive && (
                    <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#e10600]/20 text-[#ff1801] border border-[#e10600]/50 text-[10px] font-black uppercase font-mono tracking-wider animate-pulse">
                      <Radio size={10} />
                      LIVE NOW
                    </span>
                  )}
                  {isCompleted && (
                    <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold uppercase font-mono">
                      FINAL
                    </span>
                  )}
                </div>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white leading-none animate-fade-up">
                {race.name}
              </h1>

              <div className="flex items-center gap-4 mt-3 text-sm text-[#a1a8b3]">
                <span className="flex items-center gap-1.5">
                  <MapPin size={14} className="text-[#00d2be]" />
                  {race.country}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar size={14} className="text-gray-500" />
                  {formatShortDate(race.startTime)}
                </span>
              </div>
            </div>

            {/* Right side: lap counter or winner */}
            {isLive && race.currentLap && (
              <div className="text-right bg-[#0e1015]/85 backdrop-blur-xl border border-white/[0.08] rounded-2xl px-6 py-4">
                <div className="font-mono font-black text-4xl text-white tabular-nums">
                  L{race.currentLap}<span className="text-gray-600 text-2xl">/{race.totalLaps}</span>
                </div>
                <div className="text-green-400 text-xs font-bold uppercase font-mono mt-1">GREEN FLAG</div>
              </div>
            )}

            {isCompleted && winner && (
              <div className="bg-[#0e1015]/85 backdrop-blur-xl border border-white/[0.08] rounded-2xl px-6 py-4 flex items-center gap-4">
                <Trophy size={28} className="text-[#ffd700]" />
                <div>
                  <div className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Winner</div>
                  <div className="font-black text-lg text-white">{winner.name}</div>
                  <div className="text-xs font-bold" style={{ color: winnerTeam?.color }}>{winnerTeam?.name}</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-8 py-8 space-y-8">
        {/* Live CTA */}
        {isLive && (
          <Link
            href="/live"
            className="inline-flex items-center gap-2.5 bg-[#e10600] text-white font-mono text-xs font-black uppercase tracking-wider px-6 py-3.5 rounded-xl transition-all duration-200 hover:bg-[#ff1801] hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(225,6,0,0.5)]"
          >
            <Radio size={16} className="animate-pulse" />
            Watch Live Leaderboard
          </Link>
        )}

        {/* Qualifying */}
        {race.id === 'ita-2025' && (
          <section className="animate-fade-up">
            <h2 className="text-xl font-black mb-4 uppercase tracking-tight">Qualifying</h2>
            <div className="bg-[#0e1015]/85 backdrop-blur-xl border border-white/[0.08] rounded-2xl overflow-hidden">
              <div className="hidden sm:grid grid-cols-[2.5rem_1fr_7rem_6rem_6rem_6rem_6rem] gap-2 px-5 py-3 border-b border-white/10 text-[10px] font-bold text-[#a1a8b3] uppercase tracking-wider">
                <span>POS</span>
                <span>DRIVER</span>
                <span>TEAM</span>
                <span className="text-right">Q1</span>
                <span className="text-right">Q2</span>
                <span className="text-right">Q3</span>
                <span className="text-right">GAP</span>
              </div>
              <div className="divide-y divide-white/5">
                {MOCK_QUALIFYING.map((q) => {
                  const driver = MOCK_DRIVERS[q.driverId];
                  const isPole = q.position === 1;
                  return (
                    <div key={q.driverId} className={`grid grid-cols-[2.5rem_1fr_7rem_6rem_6rem_6rem_6rem] gap-2 items-center px-5 py-3 ${isPole ? 'bg-yellow-400/5' : 'hover:bg-white/[0.03]'} transition-colors`}>
                      <span className={`font-mono font-bold text-sm ${isPole ? 'text-yellow-400' : 'text-gray-500'}`}>{q.position}</span>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span>{driver?.flagEmoji}</span>
                          <span className="font-bold text-sm">{driver?.name}</span>
                          {isPole && <span className="text-[10px] bg-yellow-400/20 text-yellow-400 px-1.5 py-0.5 rounded font-bold">POLE</span>}
                        </div>
                        <span className="text-xs text-gray-500">{driver?.team}</span>
                      </div>
                      <span className="hidden sm:block text-xs text-gray-600 text-right">{driver?.abbreviation}</span>
                      <span className="hidden sm:block font-mono text-xs text-gray-500 text-right">{q.q1Time ?? '—'}</span>
                      <span className="hidden sm:block font-mono text-xs text-gray-500 text-right">{q.q2Time ?? '—'}</span>
                      <span className="hidden sm:block font-mono text-xs text-green-400 text-right">{q.q3Time ?? '—'}</span>
                      <span className="hidden sm:block font-mono text-xs text-gray-400 text-right">{q.gap}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* Race positions (live) */}
        {isLive && (
          <section className="animate-fade-up" style={{ animationDelay: '100ms' }}>
            <h2 className="text-xl font-black mb-4 uppercase tracking-tight">
              Current Race Order — Lap {race.currentLap}
            </h2>
            <div className="bg-[#0e1015]/85 backdrop-blur-xl border border-white/[0.08] rounded-2xl overflow-hidden">
              <div className="divide-y divide-white/5">
                {MOCK_LIVE_RACE.positions.slice(0, 10).map((pos) => {
                  const driver = MOCK_DRIVERS[pos.driverId];
                  const team = driver ? MOCK_TEAMS[driver.teamId] : null;
                  return (
                    <div key={pos.driverId} className="flex items-center gap-4 px-5 py-3.5 hover:bg-white/[0.03] transition-colors">
                      <span className="w-6 font-mono font-bold text-gray-500 text-sm text-right shrink-0">{pos.position}</span>
                      <div
                        className="w-1 h-8 rounded-full shrink-0"
                        style={{ backgroundColor: team?.color || '#e10600' }}
                      />
                      <span>{driver?.flagEmoji}</span>
                      <div className="flex-1">
                        <div className="font-bold text-sm">{driver?.name}</div>
                        <div className="text-xs" style={{ color: team?.color }}>{team?.name}</div>
                      </div>
                      <TyreBadge compound={pos.tyre} size="sm" />
                      <span className="font-mono text-sm text-gray-400 w-20 text-right">{pos.gapToLeader}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* Upcoming */}
        {race.status === 'UPCOMING' && (
          <div className="bg-[#0e1015]/85 backdrop-blur-xl border border-white/[0.08] rounded-2xl p-12 text-center animate-fade-up">
            <div className="text-5xl mb-4">{race.flagEmoji}</div>
            <h2 className="text-xl font-bold mb-2">Race not yet started</h2>
            <p className="text-gray-500 text-sm">
              Check back on {formatShortDate(race.startTime)} for live timing.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
