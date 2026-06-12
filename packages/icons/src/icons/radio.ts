import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LmnIconBase } from '../lib/icon-base';

@Component({
  selector: 'lmn-radio',
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
    
      @keyframes lmn-radio {
        0%, 100% { scale: 1; }
        50% { scale: 1.057; }
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
        class="lmn-animate-el" [style.animation]="animate() ? 'lmn-radio 560ms ease-in-out 0ms both' : null"/>
      <circle
        cx="12" cy="12" r="4"
        class="lmn-animate-el" [style.animation]="animate() ? 'lmn-radio 560ms ease-in-out 60ms both' : null"/>
    </svg>
  `,
})
export class LmnRadioIcon extends LmnIconBase {}
