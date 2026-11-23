import { MOCK_TEAMS, MOCK_DRIVERS, MOCK_CONSTRUCTOR_STANDINGS } from '@/lib/mock-data';
import { MockDataBanner } from '@/components/ui/MockDataBanner';
import { ConstructorCard } from '@/components/cards/ConstructorCard';
import { Shield, Cpu, Gauge } from 'lucide-react';

export const metadata = {
  title: 'Constructors & Teams — WILTZ F1 Live',
  description: 'Official 2025 Formula 1 constructors, team headquarters, animated car showcases, chassis specs, and driver lineups.',
};

export default function TeamsPage() {
  const standings = MOCK_CONSTRUCTOR_STANDINGS;

  return (
    <div className="min-h-screen text-white pb-20">
      <MockDataBanner />

      {/* Cinematic Motorsport Header */}
      <div className="relative border-b border-white/10 py-12 overflow-hidden bg-gradient-to-b from-[#0e1015] via-[#07080a] to-[#07080a]">
        {/* Ambient Top Glow */}
        <div className="absolute top-0 right-1/4 w-96 h-48 bg-[#00d2be]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00d2be] animate-pulse" />
            <span className="text-xs font-mono font-bold text-[#00d2be] uppercase tracking-widest">
              Constructors Championship
            </span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-white leading-none">
            2025 Constructors
          </h1>
          <p className="text-sm text-gray-400 mt-3 max-w-2xl font-medium">
            Explore official team liveries, aerodynamic chassis codes, power unit manufacturers, technical factory bases, and driver pairings.
          </p>
        </div>
      </div>

      {/* Teams Grid */}
      <div className="container mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-gray-400 uppercase tracking-wider">
            <Shield size={14} className="text-[#e10600]" />
            <span>10 Constructors on the Grid</span>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {standings.map((s) => {
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