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
        className={`px-3 py-2 rounded text-sm hover:bg-gray-200 ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}
        title="Upload Image"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        {uploading ? '⏳ Uploading...' : '📁 Upload'}
      </button>
    </>
  );
} 