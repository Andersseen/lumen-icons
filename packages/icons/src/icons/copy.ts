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
    :host(.lmn-filled) svg { fill: color-mix(in oklab, currentColor 24%, transparent); }

    .lmn-animate-el {
      display: inline-block;
      transform-box: fill-box;
      transform-origin: center;
    }
    
    @keyframes lmn-copy-front {
      0%, 100% { translate: 0 0; opacity: 1; }
      45% { translate: 1px 1px; opacity: 0.9; }
    }

    @keyframes lmn-copy-back {
      0%, 100% { translate: 0 0; opacity: 1; }
      45% { translate: -0.8px -0.8px; opacity: 0.72; }
    }
  

    @media (prefers-reduced-motion: reduce) {
      :host(.lmn-animate) svg,
      :host(.lmn-animate) .lmn-animate-el {
        animation: none !important;
      }
    }
  `],
  template: `
    <svg
      [attr.width]="size()"
      [attr.height]="size()"
      [attr.stroke-width]="strokeWidth()"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <rect
        width="14" height="14" x="8" y="8" rx="2" ry="2"
        class="lmn-animate-el" [style.animation]="animate() ? 'lmn-copy-front 560ms ease-in-out 0ms both' : null"/>
      <path
        d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"
        class="lmn-animate-el" [style.animation]="animate() ? 'lmn-copy-back 560ms ease-in-out 60ms both' : null"/>
    </svg>
  `,
})
export class LmnCopyIcon extends LmnIconBase {}
