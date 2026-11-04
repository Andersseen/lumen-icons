import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LmnIconBase } from '../lib/icon-base';

@Component({
  selector: 'lmn-inbox-stack',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.role]': 'ariaLabel() ? "img" : null',
    '[attr.aria-label]': 'ariaLabel() || null',
    '[attr.aria-hidden]': 'ariaLabel() ? null : "true"',
    '[class.lmn-animate]': 'animate()',
  },
  styles: [`
    @keyframes lmn-inbox-stack-lower {
          0% { transform: translateY(3px); opacity: 0.7; }
          40%, 64% { transform: translateY(0); opacity: 1; }
          76% { transform: translateY(0.8px); opacity: 1; }
          100% { transform: translateY(0); opacity: 1; }
        }
        @keyframes lmn-inbox-stack-upper {
          0%, 22% { transform: translateY(-3.75px); opacity: 0.55; }
          66% { transform: translateY(0.6px); opacity: 1; }
          82% { transform: translateY(-0.2px); opacity: 1; }
          100% { transform: translateY(0); opacity: 1; }
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

    :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-2,
        :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-3,
        :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-4 { animation: lmn-inbox-stack-upper 780ms cubic-bezier(0.4, 0, 0.2, 1) both; }
        :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-1,
        :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-5 { animation: lmn-inbox-stack-lower 780ms cubic-bezier(0.4, 0, 0.2, 1) both; }
        :host(.lmn-animate.lmn-filled) svg .lmn-path-1 { animation: lmn-inbox-stack-upper 780ms cubic-bezier(0.4, 0, 0.2, 1) both; }
        :host(.lmn-animate.lmn-filled) svg .lmn-path-2 { animation: lmn-inbox-stack-lower 780ms cubic-bezier(0.4, 0, 0.2, 1) both; }

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
      <path class="lmn-path-1" fill-rule="evenodd" d="M1.5 9.832v1.793c0 1.036.84 1.875 1.875 1.875h17.25c1.035 0 1.875-.84 1.875-1.875V9.832a3 3 0 0 0-.722-1.952l-3.285-3.832A3 3 0 0 0 16.215 3h-8.43a3 3 0 0 0-2.278 1.048L2.222 7.88A3 3 0 0 0 1.5 9.832ZM7.785 4.5a1.5 1.5 0 0 0-1.139.524L3.881 8.25h3.165a3 3 0 0 1 2.496 1.336l.164.246a1.5 1.5 0 0 0 1.248.668h2.092a1.5 1.5 0 0 0 1.248-.668l.164-.246a3 3 0 0 1 2.496-1.336h3.165l-2.765-3.226a1.5 1.5 0 0 0-1.139-.524h-8.43Z" clip-rule="evenodd"/><path class="lmn-path-2" d="M2.813 15c-.725 0-1.313.588-1.313 1.313V18a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3v-1.688c0-.724-.588-1.312-1.313-1.312h-4.233a3 3 0 0 0-2.496 1.336l-.164.246a1.5 1.5 0 0 1-1.248.668h-2.092a1.5 1.5 0 0 1-1.248-.668l-.164-.246A3 3 0 0 0 7.046 15H2.812Z"/>
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
      <path class="lmn-path-1" d="m7.875 14.25 1.214 1.942 a2.25 2.25 0 0 0 1.908 1.058 h2.006 c0.776 0 1.497 -0.4 1.908 -1.058 l1.214 -1.942"/><path class="lmn-path-2" d="M2.41 9 h4.636 a2.25 2.25 0 0 1 1.872 1.002 l0.164 0.246 a2.25 2.25 0 0 0 1.872 1.002 h2.092 a2.25 2.25 0 0 0 1.872 -1.002 l0.164 -0.246 A2.25 2.25 0 0 1 16.954 9 h4.636"/><path class="lmn-path-3" d="M2.41 9 a2.25 2.25 0 0 0 -0.16 0.832 V12 a2.25 2.25 0 0 0 2.25 2.25 h15 A2.25 2.25 0 0 0 21.75 12 V9.832 c0 -0.287 -0.055 -0.57 -0.16 -0.832"/><path class="lmn-path-4" d="M2.41 9 a2.25 2.25 0 0 1 0.382 -0.632 l3.285 -3.832 a2.25 2.25 0 0 1 1.708 -0.786 h8.43 c0.657 0 1.281 0.287 1.709 0.786 l3.284 3.832 c0.163 0.19 0.291 0.404 0.382 0.632"/><path class="lmn-path-5" d="M4.5 20.25 h15 A2.25 2.25 0 0 0 21.75 18 v-2.625 c0 -0.621 -0.504 -1.125 -1.125 -1.125 H3.375 c-0.621 0 -1.125 0.504 -1.125 1.125 V18 a2.25 2.25 0 0 0 2.25 2.25 Z"/>
    </svg>
    }
  `,
})
export class LmnInboxStackIcon extends LmnIconBase {}
