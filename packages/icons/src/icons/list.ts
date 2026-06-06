import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LmnIconBase } from '../lib/icon-base';

@Component({
  selector: 'lmn-list',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.role]': 'ariaLabel() ? "img" : null',
    '[attr.aria-label]': 'ariaLabel() || null',
    '[attr.aria-hidden]': 'ariaLabel() ? null : "true"',
    '[class.lmn-animate]': 'animate()',
  },
  styles: [`@keyframes lmn-list { 0%, 100% { translate: 0 0; } 50% { translate: 0.8px 0; } }`],
  template: `
    <svg [attr.width]="size()" [attr.height]="size()" [attr.stroke-width]="strokeWidth()" [style.animation]="animate() ? 'lmn-list 560ms ease both' : null" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
      <path d="M8 6h13"/>
      <path d="M8 12h13"/>
      <path d="M8 18h13"/>
      <path d="M3 6h.01"/>
      <path d="M3 12h.01"/>
      <path d="M3 18h.01"/>
    </svg>
  `,
})
export class LmnListIcon extends LmnIconBase {}
