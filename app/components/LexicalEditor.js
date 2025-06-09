'use client';

import { useEffect, useState, useRef } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill-new/dist/quill.snow.css';
import ImageUpload from './ImageUpload';

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
  const quillRef = useRef(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleChange = (content) => {
    onChange({ target: { name: 'content', value: content } });
  };

  const handleClear = () => {
    onChange({ target: { name: 'content', value: '' } });
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

  // Custom toolbar component
  const CustomToolbar = () => (
    <div id="toolbar" className="border-b border-gray-300 bg-gray-50 px-3 py-2">
      <div className="flex flex-wrap items-center gap-2">
        {/* Text formatting */}
        <select className="ql-header" defaultValue="">
          <option value="1">Heading 1</option>
          <option value="2">Heading 2</option>
          <option value="3">Heading 3</option>
          <option value="">Normal</option>
        </select>
        
        <button className="ql-bold" title="Bold" />
        <button className="ql-italic" title="Italic" />
        <button className="ql-underline" title="Underline" />
        <button className="ql-strike" title="Strikethrough" />
        
        <span className="border-l border-gray-300 mx-2 h-6" />
        
        <button className="ql-list" value="ordered" title="Numbered List" />
        <button className="ql-list" value="bullet" title="Bullet List" />
        <button className="ql-blockquote" title="Quote" />
        <button className="ql-code-block" title="Code Block" />
        
        <span className="border-l border-gray-300 mx-2 h-6" />
        
        <button className="ql-link" title="Link" />
        
        {/* Custom image upload button */}
        <ImageUpload
          onImageUploaded={handleImageUploaded}
          onError={handleUploadError}
        />
        
        <span className="border-l border-gray-300 mx-2 h-6" />
        
        <select className="ql-align" title="Text Alignment">
          <option value="" />
          <option value="center" />
          <option value="right" />
          <option value="justify" />
        </select>
        
        <button className="ql-clean" title="Clear Formatting" />
      </div>
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