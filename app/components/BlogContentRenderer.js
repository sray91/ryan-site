'use client';

import React, { useEffect, useRef } from 'react';
import PDFViewer from './PDFViewer';

export default function BlogContentRenderer({ content, className = '' }) {
  const contentRef = useRef(null);

  useEffect(() => {
    if (contentRef.current) {
      // Find all PDF placeholders and replace them with proper PDF viewers
      const pdfPlaceholders = contentRef.current.querySelectorAll('.pdf-carousel[data-pdf-url]');
      
      pdfPlaceholders.forEach((placeholder) => {
        const pdfUrl = placeholder.getAttribute('data-pdf-url');
        if (pdfUrl) {
          // Get the PDF filename from the existing content
          const pdfNameElement = placeholder.querySelector('p');
          const pdfName = pdfNameElement ? pdfNameElement.textContent : 'PDF Document';
          
          // Create a container for our React PDF component
          const container = document.createElement('div');
          container.className = 'pdf-viewer-container my-6';
          container.setAttribute('data-pdf-url', pdfUrl);
          container.setAttribute('data-pdf-name', pdfName);
          
          // Replace the placeholder with the container
          placeholder.parentNode.replaceChild(container, placeholder);
        }
      });

      // Now render PDF viewers for each container
      const pdfContainers = contentRef.current.querySelectorAll('.pdf-viewer-container[data-pdf-url]');
      pdfContainers.forEach((container) => {
        const pdfUrl = container.getAttribute('data-pdf-url');
        const pdfName = container.getAttribute('data-pdf-name');
        
        // Create and mount the PDF viewer component
        import('react-dom/client').then(({ createRoot }) => {
          const root = createRoot(container);
          root.render(
            // Using React.createElement to avoid JSX compilation issues
            React.createElement(PDFViewer, { 
              pdfUrl: pdfUrl, 
              title: pdfName 
            })
          );
        });
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