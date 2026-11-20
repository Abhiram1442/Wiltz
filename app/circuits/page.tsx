import { MOCK_CIRCUITS } from '@/lib/mock-data';
import { MockDataBanner } from '@/components/ui/MockDataBanner';
import { MapPin, Navigation, Trophy, Clock } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Circuits & Grand Prix Venues — F1 LIVE',
  description: 'Formula 1 racing circuits, lap records, track lengths, number of laps, and race distances.',
};

export default function CircuitsPage() {
  const circuits = Object.values(MOCK_CIRCUITS);

  return (
    <div className="min-h-screen bg-[#101114] text-white">
      <MockDataBanner />

      {/* Editorial Header */}
      <div className="bg-[#101114] border-b border-[#24272D] py-10">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#E10600]" />
            <span className="text-xs font-bold text-[#E10600] uppercase tracking-widest">Global Venues</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight">
            World Championship Circuits
          </h1>
          <p className="text-sm text-[#AEB4BE] mt-2 max-w-2xl">
            Explore verified circuit geometry, track telemetry records, lengths, corner profiles, and historical race statistics.
          </p>
        </div>
      </div>

      {/* Circuits Grid */}
      <div className="container mx-auto px-4 py-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {circuits.map((circuit) => (
            <div
              key={circuit.id}
              className="group bg-[#24272D] border border-white/5 rounded-2xl overflow-hidden hover:border-[#E10600]/60 transition-all hover:-translate-y-1.5 shadow-xl flex flex-col justify-between"
            >
              <div>
                {/* Circuit Banner / Top visual */}
                <div className="relative h-44 bg-gradient-to-tr from-black via-[#1c1d21] to-[#24272D] flex items-center justify-center p-6 border-b border-white/5 overflow-hidden">
                  <div
                    className="absolute inset-0 opacity-10 pointer-events-none"
                    style={{
                      backgroundImage: 'radial-gradient(rgba(255,255,255,0.2) 1px, transparent 1px)',
                      backgroundSize: '20px 20px',
                    }}
                  />
                  <div className="relative text-center">
                    <span className="text-4xl block mb-2">{circuit.flagEmoji}</span>
                    <span className="text-xs font-mono font-bold text-[#00B8D9] tracking-widest uppercase">
                      {circuit.city}, {circuit.country}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  {/* Circuit Name */}
                  <h3 className="font-black text-xl text-white tracking-tight leading-snug mb-4 group-hover:text-[#00B8D9] transition-colors">
                    {circuit.name}
                  </h3>

                  {/* Specifications Grid */}
                  <div className="grid grid-cols-2 gap-2.5">
                    {[
                      { label: 'Track Length', value: `${circuit.trackLength} km` },
                      { label: 'Total Laps', value: `${circuit.laps}` },
                      { label: 'Race Distance', value: `${circuit.raceDistance} km` },
                      { label: 'Timezone', value: circuit.timezone.split('/')[1] || circuit.timezone },
                    ].map(({ label, value }) => (
                      <div key={label} className="bg-[#101114]/60 border border-white/5 rounded-xl p-3">
                        <div className="text-[10px] text-[#AEB4BE] font-bold uppercase tracking-wider">{label}</div>
                        <div className="text-sm font-black font-mono text-white mt-0.5">{value}</div>
                      </div>
                    ))}
                  </div>

                  {/* Lap Record Card */}
                  <div className="mt-4 p-3 bg-white/5 rounded-xl border border-white/5 flex items-start gap-3">
                    <Trophy size={16} className="text-yellow-400 shrink-0 mt-0.5" />
                    <div className="text-xs">
                      <span className="text-[#AEB4BE]">Lap Record: </span>
                      <span className="font-bold font-mono text-white">{circuit.lapRecord}</span>
                      <div className="text-[11px] text-[#AEB4BE] mt-0.5">
                        {circuit.lapRecordHolder} ({circuit.lapRecordYear})
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="px-6 py-3 bg-[#101114]/40 border-t border-white/5 flex items-center justify-between text-xs text-[#AEB4BE] group-hover:text-white transition">
                <span>View Circuit Telemetry</span>
                <span className="text-[#00B8D9] font-bold">&rarr;</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
