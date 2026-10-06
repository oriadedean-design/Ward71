import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  // Allow access to remote image placeholder.
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        port: '',
        pathname: '/images/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  output: 'standalone',
  // Easy-to-remember addresses for the content editor (Sanity Studio).
  async redirects() {
    return [
      { source: '/admin', destination: '/studio', permanent: false },
      { source: '/login', destination: '/studio', permanent: false },
      // The production deployment's vercel.app address serves the same site;
      // send it to the real domain so search engines see one copy.
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'ward71-d7bo.vercel.app' }],
        destination: 'https://www.lornaantwi.com/:path*',
        permanent: true,
      },
    ];
  },
  webpack: (config, {dev}) => {
    // HMR is disabled in AI Studio via DISABLE_HMR env var.
    // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
    if (dev && process.env.DISABLE_HMR === 'true') {
      config.watchOptions = {
        ignored: /.*/,
      };
    }
    return config;
  },
};

export default nextConfig;
