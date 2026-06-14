import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LmnIconBase } from '../lib/icon-base';

@Component({
  selector: 'lmn-copy',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.role]': 'ariaLabel() ? "img" : null',
    '[attr.aria-label]': 'ariaLabel() || null',
    '[attr.aria-hidden]': 'ariaLabel() ? null : "true"',
    '[class.lmn-animate]': 'animate()',
  },
  styles: [`
    @keyframes lmn-copy { 0%, 100% { scale: 1; } 50% { scale: 1.1; } }

    .lmn-animate {
      animation: lmn-copy 500ms ease both;
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
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" class="lmn-animate-el" /><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" class="lmn-animate-el" />
    </svg>
  `,
})
export class LmnCopyIcon extends LmnIconBase {}
