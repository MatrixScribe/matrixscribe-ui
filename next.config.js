/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Force Next.js to use Webpack instead of Turbopack
  turbopack: false,

  // Ensure dynamic routes run on the server
  output: "standalone",

  // No experimental flags — Next.js 16 rejects them
};

module.exports = nextConfig;
