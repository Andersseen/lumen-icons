import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LmnIconBase } from '../lib/icon-base';

@Component({
  selector: 'lmn-arrow-small-right',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.role]': 'ariaLabel() ? "img" : null',
    '[attr.aria-label]': 'ariaLabel() || null',
    '[attr.aria-hidden]': 'ariaLabel() ? null : "true"',
    '[class.lmn-animate]': 'animate()',
  },
  styles: [`
    @keyframes lmn-arrow-small-right { 0%, 100% { scale: 1; } 50% { scale: 1.1; } }

    .lmn-animate {
      animation: lmn-arrow-small-right 500ms ease both;
    }
    

    @media (prefers-reduced-motion: reduce) {
      .lmn-animate,
      .lmn-animate-el {
        animation: none !important;
      }
    }
  `],
  template: `
    @if (variant() === 'filled') {
      <svg
      [attr.width]="size()"
      [attr.height]="size()"
      [class.lmn-animate]="animate()"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path fill-rule="evenodd" d="M3.75 12a.75.75 0 0 1 .75-.75h13.19l-5.47-5.47a.75.75 0 0 1 1.06-1.06l6.75 6.75a.75.75 0 0 1 0 1.06l-6.75 6.75a.75.75 0 1 1-1.06-1.06l5.47-5.47H4.5a.75.75 0 0 1-.75-.75Z" clip-rule="evenodd"/>
    </svg>
    } @else {
      <svg
      [attr.width]="size()"
      [attr.height]="size()"
      [attr.stroke-width]="strokeWidth()"
      [class.lmn-animate]="animate()"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M4.5 12h15m0 0-6.75-6.75M19.5 12l-6.75 6.75"/>
    </svg>
    }
  `,
})
export class LmnArrowSmallRightIcon extends LmnIconBase {}
