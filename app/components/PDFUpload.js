'use client';

import { useState, useCallback } from 'react';

export default function PDFUpload({ onUpload, onRemove, uploadedPdfs = [] }) {
  const [uploading, setUploading] = useState(false);

  const handleFileChange = useCallback(async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      alert('Please select a PDF file');
      return;
    }

    setUploading(true);
    
    try {
      // Upload PDF to Vercel Blob Storage
      const formData = new FormData();
      formData.append('file', file);
      formData.append('type', 'pdf');

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Upload failed');
      }

      const result = await response.json();

      const pdfData = {
        name: file.name,
        size: file.size,
        url: result.url, // Now using the permanent URL from Vercel Blob Storage
        title: file.name.replace('.pdf', ''), // Add title field for display
        uploadedAt: new Date().toISOString()
      };

      onUpload(pdfData);
      
      // Reset the input
      e.target.value = '';
    } catch (error) {
      console.error('Error uploading PDF:', error);
      alert(`Failed to upload PDF: ${error.message}`);
    } finally {
      setUploading(false);
    }
  }, [onUpload]);

  const handleRemove = useCallback((index) => {
    onRemove(index);
  }, [onRemove]);

  return (
    <div className="space-y-4">
      {/* Upload Area */}
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
        <input
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          disabled={uploading}
          className="hidden"
          id="pdf-upload"
        />
        <label
          htmlFor="pdf-upload"
          className={`cursor-pointer inline-flex flex-col items-center ${
            uploading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          <svg className="w-12 h-12 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
          <span className="text-sm font-medium text-gray-600">
            {uploading ? 'Uploading...' : 'Click to upload PDF'}
          </span>
          <span className="text-xs text-gray-500 mt-1">
            PDF files only
          </span>
        </label>
      </div>

      {/* Uploaded PDFs List */}
      {uploadedPdfs.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-700">Uploaded PDFs:</h4>
          {uploadedPdfs.map((pdf, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border"
            >
              <div className="flex items-center space-x-3">
                <svg className="w-8 h-8 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                </svg>
                <div>
                  <p className="text-sm font-medium text-gray-900">{pdf.name}</p>
                  <p className="text-xs text-gray-500">
                    {(pdf.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                  {pdf.url && (
                    <a 
                      href={pdf.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-xs text-blue-600 hover:text-blue-800"
                    >
                      View PDF
                    </a>
                  )}
                </div>
              </div>
              <button
                type="button"
                onClick={() => handleRemove(index)}
                className="text-red-600 hover:text-red-800 p-1"
                aria-label={`Remove ${pdf.name}`}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Help Text */}
      <div className="text-xs text-gray-500">
        <p>• Upload PDF files to create interactive carousels</p>
        <p>• Each PDF will be converted to images for easy navigation</p>
        <p>• Readers can navigate through pages with arrow controls</p>
      </div>
    </div>
  );
} 