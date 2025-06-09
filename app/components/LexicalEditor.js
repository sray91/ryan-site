'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill-new/dist/quill.snow.css';

// Dynamically import ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });

export default function RichTextEditor({ 
  value, 
  onChange, 
  placeholder = "Start writing your blog post...",
  height = "400px" 
}) {
  const [isClient, setIsClient] = useState(false);
  const [notification, setNotification] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [pdfUploading, setPdfUploading] = useState(false);
  const quillRef = useRef(null);
  const fileInputRef = useRef(null);
  const pdfInputRef = useRef(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const uploadFile = useCallback(async (file) => {
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      // Better error handling for non-JSON responses
      let result;
      try {
        result = await response.json();
      } catch (parseError) {
        console.error('Failed to parse response:', parseError);
        const responseText = await response.text();
        console.error('Response text:', responseText);
        
        if (response.status === 413) {
          throw new Error('File too large. Please choose a smaller image (max 5MB).');
        } else {
          throw new Error(`Server error ${response.status}: ${response.statusText}`);
        }
      }

      if (result.success) {
        const quill = quillRef.current?.getEditor();
        if (quill) {
          const range = quill.getSelection();
          const index = range ? range.index : quill.getLength();
          
          // Insert the image at cursor position
          quill.insertEmbed(index, 'image', result.url);
          
          // Move cursor after the image
          quill.setSelection(index + 1);
        }
        
        setNotification({ type: 'success', message: 'Image uploaded successfully!' });
        setTimeout(() => setNotification(null), 3000);
      } else {
        setNotification({ type: 'error', message: result.error || 'Upload failed' });
        setTimeout(() => setNotification(null), 5000);
      }
    } catch (error) {
      console.error('Upload error:', error);
      setNotification({ type: 'error', message: 'Upload failed. Please try again.' });
      setTimeout(() => setNotification(null), 5000);
    } finally {
      setUploading(false);
    }
  }, []);

  // Handle image drag-and-drop and paste events
  useEffect(() => {
    const handleDrop = async (e) => {
      e.preventDefault();
      const files = Array.from(e.dataTransfer.files);
      const imageFile = files.find(file => file.type.startsWith('image/'));
      
      if (imageFile) {
        await uploadFile(imageFile);
      }
    };

    const handlePaste = async (e) => {
      const items = Array.from(e.clipboardData.items);
      const imageItem = items.find(item => item.type.startsWith('image/'));
      
      if (imageItem) {
        e.preventDefault();
        const file = imageItem.getAsFile();
        if (file) {
          await uploadFile(file);
        }
      }
    };

    const quillEditor = quillRef.current?.getEditor();
    const editorElement = quillEditor?.root;
    
    if (editorElement) {
      editorElement.addEventListener('drop', handleDrop);
      editorElement.addEventListener('paste', handlePaste);
      
      return () => {
        editorElement.removeEventListener('drop', handleDrop);
        editorElement.removeEventListener('paste', handlePaste);
      };
    }
  }, [isClient, uploadFile]); // Re-run when client is ready

  const handleChange = (content) => {
    onChange({ target: { name: 'content', value: content } });
  };

  const handleClear = () => {
    onChange({ target: { name: 'content', value: '' } });
  };

  const uploadPdf = async (file) => {
    setPdfUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('type', 'pdf');

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      // Better error handling for non-JSON responses
      let result;
      try {
        result = await response.json();
      } catch (parseError) {
        console.error('Failed to parse response:', parseError);
        const responseText = await response.text();
        console.error('Response text:', responseText);
        
        if (response.status === 413) {
          throw new Error('File too large. Please choose a smaller PDF (max 20MB).');
        } else {
          throw new Error(`Server error ${response.status}: ${response.statusText}`);
        }
      }

      if (result.success) {
        const quill = quillRef.current?.getEditor();
        if (quill) {
          const range = quill.getSelection();
          const index = range ? range.index : quill.getLength();
          
          // Insert PDF carousel HTML at cursor position
          const pdfHtml = `<div class="pdf-carousel" data-pdf-url="${result.url}">
            <div class="pdf-placeholder border-2 border-dashed border-gray-300 rounded-lg p-6 text-center bg-gray-50">
              <div class="text-4xl text-gray-400 mb-2">📄</div>
              <p class="text-gray-600 font-medium">${file.name}</p>
              <p class="text-gray-500 text-sm">PDF Document - Click to view</p>
            </div>
          </div>`;
          
          quill.clipboard.dangerouslyPasteHTML(index, pdfHtml);
          
          // Move cursor after the PDF
          quill.setSelection(index + 1);
        }
        
        setNotification({ type: 'success', message: 'PDF uploaded successfully!' });
        setTimeout(() => setNotification(null), 3000);
      } else {
        setNotification({ type: 'error', message: result.error || 'Upload failed' });
        setTimeout(() => setNotification(null), 5000);
      }
    } catch (error) {
      console.error('PDF upload error:', error);
      setNotification({ type: 'error', message: 'PDF upload failed. Please try again.' });
      setTimeout(() => setNotification(null), 5000);
    } finally {
      setPdfUploading(false);
    }
  };

  const handleImageUploaded = (url) => {
    const quill = quillRef.current?.getEditor();
    if (quill) {
      const range = quill.getSelection();
      const index = range ? range.index : quill.getLength();
      
      // Insert the image at cursor position
      quill.insertEmbed(index, 'image', url);
      
      // Move cursor after the image
      quill.setSelection(index + 1);
    }
    
    setNotification({ type: 'success', message: 'Image uploaded successfully!' });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleUploadError = (error) => {
    setNotification({ type: 'error', message: error });
    setTimeout(() => setNotification(null), 5000);
  };

  const handleFileSelect = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Check file size before upload (5MB = 5 * 1024 * 1024 bytes)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      const fileSizeMB = (file.size / (1024 * 1024)).toFixed(1);
      setNotification({ 
        type: 'error', 
        message: `Image file is too large (${fileSizeMB}MB). Maximum size is 5MB.` 
      });
      setTimeout(() => setNotification(null), 5000);
      return;
    }

    // Reset the input value so the same file can be selected again
    event.target.value = '';

    await uploadFile(file);
  };

  const handlePdfSelect = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      setNotification({ type: 'error', message: 'Please select a PDF file only.' });
      setTimeout(() => setNotification(null), 5000);
      return;
    }

    // Check file size before upload (20MB = 20 * 1024 * 1024 bytes)
    const maxSize = 20 * 1024 * 1024;
    if (file.size > maxSize) {
      const fileSizeMB = (file.size / (1024 * 1024)).toFixed(1);
      setNotification({ 
        type: 'error', 
        message: `PDF file is too large (${fileSizeMB}MB). Maximum size is 20MB.` 
      });
      setTimeout(() => setNotification(null), 5000);
      return;
    }

    // Reset the input value so the same file can be selected again
    event.target.value = '';

    await uploadPdf(file);
  };

  const triggerFileSelect = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const triggerPdfSelect = useCallback(() => {
    pdfInputRef.current?.click();
  }, []);

  // Quill modules configuration with custom toolbar
  const modules = {
    toolbar: {
      container: [
        [{ 'header': [1, 2, 3, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        ['blockquote', 'code-block'],
        ['link'],
        [{ 'align': [] }],
        ['clean']
      ],
      handlers: {
        image: () => {
          // Redirect image operations to our custom upload button
          triggerFileSelect();
        }
      }
    },
  };

  const formats = [
    'header', 'bold', 'italic', 'underline', 'strike',
    'list', 'blockquote', 'code-block',
    'link', 'align', 'image'
  ];

  if (!isClient) {
    return (
      <div className="border border-gray-300 rounded-lg overflow-hidden">
        <div className="border-b border-gray-300 bg-gray-50 px-3 py-2">
          <span className="text-sm text-gray-600">Loading editor...</span>
        </div>
        <div style={{ height: height, padding: '10px' }}>
          <div className="text-gray-400">Rich text editor loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden">
      {/* Notification */}
      {notification && (
        <div className={`px-3 py-2 text-sm text-center ${
          notification.type === 'success' 
            ? 'bg-green-100 text-green-800 border-b border-green-200' 
            : 'bg-red-100 text-red-800 border-b border-red-200'
        }`}>
          {notification.message}
        </div>
      )}
      
      {/* Header with Clear All button */}
      <div className="border-b border-gray-300 bg-gray-50 px-3 py-2 flex justify-between items-center">
        <span className="text-sm text-gray-600">Rich Text Editor</span>
        <button
          type="button"
          onClick={handleClear}
          className="px-3 py-1 text-xs bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
        >
          Clear All
        </button>
      </div>
      
      {/* Toolbar container with Quill toolbar and custom buttons */}
      <div className="relative">
        {/* Quill Editor with built-in toolbar */}
        <div style={{ height: `calc(${height} - 40px)` }}>
          <ReactQuill
            ref={quillRef}
            theme="snow"
            value={value || ''}
            onChange={handleChange}
            placeholder={placeholder}
            modules={modules}
            formats={formats}
            style={{ height: '100%', border: 'none' }}
          />
        </div>
        
        {/* Custom buttons overlay */}
        <div className="absolute top-2 right-2 flex items-center gap-1 z-10">
          {/* Image upload button */}
          <button
            type="button"
            onClick={triggerFileSelect}
            disabled={uploading}
            className={`p-2 rounded-md bg-white shadow-sm border border-gray-200 hover:bg-gray-50 hover:shadow-md transition-all ${uploading ? 'opacity-50' : ''}`}
            title={uploading ? 'Uploading...' : 'Upload Image'}
          >
            <svg viewBox="0 0 18 18" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="3" y="4" width="12" height="10" />
              <circle cx="6" cy="7" r="1" fill="currentColor" stroke="none" />
              <path d="M5 12L7 9L8 10L11 7L13 9V12H5Z" fill="currentColor" stroke="none" />
            </svg>
          </button>

          {/* PDF upload button */}
          <button
            type="button"
            onClick={triggerPdfSelect}
            disabled={pdfUploading}
            className={`p-2 rounded-md bg-white shadow-sm border border-gray-200 hover:bg-gray-50 hover:shadow-md transition-all ${pdfUploading ? 'opacity-50' : ''}`}
            title={pdfUploading ? 'Uploading PDF...' : 'Upload PDF'}
          >
            <svg viewBox="0 0 18 18" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="4" y="2" width="10" height="12" />
              <path d="M6 6h6M6 8h6M6 10h4" stroke="currentColor" strokeWidth="1" />
              <path d="M8 2V1a1 1 0 011-1h4a1 1 0 011 1v3" fill="none" />
            </svg>
          </button>
        </div>
      </div>

      {/* Hidden file inputs */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />

      <input
        ref={pdfInputRef}
        type="file"
        accept=".pdf"
        onChange={handlePdfSelect}
        className="hidden"
      />
    </div>
  );
} 