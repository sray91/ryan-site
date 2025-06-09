/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    // Handle PDF.js worker files
    config.resolve.alias = {
      ...config.resolve.alias,
      canvas: false,
    };
    
    return config;
  },
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
  experimental: {
    serverComponentsExternalPackages: ['sharp'],
  },
  // Configure body size limits (50MB for PDFs)
  api: {
    bodyParser: {
      sizeLimit: '50mb',
    },
  },
};

export default nextConfig;
