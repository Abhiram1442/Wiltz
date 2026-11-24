'use client';

import { useState } from 'react';
import { MOCK_DRIVER_STANDINGS, MOCK_CONSTRUCTOR_STANDINGS, MOCK_DRIVERS, MOCK_TEAMS } from '@/lib/mock-data';
import { PageHeader } from '@/components/layout/PageHeader';
import { PointsBar } from '@/components/layout/PointsBar';
import Link from 'next/link';
import { Trophy } from 'lucide-react';

export default function StandingsPage() {
  const [tab, setTab] = useState<'DRIVERS' | 'CONSTRUCTORS'>('DRIVERS');

  const leaderPoints = MOCK_DRIVER_STANDINGS[0]?.points ?? 1;
  const constructorLeaderPoints = MOCK_CONSTRUCTOR_STANDINGS[0]?.points ?? 1;

  return (
    <div className="min-h-screen text-white">
      <PageHeader label="World Championship Table" title="2025 FIA Standings">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setTab('DRIVERS')}
            className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all border ${
              tab === 'DRIVERS'
                ? 'bg-[#e10600] text-white border-[#e10600] shadow-lg shadow-[#e10600]/30'
                : 'bg-[#12151d] text-[#AEB4BE] border-white/5 hover:text-white hover:border-white/20'
            }`}
          >
            Drivers Championship
          </button>
          <button
            onClick={() => setTab('CONSTRUCTORS')}
            className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all border ${
              tab === 'CONSTRUCTORS'
                ? 'bg-[#e10600] text-white border-[#e10600] shadow-lg shadow-[#e10600]/30'
                : 'bg-[#12151d] text-[#AEB4BE] border-white/5 hover:text-white hover:border-white/20'
            }`}
          >
            Constructors Championship
          </button>
        </div>
      </PageHeader>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        {tab === 'DRIVERS' ? (
          <div className="space-y-6 animate-fade-in" key="drivers">
            {/* Top 3 Podium — P2 | P1 (elevated) | P3 */}
            <div className="grid md:grid-cols-3 gap-4 mb-8 items-end">
              {[1, 0, 2].map((idx) => {
                const s = MOCK_DRIVER_STANDINGS[idx];
                if (!s) return null;
                const driver = MOCK_DRIVERS[s.driverId];
                const team = MOCK_TEAMS[s.teamId];
                if (!driver) return null;
                const isChampionshipLeader = idx === 0;

                return (
                  <div
                    key={s.driverId}
                    className={`relative bg-[#14171f] border border-white/5 rounded-2xl overflow-hidden shadow-xl transition-all ${
                      isChampionshipLeader ? 'md:order-2 md:-mt-4 md:pb-2 ring-1 ring-[#e10600]/30' : idx === 1 ? 'md:order-1' : 'md:order-3'
                    }`}
                  >
                    <div
                      className="h-1.5 w-full"
                      style={{ backgroundColor: team?.color }}
                    />

                    <div className="p-6">
                      <div className="flex items-start justify-between">
                        <span className={`font-mono text-3xl font-black ${isChampionshipLeader ? 'text-yellow-400' : 'text-white/20'}`}>
                          P{s.position}
                        </span>
                        <span className="text-sm font-bold font-mono text-[#00d2be]">{s.points} PTS</span>
                      </div>

                      <div className="flex items-center gap-4 my-4">
                        {driver.imageUrl && (
                          <img
                            src={driver.imageUrl}
                            alt={driver.name}
                            className={`rounded-full object-cover object-top border-2 shrink-0 shadow-lg ${
                              isChampionshipLeader ? 'w-20 h-20 border-yellow-400/30' : 'w-16 h-16 border-white/10'
                            }`}
                          />
                        )}
                        <div>
                          <div className="text-xs text-[#AEB4BE] flex items-center gap-1 font-semibold">
                            <span>{driver.flagEmoji}</span>
                            <span>{driver.nationality}</span>
                          </div>
                          <h3 className={`font-black text-white leading-tight ${isChampionshipLeader ? 'text-xl' : 'text-lg'}`}>
                            {driver.name}
                          </h3>
                          <p className="text-xs font-bold mt-0.5" style={{ color: team?.color }}>{team?.name}</p>
                        </div>
                      </div>

                      <PointsBar points={s.points} maxPoints={leaderPoints} color={team?.color} />

                      <div className="flex items-center justify-between text-xs text-[#AEB4BE] pt-3 mt-3 border-t border-white/5 font-mono">
                        <span>{s.wins} Wins</span>
                        <span>{s.podiums} Podiums</span>
                        <span>{s.poles ?? 0} Poles</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Complete Driver Table */}
            <div className="bg-[#14171f] border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
              <div className="hidden sm:grid grid-cols-[3rem_1fr_8rem_1fr_5rem_4rem_4rem_4rem_4rem] gap-2 px-6 py-3 border-b border-white/10 text-[10px] font-bold text-[#AEB4BE] uppercase tracking-wider">
                <span>POS</span>
                <span>DRIVER</span>
                <span>TEAM</span>
                <span></span>
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
                      className={`flex sm:grid grid-cols-[3rem_1fr_8rem_1fr_5rem_4rem_4rem_4rem_4rem] gap-2 items-center px-6 py-3.5 hover:bg-white/5 transition-colors ${
                        isLeader ? 'bg-yellow-400/5' : ''
                      }`}
                    >
                      <div>
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

                      <div className="text-xs font-semibold truncate hidden sm:block" style={{ color: team?.color }}>
                        {team?.name}
                      </div>

                      <div className="hidden sm:block">
                        <PointsBar points={s.points} maxPoints={leaderPoints} color={team?.color} height="h-1" />
                      </div>

                      <div className="text-right font-mono font-black text-sm text-white">{s.points}</div>
                      <div className="text-right font-mono text-xs text-[#AEB4BE] hidden sm:block">{s.wins}</div>
                      <div className="text-right font-mono text-xs text-[#AEB4BE] hidden sm:block">{s.podiums}</div>
                      <div className="text-right font-mono text-xs text-[#AEB4BE] hidden sm:block">{s.poles ?? 0}</div>
                      <div className="text-right font-mono text-xs text-[#AEB4BE] hidden sm:block">{s.fastestLaps ?? 0}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          <div className="animate-fade-in" key="constructors">
            <div className="bg-[#14171f] border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
              <div className="hidden sm:grid grid-cols-[3rem_1fr_8rem_1fr_5rem_4rem_4rem_4rem] gap-2 px-6 py-3 border-b border-white/10 text-[10px] font-bold text-[#AEB4BE] uppercase tracking-wider">
                <span>POS</span>
                <span>CONSTRUCTOR</span>
                <span>DRIVERS</span>
                <span></span>
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
                      className={`flex sm:grid grid-cols-[3rem_1fr_8rem_1fr_5rem_4rem_4rem_4rem] gap-2 items-center px-6 py-4 hover:bg-white/5 transition-colors ${
                        isLeader ? 'bg-yellow-400/5' : ''
                      }`}
                    >
                      <div>
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

                      <div className="text-xs text-[#AEB4BE] font-mono hidden sm:block">
                        {team.drivers.join(' / ')}
                      </div>

                      <div className="hidden sm:block">
                        <PointsBar points={s.points} maxPoints={constructorLeaderPoints} color={team.color} height="h-1" />
                      </div>

                      <div className="text-right font-mono font-black text-base text-white">{s.points}</div>
                      <div className="text-right font-mono text-xs text-[#AEB4BE] hidden sm:block">{s.wins}</div>
                      <div className="text-right font-mono text-xs text-[#AEB4BE] hidden sm:block">{s.podiums}</div>
                      <div className="text-right font-mono text-xs text-[#AEB4BE] hidden sm:block">{s.poles ?? 0}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
