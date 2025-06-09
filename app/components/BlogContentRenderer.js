'use client';

export default function BlogContentRenderer({ content, className = '' }) {
  if (!content) {
    return <div>No content to display</div>;
  }

  // If content is just plain text without HTML tags, wrap it in a paragraph
  let processedContent = content;
  if (typeof content === 'string' && !content.includes('<') && !content.includes('>')) {
    // Clean the content first - remove any weird whitespace
    const cleanContent = content.replace(/\s+/g, ' ').trim();
    processedContent = `<p>${cleanContent}</p>`;
  }

  return (
    <div className={`prose prose-lg max-w-none ${className}`}>
      <div 
        dangerouslySetInnerHTML={{ __html: processedContent }}
        className="prose-content [&_img]:max-w-full [&_img]:h-auto [&_img]:my-4 [&_img]:rounded-lg [&_img]:shadow-sm whitespace-normal"
        style={{ 
          wordBreak: 'normal', 
          overflowWrap: 'break-word',
          display: 'block',
          whiteSpace: 'normal'
        }}
      />
    </div>
  );
} 