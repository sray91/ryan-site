import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';
import { notFound } from 'next/navigation';
import { PortableText } from 'next-sanity';
import { client, urlFor } from '../../../sanity/lib/client';
import { postBySlugQuery } from '../../../sanity/lib/queries';
import PDFViewer from '../../components/PDFViewer';
import BlogHeader from '../../components/BlogHeader';
import BlogContentRenderer from '../../components/BlogContentRenderer';

async function getBlogPost(slug) {
  try {
    const post = await client.fetch(postBySlugQuery, { slug });

    if (!post) {
      return null;
    }

    return post;
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

const ptComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) {
        return null;
      }
      return (
        <div className="my-8 relative w-full h-96">
          <Image
            src={urlFor(value).url()}
            alt={value.alt || ' '}
            fill
            className="object-contain"
          />
        </div>
      );
    },
    table: ({ value }) => {
      if (!value?.rows) return null;
      return (
        <div className="my-8 overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 border border-gray-200">
            <tbody className="bg-white divide-y divide-gray-200">
              {value.rows.map((row) => (
                <tr key={row._key}>
                  {row.cells.map((cell, i) => (
                    <td
                      key={i}
                      className="px-6 py-4 text-sm text-gray-700 border-r border-gray-200 last:border-r-0"
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
  }
};

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <BlogHeader />
      <div className="py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <article className="bg-white rounded-lg shadow-md overflow-hidden">
          {post.mainImage && (
             <div className="relative w-full h-96">
               <Image
                 src={urlFor(post.mainImage).url()}
                 alt={post.title}
                 fill
                 className="object-cover"
               />
             </div>
          )}
          <div className="p-8">
            <div className="border-b border-gray-200 pb-6 mb-8">
              <div className="flex items-center justify-between mb-4">
                <time className="text-sm text-gray-500">
                  {format(new Date(post.publishedAt), 'MMMM d, yyyy')}
                </time>
                {post._updatedAt !== post.publishedAt && (
                  <span className="text-sm text-gray-500">
                    Updated: {format(new Date(post._updatedAt), 'MMMM d, yyyy')}
                  </span>
                )}
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>
              
              {post.author && (
                <div className="flex items-center mb-4">
                  {post.author.image && (
                    <div className="relative w-10 h-10 mr-3 rounded-full overflow-hidden">
                      <Image 
                        src={urlFor(post.author.image).url()} 
                        alt={post.author.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <span className="text-gray-700 font-medium">{post.author.name}</span>
                </div>
              )}

              {post.categories && post.categories.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {post.categories.map((category, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full"
                    >
                      {category.title}
                    </span>
                  ))}
                </div>
              )}
            </div>
            
            {post.body ? (
              <div className="prose prose-lg max-w-none">
                <PortableText value={post.body} components={ptComponents} />
              </div>
            ) : (
              <BlogContentRenderer 
                content={post.content}
                className="prose prose-lg max-w-none"
              />
            )}
            
            {/* PDF Carousels */}
            {post.pdfCarousels && post.pdfCarousels.length > 0 && (
              <div className="mt-8 space-y-6">
                {post.pdfCarousels.map((pdf, index) => (
                  <PDFViewer
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
