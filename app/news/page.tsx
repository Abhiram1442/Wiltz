'use client';

import { useState } from 'react';
import Link from 'next/link';
import { MOCK_NEWS_ARTICLES, MOCK_VIDEOS } from '@/lib/mock-news';
import { Play, Clock, ArrowRight, Share2, Bookmark } from 'lucide-react';

export default function NewsPage() {
  const [activeCategory, setActiveCategory] = useState<string>('ALL');

  const categories = ['ALL', 'RACE REPORT', 'TECHNICAL', 'INTERVIEW', 'BREAKING'];

  const filteredArticles = activeCategory === 'ALL'
    ? MOCK_NEWS_ARTICLES
    : MOCK_NEWS_ARTICLES.filter(a => a.category === activeCategory);

  const featured = MOCK_NEWS_ARTICLES.find(a => a.featured) || MOCK_NEWS_ARTICLES[0];
  const supporting = MOCK_NEWS_ARTICLES.filter(a => a.id !== featured.id);

  return (
    <div className="min-h-screen bg-[#101114] text-white">
      {/* Editorial Hero Header */}
      <div className="bg-[#101114] border-b border-[#24272D] py-10">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#E10600]" />
            <span className="text-xs font-bold text-[#E10600] uppercase tracking-widest">F1 Live Editorial & Newsroom</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight">
            Latest Headlines, Analysis & Paddock Insights
          </h1>
          <p className="text-sm text-[#AEB4BE] mt-2 max-w-2xl">
            Real-time reports, verified technical breakdowns, driver interviews, and paddock debriefs from around the Formula 1 globe.
          </p>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 mt-6 overflow-x-auto scrollbar-none pb-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition ${
                  activeCategory === cat
                    ? 'bg-[#E10600] text-white shadow-lg shadow-[#E10600]/30'
                    : 'bg-[#24272D] text-[#AEB4BE] hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 space-y-12">
        {/* Featured Big Article Card */}
        {activeCategory === 'ALL' && (
          <div className="relative rounded-2xl overflow-hidden bg-[#24272D] border border-white/10 group cursor-pointer shadow-2xl">
            <div className="grid lg:grid-cols-12 min-h-[460px]">
              <div className="lg:col-span-7 relative h-72 lg:h-auto overflow-hidden">
                <img
                  src={featured.imageUrl}
                  alt={featured.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#24272D] via-transparent to-transparent lg:hidden" />
              </div>

              <div className="lg:col-span-5 p-6 lg:p-10 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#E10600] text-white">
                      {featured.category}
                    </span>
                    <span className="text-xs text-[#AEB4BE] flex items-center gap-1 font-mono">
                      <Clock size={13} /> {featured.readTime}
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight mb-4 group-hover:text-[#00B8D9] transition-colors">
                    {featured.title}
                  </h2>
                  <p className="text-sm text-[#AEB4BE] leading-relaxed">
                    {featured.summary}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-white/10 mt-6">
                  <span className="text-xs font-bold text-white flex items-center gap-1">
                    Read Full Story <ArrowRight size={14} className="text-[#E10600]" />
                  </span>
                  <div className="flex items-center gap-2">
                    <button className="p-2 text-[#AEB4BE] hover:text-white rounded-full bg-white/5">
                      <Bookmark size={15} />
                    </button>
                    <button className="p-2 text-[#AEB4BE] hover:text-white rounded-full bg-white/5">
                      <Share2 size={15} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Supporting News Articles Grid */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-black uppercase tracking-wider text-white">
              {activeCategory === 'ALL' ? 'More Stories & Paddock Reports' : `${activeCategory} Stories`}
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((article) => (
              <div
                key={article.id}
                className="bg-[#24272D] border border-white/5 rounded-xl overflow-hidden hover:border-[#E10600]/50 transition-all hover:-translate-y-1 group flex flex-col justify-between shadow-lg"
              >
                <div>
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={article.imageUrl}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute bottom-3 left-3 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-black/80 backdrop-blur text-white border border-white/10">
                      {article.category}
                    </span>
                  </div>

                  <div className="p-5">
                    <div className="text-[11px] text-[#AEB4BE] font-mono flex items-center gap-1 mb-2">
                      <Clock size={12} /> {article.readTime}
                    </div>
                    <h3 className="font-bold text-base text-white leading-snug group-hover:text-[#00B8D9] transition-colors mb-2">
                      {article.title}
                    </h3>
                    <p className="text-xs text-[#AEB4BE] line-clamp-2">
                      {article.summary}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0 flex items-center justify-between text-xs font-semibold text-white">
                  <span className="text-[#00B8D9] group-hover:underline">Explore Article &rarr;</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Must-Watch Videos Section */}
        <section className="pt-8 border-t border-[#24272D]">
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-xs font-bold text-[#E10600] uppercase tracking-widest">Video Hub</span>
              <h2 className="text-2xl font-black uppercase tracking-tight text-white mt-0.5">Must-Watch Motorsport Highlights</h2>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {MOCK_VIDEOS.map((video) => (
              <div
                key={video.id}
                className="bg-[#24272D] border border-white/5 rounded-xl overflow-hidden group hover:border-[#E10600]/50 transition-all cursor-pointer shadow-md"
              >
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={video.thumbnailUrl}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/20 transition-colors">
                    <div className="w-12 h-12 rounded-full bg-[#E10600] text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Play size={18} className="ml-1 fill-white" />
                    </div>
                  </div>
                  {/* Duration Badge */}
                  <span className="absolute bottom-2 right-2 bg-black/80 backdrop-blur px-2 py-0.5 rounded text-[11px] font-mono text-white">
                    {video.duration}
                  </span>
                </div>

                <div className="p-4">
                  <span className="text-[10px] font-bold text-[#00B8D9] uppercase tracking-wider block mb-1">
                    {video.category}
                  </span>
                  <h4 className="font-bold text-xs text-white leading-snug line-clamp-2 group-hover:text-[#00B8D9] transition-colors">
                    {video.title}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
