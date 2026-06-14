import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LmnIconBase } from '../lib/icon-base';

@Component({
  selector: 'lmn-x',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.role]': 'ariaLabel() ? "img" : null',
    '[attr.aria-label]': 'ariaLabel() || null',
    '[attr.aria-hidden]': 'ariaLabel() ? null : "true"',
    '[class.lmn-animate]': 'animate()',
  },
  styles: [`
    @keyframes lmn-x { 0% { scale: 0.7; rotate: 90deg; } 60% { scale: 1.15; rotate: -10deg; } 100% { scale: 1; rotate: 0deg; } }

    @media (prefers-reduced-motion: reduce) {
      .lmn-animate,
      .lmn-animate-el {
        animation: none !important;
      }
    }
  `],
  template: `
    <svg
      [attr.width]="size()"
      [attr.height]="size()"
      [attr.stroke-width]="strokeWidth()"
      [class.lmn-animate]="animate()"
      [style.animation]="animate() ? 'lmn-x 450ms ease both' : null"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M18 6 6 18"
        class="lmn-animate-el" [style.animation]="animate() ? 'lmn-x 560ms ease 0ms both' : null"/><path
        d="m6 6 12 12"
        class="lmn-animate-el" [style.animation]="animate() ? 'lmn-x 560ms ease 60ms both' : null"/>
    </svg>
  `,
})
export class LmnXIcon extends LmnIconBase {}
