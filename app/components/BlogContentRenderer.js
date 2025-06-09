'use client';

import React, { useEffect, useRef } from 'react';

export default function BlogContentRenderer({ content, className = '' }) {
  const contentRef = useRef(null);

  useEffect(() => {
    if (contentRef.current && typeof window !== 'undefined') {
      console.log('BlogContentRenderer: Processing content for PDFs');
      console.log('Content HTML:', contentRef.current.innerHTML);
      
      // Look for existing iframes that might have PDF URLs
      const iframes = contentRef.current.querySelectorAll('iframe');
      console.log('Found iframes:', iframes.length);
      
      iframes.forEach((iframe, index) => {
        console.log(`Iframe ${index} src:`, iframe.src);
        
        // Check if this iframe has a PDF-like URL
        if (iframe.src && (iframe.src.includes('.pdf') || iframe.src.includes('blob'))) {
          console.log('Found PDF iframe, enhancing...');
          
          // Find the parent container
          let container = iframe.parentElement;
          while (container && !container.style.borderRadius && container !== contentRef.current) {
            container = container.parentElement;
          }
          
          if (container && container !== contentRef.current) {
            // Ensure the iframe has proper styling for PDF viewing
            iframe.style.width = '100%';
            iframe.style.height = '600px';
            iframe.style.border = 'none';
            iframe.style.display = 'block';
            
            // Update the src to ensure it has proper PDF viewer parameters
            if (!iframe.src.includes('#')) {
              iframe.src = iframe.src + '#toolbar=1&view=FitH';
            }
            
            console.log('Enhanced PDF iframe');
          }
        }
      });
      
      // Also look for any divs that might contain PDF information
      const allDivs = contentRef.current.querySelectorAll('div');
      console.log('Found divs:', allDivs.length);
      
      allDivs.forEach((div, index) => {
        const innerHTML = div.innerHTML;
        if (innerHTML.includes('.pdf') || innerHTML.includes('blob:')) {
          console.log(`Div ${index} contains PDF reference:`, innerHTML.substring(0, 200));
          
          // Try to extract PDF URL from the content
          const urlMatch = innerHTML.match(/https:\/\/[^\s"'<>]+\.pdf|https:\/\/[^\s"'<>]*blob[^\s"'<>]*/);
          if (urlMatch) {
            const pdfUrl = urlMatch[0];
            console.log('Extracted PDF URL:', pdfUrl);
            
            // Check if this div doesn't already have an iframe
            const existingIframe = div.querySelector('iframe');
            if (!existingIframe && !div.classList.contains('pdf-enhanced')) {
              div.classList.add('pdf-enhanced');
              
              // Replace the div content with a proper PDF viewer
              div.innerHTML = `
                <div style="margin: 2rem 0; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden; background: white;">
                  <div style="background: #f9fafb; padding: 1rem; border-bottom: 1px solid #e5e7eb; display: flex; justify-content: space-between; align-items: center;">
                    <h3 style="margin: 0; font-size: 1.125rem; font-weight: 600;">Ryan - D&D comic episode 1_compressed.pdf</h3>
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
                      title="PDF Document"
                    ></iframe>
                  </div>
                </div>
              `;
              
              console.log('Replaced div with PDF viewer');
            }
          }
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