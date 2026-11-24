'use client';

import { useState } from 'react';
import { MOCK_DRIVERS, MOCK_TEAMS, MOCK_DRIVER_STANDINGS, MOCK_CAREER_STATS } from '@/lib/mock-data';
import { PageHeader } from '@/components/layout/PageHeader';
import { StaggeredGrid } from '@/components/layout/StaggeredGrid';
import { AnimatedDriverCard } from '@/components/cards/AnimatedDriverCard';
import { Users } from 'lucide-react';

export default function DriversPage() {
  const [selectedTeam, setSelectedTeam] = useState('ALL');

  const teams = ['ALL', ...Object.values(MOCK_TEAMS).map(t => t.id)];

  const filteredStandings = MOCK_DRIVER_STANDINGS.filter((s) => {
    const driver = MOCK_DRIVERS[s.driverId];
    if (!driver) return false;
    const matchesTeam = selectedTeam === 'ALL' || driver.teamId === selectedTeam;
    return matchesTeam;
  });

  return (
    <div className="min-h-screen text-white pb-20">
      <PageHeader
        label="FIA Formula One World Championship"
        title="2025 Grid Lineup"
        description="Official 20-driver roster, championship standings, career milestones, and telemetry profiles."
        accentColor="#e10600"
      >
        {/* Team Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-1">
          {teams.map((tId) => {
            const team = MOCK_TEAMS[tId];
            const active = selectedTeam === tId;
            return (
              <button
                key={tId}
                onClick={() => setSelectedTeam(tId)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shrink-0 border ${
                  active
                    ? 'bg-[#e10600] text-white border-[#e10600] shadow-[0_0_15px_rgba(225,6,0,0.5)]'
                    : 'bg-[#12151d] text-gray-400 border-white/5 hover:text-white hover:border-white/20'
                }`}
              >
                {tId === 'ALL' ? 'All Constructors' : team?.shortName || tId}
              </button>
            );
          })}
        </div>
      </PageHeader>

      {/* Driver Cards Grid */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-gray-400 uppercase tracking-wider">
            <Users size={14} className="text-[#00d2be]" />
            <span>Showing {filteredStandings.length} Active Competitors</span>
          </div>
        </div>

        <StaggeredGrid className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredStandings.map((s) => {
            const driver = MOCK_DRIVERS[s.driverId];
            const team = MOCK_TEAMS[s.teamId];
            const career = MOCK_CAREER_STATS[s.driverId];
            if (!driver) return null;

            return (
              <AnimatedDriverCard
                key={driver.id}
                driver={driver}
                team={team}
                rank={s.position}
                points={s.points}
                career={career}
              />
            );
          })}
        </StaggeredGrid>
      </div>
    </div>
  );
}
