import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";

import path from "path";
import postcssNested from "postcss-nested";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), svgr()],
  server: {
    open: "/",
    port: 3000,
    host: "0.0.0.0",
    warmup: {
      clientFiles: ["./src/index.css"],
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
});
