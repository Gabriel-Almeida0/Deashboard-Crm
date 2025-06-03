/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  poweredByHeader: false,
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    unoptimized: true,
  },
  compress: true,
  output: 'export',
  distDir: 'out',
  basePath: '/Deashboard-Crm',
  assetPrefix: '/Deashboard-Crm/',
  trailingSlash: true,
};

module.exports = nextConfig;
