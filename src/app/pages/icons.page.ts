import {
  ChangeDetectionStrategy,
  Component,
  computed,
  signal,
} from '@angular/core';
import { VoltInput } from '@voltui/components';

import { LmnAlertCircleIcon } from '@lumen/icons/icons/alert-circle';
import { LmnArrowLeftIcon } from '@lumen/icons/icons/arrow-left';
import { LmnArrowRightIcon } from '@lumen/icons/icons/arrow-right';
import { LmnCheckIcon } from '@lumen/icons/icons/check';
import { LmnHeartIcon } from '@lumen/icons/icons/heart';
import { LmnInfoIcon } from '@lumen/icons/icons/info';
import { LmnMenuIcon } from '@lumen/icons/icons/menu';
import { LmnSearchIcon } from '@lumen/icons/icons/search';
import { LmnStarIcon } from '@lumen/icons/icons/star';
import { LmnXIcon } from '@lumen/icons/icons/x';
import type { LmnIconAnimate, LmnIconSize } from '@lumen/icons';

import { IconCardComponent } from '../components/icon-card';
import type { IconEntry } from '../types/icon-entry.type';

const ALL_ICONS: IconEntry[] = [
  { name: 'check',        selector: 'lmn-check',        component: LmnCheckIcon,        importStr: "import { LmnCheckIcon } from '@lumen/icons/icons/check';" },
  { name: 'x',            selector: 'lmn-x',            component: LmnXIcon,            importStr: "import { LmnXIcon } from '@lumen/icons/icons/x';" },
  { name: 'arrow-right',  selector: 'lmn-arrow-right',  component: LmnArrowRightIcon,   importStr: "import { LmnArrowRightIcon } from '@lumen/icons/icons/arrow-right';" },
  { name: 'arrow-left',   selector: 'lmn-arrow-left',   component: LmnArrowLeftIcon,    importStr: "import { LmnArrowLeftIcon } from '@lumen/icons/icons/arrow-left';" },
  { name: 'search',       selector: 'lmn-search',       component: LmnSearchIcon,       importStr: "import { LmnSearchIcon } from '@lumen/icons/icons/search';" },
  { name: 'menu',         selector: 'lmn-menu',         component: LmnMenuIcon,         importStr: "import { LmnMenuIcon } from '@lumen/icons/icons/menu';" },
  { name: 'alert-circle', selector: 'lmn-alert-circle', component: LmnAlertCircleIcon,  importStr: "import { LmnAlertCircleIcon } from '@lumen/icons/icons/alert-circle';" },
  { name: 'info',         selector: 'lmn-info',         component: LmnInfoIcon,         importStr: "import { LmnInfoIcon } from '@lumen/icons/icons/info';" },
  { name: 'star',         selector: 'lmn-star',         component: LmnStarIcon,         importStr: "import { LmnStarIcon } from '@lumen/icons/icons/star';" },
  { name: 'heart',        selector: 'lmn-heart',        component: LmnHeartIcon,        importStr: "import { LmnHeartIcon } from '@lumen/icons/icons/heart';" },
];

const SIZES: LmnIconSize[] = [12, 14, 16, 20, 24, 32];
const ANIMATIONS: { value: LmnIconAnimate; label: string }[] = [
  { value: 'none',   label: 'None' },
  { value: 'spin',   label: 'Spin' },
  { value: 'pulse',  label: 'Pulse' },
  { value: 'bounce', label: 'Bounce' },
  { value: 'ping',   label: 'Ping' },
];

@Component({
  selector: 'app-icons',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [VoltInput, IconCardComponent],
  template: `
    <!-- Page header -->
    <div class="border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
      <div class="mx-auto max-w-6xl px-4 py-10">
        <h1 class="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Icons</h1>
        <p class="mt-1.5 text-slate-500 dark:text-slate-400">
          {{ filteredIcons().length }} icon{{ filteredIcons().length === 1 ? '' : 's' }}
          &middot; Click any to copy its import.
        </p>
      </div>
    </div>

    <!-- Layout -->
    <div class="mx-auto flex max-w-6xl gap-8 px-4 py-8">

      <!-- ── Sidebar ── -->
      <aside class="hidden w-56 shrink-0 lg:block" aria-label="Icon controls">
        <div class="sticky top-20 space-y-6">

          <!-- Search -->
          <div>
            <label for="icon-search" class="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Search
            </label>
            <volt-input
              id="icon-search"
              placeholder="Search icons..."
              [value]="search()"
              (valueChange)="search.set($event)"
            />
          </div>

          <!-- Size -->
          <div>
            <p class="mb-1.5 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Size
            </p>
            <div class="flex flex-wrap gap-1.5">
              @for (s of sizes; track s) {
                <button
                  type="button"
                  class="rounded-md px-2.5 py-1 text-sm font-medium transition-colors"
                  [class]="s === size()
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                    : 'border border-slate-200 text-slate-600 hover:border-slate-400 dark:border-slate-700 dark:text-slate-400 dark:hover:border-slate-500'"
                  (click)="size.set(s)"
                >{{ s }}</button>
              }
            </div>
          </div>

          <!-- Stroke width -->
          <div>
            <div class="mb-1.5 flex items-center justify-between">
              <label for="stroke-slider" class="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Stroke
              </label>
              <span class="tabular-nums text-sm font-medium text-slate-700 dark:text-slate-300">{{ strokeWidth() }}</span>
            </div>
            <input
              id="stroke-slider"
              type="range" min="0.5" max="3" step="0.5"
              [value]="strokeWidth()"
              (input)="setStroke($event)"
              class="w-full accent-violet-600"
            />
          </div>

          <!-- Animation -->
          <div>
            <p class="mb-1.5 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Animation
            </p>
            <div class="flex flex-col gap-1">
              @for (anim of animations; track anim.value) {
                <button
                  type="button"
                  class="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors"
                  [class]="anim.value === animate()
                    ? 'bg-violet-50 text-violet-700 dark:bg-violet-950/50 dark:text-violet-300'
                    : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800'"
                  (click)="animate.set(anim.value)"
                >
                  <span class="flex h-5 w-5 items-center justify-center rounded-md border text-[10px]"
                    [class]="anim.value === animate()
                      ? 'border-violet-300 bg-violet-100 dark:border-violet-700 dark:bg-violet-900/50'
                      : 'border-slate-200 dark:border-slate-700'">
                    @switch (anim.value) {
                      @case ('spin')   { ↻ }
                      @case ('pulse')  { ◉ }
                      @case ('bounce') { ↕ }
                      @case ('ping')   { ◎ }
                      @default { — }
                    }
                  </span>
                  {{ anim.label }}
                </button>
              }
            </div>
          </div>

          <!-- Hint -->
          @if (animate() !== 'none') {
            <p class="rounded-lg border border-violet-200 bg-violet-50 px-3 py-2.5 text-xs text-violet-700 dark:border-violet-800 dark:bg-violet-950/40 dark:text-violet-300">
              All icons previewing <strong>{{ animate() }}</strong> animation.
              Click any to copy.
            </p>
          }
        </div>
      </aside>

      <!-- ── Icon grid ── -->
      <main class="flex-1" aria-label="Icon grid">
        <!-- Mobile controls (compact bar) -->
        <div class="mb-5 flex flex-wrap items-center gap-3 lg:hidden">
          <volt-input
            placeholder="Search..."
            [value]="search()"
            (valueChange)="search.set($event)"
            class="max-w-48"
          />
          <select
            class="rounded-lg border border-slate-200 bg-white px-2 py-2 text-sm text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
            [value]="size()"
            (change)="setSize($event)"
            aria-label="Icon size"
          >
            @for (s of sizes; track s) {
              <option [value]="s">{{ s }}px</option>
            }
          </select>
          <select
            class="rounded-lg border border-slate-200 bg-white px-2 py-2 text-sm text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
            [value]="animate()"
            (change)="setAnimate($event)"
            aria-label="Animation"
          >
            @for (anim of animations; track anim.value) {
              <option [value]="anim.value">{{ anim.label }}</option>
            }
          </select>
        </div>

        @if (filteredIcons().length > 0) {
          <div class="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5 xl:grid-cols-6">
            @for (icon of filteredIcons(); track icon.name) {
              <app-icon-card [icon]="icon" [iconInputs]="iconInputs()" />
            }
          </div>
        } @else {
          <div class="flex flex-col items-center gap-3 py-24 text-center">
            <div class="text-slate-300 dark:text-slate-700">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
              </svg>
            </div>
            <p class="text-sm text-slate-500 dark:text-slate-400">
              No icons matching <strong class="text-slate-700 dark:text-slate-300">"{{ search() }}"</strong>
            </p>
            <button
              type="button"
              class="text-sm text-violet-600 hover:underline dark:text-violet-400"
              (click)="search.set('')"
            >Clear search</button>
          </div>
        }
      </main>
    </div>
  `,
})
export default class IconsPageComponent {
  readonly search = signal('');
  readonly size = signal<LmnIconSize>(24);
  readonly strokeWidth = signal(2);
  readonly animate = signal<LmnIconAnimate>('none');

  readonly sizes = SIZES;
  readonly animations = ANIMATIONS;

  readonly filteredIcons = computed(() => {
    const term = this.search().toLowerCase().trim();
    return term ? ALL_ICONS.filter(i => i.name.includes(term)) : ALL_ICONS;
  });

  readonly iconInputs = computed((): Record<string, unknown> => ({
    size: this.size(),
    strokeWidth: this.strokeWidth(),
    animate: this.animate(),
  }));

  setStroke(event: Event) {
    this.strokeWidth.set(parseFloat((event.target as HTMLInputElement).value));
  }

  setSize(event: Event) {
    this.size.set(+(event.target as HTMLSelectElement).value as LmnIconSize);
  }

  setAnimate(event: Event) {
    this.animate.set((event.target as HTMLSelectElement).value as LmnIconAnimate);
  }
}
