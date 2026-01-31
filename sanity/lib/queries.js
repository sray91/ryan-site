import { groq } from 'next-sanity';

// Get all blog posts
export const postsQuery = groq`*[_type == "post"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  excerpt,
  body,
  content,
  "author": author->{name, image, slug},
  "categories": categories[]->{title, "slug": slug.current, description},
  mainImage,
  "pdfCarousels": pdfCarousels[] {
    title,
    "url": asset->url
  },
  publishedAt,
  _updatedAt
}`;

// Get a single blog post by slug
export const postBySlugQuery = groq`*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  excerpt,
  body,
  content,
  "author": author->{name, image, slug},
  "categories": categories[]->{title, "slug": slug.current, description},
  mainImage,
  "pdfCarousels": pdfCarousels[] {
    title,
    "url": asset->url
  },
  publishedAt,
  _updatedAt
}`;

// Get all post slugs for static generation
export const postSlugsQuery = groq`*[_type == "post"] {
  "slug": slug.current
}`;

// Get all categories
export const categoriesQuery = groq`*[_type == "category"] | order(title asc) {
  _id,
  title,
  "slug": slug.current,
  description
}`;

// Get all tags (legacy)
export const tagsQuery = groq`*[_type == "tag"] | order(name asc) {
  _id,
  name,
  slug,
  color,
  description
}`;

// ============================================
// MARKETPLACE QUERIES
// ============================================

// Get all solutions with computed community scores
export const solutionsQuery = groq`*[_type == "solution"] | order(dateAdded desc) {
  _id,
  name,
  "slug": slug.current,
  tagline,
  summary,
  whyILikeIt,
  website,
  "logo": logo.asset->url,
  processFocus,
  techCategory,
  fundingType,
  valuesLens,
  ryanRating,
  ryanComment,
  dateAdded,
  "communityScore": {
    "average": math::avg(*[_type == "review" && references(^._id) && status == "approved"].rating),
    "count": count(*[_type == "review" && references(^._id) && status == "approved"])
  }
}`;

// Get a single solution by slug with its approved reviews
export const solutionBySlugQuery = groq`*[_type == "solution" && slug.current == $slug][0] {
  _id,
  name,
  "slug": slug.current,
  tagline,
  summary,
  whyILikeIt,
  website,
  "logo": logo.asset->url,
  processFocus,
  techCategory,
  fundingType,
  valuesLens,
  ryanRating,
  ryanComment,
  dateAdded,
  "communityScore": {
    "average": math::avg(*[_type == "review" && references(^._id) && status == "approved"].rating),
    "count": count(*[_type == "review" && references(^._id) && status == "approved"])
  },
  "reviews": *[_type == "review" && references(^._id) && status == "approved"] | order(submittedAt desc) {
    _id,
    rating,
    title,
    content,
    reviewerName,
    reviewerRole,
    reviewerCompany,
    verifiedUser,
    submittedAt
  }
}`;

// Get all solution slugs for static generation
export const solutionSlugsQuery = groq`*[_type == "solution"] {
  "slug": slug.current
}`;
