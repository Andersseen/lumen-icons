#!/usr/bin/env node
/**
 * Template type-check guard for the icon inputs.
 *
 * `tsc` does not see Angular templates, so this compiles two fixtures with
 * `ngc` + `strictTemplates`:
 *   - tests/types/template-inputs.valid.ts   must compile cleanly
 *   - tests/types/template-inputs.invalid.ts must fail on `size="large"`
 */
import { spawnSync } from 'node:child_process';
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const typesDir = join(root, 'tests/types');
const baseConfig = join(typesDir, 'tsconfig.json');
const ngc = join(root, 'node_modules/.bin/ngc');

function compile(project) {
  const result = spawnSync(ngc, ['-p', project], { cwd: root, encoding: 'utf8' });
  return { ok: result.status === 0, output: `${result.stdout}${result.stderr}` };
}

let failed = false;

const valid = compile(baseConfig);
if (valid.ok) {
  console.log('✓ valid template bindings compile under strictTemplates');
} else {
  failed = true;
  console.error('✗ valid template bindings failed to compile:\n' + valid.output);
}

// Same config, but pointing at the invalid fixture. The temp tsconfig lives in
// tests/types so its relative paths resolve exactly like the base one.
const tmp = mkdtempSync(join(typesDir, '.tmp-'));
try {
  const invalidConfig = join(tmp, 'tsconfig.json');
  const config = JSON.parse(readFileSync(baseConfig, 'utf8'));
  writeFileSync(
    invalidConfig,
    JSON.stringify({
      ...config,
      extends: '../../../tsconfig.json',
      compilerOptions: { ...config.compilerOptions, rootDir: '../../../' },
      files: ['../template-inputs.invalid.ts'],
    }),
  );
  const invalid = compile(invalidConfig);
  if (!invalid.ok && /Type '"large"' is not assignable to type 'LmnIconSizeInput'/.test(invalid.output)) {
    console.log('✓ size="large" is rejected with an LmnIconSizeInput error');
  } else {
    failed = true;
    console.error(
      invalid.ok
        ? '✗ size="large" compiled, but it must be rejected'
        : '✗ size="large" failed with an unexpected diagnostic:\n' + invalid.output,
    );
  }
} finally {
  rmSync(tmp, { recursive: true, force: true });
}

process.exit(failed ? 1 : 0);
