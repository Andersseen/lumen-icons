import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LmnIconBase } from '../lib/icon-base';

@Component({
  selector: 'lmn-more-vertical',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.role]': 'ariaLabel() ? "img" : null',
    '[attr.aria-label]': 'ariaLabel() || null',
    '[attr.aria-hidden]': 'ariaLabel() ? null : "true"',
    '[class.lmn-animate]': 'animate()',
  },
  styles: [`
    .lmn-animate-el { display: inline-block; }
    
      @keyframes lmn-more-vertical {
        0%, 100% { scale: 1; }
        50% { scale: 1.11; }
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
        cx="12" cy="12" r="1"
        class="lmn-animate-el" [style.animation]="animate() ? 'lmn-more-vertical 560ms ease 0ms both' : null"/>
      <circle
        cx="12" cy="5" r="1"
        class="lmn-animate-el" [style.animation]="animate() ? 'lmn-more-vertical 560ms ease 100ms both' : null"/>
      <circle
        cx="12" cy="19" r="1"
        class="lmn-animate-el" [style.animation]="animate() ? 'lmn-more-vertical 560ms ease 200ms both' : null"/>
    </svg>
  `,
})
export class LmnMoreVerticalIcon extends LmnIconBase {}
