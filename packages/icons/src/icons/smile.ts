import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LmnIconBase } from '../lib/icon-base';

@Component({
  selector: 'lmn-smile',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.role]': 'ariaLabel() ? "img" : null',
    '[attr.aria-label]': 'ariaLabel() || null',
    '[attr.aria-hidden]': 'ariaLabel() ? null : "true"',
    '[class.lmn-animate]': 'animate()',
  },
  styles: [`
    @keyframes lmn-smile-mouth {
          0% { transform: scaleY(0.04); opacity: 0.55; }
          58% { transform: scaleY(1.3); opacity: 1; }
          80% { transform: scaleY(0.92); }
          100% { transform: scaleY(1); opacity: 1; }
        }
        @keyframes lmn-smile-face {
          0% { transform: scale(0.9); }
          56% { transform: scale(1.05); }
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

    :host(.lmn-animate) svg path { transform-origin: center; }

    :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-2 { animation: lmn-smile-mouth 640ms cubic-bezier(0.3, 1.4, 0.5, 1) both; }
        :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-1,
        :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-3,
        :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-4 { animation: lmn-smile-face 640ms cubic-bezier(0.3, 1.2, 0.5, 1) both; }
        :host(.lmn-animate.lmn-filled) svg { animation: lmn-smile-face 640ms cubic-bezier(0.3, 1.2, 0.5, 1) both; }

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
    
    :host(.lmn-filled) svg,
    :host(.lmn-filled) svg path {
      fill: currentColor;
      stroke: none;
    }
  
  `],
  template: `
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
      <circle cx="12" cy="12" r="10" class="lmn-animate-el lmn-path-1" /><path d="M8 14s1.5 2 4 2 4-2 4-2" class="lmn-animate-el lmn-path-2" /><line x1="9" y1="9" x2="9.01" y2="9" class="lmn-animate-el lmn-path-3" /><line x1="15" y1="9" x2="15.01" y2="9" class="lmn-animate-el lmn-path-4" />
    </svg>
  `,
})
export class LmnSmileIcon extends LmnIconBase {}
