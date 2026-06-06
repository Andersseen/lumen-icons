import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(fileURLToPath(new URL('..', import.meta.url)));
const iconsDir = join(root, 'packages/icons/src/icons');
const indexPath = join(iconsDir, 'index.ts');
const catalogPath = join(root, 'src/app/data/icon-catalog.ts');

const toIconName = file => file.replace(/\.ts$/, '');

const icons = readdirSync(iconsDir)
  .filter(file => file.endsWith('.ts') && !file.endsWith('.spec.ts') && file !== 'index.ts')
  .map(file => {
    const name = toIconName(file);
    const source = readFileSync(join(iconsDir, file), 'utf8');
    const className = source.match(/export class (Lmn[A-Za-z0-9]+Icon)\b/)?.[1];
    const selector = source.match(/selector:\s*['"]([^'"]+)['"]/)?.[1];

    if (!className || !selector) {
      throw new Error(`Could not read icon metadata from ${file}`);
    }

    return { name, className, selector };
  })
  .sort((a, b) => a.name.localeCompare(b.name));

const indexSource = `${icons.map(icon => `export { ${icon.className} } from './${icon.name}';`).join('\n')}\n`;

const catalogSource = `import type { Type } from '@angular/core';

${icons.map(icon => `import { ${icon.className} } from '@lumen/icons/${icon.name}';`).join('\n')}
import type { LmnIconInstance } from '@lumen/icons';
import { ICON_METADATA, type IconCategory } from './icon-metadata';

export interface IconEntry {
  readonly name: string;
  readonly selector: string;
  readonly component: Type<LmnIconInstance>;
  readonly importStr: string;
  readonly selectorStr: string;
  readonly exampleStr: string;
  readonly category: IconCategory;
  readonly aliases: readonly string[];
}

export const ICON_CATALOG: IconEntry[] = [
${icons.map(icon => `  {
    name: '${icon.name}',
    selector: '${icon.selector}',
    component: ${icon.className} as Type<LmnIconInstance>,
    importStr: "import { ${icon.className} } from '@lumen/icons/${icon.name}';",
    selectorStr: '<${icon.selector} ariaLabel="${icon.name}" />',
    exampleStr: \`import { Component } from '@angular/core';
import { ${icon.className} } from '@lumen/icons/${icon.name}';

@Component({
  selector: 'app-example',
  imports: [${icon.className}],
  template: '<${icon.selector} ariaLabel="${icon.name}" />',
})
export class ExampleComponent {}\`,
    category: ICON_METADATA['${icon.name}']?.category ?? 'system',
    aliases: ICON_METADATA['${icon.name}']?.aliases ?? [],
  },`).join('\n')}
] as const;
`;

writeFileSync(indexPath, indexSource);
writeFileSync(catalogPath, catalogSource);

console.log(`Synced ${icons.length} icons.`);
