/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "earlybirds-properties-backend-dix46kl2y.vercel.app",
        port: "",
        pathname: "/**",
      },
    ]
  },
};

export default nextConfig;
