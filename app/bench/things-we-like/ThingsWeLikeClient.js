'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import Header from '../../components/Header';
import { tagDefinitions } from '@/data/marketplace/tagDefinitions';

export default function ThingsWeLikeClient({ items }) {
  // Split items into categories
  const { offTopicFavorites, coolTools } = useMemo(() => {
    const offTopic = items.filter((item) => item.categoryType === 'off-topic-favorite');
    const tools = items.filter((item) => item.categoryType === 'cool-tool');
    return { offTopicFavorites: offTopic, coolTools: tools };
  }, [items]);

  // Group cool tools by subCategory
  const toolsByCategory = useMemo(() => {
    const grouped = {};
    coolTools.forEach((tool) => {
      const cat = tool.subCategory || 'other';
      if (!grouped[cat]) grouped[cat] = [];
      grouped[cat].push(tool);
    });
    return grouped;
  }, [coolTools]);

  const ItemCard = ({ item }) => (
    <div
      className="rounded-xl p-6 border border-white/10 hover:border-white/30 transition-all duration-300"
      style={{
        background: 'rgba(58, 58, 60, 0.6)',
        backdropFilter: 'blur(20px)',
      }}
    >
      <div className="flex gap-4">
        {item.image && (
          <div className="w-16 h-16 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0 overflow-hidden">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div className="flex-1">
          <h3 className="text-lg font-bold mb-1">{item.name}</h3>
          <p className="text-white/60 text-sm mb-3">{item.oneLiner}</p>
        </div>
      </div>

      <div className="mt-4">
        <h4 className="text-xs font-medium text-blue-400 uppercase tracking-wide mb-2">
          Why Ryan Likes It
        </h4>
        <p className="text-white/80 text-sm leading-relaxed">{item.whyRyanLikesIt}</p>
      </div>

      {item.links && item.links.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {item.links.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-3 py-1.5 text-sm rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
            >
              {link.label}
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </a>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div
      className="min-h-screen text-white flex flex-col"
      style={{
        background: 'linear-gradient(135deg, #1a1a1a 0%, #3a3a3c 100%)',
      }}
    >
      <Header />

      <main className="flex-1 px-4 sm:px-8 lg:px-16 py-8">
        {/* Page Header */}
        <div className="max-w-5xl mx-auto mb-12">
          <Link
            href="/bench"
            className="inline-flex items-center text-white/60 hover:text-white mb-6 transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to The Bench
          </Link>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">Things We Like</h1>
          <p className="text-lg text-white/70 max-w-3xl">
            Not everything has to be software. These are off-topic favorites and cool tools that
            make life on the plant floor better—or just things I think are worth knowing about.
          </p>
        </div>

        {/* Off-Topic Favorites Section */}
        {offTopicFavorites.length > 0 && (
          <section className="max-w-5xl mx-auto mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-purple-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold">Off-Topic Favorites</h2>
            </div>
            <p className="text-white/60 mb-6">
              Things I genuinely love that have nothing to do with manufacturing technology.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              {offTopicFavorites.map((item) => (
                <ItemCard key={item._id} item={item} />
              ))}
            </div>
          </section>
        )}

        {/* Cool Tools Section */}
        {coolTools.length > 0 && (
          <section className="max-w-5xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-orange-500/20 flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-orange-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold">Cool Tools</h2>
            </div>
            <p className="text-white/60 mb-8">
              Physical tools and gear that are worth having in your bag.
            </p>

            {/* Grouped by subCategory */}
            {Object.entries(toolsByCategory).map(([category, tools]) => (
              <div key={category} className="mb-10">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <span className="px-3 py-1 text-sm rounded-full bg-orange-500/20 text-orange-400 border border-orange-500/30">
                    {tagDefinitions.coolToolSubCategory[category] || category}
                  </span>
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {tools.map((item) => (
                    <ItemCard key={item._id} item={item} />
                  ))}
                </div>
              </div>
            ))}
          </section>
        )}

        {/* Empty State */}
        {items.length === 0 && (
          <div className="max-w-5xl mx-auto text-center py-12">
            <p className="text-white/60">No items yet. Check back soon!</p>
          </div>
        )}

        {/* Suggestion CTA */}
        <div className="max-w-5xl mx-auto mt-12 text-center">
          <p className="text-white/60 mb-4">Have a suggestion for something that should be here?</p>
          <Link href="/contact" className="text-blue-400 hover:text-blue-300 transition-colors">
            Let me know →
          </Link>
        </div>
      </main>
    </div>
  );
}
