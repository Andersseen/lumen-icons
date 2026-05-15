/// <reference types="vitest" />

import { defineConfig } from "vite";
import analog from "@analogjs/platform";
import tailwindcss from "@tailwindcss/vite";

// https://vitejs.dev/config/
export default defineConfig(() => ({
  build: {
    target: ["es2020"],
  },
  resolve: {
    mainFields: ["module"],
    tsconfigPaths: true,
  },
  server: {
    watch: {
      ignored: [
        "**/coverage/**",
        "**/dist/**",
        "**/playwright-report/**",
        "**/test-results/**",
        "**/.wrangler/**",
      ],
    },
  },
  plugins: [
    analog({
      ssr: false,
      static: true,
      prerender: {
        routes: [],
      },
    }),
    tailwindcss(),
  ],
}));
