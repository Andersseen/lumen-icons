import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LmnIconBase } from '../lib/icon-base';

@Component({
  selector: 'lmn-italic',
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
    
      @keyframes lmn-italic {
        0%, 100% { rotate: 0deg; translate: 0px 0; scale: 1 1; }
        50% { rotate: -1.9deg; translate: -0.84px 0; scale: 1 1.019; }
      }
  `],
  template: `
    <svg
      [attr.width]="size()"
      [attr.height]="size()"
      [attr.stroke-width]="strokeWidth()"
      [class.lmn-animate]="animate()" [style.animation]="animate() ? 'lmn-italic 560ms ease both' : null" viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M19 4h-9"/>
      <path d="M14 20H5"/>
      <path d="M15 4 9 20"/>
    </svg>
  `,
})
export class LmnItalicIcon extends LmnIconBase {}
