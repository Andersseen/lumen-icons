import { expect, test } from "@playwright/test";

test("copy terminal snippet in docs", async ({ page }) => {
  await page.goto("/docs");

  const installationHeading = page.getByRole("heading", { name: "Installation" });
  await expect(installationHeading).toBeVisible();

  const copyButton = page
    .getByRole("button", { name: /^copy terminal$/i })
    .first();
  await expect(copyButton).toBeVisible();
  await copyButton.click();

  await expect(
    page.getByRole("button", { name: /^copied!$/i }).first(),
  ).toBeVisible();
});

test("table of contents links point to sections", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 720 });
  await page.goto("/docs");

  const referenceLink = page.getByRole("link", { name: "Reference" });
  await expect(referenceLink).toBeVisible();
  await expect(referenceLink).toHaveAttribute("href", "#reference");
});

test("the icon table is only built when its tab is opened", async ({ page }) => {
  await page.goto("/docs");

  // The 362-row table used to be appended to every visit.
  await expect(page.getByRole("button", { name: /copy import for heart/i })).toHaveCount(0);

  await page.getByRole("tab", { name: "Available icons" }).click();

  const copyButton = page.getByRole("button", { name: /copy import for heart/i });
  await expect(copyButton).toBeVisible();
  await copyButton.click();

  await expect(copyButton.getByText("✓")).toBeVisible();
});
