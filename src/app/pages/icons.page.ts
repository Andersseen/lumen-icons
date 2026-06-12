import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';

import { LmnSearchIcon } from 'lumen-icons/search';
import type { LmnIconBackground, LmnIconSize, LmnIconTone, LmnIconVariant } from 'lumen-icons';

import { IconCardComponent, type IconCardInputs } from '../components/icon-card';
import {
  BACKGROUND_OPTIONS,
  BACKGROUND_TONE_OPTIONS,
  CATEGORY_FILTERS,
  TONE_OPTIONS,
  VARIANT_OPTIONS,
  type CategoryFilter,
} from '../components/icons/icon-control-options';
import { IconsMobileControlsComponent } from '../components/icons/icons-mobile-controls';
import { IconsSidebarComponent } from '../components/icons/icons-sidebar';
import { ICON_CATALOG } from '../data/icon-catalog';
import { ICON_CATEGORY_LABELS, type IconCategory } from '../data/icon-metadata';

@Component({
  selector: 'app-icons',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    LmnSearchIcon,
    IconCardComponent,
    IconsSidebarComponent,
    IconsMobileControlsComponent,
  ],
  templateUrl: './icons.page.html',
})
export default class IconsPageComponent {
  readonly search = signal('');
  readonly category = signal<CategoryFilter>('all');
  readonly size = signal<LmnIconSize>(24);
  readonly strokeWidth = signal(2);
  readonly animate = signal<boolean>(false);
  readonly tone = signal<LmnIconTone>('inherit');
  readonly variant = signal<LmnIconVariant>('outline');
  readonly background = signal<LmnIconBackground>('none');
  readonly backgroundTone = signal<LmnIconTone>('primary');
  readonly padding = signal(8);
  readonly radius = signal(10);

  readonly totalIcons = ICON_CATALOG.length;
  readonly categoryFilters = CATEGORY_FILTERS;
  readonly toneOptions = TONE_OPTIONS;
  readonly backgroundToneOptions = BACKGROUND_TONE_OPTIONS;
  readonly variantOptions = VARIANT_OPTIONS;
  readonly backgroundOptions = BACKGROUND_OPTIONS;

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

  readonly selectedCategoryLabel = computed(() => (
    this.category() === 'all' ? 'All categories' : this.categoryLabel(this.category() as IconCategory)
  ));
  readonly selectedTone = computed(() => (
    this.toneOptions.find(color => color.value === this.tone()) ?? this.toneOptions[0]
  ));
  readonly selectedVariant = computed(() => (
    this.variantOptions.find(option => option.value === this.variant()) ?? this.variantOptions[0]
  ));
  readonly selectedBackground = computed(() => (
    this.backgroundOptions.find(option => option.value === this.background()) ?? this.backgroundOptions[0]
  ));

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

  categoryLabel(category: IconCategory): string {
    return ICON_CATEGORY_LABELS[category];
  }

  clearFilters(): void {
    this.search.set('');
    this.category.set('all');
  }
}
