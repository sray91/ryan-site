'use client';

import { useEffect, useState } from 'react';
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

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleChange = (content) => {
    onChange({ target: { name: 'content', value: content } });
  };

  const handleClear = () => {
    onChange({ target: { name: 'content', value: '' } });
  };

  // Quill modules configuration
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['blockquote', 'code-block'],
      ['link'],
      [{ 'align': [] }],
      ['clean']
    ],
  };

  const formats = [
    'header', 'bold', 'italic', 'underline', 'strike',
    'list', 'bullet', 'blockquote', 'code-block',
    'link', 'align'
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
      <div style={{ height: height }}>
        <ReactQuill
          theme="snow"
          value={value || ''}
          onChange={handleChange}
          placeholder={placeholder}
          modules={modules}
          formats={formats}
          style={{ height: 'calc(100% - 42px)' }}
        />
      </div>
    </div>
  );
} 