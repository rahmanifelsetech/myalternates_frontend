import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

// https://vite.dev/config/
export default defineConfig({
  preview: {
    host: true,
    port: 4173,
  },
  plugins: [
    react(),
    svgr({
      svgrOptions: {
        icon: true,
        // This will transform your SVG to a React component
        exportType: "named",
        namedExport: "ReactComponent",
      },
    }),
  ],
  resolve: {
    alias: {
      "@": "/src",
      "@app": "/src/app",
      "@modules": "/src/modules",
      "@shared": "/src/shared",
      "@assets": "/src/assets",
    },
  },
});
