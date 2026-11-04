#!/usr/bin/env node
/**
 * Motion filmstrip — internal visual-review tool (not part of the package).
 *
 * Renders each icon's animation frozen at fixed points of its timeline so a
 * reviewer can see, frame by frame, what moves. Against a running demo app:
 *
 *   pnpm run dev                                    # in another terminal
 *   node scripts/motion-filmstrip.mjs folder-open inbox --sizes 24,48
 *
 * Writes one PNG per icon into test-results/filmstrips/ (git-ignored): rows are
 * outline and filled at each size, columns are 0 / 20 / 40 / 60 / 80 / 100 %.
 *
 * Method (see docs/specs/2026-08-19-animation-perceptibility-pass.md):
 * - The animated instance is the real Angular host, rendered by the catalog.
 *   It is *cloned*, never re-created, so the clone keeps the emulated-
 *   encapsulation attributes its scoped component styles are keyed on.
 * - Every animation in a clone is paused and seeked with the Web Animations
 *   API to `fraction × the latest end time in that clone`, so staged parts
 *   (animation-delay) stay in step. No wall-clock sampling.
 */
import { mkdirSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from '@playwright/test';

const root = resolve(fileURLToPath(new URL('..', import.meta.url)));
const args = process.argv.slice(2);
const option = (flag, fallback) => {
  const index = args.indexOf(flag);
  return index === -1 ? fallback : args.splice(index, 2)[1];
};
const baseUrl = option('--url', 'http://localhost:5173');
const sizes = option('--sizes', '24').split(',').map(Number);
const outDir = resolve(root, option('--out', 'test-results/filmstrips'));
// --sheet <file.png>: every icon on one contact sheet (rows labelled by icon).
const sheet = option('--sheet', null);
const names = args;
const fractions = [0, 0.2, 0.4, 0.6, 0.8, 1];

if (names.length === 0) {
  console.error('Usage: node scripts/motion-filmstrip.mjs <icon> [...] [--sizes 24,48] [--url URL] [--sheet name.png]');
  process.exit(1);
}

mkdirSync(outDir, { recursive: true });
const browser = await chromium.launch();
const page = await browser.newPage(sheet
  ? { viewport: { width: 1280, height: 4000 }, deviceScaleFactor: 2 }
  : { viewport: { width: 1280, height: 900 }, deviceScaleFactor: 4 });
// Right after a regeneration the dev server re-transforms every icon.
await page.goto(`${baseUrl}/icons`, { timeout: 180_000 });
await page.getByRole('switch', { name: 'Animate icons' }).click();

/** Hover the catalog card so it renders the animated instance; return its host. */
async function animatedHost(name, variant) {
  await page.getByRole('radio', { name: variant === 'filled' ? 'Filled' : 'Outline' }).click();
  await page.getByRole('textbox', { name: 'Search' }).fill(name);
  const card = page.getByRole('button', { name: `Copy import for ${name}`, exact: true });
  // A real hover races the search reflow (the card slides out from under the
  // cursor and unmounts its animated instance mid-capture). Park the pointer and
  // enter the card by event instead — same fix as tests/e2e/semantic-motion.spec.ts.
  await page.mouse.move(0, 0);
  await page.locator('volt-card', { has: card }).dispatchEvent('mouseenter');
  const host = card.locator(`lmn-${name}.lmn-animate`);
  await host.waitFor();
  return host;
}

for (const name of names) {
  // A fixed white board on top of the page; a sheet keeps one board for all icons.
  await page.evaluate((reset) => {
    if (!reset && document.getElementById('lmn-filmstrip')) return;
    document.getElementById('lmn-filmstrip')?.remove();
    const board = document.createElement('div');
    board.id = 'lmn-filmstrip';
    board.style.cssText = 'position:fixed;inset:0 auto auto 0;z-index:99999;background:#fff;color:#111;padding:12px;display:grid;gap:10px;font:11px system-ui;pointer-events:none';
    document.body.append(board);
  }, !sheet);

  for (const variant of ['outline', 'filled']) {
    const host = await animatedHost(name, variant);
    await host.evaluate((element, { sizes, fractions, variant, title }) => {
      const board = document.getElementById('lmn-filmstrip');
      for (const size of sizes) {
        const row = document.createElement('div');
        row.style.cssText = 'display:flex;align-items:center;gap:14px';
        const label = document.createElement('span');
        label.textContent = `${title}${variant} ${size}px`;
        label.style.cssText = `width:${title ? 190 : 72}px`;
        row.append(label);
        // Attach first: a disconnected clone has no animations to seek, and
        // would start playing live once attached — every frame identical.
        board.append(row);
        for (const fraction of fractions) {
          const cell = document.createElement('div');
          cell.style.cssText = `width:${Math.max(size, 24) + 12}px;height:${Math.max(size, 24) + 12}px;display:grid;place-items:center;outline:1px dashed #ddd`;
          const clone = element.cloneNode(true);
          const svg = clone.querySelector('svg');
          svg.setAttribute('width', String(size));
          svg.setAttribute('height', String(size));
          cell.append(clone);
          row.append(cell);
          const animations = clone.getAnimations({ subtree: true });
          if (animations.length === 0) {
            // A finding, not a harness failure: this variant does not animate.
            label.textContent = `${title}${variant} ${size}px — NO ANIMATION`;
            label.style.color = '#c00';
            continue;
          }
          // An infinite animation (only `loader`) is sampled across one iteration.
          const end = Math.max(...animations.map((a) => {
            const timing = a.effect.getComputedTiming();
            return Number.isFinite(timing.endTime) ? timing.endTime : timing.delay + timing.duration;
          }));
          for (const animation of animations) {
            animation.pause();
            animation.currentTime = end * fraction;
          }
          cell.title = `${Math.round(fraction * 100)}% · ${animations.length} animations`;
        }
      }
    }, { sizes, fractions, variant, title: sheet ? `${name} · ` : '' });
    // Angular removes a component's <style> from <head> when its last instance
    // is destroyed — which the next search does. Keep a copy on the board so the
    // frozen clones keep their scoped animation CSS on a multi-icon sheet.
    await page.evaluate(() => {
      const board = document.getElementById('lmn-filmstrip');
      const kept = new Set([...board.querySelectorAll('style')].map((s) => s.textContent));
      for (const style of document.head.querySelectorAll('style')) {
        if (!kept.has(style.textContent)) board.append(style.cloneNode(true));
      }
    });
  }

  if (sheet) continue;
  const file = join(outDir, `${name}.png`);
  await page.locator('#lmn-filmstrip').screenshot({ path: file });
  console.log(file);
}

if (sheet) {
  const file = resolve(outDir, sheet);
  await page.locator('#lmn-filmstrip').screenshot({ path: file });
  console.log(file);
}

await browser.close();
