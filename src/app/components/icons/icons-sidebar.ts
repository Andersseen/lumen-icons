import { ChangeDetectionStrategy, Component, model } from '@angular/core';
import { VoltInput } from '@voltui/components';
import type { LmnIconAnimate, LmnIconSize } from '@lumen/icons';

const SIZES: LmnIconSize[] = [12, 14, 16, 20, 24, 32];
const ANIMATIONS: { value: LmnIconAnimate; label: string; symbol: string }[] = [
  { value: 'none',   label: 'None',   symbol: '—' },
  { value: 'spin',   label: 'Spin',   symbol: '↻' },
  { value: 'pulse',  label: 'Pulse',  symbol: '◉' },
  { value: 'bounce', label: 'Bounce', symbol: '↕' },
  { value: 'ping',   label: 'Ping',   symbol: '◎' },
];

@Component({
  selector: 'app-icons-sidebar',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [VoltInput],
  template: `
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
          <p class="mb-1.5 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Size</p>
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

        <!-- Stroke -->
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
          <p class="mb-1.5 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Animation</p>
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
                  {{ anim.symbol }}
                </span>
                {{ anim.label }}
              </button>
            }
          </div>
        </div>

        @if (animate() !== 'none') {
          <p class="rounded-lg border border-violet-200 bg-violet-50 px-3 py-2.5 text-xs text-violet-700 dark:border-violet-800 dark:bg-violet-950/40 dark:text-violet-300">
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

  readonly sizes = SIZES;
  readonly animations = ANIMATIONS;

  setStroke(event: Event) {
    this.strokeWidth.set(parseFloat((event.target as HTMLInputElement).value));
  }
}
