import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LmnIconBase } from '../lib/icon-base';

@Component({
  selector: 'lmn-home',
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
    
      @keyframes lmn-home {
        0%, 100% { opacity: 1; translate: 0 0px; scale: 1; }
        50% { opacity: 1; translate: 0 0px; scale: 1.015; }
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
        d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"
        class="lmn-animate-el" [style.animation]="animate() ? 'lmn-home 560ms cubic-bezier(0.16, 1, 0.3, 1) 0ms both' : null"/>
      <polyline
        points="9 22 9 12 15 12 15 22"
        class="lmn-animate-el" [style.animation]="animate() ? 'lmn-home 560ms cubic-bezier(0.16, 1, 0.3, 1) 90ms both' : null"/>
    </svg>
  `,
})
export class LmnHomeIcon extends LmnIconBase {}
