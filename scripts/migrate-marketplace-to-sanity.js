/**
 * Migration script to import existing marketplace solutions from JSON to Sanity
 *
 * Run with: node scripts/migrate-marketplace-to-sanity.js
 *
 * Note: This will create new documents in Sanity. Logos need to be uploaded manually
 * or via a separate script since they're currently file paths.
 */

import { createClient } from '@sanity/client';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Initialize Sanity client with write permissions
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  token: process.env.SANITY_MARKETPLACE_API_TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false,
});

async function migrateSolutions() {
  // Read existing solutions data
  const dataPath = join(__dirname, '../data/marketplace/solutions.json');
  const data = JSON.parse(readFileSync(dataPath, 'utf-8'));
  const { solutions } = data;

  console.log(`Found ${solutions.length} solutions to migrate\n`);

  for (const solution of solutions) {
    console.log(`Migrating: ${solution.name}...`);

    try {
      // Check if solution already exists
      const existing = await client.fetch(
        `*[_type == "solution" && slug.current == $slug][0]`,
        { slug: solution.slug }
      );

      if (existing) {
        console.log(`  ⏭️  Already exists, skipping\n`);
        continue;
      }

      // Create the solution document
      const doc = {
        _type: 'solution',
        name: solution.name,
        slug: {
          _type: 'slug',
          current: solution.slug,
        },
        tagline: solution.tagline,
        summary: solution.summary,
        whyILikeIt: solution.whyILikeIt,
        website: solution.website,
        // Logo will need to be uploaded separately - storing path for reference
        // logo: solution.logo,
        processFocus: solution.tags.processFocus || [],
        techCategory: solution.tags.techCategory || [],
        fundingType: solution.tags.fundingType || [],
        valuesLens: solution.tags.valuesLens || [],
        ryanRating: solution.ryanScore.rating,
        ryanComment: solution.ryanScore.comment,
        dateAdded: solution.dateAdded,
      };

      const result = await client.create(doc);
      console.log(`  ✅ Created with ID: ${result._id}\n`);

      // If there are existing community reviews to migrate, we'd add them here
      // For now, the communityScore from JSON is historical data
      // New reviews will be collected through the review submission flow
      if (solution.communityScore && solution.communityScore.count > 0) {
        console.log(`  ℹ️  Note: Had ${solution.communityScore.count} reviews (avg: ${solution.communityScore.average}) - these will need to be collected fresh\n`);
      }

    } catch (error) {
      console.error(`  ❌ Error migrating ${solution.name}:`, error.message);
    }
  }

  console.log('\n✅ Migration complete!');
  console.log('\n📝 Next steps:');
  console.log('   1. Upload logos for each solution in Sanity Studio');
  console.log('   2. Update frontend pages to fetch from Sanity instead of JSON');
  console.log('   3. Set up review submission form to create reviews in Sanity');
}

migrateSolutions().catch(console.error);
