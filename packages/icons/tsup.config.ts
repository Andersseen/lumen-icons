import { defineConfig } from "tsup";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const packageRoot = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  entry: [
    resolve(packageRoot, "src/index.ts"),
    resolve(packageRoot, "src/icons/index.ts"),
    resolve(packageRoot, "src/icons/*.ts"),
    resolve(packageRoot, "src/*.ts"),
    "!**/*.spec.ts",
  ],
  format: ["esm"],
  dts: true,
  outDir: resolve(packageRoot, "dist"),
  clean: true,
  sourcemap: true,
  treeshake: true,
  target: "es2022",
});
