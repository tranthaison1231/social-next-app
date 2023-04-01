/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    typedRoutes: true,
  },
  images: {
    domains: ["supermomos-app-resources-us.s3.amazonaws.com"],
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
