'use client';

import Link from "next/link";
import { useState, useRef, useEffect } from "react";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isFocusDropdownOpen, setIsFocusDropdownOpen] = useState(false);
  const [isMarketplaceDropdownOpen, setIsMarketplaceDropdownOpen] = useState(false);
  const [isMobileFocusOpen, setIsMobileFocusOpen] = useState(false);
  const [isMobileMarketplaceOpen, setIsMobileMarketplaceOpen] = useState(false);
  const focusDropdownRef = useRef(null);
  const marketplaceDropdownRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (focusDropdownRef.current && !focusDropdownRef.current.contains(event.target)) {
        setIsFocusDropdownOpen(false);
      }
      if (marketplaceDropdownRef.current && !marketplaceDropdownRef.current.contains(event.target)) {
        setIsMarketplaceDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const focusLinks = [
    { href: '/focus/manufacturers', label: 'For Manufacturers' },
    { href: '/focus/tech-firms', label: 'For Tech Firms' },
    { href: '/focus/pe-consulting', label: 'For PE & Consultancies' },
  ];

  const benchLinks = [
    { href: '/bench', label: 'All Solutions' },
    { href: '/bench/stacks', label: 'Starter Stacks' },
    { href: '/bench/things-we-like', label: 'Things We Like' },
  ];

  return (
    <nav className="flex items-center justify-between px-4 sm:px-8 py-4 lg:px-16 flex-shrink-0 relative z-20">
      <div>
        <Link href="/" className="text-white hover:text-white/90 transition-colors">
          <h1 
            className="text-2xl sm:text-3xl lg:text-4xl tracking-tight uppercase"
            style={{ fontFamily: 'BDO Grotesk, sans-serif', fontWeight: 900 }}
          >
            Ryan Cahalane
          </h1>
        </Link>
      </div>
      
      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
        <Link href="/about" className="text-white/80 hover:text-white transition-colors">
          about
        </Link>
        <Link href="/blog" className="text-white/80 hover:text-white transition-colors">
          blog
        </Link>
        {/* The Bench Dropdown */}
        <div className="relative" ref={marketplaceDropdownRef}>
          <button
            className="text-white/80 hover:text-white transition-colors flex items-center gap-1"
            onClick={() => setIsMarketplaceDropdownOpen(!isMarketplaceDropdownOpen)}
            onMouseEnter={() => setIsMarketplaceDropdownOpen(true)}
          >
            the bench
            <svg
              className={`w-4 h-4 transition-transform ${isMarketplaceDropdownOpen ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {isMarketplaceDropdownOpen && (
            <div
              className="absolute top-full left-0 mt-2 w-48 rounded-xl overflow-hidden shadow-xl border border-white/20"
              style={{
                background: 'rgba(58, 58, 60, 0.95)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)'
              }}
              onMouseLeave={() => setIsMarketplaceDropdownOpen(false)}
            >
              {benchLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block px-4 py-3 text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                  onClick={() => setIsMarketplaceDropdownOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Focus Dropdown */}
        <div className="relative" ref={focusDropdownRef}>
          <button 
            className="text-white/80 hover:text-white transition-colors flex items-center gap-1"
            onClick={() => setIsFocusDropdownOpen(!isFocusDropdownOpen)}
            onMouseEnter={() => setIsFocusDropdownOpen(true)}
          >
            focus
            <svg 
              className={`w-4 h-4 transition-transform ${isFocusDropdownOpen ? 'rotate-180' : ''}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          {isFocusDropdownOpen && (
            <div 
              className="absolute top-full left-0 mt-2 w-56 rounded-xl overflow-hidden shadow-xl border border-white/20"
              style={{
                background: 'rgba(58, 58, 60, 0.95)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)'
              }}
              onMouseLeave={() => setIsFocusDropdownOpen(false)}
            >
              {focusLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block px-4 py-3 text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                  onClick={() => setIsFocusDropdownOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          )}
        </div>

        <Link 
          href="/newsletter" 
          className="px-4 py-2 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 hover:-translate-y-0.5"
          style={{
            background: 'linear-gradient(135deg, #007AFF 0%, #0056CC 100%)',
            boxShadow: '0 4px 15px rgba(0, 122, 255, 0.3)'
          }}
        >
          newsletter
        </Link>
      </div>

      {/* Mobile Menu Button */}
      <button 
        className="md:hidden text-white/80 hover:text-white p-2"
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
        <div className="absolute top-full left-0 right-0 backdrop-blur-md border-t border-white/20 md:hidden"
             style={{
               background: 'rgba(58, 58, 60, 0.95)',
               backdropFilter: 'blur(20px)',
               WebkitBackdropFilter: 'blur(20px)'
             }}>
          <div className="flex flex-col px-4 py-6">
            <Link 
              href="/about" 
              className="text-white/80 hover:text-white transition-colors py-3 border-b border-white/10"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              about
            </Link>
            <Link 
              href="/blog" 
              className="text-white/80 hover:text-white transition-colors py-3 border-b border-white/10"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              blog
            </Link>
            {/* Mobile The Bench Accordion */}
            <div className="border-b border-white/10">
              <button
                className="w-full text-left text-white/80 hover:text-white transition-colors py-3 flex items-center justify-between"
                onClick={() => setIsMobileMarketplaceOpen(!isMobileMarketplaceOpen)}
              >
                the bench
                <svg
                  className={`w-4 h-4 transition-transform ${isMobileMarketplaceOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isMobileMarketplaceOpen && (
                <div className="pl-4 pb-2">
                  {benchLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="block text-white/60 hover:text-white transition-colors py-2 text-sm"
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        setIsMobileMarketplaceOpen(false);
                      }}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Focus Accordion */}
            <div className="border-b border-white/10">
              <button 
                className="w-full text-left text-white/80 hover:text-white transition-colors py-3 flex items-center justify-between"
                onClick={() => setIsMobileFocusOpen(!isMobileFocusOpen)}
              >
                focus
                <svg 
                  className={`w-4 h-4 transition-transform ${isMobileFocusOpen ? 'rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isMobileFocusOpen && (
                <div className="pl-4 pb-2">
                  {focusLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="block text-white/60 hover:text-white transition-colors py-2 text-sm"
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        setIsMobileFocusOpen(false);
                      }}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link 
              href="/newsletter" 
              className="px-4 py-3 rounded-lg transition-all duration-300 text-center hover:shadow-lg hover:shadow-blue-500/20 mt-4"
              style={{
                background: 'linear-gradient(135deg, #007AFF 0%, #0056CC 100%)',
                boxShadow: '0 4px 15px rgba(0, 122, 255, 0.3)'
              }}
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
