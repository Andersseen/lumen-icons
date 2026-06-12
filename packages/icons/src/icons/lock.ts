import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LmnIconBase } from '../lib/icon-base';

@Component({
  selector: 'lmn-lock',
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
    
    @keyframes lmn-lock-body {
      0%, 100% { translate: 0 0; scale: 1; }
      45% { translate: 0 0.5px; scale: 1.01; }
    }

    @keyframes lmn-lock-shackle {
      0%, 100% { translate: 0 0; rotate: 0deg; }
      45% { translate: 0 -1px; rotate: -4deg; }
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
        width="18" height="11" x="3" y="11" rx="2" ry="2"
        class="lmn-animate-el" [style.animation]="animate() ? 'lmn-lock-body 560ms ease 0ms both' : null"/>
      <path
        d="M7 11V7a5 5 0 0 1 10 0v4"
        class="lmn-animate-el" [style.animation]="animate() ? 'lmn-lock-shackle 560ms ease 70ms both' : null"/>
    </svg>
  `,
})
export class LmnLockIcon extends LmnIconBase {}
