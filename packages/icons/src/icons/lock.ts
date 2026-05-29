import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LmnIconBase } from '../lib/icon-base';

@Component({
  selector: 'lmn-lock',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.role]': 'ariaLabel() ? "img" : null',
    '[attr.aria-label]': 'ariaLabel() || null',
    '[attr.aria-hidden]': 'ariaLabel() ? null : "true"',
    '[class.lmn-animate]': 'animate()',
  },
  styles: [`
    .lmn-animate-el { display: inline-block; }
    
      @keyframes lmn-lock {
        0%, 100% { translate: 0 0px; scale: 1; }
        50% { translate: 0 -0.42px; scale: 1.015; }
      }
  `],
  template: `
    <svg
      [attr.width]="size()"
      [attr.height]="size()"
      [attr.stroke-width]="strokeWidth()"
      class="lmn-animate-el" [style.animation]="animate() ? 'lmn-lock 560ms ease 0ms both' : null" viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
      <path
        d="M7 11V7a5 5 0 0 1 10 0v4"
        class="lmn-animate-el" [style.animation]="animate() ? 'lmn-lock 560ms ease 50ms both' : null"/>
    </svg>
  `,
})
export class LmnLockIcon extends LmnIconBase {}
