/** @type {import('next').NextConfig} */

const prod = require("./configs/prod.config");
const dev = require("./configs/dev.config");

const nextConfig = {
  i18n: {
    locales: ["en-US", "en", "ko"],
    defaultLocale: "en-US",
  },
  ...(process.env.NODE_ENV === "production" ? prod : dev),
};

module.exports = nextConfig;
