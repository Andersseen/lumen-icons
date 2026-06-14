import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LmnIconBase } from '../lib/icon-base';

@Component({
  selector: 'lmn-lock',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.role]': 'ariaLabel() ? "img" : null',
    '[attr.aria-label]': 'ariaLabel() || null',
    '[attr.aria-hidden]': 'ariaLabel() ? null : "true"',
    '[class.lmn-animate]': 'animate()',
  },
  styles: [`
    @keyframes lmn-lock { 0%, 100% { scale: 1; } 50% { scale: 1.1; } }

    @media (prefers-reduced-motion: reduce) {
      .lmn-animate,
      .lmn-animate-el {
        animation: none !important;
      }
    }
  `],
  template: `
    <svg
      [attr.width]="size()"
      [attr.height]="size()"
      [attr.stroke-width]="strokeWidth()"
      [class.lmn-animate]="animate()"
      [style.animation]="animate() ? 'lmn-lock 500ms ease both' : null"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <rect
        width="18" height="11" x="3" y="11" rx="2" ry="2"
        class="lmn-animate-el" [style.animation]="animate() ? 'lmn-lock-body 560ms ease 0ms both' : null"/><path
        d="M7 11V7a5 5 0 0 1 10 0v4"
        class="lmn-animate-el" [style.animation]="animate() ? 'lmn-lock-shackle 560ms ease 70ms both' : null"/>
    </svg>
  `,
})
export class LmnLockIcon extends LmnIconBase {}
