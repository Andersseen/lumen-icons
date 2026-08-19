import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LmnIconBase } from '../lib/icon-base';

@Component({
  selector: 'lmn-list',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.role]': 'ariaLabel() ? "img" : null',
    '[attr.aria-label]': 'ariaLabel() || null',
    '[attr.aria-hidden]': 'ariaLabel() ? null : "true"',
    '[class.lmn-animate]': 'animate()',
  },
  styles: [`
    @keyframes lmn-list {
          0% { stroke-dashoffset: 1; opacity: 0; transform: translateX(-3px); }
          18% { opacity: 1; }
          78% { transform: translateX(0.5px); }
          100% { stroke-dashoffset: 0; opacity: 1; transform: translateX(0); }
        }

    :host(.lmn-animate) svg path,
    :host(.lmn-animate) svg line,
    :host(.lmn-animate) svg circle,
    :host(.lmn-animate) svg rect,
    :host(.lmn-animate) svg g {
      transform-box: fill-box;
      transform-origin: center;
    }

    :host(.lmn-animate:not(.lmn-filled)) svg path {
          stroke-dasharray: 1;
          stroke-dashoffset: 0;
          animation: lmn-list 500ms cubic-bezier(0.3, 0.9, 0.35, 1) both;
        }
        :host(.lmn-animate.lmn-filled) svg {
          animation: lmn-list 500ms cubic-bezier(0.3, 0.9, 0.35, 1) both;
        }

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
      <path d="M8 6h13" pathLength="1"/><path d="M8 12h13" pathLength="1"/><path d="M8 18h13" pathLength="1"/><path d="M3 6h.01" pathLength="1"/><path d="M3 12h.01" pathLength="1"/><path d="M3 18h.01" pathLength="1"/>
    </svg>
  `,
})
export class LmnListIcon extends LmnIconBase {}
