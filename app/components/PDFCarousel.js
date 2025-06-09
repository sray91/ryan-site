'use client';

import { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

// Set up the worker for PDF.js - use a specific stable version
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@4.8.69/build/pdf.worker.min.js`;

export default function PDFCarousel({ pdfUrl, title, pdfName }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [pageWidth, setPageWidth] = useState(600);

  // Handle successful PDF load
  const onDocumentLoadSuccess = ({ numPages }) => {
    console.log('PDF loaded successfully:', { numPages, pdfUrl });
    setTotalPages(numPages);
    setIsLoading(false);
    setError(null);
  };

  // Handle PDF load error
  const onDocumentLoadError = (error) => {
    console.error('Error loading PDF:', error);
    console.error('PDF URL:', pdfUrl);
    console.error('Error details:', error);
    
    let errorMessage = 'Unknown error';
    if (error.message) {
      errorMessage = error.message;
    }
    
    // Check if it's a file type issue
    if (pdfUrl && (pdfUrl.includes('.docx') || pdfUrl.includes('.doc'))) {
      errorMessage = 'This appears to be a Word document (.docx), not a PDF. Please convert to PDF first.';
    } else if (error.message && error.message.includes('CORS')) {
      errorMessage = 'CORS error - unable to load PDF from storage.';
    } else if (error.message && error.message.includes('Invalid PDF')) {
      errorMessage = 'Invalid PDF file format.';
    }
    
    setError(`Failed to load PDF: ${errorMessage}`);
    setIsLoading(false);
  };

  // Handle page render error
  const onPageLoadError = (error) => {
    console.error('Error loading PDF page:', error);
    // Don't set error for individual page failures, just log them
  };

  // Debug: Log the PDF URL when component mounts
  useEffect(() => {
    console.log('PDFCarousel mounted with URL:', pdfUrl);
    console.log('PDF.js version:', pdfjs.version);
    console.log('Worker src:', pdfjs.GlobalWorkerOptions.workerSrc);
    
    if (!pdfUrl) {
      setError('No PDF URL provided');
      setIsLoading(false);
      return;
    }
    
    // Test if the URL is accessible
    fetch(pdfUrl, { method: 'HEAD', mode: 'cors' })
      .then(response => {
        console.log('PDF URL accessibility test:', response.status, response.headers);
        if (!response.ok) {
          console.error('PDF URL not accessible:', response.status);
        }
      })
      .catch(error => {
        console.error('PDF URL accessibility error:', error);
      });
    
    // Set a timeout to catch hanging loads
    const loadingTimeout = setTimeout(() => {
      if (isLoading) {
        console.error('PDF loading timeout after 10 seconds');
        setError('PDF loading timeout - please try refreshing the page or check if the file is corrupted');
        setIsLoading(false);
      }
    }, 10000);
    
    return () => clearTimeout(loadingTimeout);
  }, [pdfUrl, isLoading]);

  // Adjust page width based on container size
  useEffect(() => {
    const updatePageWidth = () => {
      const container = document.querySelector('.pdf-viewer-container');
      if (container) {
        const containerWidth = container.clientWidth - 64; // Account for padding and arrows
        setPageWidth(Math.min(containerWidth, 600));
      }
    };

    updatePageWidth();
    window.addEventListener('resize', updatePageWidth);
    return () => window.removeEventListener('resize', updatePageWidth);
  }, []);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  if (error) {
    return (
      <div className="bg-gray-100 border border-gray-300 rounded-lg p-6 text-center">
        <div className="text-red-600 mb-2">
          <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <p className="text-gray-600">Error loading PDF carousel</p>
        <p className="text-sm text-gray-500 mt-1">{error}</p>
        {pdfUrl && (
          <a 
            href={pdfUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center mt-3 px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Download PDF
          </a>
        )}
      </div>
    );
  }

  if (!pdfUrl) {
    return (
      <div className="bg-gray-100 border border-gray-300 rounded-lg p-6 text-center">
        <p className="text-gray-600">No PDF URL provided</p>
      </div>
    );
  }

  // Simple fallback using browser's built-in PDF viewer
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden max-w-full">
      {/* Header */}
      <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900">
            {title || pdfName || 'PDF Document'}
          </h3>
          <div className="flex items-center space-x-4">
            <a 
              href={pdfUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 transition-colors"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Open in New Tab
            </a>
            <a 
              href={pdfUrl} 
              download
              className="inline-flex items-center text-sm text-green-600 hover:text-green-800 transition-colors"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download
            </a>
          </div>
        </div>
      </div>

      {/* PDF Embedded Viewer */}
      <div className="relative">
        <iframe
          src={`${pdfUrl}#toolbar=1&navpanes=1&scrollbar=1`}
          width="100%"
          height="600"
          style={{ border: 'none' }}
          title={title || 'PDF Document'}
          className="w-full"
        />
      </div>
    </div>
  );
} 