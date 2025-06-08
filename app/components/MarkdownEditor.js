'use client';

import { useState, useCallback } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';

export default function MarkdownEditor({ 
  value, 
  onChange, 
  placeholder = "Write your content here...",
  height = "500px" 
}) {
  const [viewMode, setViewMode] = useState('split'); // 'write', 'preview', 'split'
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleInputChange = useCallback((e) => {
    onChange({ target: { name: 'content', value: e.target.value } });
  }, [onChange]);

  const insertText = useCallback((before, after = '', placeholder = '') => {
    const textarea = document.getElementById('markdown-editor');
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);
    const replacement = before + (selectedText || placeholder) + after;
    
    const newValue = value.substring(0, start) + replacement + value.substring(end);
    onChange({ target: { name: 'content', value: newValue } });
    
    // Set cursor position
    setTimeout(() => {
      const newPos = start + before.length + (selectedText || placeholder).length;
      textarea.setSelectionRange(newPos, newPos);
      textarea.focus();
    }, 0);
  }, [value, onChange]);

  const toolbarButtons = [
    { icon: '**B**', action: () => insertText('**', '**', 'bold text'), title: 'Bold' },
    { icon: '*I*', action: () => insertText('*', '*', 'italic text'), title: 'Italic' },
    { icon: '~~S~~', action: () => insertText('~~', '~~', 'strikethrough'), title: 'Strikethrough' },
    { icon: '`C`', action: () => insertText('`', '`', 'code'), title: 'Inline Code' },
    { icon: '```', action: () => insertText('```\n', '\n```', 'code block'), title: 'Code Block' },
    { icon: 'H1', action: () => insertText('# ', '', 'Heading 1'), title: 'Heading 1' },
    { icon: 'H2', action: () => insertText('## ', '', 'Heading 2'), title: 'Heading 2' },
    { icon: 'H3', action: () => insertText('### ', '', 'Heading 3'), title: 'Heading 3' },
    { icon: '• List', action: () => insertText('- ', '', 'List item'), title: 'Bullet List' },
    { icon: '1. List', action: () => insertText('1. ', '', 'List item'), title: 'Numbered List' },
    { icon: '> Quote', action: () => insertText('> ', '', 'Quote'), title: 'Quote' },
    { icon: '🔗 Link', action: () => insertText('[', '](url)', 'link text'), title: 'Link' },
    { icon: '📷 Image', action: () => insertText('![', '](image-url)', 'alt text'), title: 'Image' },
    { icon: '| Table', action: () => insertText('| Column 1 | Column 2 |\n|----------|----------|\n| Cell 1   | Cell 2   |\n', '', ''), title: 'Table' },
    { icon: '---', action: () => insertText('\n---\n', '', ''), title: 'Horizontal Rule' },
  ];

  const containerClass = isFullscreen 
    ? 'fixed inset-0 z-50 bg-white' 
    : 'relative';

  return (
    <div className={containerClass}>
      {/* Toolbar */}
      <div className="border border-gray-300 border-b-0 rounded-t-lg bg-gray-50 p-2">
        <div className="flex flex-wrap items-center gap-1 mb-2">
          {toolbarButtons.map((button, index) => (
            <button
              key={index}
              type="button"
              onClick={button.action}
              title={button.title}
              className="px-2 py-1 text-xs bg-white border border-gray-200 rounded hover:bg-gray-100 hover:border-gray-300 transition-colors"
            >
              {button.icon}
            </button>
          ))}
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setViewMode('write')}
              className={`px-3 py-1 text-sm rounded ${
                viewMode === 'write' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-white border border-gray-200 hover:bg-gray-100'
              }`}
            >
              Write
            </button>
            <button
              type="button"
              onClick={() => setViewMode('preview')}
              className={`px-3 py-1 text-sm rounded ${
                viewMode === 'preview' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-white border border-gray-200 hover:bg-gray-100'
              }`}
            >
              Preview
            </button>
            <button
              type="button"
              onClick={() => setViewMode('split')}
              className={`px-3 py-1 text-sm rounded ${
                viewMode === 'split' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-white border border-gray-200 hover:bg-gray-100'
              }`}
            >
              Split View
            </button>
          </div>
          
          <button
            type="button"
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="px-3 py-1 text-sm bg-white border border-gray-200 rounded hover:bg-gray-100"
            title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
          >
            {isFullscreen ? '↙️' : '↗️'}
          </button>
        </div>
      </div>

      {/* Editor Area */}
      <div 
        className="border border-gray-300 rounded-b-lg overflow-hidden"
        style={{ height: isFullscreen ? 'calc(100vh - 120px)' : height }}
      >
        {viewMode === 'write' && (
          <textarea
            id="markdown-editor"
            name="content"
            value={value}
            onChange={handleInputChange}
            placeholder={placeholder}
            className="w-full h-full p-4 border-0 resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
            style={{ outline: 'none' }}
          />
        )}
        
        {viewMode === 'preview' && (
          <div className="w-full h-full p-4 overflow-auto prose prose-sm max-w-none">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw, rehypeSanitize]}
              components={{
                // Custom styling for code blocks
                code({node, inline, className, children, ...props}) {
                  const match = /language-(\w+)/.exec(className || '');
                  return !inline ? (
                    <pre className="bg-gray-100 p-3 rounded-lg overflow-x-auto">
                      <code className={className} {...props}>
                        {children}
                      </code>
                    </pre>
                  ) : (
                    <code className="bg-gray-100 px-1 py-0.5 rounded text-sm" {...props}>
                      {children}
                    </code>
                  );
                },
                // Custom styling for tables
                table({children, ...props}) {
                  return (
                    <div className="overflow-x-auto">
                      <table className="min-w-full border-collapse border border-gray-300" {...props}>
                        {children}
                      </table>
                    </div>
                  );
                },
                th({children, ...props}) {
                  return (
                    <th className="border border-gray-300 bg-gray-50 px-4 py-2 text-left" {...props}>
                      {children}
                    </th>
                  );
                },
                td({children, ...props}) {
                  return (
                    <td className="border border-gray-300 px-4 py-2" {...props}>
                      {children}
                    </td>
                  );
                },
                // Custom styling for blockquotes
                blockquote({children, ...props}) {
                  return (
                    <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-700" {...props}>
                      {children}
                    </blockquote>
                  );
                },
              }}
            >
              {value || '*Nothing to preview*'}
            </ReactMarkdown>
          </div>
        )}
        
        {viewMode === 'split' && (
          <div className="flex h-full">
            <div className="w-1/2 border-r border-gray-300">
              <textarea
                id="markdown-editor"
                name="content"
                value={value}
                onChange={handleInputChange}
                placeholder={placeholder}
                className="w-full h-full p-4 border-0 resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
                style={{ outline: 'none' }}
              />
            </div>
            <div className="w-1/2 p-4 overflow-auto prose prose-sm max-w-none">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw, rehypeSanitize]}
                components={{
                  code({node, inline, className, children, ...props}) {
                    const match = /language-(\w+)/.exec(className || '');
                    return !inline ? (
                      <pre className="bg-gray-100 p-3 rounded-lg overflow-x-auto">
                        <code className={className} {...props}>
                          {children}
                        </code>
                      </pre>
                    ) : (
                      <code className="bg-gray-100 px-1 py-0.5 rounded text-sm" {...props}>
                        {children}
                      </code>
                    );
                  },
                  table({children, ...props}) {
                    return (
                      <div className="overflow-x-auto">
                        <table className="min-w-full border-collapse border border-gray-300" {...props}>
                          {children}
                        </table>
                      </div>
                    );
                  },
                  th({children, ...props}) {
                    return (
                      <th className="border border-gray-300 bg-gray-50 px-4 py-2 text-left" {...props}>
                        {children}
                      </th>
                    );
                  },
                  td({children, ...props}) {
                    return (
                      <td className="border border-gray-300 px-4 py-2" {...props}>
                        {children}
                      </td>
                    );
                  },
                  blockquote({children, ...props}) {
                    return (
                      <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-700" {...props}>
                        {children}
                      </blockquote>
                    );
                  },
                }}
              >
                {value || '*Nothing to preview*'}
              </ReactMarkdown>
            </div>
          </div>
        )}
      </div>

      {/* Help text */}
      <div className="mt-2 text-sm text-gray-500">
        <details className="cursor-pointer">
          <summary className="hover:text-gray-700">Markdown Guide</summary>
          <div className="mt-2 space-y-1 text-xs">
            <p><strong>Headers:</strong> # H1, ## H2, ### H3</p>
            <p><strong>Emphasis:</strong> **bold**, *italic*, ~~strikethrough~~</p>
            <p><strong>Links:</strong> [text](url)</p>
            <p><strong>Images:</strong> ![alt text](image url)</p>
            <p><strong>Lists:</strong> - bullet or 1. numbered</p>
            <p><strong>Code:</strong> `inline` or ```code block```</p>
            <p><strong>Quote:</strong> &gt; blockquote</p>
            <p><strong>Table:</strong> | col1 | col2 | with |---|---| separator</p>
          </div>
        </details>
      </div>
    </div>
  );
} 