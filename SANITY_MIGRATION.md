# Sanity Blog Migration Guide

This guide walks you through completing the migration from Vercel KV to Sanity CMS for your blog.

## What Has Been Done

1. **Installed Sanity dependencies**:
   - `@sanity/client` - Client for fetching data
   - `next-sanity` - Next.js integration
   - `sanity` - Sanity Studio
   - `@sanity/vision` - Query testing tool

2. **Created Sanity configuration**:
   - `sanity.config.js` - Main Sanity configuration
   - `sanity/schemas/post.js` - Blog post schema
   - `sanity/lib/client.js` - Sanity client setup
   - `sanity/lib/queries.js` - GROQ queries for fetching posts

3. **Set up Sanity Studio**:
   - Created Studio route at `/app/studio/[[...tool]]/page.jsx`
   - Studio will be accessible at `http://localhost:3000/studio`

4. **Created migration script**:
   - `scripts/migrate-to-sanity.js` - Migrates existing posts from KV to Sanity

5. **Updated application code**:
   - `app/blog/page.js` - Now fetches from Sanity
   - `app/blog/[slug]/page.js` - Now fetches individual posts from Sanity
   - `app/api/blog/route.js` - Updated GET endpoint
   - `app/api/blog/[id]/route.js` - Updated all endpoints (GET, PUT, DELETE)

## Next Steps

### 1. Create a Sanity Project

1. Go to [sanity.io](https://www.sanity.io/) and sign up/login
2. Create a new project
3. Note down your **Project ID** and **Dataset name** (usually "production")

### 2. Create an API Token

1. In your Sanity project dashboard, go to **API** → **Tokens**
2. Click **Add API Token**
3. Give it a name like "Migration & Site Access"
4. Set permissions to **Editor** or **Administrator**
5. Copy the token (you won't be able to see it again!)

### 3. Set Up Environment Variables

Create or update your `.env.local` file with:

```bash
# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_api_token_here

# Keep existing Vercel KV credentials for the migration
KV_REST_API_URL=your_existing_kv_url
KV_REST_API_TOKEN=your_existing_kv_token
```

### 4. Run the Migration

```bash
npm run migrate
```

This will copy all your existing blog posts from Vercel KV to Sanity.

### 5. Access Sanity Studio

```bash
npm run dev
```

Then visit `http://localhost:3000/studio` to access your Sanity Studio and verify the migrated posts.

### 6. Configure Sanity Studio (Optional)

You can customize the Studio by editing `sanity.config.js`. For example:
- Add custom tools
- Configure plugins
- Customize the structure

### 7. Update Your Blog Admin Interface (Optional)

You now have two options for managing blog posts:

**Option A: Use Sanity Studio (Recommended)**
- Access at `/studio`
- Full-featured CMS with rich text editing
- Media management
- Version history
- Collaborative editing

**Option B: Keep Your Custom Admin Interface**
- Your existing admin at `/blog/admin` will still work
- The API routes have been updated to work with Sanity
- However, you'll need to update the create/edit pages to work with Sanity

## Schema Details

The Sanity blog post schema includes:
- **title** (required) - Post title
- **slug** (required) - URL-friendly slug (auto-generated from title)
- **excerpt** - Short description
- **content** - HTML content from your editor
- **tags** - Array of tag strings
- **pdfCarousels** - Array of PDF objects with URL and title
- **publishedAt** - Publication date (defaults to now)

## Important Notes

1. **The old admin interface** (`/blog/admin`, `/blog/admin/create`, `/blog/admin/edit`) will need to be updated or replaced with Sanity Studio

2. **API Routes** have been updated to work with Sanity, so if you keep your custom admin interface, it should work (though you may need to adjust the create functionality)

3. **Sanity Studio** is the recommended way to manage content going forward. It provides:
   - Better rich text editing
   - Image handling
   - Version control
   - Real-time collaboration
   - Content scheduling

4. **After successful migration**, you can optionally remove the Vercel KV dependency and old admin pages

## Deployment

When deploying to production:

1. Add the environment variables to your hosting platform (Vercel, Netlify, etc.)
2. Make sure to add your production domain to Sanity's CORS origins:
   - Go to Sanity project settings → API → CORS Origins
   - Add your domain (e.g., `https://yoursite.com`)

## Troubleshooting

- **Posts not showing up?** Check that environment variables are set correctly
- **Studio not loading?** Make sure Sanity dependencies are installed
- **Migration failed?** Ensure KV credentials are still in .env.local
- **API errors?** Verify SANITY_API_TOKEN has proper permissions

## Questions?

Refer to the [Sanity documentation](https://www.sanity.io/docs) for more details on customizing your setup.
