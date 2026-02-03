import Header from '../../components/Header';
import Link from 'next/link';
import { client } from '@/sanity/lib/client';
import { starterStacksByFocusQuery } from '@/sanity/lib/queries';

export const revalidate = 60;

export const metadata = {
  title: 'For PE & Consultancies | Ryan Cahalane',
  description: 'OT and automation diligence that actually changes the model. Value creation, post-close roadmaps, and specialist introductions.',
};

async function getRelevantStacks() {
  // Get stacks relevant to PE (value creation focus)
  const stacks = await client.fetch(starterStacksByFocusQuery, { focusTag: 'pe-value-creation' });
  return stacks.slice(0, 3);
}

export default async function PEConsultingPage() {
  const relevantStacks = await getRelevantStacks();
  const whatYouGet = [
    {
      title: 'Diligence',
      description: 'Automation reality check + capex/roadmap implications. What the management deck isn\'t telling you.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      ),
    },
    {
      title: 'Value creation',
      description: 'Where digital/OT moves EBITDA—and where it doesn\'t. Prioritized by effort vs. impact.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
    },
    {
      title: 'Post-close plan',
      description: 'First 100 days / Year 1 blueprint. Sequenced, resourced, and pressure-tested.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
        </svg>
      ),
    },
  ];

  const ctaCards = [
    {
      title: 'Diligence Support',
      description: 'OT/operations assessment for your next manufacturing deal. Fast turnaround.',
      href: '/contact?type=diligence',
      primary: true,
    },
    {
      title: 'Portfolio Operating Playbook',
      description: 'Standard improvement playbook customized for your portco vertical.',
      href: '/contact?type=playbook',
      primary: false,
    },
    {
      title: 'Intro to Specialist Peers',
      description: 'Access my "fractional bench"—specialists for specific portco needs.',
      href: '/contact?type=operating-partner',
      primary: false,
    },
  ];

  return (
    <div
      className="min-h-screen text-white flex flex-col"
      style={{
        background: 'linear-gradient(135deg, #1a1a1a 0%, #3a3a3c 100%)',
      }}
    >
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="px-4 sm:px-8 lg:px-16 py-16 lg:py-24">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/20 text-purple-400 text-sm mb-6">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              For PE & Consultancies
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              OT and automation diligence
              <br />
              <span className="text-purple-400">that actually changes the model.</span>
            </h1>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Your model says 200bps of margin improvement. Can the plant actually deliver it? 
              I help you see past management presentations to operational reality.
            </p>
          </div>
        </section>

        {/* The Problem */}
        <section className="px-4 sm:px-8 lg:px-16 py-12">
          <div className="max-w-4xl mx-auto">
            <div
              className="rounded-xl p-8 border border-purple-500/30"
              style={{
                background: 'rgba(168, 85, 247, 0.1)',
              }}
            >
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-purple-400">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                The Gap
              </h2>
              <p className="text-white/80 leading-relaxed mb-4">
                Most diligence teams can model the opportunity but can't pressure-test the assumptions. 
                Is the MES really that outdated? Is the maintenance backlog a $2M problem or $20M? 
                Will lean initiatives actually stick post-close?
              </p>
              <p className="text-white/80 leading-relaxed">
                I've been on both sides—running plants and advising on deals. I know what's real 
                and what's deck fiction.
              </p>
            </div>
          </div>
        </section>

        {/* What You Get Section */}
        <section className="px-4 sm:px-8 lg:px-16 py-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-12">
              What You Get
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {whatYouGet.map((item) => (
                <div
                  key={item.title}
                  className="rounded-xl p-6 border border-white/10 hover:border-white/30 transition-all duration-300"
                  style={{
                    background: 'rgba(58, 58, 60, 0.6)',
                    backdropFilter: 'blur(20px)',
                  }}
                >
                  <div className="text-purple-400 mb-4">{item.icon}</div>
                  <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Deliverables */}
        <section className="px-4 sm:px-8 lg:px-16 py-16">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-12">
              Deliverables
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div
                className="rounded-xl p-6 border border-white/10"
                style={{
                  background: 'rgba(58, 58, 60, 0.6)',
                  backdropFilter: 'blur(20px)',
                }}
              >
                <div className="text-4xl mb-4">📊</div>
                <h3 className="text-lg font-bold mb-2">Diligence Report</h3>
                <p className="text-white/60 text-sm">
                  Executive summary + detailed findings on OT maturity, automation state, 
                  integration complexity, and operational risks.
                </p>
              </div>
              <div
                className="rounded-xl p-6 border border-white/10"
                style={{
                  background: 'rgba(58, 58, 60, 0.6)',
                  backdropFilter: 'blur(20px)',
                }}
              >
                <div className="text-4xl mb-4">💰</div>
                <h3 className="text-lg font-bold mb-2">Value Bridge</h3>
                <p className="text-white/60 text-sm">
                  Quantified improvement opportunities with confidence levels, 
                  implementation complexity, and required investment.
                </p>
              </div>
              <div
                className="rounded-xl p-6 border border-white/10"
                style={{
                  background: 'rgba(58, 58, 60, 0.6)',
                  backdropFilter: 'blur(20px)',
                }}
              >
                <div className="text-4xl mb-4">🗺️</div>
                <h3 className="text-lg font-bold mb-2">100-Day Plan</h3>
                <p className="text-white/60 text-sm">
                  Post-close roadmap with quick wins, resource requirements, 
                  dependencies, and key milestones.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Credentials */}
        <section className="px-4 sm:px-8 lg:px-16 py-16">
          <div className="max-w-4xl mx-auto">
            <div
              className="rounded-xl p-8 lg:p-12 border border-white/10"
              style={{
                background: 'rgba(58, 58, 60, 0.6)',
                backdropFilter: 'blur(20px)',
              }}
            >
              <h2 className="text-2xl font-bold mb-6">Why Me</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  'Operations leadership at Fortune 500 manufacturers',
                  'Technology diligence on 20+ industrial acquisitions',
                  'Built manufacturing consulting practice at Axiom',
                  'Advisor to PE funds and portfolio companies',
                ].map((credential) => (
                  <div key={credential} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-white/80 text-sm">{credential}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Recommended Starter Stacks */}
        {relevantStacks.length > 0 && (
          <section className="px-4 sm:px-8 lg:px-16 py-16">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4">
                Value Creation Starter Stacks
              </h2>
              <p className="text-white/60 text-center mb-8 max-w-2xl mx-auto">
                Technology combinations that accelerate portfolio company performance.
              </p>
              <div className="grid md:grid-cols-3 gap-6">
                {relevantStacks.map((stack) => (
                  <Link
                    key={stack._id}
                    href={`/bench/stacks/${stack.slug}`}
                    className="group rounded-xl p-6 border border-white/10 hover:border-purple-500/50 transition-all duration-300 hover:-translate-y-1"
                    style={{
                      background: 'rgba(58, 58, 60, 0.6)',
                      backdropFilter: 'blur(20px)',
                    }}
                  >
                    {/* Solution Logos */}
                    <div className="flex items-center gap-2 mb-4">
                      {stack.solutions?.slice(0, 3).map((sol) => (
                        <div
                          key={sol.solution?._id}
                          className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center overflow-hidden"
                        >
                          {sol.solution?.logo ? (
                            <img
                              src={sol.solution.logo}
                              alt={sol.solution.name}
                              className="w-full h-full object-contain"
                            />
                          ) : (
                            <span className="text-xs font-bold text-white/50">
                              {sol.solution?.name?.charAt(0)}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                    <h3 className="font-bold mb-2 group-hover:text-purple-400 transition-colors">
                      {stack.name}
                    </h3>
                    <p className="text-white/60 text-sm line-clamp-2">{stack.problemItSolves}</p>
                  </Link>
                ))}
              </div>
              <div className="text-center mt-8">
                <Link
                  href="/bench/stacks"
                  className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
                >
                  View all Starter Stacks
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="px-4 sm:px-8 lg:px-16 py-16 lg:py-24">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-12">
              Let's Talk About Your Deal
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {ctaCards.map((card) => (
                <Link
                  key={card.title}
                  href={card.href}
                  className={`group rounded-xl p-6 border transition-all duration-300 hover:-translate-y-1 ${
                    card.primary
                      ? 'border-purple-500/50 hover:border-purple-500'
                      : 'border-white/10 hover:border-white/30'
                  }`}
                  style={{
                    background: card.primary
                      ? 'rgba(168, 85, 247, 0.15)'
                      : 'rgba(58, 58, 60, 0.6)',
                    backdropFilter: 'blur(20px)',
                  }}
                >
                  <h3 className={`text-lg font-bold mb-2 ${card.primary ? 'text-purple-400' : ''}`}>
                    {card.title}
                  </h3>
                  <p className="text-white/60 text-sm mb-4">{card.description}</p>
                  <span className="inline-flex items-center text-sm text-white/60 group-hover:text-white transition-colors">
                    Get in touch
                    <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Confidentiality Note */}
        <section className="px-4 sm:px-8 lg:px-16 pb-16">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-white/40 text-sm">
              All engagements are confidential. Standard NDAs and conflict checks apply.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
