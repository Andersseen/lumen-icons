import { NgComponentOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  input,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { timer } from 'rxjs';

import { ClipboardService } from '../services/clipboard';

import type { LmnIconAnimate, LmnIconSize } from '@lumen/icons';
import { LmnCheckIcon } from '@lumen/icons/check';

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
  templateUrl:'./icon-card.html'
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
