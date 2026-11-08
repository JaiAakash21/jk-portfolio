import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // `cacheComponents` (and `partialPrefetching`, which requires it) are aimed
  // at apps with per-request data. This site is fully static — every route is
  // prerendered at build time — so they add cache-boundary ceremony and forbid
  // build-time values such as the current year, for no benefit here.

  turbopack: {
    rules: {
      "*.css": { loaders: ["@tailwindcss/turbopack"], as: "*.css" },
    },
  },

  poweredByHeader: false,

  // `next dev` otherwise regenerates an AGENTS.md at the repo root on every
  // start, which shows up as an untracked file after any dev session.
  agentRules: false,

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
      {
        // Immutable: the filename changes whenever the file does.
        source: "/JaiAakash_S_Resume.pdf",
        headers: [{ key: "Cache-Control", value: "public, max-age=3600, must-revalidate" }],
      },
    ];
  },
};

export default nextConfig;
