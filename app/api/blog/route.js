import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { format } from 'date-fns';
import slugify from 'slugify';

const BLOG_DATA_DIR = path.join(process.cwd(), 'data', 'blog');

// Ensure blog directory exists
if (!fs.existsSync(BLOG_DATA_DIR)) {
  fs.mkdirSync(BLOG_DATA_DIR, { recursive: true });
}

export async function GET() {
  try {
    const files = fs.readdirSync(BLOG_DATA_DIR);
    const posts = files
      .filter(file => file.endsWith('.json'))
      .map(file => {
        const filePath = path.join(BLOG_DATA_DIR, file);
        const content = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(content);
      })
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { title, content, excerpt } = body;

    if (!title || !content) {
      return NextResponse.json({ error: 'Title and content are required' }, { status: 400 });
    }

    const now = new Date();
    const slug = slugify(title, { lower: true, strict: true });
    
    const post = {
      id: Date.now().toString(),
      title,
      content,
      excerpt: excerpt || content.substring(0, 150) + '...',
      slug,
      createdAt: now.toISOString(),
      updatedAt: now.toISOString()
    };

    const filename = `${post.id}.json`;
    const filePath = path.join(BLOG_DATA_DIR, filename);
    
    fs.writeFileSync(filePath, JSON.stringify(post, null, 2));

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create post' }, { status: 500 });
  }
} 