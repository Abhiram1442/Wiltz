'use client';

import { useState } from 'react';
import { MOCK_DRIVER_STANDINGS, MOCK_CONSTRUCTOR_STANDINGS, MOCK_DRIVERS, MOCK_TEAMS } from '@/lib/mock-data';
import { MockDataBanner } from '@/components/ui/MockDataBanner';
import Link from 'next/link';
import { Trophy, ChevronRight } from 'lucide-react';

export default function StandingsPage() {
  const [tab, setTab] = useState<'DRIVERS' | 'CONSTRUCTORS'>('DRIVERS');

  return (
    <div className="min-h-screen bg-[#101114] text-white">
      <MockDataBanner />

      {/* Editorial Header */}
      <div className="bg-[#101114] border-b border-[#24272D] py-10">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#E10600]" />
            <span className="text-xs font-bold text-[#E10600] uppercase tracking-widest">World Championship Table</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight">
            2025 FIA Formula One Standings
          </h1>

          {/* Switcher Tabs */}
          <div className="flex items-center gap-3 mt-6">
            <button
              onClick={() => setTab('DRIVERS')}
              className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition ${
                tab === 'DRIVERS'
                  ? 'bg-[#E10600] text-white shadow-lg shadow-[#E10600]/30'
                  : 'bg-[#24272D] text-[#AEB4BE] hover:text-white'
              }`}
            >
              Drivers Championship
            </button>
            <button
              onClick={() => setTab('CONSTRUCTORS')}
              className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition ${
                tab === 'CONSTRUCTORS'
                  ? 'bg-[#E10600] text-white shadow-lg shadow-[#E10600]/30'
                  : 'bg-[#24272D] text-[#AEB4BE] hover:text-white'
              }`}
            >
              Constructors Championship
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {tab === 'DRIVERS' ? (
          <div className="space-y-6">
            {/* Top 3 Podium Cards */}
            <div className="grid md:grid-cols-3 gap-4 mb-8">
              {MOCK_DRIVER_STANDINGS.slice(0, 3).map((s, idx) => {
                const driver = MOCK_DRIVERS[s.driverId];
                const team = MOCK_TEAMS[s.teamId];
                if (!driver) return null;

                return (
                  <div
                    key={s.driverId}
                    className="relative bg-[#24272D] border border-white/5 rounded-2xl p-6 overflow-hidden shadow-xl"
                  >
                    <div className="h-1.5 absolute top-0 inset-x-0" style={{ backgroundColor: team?.color }} />
                    <div className="flex items-start justify-between">
                      <span className="font-mono text-3xl font-black text-white/20">#{idx + 1}</span>
                      <span className="text-sm font-bold font-mono text-[#00B8D9]">{s.points} PTS</span>
                    </div>

                    <div className="flex items-center gap-4 my-4">
                      {driver.imageUrl && (
                        <img
                          src={driver.imageUrl}
                          alt={driver.name}
                          className="w-16 h-16 rounded-full object-cover object-top border-2 border-white/10 shrink-0 shadow-lg"
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
                      <span>{s.wins} Wins</span>
                      <span>{s.podiums} Podiums</span>
                      <span>{s.poles} Poles</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Complete Driver Table */}
            <div className="bg-[#24272D] border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
              <div className="hidden sm:grid grid-cols-[3rem_1fr_8rem_5rem_4rem_4rem_4rem_4rem] gap-2 px-6 py-3 border-b border-white/10 text-[10px] font-bold text-[#AEB4BE] uppercase tracking-wider">
                <span>POS</span>
                <span>DRIVER</span>
                <span>TEAM</span>
                <span className="text-right">POINTS</span>
                <span className="text-right">WINS</span>
                <span className="text-right">PODS</span>
                <span className="text-right">POLES</span>
                <span className="text-right">FL</span>
              </div>

              <div className="divide-y divide-white/5">
                {MOCK_DRIVER_STANDINGS.map((s) => {
                  const driver = MOCK_DRIVERS[s.driverId];
                  const team = MOCK_TEAMS[s.teamId];
                  if (!driver) return null;
                  const isLeader = s.position === 1;

                  return (
                    <div
                      key={s.driverId}
                      className={`flex sm:grid grid-cols-[3rem_1fr_8rem_5rem_4rem_4rem_4rem_4rem] gap-2 items-center px-6 py-3.5 hover:bg-white/5 transition-colors ${
                        isLeader ? 'bg-yellow-400/5' : ''
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className={`font-mono font-bold text-sm ${isLeader ? 'text-yellow-400' : 'text-[#AEB4BE]'}`}>
                          {s.position}
                        </span>
                      </div>

                      <div className="flex items-center gap-3 min-w-0">
                        {driver.imageUrl && (
                          <img
                            src={driver.imageUrl}
                            alt={driver.name}
                            className="w-7 h-7 rounded-full object-cover object-top border border-white/10 shrink-0"
                          />
                        )}
                        <span className="font-bold text-sm text-white truncate">{driver.name}</span>
                        {isLeader && <Trophy size={13} className="text-yellow-400 shrink-0" />}
                      </div>

                      <div className="text-xs font-semibold truncate" style={{ color: team?.color }}>
                        {team?.name}
                      </div>

                      <div className="text-right font-mono font-black text-sm text-white">{s.points}</div>
                      <div className="text-right font-mono text-xs text-[#AEB4BE]">{s.wins}</div>
                      <div className="text-right font-mono text-xs text-[#AEB4BE]">{s.podiums}</div>
                      <div className="text-right font-mono text-xs text-[#AEB4BE]">{s.poles}</div>
                      <div className="text-right font-mono text-xs text-[#AEB4BE]">{s.fastestLaps}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          /* Complete Constructors Table */
          <div className="bg-[#24272D] border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
            <div className="hidden sm:grid grid-cols-[3rem_1fr_8rem_5rem_4rem_4rem_4rem] gap-2 px-6 py-3 border-b border-white/10 text-[10px] font-bold text-[#AEB4BE] uppercase tracking-wider">
              <span>POS</span>
              <span>CONSTRUCTOR</span>
              <span>DRIVERS</span>
              <span className="text-right">POINTS</span>
              <span className="text-right">WINS</span>
              <span className="text-right">PODS</span>
              <span className="text-right">POLES</span>
            </div>

            <div className="divide-y divide-white/5">
              {MOCK_CONSTRUCTOR_STANDINGS.map((s) => {
                const team = MOCK_TEAMS[s.teamId];
                if (!team) return null;
                const isLeader = s.position === 1;

                return (
                  <div
                    key={s.teamId}
                    className={`flex sm:grid grid-cols-[3rem_1fr_8rem_5rem_4rem_4rem_4rem] gap-2 items-center px-6 py-4 hover:bg-white/5 transition-colors ${
                      isLeader ? 'bg-yellow-400/5' : ''
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className={`font-mono font-bold text-sm ${isLeader ? 'text-yellow-400' : 'text-[#AEB4BE]'}`}>
                        {s.position}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 min-w-0">
                      {team.logoUrl && (
                        <img
                          src={team.logoUrl}
                          alt={team.name}
                          className="h-6 w-auto max-w-[80px] object-contain shrink-0"
                        />
                      )}
                      <span className="font-bold text-base text-white truncate">{team.name}</span>
                    </div>

                    <div className="text-xs text-[#AEB4BE] font-mono">
                      {team.drivers.join(' / ')}
                    </div>

                    <div className="text-right font-mono font-black text-base text-white">{s.points}</div>
                    <div className="text-right font-mono text-xs text-[#AEB4BE]">{s.wins}</div>
                    <div className="text-right font-mono text-xs text-[#AEB4BE]">{s.podiums}</div>
                    <div className="text-right font-mono text-xs text-[#AEB4BE]">{s.poles}</div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
