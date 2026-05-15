import { expect, test } from "@playwright/test";

test("toggle theme switches dark class on html", async ({ page }) => {
  await page.context().addInitScript(() => {
    localStorage.setItem("lumen-theme", "light");
  });
  await page.goto("/");

  const html = page.locator("html");
  await expect(html).not.toHaveClass(/dark/);

  await page.getByRole("button", { name: /switch to dark mode/i }).click();
  await expect(html).toHaveClass(/dark/);

  await page.getByRole("button", { name: /switch to light mode/i }).click();
  await expect(html).not.toHaveClass(/dark/);
});

test("theme preference persists across navigation", async ({ page }) => {
  await page.context().addInitScript(() => {
    localStorage.setItem("lumen-theme", "light");
  });
  await page.goto("/");
  await page.getByRole("button", { name: /switch to dark mode/i }).click();

  // Use SPA navigation via header link to avoid full reload
  await page.getByLabel("Main navigation").getByRole("link", { name: "Icons" }).click();
  await expect(page).toHaveURL(/\/icons/);
  await expect(page.locator("html")).toHaveClass(/dark/);
});
