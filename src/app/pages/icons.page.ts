import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { VoltInput } from '@voltui/components';

import { LmnAlertCircleIcon } from '@lumen/icons/icons/alert-circle';
import { LmnArrowLeftIcon } from '@lumen/icons/icons/arrow-left';
import { LmnArrowRightIcon } from '@lumen/icons/icons/arrow-right';
import { LmnCheckIcon } from '@lumen/icons/icons/check';
import { LmnCopyIcon } from '@lumen/icons/icons/copy';
import { LmnExternalLinkIcon } from '@lumen/icons/icons/external-link';
import { LmnHeartIcon } from '@lumen/icons/icons/heart';
import { LmnInfoIcon } from '@lumen/icons/icons/info';
import { LmnMenuIcon } from '@lumen/icons/icons/menu';
import { LmnSearchIcon } from '@lumen/icons/icons/search';
import { LmnStarIcon } from '@lumen/icons/icons/star';
import { LmnXIcon } from '@lumen/icons/icons/x';
import type { LmnIconAnimate, LmnIconSize } from '@lumen/icons';

import { IconCardComponent } from '../components/icon-card';
import { IconsSidebarComponent } from '../components/icons/icons-sidebar';
import type { IconEntry } from '../types/icon-entry.type';

const ALL_ICONS: IconEntry[] = [
  { name: 'check',         selector: 'lmn-check',         component: LmnCheckIcon,        importStr: "import { LmnCheckIcon } from '@lumen/icons/icons/check';" },
  { name: 'x',             selector: 'lmn-x',             component: LmnXIcon,            importStr: "import { LmnXIcon } from '@lumen/icons/icons/x';" },
  { name: 'arrow-right',   selector: 'lmn-arrow-right',   component: LmnArrowRightIcon,   importStr: "import { LmnArrowRightIcon } from '@lumen/icons/icons/arrow-right';" },
  { name: 'arrow-left',    selector: 'lmn-arrow-left',    component: LmnArrowLeftIcon,    importStr: "import { LmnArrowLeftIcon } from '@lumen/icons/icons/arrow-left';" },
  { name: 'search',        selector: 'lmn-search',        component: LmnSearchIcon,       importStr: "import { LmnSearchIcon } from '@lumen/icons/icons/search';" },
  { name: 'menu',          selector: 'lmn-menu',          component: LmnMenuIcon,         importStr: "import { LmnMenuIcon } from '@lumen/icons/icons/menu';" },
  { name: 'alert-circle',  selector: 'lmn-alert-circle',  component: LmnAlertCircleIcon,  importStr: "import { LmnAlertCircleIcon } from '@lumen/icons/icons/alert-circle';" },
  { name: 'info',          selector: 'lmn-info',          component: LmnInfoIcon,         importStr: "import { LmnInfoIcon } from '@lumen/icons/icons/info';" },
  { name: 'star',          selector: 'lmn-star',          component: LmnStarIcon,         importStr: "import { LmnStarIcon } from '@lumen/icons/icons/star';" },
  { name: 'heart',         selector: 'lmn-heart',         component: LmnHeartIcon,        importStr: "import { LmnHeartIcon } from '@lumen/icons/icons/heart';" },
  { name: 'copy',          selector: 'lmn-copy',          component: LmnCopyIcon,         importStr: "import { LmnCopyIcon } from '@lumen/icons/icons/copy';" },
  { name: 'external-link', selector: 'lmn-external-link', component: LmnExternalLinkIcon, importStr: "import { LmnExternalLinkIcon } from '@lumen/icons/icons/external-link';" },
];

@Component({
  selector: 'app-icons',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [VoltInput, LmnSearchIcon, IconCardComponent, IconsSidebarComponent],
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

    <div class="mx-auto flex max-w-6xl gap-8 px-4 py-8">

      <!-- Desktop sidebar (model two-way binding) -->
      <app-icons-sidebar
        [(search)]="search"
        [(size)]="size"
        [(strokeWidth)]="strokeWidth"
        [(animate)]="animate"
      />

      <!-- Icon grid -->
      <main class="flex-1" aria-label="Icon grid">

        <!-- Mobile controls -->
        <div class="mb-5 flex flex-wrap items-center gap-3 lg:hidden">
          <volt-input
            placeholder="Search..."
            [value]="search()"
            (valueChange)="search.set($event)"
            class="max-w-48"
          />
          <select
            class="rounded-lg border border-slate-200 bg-white px-2 py-2 text-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
            [value]="size()"
            (change)="setSize($event)"
            aria-label="Icon size"
          >
            @for (s of sizes; track s) { <option [value]="s">{{ s }}px</option> }
          </select>
          <select
            class="rounded-lg border border-slate-200 bg-white px-2 py-2 text-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
            [value]="animate()"
            (change)="setAnimate($event)"
            aria-label="Animation"
          >
            @for (a of animations; track a.value) { <option [value]="a.value">{{ a.label }}</option> }
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
              <lmn-search [size]="32" [strokeWidth]="1.5" />
            </div>
            <p class="text-sm text-slate-500 dark:text-slate-400">
              No icons matching <strong class="text-slate-700 dark:text-slate-300">"{{ search() }}"</strong>
            </p>
            <button type="button" class="text-sm text-violet-600 hover:underline dark:text-violet-400"
              (click)="search.set('')">
              Clear search
            </button>
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

  readonly sizes: LmnIconSize[] = [12, 14, 16, 20, 24, 32];
  readonly animations = [
    { value: 'none' as LmnIconAnimate,   label: 'None' },
    { value: 'spin' as LmnIconAnimate,   label: 'Spin' },
    { value: 'pulse' as LmnIconAnimate,  label: 'Pulse' },
    { value: 'bounce' as LmnIconAnimate, label: 'Bounce' },
    { value: 'ping' as LmnIconAnimate,   label: 'Ping' },
  ];

  readonly filteredIcons = computed(() => {
    const term = this.search().toLowerCase().trim();
    return term ? ALL_ICONS.filter(i => i.name.includes(term)) : ALL_ICONS;
  });

  readonly iconInputs = computed((): Record<string, unknown> => ({
    size: this.size(),
    strokeWidth: this.strokeWidth(),
    animate: this.animate(),
  }));

  setSize(event: Event) {
    this.size.set(+(event.target as HTMLSelectElement).value as LmnIconSize);
  }

  setAnimate(event: Event) {
    this.animate.set((event.target as HTMLSelectElement).value as LmnIconAnimate);
  }
}
