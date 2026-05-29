import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LmnIconBase } from '../lib/icon-base';

@Component({
  selector: 'lmn-copy',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.role]': 'ariaLabel() ? "img" : null',
    '[attr.aria-label]': 'ariaLabel() || null',
    '[attr.aria-hidden]': 'ariaLabel() ? null : "true"',
    '[class.lmn-animate]': 'animate()',
  },
  styles: [`
    .lmn-animate-el { display: inline-block; }
    
      @keyframes lmn-copy {
        0%, 100% { translate: 0px 0; translate: 0 0px; opacity: 1; }
        50% { translate: 0.84px 0; translate: 0 0.84px; opacity: 0.874; }
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
      <rect
        width="14" height="14" x="8" y="8" rx="2" ry="2"
        class="lmn-animate-el" [style.animation]="animate() ? 'lmn-copy 560ms ease-in-out 0ms both' : null"/>
      <path
        d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"
        class="lmn-animate-el" [style.animation]="animate() ? 'lmn-copy 560ms ease-in-out 60ms both' : null"/>
    </svg>
  `,
})
export class LmnCopyIcon extends LmnIconBase {}
