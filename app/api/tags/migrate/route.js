import { NextResponse } from 'next/server';
import { kv } from '../../../../lib/kv';

export async function POST() {
  try {
    // Default tags based on your blog categories
    const defaultTags = [
      {
        id: 'general',
        name: 'general',
        color: '#6B7280',
        description: 'General blog posts and articles',
        image: '/bg.png', // Using existing background image as placeholder
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: 'infographic',
        name: 'infographic',
        color: '#3B82F6',
        description: 'Visual data and information designs',
        image: '/infographic.png',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: 'private-equity',
        name: 'private-equity',
        color: '#10B981',
        description: 'Insights on private equity and investments',
        image: '/private-equity.png',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: 'dd',
        name: 'd&d',
        color: '#8B5CF6',
        description: 'Adventures and stories from the realm of Dungeons & Dragons',
        image: '/d&d.png',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ];

    // Get existing blog posts to extract any additional tags
    const blogKeys = await kv.keys('blog:*');
    const existingTagsSet = new Set();
    
    if (blogKeys.length > 0) {
      const blogPosts = await kv.mget(...blogKeys);
      blogPosts.forEach(post => {
        if (post && post.tags && Array.isArray(post.tags)) {
          post.tags.forEach(tag => {
            if (tag && tag.trim()) {
              existingTagsSet.add(tag.trim());
            }
          });
        }
      });
    }

    // Get current tags from storage
    let currentTags = await kv.get('blog_tags') || [];
    const currentTagNames = new Set(currentTags.map(tag => tag.name));

    // Add default tags if they don't exist
    const tagsToAdd = [];
    
    defaultTags.forEach(tag => {
      if (!currentTagNames.has(tag.name)) {
        tagsToAdd.push(tag);
      }
    });

    // Add any additional tags found in blog posts
    existingTagsSet.forEach(tagName => {
      if (!currentTagNames.has(tagName) && !defaultTags.some(t => t.name === tagName)) {
        tagsToAdd.push({
          id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
          name: tagName,
          color: '#3B82F6',
          description: '',
          image: null,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        });
      }
    });

    // Update the tags in storage
    if (tagsToAdd.length > 0) {
      const updatedTags = [...currentTags, ...tagsToAdd];
      await kv.set('blog_tags', updatedTags);
    }

    return NextResponse.json({ 
      message: 'Tags migrated successfully',
      migratedTags: tagsToAdd.length,
      totalTags: currentTags.length + tagsToAdd.length
    });

  } catch (error) {
    console.error('Error migrating tags:', error);
    return NextResponse.json({ error: 'Failed to migrate tags' }, { status: 500 });
  }
} 