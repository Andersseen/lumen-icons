import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * Shared writers for the icon barrel, the website catalog and icon metadata.
 * Single source of truth used by both generate-icons.mjs and sync-icons.mjs —
 * do not copy these templates into another script.
 */

const root = resolve(fileURLToPath(new URL('..', import.meta.url)));
export const iconsDir = join(root, 'packages/icons/src/icons');
export const indexPath = join(iconsDir, 'index.ts');
export const catalogPath = join(root, 'src/app/data/icon-catalog.ts');
export const metadataPath = join(root, 'src/app/data/icon-metadata.ts');

export function inferCategory(name) {
  const n = name.toLowerCase();
  if (n.includes('arrow') || n.includes('chevron') || n.includes('home') || n.includes('menu') || n.includes('link') || n.includes('external')) return 'navigation';
  if (n.includes('mail') || n.includes('message') || n.includes('chat') || n.includes('phone') || n.includes('share') || n.includes('send') || n.includes('envelope')) return 'communication';
  if (n.includes('heart') || n.includes('star') || n.includes('like') || n.includes('bell') || n.includes('alert') || n.includes('warning') || n.includes('info') || n.includes('check') || n.includes('smile') || n.includes('zap') || n.includes('sparkle') || n.includes('flag')) return 'feedback';
  if (n.includes('play') || n.includes('pause') || n.includes('video') || n.includes('camera') || n.includes('photo') || n.includes('image') || n.includes('music') || n.includes('microphone') || n.includes('film')) return 'media';
  if (n.includes('lock') || n.includes('key') || n.includes('shield') || n.includes('eye') || n.includes('password') || n.includes('finger') || n.includes('security')) return 'security';
  if (n.includes('bold') || n.includes('italic') || n.includes('underline') || n.includes('align') || n.includes('list') || n.includes('text') || n.includes('font')) return 'editor';
  if (n.includes('file') || n.includes('folder') || n.includes('document') || n.includes('archive') || n.includes('calendar') || n.includes('clock') || n.includes('bookmark')) return 'content';
  if (n.includes('trash') || n.includes('plus') || n.includes('minus') || n.includes('edit') || n.includes('copy') || n.includes('download') || n.includes('upload') || n.includes('save') || n.includes('delete') || n.includes('refresh') || n.includes('cog') || n.includes('filter')) return 'actions';
  if (n.includes('user') || n.includes('person') || n.includes('profile') || n.includes('sun') || n.includes('moon') || n.includes('globe') || n.includes('settings') || n.includes('wifi') || n.includes('battery') || n.includes('command') || n.includes('hashtag') || n.includes('cpu') || n.includes('chip')) return 'system';
  return 'system';
}

export function inferAliases(name) {
  return [name.replace(/-/g, ' ')];
}

export function readIconMetadata() {
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

export function writeIconMetadata(metadata, allIcons) {
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

export function updateBarrel(icons) {
  const source = icons.map(i => `export { ${i.className} } from './${i.name}';`).join('\n') + '\n';
  writeFileSync(indexPath, source);
}

export function updateCatalog(icons, metadata) {
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
