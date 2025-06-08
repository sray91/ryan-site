'use client';

import { useMemo } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import PDFCarousel to avoid SSR issues
const PDFCarousel = dynamic(() => import('./PDFCarousel'), {
  ssr: false,
  loading: () => (
    <div className="bg-gray-100 rounded-lg p-8 text-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
      <p className="text-gray-600">Loading PDF...</p>
    </div>
  )
});

export default function BlogContentRenderer({ content, className = '' }) {
  const { processedContent, pdfCarousels } = useMemo(() => {
    if (!content) return { processedContent: '', pdfCarousels: [] };

    // Parse content and extract PDF URLs
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');
    const pdfElements = doc.querySelectorAll('.pdf-carousel[data-pdf-url]');
    
    const carousels = [];
    pdfElements.forEach((element, index) => {
      const pdfUrl = element.getAttribute('data-pdf-url');
      if (pdfUrl) {
        carousels.push({ url: pdfUrl, id: `pdf-${index}` });
        // Replace with a simple div that we'll target
        element.outerHTML = `<div id="pdf-placeholder-${index}" class="pdf-placeholder-marker"></div>`;
      }
    });

    return {
      processedContent: doc.body.innerHTML,
      pdfCarousels: carousels
    };
  }, [content]);

  const finalContent = useMemo(() => {
    let htmlContent = processedContent;
    
    // Replace placeholders with proper divs for PDF rendering
    pdfCarousels.forEach((carousel, index) => {
      const placeholder = `<div id="pdf-placeholder-${index}" class="pdf-placeholder-marker"></div>`;
      const replacement = `<div class="pdf-carousel-container" data-pdf-index="${index}"></div>`;
      htmlContent = htmlContent.replace(placeholder, replacement);
    });

    return htmlContent;
  }, [processedContent, pdfCarousels]);

  return (
    <div className={`prose prose-sm sm:prose lg:prose-lg xl:prose-2xl max-w-none ${className}`}>
      <div 
        dangerouslySetInnerHTML={{ __html: finalContent }}
        style={{ lineHeight: '1.7' }}
      />
      
      {/* Render PDF carousels at the end */}
      {pdfCarousels.map((carousel, index) => (
        <div key={carousel.id} className="my-6">
          <PDFCarousel pdfUrl={carousel.url} />
        </div>
      ))}
    </div>
  );
} 