import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",        // Generates a static /out folder on `next build`
  trailingSlash: true,     // /about → /about/index.html (better for static hosts)
  images: {
    unoptimized: true,     // Required — image optimization needs a server
  },
};

export default nextConfig;
