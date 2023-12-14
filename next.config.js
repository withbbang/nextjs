/** @type {import('next').NextConfig} */
const path = require("path");
const prod = require("./configs/prod.config");
const dev = require("./configs/dev.config");
const { i18n } = require("./next-i18next.config");

const nextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
    prependData: `@import "styles/_variables.scss";`, // prependData 옵션 추가
  },
  i18n,
  ...(process.env.NEXT_PUBLIC_ENV === "prod" ? prod : dev),
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};

module.exports = nextConfig;
