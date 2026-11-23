'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Radio, Search, Bell, Menu, X, Trophy, Calendar, Users, Shield, Compass, Newspaper, Activity } from 'lucide-react';
import { isSupabaseConfigured } from '@/lib/supabase';

const NAV_LINKS = [
  { href: '/', label: 'Home', icon: Activity },
  { href: '/live', label: 'Live GP', isLive: true, icon: Radio },
  { href: '/calendar', label: 'Schedule', icon: Calendar },
  { href: '/standings', label: 'Standings', icon: Trophy },
  { href: '/drivers', label: 'Drivers', icon: Users },
  { href: '/teams', label: 'Teams', icon: Shield },
  { href: '/circuits', label: 'Circuits', icon: Compass },
  { href: '/news', label: 'News', icon: Newspaper },
];

export function Navigation() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="sticky top-0 z-50 bg-[#07080a]/90 backdrop-blur-xl border-b border-white/10 transition-all">
      {/* Top Velocity Red Accent Line with live shimmer */}
      <div className="h-[2.5px] bg-gradient-to-r from-[#e10600] via-[#ff1801] to-[#e10600] w-full relative overflow-hidden">
        <div className="absolute inset-0 bg-white/40 w-1/3 animate-track-beam opacity-75" />
      </div>

      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 shrink-0 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#e10600] to-[#990400] flex items-center justify-center font-black text-white italic tracking-tighter text-base shadow-[0_0_20px_rgba(225,6,0,0.5)] group-hover:scale-105 transition-transform duration-300 border border-white/20">
              F1
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5 leading-none">
                <span className="text-white font-black text-lg tracking-tight uppercase">WILTZ</span>
                <span className="text-[10px] font-black px-1.5 py-0.5 rounded bg-[#e10600]/20 text-[#e10600] border border-[#e10600]/40 tracking-wider">
                  LIVE
                </span>
              </div>
              <span className="text-[9px] font-mono font-bold text-gray-400 tracking-widest uppercase mt-0.5">
                TELEMETRY HUB
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map(({ href, label, isLive, icon: Icon }) => {
              const active = href === '/' ? pathname === '/' : pathname.startsWith(href);
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
          </nav>

          {/* Right Action Bar */}
          <div className="flex items-center gap-3">
            {/* Supabase Status Pill */}
            <div 
              className="hidden xl:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/40 border border-white/10 text-[10px] font-mono text-gray-400"
              title={isSupabaseConfigured ? "Supabase Connected" : "Local Mock Fallback"}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${isSupabaseConfigured ? 'bg-emerald-400' : 'bg-amber-400'}`} />
              <span>{isSupabaseConfigured ? 'DB SYNC' : 'LOCAL'}</span>
            </div>

            {/* Search Input Bar (Expandable) */}
            <div className="relative hidden sm:block">
              {searchOpen ? (
                <div className="flex items-center bg-[#151821] border border-[#e10600]/50 rounded-full px-3 py-1.5 text-xs shadow-lg shadow-black/50">
                  <Search size={14} className="text-[#e10600] mr-2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search driver, team, circuit..."
                    className="bg-transparent border-none outline-none text-white w-48 placeholder-gray-500 font-medium"
                    autoFocus
                  />
                  <button onClick={() => setSearchOpen(false)} className="text-gray-400 hover:text-white ml-1">
                    <X size={12} />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setSearchOpen(true)}
                  className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition"
                  title="Search F1 Live"
                >
                  <Search size={16} />
                </button>
              )}
            </div>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-xl transition"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#07080a]/95 backdrop-blur-2xl border-b border-white/10 px-4 py-4 space-y-2 animate-fade-in">
          <div className="grid grid-cols-2 gap-2">
            {NAV_LINKS.map(({ href, label, isLive, icon: Icon }) => {
              const active = href === '/' ? pathname === '/' : pathname.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`
                    flex items-center gap-2.5 p-3 rounded-xl text-xs font-bold uppercase tracking-wider
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