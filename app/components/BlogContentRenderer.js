'use client';

export default function BlogContentRenderer({ content, className = '' }) {
  if (!content) {
    return <div>No content to display</div>;
  }

  return (
    <div className={`prose prose-lg max-w-none ${className}`}>
      <div 
        dangerouslySetInnerHTML={{ __html: content }}
        className="prose-content [&_img]:max-w-full [&_img]:h-auto [&_img]:my-4 [&_img]:rounded-lg [&_img]:shadow-sm"
      />
    </div>
  );
} 