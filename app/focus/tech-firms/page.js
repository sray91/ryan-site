import Header from '../../components/Header';
import Link from 'next/link';

export const metadata = {
  title: 'For Tech Firms | Ryan Cahalane',
  description: 'Build for operators. Sell like you\'ve been in a plant. Product positioning, GTM strategy, and customer discovery for manufacturing tech.',
};

export default function TechFirmsPage() {
  const whatYouGet = [
    {
      title: 'Product positioning',
      description: 'Messaging that maps to real manufacturing pain—not generic "Industry 4.0" buzzwords.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
    },
    {
      title: 'GTM that avoids "we do everything"',
      description: 'Focused beachhead, clear ICP, sales motion that actually closes in manufacturing.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
    },
    {
      title: 'Discovery with real manufacturers',
      description: 'Access to your ICP, not random logos. Facilitated conversations that surface real needs.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
  ];

  const ctaCards = [
    {
      title: 'Fractional Product/GTM Support',
      description: 'Ongoing strategic support as an extension of your team. Weekly or monthly.',
      href: '/contact?type=advisory',
      primary: true,
    },
    {
      title: 'Board / Advisory',
      description: 'Help your board understand the industrial market. Manufacturing expertise when you need it.',
      href: '/contact?type=board',
      primary: false,
    },
    {
      title: 'Customer Discovery Sprint',
      description: '2-4 week sprint: introductions, facilitated calls, synthesis.',
      href: '/contact?type=discovery',
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
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/20 text-green-400 text-sm mb-6">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
              For Tech Firms
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Build for operators.
              <br />
              <span className="text-green-400">Sell like you've been in a plant.</span>
            </h1>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Manufacturing is not SaaS. Sales cycles are longer, stakeholders are skeptical, 
              and your competition is the spreadsheet they've used for 20 years. I help you break in.
            </p>
          </div>
        </section>

        {/* The Challenge */}
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
                The Problem
              </h2>
              <p className="text-white/80 leading-relaxed mb-4">
                Most manufacturing tech companies die in the pilot phase. The demo looks great, 
                but scaling fails because the product doesn't fit the real workflow, the sales 
                team doesn't speak OT, and procurement doesn't trust the startup.
              </p>
              <p className="text-white/80 leading-relaxed">
                Plants have been burned by vendors who overpromise and underdeliver. They need 
                proof, not promises. Your challenge is building that trust before you run out of runway.
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
                  <div className="text-green-400 mb-4">{item.icon}</div>
                  <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Who This Is For */}
        <section className="px-4 sm:px-8 lg:px-16 py-16">
          <div className="max-w-4xl mx-auto">
            <div
              className="rounded-xl p-8 lg:p-12 border border-white/10"
              style={{
                background: 'rgba(58, 58, 60, 0.6)',
                backdropFilter: 'blur(20px)',
              }}
            >
              <h2 className="text-2xl font-bold mb-6">Who This Is For</h2>
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-green-400 mb-3">Good Fit</h3>
                  <ul className="space-y-2 text-white/70 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-green-400">✓</span>
                      Series A-C manufacturing tech startups
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-400">✓</span>
                      Corporate ventures entering manufacturing
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-400">✓</span>
                      SaaS companies expanding to industrial
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-400">✓</span>
                      VCs doing diligence on manufacturing deals
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-red-400 mb-3">Not a Fit</h3>
                  <ul className="space-y-2 text-white/70 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-red-400">✗</span>
                      Pre-product companies (too early)
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-400">✗</span>
                      Consumer-focused products
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-400">✗</span>
                      Looking for a sales rep on commission
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-400">✗</span>
                      Need implementation services
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What I Bring */}
        <section className="px-4 sm:px-8 lg:px-16 py-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-8">What I Bring</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-white/5 text-center">
                <div className="text-3xl mb-2">🏭</div>
                <p className="text-sm text-white/70">Plant floor experience (Goodyear, Rockwell)</p>
              </div>
              <div className="p-4 rounded-lg bg-white/5 text-center">
                <div className="text-3xl mb-2">🎯</div>
                <p className="text-sm text-white/70">Built and scaled manufacturing tech GTM</p>
              </div>
              <div className="p-4 rounded-lg bg-white/5 text-center">
                <div className="text-3xl mb-2">🤝</div>
                <p className="text-sm text-white/70">Network of operators who take calls</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-4 sm:px-8 lg:px-16 py-16 lg:py-24">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-12">
              Let's Talk
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {ctaCards.map((card) => (
                <Link
                  key={card.title}
                  href={card.href}
                  className={`group rounded-xl p-6 border transition-all duration-300 hover:-translate-y-1 ${
                    card.primary
                      ? 'border-green-500/50 hover:border-green-500'
                      : 'border-white/10 hover:border-white/30'
                  }`}
                  style={{
                    background: card.primary
                      ? 'rgba(34, 197, 94, 0.15)'
                      : 'rgba(58, 58, 60, 0.6)',
                    backdropFilter: 'blur(20px)',
                  }}
                >
                  <h3 className={`text-lg font-bold mb-2 ${card.primary ? 'text-green-400' : ''}`}>
                    {card.title}
                  </h3>
                  <p className="text-white/60 text-sm mb-4">{card.description}</p>
                  <span className="inline-flex items-center text-sm text-white/60 group-hover:text-white transition-colors">
                    Learn more
                    <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
