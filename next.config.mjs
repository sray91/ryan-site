/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {},
  // Allow external domains for PDF files
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // Increase request size limits for PDF uploads
  serverExternalPackages: ['sharp', 'pdfjs-dist'],
  // Configure for App Router - no api config needed
  // Body size limits are handled at the route level
};

export default nextConfig;
