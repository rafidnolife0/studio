import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'phpstack-924353-3259330.cloudwaysapps.com',
        port: '', // Optional: specify if not standard port 80/443
        pathname: '/public/uploads/all/**', // Optional: specify path pattern
      },
    ],
  },
};

export default nextConfig;
