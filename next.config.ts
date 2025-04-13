import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  compiler: {
    styledComponents: true,
  },
  output: "export",
  assetPrefix: "https://jongsunP.github.io/memo-app",
};

export default nextConfig;
