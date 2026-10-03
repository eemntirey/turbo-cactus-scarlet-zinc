import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

const rootDir = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  base: "./",
  resolve: {
    alias: {
      "@": resolve(rootDir, "./src"),
    },
  },
  plugins: [tailwindcss(), react()],
  build: {
    outDir: "dist-tauri",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        index: resolve(rootDir, "index.tauri.html"),
      },
    },
  },
});
