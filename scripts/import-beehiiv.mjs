/**
 * Import all posts from manufacturing-minute.beehiiv.com into Sanity CMS.
 *
 * Run with: node scripts/import-beehiiv.mjs
 *
 * Required env vars in .env.local:
 *   BEEHIIV_API_KEY
 *   NEXT_PUBLIC_SANITY_PROJECT_ID
 *   NEXT_PUBLIC_SANITY_DATASET (optional, defaults to 'production')
 *   SANITY_API_TOKEN
 */

import { createClient } from '@sanity/client';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const BEEHIIV_API_KEY = process.env.BEEHIIV_API_KEY;
const PUBLICATION_ID = 'pub_b90dbb2e-1603-4aa5-a5e6-0c441654055e';
const BEEHIIV_API_BASE = 'https://api.beehiiv.com/v2';

const SANITY_PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const SANITY_DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const SANITY_TOKEN = process.env.SANITY_MARKETPLACE_API_TOKEN || process.env.SANITY_API_TOKEN;

if (!BEEHIIV_API_KEY) {
  console.error('Missing BEEHIIV_API_KEY in .env.local');
  process.exit(1);
}
if (!SANITY_PROJECT_ID || !SANITY_TOKEN) {
  console.error('Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_MARKETPLACE_API_TOKEN in .env.local');
  process.exit(1);
}

const sanity = createClient({
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  apiVersion: '2024-01-01',
  token: SANITY_TOKEN,
  useCdn: false,
});

async function beehiivFetch(path) {
  const res = await fetch(`${BEEHIIV_API_BASE}${path}`, {
    headers: { Authorization: `Bearer ${BEEHIIV_API_KEY}` },
  });
  if (!res.ok) throw new Error(`Beehiiv API error ${res.status}: ${await res.text()}`);
  return res.json();
}

/**
 * Extract the article body HTML from Beehiiv's full HTML page.
 * The article content lives in <div id='content-blocks'> which comes
 * after the <div id='web-header'> section.
 */
function extractArticleHtml(fullHtml) {
  // Extract body
  const bodyMatch = fullHtml.match(/<body[^>]*>([\s\S]*)<\/body>/);
  if (!bodyMatch) return fullHtml;
  const body = bodyMatch[1];

  // Find content-blocks div — this is the article content
  const contentIdx = body.indexOf("id='content-blocks'");
  if (contentIdx === -1) {
    // Fallback: try after web-header
    const headerIdx = body.indexOf("id='web-header'");
    if (headerIdx === -1) return body;

    const divStart = body.lastIndexOf('<div', headerIdx);
    let depth = 0;
    let pos = divStart;
    while (pos < body.length) {
      const nextOpen = body.indexOf('<div', pos);
      const nextClose = body.indexOf('</div>', pos);
      if (nextOpen !== -1 && (nextClose === -1 || nextOpen < nextClose)) {
        depth++;
        pos = nextOpen + 4;
      } else if (nextClose !== -1) {
        depth--;
        pos = nextClose + 6;
        if (depth === 0) return body.slice(pos);
      } else {
        break;
      }
    }
    return body;
  }

  // Find the opening <div tag for content-blocks
  const divStart = body.lastIndexOf('<div', contentIdx);

  // Track nesting to find closing tag
  let depth = 0;
  let pos = divStart;
  while (pos < body.length) {
    const nextOpen = body.indexOf('<div', pos);
    const nextClose = body.indexOf('</div>', pos);
    if (nextOpen !== -1 && (nextClose === -1 || nextOpen < nextClose)) {
      depth++;
      pos = nextOpen + 4;
    } else if (nextClose !== -1) {
      depth--;
      pos = nextClose + 6;
      if (depth === 0) return body.slice(divStart, pos);
    } else {
      break;
    }
  }

  return body.slice(divStart);
}

async function fetchAllPosts() {
  const posts = [];
  let page = 1;
  let totalPages = 1;

  while (page <= totalPages) {
    const data = await beehiivFetch(
      `/publications/${PUBLICATION_ID}/posts?limit=10&page=${page}&status=confirmed`
    );
    posts.push(...data.data);
    totalPages = data.total_pages;
    page++;
  }

  return posts;
}

async function fetchPostContent(postId) {
  const data = await beehiivFetch(
    `/publications/${PUBLICATION_ID}/posts/${postId}?expand[]=free_web_content`
  );
  return data.data?.content?.free?.web || null;
}

async function getExistingSlugs() {
  const existing = await sanity.fetch(
    `*[_type == "post" && defined(slug.current)]{ "slug": slug.current }`
  );
  return new Set(existing.map((p) => p.slug));
}

async function main() {
  console.log('Fetching all posts from Beehiiv...');
  const posts = await fetchAllPosts();
  console.log(`Found ${posts.length} posts`);

  console.log('Fetching existing Sanity slugs to skip duplicates...');
  const existingSlugs = await getExistingSlugs();
  console.log(`Found ${existingSlugs.size} existing posts in Sanity`);

  let created = 0;
  let skipped = 0;

  for (const post of posts) {
    const slug = post.slug;

    if (existingSlugs.has(slug)) {
      console.log(`  SKIP (exists): ${post.title}`);
      skipped++;
      continue;
    }

    console.log(`  Importing: ${post.title}`);

    let htmlContent = null;
    try {
      const fullHtml = await fetchPostContent(post.id);
      if (fullHtml) {
        htmlContent = extractArticleHtml(fullHtml);
      }
    } catch (err) {
      console.warn(`    Warning: could not fetch content for "${post.title}": ${err.message}`);
    }

    const publishedAt = post.publish_date
      ? new Date(post.publish_date * 1000).toISOString()
      : new Date(post.created * 1000).toISOString();

    const doc = {
      _type: 'post',
      title: post.title,
      slug: { _type: 'slug', current: slug },
      excerpt: post.subtitle || post.preview_text || '',
      publishedAt,
      content: htmlContent || '',
      // Store thumbnail URL in content if no mainImage — included in the HTML body
    };

    await sanity.create(doc);
    created++;
    console.log(`    Created: ${post.title} (${publishedAt.slice(0, 10)})`);
  }

  console.log(`\nDone! Created: ${created}, Skipped: ${skipped}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
