/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Force Next.js to run as a Node server (NOT static export)
  output: "standalone",

  // Ensure dynamic routes like /entity/[slug] run on the server
  experimental: {
    serverActions: true,
    serverComponentsExternalPackages: [],
  },

  // Disable Turbopack in production (it requires eval)
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.devtool = "source-map";
    }
    return config;
  },

  // Ensure Next.js does NOT fall back to static HTML
  dynamicParams: true,
};

module.exports = nextConfig;
