'use client';

import { Team, Driver } from '@/types/f1';
import Link from 'next/link';
import { Trophy, ChevronRight, Gauge, Cpu } from 'lucide-react';

interface ConstructorCardProps {
  team: Team;
  rank: number;
  points: number;
  drivers: Driver[];
}

export function ConstructorCard({ team, rank, points, drivers }: ConstructorCardProps) {
  const teamColor = team.color || '#e10600';

  return (
    <Link
      href={`/teams/${team.id}`}
      className="group relative rounded-2xl f1-card-interactive flex flex-col justify-between overflow-hidden border border-white/10 hover:border-[#e10600]/60 transition-all duration-300"
      style={{
        boxShadow: `0 10px 30px -15px ${teamColor}33`,
      }}
    >
      {/* Top Brand Stripe */}
      <div 
        className="h-1.5 w-full relative z-20"
        style={{ 
          background: `linear-gradient(90deg, ${teamColor}, ${teamColor}99 60%, transparent)` 
        }}
      />

      {/* Atmospheric Radial Aura */}
      <div 
        className="absolute -top-16 -right-16 w-56 h-56 rounded-full blur-3xl opacity-10 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none"
        style={{ backgroundColor: teamColor }}
      />

      <div className="p-6 relative z-10">
        {/* Header: Position Rank + Team Logo */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="flex items-center justify-center px-2.5 py-1 rounded-lg bg-black/60 border border-white/10 text-xs font-black font-mono text-white">
              P{rank}
            </span>
            <span className="text-xs font-mono font-bold text-gray-400">
              {team.nationality}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {team.logoUrl ? (
              <img
                src={team.logoUrl}
                alt={team.name}
                className="h-8 w-auto max-w-[120px] object-contain group-hover:scale-105 transition-transform"
                loading="lazy"
              />
            ) : (
              <span className="font-mono text-2xl font-black text-white/20">#{rank}</span>
            )}
          </div>
        </div>

        {/* ── ANIMATED F1 CAR SHOWCASE ── */}
        <div className="relative h-32 my-3 rounded-xl bg-gradient-to-tr from-black/60 via-[#10131a] to-black/30 flex items-center justify-center overflow-hidden border border-white/5 group-hover:border-white/15 transition-all">
          {/* Subtle Speed Lines Background */}
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

          {/* Car Ghosted/Watermarked Brand Mark */}
          {team.logoUrl && (
            <img
              src={team.logoUrl}
              alt={team.name}
              className="absolute h-24 w-auto object-contain opacity-10 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"
            />
          )}

          {/* Animated 3D Perspective F1 Car */}
          <div className="relative z-10 w-full px-4 flex items-center justify-center transform group-hover:translate-x-3 group-hover:scale-105 transition-all duration-500 ease-out">
            <img
              src={team.carImageUrl || team.logoUrl || 'https://media.formula1.com/d_team_car_fallback_image.png/content/dam/fom-website/teams/2024/red-bull-racing.png'}
              alt={`${team.name} F1 Car`}
              className="max-h-24 max-w-[90%] object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)] filter brightness-95 group-hover:brightness-110"
              loading="lazy"
            />
          </div>

          {/* Chassis + Power Unit Telemetry Callout */}
          <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-[10px] font-mono uppercase tracking-wider">
            <span className="text-[#00d2be] font-bold flex items-center gap-1">
              <Gauge size={11} /> {team.chassis}
            </span>
            <span className="text-gray-400 font-bold flex items-center gap-1">
              <Cpu size={11} /> {team.powerUnit}
            </span>
          </div>
        </div>

        {/* Team Identity & Points */}
        <div className="mt-4 flex items-start justify-between">
          <div>
            <h3 className="text-xl font-black text-white tracking-tight leading-tight group-hover:text-[#e10600] transition-colors">
              {team.name}
            </h3>
            <p className="text-xs text-gray-400 mt-0.5">
              Base: <span className="text-gray-300">{team.base}</span>
            </p>
          </div>
          <div className="text-right">
            <div className="text-base font-black font-mono text-[#00d2be]">
              {points}
            </div>
            <div className="text-[10px] font-bold text-gray-400 tracking-wider">
              PTS
            </div>
          </div>
        </div>

        {/* Driver Lineup Badges with Portraits */}
        <div className="mt-5 space-y-1.5">
          <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider flex items-center justify-between">
            <span>2025 Lineup</span>
            {team.championships !== undefined && team.championships > 0 && (
              <span className="flex items-center gap-1 text-yellow-400 font-mono">
                <Trophy size={11} className="fill-yellow-400" />
                <span>{team.championships} Titles</span>
              </span>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2">
            {drivers.map((driver) => (
              <div
                key={driver.id}
                className="flex items-center gap-2 p-2 rounded-xl bg-black/40 border border-white/5 hover:border-white/20 transition"
              >
                {driver.imageUrl ? (
                  <img
                    src={driver.imageUrl}
                    alt={driver.name}
                    className="w-7 h-7 rounded-full object-cover bg-white/5 border border-white/10"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-[10px] font-bold font-mono text-white">
                    {driver.abbreviation}
                  </div>
                )}
                <div className="min-w-0">
                  <div className="text-xs font-bold text-white truncate">
                    {driver.name.split(' ').pop()}
                  </div>
                  <div className="text-[10px] font-mono text-gray-400">
                    #{driver.number} &bull; {driver.abbreviation}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Card Footer */}
      <div className="px-6 py-3 bg-black/40 border-t border-white/5 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-gray-400 group-hover:text-white transition relative z-10">
        <span>Team Garage & Specs</span>
        <ChevronRight size={14} className="text-[#e10600] transform group-hover:translate-x-1 transition-transform" />
      </div>
    </Link>
  );
}