/// <reference types="vitest" />

import { defineConfig } from "vite";
import analog from "@analogjs/platform";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig(() => ({
  build: {
    target: ["es2020"],
  },
  resolve: {
    mainFields: ["module"],
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
    tsconfigPaths(),
  ],
}));
