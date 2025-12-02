/** @type {import('next').NextConfig} */
const nextConfig = {
  // Optimize images
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.earlybirdsproperties.com",
        port: "",
        pathname: "/**",
      },
    ],
    // Allow SVG images (blank.png is actually an SVG file)
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    // Optimize image formats - prioritize AVIF, fallback to WebP
    formats: ['image/avif', 'image/webp'],
    // Device sizes for responsive images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    // Image sizes for different breakpoints
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Minimum quality for optimized images
    minimumCacheTTL: 60,
    // Note: quality is set per-image using the quality prop, not in config
  },

  // Enable experimental features for better performance
  experimental: {
    // Enable optimized CSS loading
    // optimizeCss: true,
    // Enable modern bundling
    // turbo: {
    //   rules: {
    //     '*.svg': {
    //       loaders: ['@svgr/webpack'],
    //       as: '*.js',
    //     },
    //   },
    // },
  },

  // Optimize webpack bundle
  webpack: (config, { dev, isServer }) => {
    // Optimize bundle splitting for better code splitting
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        maxInitialRequests: 25,
        minSize: 20000,
        cacheGroups: {
          // Separate framework code (React, Next.js)
          framework: {
            test: /[\\/]node_modules[\\/](react|react-dom|scheduler|next)[\\/]/,
            name: 'framework',
            chunks: 'all',
            priority: 50,
            enforce: true,
          },
          // Separate Swiper (large library, ~100KB+)
          swiper: {
            name: 'chartjs',
            chunks: 'async',
            priority: 45,
            enforce: true,
          },
          // Separate PhotoSwipe
          photoswipe: {
            test: /[\\/]node_modules[\\/]photoswipe[\\/]/,
            name: 'photoswipe',
            chunks: 'async',
            priority: 45,
            enforce: true,
          },
          // Separate Bootstrap JS
          bootstrap: {
            test: /[\\/]node_modules[\\/]bootstrap[\\/]/,
            name: 'bootstrap',
            chunks: 'async',
            priority: 45,
            enforce: true,
          },
          // Separate TipTap (if used)
          tiptap: {
            test: /[\\/]node_modules[\\/]@tiptap[\\/]/,
            name: 'tiptap',
            chunks: 'async',
            priority: 40,
            enforce: true,
          },
          // Other large libraries
          lib: {
            test: /[\\/]node_modules[\\/]/,
            name(module) {
              const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)?.[1];
              // Skip already separated packages
              if (['swiper', 'chart.js', 'photoswipe', 'bootstrap', 'react', 'react-dom', 'next'].some(pkg => packageName?.includes(pkg))) {
                return false;
              }
              return packageName ? `lib-${packageName.replace('@', '')}` : 'lib';
            },
            chunks: 'async',
            priority: 30,
            minChunks: 1,
            reuseExistingChunk: true,
          },
          // Common chunks
          commons: {
            name: 'commons',
            minChunks: 2,
            chunks: 'all',
            priority: 20,
            reuseExistingChunk: true,
          },
          // Default vendor chunk
          default: {
            minChunks: 2,
            priority: 10,
            reuseExistingChunk: true,
          },
        },
      };

      // Enable tree shaking
      config.optimization.usedExports = true;
      config.optimization.sideEffects = false;
    }

    return config;
  },

  // Enable compression
  compress: true,

  // Power optimizations
  poweredByHeader: false,

  // Optimize production builds
  productionBrowserSourceMaps: false,

  // Note: output: 'standalone' is removed - use 'next start' instead of standalone server

  // Enable static optimization
  trailingSlash: false,

  // Optimize headers for caching and performance
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, stale-while-revalidate=86400',
          },
        ],
      },
      {
        source: '/images/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/css/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/icons/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/image(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/api/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=300, stale-while-revalidate=600',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
