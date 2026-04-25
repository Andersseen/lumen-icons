import { defineConfig } from "vitest/config";
import angular from "@analogjs/vite-plugin-angular";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [angular({ tsconfig: "./tsconfig.json" }), tsconfigPaths()],
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
