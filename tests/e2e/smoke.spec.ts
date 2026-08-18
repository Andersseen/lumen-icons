import { expect, test } from "@playwright/test";

test("home page loads with correct title", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/Lumen Icons/i);
  await expect(page.getByRole("heading", { name: /icons with intent/i })).toBeVisible();
  await expect(page.getByRole("button", { name: /explore 362 icons/i })).toBeVisible();
  await expect(page.getByText("npm install lumen-icons", { exact: true }).first()).toBeVisible();
});

test("home page guides developers to browse the library", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: /explore 362 icons/i }).click();
  await expect(page).toHaveURL(/\/icons/);
});

test("icons page loads", async ({ page }) => {
  await page.goto("/icons");
  await expect(page.getByRole("heading", { name: "Icons" })).toBeVisible();
});

test("docs page loads", async ({ page }) => {
  await page.goto("/docs");
  await expect(page.getByRole("heading", { name: "Documentation" })).toBeVisible();
});
