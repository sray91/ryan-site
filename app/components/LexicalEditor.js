'use client';

import { useEffect, useState, useCallback } from 'react';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { 
  $getSelection, 
  $isRangeSelection,
  FORMAT_TEXT_COMMAND,
  SELECTION_CHANGE_COMMAND,
  $createParagraphNode,
  $getRoot,
  $isTextNode
} from 'lexical';
import { $generateHtmlFromNodes, $generateNodesFromDOM } from '@lexical/html';
import { 
  INSERT_UNORDERED_LIST_COMMAND, 
  INSERT_ORDERED_LIST_COMMAND,
  REMOVE_LIST_COMMAND,
  $isListNode
} from '@lexical/list';
import { 
  $createLinkNode, 
  $isLinkNode,
  TOGGLE_LINK_COMMAND
} from '@lexical/link';
import { 
  $createHeadingNode, 
  $createQuoteNode,
  $isHeadingNode
} from '@lexical/rich-text';
import { $setBlocksType } from '@lexical/selection';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { ListItemNode, ListNode } from '@lexical/list';
import { LinkNode, AutoLinkNode } from '@lexical/link';
import { CodeNode, CodeHighlightNode } from '@lexical/code';
import ImageUpload from './ImageUpload';
import PDFUpload from './PDFUpload';

// Custom nodes for our editor
const nodes = [
  HeadingNode,
  ListNode,
  ListItemNode,
  QuoteNode,
  CodeNode,
  CodeHighlightNode,
  LinkNode,
  AutoLinkNode
];

const theme = {
  ltr: 'ltr',
  rtl: 'rtl',
  placeholder: 'text-gray-400',
  paragraph: 'mb-2',
  quote: 'border-l-4 border-gray-300 pl-4 italic text-gray-700 my-4',
  heading: {
    h1: 'text-3xl font-bold mb-4',
    h2: 'text-2xl font-bold mb-3',
    h3: 'text-xl font-bold mb-2',
    h4: 'text-lg font-bold mb-2',
    h5: 'text-base font-bold mb-1',
    h6: 'text-sm font-bold mb-1'
  },
  list: {
    nested: {
      listitem: 'list-none'
    },
    ol: 'list-decimal list-inside mb-2',
    ul: 'list-disc list-inside mb-2',
    listitem: 'mb-1'
  },
  text: {
    bold: 'font-bold',
    italic: 'italic',
    underline: 'underline',
    strikethrough: 'line-through',
    code: 'bg-gray-100 px-1 py-0.5 rounded text-sm font-mono'
  },
  code: 'bg-gray-100 p-2 rounded font-mono text-sm block my-2',
  link: 'text-blue-600 hover:text-blue-800 underline'
};

// Toolbar component
function ToolbarPlugin({ onChange, value }) {
  const [editor] = useLexicalComposerContext();
  const [activeStates, setActiveStates] = useState({
    bold: false,
    italic: false,
    underline: false,
    strikethrough: false,
    code: false,
    heading: '',
    list: '',
    link: false
  });
  const [notification, setNotification] = useState(null);

  const updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      setActiveStates({
        bold: selection.hasFormat('bold'),
        italic: selection.hasFormat('italic'),
        underline: selection.hasFormat('underline'),
        strikethrough: selection.hasFormat('strikethrough'),
        code: selection.hasFormat('code'),
        // We'll add more states as needed
      });
    }
  }, []);

  useEffect(() => {
    return editor.registerCommand(
      SELECTION_CHANGE_COMMAND,
      () => {
        updateToolbar();
        return false;
      },
      1
    );
  }, [editor, updateToolbar]);

  const formatText = (format) => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, format);
  };

  const formatHeading = (headingSize) => {
    if (headingSize === '') {
      editor.update(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          $setBlocksType(selection, () => $createParagraphNode());
        }
      });
    } else {
      editor.update(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          $setBlocksType(selection, () => $createHeadingNode(headingSize));
        }
      });
    }
  };

  const formatList = (listType) => {
    if (listType === 'bullet') {
      editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND);
    } else if (listType === 'number') {
      editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND);
    } else {
      editor.dispatchCommand(REMOVE_LIST_COMMAND);
    }
  };

  const insertLink = () => {
    const url = window.prompt('Enter URL');
    if (url) {
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, url);
    }
  };

  const formatQuote = () => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, () => $createQuoteNode());
      }
    });
  };

  const applyStyleToSelection = (property, value) => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        selection.getNodes().forEach((node) => {
          if ($isTextNode(node)) {
            const element = editor.getElementByKey(node.getKey());
            if (element) {
              element.style[property] = value;
            }
          }
        });
      }
    });
  };

  const handleImageUploaded = useCallback((url) => {
    console.log('Image uploaded, inserting into editor:', url);
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        const parser = new DOMParser();
        const dom = parser.parseFromString(`<img src="${url}" alt="Uploaded image" style="max-width: 100%; height: auto; display: block; margin: 1rem 0;" />`, 'text/html');
        const nodes = $generateNodesFromDOM(editor, dom);
        selection.insertNodes(nodes);
        console.log('Image nodes inserted:', nodes);
      } else {
        console.log('No valid selection for image insertion');
      }
    });
    setNotification({ type: 'success', message: 'Image uploaded and inserted successfully!' });
    setTimeout(() => setNotification(null), 3000);
  }, [editor]);

  const handleUploadError = useCallback((error) => {
    setNotification({ type: 'error', message: error });
    setTimeout(() => setNotification(null), 5000);
  }, []);

  const handlePDFUploaded = useCallback((url) => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        const pdfHtml = `<div class="pdf-carousel" data-pdf-url="${url}">
          <div class="pdf-placeholder">
            <p>📄 PDF Document</p>
            <p>Click to view PDF carousel</p>
          </div>
        </div>`;
        const parser = new DOMParser();
        const dom = parser.parseFromString(pdfHtml, 'text/html');
        const nodes = $generateNodesFromDOM(editor, dom);
        selection.insertNodes(nodes);
      }
    });
    setNotification({ type: 'success', message: 'PDF uploaded successfully!' });
    setTimeout(() => setNotification(null), 3000);
  }, [editor]);

  const insertImageFromUrl = () => {
    const url = window.prompt('Enter image URL');
    if (url) {
      editor.update(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
                  const parser = new DOMParser();
        const dom = parser.parseFromString(`<img src="${url}" alt="Image" style="max-width: 100%; height: auto;" />`, 'text/html');
        const nodes = $generateNodesFromDOM(editor, dom);
        selection.insertNodes(nodes);
        }
      });
    }
  };

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
      
      <div className={`border-b border-gray-300 bg-gray-50 p-3 ${notification ? 'mt-12' : ''}`}>
        <div className="flex flex-wrap items-center gap-1">
          {/* Text Formatting */}
          <div className="flex items-center gap-1 mr-3">
            <button
              type="button"
              onClick={() => formatText('bold')}
              className={`px-3 py-2 rounded text-sm font-bold hover:bg-gray-200 ${
                activeStates.bold ? 'bg-blue-200 text-blue-800' : ''
              }`}
              title="Bold"
            >
              B
            </button>
            <button
              type="button"
              onClick={() => formatText('italic')}
              className={`px-3 py-2 rounded text-sm italic hover:bg-gray-200 ${
                activeStates.italic ? 'bg-blue-200 text-blue-800' : ''
              }`}
              title="Italic"
            >
              I
            </button>
            <button
              type="button"
              onClick={() => formatText('underline')}
              className={`px-3 py-2 rounded text-sm underline hover:bg-gray-200 ${
                activeStates.underline ? 'bg-blue-200 text-blue-800' : ''
              }`}
              title="Underline"
            >
              U
            </button>
            <button
              type="button"
              onClick={() => formatText('strikethrough')}
              className={`px-3 py-2 rounded text-sm line-through hover:bg-gray-200 ${
                activeStates.strikethrough ? 'bg-blue-200 text-blue-800' : ''
              }`}
              title="Strikethrough"
            >
              S
            </button>
          </div>

          {/* Colors */}
          <div className="flex items-center gap-1 mr-3">
            <select
              onChange={(e) => applyStyleToSelection('color', e.target.value)}
              className="px-2 py-1 text-xs rounded border hover:bg-gray-100"
              title="Text Color"
              defaultValue=""
            >
              <option value="">⚫ Default</option>
              <option value="#dc2626">🔴 Red</option>
              <option value="#059669">🟢 Green</option>
              <option value="#2563eb">🔵 Blue</option>
              <option value="#7c3aed">🟣 Purple</option>
              <option value="#ea580c">🟠 Orange</option>
            </select>
            <select
              onChange={(e) => applyStyleToSelection('backgroundColor', e.target.value)}
              className="px-2 py-1 text-xs rounded border hover:bg-gray-100"
              title="Highlight"
              defaultValue=""
            >
              <option value="">🚫 No Highlight</option>
              <option value="#fef3c7">🟡 Yellow</option>
              <option value="#fed7d7">🩷 Pink</option>
              <option value="#d1fae5">💚 Green</option>
              <option value="#dbeafe">💙 Blue</option>
            </select>
          </div>

          {/* Font Family */}
          <div className="flex items-center gap-1 mr-3">
            <select
              onChange={(e) => applyStyleToSelection('fontFamily', e.target.value)}
              className="px-2 py-1 text-xs rounded border hover:bg-gray-100"
              title="Font Family"
              defaultValue=""
            >
              <option value="">Default Font</option>
              <option value="Arial, sans-serif">Arial</option>
              <option value="Georgia, serif">Georgia</option>
              <option value="'Times New Roman', serif">Times</option>
              <option value="'Courier New', monospace">Courier</option>
            </select>
          </div>

          {/* Font Size */}
          <div className="flex items-center gap-1 mr-3">
            <select
              onChange={(e) => applyStyleToSelection('fontSize', e.target.value)}
              className="px-2 py-1 text-xs rounded border hover:bg-gray-100"
              title="Font Size"
              defaultValue=""
            >
              <option value="">Default Size</option>
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
              onClick={() => formatHeading('h1')}
              className="px-2 py-1 text-sm rounded hover:bg-gray-200"
              title="Heading 1"
            >
              H1
            </button>
            <button
              type="button"
              onClick={() => formatHeading('h2')}
              className="px-2 py-1 text-sm rounded hover:bg-gray-200"
              title="Heading 2"
            >
              H2
            </button>
            <button
              type="button"
              onClick={() => formatHeading('h3')}
              className="px-2 py-1 text-sm rounded hover:bg-gray-200"
              title="Heading 3"
            >
              H3
            </button>
          </div>

          {/* Lists */}
          <div className="flex items-center gap-1 mr-3">
            <button
              type="button"
              onClick={() => formatList('bullet')}
              className="px-3 py-2 rounded text-sm hover:bg-gray-200"
              title="Bullet List"
            >
              • List
            </button>
            <button
              type="button"
              onClick={() => formatList('number')}
              className="px-3 py-2 rounded text-sm hover:bg-gray-200"
              title="Numbered List"
            >
              1. List
            </button>
          </div>

          {/* Links and Images */}
          <div className="flex items-center gap-1 mr-3">
            <button
              type="button"
              onClick={insertLink}
              className="px-3 py-2 rounded text-sm hover:bg-gray-200"
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
              onClick={insertImageFromUrl}
              className="px-3 py-2 rounded text-sm hover:bg-gray-200"
              title="Insert Image from URL"
            >
              🖼️ URL
            </button>
            <PDFUpload
              onPDFUploaded={handlePDFUploaded}
              onError={handleUploadError}
            />
          </div>

          {/* More Options */}
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={formatQuote}
              className="px-3 py-2 rounded text-sm hover:bg-gray-200"
              title="Quote"
            >
              &quot; Quote
            </button>
            <button
              type="button"
              onClick={() => formatText('code')}
              className={`px-3 py-2 rounded text-sm hover:bg-gray-200 ${
                activeStates.code ? 'bg-blue-200 text-blue-800' : ''
              }`}
              title="Inline Code"
            >
              &lt;/&gt; Code
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Plugin to sync content with parent component
function OnChangePlugin({ onChange }) {
  const [editor] = useLexicalComposerContext();
  
  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        const htmlString = $generateHtmlFromNodes(editor, null);
        
        // Clean up empty HTML or whitespace-only content
        const cleanedContent = htmlString
          .replace(/<p><\/p>/g, '')
          .replace(/<p>\s*<\/p>/g, '')
          .replace(/^\s+|\s+$/g, '');
        
        onChange({ target: { name: 'content', value: cleanedContent } });
      });
    });
  }, [editor, onChange]);
  
  return null;
}

// Plugin to set initial content
function InitialContentPlugin({ value }) {
  const [editor] = useLexicalComposerContext();
  const [hasSetInitialContent, setHasSetInitialContent] = useState(false);

  useEffect(() => {
    if (value && !hasSetInitialContent) {
      editor.update(() => {
        const root = $getRoot();
        root.clear();
        const parser = new DOMParser();
        const dom = parser.parseFromString(value, 'text/html');
        const nodes = $generateNodesFromDOM(editor, dom);
        root.append(...nodes);
      });
      setHasSetInitialContent(true);
    }
  }, [editor, value, hasSetInitialContent]);

  return null;
}

export default function LexicalEditor({ 
  value, 
  onChange, 
  placeholder = "Start writing your blog post...",
  height = "500px" 
}) {
  const initialConfig = {
    namespace: 'BlogEditor',
    theme,
    onError: (error) => {
      console.error('Lexical error:', error);
    },
    nodes
  };

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden">
      <LexicalComposer initialConfig={initialConfig}>
        <ToolbarPlugin onChange={onChange} value={value} />
        <div className="bg-white" style={{ height: height }}>
          <RichTextPlugin
            contentEditable={
                          <ContentEditable 
              className="prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none min-h-full p-4 overflow-y-auto [&_img]:max-w-full [&_img]:h-auto [&_img]:my-4"
              style={{ height: height }}
            />
            }
            placeholder={
              <div className="absolute top-4 left-4 text-gray-400 pointer-events-none">
                {placeholder}
              </div>
            }
            ErrorBoundary={LexicalErrorBoundary}
          />
        </div>
        <HistoryPlugin />
        <ListPlugin />
        <LinkPlugin />
        <OnChangePlugin onChange={onChange} />
        <InitialContentPlugin value={value} />
        
        {/* Status Bar */}
        <div className="border-t border-gray-300 bg-gray-50 px-3 py-2 text-xs text-gray-500">
          <div className="flex justify-between items-center">
            <span>Lexical rich text editor • Click toolbar buttons or use keyboard shortcuts</span>
          </div>
        </div>
      </LexicalComposer>
    </div>
  );
} 