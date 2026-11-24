'use client';

import { Driver, Team, DriverCareerStats } from '@/types/f1';
import Link from 'next/link';
import { Trophy, Flag, ChevronRight, Zap } from 'lucide-react';

interface AnimatedDriverCardProps {
  driver: Driver;
  team?: Team;
  rank: number;
  points: number;
  career?: DriverCareerStats;
}

export function AnimatedDriverCard({ driver, team, rank, points, career }: AnimatedDriverCardProps) {
  const teamColor = team?.color || '#e10600';

  return (
    <Link
      href={`/drivers/${driver.id}`}
      className="group relative rounded-2xl f1-card-interactive flex flex-col justify-between overflow-hidden border border-white/10 hover:border-[#e10600]/60 transition-all duration-300"
      style={{
        boxShadow: `0 10px 30px -15px ${teamColor}33`,
      }}
    >
      {/* Top Accent Blade matching Team Color */}
      <div 
        className="h-1.5 w-full relative z-20" 
        style={{ 
          background: `linear-gradient(90deg, ${teamColor}, ${teamColor}88 60%, transparent)` 
        }} 
      />

      {/* Atmospheric Background Glow */}
      <div 
        className="absolute -top-12 -right-12 w-48 h-48 rounded-full blur-3xl opacity-10 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none"
        style={{ backgroundColor: teamColor }}
      />

      {/* Giant Ghost Number in Background */}
      <div className="absolute right-3 top-6 font-black italic text-7xl select-none pointer-events-none text-white/[0.04] group-hover:text-white/[0.08] transition-colors duration-300 font-mono">
        {driver.number}
      </div>

      <div className="p-5 relative z-10">
        {/* Top Header: Rank + Flag + Team Pill */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-black/60 border border-white/10 text-xs font-black font-mono text-white">
              P{rank}
            </span>
            <span className="text-lg" title={driver.nationality}>
              {driver.flagEmoji}
            </span>
          </div>

          <div 
            className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border"
            style={{ 
              borderColor: `${teamColor}40`, 
              backgroundColor: `${teamColor}15`,
              color: teamColor === '#ffffff' ? '#ffffff' : teamColor
            }}
          >
            {team?.shortName || driver.team}
          </div>
        </div>

        {/* Driver Portrait Stage with Hover Parallax Lift */}
        <div className="relative h-44 my-2 flex items-end justify-center overflow-hidden">
          {/* Subtle Stage Gradient */}
          <div className="absolute inset-0 bg-radial from-white/5 to-transparent rounded-xl pointer-events-none" />

          {driver.imageUrl ? (
            <img
              src={driver.imageUrl}
              alt={driver.name}
              className="h-44 w-auto object-contain transform translate-y-2 group-hover:scale-108 group-hover:-translate-y-1 transition-all duration-500 ease-out drop-shadow-[0_12px_20px_rgba(0,0,0,0.8)]"
              loading="lazy"
            />
          ) : (
            <div className="h-32 w-32 rounded-full bg-white/5 flex items-center justify-center text-3xl font-black text-white/30 border border-white/10">
              {driver.abbreviation}
            </div>
          )}

          {/* Glowing Speed Accent underneath driver */}
          <div 
            className="absolute bottom-0 w-3/4 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-[1px]"
            style={{ backgroundColor: teamColor }}
          />
        </div>

        {/* Driver Identity */}
        <div className="mt-3">
          <div className="flex items-baseline justify-between">
            <div className="text-[11px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
              <span>{driver.abbreviation}</span>
              <span className="text-white/30">&bull;</span>
              <span className="text-white font-mono font-bold">#{driver.number}</span>
            </div>
            <div className="text-sm font-black font-mono text-[#00d2be]">
              {points} <span className="text-[10px] text-gray-400 font-normal">PTS</span>
            </div>
          </div>

          <h3 className="text-xl font-black text-white tracking-tight leading-tight mt-0.5 group-hover:text-[#e10600] transition-colors">
            {driver.name}
          </h3>
        </div>

        {/* Quick Career Telemetry Strip */}
        {career && (
          <div className="grid grid-cols-3 gap-1.5 mt-4 pt-3 border-t border-white/5 text-center">
            <div className="bg-black/30 rounded-lg py-1.5 px-1 border border-white/5">
              <div className="text-[9px] font-bold text-gray-400 uppercase">Podiums</div>
              <div className="text-xs font-black font-mono text-white mt-0.5">{career.podiums}</div>
            </div>
            <div className="bg-black/30 rounded-lg py-1.5 px-1 border border-white/5">
              <div className="text-[9px] font-bold text-gray-400 uppercase">GPs</div>
              <div className="text-xs font-black font-mono text-white mt-0.5">{career.starts ?? career.raceStarts ?? 0}</div>
            </div>
            <div className="bg-black/30 rounded-lg py-1.5 px-1 border border-white/5">
              <div className="text-[9px] font-bold text-gray-400 uppercase">Titles</div>
              <div className="text-xs font-black font-mono text-yellow-400 mt-0.5 flex items-center justify-center gap-0.5">
                {(career.worldChampionships ?? career.championships ?? 0) > 0 ? (
                  <>
                    <Trophy size={11} className="text-yellow-400 fill-yellow-400" />
                    <span>{career.worldChampionships ?? career.championships ?? 0}</span>
                  </>
                ) : (
                  <span>0</span>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Interactive Bottom Bar */}
      <div className="px-5 py-2.5 bg-black/40 border-t border-white/5 flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-gray-400 group-hover:text-white transition-colors relative z-10">
        <span className="flex items-center gap-1.5">
          <Zap size={12} className="text-[#e10600] group-hover:animate-bounce" />
          <span>Profile & Telemetry</span>
        </span>
        <ChevronRight size={14} className="transform group-hover:translate-x-1 transition-transform text-[#e10600]" />
      </div>
    </Link>
  );
}