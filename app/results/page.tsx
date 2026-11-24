import { MOCK_CALENDAR, MOCK_DRIVERS, MOCK_TEAMS } from '@/lib/mock-data';
import { PageHeader } from '@/components/layout/PageHeader';
import Link from 'next/link';
import { formatShortDate } from '@/lib/utils';
import { Trophy, ChevronRight } from 'lucide-react';

export const metadata = {
  title: 'Results — WILTZ F1',
};

export default function ResultsPage() {
  const completed = MOCK_CALENDAR.filter(r => r.status === 'COMPLETED').reverse();

  return (
    <div className="min-h-screen text-white pb-20">
      <PageHeader
        label="2025 Season"
        title="Race Results"
        description="Complete race results, winners, and podium finishes."
      />

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-gray-400 uppercase tracking-wider mb-6">
          <Trophy size={14} className="text-yellow-400" />
          <span>{completed.length} Races Completed</span>
        </div>

        <div className="space-y-4">
          {completed.map((race, i) => {
            const winnerName = race.winner;
            const winnerEntry = winnerName
              ? Object.values(MOCK_DRIVERS).find(d => d.name === winnerName)
              : null;
            const winnerTeam = winnerEntry ? MOCK_TEAMS[winnerEntry.teamId] : null;

            return (
              <Link
                key={race.id}
                href={`/races/${race.id}`}
                className="group block rounded-2xl bg-[#14171f] border border-white/[0.07] hover:border-[#e10600]/50 transition-all duration-300 overflow-hidden animate-fade-up"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <div className="flex items-center gap-5 p-5">
                  {/* Round badge */}
                  <div className="shrink-0 w-12 h-12 rounded-xl bg-black/60 border border-white/10 flex flex-col items-center justify-center">
                    <span className="text-[9px] font-bold text-gray-400 uppercase leading-none">RND</span>
                    <span className="font-mono font-black text-lg text-white leading-none">{race.round}</span>
                  </div>

                  {/* Flag + race info */}
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <span className="text-3xl shrink-0">{race.flagEmoji}</span>
                    <div className="min-w-0">
                      <h3 className="font-black text-base text-white truncate group-hover:text-[#e10600] transition-colors">
                        {race.name}
                      </h3>
                      <p className="text-xs text-[#a1a8b3] mt-0.5">
                        {race.country} &bull; {formatShortDate(race.startTime)}
                      </p>
                    </div>
                  </div>

                  {/* Winner */}
                  {winnerEntry && (
                    <div className="flex items-center gap-3 shrink-0">
                      <div className="hidden sm:flex items-center gap-2">
                        {winnerEntry.imageUrl && (
                          <img
                            src={winnerEntry.imageUrl}
                            alt={winnerEntry.name}
                            className="w-9 h-9 rounded-full object-cover object-top border border-white/10 shadow-md"
                          />
                        )}
                        <div className="text-right">
                          <div className="flex items-center gap-1.5">
                            <Trophy size={12} className="text-yellow-400" />
                            <span className="font-black text-sm text-white">{winnerEntry.name}</span>
                          </div>
                          <span className="text-xs font-bold" style={{ color: winnerTeam?.color }}>
                            {winnerTeam?.shortName}
                          </span>
                        </div>
                      </div>

                      {/* Mobile: abbreviated */}
                      <div className="sm:hidden text-right">
                        <div className="flex items-center gap-1">
                          <Trophy size={11} className="text-yellow-400" />
                          <span className="font-bold text-xs text-white">{winnerEntry.abbreviation}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {!winnerEntry && winnerName && (
                    <div className="flex items-center gap-1.5 shrink-0">
                      <Trophy size={12} className="text-yellow-400" />
                      <span className="font-bold text-sm text-white">{winnerName}</span>
                    </div>
                  )}

                  <ChevronRight size={16} className="text-gray-500 group-hover:text-[#e10600] group-hover:translate-x-1 transition-all shrink-0" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
