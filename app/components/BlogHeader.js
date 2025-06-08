'use client';

import Link from "next/link";
import { useState } from "react";

export default function BlogHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="flex items-center justify-between px-4 sm:px-8 py-4 lg:px-16 flex-shrink-0 relative z-20 bg-white border-b border-gray-200">
      <div>
        <Link href="/" className="text-gray-900 hover:text-gray-700 transition-colors">
          <h1 
            className="text-2xl sm:text-3xl lg:text-4xl tracking-tight uppercase"
            style={{ fontFamily: 'BDO Grotesk, sans-serif', fontWeight: 900 }}
          >
            Ryan Cahalane
          </h1>
        </Link>
      </div>
      
      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center space-x-8">
        <Link href="/about" className="text-gray-700 hover:text-gray-900 transition-colors">
          about
        </Link>
        <Link href="/blog" className="text-gray-700 hover:text-gray-900 transition-colors font-medium">
          blog
        </Link>
        <Link href="https://axiomsystems.io" target="_blank" className="text-gray-700 hover:text-gray-900 transition-colors">
          firm
        </Link>
        <Link 
          href="/newsletter" 
          className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-colors"
        >
          newsletter
        </Link>
      </div>

      {/* Mobile Menu Button */}
      <button 
        className="md:hidden text-gray-700 hover:text-gray-900 p-2"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label="Toggle mobile menu"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {isMobileMenuOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white border-b border-gray-200 md:hidden shadow-lg">
          <div className="flex flex-col space-y-4 px-4 py-6">
            <Link 
              href="/about" 
              className="text-gray-700 hover:text-gray-900 transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              about
            </Link>
            <Link 
              href="/blog" 
              className="text-gray-700 hover:text-gray-900 transition-colors py-2 font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              blog
            </Link>
            <Link 
              href="https://axiomsystems.io" 
              target="_blank" 
              className="text-gray-700 hover:text-gray-900 transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              firm
            </Link>
            <Link 
              href="/newsletter" 
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-3 rounded-lg transition-colors text-center"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              newsletter
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
} 