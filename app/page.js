import Image from "next/image";
import Link from "next/link";
import Header from "./components/Header";

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
      <Header />

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
          <iframe src="https://embeds.beehiiv.com/6578c794-7b30-4330-aa9c-f2d57e32a0a0?slim=true" data-test-id="beehiiv-embed" height="52" frameBorder="0" scrolling="no" style={{margin: 0, borderRadius: '0px !important', backgroundColor: 'transparent'}}></iframe>
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
