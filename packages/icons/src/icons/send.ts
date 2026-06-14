import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LmnIconBase } from '../lib/icon-base';

@Component({
  selector: 'lmn-send',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.role]': 'ariaLabel() ? "img" : null',
    '[attr.aria-label]': 'ariaLabel() || null',
    '[attr.aria-hidden]': 'ariaLabel() ? null : "true"',
    '[class.lmn-animate]': 'animate()',
  },
  styles: [`
    @keyframes lmn-send { 0%, 100% { translate: 0 0; opacity: 1; } 50% { translate: 5px -5px; opacity: 0.7; } }

    .lmn-animate {
      animation: lmn-send 500ms ease both;
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
      <path d="m22 2-7 20-4-9-9-4Z" class="lmn-animate-el" /><path d="M22 2 11 13" class="lmn-animate-el" />
    </svg>
  `,
})
export class LmnSendIcon extends LmnIconBase {}
