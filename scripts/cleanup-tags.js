import { createClient } from '@sanity/client';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false,
});

async function cleanup() {
  console.log('Starting cleanup of legacy tags...');

  try {
    // 1. Fetch all posts that have the tags field
    const posts = await client.fetch(`*[_type == "post" && defined(tags)]`);
    console.log(`Found ${posts.length} posts with legacy tags.`);

    // 2. Unset the tags field for each post
    for (const post of posts) {
      await client.patch(post._id).unset(['tags']).commit();
      console.log(`Removed tags from: ${post.title}`);
    }
    
    console.log('Cleanup complete! legacy tags field removed.');
  } catch (error) {
    console.error('Cleanup failed:', error);
  }
}

cleanup();

