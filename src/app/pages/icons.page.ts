import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { VoltInput } from '@voltui/components';

import { LmnSearchIcon } from '@lumen/icons/search';
import type { LmnIconSize } from '@lumen/icons';

import { IconCardComponent, type IconCardInputs } from '../components/icon-card';
import { IconsSidebarComponent } from '../components/icons/icons-sidebar';
import { AnimationPickerComponent } from '../components/shared/animation-picker';
import { SizePickerComponent } from '../components/shared/size-picker';
import { ICON_CATALOG } from '../data/icon-catalog';
import { ICON_CATEGORIES, ICON_CATEGORY_LABELS, type IconCategory } from '../data/icon-metadata';

type CategoryFilter = IconCategory | 'all';

interface PreviewColorOption {
  readonly value: string;
  readonly label: string;
  readonly swatch: string;
}

@Component({
  selector: 'app-icons',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    VoltInput,
    LmnSearchIcon,
    IconCardComponent,
    IconsSidebarComponent,
    SizePickerComponent,
    AnimationPickerComponent,
  ],
  template: `
    <!-- Page header -->
    <div class="border-b border-border bg-background dark:border-border dark:bg-background">
      <div class="mx-auto max-w-6xl px-4 py-8 sm:py-10">
        <div class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 class="text-3xl font-bold tracking-tight text-foreground">Icons</h1>
            <p class="mt-1.5 max-w-2xl text-muted-foreground">
              {{ filteredIcons().length }} of {{ totalIcons }} icons
              &middot; Search by name, alias, selector or category.
            </p>
          </div>

          <div class="flex flex-wrap gap-2 text-xs text-muted-foreground" aria-label="Catalog summary">
            <span class="rounded-md border border-border px-2.5 py-1">
              {{ selectedCategoryLabel() }}
            </span>
            <span class="rounded-md border border-border px-2.5 py-1">
              {{ size() }}px
            </span>
            <span class="rounded-md border border-border px-2.5 py-1">
              {{ strokeWidth() }} stroke
            </span>
            <span class="rounded-md border border-border px-2.5 py-1">
              {{ selectedPreviewColor().label }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <div class="mx-auto flex max-w-6xl gap-8 px-4 py-8">

      <!-- Desktop sidebar (model two-way binding) -->
      <app-icons-sidebar
        [(search)]="search"
        [(category)]="category"
        [(size)]="size"
        [(strokeWidth)]="strokeWidth"
        [(animate)]="animate"
        [(previewColor)]="previewColor"
        [categories]="categoryFilters"
        [previewColors]="previewColors"
        [resultCount]="filteredIcons().length"
        [totalCount]="totalIcons"
      />

      <!-- Icon grid -->
      <main class="flex-1" aria-label="Icon grid">

        <!-- Mobile controls -->
        <div class="mb-5 space-y-4 lg:hidden">
          <volt-input
            aria-label="Search icons"
            placeholder="Search icons..."
            [value]="search()"
            (valueChange)="search.set($event)"
            class="max-w-80"
          />
          <div class="flex gap-2 overflow-x-auto pb-1" role="radiogroup" aria-label="Icon category">
            @for (item of categoryFilters; track item.value) {
              <button
                type="button"
                role="radio"
                [attr.aria-checked]="category() === item.value"
                class="shrink-0 rounded-md border px-3 py-1.5 text-sm font-medium transition-colors"
                [class]="category() === item.value
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-border text-secondary-foreground hover:border-primary hover:text-foreground'"
                (click)="category.set(item.value)"
              >
                {{ item.label }}
              </button>
            }
          </div>
          <div class="flex flex-wrap items-center gap-3">
            <app-size-picker [(size)]="size" ariaLabel="Icon size" />
            <app-animation-picker [(animate)]="animate" ariaLabel="Animation" />
          </div>
          <div class="flex flex-wrap gap-2" role="radiogroup" aria-label="Preview color">
            @for (item of previewColors; track item.value) {
              <button
                type="button"
                role="radio"
                [attr.aria-checked]="previewColor() === item.value"
                class="h-8 w-8 rounded-md border transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                [class]="previewColor() === item.value ? 'border-primary ring-2 ring-primary/30' : 'border-border'"
                [style.background]="item.swatch"
                [attr.aria-label]="item.label"
                (click)="previewColor.set(item.value)"
              ></button>
            }
          </div>
        </div>

        @if (filteredIcons().length > 0) {
          <p class="sr-only" aria-live="polite">
            Showing {{ filteredIcons().length }} icons for {{ selectedCategoryLabel() }}.
          </p>

          <div class="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">
            @for (icon of filteredIcons(); track icon.name) {
              <app-icon-card
                [icon]="icon"
                [iconInputs]="iconInputs()"
                [categoryLabel]="categoryLabel(icon.category)"
                [previewColor]="previewColor()"
              />
            }
          </div>
        } @else {
          <div class="flex flex-col items-center gap-3 py-24 text-center">
            <div class="text-muted-foreground dark:text-foreground">
              <lmn-search [size]="32" [strokeWidth]="1.5" />
            </div>
            <p class="text-sm text-muted-foreground">
              No icons matching <strong class="text-foreground">"{{ search() || selectedCategoryLabel() }}"</strong>
            </p>
            <button type="button" class="text-sm text-primary hover:underline dark:text-primary" (click)="clearFilters()">
              Clear filters
            </button>
          </div>
        }

      </main>
    </div>
  `,
})
export default class IconsPageComponent {
  readonly search = signal('');
  readonly category = signal<CategoryFilter>('all');
  readonly size = signal<LmnIconSize>(24);
  readonly strokeWidth = signal(2);
  readonly animate = signal<boolean>(false);
  readonly previewColor = signal('inherit');

  readonly totalIcons = ICON_CATALOG.length;
  readonly categoryFilters: readonly { value: CategoryFilter; label: string }[] = [
    { value: 'all', label: 'All' },
    ...ICON_CATEGORIES,
  ];
  readonly previewColors: readonly PreviewColorOption[] = [
    { value: 'inherit', label: 'Default', swatch: 'linear-gradient(135deg, #94a3b8, #e2e8f0)' },
    { value: 'oklch(0.6056 0.2189 292.7172)', label: 'Primary', swatch: 'oklch(0.6056 0.2189 292.7172)' },
    { value: 'oklch(0.6959 0.1491 162.4796)', label: 'Success', swatch: 'oklch(0.6959 0.1491 162.4796)' },
    { value: 'oklch(0.7686 0.1647 70.0804)', label: 'Warning', swatch: 'oklch(0.7686 0.1647 70.0804)' },
    { value: 'oklch(0.6368 0.2078 25.3313)', label: 'Danger', swatch: 'oklch(0.6368 0.2078 25.3313)' },
    { value: 'oklch(0.6231 0.1880 259.8145)', label: 'Info', swatch: 'oklch(0.6231 0.1880 259.8145)' },
  ];

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
  readonly selectedPreviewColor = computed(() => (
    this.previewColors.find(color => color.value === this.previewColor()) ?? this.previewColors[0]
  ));

  readonly iconInputs = computed((): IconCardInputs => ({
    size: this.size(),
    strokeWidth: this.strokeWidth(),
    animate: this.animate(),
  }));

  categoryLabel(category: IconCategory): string {
    return ICON_CATEGORY_LABELS[category];
  }

  clearFilters(): void {
    this.search.set('');
    this.category.set('all');
  }
}
