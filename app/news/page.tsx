'use client';

import { useState } from 'react';
import { MOCK_NEWS_ARTICLES, MOCK_VIDEOS } from '@/lib/mock-news';
import { PageHeader } from '@/components/layout/PageHeader';
import { Play, Clock, ArrowRight, Share2, Bookmark } from 'lucide-react';

export default function NewsPage() {
  const [activeCategory, setActiveCategory] = useState<string>('ALL');

  const categories = ['ALL', 'RACE REPORT', 'TECHNICAL', 'INTERVIEW', 'BREAKING'];

  const filteredArticles = activeCategory === 'ALL'
    ? MOCK_NEWS_ARTICLES
    : MOCK_NEWS_ARTICLES.filter(a => a.category === activeCategory);

  const featured = MOCK_NEWS_ARTICLES.find(a => a.featured) || MOCK_NEWS_ARTICLES[0];

  return (
    <div className="min-h-screen bg-[#07080a] text-white">
      <PageHeader
        label="F1 Live Editorial & Newsroom"
        title="Headlines & Analysis"
        description="Real-time reports, technical breakdowns, driver interviews, and paddock debriefs."
      >
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition shrink-0 ${
                activeCategory === cat
                  ? 'bg-[#e10600] text-white shadow-lg shadow-[#e10600]/30'
                  : 'bg-[#14171f] text-[#a1a8b3] hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </PageHeader>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 space-y-12">
        {/* Featured Big Article Card */}
        {activeCategory === 'ALL' && (
          <div className="relative rounded-2xl overflow-hidden bg-[#14171f] border border-white/10 group cursor-pointer shadow-2xl animate-fade-up">
            <div className="grid lg:grid-cols-12 min-h-[460px]">
              <div className="lg:col-span-7 relative h-72 lg:h-auto overflow-hidden">
                <img
                  src={featured.imageUrl}
                  alt={featured.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#14171f] via-transparent to-transparent lg:hidden" />
              </div>

              <div className="lg:col-span-5 p-6 lg:p-10 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#e10600] text-white">
                      {featured.category}
                    </span>
                    <span className="text-xs text-[#a1a8b3] flex items-center gap-1 font-mono">
                      <Clock size={13} /> {featured.readTime}
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight mb-4 group-hover:text-[#00d2be] transition-colors">
                    {featured.title}
                  </h2>
                  <p className="text-sm text-[#a1a8b3] leading-relaxed">
                    {featured.summary}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-white/10 mt-6">
                  <span className="text-xs font-bold text-white flex items-center gap-1">
                    Read Full Story <ArrowRight size={14} className="text-[#e10600]" />
                  </span>
                  <div className="flex items-center gap-2">
                    <button className="p-2 text-[#a1a8b3] hover:text-white rounded-full bg-white/5">
                      <Bookmark size={15} />
                    </button>
                    <button className="p-2 text-[#a1a8b3] hover:text-white rounded-full bg-white/5">
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
            {filteredArticles.map((article, i) => (
              <div
                key={article.id}
                className="bg-[#14171f] border border-white/5 rounded-xl overflow-hidden hover:border-[#e10600]/50 transition-all hover:-translate-y-1 group flex flex-col justify-between shadow-lg animate-fade-up"
                style={{ animationDelay: `${i * 60}ms` }}
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
                    <div className="text-[11px] text-[#a1a8b3] font-mono flex items-center gap-1 mb-2">
                      <Clock size={12} /> {article.readTime}
                    </div>
                    <h3 className="font-bold text-base text-white leading-snug group-hover:text-[#00d2be] transition-colors mb-2">
                      {article.title}
                    </h3>
                    <p className="text-xs text-[#a1a8b3] line-clamp-2">
                      {article.summary}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0 flex items-center justify-between text-xs font-semibold text-white">
                  <span className="text-[#00d2be] group-hover:underline">Explore Article &rarr;</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Must-Watch Videos Section */}
        <section className="pt-8 border-t border-white/10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-xs font-bold text-[#e10600] uppercase tracking-widest">Video Hub</span>
              <h2 className="text-2xl font-black uppercase tracking-tight text-white mt-0.5">Must-Watch Highlights</h2>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {MOCK_VIDEOS.map((video, i) => (
              <div
                key={video.id}
                className="bg-[#14171f] border border-white/5 rounded-xl overflow-hidden group hover:border-[#e10600]/50 transition-all cursor-pointer shadow-md animate-fade-up"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={video.thumbnailUrl}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/20 transition-colors">
                    <div className="w-12 h-12 rounded-full bg-[#e10600] text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Play size={18} className="ml-1 fill-white" />
                    </div>
                  </div>
                  <span className="absolute bottom-2 right-2 bg-black/80 backdrop-blur px-2 py-0.5 rounded text-[11px] font-mono text-white">
                    {video.duration}
                  </span>
                </div>

                <div className="p-4">
                  <span className="text-[10px] font-bold text-[#00d2be] uppercase tracking-wider block mb-1">
                    {video.category}
                  </span>
                  <h4 className="font-bold text-xs text-white leading-snug line-clamp-2 group-hover:text-[#00d2be] transition-colors">
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
