'use client';

export default function BlogContentRenderer({ content, className = '' }) {
  if (!content) {
    return <div>No content to display</div>;
  }

  // If content is just plain text without HTML tags, wrap it in a paragraph
  let processedContent = content;
  if (typeof content === 'string') {
    if (!content.includes('<') && !content.includes('>')) {
      // Clean the content first - remove any weird whitespace
      const cleanContent = content.replace(/\s+/g, ' ').trim();
      processedContent = `<p>${cleanContent}</p>`;
    } else {
      // Remove <br> tags between paragraphs
      processedContent = content.replace(/<\/p><br><p>/g, '</p><p>');
      // Remove any remaining standalone <br> tags
      processedContent = processedContent.replace(/<p><br><\/p>/g, '');
    }
  }

  return (
    <div className={className}>
      <div 
        dangerouslySetInnerHTML={{ __html: processedContent }}
        className="text-base [&_p]:mb-4 last:[&_p]:mb-0
          [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:mb-4
          [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mb-3
          [&_h3]:text-xl [&_h3]:font-bold [&_h3]:mb-2
          [&_ul]:list-disc [&_ul]:pl-4 [&_ul]:mb-4
          [&_ol]:list-decimal [&_ol]:pl-4 [&_ol]:mb-4
          [&_li]:mb-1
          [&_blockquote]:border-l-4 [&_blockquote]:border-gray-200 [&_blockquote]:pl-4 [&_blockquote]:mb-4
          [&_img]:max-w-full [&_img]:h-auto [&_img]:rounded-lg [&_img]:shadow-sm [&_img]:my-4
          [&_pre]:bg-gray-50 [&_pre]:p-4 [&_pre]:rounded-lg [&_pre]:mb-4
          [&_code]:bg-gray-50 [&_code]:px-1 [&_code]:py-0.5 [&_code]:rounded
          [&_hr]:my-8 [&_hr]:border-t [&_hr]:border-gray-200"
        style={{ 
          wordBreak: 'normal', 
          overflowWrap: 'break-word'
        }}
      />
    </div>
  );
} 