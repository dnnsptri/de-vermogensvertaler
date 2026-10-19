import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Alberta renamed the scan's URL to its product name (12 Oct 2026). The old address is on Menno's
  // QR codes, so it forwards permanently; query strings (?utm_source=..., ?test=1) carry over.
  async redirects() {
    return [{ source: "/aow-gat", destination: "/aow-gatscan", permanent: true }];
  },
};

export default nextConfig;
