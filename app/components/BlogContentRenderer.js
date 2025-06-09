'use client';

import React, { useEffect, useRef } from 'react';

export default function BlogContentRenderer({ content, className = '' }) {
  const contentRef = useRef(null);

  useEffect(() => {
    if (contentRef.current && typeof window !== 'undefined') {
      console.log('BlogContentRenderer: Processing content for PDFs');
      
      // Look for PDF markers in the content
      const content = contentRef.current.innerHTML;
      
      // Try new format first
      const newFormatRegex = /PDF_MARKER_START_([^_]+)_NAME_([^_]+)_PDF_MARKER_END/g;
      // Try old format as fallback
      const oldFormatRegex = /PDF_MARKER_START:([^:]+):([^:]+):PDF_MARKER_END/g;
      
      let match;
      const replacements = [];
      
      // Check new format
      while ((match = newFormatRegex.exec(content)) !== null) {
        const [fullMatch, encodedUrl, encodedName] = match;
        const pdfUrl = decodeURIComponent(encodedUrl);
        const fileName = decodeURIComponent(encodedName);
        console.log('Found new PDF marker:', { pdfUrl, fileName });
        replacements.push({ fullMatch, pdfUrl, fileName });
      }
      
      // Check old format
      while ((match = oldFormatRegex.exec(content)) !== null) {
        const [fullMatch, pdfUrl, fileName] = match;
        console.log('Found old PDF marker:', { pdfUrl, fileName });
        replacements.push({ fullMatch, pdfUrl, fileName });
      }
      
      if (replacements.length > 0) {
        let updatedContent = content;
        
        replacements.forEach(({ fullMatch, pdfUrl, fileName }) => {
          const pdfViewer = `
            <div style="margin: 2rem 0; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden; background: white;">
              <div style="background: #f9fafb; padding: 1rem; border-bottom: 1px solid #e5e7eb; display: flex; justify-content: space-between; align-items: center;">
                <h3 style="margin: 0; font-size: 1.125rem; font-weight: 600;">${fileName}</h3>
                <div style="display: flex; gap: 1rem;">
                  <a href="${pdfUrl}" target="_blank" style="color: #2563eb; text-decoration: none; font-size: 0.875rem;">Open in New Tab</a>
                  <a href="${pdfUrl}" download style="color: #059669; text-decoration: none; font-size: 0.875rem;">Download</a>
                </div>
              </div>
              <div style="background: #f3f4f6;">
                <iframe 
                  src="${pdfUrl}#toolbar=1&view=FitH" 
                  width="100%" 
                  height="600" 
                  style="border: none; display: block;"
                  title="${fileName}"
                ></iframe>
              </div>
            </div>
          `;
          
          // Replace the marker text with the PDF viewer
          updatedContent = updatedContent.replace(
            new RegExp(`<p><strong>${fullMatch.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}</strong></p>`, 'g'),
            pdfViewer
          );
        });
        
        contentRef.current.innerHTML = updatedContent;
        console.log('Replaced PDF markers with viewers');
      }
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