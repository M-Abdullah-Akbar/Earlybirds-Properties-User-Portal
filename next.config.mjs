/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "6ca61903c54c.ngrok-free.app",
        port: "",
        pathname: "/**",
      },
    ]
  },
};

export default nextConfig;
