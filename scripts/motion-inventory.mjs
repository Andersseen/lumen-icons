#!/usr/bin/env node
/**
 * Semantic-motion inventory — internal tooling, not part of the package.
 *
 * Joins three sources into one deterministic report:
 *   1. the real icon catalog (packages/icons/src/icons/*.ts),
 *   2. the code's own recipe resolution (resolveAnimation / ICON_ANIMATIONS /
 *      FALLBACK_ANIMATIONS / RECIPE_NAMES from scripts/animations.mjs),
 *   3. the hand-maintained review record (docs/ai/motion-reviews.json).
 *
 *   node scripts/motion-inventory.mjs           # rewrite docs/ai/MOTION-INVENTORY.md
 *   node scripts/motion-inventory.mjs --check   # fail if stale or inconsistent
 *
 * Only (3) carries judgement. Everything technical is derived, so the report
 * cannot drift from the code without `--check` (and the unit test) failing.
 */
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { FALLBACK_ANIMATIONS, ICON_ANIMATIONS, RECIPE_NAMES, resolveAnimation } from './animations.mjs';

// String form on purpose: Vitest's jsdom environment replaces the global URL
// class, and Node's fileURLToPath rejects jsdom URL instances.
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
export const REVIEWS_PATH = join(root, 'docs/ai/motion-reviews.json');
export const REPORT_PATH = join(root, 'docs/ai/MOTION-INVENTORY.md');

export const GRADES = {
  A: 'Strongly semantic',
  B: 'Semantic family',
  C: 'Acceptable generic',
  D: 'Weak / generic fallback',
  E: 'Wrong semantics',
};
const GRADE_ORDER = ['A', 'B', 'C', 'D', 'E'];

/** Icon names exactly as the generator sees them. */
export function readCatalog(iconsDir = join(root, 'packages/icons/src/icons')) {
  return readdirSync(iconsDir)
    .filter((f) => f.endsWith('.ts') && !f.endsWith('.spec.ts') && f !== 'index.ts')
    .map((f) => f.replace(/\.ts$/, ''))
    .sort();
}

export function readReviews(path = REVIEWS_PATH) {
  return JSON.parse(readFileSync(path, 'utf8'));
}

/** explicit | pattern | global-default — how resolveAnimation() reached its recipe. */
export function mappingSource(name, explicit = ICON_ANIMATIONS, fallbacks = FALLBACK_ANIMATIONS) {
  if (Object.hasOwn(explicit, name)) return 'explicit';
  const index = fallbacks.findIndex((fallback) => fallback.match(name.toLowerCase()));
  return index === -1 || index === fallbacks.length - 1 ? 'global-default' : 'pattern';
}

/** The weaker of two grades (E is weakest). */
function weaker(a, b) {
  return GRADE_ORDER[Math.max(GRADE_ORDER.indexOf(a), GRADE_ORDER.indexOf(b))];
}

/**
 * @param {{ catalog: string[], reviews: object, resolve?: Function, explicit?: object,
 *   fallbacks?: object[], recipeNames?: readonly string[] }} input
 */
export function buildInventory({
  catalog,
  reviews,
  resolve: resolveFn = resolveAnimation,
  explicit = ICON_ANIMATIONS,
  fallbacks = FALLBACK_ANIMATIONS,
  recipeNames = RECIPE_NAMES,
}) {
  const errors = [];
  const warnings = [];
  const known = new Set(recipeNames);
  const inCatalog = new Set(catalog);
  const records = reviews.reviews ?? {};

  const rows = catalog.map((name) => {
    const { recipe } = resolveFn(name);
    const source = mappingSource(name, explicit, fallbacks);
    const review = records[name];
    const row = { name, recipe, source, family: null, status: 'unreviewed', grade: null, story: null, outline: null, filled: null, certified: false };
    if (!review) return row;

    const outline = review.outline ?? {};
    const filled = review.filled ?? {};
    const bothVerified = outline.status === 'verified' && filled.status === 'verified';
    const grade = outline.grade && filled.grade ? weaker(outline.grade, filled.grade) : null;
    Object.assign(row, {
      family: review.family ?? null,
      status: bothVerified && grade ? 'reviewed' : 'incomplete',
      grade,
      story: review.story ?? null,
      outline: outline.status ?? 'missing',
      filled: filled.status ?? 'missing',
      certified: bothVerified && (grade === 'A' || grade === 'B'),
    });

    if (review.recipe !== recipe) {
      errors.push(`${name}: reviewed with recipe "${review.recipe}" but now resolves to "${recipe}" — re-review it.`);
    }
    for (const [variant, entry] of [['outline', outline], ['filled', filled]]) {
      if (entry.grade && !GRADES[entry.grade]) errors.push(`${name}: unknown ${variant} grade "${entry.grade}".`);
      if (entry.status === 'verified' && !entry.evidence) errors.push(`${name}: ${variant} marked verified without evidence.`);
    }
    return row;
  });

  for (const name of Object.keys(records)) {
    if (!inCatalog.has(name)) errors.push(`${name}: review record for an icon that is not in the catalog.`);
  }
  for (const batch of reviews.batches ?? []) {
    for (const name of batch.icons) {
      if (!inCatalog.has(name)) errors.push(`${batch.id}: lists "${name}", which is not in the catalog.`);
      const row = rows.find((r) => r.name === name);
      if (batch.status === 'complete' && row && row.status !== 'reviewed') {
        errors.push(`${batch.id} is complete but "${name}" has no complete outline + filled assessment.`);
      }
    }
  }

  for (const [name, entry] of Object.entries(explicit)) {
    if (!known.has(entry.recipe)) errors.push(`ICON_ANIMATIONS["${name}"]: unknown recipe "${entry.recipe}".`);
  }
  fallbacks.forEach((fallback, index) => {
    if (!known.has(fallback.recipe)) errors.push(`FALLBACK_ANIMATIONS[${index}]: unknown recipe "${fallback.recipe}".`);
  });

  const staleMappings = Object.keys(explicit).filter((name) => !inCatalog.has(name)).sort();
  const used = new Set(rows.map((row) => row.recipe));
  const unusedRecipes = [...recipeNames].filter((name) => !used.has(name)).sort();
  const globalFallbacks = rows.filter((row) => row.source === 'global-default').map((row) => row.name);
  if (staleMappings.length) warnings.push(`${staleMappings.length} ICON_ANIMATIONS keys name no catalog icon.`);
  if (unusedRecipes.length) warnings.push(`${unusedRecipes.length} recipes are not used by any catalog icon.`);
  if (globalFallbacks.length) warnings.push(`${globalFallbacks.length} icons fall through to the global default recipe.`);

  const count = (predicate) => rows.filter(predicate).length;
  const total = rows.length;
  const certified = count((r) => r.certified);
  const stats = {
    total,
    explicit: count((r) => r.source === 'explicit'),
    pattern: count((r) => r.source === 'pattern'),
    globalDefault: count((r) => r.source === 'global-default'),
    reviewed: count((r) => r.status === 'reviewed'),
    incomplete: count((r) => r.status === 'incomplete'),
    unreviewed: count((r) => r.status === 'unreviewed'),
    certified,
    weak: count((r) => r.status === 'reviewed' && ['C', 'D', 'E'].includes(r.grade)),
    byGrade: Object.fromEntries(GRADE_ORDER.map((g) => [g, count((r) => r.status === 'reviewed' && r.grade === g)])),
    certifiedPercent: total ? Math.round((certified / total) * 1000) / 10 : 0,
    recipes: recipeNames.length,
  };

  return { rows, stats, errors, warnings, staleMappings, unusedRecipes, globalFallbacks, batches: reviews.batches ?? [], reviews: records };
}

const cell = (value) => (value === null || value === undefined || value === '' ? '—' : String(value).replace(/\|/g, '\\|'));

/** Deterministic Markdown: same inputs → byte-identical output (no dates, sorted lists). */
export function renderMarkdown(inventory) {
  const { stats, rows, batches, reviews } = inventory;
  const lines = [
    '# Semantic motion inventory',
    '',
    '> **Generated** by `node scripts/motion-inventory.mjs` — do not edit by hand.',
    '> Judgements live in [`motion-reviews.json`](motion-reviews.json); everything else is',
    '> derived from the catalog and `resolveAnimation()`. `--check` (and its unit test) fails',
    '> when this file is stale or the record is inconsistent.',
    '',
    '## How to read this',
    '',
    'Grades describe whether an icon\'s motion communicates its meaning, mechanism or state',
    'change — not merely whether it moves. An icon\'s grade is the weaker of its outline and',
    'filled grades, and it counts as **certified** only when both variants were visually',
    'verified (filmstrip at 24 px; see `scripts/motion-filmstrip.mjs`) and the grade is A or B.',
    'Icons nobody has reviewed are `unreviewed` — they are **not** graded by recipe name.',
    '',
    '| Grade | Meaning |',
    '|---|---|',
    ...GRADE_ORDER.map((g) => `| ${g} | ${GRADES[g]} |`),
    '',
    '## Summary',
    '',
    '| Metric | Value |',
    '|---|---|',
    `| Catalog icons | ${stats.total} |`,
    `| Recipes | ${stats.recipes} |`,
    `| Explicit mappings | ${stats.explicit} |`,
    `| Pattern-fallback mappings | ${stats.pattern} |`,
    `| Global-default mappings | ${stats.globalDefault} |`,
    `| Reviewed (outline + filled) | ${stats.reviewed} |`,
    `| Review incomplete | ${stats.incomplete} |`,
    `| Unreviewed | ${stats.unreviewed} |`,
    `| Certified A/B | ${stats.certified} (A ${stats.byGrade.A} · B ${stats.byGrade.B}) |`,
    `| Reviewed C/D/E | ${stats.weak} (C ${stats.byGrade.C} · D ${stats.byGrade.D} · E ${stats.byGrade.E}) |`,
    `| **Certified semantic coverage** | **${stats.certifiedPercent}%** (${stats.certified} / ${stats.total}) |`,
    '',
    '## Batches',
    '',
    '| Batch | Status | Icons | Spec |',
    '|---|---|---|---|',
    ...batches.map((b) => `| ${b.id} | ${b.status} | ${b.icons.length} | [${b.spec.split('/').pop()}](../${b.spec.replace(/^docs\//, '')}) |`),
    '',
  ];

  for (const batch of batches) {
    lines.push(`### ${batch.id}`, '', '| Icon | Before | After | Grade (outline / filled) | Story |', '|---|---|---|---|---|');
    for (const name of batch.icons) {
      const review = reviews[name] ?? {};
      const row = rows.find((r) => r.name === name);
      const before = review.before ? `${review.before.recipe} (${review.before.grade})` : '—';
      const grades = `${cell(row?.grade)} (${cell(review.outline?.grade)} / ${cell(review.filled?.grade)})`;
      lines.push(`| \`${name}\` | ${cell(before)} | ${cell(row?.recipe)} | ${grades} | ${cell(review.story)} |`);
    }
    lines.push('');
  }

  lines.push('## Flags', '');
  lines.push(inventory.errors.length ? '**Errors**' : 'Errors: none.', '');
  for (const error of inventory.errors) lines.push(`- ${error}`);
  if (inventory.errors.length) lines.push('');
  const list = (title, items) => {
    lines.push(`**${title}** (${items.length})`, '', items.length ? items.map((i) => `\`${i}\``).join(', ') : 'None.', '');
  };
  list('Stale mappings — ICON_ANIMATIONS keys with no catalog icon', inventory.staleMappings);
  list('Unused recipes', inventory.unusedRecipes);
  list('Global-default fallbacks', inventory.globalFallbacks);

  lines.push('## All icons', '', '| Icon | Recipe | Source | Family | Status | Grade | Outline | Filled |', '|---|---|---|---|---|---|---|---|');
  for (const r of rows) {
    lines.push(`| \`${r.name}\` | ${r.recipe} | ${r.source} | ${cell(r.family)} | ${r.status} | ${cell(r.grade)} | ${cell(r.outline)} | ${cell(r.filled)} |`);
  }
  lines.push('');
  return lines.join('\n');
}

function main() {
  const check = process.argv.includes('--check');
  const inventory = buildInventory({ catalog: readCatalog(), reviews: readReviews() });
  const markdown = renderMarkdown(inventory);

  for (const warning of inventory.warnings) console.warn(`warn: ${warning}`);
  for (const error of inventory.errors) console.error(`error: ${error}`);
  const { stats } = inventory;
  console.log(`${stats.total} icons · ${stats.reviewed} reviewed · ${stats.certified} certified A/B · ${stats.certifiedPercent}% certified coverage`);

  if (check) {
    let committed = '';
    try { committed = readFileSync(REPORT_PATH, 'utf8'); } catch { /* missing counts as stale */ }
    if (committed !== markdown) {
      console.error('error: docs/ai/MOTION-INVENTORY.md is stale — run `pnpm run motion:inventory`.');
      process.exitCode = 1;
    }
    if (inventory.errors.length) process.exitCode = 1;
    return;
  }
  writeFileSync(REPORT_PATH, markdown);
  console.log(`wrote ${REPORT_PATH}`);
  if (inventory.errors.length) process.exitCode = 1;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) main();
