import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LmnIconBase } from '../lib/icon-base';

@Component({
  selector: 'lmn-x',
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
    
      @keyframes lmn-x {
        0%, 100% { rotate: 0deg; translate: 0 0px; }
        50% { rotate: 2.66deg; translate: 0 0px; }
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
      <path
        d="M18 6 6 18"
        class="lmn-animate-el" [style.animation]="animate() ? 'lmn-x 560ms ease 0ms both' : null"/>
      <path
        d="m6 6 12 12"
        class="lmn-animate-el" [style.animation]="animate() ? 'lmn-x 560ms ease 60ms both' : null"/>
    </svg>
  `,
})
export class LmnXIcon extends LmnIconBase {}
