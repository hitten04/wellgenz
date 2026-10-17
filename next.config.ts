import type { NextConfig } from "next";

const isExport = process.env.NEXT_EXPORT === "true" || process.env.CF_PAGES === "1";

const config: NextConfig = {
  ...(isExport
    ? {
        output: "export",
        images: { unoptimized: true },
      }
    : {
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
          ];
        },
      }),
  poweredByHeader: false,
  allowedDevOrigins: [
    "*.ngrok-free.app",
    "*.ngrok.app",
    "*.ngrok.io",
    "192.168.1.5",
    "a1f5-103-81-94-178.ngrok-free.app",
    "84d2-103-81-94-178.ngrok-free.app",
    "localhost",
    "127.0.0.1",
  ],
};

export default config;
