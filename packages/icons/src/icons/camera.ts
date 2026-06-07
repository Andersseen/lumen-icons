import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LmnIconBase } from '../lib/icon-base';

@Component({
  selector: 'lmn-camera',
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
    
      @keyframes lmn-camera {
        0%, 100% { scale: 1; translate: 0 0px; }
        50% { scale: 1.015; translate: 0 0px; }
      }
  `],
  template: `
    <svg
      [attr.width]="size()"
      [attr.height]="size()"
      [attr.stroke-width]="strokeWidth()"
      class="lmn-animate-el" [style.animation]="animate() ? 'lmn-camera 560ms ease 0ms both' : null" viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/>
      <circle
        cx="12"
        cy="13"
        r="3"
        class="lmn-animate-el" [style.animation]="animate() ? 'lmn-camera 560ms ease 60ms both' : null"/>
    </svg>
  `,
})
export class LmnCameraIcon extends LmnIconBase {}
