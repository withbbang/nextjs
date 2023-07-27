/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
  async rewrites() {
    return [
      // 로컬, 개발, 상용 이미지 경로 잡아주기
      {
        source: "/static",
        destination: "http://dev.뭐시기/static",
      },
    ];
  },
};

module.exports = nextConfig;
