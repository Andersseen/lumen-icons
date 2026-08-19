import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LmnIconBase } from '../lib/icon-base';

@Component({
  selector: 'lmn-camera',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.role]': 'ariaLabel() ? "img" : null',
    '[attr.aria-label]': 'ariaLabel() || null',
    '[attr.aria-hidden]': 'ariaLabel() ? null : "true"',
    '[class.lmn-animate]': 'animate()',
  },
  styles: [`
    @keyframes lmn-camera-iris {
          0% { transform: scale(1); }
          38% { transform: scale(0.06); }
          52% { transform: scale(0.06); }
          82% { transform: scale(1.12); }
          100% { transform: scale(1); }
        }
        @keyframes lmn-camera-body {
          0%, 30% { transform: scale(1, 1); }
          46% { transform: scale(1.05, 0.94); }
          72% { transform: scale(0.98, 1.02); }
          100% { transform: scale(1, 1); }
        }
        @keyframes lmn-camera-flash {
          0%, 32% { opacity: 1; transform: scale(1); }
          44% { opacity: 1; transform: scale(2.6); }
          70%, 100% { opacity: 1; transform: scale(1); }
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
        :host(.lmn-animate) svg .lmn-path-3 { transform-origin: center; }

    :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-2 { animation: lmn-camera-iris 560ms cubic-bezier(0.3, 0, 0.2, 1) both; }
        :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-1 { animation: lmn-camera-body 560ms ease-out both; }
        :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-3 { animation: lmn-camera-flash 560ms ease-out both; }
        :host(.lmn-animate.lmn-filled) svg { animation: lmn-camera-body 560ms ease-out both; }

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
      <path class="lmn-path-1" d="M12 9a3.75 3.75 0 1 0 0 7.5A3.75 3.75 0 0 0 12 9Z"/><path class="lmn-path-2" fill-rule="evenodd" d="M9.344 3.071a49.52 49.52 0 0 1 5.312 0c.967.052 1.83.585 2.332 1.39l.821 1.317c.24.383.645.643 1.11.71.386.054.77.113 1.152.177 1.432.239 2.429 1.493 2.429 2.909V18a3 3 0 0 1-3 3h-15a3 3 0 0 1-3-3V9.574c0-1.416.997-2.67 2.429-2.909.382-.064.766-.123 1.151-.178a1.56 1.56 0 0 0 1.11-.71l.822-1.315a2.942 2.942 0 0 1 2.332-1.39ZM6.75 12.75a5.25 5.25 0 1 1 10.5 0 5.25 5.25 0 0 1-10.5 0Zm12-1.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clip-rule="evenodd"/>
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
      <path class="lmn-path-1" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"/><path class="lmn-path-2" d="M16.5 12.75 a4.5 4.5 0 1 1 -9 0 4.5 4.5 0 0 1 9 0 Z"/><path class="lmn-path-3" d="M18.75 10.5 h0.008 v0.008 h-0.008 V10.5 Z"/>
    </svg>
    }
  `,
})
export class LmnCameraIcon extends LmnIconBase {}
