import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
  webpack: (config, { dev }) => {
    // Dev-mode filesystem cache writes have been corrupting under Windows
    // (ENOENT on the pack-file rename, likely AV scanning mid-write),
    // eventually breaking module resolution with 500s. Disabling the
    // persistent cache in dev trades a bit of rebuild speed for reliability.
    if (dev) {
      config.cache = false;
    }
    return config;
  },
};

export default nextConfig;
