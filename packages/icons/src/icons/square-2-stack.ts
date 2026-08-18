import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LmnIconBase } from '../lib/icon-base';

@Component({
  selector: 'lmn-square-2-stack',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.role]': 'ariaLabel() ? "img" : null',
    '[attr.aria-label]': 'ariaLabel() || null',
    '[attr.aria-hidden]': 'ariaLabel() ? null : "true"',
    '[class.lmn-animate]': 'animate()',
  },
  styles: [`
    @keyframes lmn-square-2-stack-layer { 0% { transform: translateY(5px); opacity: 0; } 70% { transform: translateY(-0.7px); opacity: 1; } 100% { transform: translateY(0); opacity: 1; } }

    :host(.lmn-animate) svg path,
    :host(.lmn-animate) svg line,
    :host(.lmn-animate) svg circle,
    :host(.lmn-animate) svg rect,
    :host(.lmn-animate) svg g {
      transform-box: fill-box;
      transform-origin: center;
    }

    :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-1 { animation: lmn-square-2-stack-layer 680ms cubic-bezier(0.22, 0.8, 0.32, 1) 385ms both; }
        :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-2 { animation: lmn-square-2-stack-layer 680ms cubic-bezier(0.22, 0.8, 0.32, 1) 330ms both; }
        :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-3 { animation: lmn-square-2-stack-layer 680ms cubic-bezier(0.22, 0.8, 0.32, 1) 275ms both; }
        :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-4 { animation: lmn-square-2-stack-layer 680ms cubic-bezier(0.22, 0.8, 0.32, 1) 220ms both; }
        :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-5 { animation: lmn-square-2-stack-layer 680ms cubic-bezier(0.22, 0.8, 0.32, 1) 165ms both; }
        :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-6 { animation: lmn-square-2-stack-layer 680ms cubic-bezier(0.22, 0.8, 0.32, 1) 110ms both; }
        :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-7 { animation: lmn-square-2-stack-layer 680ms cubic-bezier(0.22, 0.8, 0.32, 1) 55ms both; }
        :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-8 { animation: lmn-square-2-stack-layer 680ms cubic-bezier(0.22, 0.8, 0.32, 1) 0ms both; }

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
      <path class="lmn-path-1" d="M16.5 6a3 3 0 0 0-3-3H6a3 3 0 0 0-3 3v7.5a3 3 0 0 0 3 3v-6A4.5 4.5 0 0 1 10.5 6h6Z"/><path class="lmn-path-2" d="M18 7.5a3 3 0 0 1 3 3V18a3 3 0 0 1-3 3h-7.5a3 3 0 0 1-3-3v-7.5a3 3 0 0 1 3-3H18Z"/>
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
      <path class="lmn-path-1" d="M16.5 8.25 V6 a2.25 2.25 0 0 0 -2.25 -2.25 H6 A2.25 2.25 0 0 0 3.75 6 v8.25 A2.25 2.25 0 0 0 6 16.5 h2.25"/><path class="lmn-path-2" d="M16.5 8.25 H18 a2.25 2.25 0 0 1 2.25 2.25 V18 A2.25 2.25 0 0 1 18 20.25 h-7.5 A2.25 2.25 0 0 1 8.25 18 v-1.5"/><path class="lmn-path-3" d="M16.5 8.25 h-6 a2.25 2.25 0 0 0 -2.25 2.25 v6"/>
    </svg>
    }
  `,
})
export class LmnSquare2StackIcon extends LmnIconBase {}
