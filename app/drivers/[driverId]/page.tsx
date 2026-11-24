import { notFound } from 'next/navigation';
import { MOCK_DRIVERS, MOCK_TEAMS, MOCK_DRIVER_STANDINGS, MOCK_CAREER_STATS, MOCK_SEASON_STATS } from '@/lib/mock-data';
import { PointsBar } from '@/components/layout/PointsBar';
import Link from 'next/link';
import { ArrowLeft, Trophy, Zap, ChevronRight } from 'lucide-react';

interface DriverPageProps {
  params: Promise<{ driverId: string }>;
}

export async function generateStaticParams() {
  return Object.keys(MOCK_DRIVERS).map(id => ({ driverId: id }));
}

export async function generateMetadata({ params }: DriverPageProps) {
  const { driverId } = await params;
  const driver = MOCK_DRIVERS[driverId.toUpperCase()];
  return { title: driver ? `${driver.name} — WILTZ F1` : 'Driver — WILTZ F1' };
}

export default async function DriverProfilePage({ params }: DriverPageProps) {
  const { driverId } = await params;
  const driver = MOCK_DRIVERS[driverId.toUpperCase()];
  if (!driver) notFound();

  const team = MOCK_TEAMS[driver.teamId];
  const standing = MOCK_DRIVER_STANDINGS.find(s => s.driverId === driver.id);
  const career = MOCK_CAREER_STATS[driver.id];
  const season = MOCK_SEASON_STATS[driver.id];
  const leaderPoints = MOCK_DRIVER_STANDINGS[0]?.points ?? 288;

  return (
    <div className="min-h-screen text-white pb-20">
      {/* Back link */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-6">
        <Link href="/drivers" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-white transition-colors">
          <ArrowLeft size={14} />
          All Drivers
        </Link>
      </div>

      {/* Cinematic Hero Banner */}
      <div className="animate-fade-up">
        <div
          className="relative max-w-7xl mx-auto px-4 md:px-8 mt-6 rounded-2xl overflow-hidden border border-white/[0.08] bg-gradient-to-r from-[#0e1015] to-[#14171f]"
          style={{ borderLeftColor: team?.color, borderLeftWidth: 4 }}
        >
          {/* Giant ghosted number watermark */}
          <div className="absolute right-4 md:right-12 top-1/2 -translate-y-1/2 font-black italic text-[10rem] md:text-[16rem] select-none pointer-events-none text-white/[0.03] font-mono leading-none">
            {driver.number}
          </div>

          {/* Team color gradient glow */}
          <div
            className="absolute top-0 left-0 w-64 h-full opacity-15 pointer-events-none"
            style={{ background: `linear-gradient(to right, ${team?.color || '#e10600'}, transparent)` }}
          />

          <div className="relative z-10 p-6 md:p-10 flex flex-col md:flex-row items-start md:items-center gap-6">
            {/* Text side */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-3 flex-wrap">
                <span className="text-4xl">{driver.flagEmoji}</span>
                <span className="text-xs text-gray-400 font-semibold">{driver.nationality}</span>
                {driver.dateOfBirth && (
                  <span className="text-xs text-gray-600">b. {driver.dateOfBirth}</span>
                )}
                <span
                  className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border"
                  style={{
                    borderColor: `${team?.color}40`,
                    backgroundColor: `${team?.color}15`,
                    color: team?.color,
                  }}
                >
                  #{driver.number}
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight leading-none">
                {driver.name}
              </h1>
              <p className="text-lg mt-2 font-bold" style={{ color: team?.color }}>{team?.name}</p>
              <p className="text-sm text-gray-500 mt-1">{team?.chassis} &middot; {team?.powerUnit}</p>

              {standing && (
                <div className="flex items-center gap-6 mt-5">
                  <div>
                    <div className="text-3xl font-black text-[#e10600]">P{standing.position}</div>
                    <div className="text-[10px] text-gray-500 uppercase tracking-wider font-bold">Championship</div>
                  </div>
                  <div>
                    <div className="text-3xl font-black text-[#00d2be] font-mono">{standing.points}</div>
                    <div className="text-[10px] text-gray-500 uppercase tracking-wider font-bold">Points</div>
                  </div>
                  <div>
                    <div className="text-3xl font-black text-white font-mono">{standing.wins}</div>
                    <div className="text-[10px] text-gray-500 uppercase tracking-wider font-bold">Wins</div>
                  </div>
                </div>
              )}
            </div>

            {/* Driver portrait */}
            {driver.imageUrl && (
              <div className="shrink-0 relative">
                <img
                  src={driver.imageUrl}
                  alt={driver.name}
                  className="h-48 md:h-64 w-auto object-contain drop-shadow-[0_12px_30px_rgba(0,0,0,0.8)]"
                />
                <div
                  className="absolute bottom-0 left-0 right-0 h-[2px] opacity-60 blur-[1px]"
                  style={{ backgroundColor: team?.color }}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 mt-8">
        <div className="grid sm:grid-cols-2 gap-6">
          {/* 2025 Season */}
          {standing && (
            <div className="animate-fade-up bg-[#0e1015]/85 backdrop-blur-xl border border-white/[0.08] rounded-2xl p-6" style={{ animationDelay: '100ms' }}>
              <h2 className="section-header mb-4">2025 SEASON</h2>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: 'POSITION', value: `P${standing.position}`, accent: true },
                  { label: 'POINTS', value: standing.points.toString() },
                  { label: 'WINS', value: standing.wins.toString() },
                  { label: 'PODIUMS', value: standing.podiums.toString() },
                  { label: 'POLES', value: (standing.poles ?? 0).toString() },
                  { label: 'FASTEST LAPS', value: (standing.fastestLaps ?? 0).toString() },
                ].map(({ label, value, accent }) => (
                  <div key={label} className="text-center bg-[#0e1015]/85 backdrop-blur-xl border border-white/[0.08] rounded-xl p-3">
                    <div className={`text-xl font-black animate-fade-up ${accent ? 'text-[#e10600]' : ''}`}>{value}</div>
                    <div className="text-[9px] text-gray-500 uppercase tracking-wider mt-1 font-bold">{label}</div>
                  </div>
                ))}
              </div>

              {/* Points bar relative to leader */}
              <div className="mt-5 pt-4 border-t border-white/5">
                <div className="flex items-center justify-between text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-2">
                  <span>Points vs Leader ({leaderPoints} PTS)</span>
                  <span className="text-white font-mono">{Math.round((standing.points / leaderPoints) * 100)}%</span>
                </div>
                <PointsBar points={standing.points} maxPoints={leaderPoints} color={team?.color || '#e10600'} />
              </div>
            </div>
          )}

          {/* Career Stats */}
          {career && (
            <div className="animate-fade-up bg-[#0e1015]/85 backdrop-blur-xl border border-white/[0.08] rounded-2xl p-6" style={{ animationDelay: '200ms' }}>
              <h2 className="section-header mb-4">CAREER STATISTICS</h2>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: 'STARTS', value: (career.starts ?? career.raceStarts ?? 0).toString() },
                  { label: 'WINS', value: career.wins.toString() },
                  { label: 'PODIUMS', value: career.podiums.toString() },
                  { label: 'POLES', value: (career.poles ?? career.polePositions ?? 0).toString() },
                  { label: 'FASTEST LAPS', value: career.fastestLaps.toString() },
                  { label: 'CHAMPIONSHIPS', value: (career.championships ?? career.worldChampionships ?? 0).toString(), accent: (career.championships ?? career.worldChampionships ?? 0) > 0 },
                ].map(({ label, value, accent }) => (
                  <div key={label} className="text-center bg-[#0e1015]/85 backdrop-blur-xl border border-white/[0.08] rounded-xl p-3">
                    <div className={`text-xl font-black ${accent ? 'text-yellow-400' : ''}`}>{value}</div>
                    <div className="text-[9px] text-gray-500 uppercase tracking-wider mt-1 font-bold">{label}</div>
                  </div>
                ))}
              </div>
              <div className="mt-3 text-xs text-gray-600 text-center">Debut: {career.debutYear ?? 'F1'}</div>
            </div>
          )}
        </div>

        {/* No stats note */}
        {!career && !standing && (
          <div className="animate-fade-up bg-[#0e1015]/85 backdrop-blur-xl border border-white/[0.08] rounded-2xl p-8 text-center text-gray-500 mt-6">
            <p>Full statistics for this driver are not available yet.</p>
          </div>
        )}

        {/* Team Link Card */}
        {team && (
          <Link
            href={`/teams/${driver.teamId}`}
            className="animate-fade-up group mt-6 flex items-center justify-between p-5 rounded-2xl bg-[#0e1015]/85 backdrop-blur-xl border border-white/[0.08] hover:border-[#e10600]/40 transition-all"
            style={{ animationDelay: '300ms' }}
          >
            <div className="flex items-center gap-4">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-white text-sm"
                style={{ backgroundColor: team.color }}
              >
                {team.shortName.slice(0, 2)}
              </div>
              <div>
                <div className="font-bold text-white group-hover:text-[#e10600] transition-colors">{team.name}</div>
                <div className="text-xs text-gray-500">{team.base} &middot; {team.chassis}</div>
              </div>
            </div>
            <ChevronRight size={18} className="text-gray-500 group-hover:text-[#e10600] group-hover:translate-x-1 transition-all" />
          </Link>
        )}
      </div>
    </div>
  );
}
