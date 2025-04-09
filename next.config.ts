import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      'i.ibb.co',
      'example.com',
      'images.yourapi.com'
    ],
  },
  async headers() {
    return [
      {
        // Prevent caching issues with _next/static files
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
  // Optional but helps with chunk file consistency during deployment
  output: 'standalone',
};

export default nextConfig;
