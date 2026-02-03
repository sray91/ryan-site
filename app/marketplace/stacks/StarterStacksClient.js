'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Header from '../../components/Header';
import { tagDefinitions } from '@/data/marketplace/tagDefinitions';

export default function StarterStacksClient({ stacks }) {
  const [selectedFocus, setSelectedFocus] = useState([]);

  const filteredStacks = useMemo(() => {
    if (selectedFocus.length === 0) return stacks;
    return stacks.filter((stack) =>
      stack.relevantFocusTags?.some((tag) => selectedFocus.includes(tag))
    );
  }, [stacks, selectedFocus]);

  const toggleFocus = (tag) => {
    setSelectedFocus((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const clearFilters = () => {
    setSelectedFocus([]);
  };

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
        <div className="max-w-5xl mx-auto mb-8">
          <Link
            href="/marketplace"
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

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">Starter Stacks</h1>
          <p className="text-lg text-white/70 max-w-3xl">
            Pre-configured technology combinations for common manufacturing scenarios. These stacks
            are based on real implementations—solutions that work well together and solve specific
            problems.
          </p>
        </div>

        {/* Filter Tags */}
        <div className="max-w-5xl mx-auto mb-8">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm text-white/60">Filter by focus:</span>
            {Object.entries(tagDefinitions.stackFocus).map(([key, label]) => (
              <button
                key={key}
                onClick={() => toggleFocus(key)}
                className={`px-3 py-1.5 text-sm rounded-full transition-all ${
                  selectedFocus.includes(key)
                    ? 'bg-blue-500 text-white'
                    : 'bg-white/10 text-white/70 hover:bg-white/20'
                }`}
              >
                {label}
              </button>
            ))}
            {selectedFocus.length > 0 && (
              <button
                onClick={clearFilters}
                className="text-sm text-white/50 hover:text-white transition-colors"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Stacks Grid */}
        <div className="max-w-5xl mx-auto">
          <div className="grid gap-6">
            {filteredStacks.map((stack) => (
              <Link key={stack._id} href={`/marketplace/stacks/${stack.slug}`} className="group">
                <div
                  className="rounded-xl p-6 border border-white/10 hover:border-white/30 transition-all duration-300 hover:-translate-y-1"
                  style={{
                    background: 'rgba(58, 58, 60, 0.6)',
                    backdropFilter: 'blur(20px)',
                  }}
                >
                  <div className="flex flex-col lg:flex-row gap-6">
                    <div className="flex-1">
                      <h2 className="text-xl font-bold mb-2 group-hover:text-blue-400 transition-colors">
                        {stack.name}
                      </h2>
                      <p className="text-white/60 text-sm mb-4 line-clamp-2">{stack.whoItsFor}</p>

                      {/* Solution Logos */}
                      <div className="flex items-center gap-3 mb-4">
                        {stack.solutions?.slice(0, 4).map((sol) => (
                          <div
                            key={sol.solution?._id}
                            className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center overflow-hidden"
                            title={sol.solution?.name}
                          >
                            {sol.solution?.logo ? (
                              <img
                                src={sol.solution.logo}
                                alt={sol.solution.name}
                                className="w-full h-full object-contain"
                              />
                            ) : (
                              <span className="text-sm font-bold text-white/50">
                                {sol.solution?.name?.charAt(0)}
                              </span>
                            )}
                          </div>
                        ))}
                        {stack.solutions?.length > 4 && (
                          <span className="text-sm text-white/50">
                            +{stack.solutions.length - 4} more
                          </span>
                        )}
                      </div>

                      {/* Focus Tags */}
                      <div className="flex flex-wrap gap-2">
                        {stack.relevantFocusTags?.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 text-xs rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30"
                          >
                            {tagDefinitions.stackFocus[tag]}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Problem Preview */}
                    <div className="lg:w-64 flex-shrink-0">
                      <h3 className="text-xs font-medium text-white/50 uppercase tracking-wide mb-2">
                        Problem it solves
                      </h3>
                      <p className="text-sm text-white/70 line-clamp-3">{stack.problemItSolves}</p>
                    </div>

                    <svg
                      className="w-5 h-5 text-white/40 group-hover:text-blue-400 group-hover:translate-x-1 transition-all flex-shrink-0 hidden lg:block self-center"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}

            {filteredStacks.length === 0 && (
              <div className="text-center py-12">
                <p className="text-white/60 mb-4">No stacks match your filters.</p>
                <button
                  onClick={clearFilters}
                  className="px-4 py-2 bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </div>

        {/* CTA */}
        <div className="max-w-5xl mx-auto mt-12 text-center">
          <p className="text-white/60 mb-4">
            Need help choosing? Have a unique situation?
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 hover:-translate-y-0.5"
            style={{
              background: 'linear-gradient(135deg, #007AFF 0%, #0056CC 100%)',
              boxShadow: '0 4px 15px rgba(0, 122, 255, 0.3)',
            }}
          >
            Get personalized recommendations
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>
      </main>
    </div>
  );
}
