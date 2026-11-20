'use client';

import { useState, useEffect } from 'react';
import { RaceStatus } from '@/types/f1';
import { getRaceStatusColor, getRaceStatusLabel } from '@/lib/utils';
import { Radio, CloudSun, Wind, Thermometer } from 'lucide-react';

interface RaceHeaderProps {
  raceName: string;
  circuitName: string;
  country: string;
  currentLap: number;
  totalLaps: number;
  raceStatus: RaceStatus;
  lastUpdated: string;
  dataSource: 'LIVE' | 'MOCK' | 'CACHED';
}

export function RaceHeader({
  raceName,
  circuitName,
  country,
  currentLap,
  totalLaps,
  raceStatus,
  lastUpdated,
  dataSource,
}: RaceHeaderProps) {
  const [secondsAgo, setSecondsAgo] = useState<number | null>(null);

  useEffect(() => {
    const updateTime = () => {
      const diff = Math.max(0, Math.floor((Date.now() - new Date(lastUpdated).getTime()) / 1000));
      setSecondsAgo(diff);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [lastUpdated]);

  const statusColorClass = getRaceStatusColor(raceStatus);
  const statusLabel = getRaceStatusLabel(raceStatus);

  return (
    <div className="relative bg-[#101114] border-b border-[#24272D] overflow-hidden">
      {/* Background Cinematic Atmosphere */}
      <div
        className="absolute inset-0 opacity-15 pointer-events-none bg-cover bg-center"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1600&q=80")',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#101114] via-[#101114]/90 to-transparent pointer-events-none" />

      <div className="relative container mx-auto px-4 py-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          {/* Left: Race Information */}
          <div className="flex items-start gap-4">
            {/* LIVE badge */}
            {dataSource === 'LIVE' ? (
              <div className="inline-flex items-center gap-1.5 bg-[#E10600] text-white text-xs font-black px-3 py-1 rounded shadow-lg shadow-[#E10600]/40 shrink-0 mt-1">
                <Radio size={12} className="animate-pulse" />
                LIVE
              </div>
            ) : (
              <div className="inline-flex items-center gap-1.5 bg-amber-500/90 text-black text-xs font-black px-2.5 py-1 rounded shrink-0 mt-1 uppercase tracking-wider">
                Simulated
              </div>
            )}

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white">{raceName}</h1>
              </div>
              <p className="text-xs sm:text-sm text-[#AEB4BE] mt-1 flex items-center gap-2">
                <span>{circuitName}</span>
                <span>&bull;</span>
                <span className="text-white font-semibold">{country}</span>
              </p>
            </div>
          </div>

          {/* Right: Weather & Race Status Pills */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            {/* Weather highlights */}
            <div className="hidden sm:flex items-center gap-3 px-3 py-1.5 rounded-xl bg-[#24272D]/80 border border-white/5 text-xs text-[#AEB4BE]">
              <span className="flex items-center gap-1">
                <CloudSun size={14} className="text-amber-400" /> 28°C Air
              </span>
              <span>&bull;</span>
              <span className="flex items-center gap-1">
                <Thermometer size={14} className="text-[#E10600]" /> 44°C Track
              </span>
            </div>

            {/* Status Pill */}
            <div className={`px-4 py-1.5 rounded-xl font-black text-xs uppercase tracking-wider shadow-md ${statusColorClass}`} role="status">
              {statusLabel}
            </div>

            {/* Lap Counter */}
            <div className="border-l border-white/10 pl-4 sm:pl-6 text-right">
              <div className="text-[10px] font-bold tracking-widest text-[#AEB4BE] uppercase">
                Lap Progress
              </div>
              <div className="font-mono text-2xl sm:text-3xl font-black text-white">
                <span>{currentLap}</span>
                <span className="text-base text-[#AEB4BE] font-normal"> / {totalLaps}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Lap progress bar */}
        <div className="mt-4">
          <div
            className="h-1.5 bg-white/10 rounded-full overflow-hidden"
            role="progressbar"
            aria-valuenow={currentLap}
            aria-valuemin={1}
            aria-valuemax={totalLaps}
          >
            <div
              className="h-full bg-[#E10600] rounded-full transition-all duration-1000 shadow-lg shadow-[#E10600]/50"
              style={{ width: `${(currentLap / totalLaps) * 100}%` }}
            />
          </div>
          <div className="flex justify-between mt-1.5 text-[10px] text-[#AEB4BE] font-mono">
            <span>START</span>
            <span>
              {secondsAgo !== null ? `Telemetry sync: ${secondsAgo}s ago` : 'Synced recently'}
            </span>
            <span>FINISH ({totalLaps} LAPS)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
