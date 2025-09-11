/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.earlybirdsproperties.com",
        port: "",
        pathname: "/**",
      },
    ]
  },
};

export default nextConfig;
