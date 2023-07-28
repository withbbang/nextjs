/** @type {import('next').NextConfig} */
const nextConfig =
  process.env.NODE_ENV === "production"
    ? {
        compiler: {
          removeConsole: true,
        },
      }
    : {
        async rewrites() {
          return [
            {
              source: "/api/:path*",
              destination: "http://localhost:4000/api/:path*",
            },
          ];
        },
      };

module.exports = nextConfig;
