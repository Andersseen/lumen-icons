import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LmnIconBase } from '../lib/icon-base';

@Component({
  selector: 'lmn-sun',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.role]': 'ariaLabel() ? "img" : null',
    '[attr.aria-label]': 'ariaLabel() || null',
    '[attr.aria-hidden]': 'ariaLabel() ? null : "true"',
    '[class.lmn-animate]': 'animate()',
  },
  styles: [`
    @keyframes lmn-sun-ray {
          0% { transform: scale(0.2); opacity: 0.15; }
          55% { transform: scale(1.35); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes lmn-sun-disc {
          0% { transform: scale(0.72); }
          58% { transform: scale(1.14); }
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

    :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-1 { animation: lmn-sun-ray 900ms cubic-bezier(0.22, 0.9, 0.3, 1) 42ms both; }
        :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-2 { animation: lmn-sun-ray 900ms cubic-bezier(0.22, 0.9, 0.3, 1) 84ms both; }
        :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-3 { animation: lmn-sun-ray 900ms cubic-bezier(0.22, 0.9, 0.3, 1) 126ms both; }
        :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-4 { animation: lmn-sun-ray 900ms cubic-bezier(0.22, 0.9, 0.3, 1) 168ms both; }
        :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-5 { animation: lmn-sun-ray 900ms cubic-bezier(0.22, 0.9, 0.3, 1) 210ms both; }
        :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-6 { animation: lmn-sun-ray 900ms cubic-bezier(0.22, 0.9, 0.3, 1) 252ms both; }
        :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-7 { animation: lmn-sun-ray 900ms cubic-bezier(0.22, 0.9, 0.3, 1) 294ms both; }
        :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-8 { animation: lmn-sun-ray 900ms cubic-bezier(0.22, 0.9, 0.3, 1) 336ms both; }
        :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-9 { animation: lmn-sun-disc 900ms cubic-bezier(0.3, 1.3, 0.5, 1) both; }
        :host(.lmn-animate.lmn-filled) svg { animation: lmn-sun-disc 900ms cubic-bezier(0.3, 1.3, 0.5, 1) both; }

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
      <path class="lmn-path-1" d="M12 2.25a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-1.5 0V3a.75.75 0 0 1 .75-.75ZM7.5 12a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM18.894 6.166a.75.75 0 0 0-1.06-1.06l-1.591 1.59a.75.75 0 1 0 1.06 1.061l1.591-1.59ZM21.75 12a.75.75 0 0 1-.75.75h-2.25a.75.75 0 0 1 0-1.5H21a.75.75 0 0 1 .75.75ZM17.834 18.894a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 1 0-1.061 1.06l1.59 1.591ZM12 18a.75.75 0 0 1 .75.75V21a.75.75 0 0 1-1.5 0v-2.25A.75.75 0 0 1 12 18ZM7.758 17.303a.75.75 0 0 0-1.061-1.06l-1.591 1.59a.75.75 0 0 0 1.06 1.061l1.591-1.59ZM6 12a.75.75 0 0 1-.75.75H3a.75.75 0 0 1 0-1.5h2.25A.75.75 0 0 1 6 12ZM6.697 7.757a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 0 0-1.061 1.06l1.59 1.591Z"/>
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
      <path class="lmn-path-1" d="M12 3 v2.25"/><path class="lmn-path-2" d="M18.364 5.636 l-1.591 1.591"/><path class="lmn-path-3" d="M21 12 h-2.25"/><path class="lmn-path-4" d="M18.364 18.364 l-1.591 -1.591"/><path class="lmn-path-5" d="M12 18.75 V21"/><path class="lmn-path-6" d="M7.227 16.773 l-1.591 1.591"/><path class="lmn-path-7" d="M5.25 12 H3"/><path class="lmn-path-8" d="M7.227 7.227 L5.636 5.636"/><path class="lmn-path-9" d="M15.75 12 a3.75 3.75 0 1 1 -7.5 0 3.75 3.75 0 0 1 7.5 0 Z"/>
    </svg>
    }
  `,
})
export class LmnSunIcon extends LmnIconBase {}
