import { NextResponse } from 'next/server';
import { createClient } from '@sanity/client';

const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2025-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const post = await sanityClient.getDocument(id);

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    // Transform Sanity data to match the existing format
    const transformedPost = {
      id: post._id,
      title: post.title,
      slug: post.slug.current,
      excerpt: post.excerpt,
      content: post.content,
      tags: post.tags,
      pdfCarousels: post.pdfCarousels,
      createdAt: post.publishedAt,
      updatedAt: post._updatedAt,
    };

    return NextResponse.json(transformedPost);
  } catch (error) {
    console.error('Error fetching post:', error);
    return NextResponse.json({ error: 'Failed to fetch post' }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { title, content, excerpt, tags, pdfCarousels } = body;

    if (!title || !content) {
      return NextResponse.json({ error: 'Title and content are required' }, { status: 400 });
    }

    const updatedPost = await sanityClient
      .patch(id)
      .set({
        title,
        content,
        excerpt: excerpt || content.substring(0, 150) + '...',
        tags: tags || [],
        pdfCarousels: pdfCarousels || [],
      })
      .commit();

    // Transform Sanity data to match the existing format
    const transformedPost = {
      id: updatedPost._id,
      title: updatedPost.title,
      slug: updatedPost.slug.current,
      excerpt: updatedPost.excerpt,
      content: updatedPost.content,
      tags: updatedPost.tags,
      pdfCarousels: updatedPost.pdfCarousels,
      createdAt: updatedPost.publishedAt,
      updatedAt: updatedPost._updatedAt,
    };

    return NextResponse.json(transformedPost);
  } catch (error) {
    console.error('Error updating post:', error);
    return NextResponse.json({ error: 'Failed to update post' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;

    await sanityClient.delete(id);

    return NextResponse.json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Error deleting post:', error);
    return NextResponse.json({ error: 'Failed to delete post' }, { status: 500 });
  }
} 