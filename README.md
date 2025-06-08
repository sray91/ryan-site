This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Blog Features

This site includes a full-featured blog system with:

- ✅ Rich text editor (WYSIWYG)
- ✅ Image upload functionality
- ✅ Tags system for organizing posts
- ✅ Admin panel for managing posts
- ✅ Responsive design

### Image Upload Setup

The blog uses Vercel Blob Storage for persistent image storage. For image uploads to work in production:

1. **Vercel Blob Storage** is automatically available when deployed to Vercel
2. No additional configuration needed - it just works!
3. Images are stored on Vercel's global CDN for fast delivery

**For local development:** Image uploads will work, but uploaded images are stored temporarily and may not persist between restarts.

### Admin Access

- **Create Posts:** `/blog/admin/create`
- **Manage Posts:** `/blog/admin`
- **Edit Posts:** Click "Edit" from the admin panel or individual post pages

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

**Image uploads will work automatically** when deployed to Vercel thanks to Vercel Blob Storage integration.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
