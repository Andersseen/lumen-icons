import { expect, test, type Locator, type Page } from "@playwright/test";

/**
 * Semantic motion batch 01 (docs/specs/2026-11-04-semantic-motion-batch-01.md).
 *
 * Every frame is reached by pausing and seeking the Web Animations API — never
 * by wall-clock waits — on the real Angular host rendered by the catalog, so
 * its scoped component styles are attached.
 */
type Probe = {
  /** Selector inside the <svg> (or ":scope" for the svg itself) that must be moving. */
  moving: string;
  /** Computed property that carries the motion. */
  property: "transform" | "stroke-dashoffset" | "clip-path";
  /** Optional part that must stay still at the sampled frame. */
  still?: string;
};
type Case = { name: string; at: number; outline: Probe; filled: Probe };

const CASES: Case[] = [
  { name: "folder-open", at: 0.3, outline: { moving: ".lmn-path-2", property: "transform", still: ".lmn-path-3" }, filled: { moving: ".lmn-path-2", property: "transform", still: ".lmn-path-1" } },
  { name: "folder-plus", at: 0.3, outline: { moving: ".lmn-path-1", property: "transform", still: ".lmn-path-3" }, filled: { moving: ":scope", property: "transform" } },
  { name: "folder-minus", at: 0.45, outline: { moving: ".lmn-path-1", property: "transform", still: ".lmn-path-2" }, filled: { moving: ":scope", property: "transform" } },
  { name: "folder-arrow-down", at: 0.4, outline: { moving: ".lmn-path-3", property: "stroke-dashoffset", still: ".lmn-path-4" }, filled: { moving: ":scope", property: "transform" } },
  { name: "inbox", at: 0.3, outline: { moving: ".lmn-path-1", property: "transform", still: ".lmn-path-2" }, filled: { moving: ":scope", property: "transform" } },
  { name: "inbox-arrow-down", at: 0.4, outline: { moving: ".lmn-path-3", property: "stroke-dashoffset", still: ".lmn-path-1" }, filled: { moving: ".lmn-path-2", property: "transform", still: ".lmn-path-1" } },
  { name: "inbox-stack", at: 0.3, outline: { moving: ".lmn-path-4", property: "transform" }, filled: { moving: ".lmn-path-1", property: "transform" } },
  { name: "clipboard", at: 0.4, outline: { moving: ".lmn-path-1", property: "transform", still: ".lmn-path-3" }, filled: { moving: ":scope", property: "transform" } },
  { name: "clipboard-document", at: 0.3, outline: { moving: ".lmn-path-6", property: "transform", still: ".lmn-path-2" }, filled: { moving: ".lmn-path-2", property: "transform", still: ".lmn-path-1" } },
  { name: "clipboard-document-list", at: 0.4, outline: { moving: ".lmn-path-3", property: "stroke-dashoffset", still: ".lmn-path-8" }, filled: { moving: ".lmn-path-2", property: "transform", still: ".lmn-path-1" } },
  { name: "file", at: 0.3, outline: { moving: ".lmn-path-1", property: "stroke-dashoffset" }, filled: { moving: ":scope", property: "clip-path" } },
  { name: "newspaper", at: 0.4, outline: { moving: ".lmn-path-4", property: "stroke-dashoffset", still: ".lmn-path-7" }, filled: { moving: ":scope", property: "clip-path" } },
];

/** The value an element shows when nothing is animating it. */
const REST: Record<Probe["property"], string[]> = {
  transform: ["none", "matrix(1, 0, 0, 1, 0, 0)"],
  "stroke-dashoffset": ["0px", "0"],
  "clip-path": ["none", "inset(0px)"],
};

async function animatedIcon(page: Page, name: string, variant: "outline" | "filled"): Promise<Locator> {
  await page.getByRole("radio", { name: variant === "filled" ? "Filled" : "Outline" }).click();
  await page.getByRole("textbox", { name: "Search" }).fill(name);
  const card = page.getByRole("button", { name: `Copy import for ${name}`, exact: true });
  // The catalog mounts the animated instance only while its card is hovered. A
  // real pointer hover races the search reflow (the card moves out from under
  // the cursor → mouseleave → the host unmounts), so park the pointer away from
  // the grid and enter the card by event instead.
  await page.mouse.move(0, 0);
  await page.locator("volt-card", { has: card }).dispatchEvent("mouseenter");
  const host = card.locator(`lmn-${name}.lmn-animate`);
  await expect(host).toBeVisible();
  return host;
}

/** Pause every animation in the icon and seek the shared timeline to `fraction`. */
async function seek(host: Locator, fraction: number): Promise<number> {
  await expect.poll(() => host.evaluate((el) => el.getAnimations({ subtree: true }).length)).toBeGreaterThan(0);
  return host.evaluate((el, f) => {
    const animations = el.getAnimations({ subtree: true });
    const end = Math.max(...animations.map((a) => a.effect!.getComputedTiming().endTime as number));
    for (const animation of animations) {
      animation.pause();
      animation.currentTime = end * f;
    }
    return animations.length;
  }, fraction);
}

const read = (host: Locator, selector: string, property: string) =>
  host.locator("svg").evaluate(
    (svg, { selector, property }) => getComputedStyle(selector === ":scope" ? svg : svg.querySelector(selector)!).getPropertyValue(property),
    { selector, property },
  );

/** Rest-relevant computed style of the svg and every shape, keyed by position. */
const snapshot = (host: Locator) =>
  host.locator("svg").evaluate((svg) =>
    [svg, ...svg.querySelectorAll("path, line, circle, rect, polyline, polygon, g")].map((el) => {
      const style = getComputedStyle(el);
      const transform = style.transform === "matrix(1, 0, 0, 1, 0, 0)" ? "none" : style.transform;
      // A zero inset clips nothing, however Chrome serialises it ("inset(0px 0px 0%)").
      const clipPath = /^inset\((0(px|%)?\s*)+\)$/.test(style.clipPath) ? "none" : style.clipPath;
      return [transform, style.opacity, style.strokeDashoffset, style.strokeWidth, clipPath].join(" | ");
    }),
  );

test.describe("semantic motion batch 01", () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto("/icons");
    await page.getByRole("switch", { name: "Animate icons" }).click();
  });

  for (const { name, at, outline, filled } of CASES) {
    test(`${name} moves its meaningful part and ends at rest`, async ({ page }) => {
      for (const [variant, probe] of [["outline", outline], ["filled", filled]] as const) {
        const host = await animatedIcon(page, name, variant);
        await expect(host).toHaveAttribute("aria-hidden", "true");

        await seek(host, at);
        const moving = await read(host, probe.moving, probe.property);
        expect(REST[probe.property], `${variant} ${probe.moving} ${probe.property} at ${at}`).not.toContain(moving);
        if (probe.still) {
          expect(REST.transform, `${variant} ${probe.still} stays put`).toContain(await read(host, probe.still, "transform"));
        }

        // The finished pose must equal the un-animated drawing on every element.
        await seek(host, 1);
        const finished = await snapshot(host);
        await host.evaluate((el) => el.getAnimations({ subtree: true }).forEach((a) => a.cancel()));
        expect(finished, `${variant} rest state`).toEqual(await snapshot(host));
        for (const opacity of finished.map((row) => row.split(" | ")[1])) expect(opacity).toBe("1");

      }
    });
  }

  test("reduced motion disables every batch animation", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    for (const { name } of CASES) {
      for (const variant of ["outline", "filled"] as const) {
        const host = await animatedIcon(page, name, variant);
        await expect(host).toBeVisible();
        expect(await host.evaluate((el) => el.getAnimations({ subtree: true }).length), `${name} ${variant}`).toBe(0);
      }
    }
  });
});
