/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "images.unsplash.com", 
      "plus.unsplash.com",
      "ibb.co"
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig
