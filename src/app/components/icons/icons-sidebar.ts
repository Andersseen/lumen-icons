import { ChangeDetectionStrategy, Component, model } from '@angular/core';
import { VoltInput, VoltSlider } from '@voltui/components';
import type { LmnIconAnimate, LmnIconSize } from '@lumen/icons';

import { AnimationPickerComponent } from '../shared/animation-picker';
import { SizePickerComponent } from '../shared/size-picker';

@Component({
  selector: 'app-icons-sidebar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [VoltInput, VoltSlider, SizePickerComponent, AnimationPickerComponent],
  template: `
    <aside class="hidden w-56 shrink-0 lg:block" aria-label="Icon controls">
      <div class="sticky top-20 space-y-6">

        <!-- Search -->
        <div>
          <label for="icon-search" class="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
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
          <p class="mb-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Size</p>
          <app-size-picker [(size)]="size" />
        </div>

        <!-- Stroke -->
        <div>
          <div class="mb-1.5 flex items-center justify-between">
            <label for="stroke-slider" class="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Stroke
            </label>
            <span class="tabular-nums text-sm font-medium text-foreground">{{ strokeWidth() }}</span>
          </div>
          <volt-slider
            id="stroke-slider"
            [value]="strokeWidth()"
            (valueChange)="strokeWidth.set($event)"
            [min]="0.5"
            [max]="3"
            [step]="0.5"
          />
        </div>

        <!-- Animation -->
        <div>
          <p class="mb-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Animation</p>
          <app-animation-picker [(animate)]="animate" />
        </div>

        @if (animate() !== 'none') {
          <p class="rounded-lg border border-primary bg-primary px-3 py-2.5 text-xs text-primary dark:border-primary dark:bg-primary/40 dark:text-primary">
            Previewing <strong>{{ animate() }}</strong> on all icons. Click any to copy.
          </p>
        }

      </div>
    </aside>
  `,
})
export class IconsSidebarComponent {
  readonly search = model('');
  readonly size = model<LmnIconSize>(24);
  readonly strokeWidth = model(2);
  readonly animate = model<LmnIconAnimate>('none');
}
