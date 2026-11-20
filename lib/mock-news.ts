import { NewsArticle, VideoClip } from '@/types/f1';

export const MOCK_NEWS_ARTICLES: NewsArticle[] = [
  {
    id: 'news-1',
    title: 'TECH ANALYSIS: How McLaren and Ferrari are fighting Red Bull into the 2025 title race',
    summary: 'A deep dive into floor aerodynamics, front-wing elasticity, and how recent simulator iterations are squeezing milliseconds out of high-speed corners.',
    category: 'TECHNICAL',
    publishedAt: '2025-09-08T10:00:00Z',
    readTime: '5 min read',
    imageUrl: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1200&q=80',
    featured: true,
  },
  {
    id: 'news-2',
    title: 'Norris praises McLaren pit crew after breathtaking sub-2.2s undercut strategy',
    summary: 'Lando Norris hailed the team execution that elevated him into second position, setting up a thrilling late-race charge against Verstappen.',
    category: 'INTERVIEW',
    publishedAt: '2025-09-08T08:30:00Z',
    readTime: '3 min read',
    imageUrl: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'news-3',
    title: 'Hamilton eager for Ferrari Monza debrief: "The baseline balance is in the right window"',
    summary: 'Lewis Hamilton expressed optimism following his fastest-lap charge, praising the Scuderia engine performance down Monza’s Rettifilo straight.',
    category: 'RACE REPORT',
    publishedAt: '2025-09-07T18:45:00Z',
    readTime: '4 min read',
    imageUrl: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'news-4',
    title: 'Audi Sauber announce key aerodynamic engineering leadership ahead of 2026 regulations',
    summary: 'The Hinwil-based squad confirms major restructuring in their wind-tunnel testing facility to prepare for the new hybrid power unit era.',
    category: 'BREAKING',
    publishedAt: '2025-09-06T14:15:00Z',
    readTime: '3 min read',
    imageUrl: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=800&q=80',
  },
];

export const MOCK_VIDEOS: VideoClip[] = [
  {
    id: 'vid-1',
    title: 'RACE HIGHLIGHTS: 2025 Italian Grand Prix Thriller',
    duration: '08:24',
    thumbnailUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80',
    category: 'Highlights',
  },
  {
    id: 'vid-2',
    title: 'ONBOARD: Lewis Hamilton’s 341 km/h Fastest Lap at Monza',
    duration: '01:45',
    thumbnailUrl: 'https://images.unsplash.com/photo-1508974239320-0a029497e820?auto=format&fit=crop&w=600&q=80',
    category: 'Onboard',
  },
  {
    id: 'vid-3',
    title: 'Radio Highlights: "Box now, box for softs! Push everything you have"',
    duration: '04:12',
    thumbnailUrl: 'https://images.unsplash.com/photo-1571127236794-81c0bbfe1ce3?auto=format&fit=crop&w=600&q=80',
    category: 'Team Radio',
  },
  {
    id: 'vid-4',
    title: 'Palmer’s Analysis: Norris vs Leclerc Ascari wheel-to-wheel masterclass',
    duration: '06:50',
    thumbnailUrl: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=600&q=80',
    category: 'Analysis',
  },
];
