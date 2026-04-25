import { expect, test } from "@playwright/test";

test("copy terminal snippet in docs", async ({ page }) => {
  await page.goto("/docs");

  const copyButton = page.getByRole("button", { name: /^copy$/i }).first();
  await copyButton.click();

  await expect(page.getByRole("button", { name: /^copied!$/i }).first()).toBeVisible();
});

test("table of contents links point to sections", async ({ page }) => {
  await page.goto("/docs");

  const apiLink = page.getByRole("link", { name: "API Reference" });
  await expect(apiLink).toBeVisible();
  await expect(apiLink).toHaveAttribute("href", "#api");
});

test("icon table copy import", async ({ page }) => {
  await page.goto("/docs");

  const copyButton = page.getByRole("button", { name: /copy import for heart/i });
  await copyButton.click();

  await expect(page.getByText("✓").first()).toBeVisible();
});
