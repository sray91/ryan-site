import Header from '../../components/Header';
import Link from 'next/link';

export const metadata = {
  title: 'For Manufacturers | Ryan Cahalane',
  description: 'Modernize the plant without buying a Frankenstein stack. Prioritized roadmaps, vendor shortlists, and implementation approaches that work.',
};

export default function ManufacturersPage() {
  const whatYouGet = [
    {
      title: 'Prioritized roadmap',
      description: 'What to do first, second, never—based on your constraints, not vendor wishlists.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      ),
    },
    {
      title: 'Shortlist by your constraints',
      description: 'Brownfield, SAP, Ignition, legacy PLCs—I filter for what actually integrates with your reality.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
        </svg>
      ),
    },
    {
      title: 'Implementation approach',
      description: "A plan that won't collapse at week 6. Phased rollout, quick wins, change management baked in.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
        </svg>
      ),
    },
  ];

  const ctaCards = [
    {
      title: 'Book a Fit Check',
      description: '20 minutes to see if your situation is something I can actually help with.',
      href: '/contact',
      primary: true,
    },
    {
      title: 'Ask for a Peer Intro',
      description: "Connect with someone who's solved a similar problem in a similar plant.",
      href: '/contact?type=peer-intro',
      primary: false,
    },
    {
      title: 'Submit Your Messy Reality',
      description: 'Tell me what you\'re dealing with. No judgment, just practical next steps.',
      href: '/contact?type=situation',
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
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/20 text-blue-400 text-sm mb-6">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              For Manufacturers
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Modernize the plant without
              <br />
              <span className="text-blue-400">buying a Frankenstein stack.</span>
            </h1>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              You've got budget pressure, a brownfield mess, and vendors promising the world. 
              I help you cut through the noise and build a tech stack that actually works together.
            </p>
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
                  <div className="text-blue-400 mb-4">{item.icon}</div>
                  <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* The Reality Check */}
        <section className="px-4 sm:px-8 lg:px-16 py-12">
          <div className="max-w-4xl mx-auto">
            <div
              className="rounded-xl p-8 border border-yellow-500/30"
              style={{
                background: 'rgba(234, 179, 8, 0.1)',
              }}
            >
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-yellow-400">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                The Reality Check
              </h2>
              <p className="text-white/80 leading-relaxed mb-4">
                Most "digital transformation" projects fail because they start with technology, not problems. 
                Vendors sell you their solution before understanding your constraints. IT and OT don't talk. 
                The pilot works, but scaling kills it.
              </p>
              <p className="text-white/80 leading-relaxed">
                I've been on both sides—running plants and selling into them. I know what actually 
                gets adopted and what becomes expensive shelfware.
              </p>
            </div>
          </div>
        </section>

        {/* What I Bring Section */}
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
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">I've run plants</h3>
                    <p className="text-white/60 text-sm">Goodyear, Rockwell, real operations. Not just consulting slides.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Vendor agnostic</h3>
                    <p className="text-white/60 text-sm">No kickbacks, no commissions. I recommend what fits.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">90-day focus</h3>
                    <p className="text-white/60 text-sm">Quick wins, not 18-month science projects.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Peer network</h3>
                    <p className="text-white/60 text-sm">Connect with people who've solved your problem.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-4 sm:px-8 lg:px-16 py-16 lg:py-24">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-12">
              Get Started
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {ctaCards.map((card) => (
                <Link
                  key={card.title}
                  href={card.href}
                  className={`group rounded-xl p-6 border transition-all duration-300 hover:-translate-y-1 ${
                    card.primary
                      ? 'border-blue-500/50 hover:border-blue-500'
                      : 'border-white/10 hover:border-white/30'
                  }`}
                  style={{
                    background: card.primary
                      ? 'rgba(0, 122, 255, 0.15)'
                      : 'rgba(58, 58, 60, 0.6)',
                    backdropFilter: 'blur(20px)',
                  }}
                >
                  <h3 className={`text-lg font-bold mb-2 ${card.primary ? 'text-blue-400' : ''}`}>
                    {card.title}
                  </h3>
                  <p className="text-white/60 text-sm mb-4">{card.description}</p>
                  <span className="inline-flex items-center text-sm text-white/60 group-hover:text-white transition-colors">
                    Get started
                    <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Browse Marketplace CTA */}
        <section className="px-4 sm:px-8 lg:px-16 pb-16">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-white/60 mb-4">
              Want to explore solutions on your own?
            </p>
            <Link
              href="/marketplace"
              className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
            >
              Browse the Marketplace
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
