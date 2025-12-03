import { createClient } from '@sanity/client';
import slugify from 'slugify';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

// Verify config
const config = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false,
};

if (!config.projectId) {
  console.error('Error: NEXT_PUBLIC_SANITY_PROJECT_ID is not set');
  process.exit(1);
}

const client = createClient(config);

// Simple HTML to Portable Text converter (very basic)
function htmlToBlocks(html) {
  if (!html) return [];
  
  // Remove simple HTML tags for plain text blocks for now, 
  // as a full HTML parser is complex without extra deps.
  // We'll split by paragraphs <p> or double newlines.
  const paragraphs = html
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>/gi, '\n\n')
    .replace(/<[^>]+>/g, '') // Strip remaining tags
    .split(/\n\n+/)
    .map(p => p.trim())
    .filter(p => p.length > 0);

  return paragraphs.map(p => ({
    _type: 'block',
    style: 'normal',
    children: [
      {
        _type: 'span',
        marks: [],
        text: p,
      },
    ],
    markDefs: [],
  }));
}

async function migrate() {
  console.log('Starting migration...');

  try {
    // 1. Fetch all posts
    const posts = await client.fetch(`*[_type == "post"]`);
    console.log(`Found ${posts.length} posts to migrate.`);

    // 2. Process each post
    for (const post of posts) {
      console.log(`Processing post: ${post.title}`);
      
      const updates = {};

      // Migrate Tags to Categories
      if (post.tags && Array.isArray(post.tags)) {
        const categoryRefs = [];
        
        for (const tagName of post.tags) {
            // Check if it's a reference (new schema) or string (old schema)
            let tagTitle = tagName;
            if (typeof tagName === 'object' && tagName._ref) {
                // It's already a reference, maybe to a Tag document
                // We want to move to Category.
                // Ideally we resolve the Tag doc to get the name, but if it's legacy string array:
                continue; 
            }
             // If it's a string (from old schema or mapped legacy)
            if (typeof tagName === 'string') {
                 const categorySlug = slugify(tagName, { lower: true, strict: true });
                 
                 // Check if category exists
                 const existingCategory = await client.fetch(
                   `*[_type == "category" && slug.current == $slug][0]`,
                   { slug: categorySlug }
                 );

                 let categoryId;
                 if (existingCategory) {
                   categoryId = existingCategory._id;
                 } else {
                   // Create new category
                   const newCategory = await client.create({
                     _type: 'category',
                     title: tagName,
                     slug: { _type: 'slug', current: categorySlug },
                     description: `Imported from tag: ${tagName}`
                   });
                   categoryId = newCategory._id;
                   console.log(`Created category: ${tagName}`);
                 }
                 
                 categoryRefs.push({
                   _type: 'reference',
                   _ref: categoryId,
                   _key: categoryId // simple key
                 });
            }
        }
        
        if (categoryRefs.length > 0) {
            updates.categories = categoryRefs;
        }
      }

      // Migrate Content to Body (if body is empty and content exists)
      if (!post.body && post.content) {
        console.log('Converting content to blocks...');
        updates.body = htmlToBlocks(post.content);
      }

      // Apply updates
      if (Object.keys(updates).length > 0) {
        await client.patch(post._id).set(updates).commit();
        console.log(`Updated post: ${post.title}`);
      } else {
        console.log(`No changes needed for: ${post.title}`);
      }
    }
    
    console.log('Migration complete!');
  } catch (error) {
    console.error('Migration failed:', error);
  }
}

migrate();
