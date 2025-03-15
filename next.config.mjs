/** @type {import('next').NextConfig} */

import { join, resolve } from 'path';
import CopyPlugin from 'copy-webpack-plugin';
// const dbConnect = require('./libs/db-connect');

// dbConnect();

const __dirname = resolve();

const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.plugins.push(
      new CopyPlugin({
        patterns: [
          {
            from: join(__dirname, "node_modules/tinymce"),
            to: join(__dirname, "public/assets/libs/tinymce"),
          },
        ],
      })
    );
    return config;
  },
}

export default nextConfig;
