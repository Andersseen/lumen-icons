import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LmnIconBase } from '../lib/icon-base';

@Component({
  selector: 'lmn-home',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.role]': 'ariaLabel() ? "img" : null',
    '[attr.aria-label]': 'ariaLabel() || null',
    '[attr.aria-hidden]': 'ariaLabel() ? null : "true"',
    '[class.lmn-animate]': 'animate()',
  },
  styles: [`
    @keyframes lmn-home-door {
          0%, 14% { transform: perspective(120px) rotateY(0deg); opacity: 1; }
          44%, 64% { transform: perspective(120px) rotateY(-78deg); opacity: 0.85; }
          100% { transform: perspective(120px) rotateY(0deg); opacity: 1; }
        }
        @keyframes lmn-home-shell {
          0% { transform: scale(0.94); }
          52% { transform: scale(1.02); }
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

    :host(.lmn-animate) { position: relative; }
        /* The door is not its own subpath, so it is mirrored by a pseudo-element
           hinged on its left jamb. Sized as a share of the 24-unit viewBox. */
        :host(.lmn-animate)::after {
          content: '';
          position: absolute;
          left: 41.5%;
          top: 62.5%;
          width: 17%;
          height: 25%;
          background: currentColor;
          opacity: 0;
          transform-origin: left center;
          border-radius: 6% 6% 0 0;
        }
        :host(.lmn-animate) svg path { transform-origin: center; }

    :host(.lmn-animate) svg .lmn-path-1,
        :host(.lmn-animate) svg .lmn-path-2,
        :host(.lmn-animate) svg .lmn-path-3 { animation: lmn-home-shell 820ms cubic-bezier(0.3, 1.2, 0.5, 1) both; }
        :host(.lmn-animate)::after { animation: lmn-home-door 820ms cubic-bezier(0.4, 0, 0.2, 1) both; }
        :host(.lmn-animate.lmn-filled) svg { animation: lmn-home-shell 820ms cubic-bezier(0.3, 1.2, 0.5, 1) both; }

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
      <path class="lmn-path-1" d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z"/><path class="lmn-path-2" d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z"/>
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
      <path class="lmn-path-1" d="m2.25 12 8.954 -8.955 c0.44 -0.439 1.152 -0.439 1.591 0 L21.75 12"/><path class="lmn-path-2" d="M4.5 9.75 v10.125 c0 0.621 0.504 1.125 1.125 1.125 H9.75 v-4.875 c0 -0.621 0.504 -1.125 1.125 -1.125 h2.25 c0.621 0 1.125 0.504 1.125 1.125 V21 h4.125 c0.621 0 1.125 -0.504 1.125 -1.125 V9.75"/><path class="lmn-path-3" d="M8.25 21 h8.25"/>
    </svg>
    }
  `,
})
export class LmnHomeIcon extends LmnIconBase {}
