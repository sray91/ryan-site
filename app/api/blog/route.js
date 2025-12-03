import { NextResponse } from 'next/server';
import { client } from '../../../sanity/lib/client';
import { postsQuery } from '../../../sanity/lib/queries';

export async function GET() {
  try {
    const posts = await client.fetch(postsQuery);

    // Transform Sanity data to match the existing format
    const transformedPosts = posts.map(post => ({
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

    return NextResponse.json(transformedPosts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json([]);
  }
} 