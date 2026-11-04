import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LmnIconBase } from '../lib/icon-base';

@Component({
  selector: 'lmn-checkbox',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.role]': 'ariaLabel() ? "img" : null',
    '[attr.aria-label]': 'ariaLabel() || null',
    '[attr.aria-hidden]': 'ariaLabel() ? null : "true"',
    '[class.lmn-animate]': 'animate()',
  },
  styles: [`
    @keyframes lmn-checkbox-draw {
          0% { stroke-dashoffset: 1; }
          58%, 100% { stroke-dashoffset: 0; }
        }
        @keyframes lmn-checkbox-pop {
          0%, 56% { transform: scale(1); }
          72% { transform: scale(1.18); }
          100% { transform: scale(1); }
        }
        @keyframes lmn-checkbox-press {
          0%, 10% { transform: scale(1); }
          40% { transform: scale(0.86); }
          66% { transform: scale(1.08); }
          100% { transform: scale(1); }
        }
        @keyframes lmn-checkbox-reveal {
          0% { clip-path: inset(0 100% 0 0); }
          58%, 100% { clip-path: inset(0 0 0 0); }
        }

    :host(.lmn-animate) svg {
      overflow: visible;
    }

    :host(.lmn-animate) svg path,
    :host(.lmn-animate) svg line,
    :host(.lmn-animate) svg circle,
    :host(.lmn-animate) svg rect,
    :host(.lmn-animate) svg polyline,
    :host(.lmn-animate) svg polygon,
    :host(.lmn-animate) svg ellipse,
    :host(.lmn-animate) svg g {
      transform-box: fill-box;
      transform-origin: center;
    }

    :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-2 { stroke-dasharray: 1; stroke-dashoffset: 0; animation: lmn-checkbox-draw 700ms cubic-bezier(0.22, 0.8, 0.32, 1) both, lmn-checkbox-pop 700ms cubic-bezier(0.175, 0.885, 0.32, 1.275) both; }
        :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-1 { animation: lmn-checkbox-press 700ms cubic-bezier(0.175, 0.885, 0.32, 1.275) both; }
        :host(.lmn-animate.lmn-filled) svg { animation: lmn-checkbox-press 700ms cubic-bezier(0.175, 0.885, 0.32, 1.275) both; }

    @media (prefers-reduced-motion: reduce) {
      :host(.lmn-animate),
      :host(.lmn-animate) svg,
      :host(.lmn-animate) path,
      :host(.lmn-animate) line,
      :host(.lmn-animate) circle,
      :host(.lmn-animate) rect,
      :host(.lmn-animate) polyline,
      :host(.lmn-animate) polygon,
      :host(.lmn-animate) ellipse,
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
      <path class="lmn-path-1" fill-rule="evenodd" d="M5.25 3A2.25 2.25 0 0 0 3 5.25v13.5A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V5.25A2.25 2.25 0 0 0 18.75 3H5.25Zm10.36 7.186a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clip-rule="evenodd" pathLength="1"/>
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
      <path class="lmn-path-1" d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" pathLength="1"/><path d="m9 11 3 3L22 4" class="lmn-animate-el lmn-path-2" pathLength="1"/>
    </svg>
    }
  `,
})
export class LmnCheckboxIcon extends LmnIconBase {}
