'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Header from '../components/Header';
import { tagDefinitions, reviewThreshold } from '@/data/marketplace/tagDefinitions';

const sortOptions = [
  { value: 'composite-score', label: 'Top Rated' },
  { value: 'community-score', label: 'Community Favorites' },
  { value: 'ryan-score', label: "Ryan's Picks" },
  { value: 'most-reviewed', label: 'Most Reviewed' },
  { value: 'newest', label: 'Newest' },
];

// Calculate composite score: 30% Ryan / 70% community (if enough reviews)
function getCompositeScore(solution) {
  const ryanRating = solution.ryanRating || 0;
  const communityAvg = solution.communityScore?.average || 0;
  const communityCount = solution.communityScore?.count || 0;

  if (communityCount >= reviewThreshold) {
    return ryanRating * 0.3 + communityAvg * 0.7;
  }
  // Not enough reviews - use Ryan's rating or community average
  return communityCount > 0 ? communityAvg : ryanRating;
}

function getScoreLabel(solution) {
  const count = solution.communityScore?.count || 0;
  if (count < reviewThreshold) {
    return 'Early signal';
  }
  return null;
}

export default function MarketplaceClient({ solutions }) {
  const [sortBy, setSortBy] = useState('composite-score');
  const [selectedTags, setSelectedTags] = useState({
    processFocus: [],
    techCategory: [],
    fundingType: [],
    valuesLens: [],
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

  const filteredAndSortedSolutions = useMemo(() => {
    let filtered = solutions.filter((solution) => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch =
          solution.name.toLowerCase().includes(query) ||
          solution.tagline.toLowerCase().includes(query) ||
          solution.summary.toLowerCase().includes(query);
        if (!matchesSearch) return false;
      }

      // Tag filters
      for (const [category, selectedValues] of Object.entries(selectedTags)) {
        if (selectedValues.length > 0) {
          const solutionTags = solution[category] || [];
          const hasMatch = selectedValues.some((tag) => solutionTags.includes(tag));
          if (!hasMatch) return false;
        }
      }
      return true;
    });

    // Sort
    switch (sortBy) {
      case 'composite-score':
        filtered = filtered.sort((a, b) => getCompositeScore(b) - getCompositeScore(a));
        break;
      case 'community-score':
        filtered = filtered.sort(
          (a, b) => (b.communityScore?.average || 0) - (a.communityScore?.average || 0)
        );
        break;
      case 'ryan-score':
        filtered = filtered.sort((a, b) => (b.ryanRating || 0) - (a.ryanRating || 0));
        break;
      case 'most-reviewed':
        filtered = filtered.sort(
          (a, b) => (b.communityScore?.count || 0) - (a.communityScore?.count || 0)
        );
        break;
      case 'newest':
        filtered = filtered.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
        break;
    }

    return filtered;
  }, [solutions, sortBy, selectedTags, searchQuery]);

  const toggleTag = (category, tag) => {
    setSelectedTags((prev) => ({
      ...prev,
      [category]: prev[category].includes(tag)
        ? prev[category].filter((t) => t !== tag)
        : [...prev[category], tag],
    }));
  };

  const clearFilters = () => {
    setSelectedTags({
      processFocus: [],
      techCategory: [],
      fundingType: [],
      valuesLens: [],
    });
    setSearchQuery('');
  };

  const hasActiveFilters = Object.values(selectedTags).some((arr) => arr.length > 0) || searchQuery;
  const activeFilterCount = Object.values(selectedTags).flat().length;

  const FilterSection = ({ category, label, description }) => (
    <div className="mb-6">
      <label className="block text-sm font-medium mb-1">{label}</label>
      {description && <p className="text-xs text-white/50 mb-2">{description}</p>}
      <div className="flex flex-wrap gap-2">
        {Object.entries(tagDefinitions[category]).map(([tagKey, tagLabel]) => (
          <button
            key={tagKey}
            onClick={() => toggleTag(category, tagKey)}
            className={`px-3 py-1.5 text-xs rounded-full transition-all ${
              selectedTags[category].includes(tagKey)
                ? 'bg-blue-500 text-white'
                : 'bg-white/10 text-white/70 hover:bg-white/20'
            }`}
          >
            {tagLabel}
          </button>
        ))}
      </div>
    </div>
  );

  const FiltersContent = () => (
    <>
      {/* Search */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Search</label>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search solutions..."
          className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-blue-500"
        />
      </div>

      {/* Sort */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Sort by</label>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:border-blue-500"
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value} className="bg-gray-800">
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <FilterSection category="processFocus" label="Process Focus" />
      <FilterSection category="techCategory" label="Technology Category" />
      <FilterSection category="fundingType" label="Funding Type" />
      <FilterSection
        category="valuesLens"
        label="Values Lens"
        description="Filter by what matters to you"
      />

      {hasActiveFilters && (
        <button
          onClick={clearFilters}
          className="w-full py-2 text-sm text-white/70 hover:text-white border border-white/20 rounded-lg hover:bg-white/10 transition-all"
        >
          Clear all filters
        </button>
      )}
    </>
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
        <div className="max-w-7xl mx-auto mb-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">Marketplace</h1>
          <p className="text-lg text-white/70 max-w-3xl">
            A curated directory of solutions for manufacturing transformation. No pay-to-play, no
            affiliate links—just honest recommendations based on what actually works in real plants.
          </p>
        </div>

        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
          {/* Mobile Filter Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsFilterDrawerOpen(true)}
              className="w-full py-3 px-4 rounded-lg bg-white/10 border border-white/20 flex items-center justify-between"
            >
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                  />
                </svg>
                Filters
                {activeFilterCount > 0 && (
                  <span className="px-2 py-0.5 text-xs rounded-full bg-blue-500">
                    {activeFilterCount}
                  </span>
                )}
              </span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>

          {/* Mobile Filter Drawer */}
          {isFilterDrawerOpen && (
            <div className="fixed inset-0 z-50 lg:hidden">
              <div
                className="absolute inset-0 bg-black/60"
                onClick={() => setIsFilterDrawerOpen(false)}
              />
              <div
                className="absolute right-0 top-0 bottom-0 w-full max-w-sm overflow-y-auto p-6"
                style={{
                  background: 'linear-gradient(135deg, #1a1a1a 0%, #3a3a3c 100%)',
                }}
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold">Filters</h2>
                  <button onClick={() => setIsFilterDrawerOpen(false)} className="p-2">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
                <FiltersContent />
              </div>
            </div>
          )}

          {/* Desktop Filters Sidebar */}
          <aside className="hidden lg:block lg:w-72 flex-shrink-0">
            <div
              className="rounded-xl p-6 sticky top-4"
              style={{
                background: 'rgba(58, 58, 60, 0.6)',
                backdropFilter: 'blur(20px)',
              }}
            >
              <FiltersContent />
            </div>
          </aside>

          {/* Solutions Grid */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <p className="text-white/60">
                {filteredAndSortedSolutions.length} solution
                {filteredAndSortedSolutions.length !== 1 ? 's' : ''}
              </p>
              <Link
                href="/bench/apply"
                className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
              >
                Suggest a solution →
              </Link>
            </div>

            <div className="grid gap-6">
              {filteredAndSortedSolutions.map((solution) => {
                const compositeScore = getCompositeScore(solution);
                const scoreLabel = getScoreLabel(solution);

                return (
                  <Link key={solution._id} href={`/marketplace/${solution.slug}`} className="group">
                    <div
                      className="rounded-xl p-6 border border-white/10 hover:border-white/30 transition-all duration-300 hover:-translate-y-1"
                      style={{
                        background: 'rgba(58, 58, 60, 0.6)',
                        backdropFilter: 'blur(20px)',
                      }}
                    >
                      <div className="flex flex-col sm:flex-row gap-4">
                        {/* Logo */}
                        <div className="w-16 h-16 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0 overflow-hidden">
                          {solution.logo ? (
                            <img
                              src={solution.logo}
                              alt={`${solution.name} logo`}
                              className="w-full h-full object-contain"
                            />
                          ) : (
                            <span className="text-2xl font-bold text-white/50">
                              {solution.name.charAt(0)}
                            </span>
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-4 mb-2">
                            <div className="min-w-0">
                              <h3 className="text-xl font-bold group-hover:text-blue-400 transition-colors truncate">
                                {solution.name}
                              </h3>
                              <p className="text-white/60 text-sm">{solution.tagline}</p>
                            </div>
                            <div className="flex flex-col items-end flex-shrink-0">
                              <div className="flex items-center gap-1 text-yellow-400">
                                <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                                </svg>
                                <span className="text-sm font-medium">
                                  {compositeScore.toFixed(1)}
                                </span>
                              </div>
                              <span className="text-white/40 text-xs">
                                {scoreLabel || `${solution.communityScore?.count || 0} reviews`}
                              </span>
                            </div>
                          </div>

                          <p className="text-white/70 text-sm mb-3 line-clamp-2">
                            {solution.summary}
                          </p>

                          {/* Values lens tags */}
                          <div className="flex flex-wrap gap-2 mb-3">
                            {solution.valuesLens?.slice(0, 3).map((tag) => (
                              <span
                                key={tag}
                                className="px-2 py-1 text-xs rounded-full bg-green-500/20 text-green-400 border border-green-500/30"
                              >
                                {tagDefinitions.valuesLens[tag]}
                              </span>
                            ))}
                          </div>

                          {/* Tech category tags */}
                          <div className="flex flex-wrap gap-2">
                            {solution.techCategory?.slice(0, 3).map((tag) => (
                              <span
                                key={tag}
                                className="px-2 py-1 text-xs rounded-full bg-white/10 text-white/60"
                              >
                                {tagDefinitions.techCategory[tag]}
                              </span>
                            ))}
                          </div>
                        </div>

                        <svg
                          className="w-5 h-5 text-white/40 group-hover:text-blue-400 group-hover:translate-x-1 transition-all flex-shrink-0 hidden sm:block self-center"
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
                );
              })}

              {filteredAndSortedSolutions.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-white/60 mb-4">No solutions match your filters.</p>
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
        </div>
      </main>
    </div>
  );
}
