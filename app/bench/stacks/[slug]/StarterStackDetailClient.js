'use client';

import Link from 'next/link';
import Header from '../../../components/Header';
import { tagDefinitions } from '@/data/marketplace/tagDefinitions';

function StarRating({ rating, size = 'sm' }) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
  };

  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`${sizeClasses[size]} ${
            star <= rating ? 'text-yellow-400 fill-current' : 'text-white/20 fill-current'
          }`}
          viewBox="0 0 20 20"
        >
          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
        </svg>
      ))}
    </div>
  );
}

export default function StarterStackDetailClient({ stack }) {
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
            href="/bench/stacks"
            className="inline-flex items-center text-white/60 hover:text-white mb-8 transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Starter Stacks
          </Link>

          {/* Header Section */}
          <div
            className="rounded-xl p-8 mb-8 border border-white/10"
            style={{
              background: 'rgba(58, 58, 60, 0.6)',
              backdropFilter: 'blur(20px)',
            }}
          >
            <div className="flex flex-wrap gap-2 mb-4">
              {stack.relevantFocusTags?.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-sm rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30"
                >
                  {tagDefinitions.stackFocus[tag]}
                </span>
              ))}
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold mb-4">{stack.name}</h1>

            {/* Solution Logos Row */}
            <div className="flex items-center gap-4 mb-6">
              {stack.solutions?.map((sol, index) => (
                <div key={sol.solution?._id} className="flex items-center">
                  <div
                    className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center overflow-hidden"
                    title={sol.solution?.name}
                  >
                    {sol.solution?.logo ? (
                      <img
                        src={sol.solution.logo}
                        alt={sol.solution.name}
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <span className="text-lg font-bold text-white/50">
                        {sol.solution?.name?.charAt(0)}
                      </span>
                    )}
                  </div>
                  {index < stack.solutions.length - 1 && (
                    <span className="text-white/30 mx-2">+</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Who It's For */}
          <div
            className="rounded-xl p-8 mb-8 border border-blue-500/30"
            style={{
              background: 'rgba(0, 122, 255, 0.1)',
            }}
          >
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-blue-400">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              Who It's For
            </h2>
            <p className="text-white/90 leading-relaxed">{stack.whoItsFor}</p>
          </div>

          {/* Problem It Solves */}
          <div
            className="rounded-xl p-8 mb-8 border border-white/10"
            style={{
              background: 'rgba(58, 58, 60, 0.6)',
              backdropFilter: 'blur(20px)',
            }}
          >
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              Problem It Solves
            </h2>
            <p className="text-white/80 leading-relaxed">{stack.problemItSolves}</p>
          </div>

          {/* Why This Combo Works */}
          <div
            className="rounded-xl p-8 mb-8 border border-green-500/30"
            style={{
              background: 'rgba(34, 197, 94, 0.1)',
            }}
          >
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-green-400">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Why This Combo Works
            </h2>
            <p className="text-white/90 leading-relaxed">{stack.whyThisComboWorks}</p>
          </div>

          {/* Solutions in Stack */}
          <div
            className="rounded-xl p-8 mb-8 border border-white/10"
            style={{
              background: 'rgba(58, 58, 60, 0.6)',
              backdropFilter: 'blur(20px)',
            }}
          >
            <h2 className="text-xl font-bold mb-6">Solutions in This Stack</h2>
            <div className="space-y-4">
              {stack.solutions?.map((sol) => (
                <Link
                  key={sol.solution?._id}
                  href={`/bench/${sol.solution?.slug}`}
                  className="group flex items-start gap-4 p-4 rounded-lg bg-white/5 border border-white/10 hover:border-white/30 transition-all"
                >
                  <div className="w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0 overflow-hidden">
                    {sol.solution?.logo ? (
                      <img
                        src={sol.solution.logo}
                        alt={sol.solution.name}
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <span className="text-xl font-bold text-white/50">
                        {sol.solution?.name?.charAt(0)}
                      </span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="font-bold group-hover:text-blue-400 transition-colors">
                        {sol.solution?.name}
                      </h3>
                      {sol.role && (
                        <span className="px-2 py-0.5 text-xs rounded-full bg-purple-500/20 text-purple-400 border border-purple-500/30">
                          {sol.role}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-white/60 mb-2">{sol.solution?.tagline}</p>
                    {sol.solution?.ryanRating && (
                      <div className="flex items-center gap-2">
                        <StarRating rating={Math.round(sol.solution.ryanRating)} />
                        <span className="text-sm text-white/50">
                          {sol.solution.ryanRating.toFixed(1)}
                        </span>
                      </div>
                    )}
                  </div>
                  <svg
                    className="w-5 h-5 text-white/40 group-hover:text-blue-400 group-hover:translate-x-1 transition-all flex-shrink-0 self-center"
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
                </Link>
              ))}
            </div>
          </div>

          {/* Not a Fit If */}
          {stack.notAFitIf && stack.notAFitIf.length > 0 && (
            <div
              className="rounded-xl p-8 mb-8 border border-red-500/30"
              style={{
                background: 'rgba(239, 68, 68, 0.1)',
              }}
            >
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-red-400">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                  />
                </svg>
                Not a Fit If...
              </h2>
              <ul className="space-y-2">
                {stack.notAFitIf.map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-white/80">
                    <span className="text-red-400 mt-0.5">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* CTA */}
          <div
            className="rounded-xl p-8 text-center border border-white/10"
            style={{
              background: 'rgba(58, 58, 60, 0.6)',
              backdropFilter: 'blur(20px)',
            }}
          >
            <h2 className="text-xl font-bold mb-2">Interested in This Stack?</h2>
            <p className="text-white/60 mb-6">
              Let's talk about whether it's right for your situation.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 hover:-translate-y-0.5"
                style={{
                  background: 'linear-gradient(135deg, #007AFF 0%, #0056CC 100%)',
                  boxShadow: '0 4px 15px rgba(0, 122, 255, 0.3)',
                }}
              >
                Book a Fit Check
              </Link>
              <Link
                href="/bench/stacks"
                className="px-6 py-3 rounded-lg font-medium border border-white/30 hover:bg-white/10 transition-all"
              >
                Browse Other Stacks
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
