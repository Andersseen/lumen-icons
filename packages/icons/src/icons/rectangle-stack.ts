import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LmnIconBase } from '../lib/icon-base';

@Component({
  selector: 'lmn-rectangle-stack',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.role]': 'ariaLabel() ? "img" : null',
    '[attr.aria-label]': 'ariaLabel() || null',
    '[attr.aria-hidden]': 'ariaLabel() ? null : "true"',
    '[class.lmn-animate]': 'animate()',
  },
  styles: [`
    @keyframes lmn-rectangle-stack-layer { 0% { transform: translateY(5px); opacity: 0; } 70% { transform: translateY(-0.7px); opacity: 1; } 100% { transform: translateY(0); opacity: 1; } }

    :host(.lmn-animate) svg path,
    :host(.lmn-animate) svg line,
    :host(.lmn-animate) svg circle,
    :host(.lmn-animate) svg rect,
    :host(.lmn-animate) svg g {
      transform-box: fill-box;
      transform-origin: center;
    }

    :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-1 { animation: lmn-rectangle-stack-layer 680ms cubic-bezier(0.22, 0.8, 0.32, 1) 385ms both; }
        :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-2 { animation: lmn-rectangle-stack-layer 680ms cubic-bezier(0.22, 0.8, 0.32, 1) 330ms both; }
        :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-3 { animation: lmn-rectangle-stack-layer 680ms cubic-bezier(0.22, 0.8, 0.32, 1) 275ms both; }
        :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-4 { animation: lmn-rectangle-stack-layer 680ms cubic-bezier(0.22, 0.8, 0.32, 1) 220ms both; }
        :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-5 { animation: lmn-rectangle-stack-layer 680ms cubic-bezier(0.22, 0.8, 0.32, 1) 165ms both; }
        :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-6 { animation: lmn-rectangle-stack-layer 680ms cubic-bezier(0.22, 0.8, 0.32, 1) 110ms both; }
        :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-7 { animation: lmn-rectangle-stack-layer 680ms cubic-bezier(0.22, 0.8, 0.32, 1) 55ms both; }
        :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-8 { animation: lmn-rectangle-stack-layer 680ms cubic-bezier(0.22, 0.8, 0.32, 1) 0ms both; }

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
      <path class="lmn-path-1" d="M5.566 4.657A4.505 4.505 0 0 1 6.75 4.5h10.5c.41 0 .806.055 1.183.157A3 3 0 0 0 15.75 3h-7.5a3 3 0 0 0-2.684 1.657ZM2.25 12a3 3 0 0 1 3-3h13.5a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3v-6ZM5.25 7.5c-.41 0-.806.055-1.184.157A3 3 0 0 1 6.75 6h10.5a3 3 0 0 1 2.683 1.657A4.505 4.505 0 0 0 18.75 7.5H5.25Z"/>
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
      <path class="lmn-path-1" d="M6 6.878 V6 a2.25 2.25 0 0 1 2.25 -2.25 h7.5 A2.25 2.25 0 0 1 18 6 v0.878"/><path class="lmn-path-2" d="M6 6.878 c0.235 -0.083 0.487 -0.128 0.75 -0.128 h10.5 c0.263 0 0.515 0.045 0.75 0.128"/><path class="lmn-path-3" d="M6 6.878 A2.25 2.25 0 0 0 4.5 9 v0.878"/><path class="lmn-path-4" d="M18 6.878 A2.25 2.25 0 0 1 19.5 9 v0.878"/><path class="lmn-path-5" d="M19.5 9.878 a2.246 2.246 0 0 0 -0.75 -0.128 H5.25 c-0.263 0 -0.515 0.045 -0.75 0.128"/><path class="lmn-path-6" d="M19.5 9.878 A2.25 2.25 0 0 1 21 12 v6 a2.25 2.25 0 0 1 -2.25 2.25 H5.25 A2.25 2.25 0 0 1 3 18 v-6 c0 -0.98 0.626 -1.813 1.5 -2.122"/>
    </svg>
    }
  `,
})
export class LmnRectangleStackIcon extends LmnIconBase {}
