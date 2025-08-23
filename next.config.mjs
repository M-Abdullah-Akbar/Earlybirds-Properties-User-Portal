/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "earlybirds-properties-backend.vercel.app",
        port: "",
        pathname: "/**",
      },
    ]
  },
};

export default nextConfig;
