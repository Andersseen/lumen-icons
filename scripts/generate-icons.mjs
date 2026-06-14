import { readdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(fileURLToPath(new URL('..', import.meta.url)));
const sourceDir = join(root, 'node_modules/heroicons/24/outline');
const iconsDir = join(root, 'packages/icons/src/icons');
const indexPath = join(iconsDir, 'index.ts');
const catalogPath = join(root, 'src/app/data/icon-catalog.ts');
const metadataPath = join(root, 'src/app/data/icon-metadata.ts');

const CATEGORIES = [
  'actions',
  'communication',
  'content',
  'editor',
  'feedback',
  'media',
  'navigation',
  'security',
  'status',
  'system',
];

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
    .replace(/\s+stroke-width="[^"]*"/g, '')
    .replace(/\s+fill="[^"]*"/g, '')
    .replace(/\s+stroke="[^"]*"/g, '');

  inner = inner.replace(/^\s+|[\r\n]+/g, '').replace(/>\s+</g, '><');

  return inner;
}

function detectAnimation(name) {
  const n = name.toLowerCase();
  if (n.includes('arrow') || n.includes('chevron') || n.includes('long')) return 'bounce';
  if (n.includes('heart') || n.includes('star') || n.includes('like') || n.includes('thumb')) return 'pulse';
  if (n.includes('bell') || n.includes('alert') || n.includes('warning') || n.includes('exclamation') || n.includes('question')) return 'shake';
  if (n.includes('refresh') || n.includes('reload') || n.includes('sync') || n.includes('cog') || n.includes('setting')) return 'spin';
  if (n.includes('sun') || n.includes('moon') || n.includes('sparkle') || n.includes('bolt') || n.includes('fire')) return 'fade';
  if (n.includes('check') || n.includes('plus') || n.includes('minus')) return 'pop';
  return 'pulse';
}

function generateKeyframes(name, type) {
  const map = {
    pulse: `@keyframes lmn-${name} { 0%, 100% { scale: 1; } 50% { scale: 1.08; } }`,
    bounce: `@keyframes lmn-${name} { 0%, 100% { translate: 0 0; } 50% { translate: 0 -2px; } }`,
    shake: `@keyframes lmn-${name} { 0%, 100% { rotate: 0deg; } 25% { rotate: 3deg; } 75% { rotate: -3deg; } }`,
    spin: `@keyframes lmn-${name} { 0% { rotate: 0deg; } 100% { rotate: 360deg; } }`,
    fade: `@keyframes lmn-${name} { 0%, 100% { opacity: 1; scale: 1; } 50% { opacity: 0.8; scale: 0.95; } }`,
    pop: `@keyframes lmn-${name} { 0%, 100% { scale: 1; } 50% { scale: 1.12; } }`,
  };
  return map[type] || map.pulse;
}

function generateComponent(name, className, innerSvg, keyframes) {
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
    @media (prefers-reduced-motion: reduce) {
      .lmn-animate,
      .lmn-animate-el {
        animation: none !important;
      }
    }
  \`],
  template: \`
    <svg
      [attr.width]="size()"
      [attr.height]="size()"
      [attr.stroke-width]="strokeWidth()"
      [class.lmn-animate]="animate()"
      [style.animation]="animate() ? 'lmn-${name} 560ms ease both' : null"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      ${innerSvg}
    </svg>
  \`,
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
  if (n.includes('mail') || n.includes('message') || n.includes('chat') || n.includes('phone') || n.includes('share') || n.includes('send')) return 'communication';
  if (n.includes('heart') || n.includes('star') || n.includes('like') || n.includes('bell') || n.includes('alert') || n.includes('warning') || n.includes('info') || n.includes('check') || n.includes('smile') || n.includes('zap') || n.includes('sparkle') || n.includes('flag')) return 'feedback';
  if (n.includes('play') || n.includes('pause') || n.includes('video') || n.includes('camera') || n.includes('photo') || n.includes('image') || n.includes('music') || n.includes('microphone')) return 'media';
  if (n.includes('lock') || n.includes('key') || n.includes('shield') || n.includes('eye') || n.includes('password') || n.includes('finger')) return 'security';
  if (n.includes('bold') || n.includes('italic') || n.includes('underline') || n.includes('align') || n.includes('list') || n.includes('text')) return 'editor';
  if (n.includes('file') || n.includes('folder') || n.includes('document') || n.includes('archive') || n.includes('calendar') || n.includes('clock') || n.includes('bookmark')) return 'content';
  if (n.includes('trash') || n.includes('plus') || n.includes('minus') || n.includes('edit') || n.includes('copy') || n.includes('download') || n.includes('upload') || n.includes('save') || n.includes('delete') || n.includes('refresh') || n.includes('cog') || n.includes('filter')) return 'actions';
  if (n.includes('user') || n.includes('person') || n.includes('profile') || n.includes('sun') || n.includes('moon') || n.includes('globe') || n.includes('settings') || n.includes('wifi') || n.includes('battery') || n.includes('command') || n.includes('hashtag')) return 'system';
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

function generateIconFiles(svgFiles) {
  const generated = [];
  const skipped = [];

  for (const file of svgFiles) {
    const name = file.replace(/\.svg$/, '');
    const className = toClassName(name);
    const componentPath = join(iconsDir, `${name}.ts`);
    const specPath = join(iconsDir, `${name}.spec.ts`);

    if (existsSync(componentPath)) {
      skipped.push(name);
      continue;
    }

    const rawSvg = readFileSync(join(sourceDir, file), 'utf8');
    const innerSvg = cleanSvg(rawSvg, name);
    const animType = detectAnimation(name);
    const keyframes = generateKeyframes(name, animType);

    const componentSource = generateComponent(name, className, innerSvg, keyframes);
    const specSource = generateSpec(name, className);

    writeFileSync(componentPath, componentSource);
    writeFileSync(specPath, specSource);

    generated.push({ name, className });
  }

  return { generated, skipped };
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
const svgFiles = readdirSync(sourceDir)
  .filter(f => f.endsWith('.svg'))
  .sort();

console.log(`Found ${svgFiles.length} SVGs in Heroicons outline.`);

const { generated, skipped } = generateIconFiles(svgFiles);

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

// Ensure metadata exists for all icons (existing + new)
for (const icon of allIcons) {
  if (!metadata[icon.name]) {
    metadata[icon.name] = { category: inferCategory(icon.name), aliases: inferAliases(icon.name) };
  }
}

writeIconMetadata(metadata, allIcons);
updateBarrel(allIcons);
updateCatalog(allIcons, metadata);

console.log(`Generated ${generated.length} new icons.`);
console.log(`Skipped ${skipped.length} existing icons.`);
console.log(`Total icons: ${allIcons.length}`);
