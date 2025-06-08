import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div 
      className="h-screen text-white flex flex-col relative"
      style={{
        backgroundImage: 'url(/bg.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Dark blue transparent overlay */}
      <div className="absolute inset-0 bg-blue-900/90 z-0"></div>
      
      {/* Navigation */}
      <nav className="flex items-center justify-between px-8 py-4 lg:px-16 flex-shrink-0 relative z-10">
        <div>
          <Image
            src="/signature.png"
            alt="Ryan Signature"
            width={240}
            height={80}
            className="h-24 w-auto"
            priority
          />
        </div>
        <div className="hidden md:flex items-center space-x-8">
          <Link href="/about" className="text-white/80 hover:text-white transition-colors">
            about
          </Link>
          <Link href="/blog" className="text-white/80 hover:text-white transition-colors">
            blog
          </Link>
          <Link href="https://axiomsystems.io" target="_blank" className="text-white/80 hover:text-white transition-colors">
            firm
          </Link>
          <Link 
            href="/newsletter" 
            className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-lg transition-colors"
          >
            newsletter
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="flex flex-col lg:flex-row items-center justify-between px-8 py-6 lg:px-16 flex-1 min-h-0 relative z-10">
        {/* Profile Image */}
        <div className="mb-6 lg:mb-0 lg:mr-12 flex-shrink-0">
          <div className="relative">
            <Image
              src="/ryan-pfp.png"
              alt="Ryan Profile"
              width={450}
              height={450}
              className="rounded-2xl shadow-2xl"
              priority
            />
          </div>
        </div>

        {/* Hero Content */}
        <div className="flex-1 max-w-2xl">
          <h1 className="text-4xl lg:text-5xl font-bold leading-tight mb-4">
            Manufacturing executive.<br />
            Storyteller.<br />
            Idea man.
          </h1>
          
          <p className="text-lg text-white/80 mb-6 leading-relaxed">
            From Goodyear to Rockwell to building Axiom, I&apos;ve led teams, transformed operations, and delivered results at every scale. I love helping manufacturers and PE portfolios unlock hidden value. Join my newsletter for weekly updates!
          </p>

          {/* Email Subscription Form */}
          <div className="flex flex-col sm:flex-row gap-3 mb-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
            <button className="px-6 py-3 bg-orange-500 hover:bg-orange-600 rounded-lg font-semibold transition-colors whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Cards Section */}
      <div className="px-8 pb-8 lg:px-16 flex-shrink-0 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Blog Card */}
          <Link href="/blog" className="group">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-all duration-300 h-full">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-bold">blog</h3>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
              <p className="text-white/70 text-xs leading-relaxed">
                My semi-coherent ramblings posted on an async basis.
              </p>
            </div>
          </Link>

          {/* Agency Card */}
          <Link href="https://axiomsystems.io" target="_blank" className="group">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-all duration-300 h-full">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-bold">consulting firm</h3>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
              <p className="text-white/70 text-xs leading-relaxed">
                Axiom Systems. Manufacturing consulting firm for smalle to mid-sized manufacturers.
              </p>
            </div>
          </Link>

          {/* Book a Call Card */}
          <Link href="/contact" className="group">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-all duration-300 h-full">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-bold">book a call</h3>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
              <p className="text-white/70 text-xs leading-relaxed">
                Let&apos;s chat!
              </p>
            </div>
          </Link>

          {/* Digital Products Card */}
          <Link href="/products" className="group">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-all duration-300 h-full">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-bold">digital products</h3>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
              <p className="text-white/70 text-xs leading-relaxed">
                Resources for your online journey.
              </p>
            </div>
          </Link>
        </div>
      </div>

      {/* Mobile Menu Button (for future implementation) */}
      <div className="md:hidden fixed top-6 right-8">
        <button className="text-white/80 hover:text-white">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </div>
  );
}
