import { MOCK_CIRCUITS } from '@/lib/mock-data';
import { MockDataBanner } from '@/components/ui/MockDataBanner';
import { CircuitCard } from '@/components/cards/CircuitCard';
import { Compass, Trophy } from 'lucide-react';

export const metadata = {
  title: 'Circuits & Grand Prix Venues — WILTZ F1 Live',
  description: 'Formula 1 racing circuits, lap records, track lengths, number of laps, and race distances.',
};

export default function CircuitsPage() {
  const circuits = Object.values(MOCK_CIRCUITS);

  return (
    <div className="min-h-screen text-white pb-20">
      <MockDataBanner />

      {/* Cinematic Motorsport Header */}
      <div className="relative border-b border-white/10 py-12 overflow-hidden bg-gradient-to-b from-[#0e1015] via-[#07080a] to-[#07080a]">
        {/* Ambient Top Glow */}
        <div className="absolute top-0 left-1/3 w-96 h-48 bg-[#e10600]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#e10600] animate-pulse" />
            <span className="text-xs font-mono font-bold text-[#e10600] uppercase tracking-widest">
              Global Championship Venues
            </span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-white leading-none">
            2025 Circuits
          </h1>
          <p className="text-sm text-gray-400 mt-3 max-w-2xl font-medium">
            Explore verified circuit telemetry, track geometry, lap records, race distances, and corner profiles across the globe.
          </p>
        </div>
      </div>

      {/* Circuits Grid */}
      <div className="container mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-gray-400 uppercase tracking-wider">
            <Compass size={14} className="text-[#00d2be]" />
            <span>24 World Championship Venues</span>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {circuits.map((circuit) => (
            <CircuitCard key={circuit.id} circuit={circuit} />
          ))}
        </div>
      </div>
    </div>
  );
}