import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LmnIconBase } from '../lib/icon-base';

@Component({
  selector: 'lmn-h3',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.role]': 'ariaLabel() ? "img" : null',
    '[attr.aria-label]': 'ariaLabel() || null',
    '[attr.aria-hidden]': 'ariaLabel() ? null : "true"',
    '[class.lmn-animate]': 'animate()',
  },
  styles: [`
    @keyframes lmn-h3 {
          0% { opacity: 0; transform: translateY(3px); }
          100% { opacity: 1; transform: translateY(0); }
        }

    :host(.lmn-animate) svg path,
    :host(.lmn-animate) svg line,
    :host(.lmn-animate) svg circle,
    :host(.lmn-animate) svg rect,
    :host(.lmn-animate) svg g {
      transform-box: fill-box;
      transform-origin: center;
    }

    :host(.lmn-animate) svg {
          animation: lmn-h3 500ms ease both;
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
      <path fill-rule="evenodd" d="M12.749 3.743a.75.75 0 0 1 .75.75v15.002a.75.75 0 1 1-1.5 0v-6.75H2.997v6.75a.75.75 0 0 1-1.5 0V4.494a.75.75 0 1 1 1.5 0v6.75H12v-6.75a.75.75 0 0 1 .75-.75ZM18.75 10.5c-.727 0-1.441.055-2.139.16a.75.75 0 1 1-.223-1.483 15.87 15.87 0 0 1 3.82-.11c.95.088 1.926.705 2.168 1.794a5.265 5.265 0 0 1-.579 3.765 5.265 5.265 0 0 1 .578 3.765c-.24 1.088-1.216 1.706-2.167 1.793a15.942 15.942 0 0 1-3.82-.109.75.75 0 0 1 .223-1.483 14.366 14.366 0 0 0 3.46.099c.467-.043.773-.322.84-.624a3.768 3.768 0 0 0-.413-2.691H18a.75.75 0 0 1 0-1.5h2.498a3.768 3.768 0 0 0 .413-2.69c-.067-.303-.373-.582-.84-.625-.435-.04-.876-.06-1.321-.06Z" clip-rule="evenodd"/>
    </svg>
    } @else {
      <svg
      [attr.width]="size()"
      [attr.height]="size()"
      [attr.stroke-width]="strokeWidth()"
      [class.lmn-animate]="animate()"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M20.905 14.626a4.52 4.52 0 0 1 .738 3.603c-.154.695-.794 1.143-1.504 1.208a15.194 15.194 0 0 1-3.639-.104m4.405-4.707a4.52 4.52 0 0 0 .738-3.603c-.154-.696-.794-1.144-1.504-1.209a15.19 15.19 0 0 0-3.639.104m4.405 4.708H18M2.243 4.493v7.5m0 0v7.502m0-7.501h10.5m0-7.5v7.5m0 0v7.501"/>
    </svg>
    }
  `,
})
export class LmnH3Icon extends LmnIconBase {}
