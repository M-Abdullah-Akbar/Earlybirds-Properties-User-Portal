/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "13.60.13.251",
        port: "",
        pathname: "/**",
      },
    ]
  },
};

export default nextConfig;
