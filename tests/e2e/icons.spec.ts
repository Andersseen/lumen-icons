import { expect, test, type Locator } from "@playwright/test";

/**
 * Seek a running CSS animation to a fraction of its own duration and read the
 * property it drives. Sampling by wall clock (`waitForTimeout(250)`) is a lie on
 * a loaded CI runner: the drift lands the read on a neighbouring keyframe — a
 * 250 ms sample of bold's 520 ms curve returned 1.85 px off the 80 % keyframe
 * instead of the 44 % peak. Seeking asserts what the keyframes declare, not how
 * fast the machine happened to be.
 */
async function styleAtProgress(locator: Locator, progress: number, property: string): Promise<string> {
  await expect
    .poll(() => locator.evaluate((element) => element.getAnimations().length))
    .toBeGreaterThan(0);

  return locator.evaluate(
    (element, { ratio, name }) => {
      const animation = element.getAnimations()[0]!;
      const duration = animation.effect!.getComputedTiming().duration as number;
      animation.pause();
      animation.currentTime = duration * ratio;
      return getComputedStyle(element).getPropertyValue(name);
    },
    { ratio: progress, name: property },
  );
}

/** Let every animation under `locator` run to its end state — no fixed wait. */
async function settle(locator: Locator): Promise<void> {
  await locator.evaluate((element) =>
    Promise.all(
      element
        .getAnimations({ subtree: true })
        .filter((animation) => animation.effect!.getComputedTiming().iterations !== Infinity)
        .map((animation) => {
          animation.finish();
          return animation.finished;
        }),
    ).then(() => undefined),
  );
}

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

  await page.getByRole("button", { name: "Copy options for check", exact: true }).click();
  await page.getByText("HTML selector").click();

  await expect(page.getByText("Copied HTML selector for check")).toBeVisible();
});

test("clicking icon card copies import", async ({ page }) => {
  await page.goto("/icons");

  const card = page.getByRole("button", {
    name: "Copy import for check",
    exact: true,
  });
  await card.click();

  await expect(page.getByText("Copied import statement for check")).toBeVisible();
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

  // The grid is chunked with @defer, so reach `check` through search rather
  // than by scrolling several chunks into view.
  await page.getByRole("button", { name: /filters/i }).click();
  await page.getByRole("textbox", { name: "Search icons" }).fill("check");
  await page.getByText("Done").click();

  await expect(page.getByRole("button", { name: "Copy import for check", exact: true })).toBeVisible();
  await expect(page.getByRole("button", { name: "Copy options for check", exact: true })).toBeVisible();

  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(320);

  await page.setViewportSize({ width: 375, height: 720 });
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(375);
});

test("mobile reaches the controls through a drawer, not a wall of them", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/icons");

  // Controls are behind the drawer, so the grid starts near the top.
  const firstCard = page.getByRole("button", { name: "Copy import for academic-cap", exact: true });
  expect((await firstCard.boundingBox())!.y).toBeLessThan(450);

  await page.getByRole("button", { name: /filters/i }).click();
  await page.getByRole("radio", { name: "Media" }).click();
  await page.getByText("Done").click();

  await expect(page.getByText(/of 362 icons/i)).toBeVisible();
  await expect(page.getByRole("button", { name: "Copy import for academic-cap", exact: true })).toHaveCount(0);
});

test("the document exposes exactly one main landmark", async ({ page }) => {
  for (const path of ["/", "/icons", "/docs"]) {
    await page.goto(path);
    await expect(page.getByRole("main")).toHaveCount(1);
  }
});

test("the hero badge is legible against the dark hero", async ({ page }) => {
  await page.goto("/");

  const badge = page.getByText("Angular 21+", { exact: false }).first();
  await expect(badge).toBeVisible();

  // It used to inherit the light theme's near-black foreground, which left the
  // text invisible on the dark hero. Resolve both colours through a canvas so
  // the check does not depend on the browser's colour serialisation.
  const contrast = await badge.evaluate((element) => {
    const toRgb = (color: string) => {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d")!;
      context.fillStyle = color;
      context.fillRect(0, 0, 1, 1);
      const [r, g, b] = context.getImageData(0, 0, 1, 1).data;
      return [r, g, b] as const;
    };
    const luminance = (color: string) => {
      const [r, g, b] = toRgb(color).map((channel) => {
        const c = channel / 255;
        return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
      });
      return 0.2126 * r + 0.7152 * g + 0.0722 * b;
    };

    const section = element.closest("section")!;
    const a = luminance(getComputedStyle(element).color);
    const b = luminance(getComputedStyle(section).backgroundColor);
    return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
  });

  expect(contrast).toBeGreaterThan(4.5);
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

  const controls = page.getByLabel("Icon controls");
  const before = (await controls.boundingBox())!.y;

  // Wait for enough of the grid to exist that the page can actually scroll.
  await expect
    .poll(() => page.evaluate(() => document.body.scrollHeight))
    .toBeGreaterThan(2000);

  // `html { scroll-behavior: smooth }` animates programmatic scrolls too, so
  // wait for the position to settle before measuring.
  await page.evaluate(() => window.scrollTo(0, 720));
  await expect.poll(() => page.evaluate(() => Math.round(window.scrollY))).toBe(720);
  await expect(controls).toBeVisible();

  const after = (await controls.boundingBox())!.y;
  expect(after).toBeLessThan(before);
  expect(after).toBeLessThanOrEqual(80);
  await expect(page.getByRole("textbox", { name: "Search icons" })).toBeVisible();
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
  await page.getByRole("switch", { name: "Animate icons" }).click();

  const boldCard = page.getByRole("button", { name: "Copy import for bold", exact: true }).locator("..");
  await boldCard.hover();
  const boldPath = boldCard.locator("lmn-bold svg path");
  await expect(boldPath).toBeVisible();
  // 44 % is bold's peak keyframe; 100 % must return the stroke to its resting 2 px.
  expect(Number.parseFloat(await styleAtProgress(boldPath, 0.44, "stroke-width"))).toBeGreaterThan(2);
  expect(Number.parseFloat(await styleAtProgress(boldPath, 1, "stroke-width"))).toBe(2);

  const search = page.getByRole("textbox", { name: "Search" });
  await search.fill("rocket-launch");
  const rocketCard = page.getByRole("button", { name: "Copy import for rocket-launch", exact: true }).locator("..");
  await rocketCard.hover();
  const rocket = rocketCard.locator("lmn-rocket-launch svg");
  await expect(rocket).toBeVisible();
  await settle(rocket);
  await expect(rocket).toHaveCSS("opacity", "1");
  expect(await rocket.evaluate((svg) => getComputedStyle(svg).transform)).toMatch(/^(none|matrix\(1, 0, 0, 1, 0, 0\))$/);
});
