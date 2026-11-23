#!/usr/bin/env node
/**
 * Contrast table for `tone` × `background` against the demo site's theme.
 *
 * Reads the light (`:root`) and dark (`.dark`) tokens from `src/styles.css`,
 * resolves them the way `LmnIconBase` does (same token per tone, `soft` =
 * 18 % of the tone over the page background), and prints a Markdown table of
 * WCAG 2 contrast ratios. Icons are graphics, so the bar is 3:1
 * (WCAG 1.4.11 non-text contrast); 4.5:1 is shown for icons that stand in
 * for text.
 *
 *   pnpm run docs:tone-contrast
 *
 * Your own tokens give different numbers — point `--css` at your stylesheet.
 */
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const cssArg = process.argv.indexOf('--css');
const cssPath = cssArg > -1 ? resolve(process.argv[cssArg + 1]) : resolve(root, 'src/styles.css');
const css = readFileSync(cssPath, 'utf8');

function tokens(selector) {
  const start = css.indexOf(`${selector} {`);
  if (start < 0) throw new Error(`No "${selector} {" block in ${cssPath}`);
  const body = css.slice(start, css.indexOf('}', start));
  const out = {};
  for (const [, name, value] of body.matchAll(/--([\w-]+):\s*([^;]+);/g)) out[name] = value.trim();
  return out;
}

function oklchToSrgb(value) {
  const m = /oklch\(\s*([\d.]+)(%?)\s+([\d.]+)\s+([\d.]+)/.exec(value);
  if (!m) throw new Error(`Only oklch() tokens are supported, got "${value}"`);
  const L = Number(m[1]) / (m[2] ? 100 : 1);
  const C = Number(m[3]);
  const h = (Number(m[4]) * Math.PI) / 180;
  const a = C * Math.cos(h);
  const b = C * Math.sin(h);
  const l_ = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3;
  const m_ = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3;
  const s_ = (L - 0.0894841775 * a - 1.291485548 * b) ** 3;
  const lin = [
    4.0767416621 * l_ - 3.3077115913 * m_ + 0.2309699292 * s_,
    -1.2684380046 * l_ + 2.6097574011 * m_ - 0.3413193965 * s_,
    -0.0041960863 * l_ - 0.7034186147 * m_ + 1.707614701 * s_,
  ];
  // Gamut-clip, then gamma-encode to sRGB.
  return lin.map((c) => {
    const x = Math.min(1, Math.max(0, c));
    return x <= 0.0031308 ? 12.92 * x : 1.055 * x ** (1 / 2.4) - 0.055;
  });
}

const luminance = (rgb) =>
  rgb
    .map((c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4))
    .reduce((sum, c, i) => sum + c * [0.2126, 0.7152, 0.0722][i], 0);

function ratio(fg, bg) {
  const [hi, lo] = [luminance(fg), luminance(bg)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

const over = (fg, bg, alpha) => fg.map((c, i) => alpha * c + (1 - alpha) * bg[i]);

// Mirrors TONE_COLORS / TONE_FOREGROUNDS / TONE_BACKGROUNDS in lib/icon-base.ts.
const TONES = {
  foreground: { color: 'foreground', onSolid: 'background', surface: 'foreground' },
  muted: { color: 'muted-foreground', onSolid: 'muted-foreground', surface: 'muted' },
  primary: { color: 'primary', onSolid: 'primary-foreground', surface: 'primary' },
  secondary: { color: 'secondary-foreground', onSolid: 'secondary-foreground', surface: 'secondary' },
  accent: { color: 'accent', onSolid: 'accent-foreground', surface: 'accent' },
  success: { color: 'success', onSolid: 'success-foreground', surface: 'success' },
  info: { color: 'info', onSolid: 'info-foreground', surface: 'info' },
  warning: { color: 'warning', onSolid: 'warning-foreground', surface: 'warning' },
  destructive: { color: 'destructive', onSolid: 'destructive-foreground', surface: 'destructive' },
};

// Rounded down so a 2.99 never displays as a passing 3.0.
function mark(r) {
  const label = (Math.floor(r * 10) / 10).toFixed(1);
  if (r >= 4.5) return `${label} ✅`;
  if (r >= 3) return `${label} ⚠️`;
  return `${label} ❌`;
}

function rows(t) {
  const c = (name) => oklchToSrgb(t[name]);
  const page = c('background');
  return Object.entries(TONES).map(([tone, map]) => {
    const none = ratio(c(map.color), page);
    const soft = ratio(c(map.color), over(c(map.surface), page, 0.18));
    const solid = ratio(c(map.onSolid), c(map.surface));
    return { tone, none, soft, solid };
  });
}

const light = rows(tokens(':root'));
const dark = rows(tokens('.dark'));

console.log('| `tone` / `backgroundTone` | none · light | none · dark | soft · light | soft · dark | solid · light | solid · dark |');
console.log('|---|---|---|---|---|---|---|');
light.forEach((l, i) => {
  const d = dark[i];
  console.log(
    `| \`${l.tone}\` | ${mark(l.none)} | ${mark(d.none)} | ${mark(l.soft)} | ${mark(d.soft)} | ${mark(l.solid)} | ${mark(d.solid)} |`,
  );
});
