import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LmnIconBase } from '../lib/icon-base';

@Component({
  selector: 'lmn-loader',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.role]': 'ariaLabel() ? "img" : null',
    '[attr.aria-label]': 'ariaLabel() || null',
    '[attr.aria-hidden]': 'ariaLabel() ? null : "true"',
    '[class.lmn-animate]': 'animate()',
  },
  styles: [`
    @keyframes lmn-loader {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
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

    :host(.lmn-animate) svg {
          animation: lmn-loader 800ms linear infinite;
        }

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
      <path d="M11 3A1 1 0 0 1 13 3L13 5A1 1 0 0 1 11 5Z"/><path d="M13 21A1 1 0 0 1 11 21L11 19A1 1 0 0 1 13 19Z"/><path d="M4.929 6.343A1 1 0 0 1 6.343 4.929L7.757 6.343A1 1 0 0 1 6.343 7.757Z"/><path d="M19.071 17.657A1 1 0 0 1 17.657 19.071L16.243 17.657A1 1 0 0 1 17.657 16.243Z"/><path d="M3 13A1 1 0 0 1 3 11L5 11A1 1 0 0 1 5 13Z"/><path d="M21 11A1 1 0 0 1 21 13L19 13A1 1 0 0 1 19 11Z"/><path d="M6.343 19.071A1 1 0 0 1 4.929 17.657L6.343 16.243A1 1 0 0 1 7.757 17.657Z"/><path d="M17.657 4.929A1 1 0 0 1 19.071 6.343L17.657 7.757A1 1 0 0 1 16.243 6.343Z"/>
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
      <path d="M12 2v4"/><path d="M12 18v4"/><path d="m4.93 4.93 2.83 2.83"/><path d="m16.24 16.24 2.83 2.83"/><path d="M2 12h4"/><path d="M18 12h4"/><path d="m4.93 19.07 2.83-2.83"/><path d="m16.24 7.76 2.83-2.83"/>
    </svg>
    }
  `,
})
export class LmnLoaderIcon extends LmnIconBase {}
