/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/website',
  assetPrefix: '/website/',
  images: {
    domains: ['static.wixstatic.com'],
  },
}
module.exports = nextConfig
