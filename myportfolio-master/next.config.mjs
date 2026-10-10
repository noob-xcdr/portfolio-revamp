/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Cross-origin isolation for the whole site. The embedded fly-brain arena needs
  // SharedArrayBuffer, which browsers only expose on isolated pages, and an iframe is
  // only isolated when its embedding page is too. Every demo is therefore self-hosted
  // under /demos (same origin); don't add cross-origin iframes or scripts without CORP.
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
          { key: 'Cross-Origin-Embedder-Policy', value: 'require-corp' },
        ],
      },
    ]
  },
}

export default nextConfig
