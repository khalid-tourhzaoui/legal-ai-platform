import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  i18n: {
    locales: ['fr', 'ar', 'en'],
    defaultLocale: 'fr',
    localeDetection: false,
  },
  // reactStrictMode: true,
  // swcMinify: true,
};

export default nextConfig;
