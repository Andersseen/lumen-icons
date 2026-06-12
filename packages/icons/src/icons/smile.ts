import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LmnIconBase } from '../lib/icon-base';

@Component({
  selector: 'lmn-smile',
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

    .lmn-animate-el { display: inline-block; }
    
      @keyframes lmn-smile {
        0%, 100% { rotate: 0deg; scale: 1; }
        50% { rotate: -1.52deg; scale: 1; }
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
        cx="12" cy="12" r="10"
        class="lmn-animate-el" [style.animation]="animate() ? 'lmn-smile 650ms ease-in-out 0ms both' : null"/>
      <path
        d="M8 14s1.5 2 4 2 4-2 4-2"
        class="lmn-animate-el" [style.animation]="animate() ? 'lmn-smile 560ms cubic-bezier(0.22, 1, 0.36, 1) 100ms both' : null"/>
      <line
        x1="9" y1="9" x2="9.01" y2="9"
        class="lmn-animate-el" [style.animation]="animate() ? 'lmn-smile 560ms cubic-bezier(0.22, 1, 0.36, 1) 150ms both' : null"/>
      <line
        x1="15" y1="9" x2="15.01" y2="9"
        class="lmn-animate-el" [style.animation]="animate() ? 'lmn-smile 560ms cubic-bezier(0.22, 1, 0.36, 1) 180ms both' : null"/>
    </svg>
  `,
})
export class LmnSmileIcon extends LmnIconBase {}
