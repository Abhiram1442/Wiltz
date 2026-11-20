'use client';

import { useState } from 'react';
import { MOCK_DRIVERS, MOCK_TEAMS, MOCK_DRIVER_STANDINGS, MOCK_CAREER_STATS } from '@/lib/mock-data';
import { MockDataBanner } from '@/components/ui/MockDataBanner';
import Link from 'next/link';
import { Search, Trophy } from 'lucide-react';

export default function DriversPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTeam, setSelectedTeam] = useState('ALL');

  const teams = ['ALL', ...Object.values(MOCK_TEAMS).map(t => t.id)];

  const filteredStandings = MOCK_DRIVER_STANDINGS.filter((s) => {
    const driver = MOCK_DRIVERS[s.driverId];
    const team = MOCK_TEAMS[s.teamId];
    if (!driver) return false;

    const matchesSearch = driver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          driver.nationality.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          driver.abbreviation.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTeam = selectedTeam === 'ALL' || driver.teamId === selectedTeam;

    return matchesSearch && matchesTeam;
  });

  return (
    <div className="min-h-screen bg-[#101114] text-white">
      <MockDataBanner />

      {/* Editorial Header */}
      <div className="bg-[#101114] border-b border-[#24272D] py-10">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#E10600]" />
            <span className="text-xs font-bold text-[#E10600] uppercase tracking-widest">Formula 1 Competitors</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight">
            2025 FIA Formula One Drivers
          </h1>
          <p className="text-sm text-[#AEB4BE] mt-2 max-w-2xl">
            Explore official driver portraits, career statistics, world championship standings, and race profiles of the 20 drivers on the grid.
          </p>

          {/* Search and Filters Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mt-8">
            {/* Search Box */}
            <div className="relative max-w-md w-full">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#AEB4BE]" />
              <input
                type="text"
                placeholder="Search driver by name, country, code..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-[#24272D] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-[#AEB4BE] outline-none focus:border-[#E10600] transition"
              />
            </div>

            {/* Team Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-1">
              {teams.map((tId) => (
                <button
                  key={tId}
                  onClick={() => setSelectedTeam(tId)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition shrink-0 ${
                    selectedTeam === tId
                      ? 'bg-[#E10600] text-white shadow-md'
                      : 'bg-[#24272D] text-[#AEB4BE] hover:text-white'
                  }`}
                >
                  {tId === 'ALL' ? 'All Teams' : MOCK_TEAMS[tId]?.shortName || tId}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Driver Cards Grid */}
      <div className="container mx-auto px-4 py-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredStandings.map((s) => {
            const driver = MOCK_DRIVERS[s.driverId];
            const team = MOCK_TEAMS[s.teamId];
            const career = MOCK_CAREER_STATS[s.driverId];
            if (!driver) return null;

            return (
              <Link
                key={driver.id}
                href={`/drivers/${driver.id}`}
                className="group relative bg-[#24272D] border border-white/5 rounded-2xl overflow-hidden hover:border-[#E10600]/60 transition-all hover:-translate-y-1.5 shadow-xl flex flex-col justify-between"
              >
                {/* Team Top Accent Bar */}
                <div className="h-1.5 w-full" style={{ backgroundColor: team?.color ?? '#E10600' }} />

                <div className="p-5">
                  {/* Header: Rank + Number + Team Logo */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-black px-2 py-0.5 rounded bg-black/40 text-white font-mono border border-white/10">
                      P{s.position}
                    </span>
                    <span className="font-black text-2xl text-white/30 font-mono group-hover:text-[#E10600] transition-colors">
                      #{driver.number}
                    </span>
                  </div>

                  {/* Driver Headshot Portrait */}
                  <div className="relative h-44 mb-4 flex items-center justify-center overflow-hidden rounded-xl bg-gradient-to-b from-white/5 to-transparent">
                    {driver.imageUrl ? (
                      <img
                        src={driver.imageUrl}
                        alt={driver.name}
                        className="h-full w-auto object-contain object-bottom group-hover:scale-105 transition-transform duration-500 drop-shadow-2xl"
                      />
                    ) : (
                      <div className="text-4xl">{driver.flagEmoji}</div>
                    )}

                    {/* Team Logo floating watermark */}
                    {team?.logoUrl && (
                      <img
                        src={team.logoUrl}
                        alt={team.name}
                        className="absolute bottom-2 right-2 w-8 h-8 object-contain opacity-40 group-hover:opacity-90 transition-opacity"
                      />
                    )}
                  </div>

                  {/* Name and Team details */}
                  <div className="mb-4">
                    <div className="flex items-center gap-1.5 text-xs text-[#AEB4BE] mb-1">
                      <span>{driver.flagEmoji}</span>
                      <span className="font-semibold">{driver.nationality}</span>
                    </div>
                    <h3 className="font-black text-xl text-white tracking-tight leading-snug group-hover:text-[#00B8D9] transition-colors">
                      {driver.name}
                    </h3>
                    <p className="text-xs font-bold mt-0.5" style={{ color: team?.color }}>
                      {team?.name}
                    </p>
                  </div>

                  {/* Driver Season Stats Matrix */}
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

                  {/* World championships badge if any */}
                  {career && (career.championships ?? career.worldChampionships ?? 0) > 0 && (
                    <div className="mt-3 flex items-center justify-center gap-1.5 text-[11px] font-bold text-yellow-400 bg-yellow-400/10 border border-yellow-400/20 py-1 rounded-lg">
                      <Trophy size={13} />
                      <span>{career.championships ?? career.worldChampionships}x World Champion</span>
                    </div>
                  )}
                </div>

                {/* Footer Link */}
                <div className="px-5 py-3 bg-[#101114]/40 border-t border-white/5 flex items-center justify-between text-xs text-[#AEB4BE] group-hover:text-white transition">
                  <span>View Driver Bio</span>
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
