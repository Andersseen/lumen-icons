import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LmnIconBase } from '../lib/icon-base';

@Component({
  selector: 'lmn-info',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.role]': 'ariaLabel() ? "img" : null',
    '[attr.aria-label]': 'ariaLabel() || null',
    '[attr.aria-hidden]': 'ariaLabel() ? null : "true"',
    '[class.lmn-animate]': 'animate()',
  },
  styles: [`
    @keyframes lmn-info-mark {
          0%, 34% { transform: scaleY(1); }
          44% { transform: scaleY(0.78); }
          60% { transform: scaleY(1.06); }
          100% { transform: scaleY(1); }
        }
        @keyframes lmn-info-dot {
          0% { transform: translateY(-6px); }
          40% { transform: translateY(0); }
          52% { transform: translateY(-1.8px); }
          64% { transform: translateY(0); }
          100% { transform: translateY(0); }
        }
        @keyframes lmn-info-flinch {
          0%, 42% { transform: scale(1) rotate(0deg); }
          52% { transform: scale(0.94) rotate(-4deg); }
          66% { transform: scale(1.02) rotate(3deg); }
          80% { transform: scale(1) rotate(-1.5deg); }
          100% { transform: scale(1) rotate(0deg); }
        }
        @keyframes lmn-info-filled {
          0% { transform: rotate(0deg); }
          22% { transform: rotate(-20deg); }
          46% { transform: rotate(14deg); }
          66% { transform: rotate(-7deg); }
          84% { transform: rotate(3deg); }
          100% { transform: rotate(0deg); }
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

    :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-2 { transform-origin: bottom center; }

    :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-2 { animation: lmn-info-mark 820ms ease-in-out both; }
        :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-3 { animation: lmn-info-dot 820ms cubic-bezier(0.5, 0, 0.3, 1) both; }
        :host(.lmn-animate.lmn-filled) svg { transform-origin: 50% 50%; animation: lmn-info-filled 820ms ease-in-out both; }

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
      <path class="lmn-path-1" fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 0 1 .67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 1 1-.671-1.34l.041-.022ZM12 9a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clip-rule="evenodd"/>
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
      <circle class="lmn-path-1" cx="12" cy="12" r="10"/><path class="lmn-path-2" d="M12 16v-4"/><path class="lmn-path-3" d="M12 8h.01"/>
    </svg>
    }
  `,
})
export class LmnInfoIcon extends LmnIconBase {}
