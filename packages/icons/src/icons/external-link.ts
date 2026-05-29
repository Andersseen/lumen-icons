import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LmnIconBase } from '../lib/icon-base';

@Component({
  selector: 'lmn-external-link',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.role]': 'ariaLabel() ? "img" : null',
    '[attr.aria-label]': 'ariaLabel() || null',
    '[attr.aria-hidden]': 'ariaLabel() ? null : "true"',
    '[class.lmn-animate]': 'animate()',
  },
  styles: [`
    .lmn-animate-el { display: inline-block; }
    
      @keyframes lmn-external-link {
        0%, 100% { scale: 1; }
        50% { scale: 1.015; }
      }
  `],
  template: `
    <svg
      [attr.width]="size()"
      [attr.height]="size()"
      [attr.stroke-width]="strokeWidth()"
      class="lmn-animate-el" [style.animation]="animate() ? 'lmn-external-link 560ms ease 0ms both' : null" viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M15 3h6v6"
        class="lmn-animate-el" [style.animation]="animate() ? 'lmn-external-link 560ms ease 60ms both' : null"/>
      <path
        d="M10 14 21 3"
        class="lmn-animate-el" [style.animation]="animate() ? 'lmn-external-link 560ms ease 60ms both' : null"/>
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
    </svg>
  `,
})
export class LmnExternalLinkIcon extends LmnIconBase {}
