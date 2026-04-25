import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  input,
  signal,
} from '@angular/core';
import { NgComponentOutlet } from '@angular/common';
import { LmnCheckIcon } from '@lumen/icons/icons/check';
import type { IconEntry } from '../types/icon-entry.type';

@Component({
  selector: 'app-icon-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgComponentOutlet, LmnCheckIcon],
  styles: [`
    @keyframes icon-pop {
      0%   { transform: scale(1) rotate(0deg); }
      20%  { transform: scale(1.4) rotate(-12deg); }
      55%  { transform: scale(0.85) rotate(7deg); }
      80%  { transform: scale(1.06) rotate(-3deg); }
      100% { transform: scale(1) rotate(0deg); }
    }
    .icon-inner { display: inline-flex; }
    .icon-inner.popped { animation: icon-pop 0.42s cubic-bezier(0.36, 0.07, 0.19, 0.97) both; }
  `],
  template: `
    <button
      type="button"
      class="group relative flex w-full flex-col items-center gap-3 rounded-xl border border-slate-200 bg-white px-3 py-5 text-slate-700 transition-all hover:border-violet-300 hover:shadow-md hover:shadow-violet-100 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-violet-700/50 dark:hover:shadow-violet-900/20"
      [attr.aria-label]="'Copy import for ' + icon().name"
      (click)="handleClick()"
    >
      <div #iconInner class="icon-inner">
        <ng-container
          [ngComponentOutlet]="icon().component"
          [ngComponentOutletInputs]="iconInputs()"
        />
      </div>

      <span class="truncate text-[11px] text-slate-400 dark:text-slate-600">
        {{ icon().name }}
      </span>

      @if (copied()) {
        <div class="absolute inset-0 flex flex-col items-center justify-center gap-1 rounded-xl bg-emerald-50 dark:bg-emerald-950/60">
          <lmn-check [size]="16" [strokeWidth]="2.5" class="text-emerald-600 dark:text-emerald-400" />
          <span class="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400">Copied!</span>
        </div>
      }
    </button>
  `,
})
export class IconCardComponent {
  private readonly el = inject(ElementRef<HTMLElement>);

  icon = input.required<IconEntry>();
  iconInputs = input.required<Record<string, unknown>>();

  copied = signal(false);

  handleClick() {
    const inner = this.el.nativeElement.querySelector('.icon-inner') as HTMLElement | null;
    if (inner) {
      inner.classList.remove('popped');
      void inner.offsetWidth;
      inner.classList.add('popped');
    }

    navigator.clipboard.writeText(this.icon().importStr).catch(() => {});
    this.copied.set(true);
    setTimeout(() => this.copied.set(false), 1500);
  }
}
