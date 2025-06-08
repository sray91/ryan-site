import Link from 'next/link';
import { format } from 'date-fns';
import { marked } from 'marked';
import { notFound } from 'next/navigation';
import BlogContentRenderer from '../../components/BlogContentRenderer';

async function getBlogPost(slug) {
  try {
    // Use relative URL for server-side rendering
    const apiUrl = process.env.VERCEL_URL 
      ? `https://${process.env.VERCEL_URL}/api/blog`
      : `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/blog`;
    
    const res = await fetch(apiUrl, {
      cache: 'no-store'
    });
    
    if (!res.ok) {
      throw new Error('Failed to fetch posts');
    }
    
    const posts = await res.json();
    return posts.find(post => post.slug === slug);
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

  const htmlContent = marked(post.content);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
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
          </div>
        </article>
        
        <div className="flex justify-between items-center mt-8">
          <Link 
            href="/blog"
            className="inline-flex items-center text-gray-600 hover:text-gray-900"
          >
            ← Back to Blog
          </Link>
          <Link 
            href={`/blog/admin/edit/${post.id}`}
            className="inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            Edit Post
          </Link>
        </div>
      </div>
    </div>
  );
} 