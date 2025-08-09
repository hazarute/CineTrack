import path from 'path';
import { fileURLToPath } from 'url';

// ESM'de __dirname yerine kullanılacak
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  webpack: (config, { isServer }) => {
    // Alias'ları ekle
    config.resolve.alias = {
      ...config.resolve.alias,
      '@/auth': path.resolve(__dirname, './auth'),
      '@/lib': path.resolve(__dirname, './lib'),
      '@/types': path.resolve(__dirname, './types'),
      '@': path.resolve(__dirname, './'),
    };
    return config;
  },
}

export default nextConfig
