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
  // Debug: Log the content being rendered
  console.log('BlogContentRenderer received content:', content);
  
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

    // Debug: Log processed content
    console.log('Processed content HTML:', doc.body.innerHTML);
    
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
      {/* Debug: Show raw content */}
      <details className="mb-4 text-xs text-gray-500">
        <summary>Debug: Raw HTML Content</summary>
        <pre className="whitespace-pre-wrap break-all bg-gray-100 p-2 rounded mt-2">
          {content}
        </pre>
      </details>
      
      <div 
        dangerouslySetInnerHTML={{ __html: content }}
        style={{ 
          lineHeight: '1.7',
        }}
        className="[&_img]:max-w-full [&_img]:h-auto [&_img]:my-4 [&_img]:rounded-lg [&_img]:shadow-md [&_img]:block [&_img]:border-2 [&_img]:border-red-500"
      />
      
      {/* Debug: Try rendering images directly to see if CSS is the issue */}
      <div className="mt-4 p-4 bg-yellow-100 border border-yellow-400 rounded">
        <h4 className="font-bold mb-2">Debug: Testing image display</h4>
        <p className="text-sm mb-2">Raw content length: {content?.length || 0}</p>
        <p className="text-sm mb-2">Contains img tags: {content?.includes('<img') ? 'YES' : 'NO'}</p>
        {content?.includes('<img') && (
          <div className="border-2 border-blue-500 p-2">
            <p className="text-xs mb-1">Direct img render:</p>
            <div dangerouslySetInnerHTML={{ __html: content.match(/<img[^>]*>/g)?.join('') || 'No img tags found' }} />
          </div>
        )}
      </div>
      
      {/* Render PDF carousels at the end */}
      {pdfCarousels.map((carousel, index) => (
        <div key={carousel.id} className="my-6">
          <PDFCarousel pdfUrl={carousel.url} />
        </div>
      ))}
    </div>
  );
} 