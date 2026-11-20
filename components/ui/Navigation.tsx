'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Radio, Search, Bell, Menu, X, User } from 'lucide-react';

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/live', label: 'Live', isLive: true },
  { href: '/calendar', label: 'Schedule' },
  { href: '/results', label: 'Results' },
  { href: '/standings', label: 'Standings' },
  { href: '/drivers', label: 'Drivers' },
  { href: '/teams', label: 'Teams' },
  { href: '/circuits', label: 'Circuits' },
  { href: '/news', label: 'News' },
];

export function Navigation() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="sticky top-0 z-50 bg-[#101114]/95 backdrop-blur-md border-b border-[#24272D]">
      {/* Top Red Accent Line */}
      <div className="h-[2px] bg-[#E10600] w-full" />

      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
            <div className="w-8 h-8 rounded-lg bg-[#E10600] flex items-center justify-center font-black text-white italic tracking-tighter text-sm shadow-lg shadow-[#E10600]/30 group-hover:scale-105 transition-transform">
              F1
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-white font-black text-xl tracking-tight uppercase">LIVE</span>
              <span className="text-[10px] font-bold text-[#00B8D9] tracking-widest uppercase ml-0.5">WILTZ</span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map(({ href, label, isLive }) => {
              const active = href === '/' ? pathname === '/' : pathname.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  className={`
                    relative flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider transition-all
                    ${active
                      ? 'text-white bg-[#24272D] border-b-2 border-[#E10600]'
                      : 'text-[#AEB4BE] hover:text-white hover:bg-white/5'
                    }
                    ${isLive && !active ? 'text-[#E10600]' : ''}
                  `}
                >
                  {isLive && (
                    <span className="flex h-2 w-2 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E10600] opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E10600]" />
                    </span>
                  )}
                  {label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Icons: Search, Notifications, User */}
          <div className="flex items-center gap-3">
            {/* Search Input Bar (Expandable) */}
            <div className="relative hidden sm:block">
              {searchOpen ? (
                <div className="flex items-center bg-[#24272D] border border-white/10 rounded-full px-3 py-1 text-xs">
                  <Search size={14} className="text-[#AEB4BE] mr-2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search driver, team, circuit..."
                    className="bg-transparent border-none outline-none text-white w-44 placeholder-[#AEB4BE]"
                    autoFocus
                  />
                  <button onClick={() => setSearchOpen(false)} className="text-[#AEB4BE] hover:text-white ml-1">
                    <X size={12} />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setSearchOpen(true)}
                  className="p-2 text-[#AEB4BE] hover:text-white hover:bg-[#24272D] rounded-full transition"
                  title="Search F1 Live"
                >
                  <Search size={16} />
                </button>
              )}
            </div>

            {/* Notification reminder shortcut */}
            <Link
              href="/calendar"
              className="p-2 text-[#AEB4BE] hover:text-white hover:bg-[#24272D] rounded-full transition hidden sm:flex"
              title="Race Session Alerts"
            >
              <Bell size={16} />
            </Link>

            {/* Profile Avatar / Indicator */}
            <div className="flex items-center gap-2 pl-2 border-l border-[#24272D]">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#E10600] to-[#00B8D9] flex items-center justify-center text-white text-xs font-bold shadow-md cursor-pointer hover:opacity-90">
                <User size={15} />
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#AEB4BE] hover:text-white hover:bg-[#24272D] rounded-lg transition"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#101114] border-b border-[#24272D] px-4 py-4 space-y-2 animate-fade-in">
          <div className="grid grid-cols-2 gap-2">
            {NAV_LINKS.map(({ href, label, isLive }) => {
              const active = href === '/' ? pathname === '/' : pathname.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`
                    flex items-center gap-2 p-3 rounded-lg text-xs font-bold uppercase tracking-wider
                    ${active ? 'bg-[#24272D] text-white border-l-2 border-[#E10600]' : 'text-[#AEB4BE] bg-white/5 hover:text-white'}
                  `}
                >
                  {isLive && <Radio size={12} className="text-[#E10600] animate-pulse" />}
                  {label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
