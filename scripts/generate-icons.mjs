import { readdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(fileURLToPath(new URL('..', import.meta.url)));
const outlineDir = join(root, 'node_modules/heroicons/24/outline');
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

const SEMANTIC_ANIMATIONS = [
  // Exact matches first
  {
    match: n => n === 'check',
    keyframes: name => `@keyframes lmn-${name} { 0% { scale: 0.5; opacity: 0; } 60% { scale: 1.2; } 100% { scale: 1; opacity: 1; } }`,
    duration: '420ms',
  },
  {
    match: n => n === 'heart',
    keyframes: name => `@keyframes lmn-${name} { 0%, 100% { scale: 1; } 15% { scale: 1.3; } 30% { scale: 0.9; } 45% { scale: 1.15; } 60% { scale: 1; } }`,
    duration: '800ms',
  },
  {
    match: n => n === 'star',
    keyframes: name => `@keyframes lmn-${name} { 0%, 100% { scale: 1; rotate: 0deg; } 50% { scale: 1.25; rotate: 72deg; } }`,
    duration: '600ms',
  },
  {
    match: n => n === 'bell',
    keyframes: name => `@keyframes lmn-${name} { 0%, 100% { rotate: 0deg; } 10% { rotate: 20deg; } 30% { rotate: -16deg; } 50% { rotate: 12deg; } 70% { rotate: -8deg; } 90% { rotate: 4deg; } }`,
    duration: '700ms',
  },
  {
    match: n => n === 'trash',
    keyframes: name => `@keyframes lmn-${name} { 0%, 100% { rotate: 0deg; translate: 0 0; } 20% { rotate: 10deg; translate: 2px 0; } 40% { rotate: -10deg; translate: -2px 0; } 60% { rotate: 6deg; } 80% { rotate: -6deg; } }`,
    duration: '500ms',
  },
  {
    match: n => n === 'plus',
    keyframes: name => `@keyframes lmn-${name} { 0% { scale: 0.7; rotate: -90deg; } 60% { scale: 1.15; rotate: 10deg; } 100% { scale: 1; rotate: 0deg; } }`,
    duration: '450ms',
  },
  {
    match: n => n === 'x' || n === 'x-mark',
    keyframes: name => `@keyframes lmn-${name} { 0% { scale: 0.7; rotate: 90deg; } 60% { scale: 1.15; rotate: -10deg; } 100% { scale: 1; rotate: 0deg; } }`,
    duration: '450ms',
  },
  {
    match: n => n === 'home',
    keyframes: name => `@keyframes lmn-${name} { 0%, 100% { translate: 0 0; } 50% { translate: 0 -4px; } }`,
    duration: '450ms',
  },
  {
    match: n => n === 'search' || n === 'magnifying-glass',
    keyframes: name => `@keyframes lmn-${name} { 0%, 100% { scale: 1; rotate: 0deg; } 25% { scale: 1.12; rotate: -12deg; } 50% { scale: 1; rotate: 0deg; } 75% { scale: 1.06; rotate: 8deg; } }`,
    duration: '650ms',
  },
  {
    match: n => n === 'send' || n === 'paper-airplane',
    keyframes: name => `@keyframes lmn-${name} { 0%, 100% { translate: 0 0; opacity: 1; } 50% { translate: 5px -5px; opacity: 0.7; } }`,
    duration: '500ms',
  },

  // Pattern matches
  {
    match: n => n.includes('arrow-right') || n.includes('arrow-long-right') || n === 'chevron-right',
    keyframes: name => `@keyframes lmn-${name} { 0%, 100% { translate: 0 0; } 50% { translate: 5px 0; } }`,
    duration: '400ms',
  },
  {
    match: n => n.includes('arrow-left') || n.includes('arrow-long-left') || n === 'chevron-left',
    keyframes: name => `@keyframes lmn-${name} { 0%, 100% { translate: 0 0; } 50% { translate: -5px 0; } }`,
    duration: '400ms',
  },
  {
    match: n => n.includes('arrow-up') || n.includes('arrow-long-up') || n === 'chevron-up',
    keyframes: name => `@keyframes lmn-${name} { 0%, 100% { translate: 0 0; } 50% { translate: 0 -5px; } }`,
    duration: '400ms',
  },
  {
    match: n => n.includes('arrow-down') || n.includes('arrow-long-down') || n === 'chevron-down',
    keyframes: name => `@keyframes lmn-${name} { 0%, 100% { translate: 0 0; } 50% { translate: 0 5px; } }`,
    duration: '400ms',
  },
  {
    match: n => n.includes('arrow-top-right') || n.includes('arrow-up-right') || n.includes('external-link') || n.includes('arrow-top-left'),
    keyframes: name => `@keyframes lmn-${name} { 0%, 100% { translate: 0 0; } 50% { translate: 4px -4px; } }`,
    duration: '450ms',
  },
  {
    match: n => n.includes('arrow-turn') || n.includes('arrow-uturn') || n.includes('arrow-path') || n.includes('refresh') || n.includes('reload') || n.includes('sync') || n.includes('rotate'),
    keyframes: name => `@keyframes lmn-${name} { 0% { rotate: 0deg; } 100% { rotate: 360deg; } }`,
    duration: '900ms',
  },
  {
    match: n => n.includes('download'),
    keyframes: name => `@keyframes lmn-${name} { 0%, 100% { translate: 0 0; opacity: 1; } 50% { translate: 0 5px; opacity: 0.6; } }`,
    duration: '550ms',
  },
  {
    match: n => n.includes('upload'),
    keyframes: name => `@keyframes lmn-${name} { 0%, 100% { translate: 0 0; opacity: 1; } 50% { translate: 0 -5px; opacity: 0.6; } }`,
    duration: '550ms',
  },
  {
    match: n => n.includes('cog') || n.includes('settings'),
    keyframes: name => `@keyframes lmn-${name} { 0% { rotate: 0deg; } 100% { rotate: 360deg; } }`,
    duration: '1000ms',
  },
  {
    match: n => n.includes('heart') || n.includes('like') || n.includes('thumb'),
    keyframes: name => `@keyframes lmn-${name} { 0%, 100% { scale: 1; } 15% { scale: 1.3; } 30% { scale: 0.9; } 45% { scale: 1.15; } 60% { scale: 1; } }`,
    duration: '800ms',
  },
  {
    match: n => n.includes('bell') || n.includes('alert') || n.includes('warning') || n.includes('exclamation') || n.includes('question'),
    keyframes: name => `@keyframes lmn-${name} { 0%, 100% { rotate: 0deg; } 10% { rotate: 20deg; } 30% { rotate: -16deg; } 50% { rotate: 12deg; } 70% { rotate: -8deg; } 90% { rotate: 4deg; } }`,
    duration: '700ms',
  },
  {
    match: n => n.includes('sun') || n.includes('moon') || n.includes('sparkle') || n.includes('bolt') || n.includes('fire') || n.includes('zap'),
    keyframes: name => `@keyframes lmn-${name} { 0%, 100% { opacity: 1; scale: 1; } 50% { opacity: 0.5; scale: 1.12; } }`,
    duration: '600ms',
  },
  {
    match: n => n.includes('check') || n.includes('tick'),
    keyframes: name => `@keyframes lmn-${name} { 0% { scale: 0.5; opacity: 0; } 60% { scale: 1.2; } 100% { scale: 1; opacity: 1; } }`,
    duration: '420ms',
  },
  {
    match: n => n.includes('minus') || n.includes('dash') || n.includes('remove'),
    keyframes: name => `@keyframes lmn-${name} { 0%, 100% { scaleX: 1; } 50% { scaleX: 1.35; } }`,
    duration: '400ms',
  },
  {
    match: n => n.includes('trash') || n.includes('delete') || n.includes('bin'),
    keyframes: name => `@keyframes lmn-${name} { 0%, 100% { rotate: 0deg; } 20% { rotate: 10deg; } 40% { rotate: -10deg; } 60% { rotate: 6deg; } 80% { rotate: -6deg; } }`,
    duration: '500ms',
  },
  {
    match: n => n.includes('lock') || n.includes('key') || n.includes('shield'),
    keyframes: name => `@keyframes lmn-${name} { 0%, 100% { scale: 1; } 50% { scale: 1.1; } }`,
    duration: '500ms',
  },
  {
    match: n => n.includes('mail') || n.includes('message') || n.includes('chat') || n.includes('envelope'),
    keyframes: name => `@keyframes lmn-${name} { 0%, 100% { translate: 0 0; } 25% { translate: 0 -3px; } 75% { translate: 0 3px; } }`,
    duration: '550ms',
  },
  {
    match: n => n.includes('user') || n.includes('person') || n.includes('profile') || n.includes('avatar'),
    keyframes: name => `@keyframes lmn-${name} { 0%, 100% { scale: 1; } 50% { scale: 1.08; } }`,
    duration: '500ms',
  },
  {
    match: n => n.includes('folder') || n.includes('file') || n.includes('document') || n.includes('archive'),
    keyframes: name => `@keyframes lmn-${name} { 0%, 100% { translate: 0 0; } 50% { translate: 0 -2px; } }`,
    duration: '450ms',
  },
  {
    match: n => n.includes('camera') || n.includes('video') || n.includes('photo') || n.includes('image') || n.includes('picture'),
    keyframes: name => `@keyframes lmn-${name} { 0%, 100% { scale: 1; } 25% { scale: 1.1; } 50% { scale: 1; } 75% { scale: 1.05; } }`,
    duration: '550ms',
  },
  {
    match: n => n.includes('play') || n.includes('pause') || n.includes('stop') || n.includes('media'),
    keyframes: name => `@keyframes lmn-${name} { 0%, 100% { scale: 1; opacity: 1; } 50% { scale: 1.15; opacity: 0.8; } }`,
    duration: '450ms',
  },

  // Default
  {
    match: n => true,
    keyframes: name => `@keyframes lmn-${name} { 0%, 100% { scale: 1; } 50% { scale: 1.1; } }`,
    duration: '500ms',
  },
];

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

function resolveAnimation(name) {
  const n = name.toLowerCase();
  for (const anim of SEMANTIC_ANIMATIONS) {
    if (anim.match(n)) return anim;
  }
  return SEMANTIC_ANIMATIONS[SEMANTIC_ANIMATIONS.length - 1];
}

function generateSvg(name, innerSvg) {
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

function generateComponent(name, className, innerSvg, keyframes, duration) {
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
    ${keyframes}

    .lmn-animate {
      animation: lmn-${name} ${duration} ease both;
    }

    .lmn-filled svg,
    .lmn-filled path {
      fill: currentColor;
      stroke: none;
    }

    @media (prefers-reduced-motion: reduce) {
      .lmn-animate,
      .lmn-animate-el {
        animation: none !important;
      }
    }
  \`],
  template: \`${generateSvg(name, innerSvg)}\`,
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
    const innerSvg = cleanSvg(rawSvg, name);
    const animation = resolveAnimation(name);
    const keyframes = animation.keyframes(name);
    const duration = animation.duration;

    const componentSource = generateComponent(name, className, innerSvg, keyframes, duration);
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
    const innerSvg = extractInnerSvgFromComponent(source, name);
    if (!innerSvg) continue;

    const className = toClassName(name);
    const animation = resolveAnimation(name);
    const keyframes = animation.keyframes(name);
    const duration = animation.duration;

    const componentSource = generateComponent(name, className, innerSvg, keyframes, duration);
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
