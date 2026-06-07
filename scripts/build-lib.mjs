import { execSync } from 'node:child_process';
import { readdirSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(fileURLToPath(new URL('..', import.meta.url)));
const iconsDir = join(root, 'packages/icons/src/icons');
const distDir = join(root, 'packages/icons/dist');

console.log('Building library with ng-packagr...');
execSync('npx ng-packagr -p packages/icons/ng-package.json', { cwd: root, stdio: 'inherit' });

const icons = readdirSync(iconsDir)
  .filter(file => file.endsWith('.ts') && !file.endsWith('.spec.ts') && file !== 'index.ts')
  .map(file => {
    const name = file.replace(/\.ts$/, '');
    const source = readFileSync(join(iconsDir, file), 'utf8');
    const className = source.match(/export class (Lmn[A-Za-z0-9]+Icon)\b/)?.[1];
    if (!className) {
      throw new Error(`Could not read icon class name from ${file}`);
    }
    return { name, className };
  })
  .sort((a, b) => a.name.localeCompare(b.name));

// Generate per-icon re-exports
for (const icon of icons) {
  const mjsPath = join(distDir, `${icon.name}.mjs`);
  const dtsPath = join(distDir, `${icon.name}.d.ts`);

  writeFileSync(mjsPath, `export { ${icon.className} } from './fesm2022/lumen-icons.mjs';\n`);
  writeFileSync(dtsPath, `export { ${icon.className} } from './types/lumen-icons';\n`);
}

// Generate icons barrel
const iconsDirDist = join(distDir, 'icons');
mkdirSync(iconsDirDist, { recursive: true });

const barrelMjs = icons.map(i => `export { ${i.className} } from '../fesm2022/lumen-icons.mjs';`).join('\n') + '\n';
const barrelDts = icons.map(i => `export { ${i.className} } from '../types/lumen-icons';`).join('\n') + '\n';

writeFileSync(join(iconsDirDist, 'index.mjs'), barrelMjs);
writeFileSync(join(iconsDirDist, 'index.d.ts'), barrelDts);

// Update dist/package.json with subpath exports
const pkgPath = join(distDir, 'package.json');
const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'));

delete pkg.files;
pkg.publishConfig = {
  ...(pkg.publishConfig ?? {}),
  access: 'public',
};

pkg.exports = {
  './package.json': {
    default: './package.json',
  },
  '.': {
    types: './types/lumen-icons.d.ts',
    default: './fesm2022/lumen-icons.mjs',
  },
  './icons': {
    types: './icons/index.d.ts',
    default: './icons/index.mjs',
  },
  './icons/*': {
    types: './icons/*.d.ts',
    default: './icons/*.mjs',
  },
};

// Add per-icon exports
for (const icon of icons) {
  pkg.exports[`./${icon.name}`] = {
    types: `./${icon.name}.d.ts`,
    default: `./${icon.name}.mjs`,
  };
}

// Wildcard fallback for any future icon
pkg.exports['./*'] = {
  types: './*.d.ts',
  default: './*.mjs',
};

writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');

console.log(`Generated ${icons.length} per-icon re-exports and updated package.json`);
