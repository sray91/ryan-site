import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const BLOG_DATA_DIR = path.join(process.cwd(), 'data', 'blog');

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const filePath = path.join(BLOG_DATA_DIR, `${id}.json`);
    
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    const content = fs.readFileSync(filePath, 'utf8');
    const post = JSON.parse(content);

    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch post' }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { title, content, excerpt, tags } = body;

    if (!title || !content) {
      return NextResponse.json({ error: 'Title and content are required' }, { status: 400 });
    }

    const filePath = path.join(BLOG_DATA_DIR, `${id}.json`);
    
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    const existingContent = fs.readFileSync(filePath, 'utf8');
    const existingPost = JSON.parse(existingContent);

    const updatedPost = {
      ...existingPost,
      title,
      content,
      excerpt: excerpt || content.substring(0, 150) + '...',
      tags: tags || [],
      updatedAt: new Date().toISOString()
    };

    fs.writeFileSync(filePath, JSON.stringify(updatedPost, null, 2));

    return NextResponse.json(updatedPost);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update post' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    const filePath = path.join(BLOG_DATA_DIR, `${id}.json`);
    
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    fs.unlinkSync(filePath);

    return NextResponse.json({ message: 'Post deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete post' }, { status: 500 });
  }
} 