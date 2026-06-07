import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LmnIconBase } from '../lib/icon-base';

@Component({
  selector: 'lmn-log-in',
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
@keyframes lmn-log-in { 0%, 100% { translate: 0 0; } 50% { translate: 1px 0; } }`],
  template: `
    <svg [attr.width]="size()" [attr.height]="size()" [attr.stroke-width]="strokeWidth()" [style.animation]="animate() ? 'lmn-log-in 560ms ease both' : null" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
      <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
      <path d="m10 17 5-5-5-5"/>
      <path d="M15 12H3"/>
    </svg>
  `,
})
export class LmnLogInIcon extends LmnIconBase {}
