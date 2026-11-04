import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
// @ts-expect-error — plain .mjs tooling module without type declarations.
import { splitSubpaths } from './animations.mjs';

/**
 * Custom icons (no Heroicons source) used to rely on a CSS fallback for their
 * filled variant — `fill: currentColor; stroke: none` — which erases open strokes
 * and fills inner details into a blob (x and menu vanished, info became a disc).
 * Each custom icon must now either ship real filled geometry from
 * packages/icons/svg/custom-filled/, or be listed below after its fallback was
 * visually verified (docs/specs/2026-11-04-semantic-motion-batch-03.md).
 */
const FALLBACK_VERIFIED = [
  'avatar', 'badge', 'copy', 'database', 'file', 'filter', 'github',
  'grid', 'lock', 'message-circle', 'send', 'shield', 'zap',
];

const root = join(__dirname, '..');
const iconsDir = join(root, 'packages/icons/src/icons');
const customFilledDir = join(root, 'packages/icons/svg/custom-filled');
const customIcons = readdirSync(iconsDir)
  .filter((f) => f.endsWith('.ts') && !f.endsWith('.spec.ts') && f !== 'index.ts')
  .map((f) => f.replace(/\.ts$/, ''))
  .filter((name) => !existsSync(join(root, 'packages/icons/svg/outline', `${name}.svg`)));

/**
 * Geometry only: element names + their coordinate attributes, in order. Both
 * sides are split into subpaths first (idempotent), because a recipe may split
 * disjoint filled subpaths into separate elements without changing the shape.
 */
const geometry = (svg: string) =>
  [...(splitSubpaths(svg) as string).matchAll(/<(path|circle|rect|line|polyline|polygon|ellipse)\b([^>]*)>/g)].map(([, tag, attrs]) => {
    const keep = [...attrs.matchAll(/\b(d|cx|cy|r|x|y|x1|x2|y1|y2|width|height|rx|points|fill-rule)="([^"]*)"/g)];
    return `${tag} ${keep.map(([, k, v]) => `${k}=${v}`).join(' ')}`;
  });

describe('custom icons in the filled variant', () => {
  it('finds the custom icons', () => {
    expect(customIcons.length).toBeGreaterThanOrEqual(38);
  });

  it.each(customIcons)('%s has real filled geometry or a verified fallback', (name) => {
    const source = readFileSync(join(iconsDir, `${name}.ts`), 'utf8');
    const filledSource = join(customFilledDir, `${name}.svg`);

    if (existsSync(filledSource)) {
      expect(source).toContain("@if (variant() === 'filled')");
      expect(source).not.toContain(':host(.lmn-filled) svg path');
      const filledBranch = source.match(/<svg[\s\S]*?<\/svg>/)![0];
      expect(geometry(filledBranch)).toEqual(geometry(readFileSync(filledSource, 'utf8')));
    } else {
      expect(FALLBACK_VERIFIED, `${name} has no filled source — author one or verify its fallback`).toContain(name);
      expect(source).toContain(':host(.lmn-filled) svg path');
    }
  });

  it('keeps the fallback list honest (no entry that now has a filled source)', () => {
    for (const name of FALLBACK_VERIFIED) {
      expect(existsSync(join(customFilledDir, `${name}.svg`)), name).toBe(false);
      expect(customIcons, name).toContain(name);
    }
  });
});
