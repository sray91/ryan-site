# Blog System Documentation

This Next.js application now includes a full-featured blog system with backend functionality.

## Features

- ✅ **Full-stack blog** with Create, Read, Update, Delete operations
- ✅ **Markdown support** for rich content formatting
- ✅ **Admin panel** for easy content management
- ✅ **File-based storage** (easily upgradeable to database)
- ✅ **SEO-friendly** URLs with slugs
- ✅ **Responsive design** that works on all devices
- ✅ **Modern UI** with Tailwind CSS

## Blog Structure

### Pages
- `/blog` - Main blog listing page
- `/blog/[slug]` - Individual blog post pages
- `/blog/admin` - Admin panel for managing posts
- `/blog/admin/create` - Create new blog posts
- `/blog/admin/edit/[id]` - Edit existing posts

### API Endpoints

#### GET `/api/blog`
Fetch all blog posts (sorted by creation date, newest first)

#### POST `/api/blog`
Create a new blog post
```json
{
  "title": "Post Title",
  "content": "Post content in Markdown",
  "excerpt": "Optional excerpt"
}
```

#### GET `/api/blog/[id]`
Fetch a specific blog post by ID

#### PUT `/api/blog/[id]`
Update an existing blog post
```json
{
  "title": "Updated Title",
  "content": "Updated content",
  "excerpt": "Updated excerpt"
}
```

#### DELETE `/api/blog/[id]`
Delete a blog post

## Data Storage

Blog posts are stored as JSON files in the `data/blog/` directory. Each post has:

```json
{
  "id": "unique-timestamp-id",
  "title": "Post Title",
  "content": "Markdown content",
  "excerpt": "Brief description",
  "slug": "url-friendly-slug",
  "createdAt": "ISO-8601-timestamp",
  "updatedAt": "ISO-8601-timestamp"
}
```

## Getting Started

1. **Start the development server:**
   ```bash
   npm run dev
   ```

2. **Visit the blog:**
   - Main site: `http://localhost:3000`
   - Blog: `http://localhost:3000/blog`
   - Admin: `http://localhost:3000/blog/admin`

3. **Create your first post:**
   - Go to `/blog/admin`
   - Click "Create New Post"
   - Write your content using Markdown
   - Click "Create Post"

## Markdown Support

The blog supports full Markdown syntax:

- **Headers:** `# H1`, `## H2`, `### H3`
- **Bold:** `**bold text**`
- **Italic:** `*italic text*`
- **Links:** `[text](url)`
- **Code:** `` `inline code` `` or ``` for code blocks
- **Lists:** `-` or `1.` for numbered lists
- **Images:** `![alt](url)`

## Deployment

This blog system works with any Next.js hosting provider:

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect to Vercel
3. Deploy automatically

### Other Platforms
- **Netlify:** Set build command to `npm run build`
- **Railway:** Works out of the box
- **DigitalOcean App Platform:** Configure Node.js app

## Upgrading to Database

To upgrade from file-based storage to a database:

1. **Choose a database** (PostgreSQL, MySQL, MongoDB)
2. **Update API routes** in `app/api/blog/`
3. **Replace file operations** with database queries
4. **Add database connection** logic

Popular options:
- **Prisma** with PostgreSQL
- **MongoDB** with Mongoose
- **Supabase** for hosted PostgreSQL

## Security Considerations

**Note:** The current implementation doesn't include authentication. For production use, consider adding:

- **Authentication** for admin panel access
- **Input validation** and sanitization
- **Rate limiting** for API routes
- **CSRF protection**
- **User roles** and permissions

## Customization

### Styling
- Modify Tailwind classes in component files
- Update `app/globals.css` for global styles

### Features to Add
- **Categories/Tags** for post organization
- **Search functionality**
- **Comments system**
- **RSS feed**
- **Social sharing**
- **Image upload**

## Support

The blog system is built with:
- **Next.js 15** - React framework
- **Tailwind CSS** - Styling
- **Marked** - Markdown parsing
- **date-fns** - Date formatting
- **Slugify** - URL-friendly slugs

For issues or feature requests, check the Next.js documentation or create an issue in your repository. 