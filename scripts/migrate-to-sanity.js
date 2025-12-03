import dotenv from 'dotenv';
import { createClient as createSanityClient } from '@sanity/client';
import { createClient as createKVClient } from '@vercel/kv';

// Load environment variables
dotenv.config({ path: '.env.local' });

// Create KV client with environment variables
const kv = createKVClient({
  url: process.env.RYAN_BLOG_KV_REST_API_URL,
  token: process.env.RYAN_BLOG_KV_REST_API_TOKEN,
});

const sanityClient = createSanityClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2025-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

async function migrateBlogPosts() {
  console.log('Starting migration from Vercel KV to Sanity...\n');

  try {
    // Get all blog post keys from KV
    const keys = await kv.keys('blog:*');
    console.log(`Found ${keys.length} blog posts in Vercel KV`);

    if (keys.length === 0) {
      console.log('No blog posts to migrate.');
      return;
    }

    // Get all posts
    const posts = await kv.mget(...keys);
    const validPosts = posts.filter(post => post !== null);

    console.log(`Migrating ${validPosts.length} valid posts...\n`);

    // Migrate each post
    for (const post of validPosts) {
      console.log(`Migrating: ${post.title}`);

      const sanityDoc = {
        _type: 'post',
        title: post.title,
        slug: {
          _type: 'slug',
          current: post.slug,
        },
        excerpt: post.excerpt || '',
        content: post.content || '',
        tags: post.tags || [],
        pdfCarousels: post.pdfCarousels || [],
        publishedAt: post.createdAt,
      };

      try {
        const result = await sanityClient.create(sanityDoc);
        console.log(`✓ Created post with ID: ${result._id}`);
      } catch (error) {
        console.error(`✗ Failed to migrate "${post.title}":`, error.message);
      }
    }

    console.log('\n✓ Migration completed!');
    console.log('\nNext steps:');
    console.log('1. Visit http://localhost:3000/studio to verify the migrated posts');
    console.log('2. Update your blog pages to use Sanity instead of KV');
    console.log('3. Test the blog functionality');
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

migrateBlogPosts();
