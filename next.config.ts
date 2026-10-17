import type { NextConfig } from "next";

const config: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
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
