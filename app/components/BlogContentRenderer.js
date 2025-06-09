'use client';

import React, { useEffect, useRef } from 'react';

export default function BlogContentRenderer({ content, className = '' }) {
  const contentRef = useRef(null);

  useEffect(() => {
    if (contentRef.current && typeof window !== 'undefined') {
      console.log('BlogContentRenderer: Processing content for PDFs');
      
      // Find all PDF placeholders and replace them with proper PDF viewers
      const pdfPlaceholders = contentRef.current.querySelectorAll('.pdf-carousel[data-pdf-url]');
      console.log('Found PDF placeholders:', pdfPlaceholders.length);
      
      pdfPlaceholders.forEach((placeholder, index) => {
        const pdfUrl = placeholder.getAttribute('data-pdf-url');
        console.log(`Processing PDF ${index}:`, pdfUrl);
        
        if (pdfUrl && !placeholder.classList.contains('pdf-processed')) {
          // Mark as processed to avoid re-processing
          placeholder.classList.add('pdf-processed');
          
          // Get the PDF filename from the existing content
          const pdfNameElement = placeholder.querySelector('h3, p');
          const pdfName = pdfNameElement ? pdfNameElement.textContent : 'PDF Document';
          console.log('PDF name:', pdfName);
          
          // Create a simpler iframe-based PDF viewer that works reliably
          const pdfViewer = document.createElement('div');
          pdfViewer.className = 'bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden max-w-full my-6';
          pdfViewer.innerHTML = `
            <div class="bg-gray-50 px-4 py-3 border-b border-gray-200">
              <div class="flex items-center justify-between">
                <h3 class="text-lg font-medium text-gray-900">${pdfName}</h3>
                <div class="flex items-center space-x-4">
                  <a 
                    href="${pdfUrl}" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    class="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    Open in New Tab
                  </a>
                  <a 
                    href="${pdfUrl}" 
                    download
                    class="inline-flex items-center text-sm text-green-600 hover:text-green-800 transition-colors"
                  >
                    Download
                  </a>
                </div>
              </div>
            </div>
            <div class="relative bg-gray-100">
              <iframe
                src="${pdfUrl}#toolbar=1&view=FitH"
                width="100%"
                height="600"
                style="border: none; display: block;"
                title="${pdfName}"
                class="w-full"
                loading="lazy"
              ></iframe>
            </div>
          `;
          
          console.log('Replacing placeholder with PDF viewer');
          // Replace the placeholder with the actual PDF viewer
          placeholder.parentNode.replaceChild(pdfViewer, placeholder);
        }
      });
    }
  }, [content]);

  if (!content) {
    return <div>No content to display</div>;
  }

  // If content is just plain text without HTML tags, wrap it in a paragraph
  let processedContent = content;
  if (typeof content === 'string' && !content.includes('<') && !content.includes('>')) {
    // Clean the content first - remove any weird whitespace
    const cleanContent = content.replace(/\s+/g, ' ').trim();
    processedContent = `<p>${cleanContent}</p>`;
  }

  return (
    <div className={`prose prose-lg max-w-none ${className}`}>
      <div 
        ref={contentRef}
        dangerouslySetInnerHTML={{ __html: processedContent }}
        className="prose-content [&_img]:max-w-full [&_img]:h-auto [&_img]:my-4 [&_img]:rounded-lg [&_img]:shadow-sm whitespace-normal"
        style={{ 
          wordBreak: 'normal', 
          overflowWrap: 'break-word',
          display: 'block',
          whiteSpace: 'normal'
        }}
      />
    </div>
  );
} 