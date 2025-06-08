'use client';

import { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

// Set up PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function PDFCarousel({ pdfUrl, className = '' }) {
  const [numPages, setNumPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setLoading(false);
    setError(null);
  };

  const onDocumentLoadError = (error) => {
    console.error('Error loading PDF:', error);
    setError('Failed to load PDF document');
    setLoading(false);
  };

  const goToPrevPage = () => {
    setCurrentPage(prev => Math.max(1, prev - 1));
  };

  const goToNextPage = () => {
    setCurrentPage(prev => Math.min(numPages, prev + 1));
  };

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  if (loading) {
    return (
      <div className={`bg-gray-100 rounded-lg p-8 text-center ${className}`}>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading PDF...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`bg-red-50 border border-red-200 rounded-lg p-6 text-center ${className}`}>
        <p className="text-red-700 mb-2">⚠️ {error}</p>
        <p className="text-red-600 text-sm">Please try uploading the PDF again.</p>
      </div>
    );
  }

  return (
    <div className={`bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden ${className}`}>
      {/* Header */}
      <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-700">
            📄 PDF Document
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">
            Page {currentPage} of {numPages}
          </span>
        </div>
      </div>

      {/* PDF Viewer */}
      <div className="relative bg-gray-100">
        <Document
          file={pdfUrl}
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadError={onDocumentLoadError}
          className="flex justify-center"
        >
          <Page
            pageNumber={currentPage}
            className="shadow-lg"
            renderTextLayer={false}
            renderAnnotationLayer={false}
            width={Math.min(600, typeof window !== 'undefined' ? window.innerWidth - 100 : 600)}
          />
        </Document>

        {/* Navigation Arrows */}
        {numPages > 1 && (
          <>
            {/* Previous Button */}
            <button
              onClick={goToPrevPage}
              disabled={currentPage === 1}
              className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full shadow-lg flex items-center justify-center transition-all ${
                currentPage === 1
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-white text-gray-700 hover:bg-gray-50 hover:shadow-xl'
              }`}
              title="Previous page"
            >
              ←
            </button>

            {/* Next Button */}
            <button
              onClick={goToNextPage}
              disabled={currentPage === numPages}
              className={`absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full shadow-lg flex items-center justify-center transition-all ${
                currentPage === numPages
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-white text-gray-700 hover:bg-gray-50 hover:shadow-xl'
              }`}
              title="Next page"
            >
              →
            </button>
          </>
        )}
      </div>

      {/* Page Navigation Dots */}
      {numPages > 1 && numPages <= 10 && (
        <div className="bg-gray-50 px-4 py-3 border-t border-gray-200">
          <div className="flex justify-center space-x-2">
            {Array.from({ length: numPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => goToPage(page)}
                className={`w-8 h-8 rounded-full text-sm font-medium transition-all ${
                  page === currentPage
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-300'
                }`}
                title={`Go to page ${page}`}
              >
                {page}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Page Navigation for Many Pages */}
      {numPages > 10 && (
        <div className="bg-gray-50 px-4 py-3 border-t border-gray-200">
          <div className="flex justify-center items-center space-x-3">
            <button
              onClick={() => goToPage(1)}
              disabled={currentPage === 1}
              className="px-3 py-1 text-sm bg-white border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              First
            </button>
            <button
              onClick={goToPrevPage}
              disabled={currentPage === 1}
              className="px-3 py-1 text-sm bg-white border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <span className="px-3 py-1 text-sm text-gray-600">
              {currentPage} / {numPages}
            </span>
            <button
              onClick={goToNextPage}
              disabled={currentPage === numPages}
              className="px-3 py-1 text-sm bg-white border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
            <button
              onClick={() => goToPage(numPages)}
              disabled={currentPage === numPages}
              className="px-3 py-1 text-sm bg-white border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Last
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 