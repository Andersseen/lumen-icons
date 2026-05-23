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

const neutralStartByProperty: Record<string, number> = {
  opacity: 1,
  rotate: 0,
  scale: 1,
  scaleX: 1,
  scaleY: 1,
  x: 0,
  y: 0,
};

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

  it.each(iconSources)('%s uses angular-movement target animations without CSS keyframes', file => {
    const source = readFileSync(join(iconsDir, file), 'utf8');

    expect(source, file).not.toContain('MoveVariantsDirective');
    expect(source, file).not.toContain('moveAnimate');
    expect(source, file).not.toContain('@keyframes');
    expect(source, file).not.toContain('stroke-dasharray');
    expect(source, file).not.toContain('stroke-dashoffset');
  });

  it.each(iconSources)('%s resets immediately when animation is disabled', file => {
    const source = readFileSync(join(iconsDir, file), 'utf8');
    const movementCount = [...source.matchAll(/\[moveFrames\]=/g)].length;
    const immediateResetCount = [...source.matchAll(/moveReverseDuration="0"/g)].length;

    expect(immediateResetCount, `${file} moveReverseDuration count`).toBe(movementCount);
  });

  it.each(iconSources)('%s starts and ends movement frames at the visible rest state', file => {
    const source = readFileSync(join(iconsDir, file), 'utf8');
    const frameMatches = source.matchAll(/(opacity|rotate|scale|scaleX|scaleY|x|y):\s*\[([^\]]+)\]/g);

    for (const match of frameMatches) {
      const [, property, rawValues] = match;
      const expected = neutralStartByProperty[property];
      const values = rawValues.split(',').map(value => Number(value.trim()));
      const first = values.at(0);
      const last = values.at(-1);

      expect(first, `${file} ${property} first frame`).toBe(expected);
      expect(last, `${file} ${property} last frame`).toBe(expected);
    }
  });
});
