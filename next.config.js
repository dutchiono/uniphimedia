/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/website',
  assetPrefix: '/website/',
  images: {
    domains: ['static.wixstatic.com'],
  },
  async redirects() {
    return [
      { source: '/media', destination: '/Media', permanent: true },
      { source: '/hq', destination: '/HQ', permanent: true },
      { source: '/farms', destination: '/Farms', permanent: true },
    ]
  },
}
module.exports = nextConfig
