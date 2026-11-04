import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LmnIconBase } from '../lib/icon-base';

@Component({
  selector: 'lmn-folder-open',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.role]': 'ariaLabel() ? "img" : null',
    '[attr.aria-label]': 'ariaLabel() || null',
    '[attr.aria-hidden]': 'ariaLabel() ? null : "true"',
    '[class.lmn-animate]': 'animate()',
  },
  styles: [`
    @keyframes lmn-folder-open-front {
          0%, 12% { transform: scaleY(1.4); }
          56% { transform: scaleY(0.86); }
          76% { transform: scaleY(1.05); }
          100% { transform: scaleY(1); }
        }

    :host(.lmn-animate) svg path,
    :host(.lmn-animate) svg line,
    :host(.lmn-animate) svg circle,
    :host(.lmn-animate) svg rect,
    :host(.lmn-animate) svg g {
      transform-box: fill-box;
      transform-origin: center;
    }

    :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-1,
        :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-2 { transform-box: view-box; transform-origin: 12px 20.25px; }
        :host(.lmn-animate.lmn-filled) svg .lmn-path-2 { transform-box: view-box; transform-origin: 12px 21px; }

    :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-1,
        :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-2 { animation: lmn-folder-open-front 700ms cubic-bezier(0.45, 0, 0.25, 1) both; }
        :host(.lmn-animate.lmn-filled) svg .lmn-path-2 { animation: lmn-folder-open-front 700ms cubic-bezier(0.45, 0, 0.25, 1) both; }

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
      <path class="lmn-path-1" d="M19.906 9 c0.382 0 0.749 0.057 1.094 0.162 V9 a3 3 0 0 0 -3 -3 h-3.879 a0.75 0.75 0 0 1 -0.53 -0.22 L11.47 3.66 A2.25 2.25 0 0 0 9.879 3 H6 a3 3 0 0 0 -3 3 v3.162 A3.756 3.756 0 0 1 4.094 9 h15.812 Z"/><path class="lmn-path-2" d="M4.094 10.5 a2.25 2.25 0 0 0 -2.227 2.568 l0.857 6 A2.25 2.25 0 0 0 4.951 21 H19.05 a2.25 2.25 0 0 0 2.227 -1.932 l0.857 -6 a2.25 2.25 0 0 0 -2.227 -2.568 H4.094 Z"/>
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
      <path class="lmn-path-1" d="M3.75 9.776 c0.112 -0.017 0.227 -0.026 0.344 -0.026 h15.812 c0.117 0 0.232 0.009 0.344 0.026"/><path class="lmn-path-2" d="M3.75 9.776 a2.25 2.25 0 0 0 -1.883 2.542 l0.857 6 a2.25 2.25 0 0 0 2.227 1.932 H19.05 a2.25 2.25 0 0 0 2.227 -1.932 l0.857 -6 a2.25 2.25 0 0 0 -1.883 -2.542"/><path class="lmn-path-3" d="M3.7510000000000012 9.775999999999998 V6 A2.25 2.25 0 0 1 6 3.75 h3.879 a1.5 1.5 0 0 1 1.06 0.44 l2.122 2.12 a1.5 1.5 0 0 0 1.06 0.44 H18 A2.25 2.25 0 0 1 20.25 9 v0.776"/>
    </svg>
    }
  `,
})
export class LmnFolderOpenIcon extends LmnIconBase {}
