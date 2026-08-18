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
    @keyframes lmn-menu-line {
          0% { stroke-dashoffset: 1; opacity: 0; }
          100% { stroke-dashoffset: 0; opacity: 1; }
        }
        @keyframes lmn-menu-line-reverse {
          0% { stroke-dashoffset: -1; opacity: 0; }
          100% { stroke-dashoffset: 0; opacity: 1; }
        }

    :host(.lmn-animate) svg path,
    :host(.lmn-animate) svg line,
    :host(.lmn-animate) svg circle,
    :host(.lmn-animate) svg rect,
    :host(.lmn-animate) svg g {
      transform-box: fill-box;
      transform-origin: center;
    }

    :host(.lmn-animate) svg .lmn-path-1,
        :host(.lmn-animate) svg .lmn-path-2,
        :host(.lmn-animate) svg .lmn-path-3 {
          stroke-dasharray: 1;
          stroke-dashoffset: 0;
          animation: lmn-menu-line 440ms cubic-bezier(0.22, 0.8, 0.32, 1) both;
        }
        :host(.lmn-animate) svg .lmn-path-1 { animation-delay: 0ms; }
        :host(.lmn-animate) svg .lmn-path-2 { animation-delay: 70ms; }
        :host(.lmn-animate) svg .lmn-path-3 { animation-delay: 140ms; }

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
      <line x1="4" x2="20" y1="6" y2="6" class="lmn-animate-el lmn-path-1" pathLength="1"/><line x1="4" x2="20" y1="12" y2="12" class="lmn-animate-el lmn-path-2" pathLength="1"/><line x1="4" x2="20" y1="18" y2="18" class="lmn-animate-el lmn-path-3" pathLength="1"/>
    </svg>
  `,
})
export class LmnMenuIcon extends LmnIconBase {}
