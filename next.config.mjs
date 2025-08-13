/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "556778af93ac.ngrok-free.app",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
