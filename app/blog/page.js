import { client } from '../../sanity/lib/client';
import { postsQuery } from '../../sanity/lib/queries';
import BlogList from '../components/BlogList';

// Revalidate every 60 seconds (or set to 0 for dynamic)
export const revalidate = 60;

export default async function BlogPage() {
  let posts = [];

  try {
    const data = await client.fetch(postsQuery);
    // Transform Sanity data to match the existing format
    posts = data.map(post => ({
      id: post._id,
      title: post.title,
      slug: post.slug.current,
      excerpt: post.excerpt,
      content: post.content,
      tags: post.tags,
      pdfCarousels: post.pdfCarousels,
      createdAt: post.publishedAt,
      updatedAt: post._updatedAt,
    }));
  } catch (error) {
    console.error('Error fetching posts:', error);
    // You could handle the error UI here or return empty posts
  }

  return <BlogList posts={posts} />;
}
