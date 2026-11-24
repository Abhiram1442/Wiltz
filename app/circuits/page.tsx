import { MOCK_CIRCUITS } from '@/lib/mock-data';
import { PageHeader } from '@/components/layout/PageHeader';
import { StaggeredGrid } from '@/components/layout/StaggeredGrid';
import { CircuitCard } from '@/components/cards/CircuitCard';
import { Compass } from 'lucide-react';

export const metadata = {
  title: 'Circuits & Grand Prix Venues — WILTZ F1',
  description: 'Formula 1 racing circuits, lap records, track lengths, number of laps, and race distances.',
};

export default function CircuitsPage() {
  const circuits = Object.values(MOCK_CIRCUITS);

  return (
    <div className="min-h-screen text-white pb-20">
      <PageHeader
        label="Global Championship Venues"
        title="2025 Circuits"
        description="Circuit telemetry, track geometry, lap records, race distances, and corner profiles."
        accentColor="#e10600"
      />

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-gray-400 uppercase tracking-wider">
            <Compass size={14} className="text-[#00d2be]" />
            <span>{circuits.length} World Championship Venues</span>
          </div>
        </div>

        <StaggeredGrid className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {circuits.map((circuit) => (
            <CircuitCard key={circuit.id} circuit={circuit} />
          ))}
        </StaggeredGrid>
      </div>
    </div>
  );
}
