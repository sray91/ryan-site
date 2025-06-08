'use client';

import { useState, useRef } from 'react';
import { put } from '@vercel/blob';

export default function PDFUpload({ onPDFUploaded, onError }) {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validate file type
    if (file.type !== 'application/pdf') {
      onError('Please select a PDF file');
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      onError('PDF file size must be less than 10MB');
      return;
    }

    setUploading(true);

    try {
      const blob = await put(`pdfs/${Date.now()}-${file.name}`, file, {
        access: 'public',
      });

      onPDFUploaded(blob.url);
    } catch (error) {
      console.error('Error uploading PDF:', error);
      onError('Failed to upload PDF. Please try again.');
    } finally {
      setUploading(false);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf"
        onChange={handleFileChange}
        className="hidden"
      />
      <button
        type="button"
        onClick={handleClick}
        disabled={uploading}
        className={`px-3 py-2 rounded text-sm hover:bg-gray-200 ${
          uploading ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        title="Upload PDF Carousel"
      >
        {uploading ? '📄 Uploading...' : '📄 PDF'}
      </button>
    </>
  );
} 