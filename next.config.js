/** @type {import('next').NextConfig} */

const prod = require("./configs/prod.config");
const dev = require("./configs/dev.config");
const { i18n } = require("./next-i18next.config");

const nextConfig = {
  i18n,
  ...dev,
};

module.exports = nextConfig;
