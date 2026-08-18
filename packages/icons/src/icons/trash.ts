import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LmnIconBase } from '../lib/icon-base';

@Component({
  selector: 'lmn-trash',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.role]': 'ariaLabel() ? "img" : null',
    '[attr.aria-label]': 'ariaLabel() || null',
    '[attr.aria-hidden]': 'ariaLabel() ? null : "true"',
    '[class.lmn-animate]': 'animate()',
  },
  styles: [`
    @keyframes lmn-trash-lid {
          0% { transform: translateY(0) rotate(0deg); }
          30% { transform: translateY(-5px) rotate(-12deg); }
          66% { transform: translateY(-5px) rotate(-12deg); }
          100% { transform: translateY(0) rotate(0deg); }
        }
        @keyframes lmn-trash-body {
          0%, 100% { transform: scaleY(1); }
          66% { transform: scaleY(1.025); }
        }
        @keyframes lmn-trash-discard {
          0%, 28% { transform: translate(-50%, -3px) scale(0.6); opacity: 0; }
          42% { opacity: 1; }
          66% { transform: translate(-50%, 7px) scale(1); opacity: 1; }
          100% { transform: translate(-50%, 10px) scale(0.8); opacity: 0; }
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
        :host(.lmn-animate)::after { content: ''; position: absolute; left: 50%; top: 28%; width: 2px; height: 3px; border-radius: 1px; background: currentColor; opacity: 0; }
        :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-8 {
          transform-origin: left center;
        }

    :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-8 { animation: lmn-trash-lid 450ms ease both; }
        :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-1, :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-2 { animation: lmn-trash-body 450ms ease both; }
        :host(.lmn-animate)::after { animation: lmn-trash-discard 450ms cubic-bezier(0.22, 0.8, 0.32, 1) both; }

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
      <path class="lmn-path-1" fill-rule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clip-rule="evenodd"/>
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
      <path class="lmn-path-1" d="m14.74 9 -0.346 9"/><path class="lmn-path-2" d="M9.606 18 L9.26 9"/><path class="lmn-path-3" d="M19.228 5.79 c0.342 0.052 0.682 0.107 1.022 0.166"/><path class="lmn-path-4" d="M19.228 5.791 L18.16 19.673 a2.25 2.25 0 0 1 -2.244 2.077 H8.084 a2.25 2.25 0 0 1 -2.244 -2.077 L4.772 5.79"/><path class="lmn-path-5" d="M19.228 5.79 a48.108 48.108 0 0 0 -3.478 -0.397"/><path class="lmn-path-6" d="M3.7500000000000018 5.955 c0.34 -0.059 0.68 -0.114 1.022 -0.165"/><path class="lmn-path-7" d="M4.772000000000002 5.79 a48.11 48.11 0 0 1 3.478 -0.397"/><path class="lmn-path-8" d="M15.750000000000002 5.393 v-0.916 c0 -1.18 -0.91 -2.164 -2.09 -2.201 a51.964 51.964 0 0 0 -3.32 0 c-1.18 0.037 -2.09 1.022 -2.09 2.201 v0.916"/><path d="M15.750000000000002 5.393 a48.667 48.667 0 0 0 -7.5 0"/>
    </svg>
    }
  `,
})
export class LmnTrashIcon extends LmnIconBase {}
