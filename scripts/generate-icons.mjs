import { readdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { applyPathClasses, applyPathLength, buildAnimation, composeStyles } from './animations.mjs';

const root = resolve(fileURLToPath(new URL('..', import.meta.url)));
const outlineDir = join(root, 'node_modules/heroicons/24/outline');
const solidDir = join(root, 'node_modules/heroicons/24/solid');
const iconsDir = join(root, 'packages/icons/src/icons');
const indexPath = join(iconsDir, 'index.ts');
const catalogPath = join(root, 'src/app/data/icon-catalog.ts');
const metadataPath = join(root, 'src/app/data/icon-metadata.ts');

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
  const filledFallback = !hasFilled
    ? `
    .lmn-filled svg,
    .lmn-filled path {
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

function inferCategory(name) {
  const n = name.toLowerCase();
  if (n.includes('arrow') || n.includes('chevron') || n.includes('home') || n.includes('menu') || n.includes('link') || n.includes('external')) return 'navigation';
  if (n.includes('mail') || n.includes('message') || n.includes('chat') || n.includes('phone') || n.includes('share') || n.includes('send') || n.includes('envelope')) return 'communication';
  if (n.includes('heart') || n.includes('star') || n.includes('like') || n.includes('bell') || n.includes('alert') || n.includes('warning') || n.includes('info') || n.includes('check') || n.includes('smile') || n.includes('zap') || n.includes('sparkle') || n.includes('flag')) return 'feedback';
  if (n.includes('play') || n.includes('pause') || n.includes('video') || n.includes('camera') || n.includes('photo') || n.includes('image') || n.includes('music') || n.includes('microphone') || n.includes('film')) return 'media';
  if (n.includes('lock') || n.includes('key') || n.includes('shield') || n.includes('eye') || n.includes('password') || n.includes('finger') || n.includes('security')) return 'security';
  if (n.includes('bold') || n.includes('italic') || n.includes('underline') || n.includes('align') || n.includes('list') || n.includes('text') || n.includes('font')) return 'editor';
  if (n.includes('file') || n.includes('folder') || n.includes('document') || n.includes('archive') || n.includes('calendar') || n.includes('clock') || n.includes('bookmark')) return 'content';
  if (n.includes('trash') || n.includes('plus') || n.includes('minus') || n.includes('edit') || n.includes('copy') || n.includes('download') || n.includes('upload') || n.includes('save') || n.includes('delete') || n.includes('refresh') || n.includes('cog') || n.includes('filter') || n.includes('cog')) return 'actions';
  if (n.includes('user') || n.includes('person') || n.includes('profile') || n.includes('sun') || n.includes('moon') || n.includes('globe') || n.includes('settings') || n.includes('wifi') || n.includes('battery') || n.includes('command') || n.includes('hashtag') || n.includes('cpu') || n.includes('chip')) return 'system';
  return 'system';
}

function inferAliases(name) {
  return [name.replace(/-/g, ' ')];
}

function readIconMetadata() {
  if (!existsSync(metadataPath)) {
    return {};
  }
  const source = readFileSync(metadataPath, 'utf8');
  const match = source.match(/export const ICON_METADATA: Record<string, IconMetadata> = \{([\s\S]*?)\n\};/);
  if (!match) return {};

  const metadata = {};
  const entryRegex = /['"]([^'"]+)['"]:\s*\{\s*category:\s*['"]([^'"]+)['"],\s*aliases:\s*\[([^\]]*)\]\s*\}/g;
  let m;
  while ((m = entryRegex.exec(match[1])) !== null) {
    const aliases = m[3].split(',').map(s => s.trim().replace(/^['"]|['"]$/g, '')).filter(Boolean);
    metadata[m[1]] = { category: m[2], aliases };
  }
  return metadata;
}

function writeIconMetadata(metadata, allIcons) {
  const sortedNames = allIcons.map(i => i.name).sort();
  const entries = sortedNames
    .map(name => {
      const meta = metadata[name] || { category: inferCategory(name), aliases: inferAliases(name) };
      const aliasesStr = meta.aliases.map(a => `'${a}'`).join(', ');
      return `  '${name}': { category: '${meta.category}', aliases: [${aliasesStr}] }`;
    })
    .join(',\n');

  const source = `export type IconCategory =
  | 'actions'
  | 'communication'
  | 'content'
  | 'editor'
  | 'feedback'
  | 'media'
  | 'navigation'
  | 'security'
  | 'status'
  | 'system';

export interface IconMetadata {
  readonly category: IconCategory;
  readonly aliases: readonly string[];
}

export interface IconCategoryOption {
  readonly value: IconCategory;
  readonly label: string;
}

export const ICON_CATEGORIES: readonly IconCategoryOption[] = [
  { value: 'actions', label: 'Actions' },
  { value: 'communication', label: 'Communication' },
  { value: 'content', label: 'Content' },
  { value: 'editor', label: 'Editor' },
  { value: 'feedback', label: 'Feedback' },
  { value: 'media', label: 'Media' },
  { value: 'navigation', label: 'Navigation' },
  { value: 'security', label: 'Security' },
  { value: 'status', label: 'Status' },
  { value: 'system', label: 'System' },
] as const;

export const ICON_CATEGORY_LABELS = Object.fromEntries(
  ICON_CATEGORIES.map(category => [category.value, category.label]),
) as Record<IconCategory, string>;

export const ICON_METADATA: Record<string, IconMetadata> = {
${entries},
};
`;
  writeFileSync(metadataPath, source);
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

function updateBarrel(icons) {
  const source = icons.map(i => `export { ${i.className} } from './${i.name}';`).join('\n') + '\n';
  writeFileSync(indexPath, source);
}

function updateCatalog(icons, metadata) {
  const source = `import type { Type } from '@angular/core';

${icons.map(i => `import { ${i.className} } from 'lumen-icons/${i.name}';`).join('\n')}
import type { LmnIconInstance } from 'lumen-icons';
import type { IconCategory } from './icon-metadata';

export interface IconEntry {
  readonly name: string;
  readonly selector: string;
  readonly component: Type<LmnIconInstance>;
  readonly importStr: string;
  readonly category: IconCategory;
  readonly aliases: readonly string[];
}

export const ICON_CATALOG: IconEntry[] = [
${icons.map(i => {
  const meta = metadata[i.name] || { category: inferCategory(i.name), aliases: inferAliases(i.name) };
  const aliasesStr = meta.aliases.map(a => `'${a}'`).join(', ');
  return `  {
    name: '${i.name}',
    selector: 'lmn-${i.name}',
    component: ${i.className} as Type<LmnIconInstance>,
    importStr: "import { ${i.className} } from 'lumen-icons/${i.name}';",
    category: '${meta.category}',
    aliases: [${aliasesStr}],
  },`;
}).join('\n')}
] as const;
`;
  writeFileSync(catalogPath, source);
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
