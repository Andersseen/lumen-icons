import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import {
  iconsDir,
  inferAliases,
  inferCategory,
  readIconMetadata,
  updateBarrel,
  updateCatalog,
  writeIconMetadata,
} from './icon-catalog-writer.mjs';

const icons = readdirSync(iconsDir)
  .filter(file => file.endsWith('.ts') && !file.endsWith('.spec.ts') && file !== 'index.ts')
  .map(file => {
    const name = file.replace(/\.ts$/, '');
    const source = readFileSync(join(iconsDir, file), 'utf8');
    const className = source.match(/export class (Lmn[A-Za-z0-9]+Icon)\b/)?.[1];

    if (!className) {
      throw new Error(`Could not read icon metadata from ${file}`);
    }

    return { name, className };
  })
  .sort((a, b) => a.name.localeCompare(b.name));

const metadata = readIconMetadata();
for (const icon of icons) {
  if (!metadata[icon.name]) {
    metadata[icon.name] = { category: inferCategory(icon.name), aliases: inferAliases(icon.name) };
  }
}

writeIconMetadata(metadata, icons);
updateBarrel(icons);
updateCatalog(icons, metadata);

console.log(`Synced ${icons.length} icons.`);
