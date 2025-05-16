/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'm.media-amazon.com',
      'http2.mlstatic.com',
      'imgnike-a.akamaihd.net',
    ],
    unoptimized: true,
  },
};

module.exports = nextConfig;
