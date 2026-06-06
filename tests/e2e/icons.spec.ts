import { expect, test } from "@playwright/test";

test("search filters icons", async ({ page }) => {
  await page.goto("/icons");

  const searchInput = page.getByRole("textbox", { name: "Search" });
  await searchInput.fill("star");

  await expect(page.getByText("star")).toBeVisible();
  await expect(page.getByText("heart")).not.toBeVisible();
});

test("search finds aliases", async ({ page }) => {
  await page.goto("/icons");

  const searchInput = page.getByRole("textbox", { name: "Search" });
  await searchInput.fill("profile");

  await expect(page.getByText("avatar")).toBeVisible();
  await expect(page.getByText("user")).toBeVisible();
});

test("category filter narrows icons", async ({ page }) => {
  await page.goto("/icons");

  await page.getByRole("radio", { name: "Communication" }).click();

  await expect(page.getByText("mail")).toBeVisible();
  await expect(page.getByText("phone")).toBeVisible();
  await expect(page.getByText("calendar")).not.toBeVisible();
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
