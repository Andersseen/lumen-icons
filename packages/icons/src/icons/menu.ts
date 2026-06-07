import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LmnIconBase } from '../lib/icon-base';

@Component({
  selector: 'lmn-menu',
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
    
      @keyframes lmn-menu {
        0%, 100% { scale: 1 1; }
        50% { scale: 0.932 1; }
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
      <line
        x1="4" x2="20" y1="6" y2="6"
        class="lmn-animate-el" [style.animation]="animate() ? 'lmn-menu 560ms ease-in-out 0ms both' : null"/>
      <line
        x1="4" x2="20" y1="12" y2="12"
        class="lmn-animate-el" [style.animation]="animate() ? 'lmn-menu 560ms ease-in-out 80ms both' : null"/>
      <line
        x1="4" x2="20" y1="18" y2="18"
        class="lmn-animate-el" [style.animation]="animate() ? 'lmn-menu 560ms ease-in-out 160ms both' : null"/>
    </svg>
  `,
})
export class LmnMenuIcon extends LmnIconBase {}
