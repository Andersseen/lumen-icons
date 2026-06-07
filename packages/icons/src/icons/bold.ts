import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LmnIconBase } from '../lib/icon-base';

@Component({
  selector: 'lmn-bold',
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
    
      @keyframes lmn-bold {
        0%, 100% { scale: 1 1; scale: 1 1; translate: 0px 0; }
        50% { scale: 1.046 1; scale: 1 0.985; translate: 0.42px 0; }
      }
  `],
  template: `
    <svg
      [attr.width]="size()"
      [attr.height]="size()"
      [attr.stroke-width]="strokeWidth()"
      [class.lmn-animate]="animate()" [style.animation]="animate() ? 'lmn-bold 560ms ease both' : null" viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M14 12a4 4 0 0 0 0-8H6v8"/>
      <path d="M15 20a4 4 0 0 0 0-8H6v8Z"/>
    </svg>
  `,
})
export class LmnBoldIcon extends LmnIconBase {}
