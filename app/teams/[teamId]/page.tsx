import { notFound } from 'next/navigation';
import { MOCK_TEAMS, MOCK_DRIVERS, MOCK_CONSTRUCTOR_STANDINGS, MOCK_DRIVER_STANDINGS } from '@/lib/mock-data';
import Link from 'next/link';
import { ArrowLeft, Gauge, Cpu, MapPin, Globe, Trophy } from 'lucide-react';

interface TeamPageProps {
  params: Promise<{ teamId: string }>;
}

export async function generateStaticParams() {
  return Object.keys(MOCK_TEAMS).map(id => ({ teamId: id }));
}

export async function generateMetadata({ params }: TeamPageProps) {
  const { teamId } = await params;
  const team = MOCK_TEAMS[teamId.toUpperCase()];
  return { title: team ? `${team.name} — WILTZ F1` : 'Team — WILTZ F1' };
}

export default async function TeamProfilePage({ params }: TeamPageProps) {
  const { teamId } = await params;
  const team = MOCK_TEAMS[teamId.toUpperCase()];
  if (!team) notFound();

  const standing = MOCK_CONSTRUCTOR_STANDINGS.find(s => s.teamId === team.id);
  const teamDrivers = team.drivers.map(id => MOCK_DRIVERS[id]).filter(Boolean);

  return (
    <div className="min-h-screen text-white pb-20">
      {/* Team Color Top Bar */}
      <div className="h-2 w-full" style={{ backgroundColor: team.color }} />

      {/* Hero Banner */}
      <div className="relative bg-gradient-to-b from-[#0e1015] to-[#07080a] border-b border-white/10 overflow-hidden">
        {/* Logo Watermark */}
        {team.logoUrl && (
          <img
            src={team.logoUrl}
            alt=""
            className="absolute right-8 top-1/2 -translate-y-1/2 h-64 w-auto object-contain opacity-[0.04] pointer-events-none select-none"
          />
        )}

        <div className="max-w-5xl mx-auto px-4 md:px-8 py-10 relative z-10">
          <Link href="/teams" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-white mb-6 transition-colors">
            <ArrowLeft size={14} />
            All Teams
          </Link>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div>
              <div className="flex items-center gap-3 mb-2">
                {team.logoUrl && (
                  <img src={team.logoUrl} alt={team.name} className="h-8 w-auto max-w-[120px] object-contain" />
                )}
                {standing && (
                  <span className="px-2.5 py-1 rounded-lg bg-black/60 border border-white/10 text-xs font-black font-mono text-white">
                    P{standing.position}
                  </span>
                )}
              </div>
              <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-tight text-white animate-fade-up">
                {team.name}
              </h1>
              <p className="text-sm text-[#a1a8b3] mt-2 font-medium">
                {team.base} &bull; {team.nationality}
              </p>
              {team.championships !== undefined && team.championships > 0 && (
                <div className="flex items-center gap-1.5 mt-2 text-[#ffd700] text-xs font-bold font-mono">
                  <Trophy size={13} className="fill-[#ffd700]" />
                  <span>{team.championships} World Constructor {team.championships === 1 ? 'Title' : 'Titles'}</span>
                </div>
              )}
            </div>

            {/* Car Showcase */}
            <div className="relative w-full lg:w-[420px] h-48 rounded-xl bg-gradient-to-tr from-black/60 via-[#10131a] to-black/30 border border-white/5 flex items-center justify-center overflow-hidden shrink-0">
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
              <img
                src={team.carImageUrl || team.logoUrl || ''}
                alt={`${team.name} F1 Car`}
                className="max-h-32 max-w-[85%] object-contain drop-shadow-[0_12px_24px_rgba(0,0,0,0.9)]"
              />
              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[10px] font-mono uppercase tracking-wider">
                <span className="text-[#00d2be] font-bold flex items-center gap-1">
                  <Gauge size={11} /> {team.chassis}
                </span>
                <span className="text-gray-400 font-bold flex items-center gap-1">
                  <Cpu size={11} /> {team.powerUnit}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-8 py-10 space-y-8">
        {/* Technical Spec Sheet */}
        <section className="bg-[#0e1015]/85 backdrop-blur-xl border border-white/[0.08] rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-white/5">
            <h2 className="text-xs font-bold text-[#a1a8b3] uppercase tracking-widest">Technical Specifications</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-white/5">
            {[
              { label: 'Chassis', value: team.chassis, icon: Gauge },
              { label: 'Power Unit', value: team.powerUnit, icon: Cpu },
              { label: 'Base', value: team.base, icon: MapPin },
              { label: 'Nationality', value: team.nationality, icon: Globe },
            ].map(({ label, value, icon: Icon }) => (
              <div key={label} className="p-5">
                <div className="flex items-center gap-1.5 text-[10px] text-[#a1a8b3] uppercase tracking-wider font-bold mb-1.5">
                  <Icon size={11} className="text-gray-500" />
                  <span>{label}</span>
                </div>
                <div className="text-sm font-bold text-white">{value}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Driver Duo */}
        <section>
          <h2 className="text-xs font-bold text-[#a1a8b3] uppercase tracking-widest mb-4">2025 Driver Lineup</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {teamDrivers.map(driver => {
              if (!driver) return null;
              const dStanding = MOCK_DRIVER_STANDINGS.find(s => s.driverId === driver.id);
              return (
                <Link
                  key={driver.id}
                  href={`/drivers/${driver.id}`}
                  className="group bg-[#0e1015]/85 backdrop-blur-xl border border-white/[0.08] rounded-xl p-5 hover:border-[#e10600]/40 transition-all duration-300 flex items-center gap-5"
                >
                  {driver.imageUrl ? (
                    <img
                      src={driver.imageUrl}
                      alt={driver.name}
                      className="w-20 h-20 rounded-xl object-cover object-top border border-white/10 shrink-0 shadow-lg group-hover:scale-105 transition-transform"
                    />
                  ) : (
                    <div className="w-20 h-20 rounded-xl bg-white/5 flex items-center justify-center text-2xl font-black text-white/20 border border-white/10 shrink-0">
                      {driver.abbreviation}
                    </div>
                  )}

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-lg">{driver.flagEmoji}</span>
                      <span className="font-mono text-xs text-gray-400 font-bold">#{driver.number}</span>
                    </div>
                    <h3 className="font-black text-lg text-white leading-tight group-hover:text-[#e10600] transition-colors">
                      {driver.name}
                    </h3>
                    <p className="text-xs text-gray-400 mt-0.5">{driver.nationality}</p>
                  </div>

                  {dStanding && (
                    <div className="text-right shrink-0">
                      <div className="font-black text-2xl font-mono text-white">{dStanding.points}</div>
                      <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">PTS &bull; P{dStanding.position}</div>
                    </div>
                  )}
                </Link>
              );
            })}
          </div>
        </section>

        {/* Constructor Stats */}
        {standing && (
          <section className="bg-[#0e1015]/85 backdrop-blur-xl border border-white/[0.08] rounded-xl overflow-hidden">
            <div className="px-6 py-4 border-b border-white/5">
              <h2 className="text-xs font-bold text-[#a1a8b3] uppercase tracking-widest">2025 Constructor Championship</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-white/5">
              {[
                { label: 'POINTS', value: standing.points.toString(), accent: true },
                { label: 'WINS', value: standing.wins.toString() },
                { label: 'PODIUMS', value: standing.podiums.toString() },
                { label: 'POLES', value: (standing.poles ?? 0).toString() },
              ].map(({ label, value, accent }) => (
                <div key={label} className="bg-[#0e1015] p-6 text-center">
                  <div className={`text-3xl font-black font-mono ${accent ? 'text-[#00d2be]' : 'text-white'}`}>
                    {value}
                  </div>
                  <div className="text-[9px] text-gray-500 uppercase tracking-wider mt-1 font-bold">{label}</div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
