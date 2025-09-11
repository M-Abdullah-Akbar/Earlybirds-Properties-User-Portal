/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "168.231.121.2",
        port: "",
        pathname: "/**",
      },
    ]
  },
};

export default nextConfig;
