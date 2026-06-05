import babel from "@rolldown/plugin-babel";
import tailwindcss from "@tailwindcss/vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";

import path from "path";
import postcssNested from "postcss-nested";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), svgr(), babel({ presets: [reactCompilerPreset()] })],
  server: {
    open: "/rooms",
    port: 3001,
    host: "0.0.0.0",
    warmup: {
      clientFiles: ["./src/assets/styles/index.css"],
    },
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
    },
  },
  css: {
    postcss: {
      plugins: [postcssNested],
    },
  },
  resolve: {
    alias: {
      components: path.resolve(__dirname, "./src/components"),
      pages: path.resolve(__dirname, "./src/pages"),
      assets: path.resolve(__dirname, "./src/assets"),
      shared: path.resolve(__dirname, "./src/shared"),
    },
  },
  build: {
    chunkSizeWarningLimit: 700,
  },
});
