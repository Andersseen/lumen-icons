import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LmnIconBase } from '../lib/icon-base';

@Component({
  selector: 'lmn-database',
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
@keyframes lmn-database { 0%, 100% { translate: 0 0; } 50% { translate: 0 -0.8px; } }`],
  template: `
    <svg [attr.width]="size()" [attr.height]="size()" [attr.stroke-width]="strokeWidth()" [style.animation]="animate() ? 'lmn-database 560ms ease both' : null" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
      <ellipse cx="12" cy="5" rx="8" ry="3"/>
      <path d="M4 5v6c0 1.66 3.58 3 8 3s8-1.34 8-3V5"/>
      <path d="M4 11v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6"/>
    </svg>
  `,
})
export class LmnDatabaseIcon extends LmnIconBase {}
