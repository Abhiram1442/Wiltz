'use client';

import { Circuit } from '@/types/f1';
import Link from 'next/link';
import { Trophy, Gauge, Compass, MapPin, ChevronRight, Flag } from 'lucide-react';

interface CircuitCardProps {
  circuit: Circuit;
}

export function CircuitCard({ circuit }: CircuitCardProps) {
  return (
    <div className="group rounded-2xl f1-card-interactive flex flex-col justify-between overflow-hidden border border-white/10 hover:border-[#e10600]/60 transition-all duration-300">
      {/* Top Accent Blade */}
      <div className="h-1.5 w-full bg-gradient-to-r from-[#e10600] via-[#00d2be]/70 to-transparent relative z-20" />

      <div>
        {/* Track Visual Stage */}
        <div className="relative h-48 bg-gradient-to-b from-[#161a24] via-[#0d1017] to-[#0a0c10] flex items-center justify-center p-6 border-b border-white/5 overflow-hidden">
          {/* Subtle Radar/Grid background */}
          <div 
            className="absolute inset-0 opacity-15 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(rgba(255,255,255,0.25) 1px, transparent 1px)',
              backgroundSize: '16px 16px',
            }}
          />

          {/* Glowing Speed Beam */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#e10600]/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />

          {/* Centerpiece Vector/Emblem */}
          <div className="relative text-center z-10 transform group-hover:scale-105 transition-transform duration-500">
            <span className="text-5xl block mb-2 drop-shadow-md">{circuit.flagEmoji}</span>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/50 border border-white/10 text-xs font-mono font-bold text-[#00d2be] uppercase tracking-wider">
              <MapPin size={12} className="text-[#e10600]" />
              <span>{circuit.city}, {circuit.country}</span>
            </div>
          </div>

          {/* Corner Watermark */}
          <div className="absolute right-3 bottom-2 text-xs font-mono font-bold text-white/10 select-none">
            {circuit.laps} LAPS
          </div>
        </div>

        <div className="p-6">
          {/* Circuit Title */}
          <h3 className="font-black text-2xl text-white tracking-tight leading-snug mb-4 group-hover:text-[#e10600] transition-colors">
            {circuit.name}
          </h3>

          {/* Telemetry Metric Grid */}
          <div className="grid grid-cols-2 gap-2.5">
            <div className="bg-black/40 border border-white/5 rounded-xl p-3">
              <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider flex items-center gap-1">
                <Compass size={11} className="text-[#00d2be]" />
                <span>Track Length</span>
              </div>
              <div className="text-sm font-black font-mono text-white mt-1">
                {circuit.trackLength} <span className="text-[10px] text-gray-400 font-normal">KM</span>
              </div>
            </div>

            <div className="bg-black/40 border border-white/5 rounded-xl p-3">
              <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider flex items-center gap-1">
                <Flag size={11} className="text-[#e10600]" />
                <span>Total Laps</span>
              </div>
              <div className="text-sm font-black font-mono text-white mt-1">
                {circuit.laps} <span className="text-[10px] text-gray-400 font-normal">LAPS</span>
              </div>
            </div>

            <div className="bg-black/40 border border-white/5 rounded-xl p-3">
              <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider flex items-center gap-1">
                <Gauge size={11} className="text-yellow-400" />
                <span>Race Distance</span>
              </div>
              <div className="text-sm font-black font-mono text-white mt-1">
                {circuit.raceDistance} <span className="text-[10px] text-gray-400 font-normal">KM</span>
              </div>
            </div>

            <div className="bg-black/40 border border-white/5 rounded-xl p-3">
              <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Timezone</div>
              <div className="text-xs font-black font-mono text-white mt-1 truncate">
                {circuit.timezone.split('/')[1] || circuit.timezone}
              </div>
            </div>
          </div>

          {/* Official Lap Record Badge */}
          <div className="mt-4 p-3 bg-gradient-to-r from-purple-950/30 to-black/40 rounded-xl border border-purple-500/20 flex items-start gap-3">
            <Trophy size={16} className="text-[#b388ff] shrink-0 mt-0.5" />
            <div className="text-xs">
              <div className="text-gray-400">
                Official Lap Record: <span className="font-bold font-mono text-[#b388ff]">{circuit.lapRecord}</span>
              </div>
              <div className="text-[11px] text-gray-300 font-medium mt-0.5">
                {circuit.lapRecordHolder} <span className="text-gray-500">({circuit.lapRecordYear})</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="px-6 py-3 bg-black/40 border-t border-white/5 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-gray-400 group-hover:text-white transition">
        <span>Circuit Geometry & DRS Zones</span>
        <ChevronRight size={14} className="text-[#e10600] transform group-hover:translate-x-1 transition-transform" />
      </div>
    </div>
  );
}