import { createClient } from '@vercel/kv';

// Create KV client with custom environment variable names
export const kv = createClient({
  url: process.env.RYAN_BLOG_KV_REST_API_URL,
  token: process.env.RYAN_BLOG_KV_REST_API_TOKEN,
});
