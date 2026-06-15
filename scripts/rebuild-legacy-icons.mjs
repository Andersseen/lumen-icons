import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(fileURLToPath(new URL('..', import.meta.url)));
const sourceDir = join(root, 'node_modules/heroicons/24/outline');
const iconsDir = join(root, 'packages/icons/src/icons');

const toPascalCase = (str) =>
  str
    .split('-')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');

const toClassName = (name) => `Lmn${toPascalCase(name)}Icon`;

const SEMANTIC_ANIMATIONS = [
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
  {
    match: n => true,
    keyframes: name => `@keyframes lmn-${name} { 0%, 100% { scale: 1; } 50% { scale: 1.1; } }`,
    duration: '500ms',
  },
];

function resolveAnimation(name) {
  const n = name.toLowerCase();
  for (const anim of SEMANTIC_ANIMATIONS) {
    if (anim.match(n)) return anim;
  }
  return SEMANTIC_ANIMATIONS[SEMANTIC_ANIMATIONS.length - 1];
}

function extractInnerSvg(source) {
  const match = source.match(/<svg[\s\S]*?>([\s\S]*?)<\/svg\s*>/);
  if (!match) return null;
  return match[1].replace(/^\s+|\s+$/g, '').replace(/>\s+</g, '><');
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
      [style.animation]="animate() ? 'lmn-${name} ${duration} ease both' : null"
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

// Main
const heroiconsNames = new Set(
  readdirSync(sourceDir)
    .filter(f => f.endsWith('.svg'))
    .map(f => f.replace(/\.svg$/, ''))
);

const existingFiles = readdirSync(iconsDir)
  .filter(f => f.endsWith('.ts') && !f.endsWith('.spec.ts') && f !== 'index.ts')
  .map(f => f.replace(/\.ts$/, ''));

const legacyNames = existingFiles.filter(name => !heroiconsNames.has(name)).sort();

console.log(`Found ${legacyNames.length} legacy icons to rebuild.`);

for (const name of legacyNames) {
  const className = toClassName(name);
  const componentPath = join(iconsDir, `${name}.ts`);
  const specPath = join(iconsDir, `${name}.spec.ts`);

  const source = readFileSync(componentPath, 'utf8');
  const innerSvg = extractInnerSvg(source);

  if (!innerSvg) {
    console.warn(`Could not extract SVG from ${name}.ts, skipping.`);
    continue;
  }

  const animation = resolveAnimation(name);
  const keyframes = animation.keyframes(name);
  const duration = animation.duration;

  const componentSource = generateComponent(name, className, innerSvg, keyframes, duration);
  const specSource = generateSpec(name, className);

  writeFileSync(componentPath, componentSource);
  writeFileSync(specPath, specSource);

  console.log(`Rebuilt ${name}`);
}

console.log('Done.');
