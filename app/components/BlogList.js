'use client';

import Link from 'next/link';
import { format } from 'date-fns';
import { useState } from 'react';
import PageShell from './PageShell';
import BlogCategoryCards from './BlogCategoryCards';
import BlogSearchBar from './BlogSearchBar';

export default function BlogList({ posts }) {
  const [selectedCategorySlug, setSelectedCategorySlug] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Helper function to strip HTML tags and decode HTML entities
  const stripHtml = (html) => {
    if (!html) return '';
    // First, create a temporary element to decode HTML entities
    const doc = new DOMParser().parseFromString(html, 'text/html');
    // Then get the text content, which automatically strips HTML and decodes entities
    return doc.body.textContent || '';
  };

  const filteredPosts = posts
    .filter(post => {
      // Apply category filter
      if (selectedCategorySlug) {
        const postCategories = post.categories || [];
        // Check if any of the post's categories match the selected category slug
        const hasCategory = postCategories.some(cat => {
          const catSlug = cat.slug;
          const catTitleRaw = cat.title.toLowerCase();
          // Simple slugify for fallback
          const catTitleSlug = catTitleRaw.replace(/\s+/g, '-');
          
          if (selectedCategorySlug === catSlug) return true;
          if (selectedCategorySlug === catTitleSlug) return true;

          // Handle singular/plural mismatch (simple heuristic)
          if (selectedCategorySlug === catTitleSlug + 's') return true;
          if (catTitleSlug === selectedCategorySlug + 's') return true;
          
          return false;
        });
        
        if (!hasCategory) {
          return false;
        }
      }
      
      // Apply search filter
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        const titleMatch = post.title.toLowerCase().includes(searchLower);
        const excerptMatch = post.excerpt.toLowerCase().includes(searchLower);
        const contentMatch = stripHtml(post.content).toLowerCase().includes(searchLower);
        // Search in category titles
        const categoryMatch = post.categories && post.categories.some(cat => cat.title.toLowerCase().includes(searchLower));
        
        return titleMatch || excerptMatch || contentMatch || categoryMatch;
      }
      
      return true;
    })
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <PageShell>
      <div className="pt-14 sm:pt-20 pb-12">
        <div className="max-w-4xl mx-auto px-5">
          <div className="mb-12">
            <div className="rc-eyebrow mb-4">Writing</div>
            <h1 className="rc-serif text-5xl sm:text-6xl font-semibold tracking-tight">Writing</h1>
            <p className="mt-5 text-lg" style={{ color: "var(--rc-muted)" }}>Operations, industrial software and the people stuck between them.</p>
          </div>

          <BlogCategoryCards onCategorySelect={setSelectedCategorySlug} />
          
          <BlogSearchBar onSearch={setSearchTerm} />

          {(selectedCategorySlug || searchTerm) && (
            <div className="mb-8 flex flex-wrap items-center gap-4">
              {selectedCategorySlug && (
                <div className="flex items-center">
                  <span className="text-gray-600 mr-2">Category:</span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                    {/* Try to find the readable name from the slug if possible, or just show slug */}
                    {selectedCategorySlug} 
                    <button
                      onClick={() => setSelectedCategorySlug(null)}
                      className="ml-2 focus:outline-none"
                    >
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </span>
                </div>
              )}
              {searchTerm && (
                <div className="flex items-center">
                  <span className="text-gray-600 mr-2">Search:</span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                    {searchTerm}
                    <button
                      onClick={() => setSearchTerm('')}
                      className="ml-2 focus:outline-none"
                    >
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </span>
                </div>
              )}
            </div>
          )}

          {filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                {selectedCategorySlug && searchTerm
                  ? `No posts found matching "${searchTerm}" in the selected category`
                  : selectedCategorySlug
                  ? `No posts found in the selected category`
                  : searchTerm
                  ? `No posts found matching "${searchTerm}"`
                  : 'No blog posts yet. Check back soon!'}
              </p>
            </div>
          ) : (
            <div className="grid gap-8">
              {filteredPosts.map((post) => (
                <article key={post.id} className="rc-card overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <time className="rc-eyebrow">
                        {format(new Date(post.createdAt), 'MMMM d, yyyy')}
                      </time>
                    </div>
                    <h2 className="rc-serif text-2xl sm:text-3xl font-semibold leading-tight mb-3">
                      <Link 
                        href={`/blog/${post.slug}`}
                        className="hover:text-[var(--rc-copper)] transition-colors"
                      >
                        {post.title}
                      </Link>
                    </h2>
                    <p className="mb-4 leading-relaxed" style={{ color: "var(--rc-muted)" }}>{post.excerpt}</p>
                    {post.categories && post.categories.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.categories.map((cat, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-2.5 py-1 text-xs rounded-full" style={{ background: "var(--rc-copper-soft)", color: "#7a4319" }}
                          >
                            {cat.title}
                          </span>
                        ))}
                      </div>
                    )}
                    <Link 
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center font-semibold hover:text-[var(--rc-copper)]"
                    >
                      Read more →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
          
        </div>
      </div>
    </PageShell>
  );
}
