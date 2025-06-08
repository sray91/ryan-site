import { NextResponse } from 'next/server';
import { kv } from '@vercel/kv';
import { format } from 'date-fns';
import slugify from 'slugify';

export async function GET() {
  try {
    // Get all blog post keys
    const keys = await kv.keys('blog:*');
    
    if (keys.length === 0) {
      return NextResponse.json([]);
    }
    
    // Get all posts
    const posts = await kv.mget(...keys);
    
    // Filter out null values and sort by creation date
    const validPosts = posts
      .filter(post => post !== null)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    return NextResponse.json(validPosts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    console.log('Received request body:', JSON.stringify(body, null, 2));
    
    const { title, content, excerpt, tags } = body;

    if (!title || !content) {
      return NextResponse.json({ error: 'Title and content are required' }, { status: 400 });
    }

    // Validate content length (max 1MB)
    if (content.length > 1024 * 1024) {
      return NextResponse.json({ error: 'Content too long (max 1MB)' }, { status: 400 });
    }

    const now = new Date();
    const slug = slugify(title, { lower: true, strict: true });
    
    // Generate excerpt safely
    let generatedExcerpt = excerpt;
    if (!generatedExcerpt && content) {
      // Strip HTML tags for excerpt if content contains HTML
      const textContent = content.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
      generatedExcerpt = textContent.substring(0, 150) + (textContent.length > 150 ? '...' : '');
    }
    
    const post = {
      id: Date.now().toString(),
      title: String(title).trim(),
      content: String(content),
      excerpt: generatedExcerpt || '',
      tags: Array.isArray(tags) ? tags : [],
      slug,
      createdAt: now.toISOString(),
      updatedAt: now.toISOString()
    };

    console.log('Creating post:', { id: post.id, title: post.title, contentLength: post.content.length });

    // Store in Vercel KV instead of file system
    const postKey = `blog:${post.id}`;
    await kv.set(postKey, post);

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error('Error creating blog post:', error);
    console.error('Error stack:', error.stack);
    console.error('Error name:', error.name);
    
    return NextResponse.json({ 
      error: 'Failed to create post', 
      details: error.message,
      errorName: error.name,
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
} 