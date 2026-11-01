import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';
import { notFound } from 'next/navigation';
import { PortableText } from 'next-sanity';
import { client, urlFor } from '../../../sanity/lib/client';
import { postBySlugQuery } from '../../../sanity/lib/queries';
import PDFViewer from '../../components/PDFViewer';
import PageShell from '../../components/PageShell';
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
    <PageShell>
      <div className="py-12">
      <div className="max-w-3xl mx-auto px-5">
        <Link href="/blog" className="text-sm font-semibold" style={{ color: "var(--rc-muted)" }}>← All writing</Link>
        <article className="mt-6 overflow-hidden">
          {post.mainImage && (
             <div className="relative w-full h-72 sm:h-96 rounded-xl overflow-hidden mb-8">
               <Image
                 src={urlFor(post.mainImage).url()}
                 alt={post.title}
                 fill
                 className="object-cover"
               />
             </div>
          )}
          <div>
            <div className="border-b pb-6 mb-8" style={{ borderColor: "var(--rc-rule)" }}>
              <div className="flex items-center justify-between mb-4">
                <time className="rc-eyebrow">
                  {format(new Date(post.publishedAt), 'MMMM d, yyyy')}
                </time>
                {post._updatedAt !== post.publishedAt && (
                  <span className="text-sm" style={{ color: "var(--rc-muted)" }}>
                    Updated: {format(new Date(post._updatedAt), 'MMMM d, yyyy')}
                  </span>
                )}
              </div>
              <h1 className="rc-serif text-4xl sm:text-5xl font-semibold tracking-tight leading-tight mb-5">{post.title}</h1>
              
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
                  <span className="font-medium">{post.author.name}</span>
                </div>
              )}

              {post.categories && post.categories.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {post.categories.map((category, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 text-sm rounded-full" style={{ background: "var(--rc-copper-soft)", color: "#7a4319" }}
                    >
                      {category.title}
                    </span>
                  ))}
                </div>
              )}
            </div>
            
            {post.body ? (
              <div className="prose prose-lg max-w-none prose-headings:font-[family-name:var(--font-serif)] prose-a:text-[var(--rc-teal)]">
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
        
      </div>
      </div>
    </PageShell>
  );
}
