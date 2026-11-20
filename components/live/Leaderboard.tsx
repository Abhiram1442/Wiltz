'use client';

import { useState } from 'react';
import { LivePosition, LiveRaceData } from '@/types/f1';
import { MOCK_DRIVERS, MOCK_TEAMS } from '@/lib/mock-data';
import { TyreBadge } from '@/components/ui/TyreBadge';
import { TeamColorBar } from '@/components/ui/TeamColorBar';
import { formatPositionChange, getDriverStatusColor } from '@/lib/utils';
import { Trophy, Zap, ChevronRight } from 'lucide-react';

interface LeaderboardProps {
  data: LiveRaceData;
  onSelectDriver?: (driver: typeof MOCK_DRIVERS[string]) => void;
}

export function Leaderboard({ data, onSelectDriver }: LeaderboardProps) {
  const [selectedDriver, setSelectedDriver] = useState<string | null>(null);

  const handleRowClick = (driverId: string) => {
    const next = selectedDriver === driverId ? null : driverId;
    setSelectedDriver(next);
    if (next && MOCK_DRIVERS[next]) {
      onSelectDriver?.(MOCK_DRIVERS[next]);
    }
  };

  return (
    <div className="bg-[#24272D] border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
      {/* Table header */}
      <div className="hidden md:grid grid-cols-[2.5rem_1fr_8rem_4.5rem_3.5rem_5.5rem_4rem_5rem] gap-2 px-6 py-3 border-b border-white/10 text-[10px] font-bold text-[#AEB4BE] uppercase tracking-wider">
        <span>POS</span>
        <span>DRIVER</span>
        <span>TEAM</span>
        <span className="text-center">TYRE</span>
        <span className="text-right">LAP</span>
        <span className="text-right">GAP / INT</span>
        <span className="text-center">PITS</span>
        <span className="text-right">STATUS</span>
      </div>

      <div className="divide-y divide-white/5">
        {data.positions.map((pos) => {
          const driver = MOCK_DRIVERS[pos.driverId];
          const team = MOCK_TEAMS[driver?.teamId ?? ''];
          const posChange = formatPositionChange(pos.position, pos.previousPosition);
          const statusColor = getDriverStatusColor(pos.status);
          const isLeader = pos.position === 1;
          const hasFastestLap = pos.driverId === data.fastestLap?.driverId;
          const isSelected = selectedDriver === pos.driverId;
          const isDNF = pos.status === 'DNF' || pos.status === 'OUT';

          if (!driver) return null;

          return (
            <button
              key={pos.driverId}
              onClick={() => handleRowClick(pos.driverId)}
              className={`
                w-full text-left transition-colors cursor-pointer
                ${isLeader ? 'bg-yellow-400/5 border-l-2 border-l-yellow-400' : 'hover:bg-white/5'}
                ${isSelected ? 'bg-white/10 border-l-2 border-l-[#E10600]' : ''}
                ${isDNF ? 'opacity-40' : ''}
              `}
            >
              {/* Mobile layout */}
              <div className="md:hidden flex items-center gap-3 px-4 py-3">
                <TeamColorBar teamId={driver.teamId} />
                <span className="w-6 text-center font-mono font-black text-sm text-white">{pos.position}</span>

                {driver.imageUrl && (
                  <img
                    src={driver.imageUrl}
                    alt={driver.name}
                    className="w-9 h-9 rounded-full bg-black/40 border border-white/10 object-cover object-top shrink-0"
                    loading="lazy"
                  />
                )}

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-sm text-white">{driver.abbreviation}</span>
                    <span className="text-xs text-[#AEB4BE] font-mono">#{driver.number}</span>
                    {hasFastestLap && <Zap size={12} className="text-purple-400" />}
                    {isLeader && <Trophy size={12} className="text-yellow-400" />}
                  </div>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    {team?.logoUrl && (
                      <img src={team.logoUrl} alt={team.name} className="w-4 h-4 object-contain" />
                    )}
                    <span className="text-xs text-[#AEB4BE] truncate">{team?.shortName}</span>
                  </div>
                </div>

                <div className="text-right">
                  <div className="font-mono text-xs font-bold text-white">{pos.gapToLeader}</div>
                  <div className="flex items-center justify-end gap-1 mt-0.5">
                    <TyreBadge compound={pos.tyre} size="sm" />
                    <span className="text-[10px] text-[#AEB4BE]">{pos.tyreAge}L</span>
                  </div>
                </div>
              </div>

              {/* Desktop layout */}
              <div className="hidden md:grid grid-cols-[2.5rem_1fr_8rem_4.5rem_3.5rem_5.5rem_4rem_5rem] gap-2 items-center px-6 py-3.5">
                {/* POS */}
                <div className="flex items-center gap-2">
                  <TeamColorBar teamId={driver.teamId} />
                  <span className={`font-mono font-black text-sm ${isLeader ? 'text-yellow-400' : 'text-white'}`}>
                    {pos.position}
                  </span>
                </div>

                {/* DRIVER WITH FACE */}
                <div className="flex items-center gap-3 min-w-0">
                  {driver.imageUrl ? (
                    <img
                      src={driver.imageUrl}
                      alt={driver.name}
                      className="w-8 h-8 rounded-full bg-black/40 border border-white/10 object-cover object-top shrink-0 shadow-md"
                      loading="lazy"
                    />
                  ) : (
                    <span className="text-sm">{driver.flagEmoji}</span>
                  )}
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-black text-sm text-white tracking-wide">{driver.abbreviation}</span>
                      <span className="hidden xl:block text-xs text-[#AEB4BE] truncate">{driver.name}</span>
                      {hasFastestLap && (
                        <span className="flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[9px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                          <Zap size={9} /> FL
                        </span>
                      )}
                      {isLeader && (
                        <Trophy size={12} className="text-yellow-400 shrink-0" />
                      )}
                    </div>
                    <div className="text-[11px] text-[#AEB4BE] font-mono">#{driver.number} &bull; {driver.nationality}</div>
                  </div>
                </div>

                {/* TEAM WITH LOGO */}
                <div className="flex items-center gap-2 text-xs font-semibold text-white truncate">
                  {team?.logoUrl && (
                    <img src={team.logoUrl} alt={team.name} className="h-5 w-auto max-w-[28px] object-contain shrink-0" />
                  )}
                  <span className="truncate" style={{ color: team?.color }}>{team?.shortName}</span>
                </div>

                {/* TYRE */}
                <div className="flex items-center justify-center gap-1.5">
                  <TyreBadge compound={pos.tyre} size="sm" />
                  <span className="font-mono text-xs text-[#AEB4BE]">{pos.tyreAge}L</span>
                </div>

                {/* LAP */}
                <div className="text-right font-mono text-xs text-[#AEB4BE]">
                  {pos.lap}
                </div>

                {/* GAP */}
                <div className="text-right font-mono text-xs font-bold text-white">
                  {pos.gapToLeader}
                </div>

                {/* PITS */}
                <div className="text-center font-mono text-xs text-[#AEB4BE]">
                  {pos.pitStops}
                </div>

                {/* STATUS */}
                <div className="text-right">
                  <span className={`text-[10px] font-bold font-mono px-2 py-0.5 rounded ${statusColor}`}>
                    {pos.status}
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
