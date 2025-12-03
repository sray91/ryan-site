import { groq } from 'next-sanity';

// Get all blog posts
export const postsQuery = groq`*[_type == "post"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  excerpt,
  content,
  tags,
  pdfCarousels,
  publishedAt,
  _updatedAt
}`;

// Get a single blog post by slug
export const postBySlugQuery = groq`*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  excerpt,
  content,
  tags,
  pdfCarousels,
  publishedAt,
  _updatedAt
}`;

// Get all post slugs for static generation
export const postSlugsQuery = groq`*[_type == "post"] {
  "slug": slug.current
}`;
