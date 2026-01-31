'use client';

import Link from 'next/link';
import Header from '../components/Header';

export default function BenchPage() {
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
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">The Bench</h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            My recommended resources for manufacturing transformation. These are solutions I've 
            personally vetted and would confidently recommend to a peer.
          </p>
        </div>

        {/* Public Stance */}
        <div className="max-w-4xl mx-auto mb-12">
          <div
            className="rounded-xl p-6 lg:p-8 border border-blue-500/30"
            style={{
              background: 'rgba(0, 122, 255, 0.1)',
            }}
          >
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              How the Bench Works
            </h2>
            
            <div className="space-y-4 text-white/80">
              <p className="leading-relaxed">
                <strong className="text-white">Inclusion is curated.</strong> This isn't a comprehensive directory—it's 
                a short list of solutions I'd actually recommend to a friend running a plant.
              </p>
              
              <p className="leading-relaxed">
                <strong className="text-white">I prioritize operators-first behavior.</strong> Companies that build for 
                the people who actually use the software, not just the people who sign the check.
              </p>
              
              <p className="leading-relaxed">
                <strong className="text-white">No pay-to-play.</strong> I don't accept payment, commissions, or equity 
                for placement. If a company is here, it's because I believe in what they're building.
              </p>
            </div>
            
            <div className="mt-6 pt-6 border-t border-blue-500/30">
              <h3 className="font-semibold text-blue-400 mb-3">What I Look For</h3>
              <div className="grid sm:grid-cols-2 gap-2">
                {[
                  'Proven in ugly plants',
                  'Fair pricing / transparent',
                  'Open integration posture',
                  "Doesn't hostage your data",
                  'Support teams that show up',
                  'Punches above weight',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm text-white/70">
                    <svg className="w-4 h-4 text-blue-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Browse Marketplace Link */}
        <div className="max-w-4xl mx-auto mb-12 text-center">
          <Link
            href="/marketplace"
            className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
          >
            Browse the full marketplace
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        {/* Apply CTA */}
        <div className="max-w-4xl mx-auto">
          <div
            className="rounded-xl p-8 text-center border border-white/10"
            style={{
              background: 'rgba(58, 58, 60, 0.6)',
              backdropFilter: 'blur(20px)',
            }}
          >
            <h2 className="text-2xl font-bold mb-4">Think You Belong on the Bench?</h2>
            <p className="text-white/60 mb-6 max-w-lg mx-auto">
              If you're building something operators love—not just something that demos well—I 
              want to hear about it. No promises, but I review every application.
            </p>
            <Link
              href="/bench/apply"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 hover:-translate-y-0.5"
              style={{
                background: 'linear-gradient(135deg, #007AFF 0%, #0056CC 100%)',
                boxShadow: '0 4px 15px rgba(0, 122, 255, 0.3)',
              }}
            >
              Apply to be Considered
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
