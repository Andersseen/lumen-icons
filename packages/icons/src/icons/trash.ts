import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LmnIconBase } from '../lib/icon-base';

@Component({
  selector: 'lmn-trash',
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

    .lmn-animate-el {
      display: inline-block;
      transform-box: fill-box;
      transform-origin: center;
    }
    
    @keyframes lmn-trash-body {
      0%, 100% { translate: 0 0; }
      45% { translate: 0 0.8px; }
    }

    @keyframes lmn-trash-lid {
      0%, 100% { translate: 0 0; rotate: 0deg; }
      45% { translate: 0 -1px; rotate: -5deg; }
    }
  

    @media (prefers-reduced-motion: reduce) {
      :host(.lmn-animate) svg,
      :host(.lmn-animate) .lmn-animate-el {
        animation: none !important;
      }
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
      <polyline
        points="3 6 5 6 21 6"
        class="lmn-animate-el" [style.animation]="animate() ? 'lmn-trash-lid 560ms ease 0ms both' : null"/>
      <path
        d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
        class="lmn-animate-el" [style.animation]="animate() ? 'lmn-trash-body 560ms ease 70ms both' : null"/>
    </svg>
  `,
})
export class LmnTrashIcon extends LmnIconBase {}
