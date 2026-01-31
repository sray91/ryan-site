'use client';

import { useParams } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';
import Header from '../../components/Header';
import solutionsData from '../../../data/marketplace/solutions.json';

function getCompositeScore(solution) {
  const { ryanScore, communityScore } = solution;
  const threshold = solutionsData.reviewThreshold || 5;
  
  if (communityScore.count >= threshold) {
    return (ryanScore.rating * 0.3) + (communityScore.average * 0.7);
  }
  return communityScore.average;
}

function getScoreLabel(solution) {
  const threshold = solutionsData.reviewThreshold || 5;
  if (solution.communityScore.count < threshold) {
    return 'Early signal';
  }
  return null;
}

function StarRating({ rating, size = 'md' }) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };
  
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`${sizeClasses[size]} ${star <= rating ? 'text-yellow-400 fill-current' : 'text-white/20 fill-current'}`}
          viewBox="0 0 20 20"
        >
          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
        </svg>
      ))}
    </div>
  );
}

export default function SolutionDetailPage() {
  const params = useParams();
  const { solutions, tagDefinitions } = solutionsData;
  const solution = solutions.find((s) => s.slug === params.slug);
  const [showIntroForm, setShowIntroForm] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  if (!solution) {
    return (
      <div
        className="min-h-screen text-white flex flex-col"
        style={{
          background: 'linear-gradient(135deg, #1a1a1a 0%, #3a3a3c 100%)',
        }}
      >
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Solution not found</h1>
            <Link href="/marketplace" className="text-blue-400 hover:underline">
              ← Back to Marketplace
            </Link>
          </div>
        </main>
      </div>
    );
  }

  const compositeScore = getCompositeScore(solution);
  const scoreLabel = getScoreLabel(solution);

  return (
    <div
      className="min-h-screen text-white flex flex-col"
      style={{
        background: 'linear-gradient(135deg, #1a1a1a 0%, #3a3a3c 100%)',
      }}
    >
      <Header />

      <main className="flex-1 px-4 sm:px-8 lg:px-16 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <Link
            href="/marketplace"
            className="inline-flex items-center text-white/60 hover:text-white mb-8 transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Marketplace
          </Link>

          {/* Header Section */}
          <div
            className="rounded-xl p-8 mb-8 border border-white/10"
            style={{
              background: 'rgba(58, 58, 60, 0.6)',
              backdropFilter: 'blur(20px)',
            }}
          >
            <div className="flex flex-col sm:flex-row gap-6 mb-6">
              {/* Logo placeholder */}
              <div className="w-20 h-20 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                <span className="text-3xl font-bold text-white/50">{solution.name.charAt(0)}</span>
              </div>

              <div className="flex-1">
                <h1 className="text-3xl font-bold mb-2">{solution.name}</h1>
                <p className="text-xl text-white/70 mb-4">{solution.tagline}</p>

                {/* Values lens tags */}
                <div className="flex flex-wrap gap-2">
                  {solution.tags.valuesLens?.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-sm rounded-full bg-green-500/20 text-green-400 border border-green-500/30"
                    >
                      {tagDefinitions.valuesLens[tag]}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3">
              <a
                href={solution.website}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-lg font-medium transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 hover:-translate-y-0.5"
                style={{
                  background: 'linear-gradient(135deg, #007AFF 0%, #0056CC 100%)',
                  boxShadow: '0 4px 15px rgba(0, 122, 255, 0.3)',
                }}
              >
                Visit Website
              </a>
              <button 
                onClick={() => setShowIntroForm(!showIntroForm)}
                className="px-5 py-2.5 rounded-lg font-medium border border-white/30 hover:bg-white/10 transition-all"
              >
                Request Intro
              </button>
              <button 
                onClick={() => setIsSaved(!isSaved)}
                className={`px-5 py-2.5 rounded-lg font-medium border transition-all flex items-center gap-2 ${
                  isSaved ? 'border-green-500/50 bg-green-500/20 text-green-400' : 'border-white/30 hover:bg-white/10'
                }`}
              >
                <svg className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
                {isSaved ? 'Saved' : 'Save to Shortlist'}
              </button>
            </div>

            {/* Intro Request Form */}
            {showIntroForm && (
              <div className="mt-6 p-4 rounded-lg bg-white/5 border border-white/10">
                <h3 className="font-semibold mb-3">Request an Introduction</h3>
                <p className="text-sm text-white/60 mb-4">
                  I'll review your request and make an intro if it seems like a good fit.
                </p>
                <div className="space-y-3">
                  <input
                    type="email"
                    placeholder="Your email"
                    className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-blue-500"
                  />
                  <textarea
                    placeholder="Brief context: what are you trying to solve?"
                    rows={3}
                    className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-blue-500 resize-none"
                  />
                  <button className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 transition-colors">
                    Send Request
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Ratings Section */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {/* Composite Score */}
            <div
              className="rounded-xl p-6 border border-white/10"
              style={{
                background: 'rgba(58, 58, 60, 0.6)',
                backdropFilter: 'blur(20px)',
              }}
            >
              <h3 className="text-sm font-medium text-white/60 mb-2">Overall Score</h3>
              <div className="flex items-center gap-3">
                <span className="text-4xl font-bold text-yellow-400">{compositeScore.toFixed(1)}</span>
                <div>
                  <StarRating rating={Math.round(compositeScore)} />
                  {scoreLabel && (
                    <span className="text-xs text-white/50">{scoreLabel}</span>
                  )}
                </div>
              </div>
            </div>

            {/* Ryan's Score */}
            <div
              className="rounded-xl p-6 border border-blue-500/30"
              style={{
                background: 'rgba(0, 122, 255, 0.1)',
              }}
            >
              <h3 className="text-sm font-medium text-blue-400 mb-2">Ryan's Score</h3>
              <div className="flex items-center gap-3">
                <span className="text-4xl font-bold">{solution.ryanScore.rating.toFixed(1)}</span>
                <StarRating rating={Math.round(solution.ryanScore.rating)} />
              </div>
            </div>

            {/* Community Score */}
            <div
              className="rounded-xl p-6 border border-white/10"
              style={{
                background: 'rgba(58, 58, 60, 0.6)',
                backdropFilter: 'blur(20px)',
              }}
            >
              <h3 className="text-sm font-medium text-white/60 mb-2">Community Score</h3>
              <div className="flex items-center gap-3">
                <span className="text-4xl font-bold">{solution.communityScore.average.toFixed(1)}</span>
                <div>
                  <StarRating rating={Math.round(solution.communityScore.average)} />
                  <span className="text-xs text-white/50">{solution.communityScore.count} reviews</span>
                </div>
              </div>
            </div>
          </div>

          {/* Ryan's Take */}
          <div
            className="rounded-xl p-8 mb-8 border border-blue-500/30"
            style={{
              background: 'rgba(0, 122, 255, 0.1)',
            }}
          >
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
              Ryan's Take
            </h2>
            <p className="text-white/90 leading-relaxed mb-4">{solution.whyILikeIt}</p>
            <p className="text-sm text-blue-300 italic">"{solution.ryanScore.comment}"</p>
          </div>

          {/* Summary */}
          <div
            className="rounded-xl p-8 mb-8 border border-white/10"
            style={{
              background: 'rgba(58, 58, 60, 0.6)',
              backdropFilter: 'blur(20px)',
            }}
          >
            <h2 className="text-xl font-bold mb-4">About {solution.name}</h2>
            <p className="text-white/80 leading-relaxed">{solution.summary}</p>
          </div>

          {/* Tags Section */}
          <div
            className="rounded-xl p-8 mb-8 border border-white/10"
            style={{
              background: 'rgba(58, 58, 60, 0.6)',
              backdropFilter: 'blur(20px)',
            }}
          >
            <h2 className="text-xl font-bold mb-6">Categories & Tags</h2>
            <div className="grid gap-6">
              <div>
                <h3 className="text-sm font-medium text-white/60 mb-2">Process Focus</h3>
                <div className="flex flex-wrap gap-2">
                  {solution.tags.processFocus?.map((tag) => (
                    <span key={tag} className="px-3 py-1 text-sm rounded-full bg-white/10 text-white/80">
                      {tagDefinitions.processFocus[tag]}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-white/60 mb-2">Technology Category</h3>
                <div className="flex flex-wrap gap-2">
                  {solution.tags.techCategory?.map((tag) => (
                    <span key={tag} className="px-3 py-1 text-sm rounded-full bg-white/10 text-white/80">
                      {tagDefinitions.techCategory[tag]}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-white/60 mb-2">Funding Type</h3>
                <div className="flex flex-wrap gap-2">
                  {solution.tags.fundingType?.map((tag) => (
                    <span key={tag} className="px-3 py-1 text-sm rounded-full bg-white/10 text-white/80">
                      {tagDefinitions.fundingType[tag]}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Community Reviews */}
          <div
            className="rounded-xl p-8 border border-white/10"
            style={{
              background: 'rgba(58, 58, 60, 0.6)',
              backdropFilter: 'blur(20px)',
            }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Community Reviews</h2>
              <button 
                onClick={() => setShowReviewForm(!showReviewForm)}
                className="px-4 py-2 text-sm rounded-lg border border-white/30 hover:bg-white/10 transition-all"
              >
                Write a Review
              </button>
            </div>

            {/* Review Form */}
            {showReviewForm && (
              <div className="mb-8 p-6 rounded-lg bg-white/5 border border-white/10">
                <h3 className="font-semibold mb-4">Share Your Experience</h3>
                <p className="text-sm text-white/60 mb-4">
                  Sign in with your email to post a review. One review per solution.
                </p>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Your Email (for verification)</label>
                    <input
                      type="email"
                      placeholder="you@company.com"
                      className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Overall Rating</label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          className="w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all"
                        >
                          <span className="text-lg">{star}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">What I used it for</label>
                    <textarea
                      placeholder="Describe your use case and experience..."
                      rows={4}
                      className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-blue-500 resize-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Quick Ratings (optional)</label>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {['Implementation Effort', 'Support Quality', 'ROI Clarity', 'Integration Ease'].map((metric) => (
                        <div key={metric} className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                          <span className="text-sm text-white/70">{metric}</span>
                          <select className="bg-transparent text-sm text-white/70 focus:outline-none">
                            <option value="">—</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                          </select>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Industry (optional)</label>
                      <select className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:border-blue-500">
                        <option value="" className="bg-gray-800">Prefer not to say</option>
                        <option value="automotive" className="bg-gray-800">Automotive</option>
                        <option value="food-bev" className="bg-gray-800">Food & Beverage</option>
                        <option value="pharma" className="bg-gray-800">Pharma / Life Sciences</option>
                        <option value="aerospace" className="bg-gray-800">Aerospace & Defense</option>
                        <option value="cpg" className="bg-gray-800">CPG</option>
                        <option value="chemicals" className="bg-gray-800">Chemicals</option>
                        <option value="metals" className="bg-gray-800">Metals & Mining</option>
                        <option value="other" className="bg-gray-800">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Plant Size (optional)</label>
                      <select className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:border-blue-500">
                        <option value="" className="bg-gray-800">Prefer not to say</option>
                        <option value="small" className="bg-gray-800">Small (&lt;50 employees)</option>
                        <option value="medium" className="bg-gray-800">Medium (50-250)</option>
                        <option value="large" className="bg-gray-800">Large (250-1000)</option>
                        <option value="enterprise" className="bg-gray-800">Enterprise (1000+)</option>
                      </select>
                    </div>
                  </div>
                  <button className="w-full py-3 rounded-lg bg-blue-500 hover:bg-blue-600 transition-colors font-medium">
                    Submit Review
                  </button>
                  <p className="text-xs text-white/40 text-center">
                    Reviews are moderated. We'll send a magic link to verify your email.
                  </p>
                </div>
              </div>
            )}

            {/* Placeholder reviews */}
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-white/5">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <StarRating rating={5} size="sm" />
                    <p className="text-xs text-white/50 mt-1">Verified user · Automotive · Large plant</p>
                  </div>
                  <span className="text-xs text-white/40">2 weeks ago</span>
                </div>
                <p className="text-sm text-white/80 mb-3">
                  Deployed across 3 lines in our assembly plant. Implementation was smoother than expected—
                  had first apps running in 2 weeks. The no-code approach let our process engineers own it.
                </p>
                <div className="flex items-center gap-4 text-xs text-white/50">
                  <button className="hover:text-white transition-colors flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                    </svg>
                    Helpful (12)
                  </button>
                  <button className="hover:text-white transition-colors">Report</button>
                </div>
              </div>
              
              <div className="p-4 rounded-lg bg-white/5">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <StarRating rating={4} size="sm" />
                    <p className="text-xs text-white/50 mt-1">Verified user · Food & Beverage</p>
                  </div>
                  <span className="text-xs text-white/40">1 month ago</span>
                </div>
                <p className="text-sm text-white/80 mb-3">
                  Good platform, learning curve for complex logic. Support team is responsive. 
                  Would recommend for quality tracking and digital work instructions.
                </p>
                <div className="flex items-center gap-4 text-xs text-white/50">
                  <button className="hover:text-white transition-colors flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                    </svg>
                    Helpful (8)
                  </button>
                  <button className="hover:text-white transition-colors">Report</button>
                </div>
              </div>
            </div>

            <div className="mt-6 text-center">
              <button className="text-blue-400 hover:text-blue-300 text-sm transition-colors">
                Load more reviews →
              </button>
            </div>
          </div>

          {/* Suggest Edit */}
          <div className="mt-8 text-center">
            <p className="text-white/40 text-sm">
              See something wrong?{' '}
              <button className="text-blue-400 hover:underline">Suggest an edit</button>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
