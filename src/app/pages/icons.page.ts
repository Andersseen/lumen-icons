import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { VoltInput, VoltSlider } from '@voltui/components';

import { LmnSearchIcon } from 'lumen-icons/search';
import type { LmnIconBackground, LmnIconSize, LmnIconTone, LmnIconVariant } from 'lumen-icons';

import { IconCardComponent, type IconCardInputs } from '../components/icon-card';
import { IconsSidebarComponent } from '../components/icons/icons-sidebar';
import { AnimationPickerComponent } from '../components/shared/animation-picker';
import { SizePickerComponent } from '../components/shared/size-picker';
import { ICON_CATALOG } from '../data/icon-catalog';
import { ICON_CATEGORIES, ICON_CATEGORY_LABELS, type IconCategory } from '../data/icon-metadata';

type CategoryFilter = IconCategory | 'all';

interface ToneOption {
  readonly value: LmnIconTone;
  readonly label: string;
  readonly swatch: string;
}

interface ControlOption<T extends string> {
  readonly value: T;
  readonly label: string;
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
    VoltSlider,
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
              {{ background() === 'solid' ? 'Auto foreground' : selectedTone().label }}
            </span>
            <span class="rounded-md border border-border px-2.5 py-1">
              {{ selectedVariant().label }}
            </span>
            <span class="rounded-md border border-border px-2.5 py-1">
              {{ selectedBackground().label }} bg
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
        [(tone)]="tone"
        [(variant)]="variant"
        [(background)]="background"
        [(backgroundTone)]="backgroundTone"
        [(padding)]="padding"
        [(radius)]="radius"
        [categories]="categoryFilters"
        [toneOptions]="toneOptions"
        [variantOptions]="variantOptions"
        [backgroundOptions]="backgroundOptions"
        [backgroundToneOptions]="backgroundToneOptions"
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
          <div class="flex flex-wrap gap-2" role="radiogroup" aria-label="Icon variant">
            @for (item of variantOptions; track item.value) {
              <button
                type="button"
                role="radio"
                [attr.aria-checked]="variant() === item.value"
                class="rounded-md border px-3 py-1.5 text-sm font-medium transition-colors"
                [class]="variant() === item.value
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-border text-secondary-foreground hover:border-primary hover:text-foreground'"
                (click)="variant.set(item.value)"
              >
                {{ item.label }}
              </button>
            }
          </div>
          <div class="flex flex-wrap gap-2" role="radiogroup" aria-label="Icon background">
            @for (item of backgroundOptions; track item.value) {
              <button
                type="button"
                role="radio"
                [attr.aria-checked]="background() === item.value"
                class="rounded-md border px-3 py-1.5 text-sm font-medium transition-colors"
                [class]="background() === item.value
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-border text-secondary-foreground hover:border-primary hover:text-foreground'"
                (click)="background.set(item.value)"
              >
                {{ item.label }}
              </button>
            }
          </div>
          @if (background() !== 'solid') {
            <div class="flex flex-wrap gap-2" role="radiogroup" aria-label="Icon tone">
              @for (item of toneOptions; track item.value) {
                <button
                  type="button"
                  role="radio"
                  [attr.aria-checked]="tone() === item.value"
                  class="h-8 w-8 rounded-md border transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  [class]="tone() === item.value ? 'border-primary ring-2 ring-primary/30' : 'border-border'"
                  [style.background]="item.swatch"
                  [attr.aria-label]="item.label"
                  [title]="item.label"
                  (click)="tone.set(item.value)"
                ></button>
              }
            </div>
          } @else {
            <p class="rounded-md border border-border bg-secondary px-3 py-2 text-xs text-secondary-foreground">
              Solid background uses the theme foreground automatically.
            </p>
          }
          @if (background() !== 'none') {
            <div class="flex flex-wrap gap-2" role="radiogroup" aria-label="Background tone">
              @for (item of backgroundToneOptions; track item.value) {
                <button
                  type="button"
                  role="radio"
                  [attr.aria-checked]="backgroundTone() === item.value"
                  class="h-8 w-8 rounded-md border transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  [class]="backgroundTone() === item.value ? 'border-primary ring-2 ring-primary/30' : 'border-border'"
                  [style.background]="item.swatch"
                  [attr.aria-label]="item.label"
                  [title]="item.label"
                  (click)="backgroundTone.set(item.value)"
                ></button>
              }
            </div>
            <div class="grid gap-4 sm:grid-cols-2">
              <div>
                <div class="mb-1.5 flex items-center justify-between">
                  <label for="mobile-padding-slider" class="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Padding
                  </label>
                  <span class="tabular-nums text-sm font-medium text-foreground">{{ padding() }}px</span>
                </div>
                <volt-slider
                  id="mobile-padding-slider"
                  [value]="padding()"
                  (valueChange)="padding.set($event)"
                  [min]="0"
                  [max]="16"
                  [step]="1"
                />
              </div>
              <div>
                <div class="mb-1.5 flex items-center justify-between">
                  <label for="mobile-radius-slider" class="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Radius
                  </label>
                  <span class="tabular-nums text-sm font-medium text-foreground">{{ radius() }}px</span>
                </div>
                <volt-slider
                  id="mobile-radius-slider"
                  [value]="radius()"
                  (valueChange)="radius.set($event)"
                  [min]="0"
                  [max]="24"
                  [step]="1"
                />
              </div>
            </div>
          }
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
  readonly tone = signal<LmnIconTone>('inherit');
  readonly variant = signal<LmnIconVariant>('outline');
  readonly background = signal<LmnIconBackground>('none');
  readonly backgroundTone = signal<LmnIconTone>('primary');
  readonly padding = signal(8);
  readonly radius = signal(10);

  readonly totalIcons = ICON_CATALOG.length;
  readonly categoryFilters: readonly { value: CategoryFilter; label: string }[] = [
    { value: 'all', label: 'All' },
    ...ICON_CATEGORIES,
  ];
  readonly toneOptions: readonly ToneOption[] = [
    { value: 'inherit', label: 'Inherit', swatch: 'linear-gradient(135deg, var(--muted-foreground), var(--foreground))' },
    { value: 'foreground', label: 'Foreground', swatch: 'var(--foreground)' },
    { value: 'muted', label: 'Muted', swatch: 'var(--muted-foreground)' },
    { value: 'primary', label: 'Primary', swatch: 'var(--primary)' },
    { value: 'accent', label: 'Accent', swatch: 'var(--accent)' },
    { value: 'success', label: 'Success', swatch: 'var(--success)' },
    { value: 'info', label: 'Info', swatch: 'var(--info)' },
    { value: 'warning', label: 'Warning', swatch: 'var(--warning)' },
    { value: 'destructive', label: 'Destructive', swatch: 'var(--destructive)' },
  ];
  readonly backgroundToneOptions: readonly ToneOption[] = [
    { value: 'primary', label: 'Primary background', swatch: 'var(--primary)' },
    { value: 'secondary', label: 'Secondary background', swatch: 'var(--secondary)' },
    { value: 'accent', label: 'Accent background', swatch: 'var(--accent)' },
    { value: 'success', label: 'Success background', swatch: 'var(--success)' },
    { value: 'warning', label: 'Warning background', swatch: 'var(--warning)' },
    { value: 'destructive', label: 'Destructive background', swatch: 'var(--destructive)' },
  ];
  readonly variantOptions: readonly ControlOption<LmnIconVariant>[] = [
    { value: 'outline', label: 'Outline' },
    { value: 'filled', label: 'Filled' },
  ];
  readonly backgroundOptions: readonly ControlOption<LmnIconBackground>[] = [
    { value: 'none', label: 'None' },
    { value: 'soft', label: 'Soft' },
    { value: 'solid', label: 'Solid' },
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
