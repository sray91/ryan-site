'use client';

import { useState, useRef } from 'react';

export default function ImageUpload({ onImageUploaded, onError }) {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileSelect = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Reset the input value so the same file can be selected again
    event.target.value = '';

    await uploadFile(file);
  };

  const uploadFile = async (file) => {
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        onImageUploaded(result.url);
      } else {
        onError(result.error || 'Upload failed');
      }
    } catch (error) {
      console.error('Upload error:', error);
      onError('Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    const files = Array.from(event.dataTransfer.files);
    const imageFile = files.find(file => file.type.startsWith('image/'));

    if (imageFile) {
      await uploadFile(imageFile);
    } else {
      onError('Please drop an image file');
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />
      
      <button
        type="button"
        onClick={triggerFileSelect}
        disabled={uploading}
        className={`p-2 rounded hover:bg-gray-200 ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}
        title="Upload Image"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        {uploading ? (
          <svg className="w-4 h-4 animate-spin" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 3v3l4-4-4-4v3a8 8 0 1 0 8 8h-3a5 5 0 1 1-5-5z"/>
          </svg>
        ) : (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd"/>
          </svg>
        )}
      </button>
    </>
  );
} 