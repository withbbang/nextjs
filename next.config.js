/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
  reactStrictMode: false,
  async rewrites() {
    return [
      !isProd && {
        source: "/api/:path*",
        destination: "http://localhost:5000/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
