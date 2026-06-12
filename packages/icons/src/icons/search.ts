import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LmnIconBase } from '../lib/icon-base';

@Component({
  selector: 'lmn-search',
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
    
    @keyframes lmn-search-lens {
      0%, 100% { translate: 0 0; scale: 1; }
      35% { translate: -0.8px -0.4px; scale: 1.03; }
      65% { translate: 0.8px 0.4px; scale: 1.03; }
    }

    @keyframes lmn-search-handle {
      0%, 100% { rotate: 0deg; translate: 0 0; }
      50% { rotate: -4deg; translate: 0.4px 0.4px; }
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
      <circle
        cx="11" cy="11" r="8"
        class="lmn-animate-el" [style.animation]="animate() ? 'lmn-search-lens 700ms ease-in-out 0ms both' : null"/>
      <path
        d="m21 21-4.3-4.3"
        class="lmn-animate-el" [style.animation]="animate() ? 'lmn-search-handle 700ms ease-in-out 60ms both' : null"/>
    </svg>
  `,
})
export class LmnSearchIcon extends LmnIconBase {}
