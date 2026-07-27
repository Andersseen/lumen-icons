import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  reporter: "html",
  use: {
    baseURL: "http://127.0.0.1:4173",
    trace: "on-first-retry",
  },
  webServer: {
    // CI builds the site once in a dedicated job and hands the deployable
    // artifact (dist/analog/public) over, so E2E_SKIP_BUILD serves that exact
    // directory — the same bytes Cloudflare receives — instead of rebuilding.
    command: process.env["E2E_SKIP_BUILD"]
      ? "pnpm preview --outDir dist/analog/public --host 127.0.0.1 --port 4173"
      : "pnpm run build:app && pnpm preview --host 127.0.0.1 --port 4173",
    url: "http://127.0.0.1:4173",
    reuseExistingServer: false,
    timeout: 120_000,
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
