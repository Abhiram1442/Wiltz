'use client';

import { useState } from 'react';
import { MOCK_LIVE_RACE, MOCK_DRIVERS, MOCK_TEAMS } from '@/lib/mock-data';
import { RaceHeader } from '@/components/live/RaceHeader';
import { Leaderboard } from '@/components/live/Leaderboard';
import { RaceEventFeed } from '@/components/live/RaceEventFeed';
import { FastestLapCard } from '@/components/live/FastestLapCard';
import { PitStopTracker } from '@/components/live/PitStopTracker';
import { CircuitInfoCard } from '@/components/live/CircuitInfoCard';
import { GapVisualization } from '@/components/live/GapVisualization';
import { TyreStrategy } from '@/components/live/TyreStrategy';
import { VirtualTrackView } from '@/components/live/VirtualTrackView';
import { Driver } from '@/types/f1';

export default function LivePage() {
  const data = MOCK_LIVE_RACE;
  const race = data.race;
  const circuit = data.circuit;

  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);

  const team = selectedDriver ? MOCK_TEAMS[selectedDriver.teamId] : null;
  const teamColor = team ? team.color : '#e10600';

  const lapProgress = race.currentLap && race.totalLaps
    ? (race.currentLap / race.totalLaps) * 100
    : 0;

  return (
    <div className="min-h-screen text-white pb-20">
      {/* Sticky Race Progress Bar */}
      <div className="sticky top-16 z-40 bg-[#07080a]/95 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-2 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#e10600] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#e10600]" />
            </span>
            <span className="font-mono text-xs font-black text-white uppercase">{race.name}</span>
            <span className="text-[10px] text-[#a1a8b3] font-mono">
              LAP {race.currentLap ?? 0}/{race.totalLaps ?? 53}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-32 h-1.5 rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full rounded-full bg-[#e10600] transition-all duration-500"
                style={{ width: `${lapProgress}%` }}
              />
            </div>
            <span className="text-[10px] font-mono text-[#00d2be] font-bold">
              {data.positions[0] ? MOCK_DRIVERS[data.positions[0].driverId]?.abbreviation : ''} P1
            </span>
          </div>
        </div>
      </div>

      {/* Race header */}
      <RaceHeader
        raceName={race.name}
        circuitName={circuit.name}
        country={race.country}
        currentLap={race.currentLap ?? 0}
        totalLaps={race.totalLaps ?? 53}
        raceStatus={race.raceStatus ?? 'GREEN_FLAG'}
        lastUpdated={data.lastUpdated}
        dataSource={data.dataSource}
      />

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 space-y-6">
        {/* Virtual Track View — primary visual */}
        <section aria-labelledby="virtual-track-heading" className="animate-fade-up">
          <div className="flex items-center justify-between mb-3">
            <h2 id="virtual-track-heading" className="section-header">VIRTUAL TRACK VIEW</h2>
            <span className="text-[11px] text-gray-400">Click any car marker or leaderboard row to focus</span>
          </div>
          <VirtualTrackView
            circuitKey="albert-park"
            selectedDriverId={selectedDriver?.id}
            onSelectDriver={(driver: Driver) => setSelectedDriver(driver)}
          />
        </section>

        {/* Selected Driver Drawer */}
        {selectedDriver && (
          <div className="bg-[#0e1015]/85 backdrop-blur-xl border border-[#e10600]/40 rounded-2xl p-4 flex items-center justify-between shadow-2xl animate-fade-up">
            <div className="flex items-center gap-4">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center font-black text-xl font-mono text-white shadow-lg"
                style={{ backgroundColor: teamColor }}
              >
                {selectedDriver.number}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-black text-lg text-white">{selectedDriver.name}</h3>
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-white/10 text-gray-300">
                    {selectedDriver.abbreviation}
                  </span>
                </div>
                <p className="text-xs text-gray-400">{selectedDriver.team} &bull; {selectedDriver.nationality}</p>
              </div>
            </div>
            <button
              onClick={() => setSelectedDriver(null)}
              className="px-3 py-1.5 text-xs bg-white/10 hover:bg-white/20 text-white rounded-lg transition font-bold"
            >
              Clear Focus
            </button>
          </div>
        )}

        {/* Leaderboard */}
        <section aria-labelledby="leaderboard-heading" className="animate-fade-up" style={{ animationDelay: '100ms' }}>
          <h2 id="leaderboard-heading" className="section-header mb-3">RACE LEADERBOARD</h2>
          <Leaderboard
            data={data}
            onSelectDriver={(driver: Driver) => setSelectedDriver(driver)}
          />
        </section>

        {/* Events + Gap Chart */}
        <div className="grid lg:grid-cols-[1fr_320px] xl:grid-cols-[1fr_360px] gap-6">
          <section aria-labelledby="events-heading" className="animate-fade-up" style={{ animationDelay: '150ms' }}>
            <h2 id="events-heading" className="section-header mb-3">LIVE EVENTS</h2>
            <RaceEventFeed events={data.events} />
          </section>

          <section aria-labelledby="gap-heading" className="animate-fade-up" style={{ animationDelay: '200ms' }}>
            <h2 id="gap-heading" className="section-header mb-3">GAP CHART</h2>
            <GapVisualization positions={data.positions} maxDrivers={12} />
          </section>
        </div>

        {/* Bottom panels */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <section className="animate-fade-up" style={{ animationDelay: '250ms' }}>
            {data.fastestLap && <FastestLapCard fastestLap={data.fastestLap} />}
          </section>
          <section className="animate-fade-up" style={{ animationDelay: '300ms' }}>
            <PitStopTracker pitStops={data.pitStops} />
          </section>
          <section className="animate-fade-up" style={{ animationDelay: '350ms' }}>
            <TyreStrategy positions={data.positions} />
          </section>
          <section className="animate-fade-up" style={{ animationDelay: '400ms' }}>
            <CircuitInfoCard circuit={circuit} weather={data.weather} />
          </section>
        </div>
      </div>
    </div>
  );
}
