/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production'
const basePath = isProd ? '/website' : ''

const nextConfig = {
  basePath,
  ...(basePath ? { assetPrefix: `${basePath}/` } : {}),
  images: {
    domains: ['static.wixstatic.com'],
  },
  async redirects() {
    if (isProd) return []
    return [
      { source: '/website', destination: '/', permanent: false },
      { source: '/website/:path*', destination: '/:path*', permanent: false },
    ]
  },
}

module.exports = nextConfig
