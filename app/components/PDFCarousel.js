'use client';

import { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

// Set up the worker for PDF.js with fallback
if (typeof window !== 'undefined') {
  pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.js',
    import.meta.url,
  ).toString();
}

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
    setError(`Failed to load PDF: ${error.message || 'Unknown error'}`);
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
    if (!pdfUrl) {
      setError('No PDF URL provided');
      setIsLoading(false);
    }
  }, [pdfUrl]);

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

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden max-w-full">
      {/* Header */}
      <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900">
            {title || pdfName || 'PDF Document'}
          </h3>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <span>Page {currentPage} of {totalPages || '?'}</span>
          </div>
        </div>
      </div>

      {/* PDF Viewer Area */}
      <div className="relative bg-gray-100 min-h-[500px] flex items-center justify-center pdf-viewer-container">
        {isLoading ? (
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading PDF...</p>
            <p className="text-xs text-gray-500 mt-2">URL: {pdfUrl}</p>
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center p-4">
            <Document
              file={pdfUrl}
              onLoadSuccess={onDocumentLoadSuccess}
              onLoadError={onDocumentLoadError}
              loading={
                <div className="text-center p-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
                  <p className="text-gray-600">Loading PDF...</p>
                </div>
              }
              className="flex justify-center"
              options={{
                cMapUrl: 'https://unpkg.com/pdfjs-dist@3.11.174/cmaps/',
                cMapPacked: true,
              }}
            >
              <Page
                pageNumber={currentPage}
                width={pageWidth}
                onLoadError={onPageLoadError}
                loading={
                  <div className="bg-white border rounded p-8 text-center shadow-lg" style={{ width: pageWidth, minHeight: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div>
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
                      <p className="text-gray-600">Loading page...</p>
                    </div>
                  </div>
                }
                className="react-pdf__Page shadow-lg"
                renderTextLayer={false}
                renderAnnotationLayer={false}
              />
            </Document>
          </div>
        )}

        {/* Navigation Arrows - Show when not loading and has multiple pages */}
        {!isLoading && totalPages > 1 && (
          <>
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed rounded-full p-3 shadow-lg transition-all z-20 border border-gray-200"
            >
              <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={nextPage}
              disabled={currentPage === totalPages}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed rounded-full p-3 shadow-lg transition-all z-20 border border-gray-200"
            >
              <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}
      </div>

      {/* Footer with Page Dots and Controls */}
      {!isLoading && totalPages > 0 && (
        <div className="bg-gray-50 px-4 py-3 border-t border-gray-200">
          <div className="flex items-center justify-between">
            {/* Page Dots */}
            <div className="flex items-center space-x-1">
              {Array.from({ length: Math.min(totalPages, 10) }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => goToPage(page)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    page === currentPage 
                      ? 'bg-blue-600' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to page ${page}`}
                />
              ))}
              {totalPages > 10 && <span className="text-xs text-gray-500 ml-2">+{totalPages - 10} more</span>}
            </div>
            
            {/* Navigation Buttons */}
            <div className="flex items-center space-x-2">
              <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className="px-3 py-1 text-sm bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed rounded transition-colors"
              >
                Previous
              </button>
              <button
                onClick={nextPage}
                disabled={currentPage === totalPages}
                className="px-3 py-1 text-sm bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed rounded transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Download Link */}
      {pdfUrl && (
        <div className="bg-gray-50 px-4 py-2 border-t border-gray-200 text-center">
          <a 
            href={pdfUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 transition-colors"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Download PDF
          </a>
        </div>
      )}
    </div>
  );
} 