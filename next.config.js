/** @type {import('next').NextConfig} */
const nextConfig = {
  // Vercel 使用默认输出；本地/独立服务器使用 standalone
  output: process.env.VERCEL ? undefined : 'standalone',
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.cloudflare.steamstatic.com' },
      { protocol: 'https', hostname: 'images.igdb.com' },
      { protocol: 'https', hostname: '**.controlresonantguide.com' },
    ],
    formats: ['image/avif', 'image/webp'],
  },
  async redirects() {
    return [
      {
        // Single-game site: /games points at the only game hub
        source: '/games',
        destination: '/games/control-resonant',
        permanent: true,
      },
    ];
  },
  headers: async () => [
    {
      // HTML pages: never cache (preview panel was serving stale copies)
      source: '/((?!_next/static|_next/image|favicon|images|og).*)',
      headers: [
        { key: 'Cache-Control', value: 'no-cache, no-store, must-revalidate' },
        { key: 'Pragma', value: 'no-cache' },
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'X-Frame-Options', value: 'DENY' },
        { key: 'X-XSS-Protection', value: '1; mode=block' },
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      ],
    },
    {
      // Static assets: long cache (fingerprinted by hash)
      source: '/:path*.{jpg,jpeg,png,webp,avif,svg,woff2,css,js}',
      headers: [
        { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
      ],
    },
  ],
  experimental: {
    optimizePackageImports: ['@mdx-js/react'],
  },
};

module.exports = nextConfig;
