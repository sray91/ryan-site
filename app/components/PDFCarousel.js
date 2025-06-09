'use client';

import { useState, useEffect } from 'react';

export default function PDFCarousel({ pdfUrl, title, pdfName }) {
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