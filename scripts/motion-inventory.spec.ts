import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
// @ts-expect-error — plain .mjs tooling module without type declarations.
import { REPORT_PATH, buildInventory, mappingSource, readCatalog, readReviews, renderMarkdown } from './motion-inventory.mjs';

type Inventory = ReturnType<typeof buildInventory>;

const verified = (grade: string) => ({ grade, status: 'verified', evidence: 'filmstrip' });

/** A tiny self-contained world, so flag logic is tested independently of the real catalog. */
function fixture(overrides: { catalog?: string[]; reviews?: object; explicit?: object; recipeNames?: string[] } = {}): Inventory {
  const explicit = overrides.explicit ?? { alpha: { recipe: 'r-alpha' }, ghost: { recipe: 'r-alpha' } };
  return buildInventory({
    catalog: overrides.catalog ?? ['alpha', 'beta', 'gamma'],
    reviews: overrides.reviews ?? {
      batches: [{ id: 'b1', status: 'complete', spec: 'docs/specs/x.md', icons: ['alpha'] }],
      reviews: { alpha: { batch: 'b1', family: 'f', recipe: 'r-alpha', story: 's', outline: verified('A'), filled: verified('B') } },
    },
    explicit,
    fallbacks: [{ match: (n: string) => n === 'beta', recipe: 'r-beta' }, { match: () => true, recipe: 'r-default' }],
    recipeNames: overrides.recipeNames ?? ['r-alpha', 'r-beta', 'r-default', 'r-unused'],
    resolve: (name: string) => {
      const e = (explicit as Record<string, { recipe: string }>)[name];
      if (e) return e;
      return { recipe: name === 'beta' ? 'r-beta' : 'r-default' };
    },
  });
}

describe('motion inventory', () => {
  it('classifies the mapping source of every icon', () => {
    const { rows } = fixture();
    expect(Object.fromEntries(rows.map((r: { name: string; source: string }) => [r.name, r.source]))).toEqual({
      alpha: 'explicit',
      beta: 'pattern',
      gamma: 'global-default',
    });
  });

  it('grades an icon by its weaker variant and certifies only verified A/B', () => {
    const { rows, stats } = fixture();
    const alpha = rows.find((r: { name: string }) => r.name === 'alpha');
    expect(alpha).toMatchObject({ grade: 'B', status: 'reviewed', certified: true });
    expect(stats).toMatchObject({ total: 3, reviewed: 1, unreviewed: 2, certified: 1, certifiedPercent: 33.3 });
  });

  it('leaves unreviewed icons ungraded instead of inferring a grade from the recipe', () => {
    const { rows } = fixture();
    expect(rows.filter((r: { status: string }) => r.status === 'unreviewed').map((r: { grade: unknown }) => r.grade)).toEqual([null, null]);
  });

  it('does not certify an icon whose filled variant was not verified', () => {
    const { rows, errors } = fixture({
      reviews: {
        batches: [{ id: 'b1', status: 'complete', spec: 'x', icons: ['alpha'] }],
        reviews: { alpha: { recipe: 'r-alpha', outline: verified('A'), filled: { grade: 'A', status: 'pending' } } },
      },
    });
    expect(rows[0]).toMatchObject({ status: 'incomplete', certified: false });
    expect(errors.join('\n')).toMatch(/b1 is complete but "alpha" has no complete outline \+ filled assessment/);
  });

  it('flags a missing assessment inside a completed batch', () => {
    const { errors } = fixture({
      reviews: { batches: [{ id: 'b1', status: 'complete', spec: 'x', icons: ['alpha', 'beta'] }], reviews: { alpha: { recipe: 'r-alpha', outline: verified('A'), filled: verified('A') } } },
    });
    expect(errors).toContain('b1 is complete but "beta" has no complete outline + filled assessment.');
  });

  it('flags a review that went stale because the recipe changed', () => {
    const { errors } = fixture({
      reviews: { batches: [], reviews: { alpha: { recipe: 'r-old', outline: verified('A'), filled: verified('A') } } },
    });
    expect(errors.join('\n')).toMatch(/alpha: reviewed with recipe "r-old" but now resolves to "r-alpha"/);
  });

  it('flags review records and batch entries for icons outside the catalog', () => {
    const { errors } = fixture({
      reviews: { batches: [{ id: 'b1', status: 'draft', spec: 'x', icons: ['zeta'] }], reviews: { zeta: { recipe: 'r-alpha', outline: verified('A'), filled: verified('A') } } },
    });
    expect(errors).toEqual(expect.arrayContaining([
      'zeta: review record for an icon that is not in the catalog.',
      'b1: lists "zeta", which is not in the catalog.',
    ]));
  });

  it('flags unknown recipes, stale mappings, unused recipes and global fallbacks', () => {
    const inventory = fixture({ explicit: { alpha: { recipe: 'r-alpha' }, ghost: { recipe: 'r-missing' } } });
    expect(inventory.errors).toContain('ICON_ANIMATIONS["ghost"]: unknown recipe "r-missing".');
    expect(inventory.staleMappings).toEqual(['ghost']);
    expect(inventory.unusedRecipes).toEqual(['r-unused']);
    expect(inventory.globalFallbacks).toEqual(['gamma']);
  });

  it('renders byte-identical Markdown for identical inputs', () => {
    expect(renderMarkdown(fixture())).toBe(renderMarkdown(fixture()));
  });
});

describe('motion inventory against the repository', () => {
  const inventory = buildInventory({ catalog: readCatalog(), reviews: readReviews() });

  it('has no consistency errors', () => {
    expect(inventory.errors).toEqual([]);
  });

  it('uses the full catalog as the coverage denominator', () => {
    expect(inventory.stats.total).toBe(readCatalog().length);
    expect(inventory.stats.reviewed + inventory.stats.incomplete + inventory.stats.unreviewed).toBe(inventory.stats.total);
  });

  it('matches the committed docs/ai/MOTION-INVENTORY.md (run `pnpm run motion:inventory`)', () => {
    expect(readFileSync(REPORT_PATH, 'utf8')).toBe(renderMarkdown(inventory));
  });

  it('maps a source for every icon', () => {
    expect(mappingSource('folder')).toBe('explicit');
    expect(inventory.rows.every((r: { source: string }) => ['explicit', 'pattern', 'global-default'].includes(r.source))).toBe(true);
  });
});
