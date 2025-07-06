'use client';

import { useState, useCallback } from 'react';
import { upload } from '@vercel/blob/client';

export default function PDFUpload({ onUpload, onRemove, uploadedPdfs = [] }) {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileChange = useCallback(async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      alert('Please select a PDF file only. Word documents (.docx) are not supported.');
      return;
    }
    
    // Also check the file extension
    if (!file.name.toLowerCase().endsWith('.pdf')) {
      alert('Please select a file with .pdf extension only.');
      return;
    }

    setUploading(true);
    setUploadProgress(0);
    
    try {
      // Check file size to determine upload method
      const fileSizeMB = file.size / (1024 * 1024);
      const useClientUpload = fileSizeMB > 4; // Use client-side upload for files > 4MB
      
      let result;
      
      if (useClientUpload) {
        // Use client-side upload for larger files
        result = await handleClientUpload(file);
      } else {
        // Use server-side upload for smaller files
        result = await handleServerUpload(file);
      }
      
      const pdfData = {
        name: file.name,
        size: file.size,
        url: result.url,
        title: file.name.replace('.pdf', ''),
        uploadedAt: new Date().toISOString(),
        uploadMethod: useClientUpload ? 'client' : 'server'
      };

      onUpload(pdfData);
      
      // Reset the input
      e.target.value = '';
    } catch (error) {
      console.error('Error uploading PDF:', error);
      alert(`Failed to upload PDF: ${error.message}`);
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  }, [onUpload]);

  const handleClientUpload = useCallback(async (file) => {
    // Client-side upload using @vercel/blob/client
    try {
      // Generate unique filename
      const timestamp = Date.now();
      const filename = `blog-carousels/${timestamp}_${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
      
      const blob = await upload(filename, file, {
        access: 'public',
        handleUploadUrl: '/api/upload/client',
        clientPayload: JSON.stringify({
          fileType: 'pdf',
          fileSize: file.size,
          originalName: file.name
        }),
        onUploadProgress: (progress) => {
          setUploadProgress(Math.round(progress.percentage));
        }
      });

      return { url: blob.url, success: true };
    } catch (error) {
      console.error('Client upload error:', error);
      throw new Error(error.message || 'Client upload failed');
    }
  }, []);

  const handleServerUpload = useCallback(async (file) => {
    // Server-side upload for smaller files
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', 'pdf');

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      
      // Track upload progress
      xhr.upload.addEventListener('progress', (e) => {
        if (e.lengthComputable) {
          const percentComplete = (e.loaded / e.total) * 100;
          setUploadProgress(Math.round(percentComplete));
        }
      });
      
      // Handle completion
      xhr.addEventListener('load', () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            const response = JSON.parse(xhr.responseText);
            resolve(response);
          } catch (parseError) {
            console.error('Failed to parse response:', parseError);
            console.error('Response text:', xhr.responseText);
            
            if (xhr.status === 413) {
              reject(new Error('File too large. Please choose a smaller PDF (max 4MB). For larger PDFs, contact support.'));
            } else if (xhr.status === 400) {
              reject(new Error('Invalid file type. Please select a PDF file.'));
            } else if (xhr.status === 500) {
              reject(new Error('Server error. Please try again later.'));
            } else {
              reject(new Error(`Upload failed with status ${xhr.status}: ${xhr.statusText}`));
            }
          }
        } else {
          // Handle HTTP errors
          try {
            const errorResponse = JSON.parse(xhr.responseText);
            reject(new Error(errorResponse.error || 'Upload failed'));
          } catch (parseError) {
            if (xhr.status === 413) {
              reject(new Error('File too large. Please choose a smaller PDF (max 4MB). For larger PDFs, contact support.'));
            } else if (xhr.status === 400) {
              reject(new Error('Invalid file type. Please select a PDF file.'));
            } else if (xhr.status === 500) {
              reject(new Error('Server error. Please try again later.'));
            } else {
              reject(new Error(`Upload failed with status ${xhr.status}: ${xhr.statusText}`));
            }
          }
        }
      });
      
      // Handle network errors
      xhr.addEventListener('error', () => {
        reject(new Error('Network error. Please check your connection and try again.'));
      });
      
      // Handle timeouts
      xhr.addEventListener('timeout', () => {
        reject(new Error('Upload timeout. Please try again.'));
      });
      
      // Configure and send request
      xhr.open('POST', '/api/upload');
      xhr.timeout = 300000; // 5 minutes timeout
      xhr.send(formData);
    });
  }, []);

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

      {/* Upload Progress Bar */}
      {uploading && (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>Uploading PDF...</span>
            <span>{uploadProgress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
          <div className="text-xs text-gray-500 text-center">
            {uploadProgress > 0 && uploadProgress < 100 && (
              <span>Using {uploadProgress >= 50 ? 'secure' : 'optimized'} upload method</span>
            )}
          </div>
        </div>
      )}

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
        <p>• Small files (&lt;4MB): Fast server upload</p>
        <p>• Large files (&gt;4MB): Secure client-side upload (up to 100MB)</p>
        <p>• Each PDF will be converted to images for easy navigation</p>
        <p>• Readers can navigate through pages with arrow controls</p>
      </div>
    </div>
  );
} 