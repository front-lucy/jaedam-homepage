/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    emotion: true,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  images: {
    domains: [
      "shortz-prod-s3-content.s3.ap-northeast-2.amazonaws.com",
      "s3.ap-northeast-2.amazonaws.com"
    ],
  },
};

export default nextConfig;
