/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  // Proxy /payload-api calls to backend to avoid CORS issues
  async rewrites() {
    return [
      {
        source: '/payload-api/:path*',
        destination: 'http://localhost:3000/api/:path*',
      },
    ];
  },
};
module.exports = nextConfig;
