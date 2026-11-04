import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
// @ts-expect-error — plain .mjs tooling module without type declarations.
import { buildAnimation, resolveAnimation } from './animations.mjs';

/**
 * Semantic motion batch 01 — static guarantees over the *generated* components.
 * Browser behaviour (intermediate frames, rest state, reduced motion) is
 * covered by tests/e2e/semantic-motion.spec.ts.
 */
const root = join(__dirname, '..');
const BATCH: Record<string, string> = {
  'folder-open': 'folder-open-swing',
  'folder-plus': 'folder-action',
  'folder-minus': 'folder-action',
  'folder-arrow-down': 'arrow-into-receiver',
  inbox: 'tray-receive',
  'inbox-arrow-down': 'arrow-into-receiver',
  'inbox-stack': 'tray-stack',
  clipboard: 'clipboard-secure',
  'clipboard-document': 'clipboard-secure',
  'clipboard-document-list': 'clipboard-secure',
  file: 'page-corner',
  newspaper: 'newspaper-layout',
};

function generated(name: string) {
  const source = readFileSync(join(root, 'packages/icons/src/icons', `${name}.ts`), 'utf8');
  const css = source.slice(source.indexOf('styles: [`'), source.indexOf('`],'));
  const svgs = source.match(/<svg[\s\S]*?<\/svg>/g) ?? [];
  // Two branches: `@if (filled) { filled } @else { outline }`. One: outline only.
  const [filled, outline] = svgs.length === 2 ? svgs : [null, svgs[0]];
  return { css, outline: outline!, filled };
}

/** Classes `lmn-path-N` targeted by animate rules, split by variant scope. */
function targetedParts(css: string) {
  const parts = { outline: new Set<number>(), filled: new Set<number>() };
  for (const [, scope, index] of css.matchAll(/:host\(\.lmn-animate(:not\(\.lmn-filled\)|\.lmn-filled)?\)\s+svg\s+\.lmn-path-(\d+)/g)) {
    if (scope !== '.lmn-filled') parts.outline.add(Number(index));
    if (scope !== ':not(.lmn-filled)') parts.filled.add(Number(index));
  }
  return parts;
}

const classesIn = (svg: string) => new Set([...svg.matchAll(/lmn-path-(\d+)/g)].map((m) => Number(m[1])));

describe.each(Object.entries(BATCH))('semantic motion: %s', (name, recipe) => {
  const { css, outline, filled } = generated(name);

  it(`maps to the ${recipe} recipe`, () => {
    expect(resolveAnimation(name).recipe).toBe(recipe);
  });

  it('only animates parts that exist in the markup of the variant it targets', () => {
    const targeted = targetedParts(css);
    expect(targeted.outline.size + targeted.filled.size).toBeGreaterThan(0);
    for (const index of targeted.outline) expect(classesIn(outline), `outline .lmn-path-${index}`).toContain(index);
    if (filled) {
      // Filled-scoped rules must hit filled markup; outline-only parts are allowed to be absent.
      const filledOnly = css.match(/:host\(\.lmn-animate\.lmn-filled\)\s+svg\s+\.lmn-path-(\d+)/g) ?? [];
      for (const rule of filledOnly) expect(classesIn(filled)).toContain(Number(rule.match(/(\d+)$/)![1]));
    }
  });

  it('animates the filled variant too', () => {
    expect(css).toMatch(/:host\(\.lmn-animate\.lmn-filled\)\s+svg[\s{,.]/);
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

  it('never fades the glyph to fully invisible', () => {
    expect(css).not.toMatch(/opacity:\s*0(;|\s*\})/);
  });

  it('is disabled under prefers-reduced-motion', () => {
    expect(css).toMatch(/@media \(prefers-reduced-motion: reduce\)[\s\S]*:host\(\.lmn-animate\) svg,[\s\S]*animation: none !important/);
    if (/<polyline/.test(outline)) {
      expect(css).toMatch(/prefers-reduced-motion: reduce\)\s*\{\s*:host\(\.lmn-animate\) svg polyline \{ animation: none !important; \}/);
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
