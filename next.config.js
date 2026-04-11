/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    domains: ['dtcxcfsfnotksdqrwxsh.supabase.co'], // ✅ ADD THIS
  },

  async rewrites() {
    const payloadUrl = process.env.NEXT_PUBLIC_PAYLOAD_URL || 'http://localhost:3001';
    return [
      {
        source: '/payload-api/:path*',
        destination: `${payloadUrl}/api/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;