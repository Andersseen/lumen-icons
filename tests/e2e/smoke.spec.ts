import { expect, test } from "@playwright/test";

test("home page loads with correct title", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/Lumen Icons/i);
  await expect(page.getByRole("heading", { name: /beautiful icons/i })).toBeVisible();
});

test("icons page loads", async ({ page }) => {
  await page.goto("/icons");
  await expect(page.getByRole("heading", { name: "Icons" })).toBeVisible();
});

test("docs page loads", async ({ page }) => {
  await page.goto("/docs");
  await expect(page.getByRole("heading", { name: "Documentation" })).toBeVisible();
});
