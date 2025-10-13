import { NextResponse } from 'next/server';
import { kv } from '../../../lib/kv';

// Get all tags
export async function GET() {
  try {
    let tags = await kv.get('blog_tags');
    if (!tags) {
      tags = [];
    }
    return NextResponse.json(tags);
  } catch (error) {
    console.error('Error fetching tags:', error);
    return NextResponse.json({ error: 'Failed to fetch tags' }, { status: 500 });
  }
}

// Create or update tags
export async function POST(request) {
  try {
    const body = await request.json();
    const { name, color, description, image } = body;

    if (!name || !name.trim()) {
      return NextResponse.json({ error: 'Tag name is required' }, { status: 400 });
    }

    // Get current tags
    let tags = await kv.get('blog_tags');
    if (!tags) {
      tags = [];
    }

    // Check if tag already exists
    const existingTagIndex = tags.findIndex(tag => tag.name.toLowerCase() === name.toLowerCase());
    
    const tagData = {
      id: existingTagIndex >= 0 ? tags[existingTagIndex].id : Date.now().toString(),
      name: name.trim(),
      color: color || '#3B82F6', // Default blue color
      description: description || '',
      image: image || (existingTagIndex >= 0 ? tags[existingTagIndex].image : null),
      createdAt: existingTagIndex >= 0 ? tags[existingTagIndex].createdAt : new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    if (existingTagIndex >= 0) {
      // Update existing tag
      tags[existingTagIndex] = tagData;
    } else {
      // Add new tag
      tags.push(tagData);
    }

    // Save to KV
    await kv.set('blog_tags', tags);

    return NextResponse.json(tagData, { status: existingTagIndex >= 0 ? 200 : 201 });
  } catch (error) {
    console.error('Error creating/updating tag:', error);
    return NextResponse.json({ error: 'Failed to create/update tag' }, { status: 500 });
  }
}

// Delete tag
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const tagId = searchParams.get('id');

    if (!tagId) {
      return NextResponse.json({ error: 'Tag ID is required' }, { status: 400 });
    }

    // Get current tags
    let tags = await kv.get('blog_tags');
    if (!tags) {
      tags = [];
    }

    // Remove tag
    const initialLength = tags.length;
    tags = tags.filter(tag => tag.id !== tagId);

    if (tags.length === initialLength) {
      return NextResponse.json({ error: 'Tag not found' }, { status: 404 });
    }

    // Save updated tags
    await kv.set('blog_tags', tags);

    return NextResponse.json({ message: 'Tag deleted successfully' });
  } catch (error) {
    console.error('Error deleting tag:', error);
    return NextResponse.json({ error: 'Failed to delete tag' }, { status: 500 });
  }
} 