/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/website',
  assetPrefix: '/website/',
  images: {
    domains: ['static.wixstatic.com'],
  },
  async redirects() {
    return [
      { source: '/Media', destination: '/media', permanent: true },
      { source: '/HQ', destination: '/hq', permanent: true },
      { source: '/Farms', destination: '/farms', permanent: true },
    ]
  },
}
module.exports = nextConfig
