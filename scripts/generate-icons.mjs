import { readdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { applyPathClasses, applyPathLength, buildAnimation, composeStyles } from './animations.mjs';
import {
  iconsDir,
  inferAliases,
  inferCategory,
  readIconMetadata,
  updateBarrel,
  updateCatalog,
  writeIconMetadata,
} from './icon-catalog-writer.mjs';

const root = resolve(fileURLToPath(new URL('..', import.meta.url)));
const outlineDir = join(root, 'node_modules/heroicons/24/outline');
const solidDir = join(root, 'node_modules/heroicons/24/solid');

const overwrite = process.argv.includes('--overwrite');

const toPascalCase = (str) =>
  str
    .split('-')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');

const toClassName = (name) => `Lmn${toPascalCase(name)}Icon`;

function cleanSvg(svg, name) {
  const openMatch = svg.match(/<svg\b([^>]*)>/);
  const closeMatch = svg.match(/<\/svg\s*>/);
  if (!openMatch || !closeMatch) {
    throw new Error(`Invalid SVG for ${name}`);
  }

  let inner = svg.slice(openMatch.index + openMatch[0].length, closeMatch.index);

  inner = inner
    .replace(/\s+stroke-linecap="round"/g, '')
    .replace(/\s+stroke-linejoin="round"/g, '')
    .replace(/\s+stroke-width="[^"]*"/g, '');

  inner = inner.replace(/^\s+|[\r\n]+/g, '').replace(/>\s+</g, '><');

  return inner;
}

function generateOutlineSvg(name, innerSvg) {
  return `<svg
      [attr.width]="size()"
      [attr.height]="size()"
      [attr.stroke-width]="strokeWidth()"
      [class.lmn-animate]="animate()"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      ${innerSvg}
    </svg>`;
}

function generateFilledSvg(name, innerSvg) {
  return `<svg
      [attr.width]="size()"
      [attr.height]="size()"
      [class.lmn-animate]="animate()"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      ${innerSvg}
    </svg>`;
}

function generateComponent(name, className, outlineSvg, filledSvg, animation) {
  const hasFilled = filledSvg !== null;
  // Component styles are view-encapsulated: the .lmn-filled class lives on the
  // host, so the selector must go through :host() or it never matches.
  const filledFallback = !hasFilled
    ? `
    :host(.lmn-filled) svg,
    :host(.lmn-filled) svg path {
      fill: currentColor;
      stroke: none;
    }
  `
    : '';

  const template = hasFilled
    ? `
    @if (variant() === 'filled') {
      ${generateFilledSvg(name, filledSvg)}
    } @else {
      ${generateOutlineSvg(name, outlineSvg)}
    }
  `
    : `
    ${generateOutlineSvg(name, outlineSvg)}
  `;

  const styles = composeStyles(name, animation);

  return `import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LmnIconBase } from '../lib/icon-base';

@Component({
  selector: 'lmn-${name}',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.role]': 'ariaLabel() ? "img" : null',
    '[attr.aria-label]': 'ariaLabel() || null',
    '[attr.aria-hidden]': 'ariaLabel() ? null : "true"',
    '[class.lmn-animate]': 'animate()',
  },
  styles: [\`
    ${styles}
    ${filledFallback}
  \`],
  template: \`${template}\`,
})
export class ${className} extends LmnIconBase {}
`;
}

function generateSpec(name, className) {
  return `import { render } from '@testing-library/angular';
import { describe, expect, it } from 'vitest';
import { ${className} } from './${name}';

describe('${className}', () => {
  it('renders an svg', async () => {
    const { fixture } = await render(${className});
    expect(fixture.nativeElement.querySelector('svg')).toBeInTheDocument();
  });

  it('is aria-hidden by default', async () => {
    const { fixture } = await render(${className});
    expect(fixture.nativeElement.getAttribute('aria-hidden')).toBe('true');
  });

  it('accepts animate input as boolean', async () => {
    const { fixture } = await render(${className}, {
      componentInputs: { animate: true },
    });
    expect(fixture.componentInstance.animate()).toBe(true);
  });
});
`;
}

function extractInnerSvgFromComponent(source, name) {
  const svgMatch = source.match(/<svg[\s\S]*?<\/svg>/);
  if (!svgMatch) return null;
  const svg = svgMatch[0];
  let inner = svg.slice(svg.indexOf('>') + 1).replace(/<\/svg>\s*$/, '');
  inner = inner
    .replace(/\[attr\.width\]="size\(\)"/g, '')
    .replace(/\[attr\.height\]="size\(\)"/g, '')
    .replace(/\[attr\.stroke-width\]="strokeWidth\(\)"/g, '')
    .replace(/\[class\.lmn-animate\]="animate\(\)"/g, '')
    .replace(/\[style\.animation\]="[^"]*"/g, '')
    .replace(/aria-hidden="true"/g, '')
    .replace(/focusable="false"/g, '')
    .replace(/viewBox="[^"]*"/g, '')
    .replace(/fill="none"/g, '')
    .replace(/stroke="currentColor"/g, '')
    .replace(/stroke-linecap="round"/g, '')
    .replace(/stroke-linejoin="round"/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  return inner;
}

function generateIconFiles(svgFiles) {
  const generated = [];
  const skipped = [];
  const overwritten = [];

  for (const file of svgFiles) {
    const name = file.replace(/\.svg$/, '');
    const className = toClassName(name);
    const componentPath = join(iconsDir, `${name}.ts`);
    const specPath = join(iconsDir, `${name}.spec.ts`);

    if (existsSync(componentPath)) {
      if (!overwrite) {
        skipped.push(name);
        continue;
      }
      overwritten.push(name);
    } else {
      generated.push(name);
    }

    const rawSvg = readFileSync(join(outlineDir, file), 'utf8');
    let outlineSvg = cleanSvg(rawSvg, name);

    let filledSvg = null;
    const solidPath = join(solidDir, file);
    if (existsSync(solidPath)) {
      const rawSolid = readFileSync(solidPath, 'utf8');
      filledSvg = cleanSvg(rawSolid, name);
    }

    const animation = buildAnimation(name);
    if (animation.pathClasses.length > 0) {
      outlineSvg = applyPathClasses(outlineSvg, animation.pathClasses);
      if (filledSvg) filledSvg = applyPathClasses(filledSvg, animation.pathClasses);
    }
    if (animation.pathLength) {
      outlineSvg = applyPathLength(outlineSvg);
      if (filledSvg) filledSvg = applyPathLength(filledSvg);
    }

    const componentSource = generateComponent(name, className, outlineSvg, filledSvg, animation);
    const specSource = generateSpec(name, className);

    writeFileSync(componentPath, componentSource);
    writeFileSync(specPath, specSource);
  }

  return { generated, skipped, overwritten };
}

function regenerateCustomIcons(outlineNames) {
  if (!overwrite) return { regenerated: 0 };

  let regenerated = 0;
  const existing = readdirSync(iconsDir)
    .filter(f => f.endsWith('.ts') && !f.endsWith('.spec.ts') && f !== 'index.ts');

  for (const file of existing) {
    const name = file.replace(/\.ts$/, '');
    if (outlineNames.has(name)) continue;

    const componentPath = join(iconsDir, file);
    const specPath = join(iconsDir, `${name}.spec.ts`);
    const source = readFileSync(componentPath, 'utf8');
    let innerSvg = extractInnerSvgFromComponent(source, name);
    if (!innerSvg) continue;

    const className = toClassName(name);
    const animation = buildAnimation(name);
    if (animation.pathClasses.length > 0) {
      innerSvg = applyPathClasses(innerSvg, animation.pathClasses);
    }
    if (animation.pathLength) {
      innerSvg = applyPathLength(innerSvg);
    }

    const componentSource = generateComponent(name, className, innerSvg, null, animation);
    const specSource = generateSpec(name, className);

    writeFileSync(componentPath, componentSource);
    writeFileSync(specPath, specSource);
    regenerated++;
  }

  return { regenerated };
}

// Main
const svgFiles = readdirSync(outlineDir)
  .filter(f => f.endsWith('.svg'))
  .sort();

console.log(`Found ${svgFiles.length} SVGs in Heroicons outline.`);
if (overwrite) {
  console.log('Overwrite mode enabled: all existing icons will be regenerated.');
}

const { generated, skipped, overwritten } = generateIconFiles(svgFiles);
const { regenerated } = regenerateCustomIcons(new Set(svgFiles.map(f => f.replace(/\.svg$/, ''))));

const allIcons = readdirSync(iconsDir)
  .filter(f => f.endsWith('.ts') && !f.endsWith('.spec.ts') && f !== 'index.ts')
  .map(f => {
    const name = f.replace(/\.ts$/, '');
    const source = readFileSync(join(iconsDir, f), 'utf8');
    const className = source.match(/export class (Lmn[A-Za-z0-9]+Icon)\b/)?.[1];
    if (!className) throw new Error(`Could not read class name from ${f}`);
    return { name, className };
  })
  .sort((a, b) => a.name.localeCompare(b.name));

const metadata = readIconMetadata();

for (const icon of allIcons) {
  if (!metadata[icon.name]) {
    metadata[icon.name] = { category: inferCategory(icon.name), aliases: inferAliases(icon.name) };
  }
}

writeIconMetadata(metadata, allIcons);
updateBarrel(allIcons);
updateCatalog(allIcons, metadata);

console.log(`Generated ${generated.length} new icons.`);
console.log(`Overwritten ${overwritten.length} existing Heroicons.`);
console.log(`Regenerated ${regenerated} custom icons.`);
console.log(`Skipped ${skipped.length} existing icons.`);
console.log(`Total icons: ${allIcons.length}`);
