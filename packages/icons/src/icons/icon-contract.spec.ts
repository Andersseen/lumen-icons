import { readFileSync, readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import type { Type } from '@angular/core';
import { render } from '@testing-library/angular';
import { describe, expect, it } from 'vitest';

import type { LmnIconInstance } from '../types/icon.types';
import * as icons from './index';

const iconEntries = Object.entries(icons)
  .filter(([name, value]) => name.startsWith('Lmn') && name.endsWith('Icon') && typeof value === 'function')
  .sort(([a], [b]) => a.localeCompare(b)) as Array<[string, Type<LmnIconInstance>]>;

const iconsDir = dirname(fileURLToPath(import.meta.url));
const iconSources = readdirSync(iconsDir)
  .filter(file => file.endsWith('.ts') && !file.endsWith('.spec.ts') && file !== 'index.ts')
  .sort();

describe('icon contract', () => {
  it('exports every icon component from the barrel', () => {
    expect(iconEntries).toHaveLength(iconSources.length);
  });

  it.each(iconEntries)('%s renders visible default svg attributes', async (_name, Icon) => {
    const { fixture } = await render(Icon, {
      componentInputs: { size: 32, strokeWidth: 1.5 },
    });

    const svg = fixture.nativeElement.querySelector('svg');
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute('width', '32');
    expect(svg).toHaveAttribute('height', '32');
    if (svg?.getAttribute('stroke') === 'currentColor') {
      expect(svg).toHaveAttribute('stroke-width', '1.5');
    }
    expect(fixture.nativeElement).toHaveAttribute('aria-hidden', 'true');
  });

  it.each(iconEntries)('%s keeps animation disabled by default', async (_name, Icon) => {
    const { fixture } = await render(Icon);
    const animatedElements = fixture.nativeElement.querySelectorAll('svg, .lmn-animate-el');

    for (const element of Array.from(animatedElements)) {
      expect((element as HTMLElement).style.animation).toBe('');
    }
  });

  it.each(iconSources)('%s does not import angular-movement', file => {
    const source = readFileSync(join(iconsDir, file), 'utf8');
    expect(source, file).not.toContain('angular-movement');
    expect(source, file).not.toContain('MoveTargetDirective');
    expect(source, file).not.toContain('moveFrames');
    expect(source, file).not.toContain('moveReverseDuration');
  });

  it.each(iconSources)('%s defines accessibility host bindings', file => {
    const source = readFileSync(join(iconsDir, file), 'utf8');
    expect(source, file).toContain("'[attr.role]'");
    expect(source, file).toContain("'[attr.aria-label]'");
    expect(source, file).toContain("'[attr.aria-hidden]'");
  });

  it.each(iconSources)('%s respects reduced motion preferences', file => {
    const source = readFileSync(join(iconsDir, file), 'utf8');
    expect(source, file).toContain('@media (prefers-reduced-motion: reduce)');
    expect(source, file).toContain('animation: none !important');
  });

  it.each(iconSources)('%s only uses infinite motion for loading semantics', file => {
    const source = readFileSync(join(iconsDir, file), 'utf8');
    if (!source.includes('infinite')) return;
    expect(file).toBe('loader.ts');
  });

  it.each(iconSources)('%s keyframes start and end at rest state if present', file => {
    const source = readFileSync(join(iconsDir, file), 'utf8');
    if (!source.includes('@keyframes')) return;

    const keyframes = Array.from(source.matchAll(/@keyframes\s+[\w-]+\s*\{/g));
    expect(keyframes.length, `${file}: keyframes must be parseable`).toBeGreaterThan(0);

    for (const keyframe of keyframes) {
      const blockStart = keyframe.index ?? 0;
      const nextKeyframe = source.indexOf('@keyframes', blockStart + 1);
      const block = source.slice(blockStart, nextKeyframe === -1 ? undefined : nextKeyframe);
      expect(block, `${file}: keyframes must define 0%, 100% block`).toMatch(/0%,\s*100%\s*\{/);
    }
  });
});
