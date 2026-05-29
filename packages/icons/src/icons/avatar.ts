import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LmnIconBase } from '../lib/icon-base';

@Component({
  selector: 'lmn-avatar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.role]': 'ariaLabel() ? "img" : null',
    '[attr.aria-label]': 'ariaLabel() || null',
    '[attr.aria-hidden]': 'ariaLabel() ? null : "true"',
    '[class.lmn-animate]': 'animate()',
  },
  styles: [`
    .lmn-animate-el { display: inline-block; }
    
      @keyframes lmn-avatar {
        0%, 100% { scale: 1; }
        50% { scale: 1.038; }
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
        cx="12" cy="8" r="5"
        class="lmn-animate-el" [style.animation]="animate() ? 'lmn-avatar 560ms ease 0ms both' : null"/>
      <path
        d="M20 21a8 8 0 1 0-16 0"
        class="lmn-animate-el" [style.animation]="animate() ? 'lmn-avatar 560ms ease 60ms both' : null"/>
    </svg>
  `,
})
export class LmnAvatarIcon extends LmnIconBase {}
