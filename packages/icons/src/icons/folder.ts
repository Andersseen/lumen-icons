import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LmnIconBase } from '../lib/icon-base';

@Component({
  selector: 'lmn-folder',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.role]': 'ariaLabel() ? "img" : null',
    '[attr.aria-label]': 'ariaLabel() || null',
    '[attr.aria-hidden]': 'ariaLabel() ? null : "true"',
    '[class.lmn-animate]': 'animate()',
  },
  styles: [`
    @keyframes lmn-folder-front {
          0%, 12% { transform: perspective(140px) rotateX(0deg) translateY(0); }
          42%, 58% { transform: perspective(140px) rotateX(-52deg) translateY(-1.5px); }
          100% { transform: perspective(140px) rotateX(0deg) translateY(0); }
        }
        @keyframes lmn-folder-back {
          0% { transform: translateY(1.5px) scaleX(0.96); }
          52% { transform: translateY(-0.5px) scaleX(1.01); }
          100% { transform: translateY(0) scaleX(1); }
        }

    :host(.lmn-animate) svg path,
    :host(.lmn-animate) svg line,
    :host(.lmn-animate) svg circle,
    :host(.lmn-animate) svg rect,
    :host(.lmn-animate) svg g {
      transform-box: fill-box;
      transform-origin: center;
    }

    :host(.lmn-animate) svg .lmn-path-1 { transform-origin: bottom center; }
        :host(.lmn-animate) svg .lmn-path-2 { transform-origin: center; }

    :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-1 { animation: lmn-folder-front 720ms cubic-bezier(0.4, 0, 0.2, 1) both; }
        :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-2 { animation: lmn-folder-back 720ms ease-out both; }
        :host(.lmn-animate.lmn-filled) svg { animation: lmn-folder-front 720ms cubic-bezier(0.4, 0, 0.2, 1) both; }

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
      <path class="lmn-path-1" d="M19.5 21a3 3 0 0 0 3-3v-4.5a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3V18a3 3 0 0 0 3 3h15ZM1.5 10.146V6a3 3 0 0 1 3-3h5.379a2.25 2.25 0 0 1 1.59.659l2.122 2.121c.14.141.331.22.53.22H19.5a3 3 0 0 1 3 3v1.146A4.483 4.483 0 0 0 19.5 9h-15a4.483 4.483 0 0 0-3 1.146Z"/>
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
      <path class="lmn-path-1" d="M2.25 12.75 V12 A2.25 2.25 0 0 1 4.5 9.75 h15 A2.25 2.25 0 0 1 21.75 12 v0.75"/><path class="lmn-path-2" d="M13.06 6.31 l-2.12 -2.12 a1.5 1.5 0 0 0 -1.061 -0.44 H4.5 A2.25 2.25 0 0 0 2.25 6 v12 a2.25 2.25 0 0 0 2.25 2.25 h15 A2.25 2.25 0 0 0 21.75 18 V9 a2.25 2.25 0 0 0 -2.25 -2.25 h-5.379 a1.5 1.5 0 0 1 -1.06 -0.44 Z"/>
    </svg>
    }
  `,
})
export class LmnFolderIcon extends LmnIconBase {}
