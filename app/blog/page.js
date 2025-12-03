import { client } from '../../sanity/lib/client';
import { postsQuery } from '../../sanity/lib/queries';
import BlogList from '../components/BlogList';

// Revalidate every 60 seconds (or set to 0 for dynamic)
export const revalidate = 60;

function toPlainText(blocks = []) {
  if (!blocks || !Array.isArray(blocks)) return '';
  return blocks
    .map(block => {
      if (block._type !== 'block' || !block.children) {
        return '';
      }
      return block.children.map(child => child.text).join('');
    })
    .join('\n\n');
}

export default async function BlogPage() {
  let posts = [];

  try {
    const data = await client.fetch(postsQuery);
    // Transform Sanity data to match the existing format for BlogList
    posts = data.map(post => ({
      id: post._id,
      title: post.title,
      slug: post.slug.current,
      excerpt: post.excerpt,
      // Convert blocks to plain text for search functionality in BlogList
      content: post.body ? toPlainText(post.body) : '', 
      // Map categories to tags for filtering compatibility (normalize to lowercase)
      tags: post.categories ? post.categories.map(cat => cat.title.toLowerCase()) : [], 
      pdfCarousels: post.pdfCarousels,
      createdAt: post.publishedAt,
      updatedAt: post._updatedAt,
      author: post.author,
      mainImage: post.mainImage
    }));
  } catch (error) {
    console.error('Error fetching posts:', error);
    // You could handle the error UI here or return empty posts
  }

  return <BlogList posts={posts} />;
}
