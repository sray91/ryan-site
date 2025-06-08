'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import TextStyle from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import Highlight from '@tiptap/extension-highlight';
import FontFamily from '@tiptap/extension-font-family';
import { FontSize } from './FontSizeExtension';
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
      Highlight.configure({
        multicolor: true,
      }),
      FontFamily.configure({
        types: ['textStyle'],
      }),
      FontSize,
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
              className={`px-3 py-2 rounded text-sm font-bold hover:bg-gray-200 ${
                editor.isActive('bold') ? 'bg-blue-200 text-blue-800' : ''
              }`}
              title="Bold"
            >
              B
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className={`px-3 py-2 rounded text-sm italic hover:bg-gray-200 ${
                editor.isActive('italic') ? 'bg-blue-200 text-blue-800' : ''
              }`}
              title="Italic"
            >
              I
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              className={`px-3 py-2 rounded text-sm underline hover:bg-gray-200 ${
                editor.isActive('underline') ? 'bg-blue-200 text-blue-800' : ''
              }`}
              title="Underline"
            >
              U
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleStrike().run()}
              className={`px-3 py-2 rounded text-sm line-through hover:bg-gray-200 ${
                editor.isActive('strike') ? 'bg-blue-200 text-blue-800' : ''
              }`}
              title="Strikethrough"
            >
              S
            </button>
          </div>

          {/* Colors and Highlights */}
          <div className="flex items-center gap-1 mr-3">
            <select
              onChange={(e) => {
                if (e.target.value === 'default') {
                  editor.chain().focus().unsetColor().run();
                } else {
                  editor.chain().focus().setColor(e.target.value).run();
                }
              }}
              className="px-2 py-1 text-xs rounded border hover:bg-gray-100"
              title="Text Color"
              defaultValue="default"
            >
              <option value="default">⚫ Default</option>
              <option value="#dc2626">🔴 Red</option>
              <option value="#059669">🟢 Green</option>
              <option value="#2563eb">🔵 Blue</option>
              <option value="#7c3aed">🟣 Purple</option>
              <option value="#ea580c">🟠 Orange</option>
            </select>
            <select
              onChange={(e) => {
                if (e.target.value === 'none') {
                  editor.chain().focus().unsetHighlight().run();
                } else {
                  editor.chain().focus().setHighlight({ color: e.target.value }).run();
                }
              }}
              className="px-2 py-1 text-xs rounded border hover:bg-gray-100"
              title="Highlight"
              defaultValue="none"
            >
              <option value="none">🚫 No Highlight</option>
              <option value="#fef3c7">🟡 Yellow</option>
              <option value="#fed7d7">🩷 Pink</option>
              <option value="#d1fae5">💚 Green</option>
              <option value="#dbeafe">💙 Blue</option>
            </select>
          </div>

          {/* Font Family */}
          <div className="flex items-center gap-1 mr-3">
            <select
              onChange={(e) => {
                if (e.target.value === 'default') {
                  editor.chain().focus().unsetFontFamily().run();
                } else {
                  editor.chain().focus().setFontFamily(e.target.value).run();
                }
              }}
              className="px-2 py-1 text-xs rounded border hover:bg-gray-100"
              title="Font Family"
              defaultValue="default"
            >
              <option value="default">Default Font</option>
              <option value="Arial, sans-serif">Arial</option>
              <option value="Georgia, serif">Georgia</option>
              <option value="'Times New Roman', serif">Times</option>
              <option value="'Courier New', monospace">Courier</option>
            </select>
          </div>

          {/* Font Size */}
          <div className="flex items-center gap-1 mr-3">
            <select
              onChange={(e) => {
                if (e.target.value === 'default') {
                  editor.chain().focus().unsetFontSize().run();
                } else {
                  editor.chain().focus().setFontSize(e.target.value).run();
                }
              }}
              className="px-2 py-1 text-xs rounded border hover:bg-gray-100"
              title="Font Size"
              defaultValue="default"
            >
              <option value="default">Default Size</option>
              <option value="10px">10px</option>
              <option value="12px">12px</option>
              <option value="14px">14px</option>
              <option value="16px">16px</option>
              <option value="18px">18px</option>
              <option value="20px">20px</option>
              <option value="24px">24px</option>
              <option value="28px">28px</option>
              <option value="32px">32px</option>
              <option value="36px">36px</option>
            </select>
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
              className={`px-3 py-2 rounded text-sm hover:bg-gray-200 ${
                editor.isActive('bulletList') ? 'bg-blue-200 text-blue-800' : ''
              }`}
              title="Bullet List"
            >
              • List
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              className={`px-3 py-2 rounded text-sm hover:bg-gray-200 ${
                editor.isActive('orderedList') ? 'bg-blue-200 text-blue-800' : ''
              }`}
              title="Numbered List"
            >
              1. List
            </button>
          </div>

          {/* Alignment */}
          <div className="flex items-center gap-1 mr-3">
            <button
              type="button"
              onClick={() => editor.chain().focus().setTextAlign('left').run()}
              className={`px-3 py-2 rounded text-sm hover:bg-gray-200 ${
                editor.isActive({ textAlign: 'left' }) ? 'bg-blue-200 text-blue-800' : ''
              }`}
              title="Align Left"
            >
              ← Left
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().setTextAlign('center').run()}
              className={`px-3 py-2 rounded text-sm hover:bg-gray-200 ${
                editor.isActive({ textAlign: 'center' }) ? 'bg-blue-200 text-blue-800' : ''
              }`}
              title="Center"
            >
              ↔ Center
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().setTextAlign('right').run()}
              className={`px-3 py-2 rounded text-sm hover:bg-gray-200 ${
                editor.isActive({ textAlign: 'right' }) ? 'bg-blue-200 text-blue-800' : ''
              }`}
              title="Align Right"
            >
              → Right
            </button>
          </div>

          {/* Links and Images */}
          <div className="flex items-center gap-1 mr-3">
            <button
              type="button"
              onClick={insertLink}
              className={`px-3 py-2 rounded text-sm hover:bg-gray-200 ${
                editor.isActive('link') ? 'bg-blue-200 text-blue-800' : ''
              }`}
              title="Insert Link"
            >
              🔗 Link
            </button>
            <ImageUpload
              onImageUploaded={handleImageUploaded}
              onError={handleUploadError}
            />
            <button
              type="button"
              onClick={insertImage}
              className="px-3 py-2 rounded text-sm hover:bg-gray-200"
              title="Insert Image from URL"
            >
              🖼️ URL
            </button>
          </div>

          {/* More Options */}
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
              className={`px-3 py-2 rounded text-sm hover:bg-gray-200 ${
                editor.isActive('blockquote') ? 'bg-blue-200 text-blue-800' : ''
              }`}
              title="Quote"
            >
              &quot; Quote
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleCode().run()}
              className={`px-3 py-2 rounded text-sm hover:bg-gray-200 ${
                editor.isActive('code') ? 'bg-blue-200 text-blue-800' : ''
              }`}
              title="Inline Code"
            >
              &lt;/&gt; Code
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().setHorizontalRule().run()}
              className="px-3 py-2 rounded text-sm hover:bg-gray-200"
              title="Horizontal Rule"
            >
              ─── Line
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