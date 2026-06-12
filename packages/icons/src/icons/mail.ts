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
    :host(.lmn-filled) svg { fill: color-mix(in oklab, currentColor 24%, transparent); }

    .lmn-animate-el {
      display: inline-block;
      transform-box: fill-box;
      transform-origin: center;
    }
    
    @keyframes lmn-mail-body {
      0%, 100% { scale: 1; }
      45% { scale: 1.018; }
    }

    @keyframes lmn-mail-flap {
      0%, 100% { translate: 0 0; opacity: 1; }
      45% { translate: 0 -0.8px; opacity: 0.82; }
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
        width="20" height="16" x="2" y="4" rx="2"
        class="lmn-animate-el" [style.animation]="animate() ? 'lmn-mail-body 560ms ease-in-out 0ms both' : null"/>
      <path
        d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"
        class="lmn-animate-el" [style.animation]="animate() ? 'lmn-mail-flap 560ms cubic-bezier(0.22, 1, 0.36, 1) 80ms both' : null"/>
    </svg>
  `,
})
export class LmnMailIcon extends LmnIconBase {}
