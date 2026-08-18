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

test("catalog fits a narrow viewport without hiding card actions", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 720 });
  await page.goto("/icons");

  await expect(page.getByRole("button", { name: "Copy import for check", exact: true })).toBeVisible();
  await expect(page.getByRole("button", { name: "Copy selector for check", exact: true })).toBeVisible();
  await expect(page.getByRole("button", { name: "Copy Angular example for check", exact: true })).toBeVisible();

  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(320);

  await page.setViewportSize({ width: 375, height: 720 });
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(375);
});

test("catalog keeps its desktop density and sticky controls", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 720 });
  await page.goto("/icons");

  const firstCard = page.getByRole("button", { name: "Copy import for academic-cap", exact: true });
  const fifthCard = page.getByRole("button", { name: "Copy import for archive-box", exact: true });
  const [firstCardBox, fifthCardBox] = await Promise.all([firstCard.boundingBox(), fifthCard.boundingBox()]);

  expect(firstCardBox).not.toBeNull();
  expect(fifthCardBox).not.toBeNull();
  expect(Math.abs(firstCardBox!.y - fifthCardBox!.y)).toBeLessThan(1);

  const search = page.getByRole("textbox", { name: "Search" });
  await page.evaluate(() => window.scrollTo(0, 720));
  await expect(search).toBeVisible();
  expect((await search.boundingBox())!.y).toBeLessThan(120);
});
