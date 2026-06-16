import { expect, test } from "@playwright/test";

test("search filters icons", async ({ page }) => {
  await page.goto("/icons");

  const searchInput = page.getByRole("textbox", { name: "Search" });
  await searchInput.fill("star");

  await expect(page.getByText("star", { exact: true })).toBeVisible();
  await expect(page.getByText("heart", { exact: true })).not.toBeVisible();
});

test("search finds aliases", async ({ page }) => {
  await page.goto("/icons");

  const searchInput = page.getByRole("textbox", { name: "Search" });
  await searchInput.fill("profile");

  await expect(page.getByText("avatar", { exact: true })).toBeVisible();
  await expect(page.getByText("user", { exact: true })).toBeVisible();
});

test("category filter narrows icons", async ({ page }) => {
  await page.goto("/icons");

  await page.getByRole("radio", { name: "Communication" }).click();

  await expect(page.getByText("mail", { exact: true })).toBeVisible();
  await expect(page.getByText("phone", { exact: true })).toBeVisible();
  await expect(page.getByText("calendar", { exact: true })).not.toBeVisible();
});

test("demo controls include theme tone and reset", async ({ page }) => {
  await page.goto("/icons");

  await page.getByRole("radio", { name: "Primary" }).click();
  await page.getByRole("radio", { name: "Communication" }).click();
  await page.getByRole("button", { name: /reset demo/i }).click();

  await expect(page.getByText(/362 of 362 icons/i)).toBeVisible();
  await expect(page.getByRole("radio", { name: "Inherit" })).toHaveAttribute("aria-checked", "true");
});

test("copied snippets include active visual configuration", async ({ page }) => {
  await page.goto("/icons");

  await page.getByRole("radio", { name: "Filled" }).click();
  await page.getByRole("radio", { name: "Solid" }).click();
  await page.getByRole("button", { name: "Copy selector for check", exact: true }).click();

  await expect(page.getByText("Copied", { exact: true })).toBeVisible();
});

test("clicking icon card copies import", async ({ page }) => {
  await page.goto("/icons");

  const card = page.getByRole("button", {
    name: "Copy import for check",
    exact: true,
  });
  await card.click();

  await expect(page.getByText("Copied", { exact: true })).toBeVisible();
});

test("clear search restores all icons", async ({ page }) => {
  await page.goto("/icons");

  const searchInput = page.getByRole("textbox", { name: "Search" });
  await searchInput.fill("xyz");
  await expect(page.getByText(/no icons matching/i)).toBeVisible();

  await page.getByRole("button", { name: /clear filters/i }).click();
  await expect(
    page.getByRole("button", { name: "Copy import for check", exact: true }),
  ).toBeVisible();
});
