import path from 'path';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
  outputFileTracingRoot: path.join(__dirname),
  transpilePackages: ['next-sanity'],
  // The short URL for the MCP guide (src/lib/channels.ts MCP_GUIDE_PATH).
  async redirects() {
    return [{ source: '/mcp', destination: '/integrations/mcp', permanent: true }];
  },
  // Optional: a separate output folder, so a check build never touches a running dev server's .next.
  ...(process.env.NEXT_DIST_DIR ? { distDir: process.env.NEXT_DIST_DIR } : {}),
};

export default nextConfig;
