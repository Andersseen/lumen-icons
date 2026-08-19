import { Injectable, computed, signal } from '@angular/core';
import type { LmnIconBackground, LmnIconSize, LmnIconTone, LmnIconVariant } from 'lumen-icons';

import type { IconCardInputs } from '../components/icon-card';
import type { CategoryFilter } from '../components/icons/icon-control-options';
import { ICON_CATALOG } from '../data/icon-catalog';
import { ICON_CATEGORY_LABELS, type IconCategory } from '../data/icon-metadata';

/**
 * Every default the catalog playground starts from, in one place.
 *
 * These used to be re-typed in the page, the desktop sidebar, the mobile
 * controls and again in `resetDemo()`, so a change meant touching four files.
 */
export const CATALOG_DEFAULTS = {
  search: '',
  category: 'all' as CategoryFilter,
  size: 24 as LmnIconSize,
  strokeWidth: 2,
  animate: false,
  tone: 'inherit' as LmnIconTone,
  variant: 'outline' as LmnIconVariant,
  background: 'none' as LmnIconBackground,
  backgroundTone: 'primary' as LmnIconTone,
  padding: 8,
  radius: 10 as number | string,
} as const;

@Injectable()
export class IconCatalogStore {
  readonly search = signal<string>(CATALOG_DEFAULTS.search);
  readonly category = signal<CategoryFilter>(CATALOG_DEFAULTS.category);
  readonly size = signal<LmnIconSize>(CATALOG_DEFAULTS.size);
  readonly strokeWidth = signal<number>(CATALOG_DEFAULTS.strokeWidth);
  readonly animate = signal<boolean>(CATALOG_DEFAULTS.animate);
  readonly tone = signal<LmnIconTone>(CATALOG_DEFAULTS.tone);
  readonly variant = signal<LmnIconVariant>(CATALOG_DEFAULTS.variant);
  readonly background = signal<LmnIconBackground>(CATALOG_DEFAULTS.background);
  readonly backgroundTone = signal<LmnIconTone>(CATALOG_DEFAULTS.backgroundTone);
  readonly padding = signal<number>(CATALOG_DEFAULTS.padding);
  readonly radius = signal<number | string>(CATALOG_DEFAULTS.radius);

  readonly totalIcons = ICON_CATALOG.length;

  readonly filteredIcons = computed(() => {
    const term = this.search().toLowerCase().trim();
    const category = this.category();

    return ICON_CATALOG.filter(icon => {
      const matchesCategory = category === 'all' || icon.category === category;
      const searchable = [
        icon.name,
        icon.selector,
        icon.category,
        this.categoryLabel(icon.category),
        ...icon.aliases,
      ]
        .join(' ')
        .toLowerCase();

      return matchesCategory && (!term || searchable.includes(term));
    });
  });

  readonly iconInputs = computed((): IconCardInputs => ({
    size: this.size(),
    strokeWidth: this.strokeWidth(),
    animate: this.animate(),
    tone: this.background() === 'solid' ? 'inherit' : this.tone(),
    variant: this.variant(),
    background: this.background(),
    backgroundTone: this.backgroundTone(),
    padding: this.background() === 'none' ? 0 : this.padding(),
    radius: this.radius(),
  }));

  /** Whether anything differs from the defaults — drives the reset affordance. */
  readonly isPristine = computed(() =>
    this.search() === CATALOG_DEFAULTS.search
    && this.category() === CATALOG_DEFAULTS.category
    && this.size() === CATALOG_DEFAULTS.size
    && this.strokeWidth() === CATALOG_DEFAULTS.strokeWidth
    && this.animate() === CATALOG_DEFAULTS.animate
    && this.tone() === CATALOG_DEFAULTS.tone
    && this.variant() === CATALOG_DEFAULTS.variant
    && this.background() === CATALOG_DEFAULTS.background
    && this.backgroundTone() === CATALOG_DEFAULTS.backgroundTone
    && this.padding() === CATALOG_DEFAULTS.padding
    && this.radius() === CATALOG_DEFAULTS.radius,
  );

  categoryLabel(category: IconCategory): string {
    return ICON_CATEGORY_LABELS[category];
  }

  clearFilters(): void {
    this.search.set(CATALOG_DEFAULTS.search);
    this.category.set(CATALOG_DEFAULTS.category);
  }

  reset(): void {
    this.search.set(CATALOG_DEFAULTS.search);
    this.category.set(CATALOG_DEFAULTS.category);
    this.size.set(CATALOG_DEFAULTS.size);
    this.strokeWidth.set(CATALOG_DEFAULTS.strokeWidth);
    this.animate.set(CATALOG_DEFAULTS.animate);
    this.tone.set(CATALOG_DEFAULTS.tone);
    this.variant.set(CATALOG_DEFAULTS.variant);
    this.background.set(CATALOG_DEFAULTS.background);
    this.backgroundTone.set(CATALOG_DEFAULTS.backgroundTone);
    this.padding.set(CATALOG_DEFAULTS.padding);
    this.radius.set(CATALOG_DEFAULTS.radius);
  }
}
