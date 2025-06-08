import { NextResponse } from 'next/server';
import { kv } from '@vercel/kv';

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const postKey = `blog:${id}`;
    const post = await kv.get(postKey);
    
    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    return NextResponse.json(post);
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

    const postKey = `blog:${id}`;
    const existingPost = await kv.get(postKey);
    
    if (!existingPost) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    const updatedPost = {
      ...existingPost,
      title,
      content,
      excerpt: excerpt || content.substring(0, 150) + '...',
      tags: tags || [],
      pdfCarousels: pdfCarousels || [],
      updatedAt: new Date().toISOString()
    };

    await kv.set(postKey, updatedPost);

    return NextResponse.json(updatedPost);
  } catch (error) {
    console.error('Error updating post:', error);
    return NextResponse.json({ error: 'Failed to update post' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    const postKey = `blog:${id}`;
    
    const existingPost = await kv.get(postKey);
    if (!existingPost) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    await kv.del(postKey);

    return NextResponse.json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Error deleting post:', error);
    return NextResponse.json({ error: 'Failed to delete post' }, { status: 500 });
  }
} 