import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LmnIconBase } from '../lib/icon-base';

@Component({
  selector: 'lmn-server-stack',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.role]': 'ariaLabel() ? "img" : null',
    '[attr.aria-label]': 'ariaLabel() || null',
    '[attr.aria-hidden]': 'ariaLabel() ? null : "true"',
    '[class.lmn-animate]': 'animate()',
  },
  styles: [`
    @keyframes lmn-server-stack-layer { 0% { transform: translateY(5px); opacity: 0; } 70% { transform: translateY(-0.7px); opacity: 1; } 100% { transform: translateY(0); opacity: 1; } }

    :host(.lmn-animate) svg path,
    :host(.lmn-animate) svg line,
    :host(.lmn-animate) svg circle,
    :host(.lmn-animate) svg rect,
    :host(.lmn-animate) svg g {
      transform-box: fill-box;
      transform-origin: center;
    }

    :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-1 { animation: lmn-server-stack-layer 720ms cubic-bezier(0.22, 0.8, 0.32, 1) 385ms both; }
        :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-2 { animation: lmn-server-stack-layer 720ms cubic-bezier(0.22, 0.8, 0.32, 1) 330ms both; }
        :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-3 { animation: lmn-server-stack-layer 720ms cubic-bezier(0.22, 0.8, 0.32, 1) 275ms both; }
        :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-4 { animation: lmn-server-stack-layer 720ms cubic-bezier(0.22, 0.8, 0.32, 1) 220ms both; }
        :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-5 { animation: lmn-server-stack-layer 720ms cubic-bezier(0.22, 0.8, 0.32, 1) 165ms both; }
        :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-6 { animation: lmn-server-stack-layer 720ms cubic-bezier(0.22, 0.8, 0.32, 1) 110ms both; }
        :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-7 { animation: lmn-server-stack-layer 720ms cubic-bezier(0.22, 0.8, 0.32, 1) 55ms both; }
        :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-8 { animation: lmn-server-stack-layer 720ms cubic-bezier(0.22, 0.8, 0.32, 1) 0ms both; }

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
      <path class="lmn-path-1" d="M5.507 4.048A3 3 0 0 1 7.785 3h8.43a3 3 0 0 1 2.278 1.048l1.722 2.008A4.533 4.533 0 0 0 19.5 6h-15c-.243 0-.482.02-.715.056l1.722-2.008Z"/><path class="lmn-path-2" fill-rule="evenodd" d="M1.5 10.5a3 3 0 0 1 3-3h15a3 3 0 1 1 0 6h-15a3 3 0 0 1-3-3Zm15 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm2.25.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM4.5 15a3 3 0 1 0 0 6h15a3 3 0 1 0 0-6h-15Zm11.25 3.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM19.5 18a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" clip-rule="evenodd"/>
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
      <path class="lmn-path-1" d="M5.25 14.25 h13.5"/><path class="lmn-path-2" d="M5.25 14.25 a3 3 0 0 1 -3 -3"/><path class="lmn-path-3" d="M5.25 14.25 a3 3 0 1 0 0 6 h13.5 a3 3 0 1 0 0 -6"/><path class="lmn-path-4" d="M2.25 11.25 a3 3 0 0 1 3 -3 h13.5 a3 3 0 0 1 3 3"/><path class="lmn-path-5" d="M2.25 11.25 a4.5 4.5 0 0 1 0.9 -2.7 L5.737 5.1 a3.375 3.375 0 0 1 2.7 -1.35 h7.126 c1.062 0 2.062 0.5 2.7 1.35 l2.587 3.45 a4.5 4.5 0 0 1 0.9 2.7"/><path class="lmn-path-6" d="M21.75 11.25 a3 3 0 0 1 -3 3"/><path class="lmn-path-7" d="M18.75 17.25 h0.008 v0.008 h-0.008 v-0.008 Z"/><path class="lmn-path-8" d="M18.75 11.25 h0.008 v0.008 h-0.008 v-0.008 Z"/><path d="M15.75 17.25 h0.008 v0.008 h-0.008 v-0.008 Z"/><path d="M15.75 11.25 h0.008 v0.008 h-0.008 v-0.008 Z"/>
    </svg>
    }
  `,
})
export class LmnServerStackIcon extends LmnIconBase {}
