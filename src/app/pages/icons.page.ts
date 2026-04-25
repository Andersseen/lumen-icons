import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { VoltInput } from '@voltui/components';

import { LmnSearchIcon } from '@lumen/icons/search';
import type { LmnIconAnimate, LmnIconSize } from '@lumen/icons';

import { IconCardComponent, type IconCardInputs } from '../components/icon-card';
import { IconsSidebarComponent } from '../components/icons/icons-sidebar';
import { AnimationPickerComponent } from '../components/shared/animation-picker';
import { SizePickerComponent } from '../components/shared/size-picker';
import { ICON_CATALOG } from '../data/icon-catalog';

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
      <div class="mx-auto max-w-6xl px-4 py-10">
        <h1 class="text-3xl font-bold tracking-tight text-foreground">Icons</h1>
        <p class="mt-1.5 text-muted-foreground">
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
          <app-size-picker [(size)]="size" ariaLabel="Icon size" />
          <app-animation-picker [(animate)]="animate" ariaLabel="Animation" />
        </div>

        @if (filteredIcons().length > 0) {
          <div class="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5 xl:grid-cols-6">
            @for (icon of filteredIcons(); track icon.name) {
              <app-icon-card [icon]="icon" [iconInputs]="iconInputs()" />
            }
          </div>
        } @else {
          <div class="flex flex-col items-center gap-3 py-24 text-center">
            <div class="text-muted-foreground dark:text-foreground">
              <lmn-search [size]="32" [strokeWidth]="1.5" />
            </div>
            <p class="text-sm text-muted-foreground">
              No icons matching <strong class="text-foreground">"{{ search() }}"</strong>
            </p>
            <button type="button" class="text-sm text-primary hover:underline dark:text-primary"
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

  readonly filteredIcons = computed(() => {
    const term = this.search().toLowerCase().trim();
    return term ? ICON_CATALOG.filter(i => i.name.includes(term)) : ICON_CATALOG;
  });

  readonly iconInputs = computed((): IconCardInputs => ({
    size: this.size(),
    strokeWidth: this.strokeWidth(),
    animate: this.animate(),
  }));
}
