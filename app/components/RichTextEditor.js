'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import TextStyle from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import { useCallback, useEffect, useState } from 'react';
import ImageUpload from './ImageUpload';

export default function RichTextEditor({ 
  value, 
  onChange, 
  placeholder = "Start writing your blog post...",
  height = "500px" 
}) {
  const [notification, setNotification] = useState(null);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
      }),
      Image,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Underline,
      TextStyle,
      Color.configure({
        types: ['textStyle'],
      }),
    ],
    content: value || '',
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange({ target: { name: 'content', value: html } });
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none min-h-full p-4',
      },
    },
  });

  // Update editor content when value prop changes
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value || '');
    }
  }, [editor, value]);

  const insertLink = useCallback(() => {
    const url = window.prompt('Enter URL');
    if (url) {
      editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    }
  }, [editor]);

  const insertImage = useCallback(() => {
    const url = window.prompt('Enter image URL');
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);

  const handleImageUploaded = useCallback((url) => {
    editor.chain().focus().setImage({ src: url }).run();
    setNotification({ type: 'success', message: 'Image uploaded successfully!' });
    setTimeout(() => setNotification(null), 3000);
  }, [editor]);

  const handleUploadError = useCallback((error) => {
    setNotification({ type: 'error', message: error });
    setTimeout(() => setNotification(null), 5000);
  }, []);

  if (!editor) {
    return <div>Loading editor...</div>;
  }

  return (
    <div className="relative">
      {/* Notification */}
      {notification && (
        <div className={`absolute top-0 left-0 right-0 z-10 p-3 text-sm text-center rounded-t-lg ${
          notification.type === 'success' 
            ? 'bg-green-100 text-green-800 border border-green-200' 
            : 'bg-red-100 text-red-800 border border-red-200'
        }`}>
          {notification.message}
        </div>
      )}
      
      <div className={`border border-gray-300 rounded-lg overflow-hidden ${
        notification ? 'mt-12' : ''
      }`}>
        {/* Toolbar */}
      <div className="border-b border-gray-300 bg-gray-50 p-3">
        <div className="flex flex-wrap items-center gap-1">
          {/* Text Formatting */}
          <div className="flex items-center gap-1 mr-3">
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={`p-2 rounded hover:bg-gray-200 ${
                editor.isActive('bold') ? 'bg-blue-200 text-blue-800' : ''
              }`}
              title="Bold"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M5 4v3h5.5c1.1 0 2 .9 2 2s-.9 2-2 2H5v3h6.5c1.9 0 3.5-1.6 3.5-3.5s-1.6-3.5-3.5-3.5H5z"/>
              </svg>
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className={`p-2 rounded hover:bg-gray-200 ${
                editor.isActive('italic') ? 'bg-blue-200 text-blue-800' : ''
              }`}
              title="Italic"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M7 4v1h2l-2 10H5v1h6v-1H9l2-10h2V4H7z"/>
              </svg>
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              className={`p-2 rounded hover:bg-gray-200 ${
                editor.isActive('underline') ? 'bg-blue-200 text-blue-800' : ''
              }`}
              title="Underline"
            >
              <span className="text-sm font-semibold underline">U</span>
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleStrike().run()}
              className={`p-2 rounded hover:bg-gray-200 ${
                editor.isActive('strike') ? 'bg-blue-200 text-blue-800' : ''
              }`}
              title="Strikethrough"
            >
              <span className="text-sm font-semibold line-through">S</span>
            </button>
          </div>

          {/* Headings */}
          <div className="flex items-center gap-1 mr-3">
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
              className={`px-2 py-1 text-sm rounded hover:bg-gray-200 ${
                editor.isActive('heading', { level: 1 }) ? 'bg-blue-200 text-blue-800' : ''
              }`}
              title="Heading 1"
            >
              H1
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
              className={`px-2 py-1 text-sm rounded hover:bg-gray-200 ${
                editor.isActive('heading', { level: 2 }) ? 'bg-blue-200 text-blue-800' : ''
              }`}
              title="Heading 2"
            >
              H2
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
              className={`px-2 py-1 text-sm rounded hover:bg-gray-200 ${
                editor.isActive('heading', { level: 3 }) ? 'bg-blue-200 text-blue-800' : ''
              }`}
              title="Heading 3"
            >
              H3
            </button>
          </div>

          {/* Lists */}
          <div className="flex items-center gap-1 mr-3">
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              className={`p-2 rounded hover:bg-gray-200 ${
                editor.isActive('bulletList') ? 'bg-blue-200 text-blue-800' : ''
              }`}
              title="Bullet List"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 7h14v2H3V7zm0 4h14v2H3v-2z"/>
                <circle cx="3" cy="8" r="1"/>
                <circle cx="3" cy="12" r="1"/>
              </svg>
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              className={`p-2 rounded hover:bg-gray-200 ${
                editor.isActive('orderedList') ? 'bg-blue-200 text-blue-800' : ''
              }`}
              title="Numbered List"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M7 7h10v2H7V7zm0 4h10v2H7v-2z"/>
                <text x="3" y="9" className="text-xs">1.</text>
                <text x="3" y="13" className="text-xs">2.</text>
              </svg>
            </button>
          </div>

          {/* Alignment */}
          <div className="flex items-center gap-1 mr-3">
            <button
              type="button"
              onClick={() => editor.chain().focus().setTextAlign('left').run()}
              className={`p-2 rounded hover:bg-gray-200 ${
                editor.isActive({ textAlign: 'left' }) ? 'bg-blue-200 text-blue-800' : ''
              }`}
              title="Align Left"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 4h16v2H2V4zm0 4h10v2H2V8zm0 4h16v2H2v-2zm0 4h10v2H2v-2z"/>
              </svg>
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().setTextAlign('center').run()}
              className={`p-2 rounded hover:bg-gray-200 ${
                editor.isActive({ textAlign: 'center' }) ? 'bg-blue-200 text-blue-800' : ''
              }`}
              title="Center"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 4h16v2H2V4zm3 4h10v2H5V8zm-3 4h16v2H2v-2zm3 4h10v2H5v-2z"/>
              </svg>
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().setTextAlign('right').run()}
              className={`p-2 rounded hover:bg-gray-200 ${
                editor.isActive({ textAlign: 'right' }) ? 'bg-blue-200 text-blue-800' : ''
              }`}
              title="Align Right"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 4h16v2H2V4zm6 4h10v2H8V8zm-6 4h16v2H2v-2zm6 4h10v2H8v-2z"/>
              </svg>
            </button>
          </div>

          {/* Links and Images */}
          <div className="flex items-center gap-1 mr-3">
            <button
              type="button"
              onClick={insertLink}
              className={`p-2 rounded hover:bg-gray-200 ${
                editor.isActive('link') ? 'bg-blue-200 text-blue-800' : ''
              }`}
              title="Insert Link"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M12.586 4.586a2 2 0 112.828 2.828L9 14.172V17h-2.828L12.586 4.586zM11 5L6 10v3h3l5-5-3-3z"/>
              </svg>
            </button>
            <ImageUpload
              onImageUploaded={handleImageUploaded}
              onError={handleUploadError}
            />
            <button
              type="button"
              onClick={insertImage}
              className="p-2 rounded hover:bg-gray-200"
              title="Insert Image from URL"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd"/>
              </svg>
            </button>
          </div>

          {/* More Options */}
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
              className={`p-2 rounded hover:bg-gray-200 ${
                editor.isActive('blockquote') ? 'bg-blue-200 text-blue-800' : ''
              }`}
              title="Quote"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"/>
              </svg>
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleCode().run()}
              className={`p-2 rounded hover:bg-gray-200 ${
                editor.isActive('code') ? 'bg-blue-200 text-blue-800' : ''
              }`}
              title="Inline Code"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265L11.682 9l1.267 4.684a1 1 0 01-1.898.632L9.736 10l1.315-4.316a1 1 0 011.265-.633z" clipRule="evenodd"/>
              </svg>
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().setHorizontalRule().run()}
              className="p-2 rounded hover:bg-gray-200"
              title="Horizontal Rule"
            >
              <span className="text-sm font-bold">—</span>
            </button>
          </div>
        </div>
      </div>

      {/* Editor */}
      <div 
        className="bg-white overflow-y-auto"
        style={{ height: height }}
      >
        <EditorContent 
          editor={editor} 
          placeholder={placeholder}
          className="h-full"
        />
      </div>
      
        {/* Status Bar */}
        <div className="border-t border-gray-300 bg-gray-50 px-3 py-2 text-xs text-gray-500">
          <div className="flex justify-between items-center">
            <span>Rich text editor • Click toolbar buttons or use keyboard shortcuts</span>
            <span>{editor.storage.characterCount?.characters || 0} characters</span>
          </div>
        </div>
      </div>
    </div>
  );
} 