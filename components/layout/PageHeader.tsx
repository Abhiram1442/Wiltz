'use client';

import { type ReactNode } from 'react';
import { type LucideIcon } from 'lucide-react';

interface PageHeaderProps {
  label: string;
  title: string;
  description?: string;
  icon?: LucideIcon;
  accentColor?: string;
  children?: ReactNode;
}

export function PageHeader({ label, title, description, icon: Icon, accentColor = '#e10600', children }: PageHeaderProps) {
  return (
    <div className="relative border-b border-white/10 py-12 overflow-hidden bg-gradient-to-b from-[#0e1015] via-[#07080a] to-[#07080a]">
      <div
        className="absolute top-0 left-1/4 w-96 h-48 rounded-full blur-3xl pointer-events-none"
        style={{ backgroundColor: `${accentColor}15` }}
      />

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        <div className="flex items-center gap-2 mb-2">
          <span
            className="w-2.5 h-2.5 rounded-full animate-pulse"
            style={{ backgroundColor: accentColor }}
          />
          <span
            className="text-xs font-mono font-bold uppercase tracking-widest"
            style={{ color: accentColor }}
          >
            {label}
          </span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-white leading-none animate-fade-up">
          {title}
        </h1>
        {description && (
          <p className="text-sm text-[#a1a8b3] mt-3 max-w-2xl font-medium animate-fade-up stagger-1">
            {description}
          </p>
        )}
        {children && (
          <div className="mt-8 pt-6 border-t border-white/10 animate-fade-up stagger-2">
            {children}
          </div>
        )}
      </div>
    </div>
  );
}
