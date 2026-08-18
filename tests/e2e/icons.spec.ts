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

test("desktop controls scroll independently from the icon catalog", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 480 });
  await page.goto("/icons");

  const sidebar = page.getByLabel("Icon controls");
  await expect(sidebar).toBeVisible();
  expect(await sidebar.evaluate((element) => element.scrollHeight > element.clientHeight)).toBe(true);

  await sidebar.evaluate((element) => { element.scrollTop = element.scrollHeight; });
  expect(await sidebar.evaluate((element) => element.scrollTop > 0)).toBe(true);
  expect(await page.evaluate(() => window.scrollY)).toBe(0);
});

test("bold gains weight and rocket returns to its idle position", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 720 });
  await page.goto("/icons");
  await page.getByRole("switch", { name: "Animation" }).click();

  const boldCard = page.getByRole("button", { name: "Copy import for bold", exact: true }).locator("..");
  await boldCard.hover();
  const boldPath = boldCard.locator("lmn-bold svg path");
  await expect(boldPath).toBeVisible();
  await page.waitForTimeout(250);
  expect(Number.parseFloat(await boldPath.evaluate((path) => getComputedStyle(path).strokeWidth))).toBeGreaterThan(2);
  await page.waitForTimeout(450);
  expect(Number.parseFloat(await boldPath.evaluate((path) => getComputedStyle(path).strokeWidth))).toBe(2);

  const search = page.getByRole("textbox", { name: "Search" });
  await search.fill("rocket-launch");
  const rocketCard = page.getByRole("button", { name: "Copy import for rocket-launch", exact: true }).locator("..");
  await rocketCard.hover();
  const rocket = rocketCard.locator("lmn-rocket-launch svg");
  await expect(rocket).toBeVisible();
  await page.waitForTimeout(850);
  await expect(rocket).toHaveCSS("opacity", "1");
  expect(await rocket.evaluate((svg) => getComputedStyle(svg).transform)).toMatch(/^(none|matrix\(1, 0, 0, 1, 0, 0\))$/);
});
