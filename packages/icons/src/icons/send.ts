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
    :host(.lmn-filled) svg { fill: color-mix(in oklab, currentColor 24%, transparent); }

    .lmn-animate-el {
      display: inline-block;
      transform-box: fill-box;
      transform-origin: center;
    }

    @keyframes lmn-send-plane {
      0%, 100% { translate: 0 0; rotate: 0deg; opacity: 1; }
      48% { translate: 1.4px -1.4px; rotate: -2deg; opacity: 0.9; }
    }

    @keyframes lmn-send-trail {
      0%, 100% { translate: 0 0; opacity: 1; }
      48% { translate: 0.8px -0.8px; opacity: 0.62; }
    }

    @media (prefers-reduced-motion: reduce) {
      :host(.lmn-animate) svg,
      :host(.lmn-animate) .lmn-animate-el {
        animation: none !important;
      }
    }
  `],
  template: `
    <svg [attr.width]="size()" [attr.height]="size()" [attr.stroke-width]="strokeWidth()" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
      <path
        d="m22 2-7 20-4-9-9-4Z"
        class="lmn-animate-el" [style.animation]="animate() ? 'lmn-send-plane 620ms cubic-bezier(0.22, 1, 0.36, 1) 0ms both' : null"/>
      <path
        d="M22 2 11 13"
        class="lmn-animate-el" [style.animation]="animate() ? 'lmn-send-trail 620ms ease 80ms both' : null"/>
    </svg>
  `,
})
export class LmnSendIcon extends LmnIconBase {}
