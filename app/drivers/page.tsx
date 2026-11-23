'use client';

import { useState } from 'react';
import { MOCK_DRIVERS, MOCK_TEAMS, MOCK_DRIVER_STANDINGS, MOCK_CAREER_STATS } from '@/lib/mock-data';
import { MockDataBanner } from '@/components/ui/MockDataBanner';
import { AnimatedDriverCard } from '@/components/cards/AnimatedDriverCard';
import { Search, Trophy, Filter, Users } from 'lucide-react';

export default function DriversPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTeam, setSelectedTeam] = useState('ALL');

  const teams = ['ALL', ...Object.values(MOCK_TEAMS).map(t => t.id)];

  const filteredStandings = MOCK_DRIVER_STANDINGS.filter((s) => {
    const driver = MOCK_DRIVERS[s.driverId];
    if (!driver) return false;

    const matchesSearch = driver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          driver.nationality.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          driver.abbreviation.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTeam = selectedTeam === 'ALL' || driver.teamId === selectedTeam;

    return matchesSearch && matchesTeam;
  });

  return (
    <div className="min-h-screen text-white pb-20">
      <MockDataBanner />

      {/* Cinematic Motorsport Header */}
      <div className="relative border-b border-white/10 py-12 overflow-hidden bg-gradient-to-b from-[#0e1015] via-[#07080a] to-[#07080a]">
        {/* Ambient Top Glow */}
        <div className="absolute top-0 left-1/4 w-96 h-48 bg-[#e10600]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#e10600] animate-pulse" />
            <span className="text-xs font-mono font-bold text-[#e10600] uppercase tracking-widest">
              FIA Formula One World Championship
            </span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-white leading-none">
            2025 Grid Lineup
          </h1>
          <p className="text-sm text-gray-400 mt-3 max-w-2xl font-medium">
            Official 20-driver roster, live championship standings, career milestones, telemetry data, and race telemetry profiles.
          </p>

          {/* Search and Team Filter Bar */}
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 mt-8 pt-6 border-t border-white/10">
            {/* Search Box */}
            <div className="relative max-w-md w-full">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by driver name, country, or code..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-[#12151d] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-gray-500 outline-none focus:border-[#e10600] transition shadow-inner"
              />
            </div>

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
          </div>
        </div>
      </div>

      {/* Driver Cards Grid */}
      <div className="container mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-gray-400 uppercase tracking-wider">
            <Users size={14} className="text-[#00d2be]" />
            <span>Showing {filteredStandings.length} Active Competitors</span>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
        </div>
      </div>
    </div>
  );
}