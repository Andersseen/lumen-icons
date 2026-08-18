import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LmnIconBase } from '../lib/icon-base';

@Component({
  selector: 'lmn-x',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.role]': 'ariaLabel() ? "img" : null',
    '[attr.aria-label]': 'ariaLabel() || null',
    '[attr.aria-hidden]': 'ariaLabel() ? null : "true"',
    '[class.lmn-animate]': 'animate()',
  },
  styles: [`
    @keyframes lmn-x-left { 0% { stroke-dashoffset: 1; transform: rotate(-45deg); opacity: 0; } 28% { opacity: 1; } 76% { transform: rotate(3deg); } 100% { stroke-dashoffset: 0; transform: rotate(0); opacity: 1; } } @keyframes lmn-x-right { 0% { stroke-dashoffset: 1; transform: rotate(45deg); opacity: 0; } 28% { opacity: 1; } 76% { transform: rotate(-3deg); } 100% { stroke-dashoffset: 0; transform: rotate(0); opacity: 1; } }

    :host(.lmn-animate) svg path,
    :host(.lmn-animate) svg line,
    :host(.lmn-animate) svg circle,
    :host(.lmn-animate) svg rect,
    :host(.lmn-animate) svg g {
      transform-box: fill-box;
      transform-origin: center;
    }

    :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-1, :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-2 { stroke-dasharray: 1; stroke-dashoffset: 0; transform-origin: center; } :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-1 { animation: lmn-x-left 560ms cubic-bezier(0.22, 0.8, 0.32, 1) both; } :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-2 { animation: lmn-x-right 560ms cubic-bezier(0.22, 0.8, 0.32, 1) 70ms both; }

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
      <path d="M18 6 6 18" class="lmn-animate-el lmn-path-1" pathLength="1"/><path d="m6 6 12 12" class="lmn-animate-el lmn-path-2" pathLength="1"/>
    </svg>
  `,
})
export class LmnXIcon extends LmnIconBase {}
