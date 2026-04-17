import Image from "next/image";
import Link from "next/link";
import Header from "./components/Header";

export default function Home() {
  return (
    <div 
      className="min-h-screen text-white flex flex-col relative"
      style={{
        background: 'linear-gradient(135deg, #1a1a1a 0%, #3a3a3c 100%)'
      }}
    >
      
      {/* Navigation */}
      <Header />

      {/* Hero Section */}
      <div className="flex flex-col lg:flex-row items-center justify-center lg:gap-20 px-4 sm:px-8 py-8 lg:px-16 flex-1 relative z-10">
        {/* Profile Image */}
        <div className="mb-8 lg:mb-0 flex-shrink-0">
          <div className="relative">
            <Image
              src="/ryan-pfp.png"
              alt="Ryan Profile"
              width={300}
              height={300}
              className="rounded-2xl shadow-2xl w-64 h-64 sm:w-80 sm:h-80 lg:w-[450px] lg:h-[450px] object-cover"
              priority
            />
          </div>
        </div>

        {/* Hero Content */}
        <div className="flex-1 max-w-2xl text-center lg:text-left">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-6">
            Modern manufacturing,<br />
            practical tech,<br />
            fewer buzzwords.
          </h1>
          
          <p className="text-base sm:text-lg text-light-gray mb-8 leading-relaxed" style={{ color: '#a1a1a6' }}>
            From Goodyear to Rockwell to building Axiom, I&apos;ve led teams, transformed operations, and delivered results at every scale. I love helping manufacturers and PE portfolios unlock hidden value. Join my newsletter for weekly updates!
          </p>

          {/* Email Subscription Form */}
          <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <iframe src="https://embeds.beehiiv.com/6578c794-7b30-4330-aa9c-f2d57e32a0a0?slim=true" data-test-id="beehiiv-embed" height="52" frameBorder="0" scrolling="no" style={{margin: 0, borderRadius: '0px !important', backgroundColor: 'transparent'}}></iframe>
          </div>
        </div>
      </div>

      {/* Bottom Cards Section */}
      <div className="px-4 sm:px-8 pb-8 lg:px-16 flex-shrink-0 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* The Bench Card */}
          <Link href="/bench" className="group">
            <div className="bg-white/5 backdrop-blur-md border border-white/20 rounded-xl p-4 hover:bg-white/10 hover:border-white/30 hover:shadow-lg hover:shadow-blue-500/10 hover:-translate-y-1 transition-all duration-300 h-full"
                 style={{
                   background: 'rgba(58, 58, 60, 0.6)',
                   backdropFilter: 'blur(20px)',
                   WebkitBackdropFilter: 'blur(20px)'
                 }}>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-bold text-white">the bench</h3>
                <svg className="w-5 h-5 group-hover:translate-x-1 group-hover:text-blue-400 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
              <p className="text-xs leading-relaxed" style={{ color: '#a1a1a6' }}>
                Curated directory of solutions I recommend for manufacturing transformation.
              </p>
            </div>
          </Link>

          {/* Blog Card */}
          <Link href="/blog" className="group">
            <div className="bg-white/5 backdrop-blur-md border border-white/20 rounded-xl p-4 hover:bg-white/10 hover:border-white/30 hover:shadow-lg hover:shadow-blue-500/10 hover:-translate-y-1 transition-all duration-300 h-full"
                 style={{ 
                   background: 'rgba(58, 58, 60, 0.6)',
                   backdropFilter: 'blur(20px)',
                   WebkitBackdropFilter: 'blur(20px)'
                 }}>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-bold text-white">blog</h3>
                <svg className="w-5 h-5 group-hover:translate-x-1 group-hover:text-blue-400 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
              <p className="text-xs leading-relaxed" style={{ color: '#a1a1a6' }}>
                My semi-coherent ramblings posted on an async basis.
              </p>
            </div>
          </Link>

          {/* Agency Card */}
          <Link href="https://axiomsystems.io" target="_blank" className="group">
            <div className="bg-white/5 backdrop-blur-md border border-white/20 rounded-xl p-4 hover:bg-white/10 hover:border-white/30 hover:shadow-lg hover:shadow-blue-500/10 hover:-translate-y-1 transition-all duration-300 h-full"
                 style={{
                   background: 'rgba(58, 58, 60, 0.6)',
                   backdropFilter: 'blur(20px)',
                   WebkitBackdropFilter: 'blur(20px)'
                 }}>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-bold text-white">axiom systems</h3>
                <svg className="w-5 h-5 group-hover:translate-x-1 group-hover:text-blue-400 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
              <p className="text-xs leading-relaxed" style={{ color: '#a1a1a6' }}>
                My manufacturing consulting firm for growth-oriented companies.
              </p>
            </div>
          </Link>

          {/* Cool Stuff Card */}
          <Link href="/products" className="group">
            <div className="bg-white/5 backdrop-blur-md border border-white/20 rounded-xl p-4 hover:bg-white/10 hover:border-white/30 hover:shadow-lg hover:shadow-blue-500/10 hover:-translate-y-1 transition-all duration-300 h-full"
                 style={{
                   background: 'rgba(58, 58, 60, 0.6)',
                   backdropFilter: 'blur(20px)',
                   WebkitBackdropFilter: 'blur(20px)'
                 }}>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-bold text-white">cool stuff I&apos;m building</h3>
                <svg className="w-5 h-5 group-hover:translate-x-1 group-hover:text-blue-400 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
              <p className="text-xs leading-relaxed" style={{ color: '#a1a1a6' }}>
                Side projects, tools, and experiments I&apos;m working on.
              </p>
            </div>
          </Link>
        </div>

      </div>


    </div>
  );
}
