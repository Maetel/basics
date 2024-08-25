/** @type {import('next').NextConfig} */
import i18npkg from "./next-i18next.config.js";
const nextConfig = {
  reactStrictMode: true,
  i18n: i18npkg.i18n,
};

export default nextConfig;
