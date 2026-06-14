import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LmnIconBase } from '../lib/icon-base';

@Component({
  selector: 'lmn-mail',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.role]': 'ariaLabel() ? "img" : null',
    '[attr.aria-label]': 'ariaLabel() || null',
    '[attr.aria-hidden]': 'ariaLabel() ? null : "true"',
    '[class.lmn-animate]': 'animate()',
  },
  styles: [`
    @keyframes lmn-mail { 0%, 100% { translate: 0 0; } 25% { translate: 0 -3px; } 75% { translate: 0 3px; } }

    .lmn-animate {
      animation: lmn-mail 550ms ease both;
    }
    
    .lmn-filled svg,
    .lmn-filled path {
      fill: currentColor;
      stroke: none;
    }
  

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
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <rect width="20" height="16" x="2" y="4" rx="2" class="lmn-animate-el" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" class="lmn-animate-el" />
    </svg>
  `,
})
export class LmnMailIcon extends LmnIconBase {}
