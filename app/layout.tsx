import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Navigation } from '@/components/ui/Navigation';

const geist = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'WILTZ — Formula 1 Championship Hub',
  description: 'WILTZ: Real-time leaderboard, virtual track tracking, live scores, lap times, pit stops, and smart race calendar.',
  keywords: ['Formula 1', 'F1', 'Wiltz', 'live', 'race', 'timing', 'leaderboard', 'virtual track'],
  openGraph: {
    title: 'WILTZ F1',
    description: 'Everything happening on the track, live.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${geist.variable} ${geistMono.variable} antialiased bg-[#07080a] text-white min-h-screen`}>
        <Navigation />
        <main className="min-h-screen page-enter">
          {children}
        </main>
        <footer className="border-t border-white/10 py-8 mt-12">
          <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#e10600] to-[#990400] flex items-center justify-center font-black text-white italic text-xs border border-white/20">
                W
              </div>
              <span className="font-black text-sm text-white uppercase tracking-tight">WILTZ</span>
              <span className="text-[9px] font-mono text-gray-500 uppercase tracking-wider">F1 Championship Hub</span>
            </div>
            <p className="text-xs text-gray-600">
              &copy; 2025 WILTZ. Not affiliated with Formula 1 or FIA.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
