import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LmnIconBase } from '../lib/icon-base';

@Component({
  selector: 'lmn-square-3-stack-3d',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.role]': 'ariaLabel() ? "img" : null',
    '[attr.aria-label]': 'ariaLabel() || null',
    '[attr.aria-hidden]': 'ariaLabel() ? null : "true"',
    '[class.lmn-animate]': 'animate()',
  },
  styles: [`
    @keyframes lmn-square-3-stack-3d-layer { 0% { transform: translateY(5px); opacity: 0; } 70% { transform: translateY(-0.7px); opacity: 1; } 100% { transform: translateY(0); opacity: 1; } }

    :host(.lmn-animate) svg path,
    :host(.lmn-animate) svg line,
    :host(.lmn-animate) svg circle,
    :host(.lmn-animate) svg rect,
    :host(.lmn-animate) svg g {
      transform-box: fill-box;
      transform-origin: center;
    }

    :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-1 { animation: lmn-square-3-stack-3d-layer 760ms cubic-bezier(0.22, 0.8, 0.32, 1) 385ms both; }
        :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-2 { animation: lmn-square-3-stack-3d-layer 760ms cubic-bezier(0.22, 0.8, 0.32, 1) 330ms both; }
        :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-3 { animation: lmn-square-3-stack-3d-layer 760ms cubic-bezier(0.22, 0.8, 0.32, 1) 275ms both; }
        :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-4 { animation: lmn-square-3-stack-3d-layer 760ms cubic-bezier(0.22, 0.8, 0.32, 1) 220ms both; }
        :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-5 { animation: lmn-square-3-stack-3d-layer 760ms cubic-bezier(0.22, 0.8, 0.32, 1) 165ms both; }
        :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-6 { animation: lmn-square-3-stack-3d-layer 760ms cubic-bezier(0.22, 0.8, 0.32, 1) 110ms both; }
        :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-7 { animation: lmn-square-3-stack-3d-layer 760ms cubic-bezier(0.22, 0.8, 0.32, 1) 55ms both; }
        :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-8 { animation: lmn-square-3-stack-3d-layer 760ms cubic-bezier(0.22, 0.8, 0.32, 1) 0ms both; }

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
      <path class="lmn-path-1" d="M11.644 1.59a.75.75 0 0 1 .712 0l9.75 5.25a.75.75 0 0 1 0 1.32l-9.75 5.25a.75.75 0 0 1-.712 0l-9.75-5.25a.75.75 0 0 1 0-1.32l9.75-5.25Z"/><path class="lmn-path-2" d="m3.265 10.602 7.668 4.129a2.25 2.25 0 0 0 2.134 0l7.668-4.13 1.37.739a.75.75 0 0 1 0 1.32l-9.75 5.25a.75.75 0 0 1-.71 0l-9.75-5.25a.75.75 0 0 1 0-1.32l1.37-.738Z"/><path class="lmn-path-3" d="m10.933 19.231-7.668-4.13-1.37.739a.75.75 0 0 0 0 1.32l9.75 5.25c.221.12.489.12.71 0l9.75-5.25a.75.75 0 0 0 0-1.32l-1.37-.738-7.668 4.13a2.25 2.25 0 0 1-2.134-.001Z"/>
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
      <path class="lmn-path-1" d="M6.429 9.75 2.25 12 l4.179 2.25"/><path class="lmn-path-2" d="M6.429 9.75 l5.571 3 5.571 -3"/><path class="lmn-path-3" d="M6.4289999999999985 9.75 L2.25 7.5 12 2.25 l9.75 5.25 -4.179 2.25"/><path class="lmn-path-4" d="M7.821 4.5 L21.75 12 l-4.179 2.25"/><path class="lmn-path-5" d="M17.570999999999998 14.25 l4.179 2.25 L12 21.75 2.25 16.5 l4.179 -2.25"/><path class="lmn-path-6" d="M17.570999999999998 14.25 l-5.571 3 -5.571 -3"/>
    </svg>
    }
  `,
})
export class LmnSquare3Stack3dIcon extends LmnIconBase {}
