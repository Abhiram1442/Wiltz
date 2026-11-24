'use client';

interface PointsBarProps {
  points: number;
  maxPoints: number;
  color?: string;
  height?: string;
}

export function PointsBar({ points, maxPoints, color = '#e10600', height = 'h-1.5' }: PointsBarProps) {
  const pct = maxPoints > 0 ? Math.min((points / maxPoints) * 100, 100) : 0;

  return (
    <div className={`w-full ${height} rounded-full bg-white/5 overflow-hidden`}>
      <div
        className={`${height} rounded-full transition-all duration-1000 ease-out`}
        style={{
          width: `${pct}%`,
          backgroundColor: color,
          animation: 'barFill 1s ease-out both',
        }}
      />
    </div>
  );
}
