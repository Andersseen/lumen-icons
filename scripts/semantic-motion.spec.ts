import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
// @ts-expect-error — plain .mjs tooling module without type declarations.
import { buildAnimation, resolveAnimation } from './animations.mjs';

/**
 * Static guarantees for every icon recorded in docs/ai/motion-reviews.json,
 * checked against the *generated* components. A new semantic batch is covered
 * as soon as its icons are recorded there. Browser behaviour (intermediate
 * frames, rest state, reduced motion) is covered by tests/e2e/semantic-motion.spec.ts.
 */
const root = join(__dirname, '..');
const reviews = JSON.parse(readFileSync(join(root, 'docs/ai/motion-reviews.json'), 'utf8')).reviews as Record<string, { recipe: string }>;
const REVIEWED: Record<string, string> = Object.fromEntries(Object.entries(reviews).map(([name, review]) => [name, review.recipe]));

function generated(name: string) {
  const source = readFileSync(join(root, 'packages/icons/src/icons', `${name}.ts`), 'utf8');
  const css = source.slice(source.indexOf('styles: [`'), source.indexOf('`],'));
  const svgs = source.match(/<svg[\s\S]*?<\/svg>/g) ?? [];
  // Two branches: `@if (filled) { filled } @else { outline }`. One: outline only.
  const [filled, outline] = svgs.length === 2 ? svgs : [null, svgs[0]];
  return { css, outline: outline!, filled };
}

/** Part classes (`lmn-path-N`, `lmn-body`, `lmn-slash`) targeted by rules, split by variant scope. */
function targetedParts(css: string) {
  const parts = { outline: new Set<string>(), filled: new Set<string>() };
  for (const [, scope, part] of css.matchAll(/:host\(\.lmn-animate(:not\(\.lmn-filled\)|\.lmn-filled)?\)\s+svg\s+\.(lmn-path-\d+|lmn-body|lmn-slash)/g)) {
    if (scope !== '.lmn-filled') parts.outline.add(part);
    if (scope !== ':not(.lmn-filled)') parts.filled.add(part);
  }
  return parts;
}

/** Keyframe names applied directly to the <svg> (i.e. to the whole glyph). */
function wholeGlyphKeyframes(css: string) {
  const names = new Set<string>();
  for (const [, body] of css.matchAll(/:host\([^)]*(?:\([^)]*\))?[^)]*\)\s+svg\s*\{([^}]*)\}/g)) {
    for (const [name] of body.matchAll(/lmn-[\w-]+/g)) names.add(name);
  }
  return names;
}

const classesIn = (svg: string) => new Set([...svg.matchAll(/\b(lmn-path-\d+|lmn-body|lmn-slash)\b/g)].map((m) => m[1]));

describe.each(Object.entries(REVIEWED))('semantic motion: %s', (name, recipe) => {
  const { css, outline, filled } = generated(name);

  it(`maps to the ${recipe} recipe`, () => {
    expect(resolveAnimation(name).recipe).toBe(recipe);
  });

  it('animates parts that exist in the markup of the variant it targets', () => {
    const targeted = targetedParts(css);
    // Whole-glyph recipes animate the <svg> itself and target no part.
    expect(targeted.outline.size + targeted.filled.size + wholeGlyphKeyframes(css).size).toBeGreaterThan(0);
    for (const part of targeted.outline) expect(classesIn(outline), `outline .${part}`).toContain(part);
    if (filled) {
      // Filled-scoped rules must hit filled markup; outline-only parts may be absent.
      for (const [, part] of css.matchAll(/:host\(\.lmn-animate\.lmn-filled\)\s+svg\s+\.(lmn-path-\d+|lmn-body|lmn-slash)/g)) {
        expect(classesIn(filled), `filled .${part}`).toContain(part);
      }
    }
  });

  it('animates the filled variant too', () => {
    // A filled-scoped rule, or an unscoped rule (svg or part) that also applies to filled.
    expect(css).toMatch(/:host\(\.lmn-animate\.lmn-filled\)\s+svg[\s{,.]|:host\(\.lmn-animate\)\s+svg\s*(\.lmn-[\w-]+\s*)?\{[^}]*animation:/);
  });

  it('runs once and every keyframe set defines its 0% and 100% blocks', () => {
    expect(css).not.toMatch(/infinite/);
    const blocks = [...css.matchAll(/@keyframes ([\w-]+) \{([\s\S]*?)\n\s*\}\s*(?=@keyframes|:host|$)/g)];
    expect(blocks.length).toBeGreaterThan(0);
    for (const [, id, body] of blocks) {
      expect(body, id).toMatch(/(^|\s|,)0%[\s,]/);
      expect(body, id).toMatch(/100%\s*\{/);
    }
  });

  it('never fades the whole glyph to fully invisible', () => {
    // Action parts may start hidden (an undrawn bar); the glyph itself never vanishes.
    for (const name of wholeGlyphKeyframes(css)) {
      const block = css.match(new RegExp(`@keyframes ${name} \\{([\\s\\S]*?)\\n\\s*\\}\\s*(?=@keyframes|:host|$)`))?.[1] ?? '';
      expect(block, name).not.toMatch(/opacity:\s*0(;|\s*\})/);
    }
  });

  it('is disabled under prefers-reduced-motion', () => {
    expect(css).toMatch(/@media \(prefers-reduced-motion: reduce\)[\s\S]*:host\(\.lmn-animate\) svg,[\s\S]*animation: none !important/);
    if (/<polyline/.test(outline)) {
      expect(css).toMatch(/prefers-reduced-motion: reduce\)[\s\S]*:host\(\.lmn-animate\) polyline,[\s\S]*animation: none !important/);
    }
  });

  it('keeps filled compound paths (and their evenodd holes) intact', () => {
    const solid = join(root, 'packages/icons/svg/solid', `${name}.svg`);
    if (!existsSync(solid) || !filled) return; // custom icon: CSS filled fallback only
    const source = readFileSync(solid, 'utf8');
    const count = (svg: string, pattern: RegExp) => (svg.match(pattern) ?? []).length;
    const splitsFilled = buildAnimation(name).splitPaths === 'both';
    if (!splitsFilled) expect(count(filled, /<path\b/g)).toBe(count(source, /<path\b/g));
    expect(count(filled, /fill-rule="evenodd"/g)).toBe(count(source, /fill-rule="evenodd"/g));
  });
});
