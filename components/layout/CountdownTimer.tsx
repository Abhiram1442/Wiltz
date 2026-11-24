'use client';

import { useState, useEffect } from 'react';

interface CountdownTimerProps {
  targetDate: string;
}

export function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });

  useEffect(() => {
    function calc() {
      const diff = new Date(targetDate).getTime() - Date.now();
      if (diff <= 0) return { days: 0, hours: 0, mins: 0, secs: 0 };
      return {
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        mins: Math.floor((diff % 3600000) / 60000),
        secs: Math.floor((diff % 60000) / 1000),
      };
    }
    setTimeLeft(calc());
    const id = setInterval(() => setTimeLeft(calc()), 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  const units = [
    { label: 'DAYS', value: timeLeft.days },
    { label: 'HRS', value: timeLeft.hours },
    { label: 'MIN', value: timeLeft.mins },
    { label: 'SEC', value: timeLeft.secs },
  ];

  return (
    <div className="flex items-center gap-3">
      {units.map((u, i) => (
        <div key={u.label} className="flex items-center gap-3">
          <div className="text-center">
            <div className="font-mono font-black text-2xl sm:text-3xl text-white tabular-nums leading-none">
              {String(u.value).padStart(2, '0')}
            </div>
            <div className="text-[9px] font-bold text-[#a1a8b3] tracking-widest mt-1">
              {u.label}
            </div>
          </div>
          {i < units.length - 1 && (
            <span className="text-[#e10600] font-black text-xl leading-none mb-3">:</span>
          )}
        </div>
      ))}
    </div>
  );
}
