import Image from "next/image";
import Link from "next/link";
import Header from "./components/Header";

export default function Home() {
  return (
    <div 
      className="min-h-screen text-white flex flex-col relative"
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
      <div className="flex flex-col lg:flex-row items-center justify-between px-4 sm:px-8 py-8 lg:px-16 flex-1 relative z-10">
        {/* Profile Image */}
        <div className="mb-8 lg:mb-0 lg:mr-12 flex-shrink-0">
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
            Manufacturing executive.<br />
            Storyteller.<br />
            Idea man.
          </h1>
          
          <p className="text-base sm:text-lg text-white/80 mb-8 leading-relaxed">
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


    </div>
  );
}
