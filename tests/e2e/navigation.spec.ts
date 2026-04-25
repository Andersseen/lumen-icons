import { expect, test } from "@playwright/test";

test("navigate from home to icons via header", async ({ page }) => {
  await page.goto("/");
  await page.getByLabel("Main navigation").getByRole("link", { name: "Icons" }).click();
  await expect(page).toHaveURL(/\/icons/);
  await expect(page.getByRole("heading", { name: "Icons" })).toBeVisible();
});

test("navigate from home to docs via header", async ({ page }) => {
  await page.goto("/");
  await page.getByLabel("Main navigation").getByRole("link", { name: "Docs" }).click();
  await expect(page).toHaveURL(/\/docs/);
  await expect(page.getByRole("heading", { name: "Documentation" })).toBeVisible();
});

test("navigate from docs to home via logo", async ({ page }) => {
  await page.goto("/docs");
  await page.getByRole("link", { name: /lumen icons home/i }).click();
  await expect(page).toHaveURL("/");
  await expect(page.getByRole("heading", { name: /beautiful icons/i })).toBeVisible();
});
