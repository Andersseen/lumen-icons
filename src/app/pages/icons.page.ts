import { ChangeDetectionStrategy, Component, Type, computed, signal } from '@angular/core';
import { NgComponentOutlet } from '@angular/common';

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
import type { LmnIconSize } from '@lumen/icons';

interface IconEntry {
  name: string;
  selector: string;
  component: Type<unknown>;
  importStr: string;
}

@Component({
  selector: 'app-icons',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgComponentOutlet],
  template: `
    <!-- Header -->
    <div class="border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
      <div class="mx-auto max-w-6xl px-4 py-12">
        <h1 class="text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
          Icons
        </h1>
        <p class="mt-3 text-lg text-slate-600 dark:text-slate-400">
          {{ icons.length }} icons · Click any to copy its import statement.
        </p>
      </div>
    </div>

    <!-- Sticky controls -->
    <div class="sticky top-14 z-40 border-b border-slate-200 bg-white/90 backdrop-blur-sm dark:border-slate-800 dark:bg-slate-950/90">
      <div class="mx-auto flex max-w-6xl flex-wrap items-center gap-6 px-4 py-3">
        <label class="flex items-center gap-2 text-sm">
          <span class="text-slate-500 dark:text-slate-400">Size</span>
          <select
            (change)="setSize($event)"
            class="rounded-md border border-slate-200 bg-white px-2 py-1 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
          >
            @for (s of sizes; track s) {
              <option [value]="s" [selected]="s === size()">{{ s }}px</option>
            }
          </select>
        </label>

        <label class="flex items-center gap-2 text-sm">
          <span class="text-slate-500 dark:text-slate-400">Stroke</span>
          <input
            type="range" min="0.5" max="3" step="0.5"
            [value]="strokeWidth()"
            (input)="setStrokeWidth($event)"
            class="w-28 accent-slate-900 dark:accent-white"
          />
          <span class="w-6 text-center text-slate-600 dark:text-slate-400 tabular-nums">
            {{ strokeWidth() }}
          </span>
        </label>
      </div>
    </div>

    <!-- Grid -->
    <div class="mx-auto max-w-6xl px-4 py-10">
      <div class="grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-6">
        @for (icon of icons; track icon.name) {
          <button
            type="button"
            (click)="copy(icon)"
            class="group relative flex flex-col items-center gap-3 rounded-xl border border-slate-200 bg-white px-3 py-5 transition-all hover:border-slate-400 hover:shadow-sm dark:border-slate-800 dark:bg-slate-950 dark:hover:border-slate-600"
            [attr.aria-label]="'Copy import for ' + icon.name"
          >
            <div class="text-slate-800 dark:text-slate-200">
              <ng-container
                [ngComponentOutlet]="icon.component"
                [ngComponentOutletInputs]="iconInputs()"
              />
            </div>
            <span class="text-xs text-slate-500 dark:text-slate-400">{{ icon.name }}</span>

            @if (copied() === icon.name) {
              <div class="absolute inset-0 flex flex-col items-center justify-center gap-1 rounded-xl bg-green-50 dark:bg-green-950/60">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"
                  class="text-green-600 dark:text-green-400" aria-hidden="true">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                <span class="text-xs font-medium text-green-700 dark:text-green-400">Copied!</span>
              </div>
            }
          </button>
        }
      </div>

      <p class="mt-8 text-center text-sm text-slate-400 dark:text-slate-600">
        Click any icon to copy: <code class="rounded bg-slate-100 px-1.5 py-0.5 text-xs dark:bg-slate-800">import &#123; Lmn…Icon &#125; from '@lumen/icons/icons/…'</code>
      </p>
    </div>
  `,
})
export default class IconsPageComponent {
  readonly size = signal<LmnIconSize>(24);
  readonly strokeWidth = signal(2);
  readonly copied = signal<string | null>(null);

  readonly sizes: LmnIconSize[] = [12, 14, 16, 20, 24, 32];

  readonly iconInputs = computed(() => ({
    size: this.size(),
    strokeWidth: this.strokeWidth(),
  }));

  readonly icons: IconEntry[] = [
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

  copy(icon: IconEntry) {
    navigator.clipboard.writeText(icon.importStr).catch(() => {});
    this.copied.set(icon.name);
    setTimeout(() => this.copied.set(null), 2000);
  }

  setSize(event: Event) {
    this.size.set(+(event.target as HTMLSelectElement).value as LmnIconSize);
  }

  setStrokeWidth(event: Event) {
    this.strokeWidth.set(parseFloat((event.target as HTMLInputElement).value));
  }
}
