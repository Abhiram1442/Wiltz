'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Radio, Menu, X, Trophy, Calendar, Users, Shield, Compass,
  Newspaper, Activity, BarChart3, Flag, ChevronDown,
} from 'lucide-react';

interface NavLink {
  href: string;
  label: string;
  icon: typeof Activity;
  isLive?: boolean;
}

const PRIMARY_LINKS: NavLink[] = [
  { href: '/', label: 'Home', icon: Activity },
  { href: '/live', label: 'Live GP', isLive: true, icon: Radio },
  { href: '/drivers', label: 'Drivers', icon: Users },
  { href: '/teams', label: 'Teams', icon: Shield },
  { href: '/circuits', label: 'Circuits', icon: Compass },
];

const SECONDARY_LINKS: NavLink[] = [
  { href: '/calendar', label: 'Schedule', icon: Calendar },
  { href: '/standings', label: 'Standings', icon: Trophy },
  { href: '/results', label: 'Results', icon: Flag },
  { href: '/news', label: 'News', icon: Newspaper },
];

const ALL_LINKS: NavLink[] = [...PRIMARY_LINKS, ...SECONDARY_LINKS];

export function Navigation() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);

  const isActive = (href: string) => href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 bg-[#07080a]/90 backdrop-blur-xl border-b border-white/10 transition-all">
      <div className="h-[2.5px] bg-gradient-to-r from-[#e10600] via-[#ff1801] to-[#e10600] w-full relative overflow-hidden">
        <div className="absolute inset-0 bg-white/40 w-1/3 animate-track-beam opacity-75" />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Brand */}
          <Link href="/" className="flex items-center gap-3 shrink-0 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#e10600] to-[#990400] flex items-center justify-center font-black text-white italic tracking-tighter text-base shadow-[0_0_20px_rgba(225,6,0,0.5)] group-hover:scale-105 transition-transform duration-300 border border-white/20">
              W
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5 leading-none">
                <span className="text-white font-black text-lg tracking-tight uppercase">WILTZ</span>
                <span className="text-[10px] font-black px-1.5 py-0.5 rounded bg-[#e10600]/20 text-[#e10600] border border-[#e10600]/40 tracking-wider">
                  F1
                </span>
              </div>
              <span className="text-[9px] font-mono font-bold text-gray-400 tracking-widest uppercase mt-0.5">
                CHAMPIONSHIP HUB
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {PRIMARY_LINKS.map(({ href, label, isLive }) => {
              const active = isActive(href);
              return (
                <Link
                  key={href}
                  href={href}
                  className={`
                    relative flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200
                    ${active
                      ? 'text-white bg-white/10 shadow-[0_2px_12px_rgba(0,0,0,0.5)] border border-white/10'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }
                    ${isLive ? 'text-[#ff1801]' : ''}
                  `}
                >
                  {isLive && (
                    <span className="flex h-2 w-2 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#e10600] opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#e10600]" />
                    </span>
                  )}
                  <span>{label}</span>
                  {active && (
                    <div className="absolute -bottom-[1px] left-3 right-3 h-[2px] bg-[#e10600] rounded-full shadow-[0_0_8px_#e10600]" />
                  )}
                </Link>
              );
            })}

            {/* More dropdown */}
            <div className="relative">
              <button
                onClick={() => setMoreOpen(!moreOpen)}
                onBlur={() => setTimeout(() => setMoreOpen(false), 150)}
                className={`flex items-center gap-1 px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                  SECONDARY_LINKS.some(l => isActive(l.href))
                    ? 'text-white bg-white/10 border border-white/10'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <span>More</span>
                <ChevronDown size={12} className={`transition-transform ${moreOpen ? 'rotate-180' : ''}`} />
              </button>

              {moreOpen && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-[#0e1015] border border-white/10 rounded-xl shadow-2xl overflow-hidden animate-slide-down z-50">
                  {SECONDARY_LINKS.map(({ href, label, icon: Icon }) => {
                    const active = isActive(href);
                    return (
                      <Link
                        key={href}
                        href={href}
                        onClick={() => setMoreOpen(false)}
                        className={`flex items-center gap-2.5 px-4 py-3 text-xs font-bold uppercase tracking-wider transition-colors ${
                          active
                            ? 'text-white bg-[#e10600]/15 border-l-2 border-[#e10600]'
                            : 'text-gray-400 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        <Icon size={14} className={active ? 'text-[#e10600]' : 'text-gray-500'} />
                        <span>{label}</span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          </nav>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-xl transition"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#07080a]/95 backdrop-blur-2xl border-b border-white/10 px-4 py-4 space-y-2 animate-slide-down">
          <div className="grid grid-cols-2 gap-2">
            {ALL_LINKS.map(({ href, label, isLive, icon: Icon }) => {
              const active = isActive(href);
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`
                    flex items-center gap-2.5 p-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors
                    ${active
                      ? 'text-white bg-[#e10600]/20 border border-[#e10600]/40'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }
                  `}
                >
                  <Icon size={14} className={active ? 'text-[#e10600]' : 'text-gray-400'} />
                  <span>{label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
