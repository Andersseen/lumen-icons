import { defineConfig } from "vitest/config";
import angular from "@analogjs/vite-plugin-angular";

export default defineConfig({
  resolve: {
    tsconfigPaths: true,
  },
  plugins: [angular({ tsconfig: "./tsconfig.json" })],
  test: {
    include: ["src/**/*.spec.ts", "packages/**/*.spec.ts"],
    globals: true,
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    css: true,
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
      reportsDirectory: "./coverage/unit",
    },
  },
});
