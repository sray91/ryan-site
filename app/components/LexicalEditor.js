'use client';

import { useEffect, useState, useRef } from 'react';
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
  const quillRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleChange = (content) => {
    onChange({ target: { name: 'content', value: content } });
  };

  const handleClear = () => {
    onChange({ target: { name: 'content', value: '' } });
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

    // Reset the input value so the same file can be selected again
    event.target.value = '';

    await uploadFile(file);
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  // Custom toolbar component
  const CustomToolbar = () => (
    <div id="toolbar" className="ql-toolbar ql-snow">
      <span className="ql-formats">
        <select className="ql-header" defaultValue="">
          <option value="1">Heading 1</option>
          <option value="2">Heading 2</option>
          <option value="3">Heading 3</option>
          <option value="">Normal</option>
        </select>
      </span>
      
      <span className="ql-formats">
        <button className="ql-bold" />
        <button className="ql-italic" />
        <button className="ql-underline" />
        <button className="ql-strike" />
      </span>
      
      <span className="ql-formats">
        <button className="ql-list" value="ordered" />
        <button className="ql-list" value="bullet" />
        <button className="ql-blockquote" />
        <button className="ql-code-block" />
      </span>
      
      <span className="ql-formats">
        <button className="ql-link" />
        
        {/* Custom image upload styled like Quill button */}
        <button 
          type="button"
          onClick={triggerFileSelect}
          disabled={uploading}
          className={`ql-image ${uploading ? 'ql-active' : ''}`}
          title={uploading ? 'Uploading...' : 'Upload Image'}
        >
          <svg viewBox="0 0 18 18" width="18" height="18">
            <rect className="ql-stroke" height="10" width="12" x="3" y="4"></rect>
            <circle className="ql-fill" cx="6" cy="7" r="1"></circle>
            <polyline className="ql-even ql-fill" points="5,12 5,11 7,9 8,10 11,7 13,9 13,12 5,12"></polyline>
          </svg>
        </button>
        
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />
      </span>
      
      <span className="ql-formats">
        <select className="ql-align">
          <option defaultValue="" />
          <option value="center" />
          <option value="right" />
          <option value="justify" />
        </select>
        <button className="ql-clean" />
      </span>
    </div>
  );

  // Quill modules configuration with custom toolbar
  const modules = {
    toolbar: {
      container: '#toolbar',
    },
  };

  const formats = [
    'header', 'bold', 'italic', 'underline', 'strike',
    'list', 'bullet', 'blockquote', 'code-block',
    'link', 'image', 'align'
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
      
      {/* Custom Toolbar */}
      <CustomToolbar />
      
      {/* Quill Editor */}
      <div style={{ height: `calc(${height} - 80px)` }}>
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
    </div>
  );
} 