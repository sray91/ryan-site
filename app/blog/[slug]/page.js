import Link from 'next/link';
import { format } from 'date-fns';
import { notFound } from 'next/navigation';
import { kv } from '../../../lib/kv';
import BlogContentRenderer from '../../components/BlogContentRenderer';
import PDFCarousel from '../../components/PDFCarousel';
import BlogHeader from '../../components/BlogHeader';

async function getBlogPost(slug) {
  try {
    // Get all blog post keys and find the one with matching slug
    const keys = await kv.keys('blog:*');
    
    if (keys.length === 0) {
      return null;
    }
    
    // Get all posts
    const posts = await kv.mget(...keys);
    
    // Find post with matching slug
    return posts.find(post => post && post.slug === slug);
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  
  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: `${post.title} - Ryan's Blog`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    notFound();
  }

  // Content is already HTML from LexicalEditor, no need to process with marked()
  const htmlContent = post.content;

  return (
    <div className="min-h-screen bg-gray-50">
      <BlogHeader />
      <div className="py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <article className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-8">
            <div className="border-b border-gray-200 pb-6 mb-8">
              <div className="flex items-center justify-between mb-4">
                <time className="text-sm text-gray-500">
                  {format(new Date(post.createdAt), 'MMMM d, yyyy')}
                </time>
                {post.updatedAt !== post.createdAt && (
                  <span className="text-sm text-gray-500">
                    Updated: {format(new Date(post.updatedAt), 'MMMM d, yyyy')}
                  </span>
                )}
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
            
            <BlogContentRenderer 
              content={htmlContent}
              className="prose prose-lg max-w-none"
            />
            
            {/* PDF Carousels */}
            {post.pdfCarousels && post.pdfCarousels.length > 0 && (
              <div className="mt-8 space-y-6">
                {post.pdfCarousels.map((pdf, index) => (
                  <PDFCarousel
                    key={index}
                    pdfUrl={pdf.url}
                    title={pdf.title}
                  />
                ))}
              </div>
            )}
          </div>
        </article>
        
        <div className="mt-8">
          <Link 
            href="/blog"
            className="inline-flex items-center text-gray-600 hover:text-gray-900"
          >
            ← Back to Blog
          </Link>
        </div>
      </div>
      </div>
    </div>
  );
} 