import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  input,
  signal,
} from '@angular/core';
import { NgComponentOutlet } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { timer } from 'rxjs';

import { ClipboardService } from '../services/clipboard';

import { LmnCheckIcon } from '@lumen/icons/check';
import type { LmnIconAnimate, LmnIconSize } from '@lumen/icons';

import type { IconEntry } from '../types/icon-entry.type';

export interface IconCardInputs {
  readonly size: LmnIconSize;
  readonly strokeWidth: number;
  readonly animate: LmnIconAnimate;
  readonly [key: string]: unknown;
}

@Component({
  selector: 'app-icon-card',
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
      class="group relative flex w-full flex-col items-center gap-3 rounded-xl border border-border bg-background px-3 py-5 text-foreground transition-all hover:border-primary hover:shadow-md hover:shadow-primary dark:border-border dark:bg-card dark:text-secondary-foreground dark:hover:border-primary/50 dark:hover:shadow-primary/20"
      [attr.aria-label]="'Copy import for ' + icon().name"
      (click)="handleClick()"
    >
      <div class="icon-inner" [class.popped]="popped()">
        <ng-container
          [ngComponentOutlet]="icon().component"
          [ngComponentOutletInputs]="iconInputs()"
        />
      </div>

      <span class="truncate text-[11px] text-muted-foreground">
        {{ icon().name }}
      </span>

      @if (copied()) {
        <div class="absolute inset-0 flex flex-col items-center justify-center gap-1 rounded-xl bg-success/10 dark:bg-success/20">
          <lmn-check [size]="16" [strokeWidth]="2.5" class="text-success" />
          <span class="text-[11px] font-semibold text-success">Copied!</span>
        </div>
      }
    </button>
  `,
})
export class IconCardComponent {
  private readonly destroyRef = inject(DestroyRef);
  private readonly clipboard = inject(ClipboardService);

  readonly icon = input.required<IconEntry>();
  readonly iconInputs = input.required<IconCardInputs>();

  readonly copied = signal(false);
  readonly popped = signal(false);

  handleClick() {
    this.triggerPop();

    this.clipboard.copy(this.icon().importStr, this.icon().name);
    this.copied.set(true);
    timer(1500)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.copied.set(false));
  }

  private triggerPop() {
    this.popped.set(false);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        this.popped.set(true);
      });
    });
  }
}
