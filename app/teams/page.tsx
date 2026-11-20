import { MOCK_TEAMS, MOCK_DRIVERS, MOCK_CONSTRUCTOR_STANDINGS } from '@/lib/mock-data';
import { MockDataBanner } from '@/components/ui/MockDataBanner';
import Link from 'next/link';
import { Trophy } from 'lucide-react';

export const metadata = {
  title: 'Teams & Constructors — F1 LIVE',
  description: 'Official 2025 Formula 1 constructors, team headquarters, drivers, car chassis, and championship stats.',
};

export default function TeamsPage() {
  const standings = MOCK_CONSTRUCTOR_STANDINGS;

  return (
    <div className="min-h-screen bg-[#101114] text-white">
      <MockDataBanner />

      {/* Editorial Header */}
      <div className="bg-[#101114] border-b border-[#24272D] py-10">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#E10600]" />
            <span className="text-xs font-bold text-[#E10600] uppercase tracking-widest">Constructors & Technical Constructors</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight">
            2025 FIA Formula One Constructors
          </h1>
          <p className="text-sm text-[#AEB4BE] mt-2 max-w-2xl">
            Explore official team liveries, constructors championships, factory bases, power units, chassis specifications, and driver lineups.
          </p>
        </div>
      </div>

      {/* Teams Grid */}
      <div className="container mx-auto px-4 py-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {standings.map((s) => {
            const team = MOCK_TEAMS[s.teamId];
            if (!team) return null;
            const teamDrivers = team.drivers.map(id => MOCK_DRIVERS[id]).filter(Boolean);

            return (
              <Link
                key={team.id}
                href={`/teams/${team.id}`}
                className="group relative bg-[#24272D] border border-white/5 rounded-2xl overflow-hidden hover:border-[#E10600]/60 transition-all hover:-translate-y-1.5 shadow-xl flex flex-col justify-between"
              >
                {/* Team Brand Line */}
                <div className="h-1.5 w-full" style={{ backgroundColor: team.color }} />

                <div className="p-6">
                  {/* Header: Rank + Team Logo */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-black px-2.5 py-1 rounded bg-black/40 text-white font-mono border border-white/10">
                      P{s.position}
                    </span>

                    {team.logoUrl ? (
                      <img
                        src={team.logoUrl}
                        alt={team.name}
                        className="h-9 w-auto max-w-[110px] object-contain group-hover:scale-105 transition-transform"
                      />
                    ) : (
                      <span className="font-mono text-2xl font-black text-white/20">#{s.position}</span>
                    )}
                  </div>

                  {/* Team Car Livery Visual Container */}
                  <div className="relative h-32 my-3 rounded-xl bg-gradient-to-tr from-black/40 via-white/5 to-transparent flex items-center justify-center overflow-hidden border border-white/5">
                    {team.logoUrl && (
                      <img
                        src={team.logoUrl}
                        alt={team.name}
                        className="h-24 w-auto object-contain opacity-25 group-hover:opacity-40 transition-opacity"
                      />
                    )}
                    <div className="absolute bottom-2 left-3 text-[10px] font-mono uppercase text-[#00B8D9] tracking-widest font-bold">
                      {team.chassis} &bull; {team.powerUnit}
                    </div>
                  </div>

                  {/* Team Name and Base */}
                  <div className="mb-5">
                    <h3 className="font-black text-2xl text-white tracking-tight group-hover:text-[#00B8D9] transition-colors leading-tight">
                      {team.name}
                    </h3>
                    <p className="text-xs text-[#AEB4BE] mt-1">
                      HQ: {team.base}
                    </p>
                  </div>

                  {/* Driver Pairings with Portraits */}
                  <div className="space-y-1.5 mb-5">
                    <div className="text-[10px] font-bold text-[#AEB4BE] uppercase tracking-wider">Lineup</div>
                    <div className="grid grid-cols-2 gap-2">
                      {teamDrivers.map((driver) => (
                        <div
                          key={driver.id}
                          className="flex items-center gap-2 p-2 rounded-xl bg-[#101114]/60 border border-white/5"
                        >
                          {driver.imageUrl && (
                            <img
                              src={driver.imageUrl}
                              alt={driver.name}
                              className="w-7 h-7 rounded-full object-cover object-top border border-white/10 shrink-0"
                            />
                          )}
                          <div className="min-w-0">
                            <div className="font-bold text-xs text-white truncate">{driver.name}</div>
                            <div className="text-[10px] font-mono text-[#AEB4BE]">#{driver.number}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Championship Stats */}
                  <div className="grid grid-cols-3 gap-2 py-3 px-2 rounded-xl bg-[#101114]/60 border border-white/5 text-center">
                    <div>
                      <div className="text-base font-black text-white font-mono">{s.points}</div>
                      <div className="text-[9px] text-[#AEB4BE] font-bold uppercase tracking-wider">PTS</div>
                    </div>
                    <div>
                      <div className="text-base font-black text-white font-mono">{s.wins}</div>
                      <div className="text-[9px] text-[#AEB4BE] font-bold uppercase tracking-wider">WINS</div>
                    </div>
                    <div>
                      <div className="text-base font-black text-white font-mono">{s.podiums}</div>
                      <div className="text-[9px] text-[#AEB4BE] font-bold uppercase tracking-wider">PODIUMS</div>
                    </div>
                  </div>
                </div>

                {/* Footer Link */}
                <div className="px-6 py-3 bg-[#101114]/40 border-t border-white/5 flex items-center justify-between text-xs text-[#AEB4BE] group-hover:text-white transition">
                  <span>Explore Constructor Details</span>
                  <span className="text-[#00B8D9] font-bold">&rarr;</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
