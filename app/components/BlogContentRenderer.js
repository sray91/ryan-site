'use client';

import { useEffect, useRef } from 'react';

export default function BlogContentRenderer({ content, className = '' }) {
  const contentRef = useRef(null);

  useEffect(() => {
    if (contentRef.current) {
      // Find all PDF placeholders and replace them with embedded viewers
      const pdfPlaceholders = contentRef.current.querySelectorAll('.pdf-carousel[data-pdf-url]');
      
      pdfPlaceholders.forEach((placeholder) => {
        const pdfUrl = placeholder.getAttribute('data-pdf-url');
        if (pdfUrl) {
          // Get the PDF filename from the existing content
          const pdfNameElement = placeholder.querySelector('p');
          const pdfName = pdfNameElement ? pdfNameElement.textContent : 'PDF Document';
          
          // Create a proper PDF viewer
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
                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    Open in New Tab
                  </a>
                  <a 
                    href="${pdfUrl}" 
                    download
                    class="inline-flex items-center text-sm text-green-600 hover:text-green-800 transition-colors"
                  >
                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Download
                  </a>
                </div>
              </div>
            </div>
            <div class="relative">
              <iframe
                src="${pdfUrl}#toolbar=1&navpanes=1&scrollbar=1"
                width="100%"
                height="600"
                style="border: none;"
                title="${pdfName}"
                class="w-full"
              ></iframe>
            </div>
          `;
          
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