import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LmnIconBase } from '../lib/icon-base';

@Component({
  selector: 'lmn-folder-minus',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.role]': 'ariaLabel() ? "img" : null',
    '[attr.aria-label]': 'ariaLabel() || null',
    '[attr.aria-hidden]': 'ariaLabel() ? null : "true"',
    '[class.lmn-animate]': 'animate()',
  },
  styles: [`
    @keyframes lmn-folder-minus-mark {
          0%, 8% { transform: scaleX(1); }
          44%, 54% { transform: scaleX(0.14); }
          80% { transform: scaleX(1.12); }
          100% { transform: scaleX(1); }
        }
        @keyframes lmn-folder-minus-filled {
          0% { transform: scale(1); }
          42% { transform: scale(0.84); }
          70% { transform: scale(1.03); }
          100% { transform: scale(1); }
        }

    :host(.lmn-animate) svg path,
    :host(.lmn-animate) svg line,
    :host(.lmn-animate) svg circle,
    :host(.lmn-animate) svg rect,
    :host(.lmn-animate) svg g {
      transform-box: fill-box;
      transform-origin: center;
    }

    :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-1 { transform-box: view-box; transform-origin: 12px 13.5px; }

    :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-1 { animation: lmn-folder-minus-mark 620ms cubic-bezier(0.3, 0.9, 0.35, 1) both; }
        :host(.lmn-animate.lmn-filled) svg { animation: lmn-folder-minus-filled 620ms cubic-bezier(0.3, 0.9, 0.35, 1) both; }

    @media (prefers-reduced-motion: reduce) {
      :host(.lmn-animate),
      :host(.lmn-animate) svg,
      :host(.lmn-animate) path,
      :host(.lmn-animate) line,
      :host(.lmn-animate) circle,
      :host(.lmn-animate) rect,
      :host(.lmn-animate) g,
      :host(.lmn-animate) .lmn-animate-el {
        animation: none !important;
      }
    }
    
  `],
  template: `
    @if (variant() === 'filled') {
      <svg
      [attr.width]="size()"
      [attr.height]="size()"
      [class.lmn-animate]="animate()"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path class="lmn-path-1" fill-rule="evenodd" d="M19.5 21a3 3 0 0 0 3-3V9a3 3 0 0 0-3-3h-5.379a.75.75 0 0 1-.53-.22L11.47 3.66A2.25 2.25 0 0 0 9.879 3H4.5a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h15ZM9 12.75a.75.75 0 0 0 0 1.5h6a.75.75 0 0 0 0-1.5H9Z" clip-rule="evenodd"/>
    </svg>
    } @else {
      <svg
      [attr.width]="size()"
      [attr.height]="size()"
      [attr.stroke-width]="strokeWidth()"
      [style.--lmn-stroke-width]="strokeWidth() + 'px'"
      [class.lmn-animate]="animate()"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path class="lmn-path-1" d="M15 13.5 H9"/><path class="lmn-path-2" d="M13.059999999999999 6.31 l-2.12 -2.12 a1.5 1.5 0 0 0 -1.061 -0.44 H4.5 A2.25 2.25 0 0 0 2.25 6 v12 a2.25 2.25 0 0 0 2.25 2.25 h15 A2.25 2.25 0 0 0 21.75 18 V9 a2.25 2.25 0 0 0 -2.25 -2.25 h-5.379 a1.5 1.5 0 0 1 -1.06 -0.44 Z"/>
    </svg>
    }
  `,
})
export class LmnFolderMinusIcon extends LmnIconBase {}
