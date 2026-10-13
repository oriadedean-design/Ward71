import type {NextConfig} from 'next';
import { withBotId } from 'botid/next/config';

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
  // Policy and petition exports (content/) are read from disk by the platform
  // and petition pages, home page, sitemap, llms.txt and petition API.
  outputFileTracingIncludes: {
    '/**': ['./content/**/*'],
  },
  // Easy-to-remember addresses for the content editor (Sanity Studio).
  // Page addresses are case-sensitive but redirect rules aren't, so other
  // spellings of /TTCpetition (e.g. /ttcpetition) are served by a rewrite.
  async rewrites() {
    return [{ source: '/ttcpetition', destination: '/TTCpetition' }];
  },
  async redirects() {
    return [
      { source: '/admin', destination: '/studio', permanent: false },
      { source: '/login', destination: '/studio', permanent: false },
      // Petition addresses people might type or say aloud.
      ...['/petition', '/ttc-petition', '/finchwest', '/finch-west']
        .map((source) => ({ source, destination: '/TTCpetition', permanent: false })),
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

// BotID (invisible bot check) needs its script and proxy routes added.
export default withBotId(nextConfig);
