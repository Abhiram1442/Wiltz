import { type ReactNode } from 'react';

interface GlassPanelProps {
  children: ReactNode;
  className?: string;
}

export function GlassPanel({ children, className = '' }: GlassPanelProps) {
  return (
    <div className={`bg-[#0e1015]/85 backdrop-blur-xl border border-white/[0.08] rounded-2xl shadow-[0_10px_30px_-10px_rgba(0,0,0,0.8)] ${className}`}>
      {children}
    </div>
  );
}
