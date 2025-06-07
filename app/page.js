import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-8 py-6 lg:px-16">
        <div className="text-3xl font-bold text-white">
          ryan
        </div>
        <div className="hidden md:flex items-center space-x-8">
          <Link href="/about" className="text-white/80 hover:text-white transition-colors">
            about
          </Link>
          <Link href="/blog" className="text-white/80 hover:text-white transition-colors">
            blog
          </Link>
          <Link href="/agency" className="text-white/80 hover:text-white transition-colors">
            agency
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
      <div className="flex flex-col lg:flex-row items-center justify-between px-8 py-16 lg:px-16 lg:py-24">
        {/* Profile Image */}
        <div className="mb-12 lg:mb-0 lg:mr-16">
          <div className="relative">
            <Image
              src="/ryan-pfp.png"
              alt="Ryan Profile"
              width={400}
              height={400}
              className="rounded-2xl shadow-2xl"
              priority
            />
          </div>
        </div>

        {/* Hero Content */}
        <div className="flex-1 max-w-2xl">
          <h1 className="text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Optimize Your Life<br />
            To Build A Legacy
          </h1>
          
          <p className="text-xl text-white/80 mb-8 leading-relaxed">
            How to build businesses, stay creative, and still enjoy the ride - 
            get my daily blueprint for ambitious builders.
          </p>

          {/* Email Subscription Form */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
            <button className="px-8 py-4 bg-orange-500 hover:bg-orange-600 rounded-lg font-semibold transition-colors whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Cards Section */}
      <div className="px-8 pb-16 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Blog Card */}
          <Link href="/blog" className="group">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300 h-full">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold">blog</h3>
                <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
              <p className="text-white/70 text-sm leading-relaxed">
                My semi-coherent ramblings posted on an async basis.
              </p>
            </div>
          </Link>

          {/* Agency Card */}
          <Link href="/agency" className="group">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300 h-full">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold">agency</h3>
                <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
              <p className="text-white/70 text-sm leading-relaxed">
                Ghostletter. The DFY ghostwriting agency for technical founders and CEOs.
              </p>
            </div>
          </Link>

          {/* Book a Call Card */}
          <Link href="/contact" className="group">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300 h-full">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold">book a call</h3>
                <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
                             <p className="text-white/70 text-sm leading-relaxed">
                 Let&apos;s chat!
               </p>
            </div>
          </Link>

          {/* Digital Products Card */}
          <Link href="/products" className="group">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300 h-full">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold">digital products</h3>
                <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
              <p className="text-white/70 text-sm leading-relaxed">
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
