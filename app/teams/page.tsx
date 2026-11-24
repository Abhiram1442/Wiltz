import { MOCK_TEAMS, MOCK_DRIVERS, MOCK_CONSTRUCTOR_STANDINGS } from '@/lib/mock-data';
import { PageHeader } from '@/components/layout/PageHeader';
import { StaggeredGrid } from '@/components/layout/StaggeredGrid';
import { ConstructorCard } from '@/components/cards/ConstructorCard';

export const metadata = {
  title: 'Constructors & Teams — WILTZ F1',
  description: 'Official 2025 Formula 1 constructors, team headquarters, animated car showcases, chassis specs, and driver lineups.',
};

export default function TeamsPage() {
  const standings = MOCK_CONSTRUCTOR_STANDINGS;

  return (
    <div className="min-h-screen text-white pb-20">
      <PageHeader
        label="Constructors Championship"
        title="2025 Constructors"
        description="Official team liveries, chassis specs, power unit manufacturers, factory bases, and driver pairings."
        accentColor="#00d2be"
      />

      {/* Teams Grid */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">
        <StaggeredGrid className="grid sm:grid-cols-1 lg:grid-cols-2 gap-6">
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
        </StaggeredGrid>
      </div>
    </div>
  );
}
