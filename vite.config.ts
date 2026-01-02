import { defineConfig } from "vite";

export default defineConfig({
  root: "public",
  server: {
    host: "::",
    port: 8080,
  },
  build: {
    outDir: "../dist",
  },
});
