import { createClient } from '@sanity/client';

const BEEHIIV_API_KEY = process.env.BEEHIIV_API_KEY;
const BEEHIIV_WEBHOOK_SECRET = process.env.BEEHIIV_WEBHOOK_SECRET;
const PUBLICATION_ID = process.env.BEEHIIV_PUBLICATION_ID;

const sanity = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_MARKETPLACE_API_TOKEN,
  useCdn: false,
});

function extractArticleHtml(fullHtml) {
  const bodyMatch = fullHtml.match(/<body[^>]*>([\s\S]*)<\/body>/);
  if (!bodyMatch) return fullHtml;
  const body = bodyMatch[1];

  const contentIdx = body.indexOf("id='content-blocks'");
  const divStart = contentIdx !== -1
    ? body.lastIndexOf('<div', contentIdx)
    : body.lastIndexOf('<div', body.indexOf("id='web-header'"));

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
      if (depth === 0) {
        return contentIdx !== -1 ? body.slice(divStart, pos) : body.slice(pos);
      }
    } else {
      break;
    }
  }
  return body.slice(divStart);
}

async function fetchPostContent(postId) {
  const res = await fetch(
    `https://api.beehiiv.com/v2/publications/${PUBLICATION_ID}/posts/${postId}?expand[]=free_web_content`,
    { headers: { Authorization: `Bearer ${BEEHIIV_API_KEY}` } }
  );
  if (!res.ok) throw new Error(`Beehiiv API error ${res.status}`);
  const data = await res.json();
  return data.data;
}

async function postExistsInSanity(slug) {
  const result = await sanity.fetch(
    `*[_type == "post" && slug.current == $slug][0]._id`,
    { slug }
  );
  return !!result;
}

export async function POST(request) {
  // Verify shared secret passed as query param when the webhook was registered
  const { searchParams } = new URL(request.url);
  const incomingSecret = searchParams.get('secret');
  if (BEEHIIV_WEBHOOK_SECRET && incomingSecret !== BEEHIIV_WEBHOOK_SECRET) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  // Only handle post.sent events
  if (body.event_type !== 'post.sent') {
    return Response.json({ ok: true, message: `Ignored event: ${body.event_type}` });
  }

  const postData = body.data;
  if (!postData?.id || !postData?.slug) {
    return Response.json({ error: 'Missing post id or slug' }, { status: 400 });
  }

  // Skip if already in Sanity
  const exists = await postExistsInSanity(postData.slug);
  if (exists) {
    return Response.json({ ok: true, message: 'Post already exists' });
  }

  // Fetch full post content from Beehiiv
  const post = await fetchPostContent(postData.id);
  const fullHtml = post?.content?.free?.web || null;
  const htmlContent = fullHtml ? extractArticleHtml(fullHtml) : '';

  const publishedAt = post.publish_date
    ? new Date(post.publish_date * 1000).toISOString()
    : new Date(post.created * 1000).toISOString();

  await sanity.create({
    _type: 'post',
    title: post.title,
    slug: { _type: 'slug', current: post.slug },
    excerpt: post.subtitle || post.preview_text || '',
    publishedAt,
    content: htmlContent,
  });

  console.log(`[beehiiv-webhook] Created post: ${post.title}`);
  return Response.json({ ok: true, message: `Created: ${post.title}` });
}
