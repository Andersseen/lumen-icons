import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LmnIconBase } from '../lib/icon-base';

@Component({
  selector: 'lmn-question-mark-circle',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.role]': 'ariaLabel() ? "img" : null',
    '[attr.aria-label]': 'ariaLabel() || null',
    '[attr.aria-hidden]': 'ariaLabel() ? null : "true"',
    '[class.lmn-animate]': 'animate()',
  },
  styles: [`
    @keyframes lmn-question-mark-circle-mark {
          0% { transform: rotate(0deg); }
          22% { transform: rotate(-20deg); }
          46% { transform: rotate(14deg); }
          66% { transform: rotate(-7deg); }
          84% { transform: rotate(3deg); }
          100% { transform: rotate(0deg); }
        }
        @keyframes lmn-question-mark-circle-dot {
          0%, 30% { transform: translateY(0); }
          46% { transform: translateY(-3.5px); }
          62% { transform: translateY(0); }
          74% { transform: translateY(-1px); }
          100% { transform: translateY(0); }
        }
        @keyframes lmn-question-mark-circle-flinch {
          0%, 42% { transform: scale(1) rotate(0deg); }
          52% { transform: scale(0.94) rotate(-4deg); }
          66% { transform: scale(1.02) rotate(3deg); }
          80% { transform: scale(1) rotate(-1.5deg); }
          100% { transform: scale(1) rotate(0deg); }
        }
        @keyframes lmn-question-mark-circle-filled {
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

    :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-1 { transform-box: view-box; transform-origin: 12px 13px; }

    :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-1 { animation: lmn-question-mark-circle-mark 900ms ease-in-out both; }
        :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-3 { animation: lmn-question-mark-circle-dot 900ms cubic-bezier(0.175, 0.885, 0.32, 1.275) both; }
        :host(.lmn-animate.lmn-filled) svg { transform-origin: 50% 50%; animation: lmn-question-mark-circle-filled 900ms ease-in-out both; }

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
      <path class="lmn-path-1" fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm11.378-3.917c-.89-.777-2.366-.777-3.255 0a.75.75 0 0 1-.988-1.129c1.454-1.272 3.776-1.272 5.23 0 1.513 1.324 1.513 3.518 0 4.842a3.75 3.75 0 0 1-.837.552c-.676.328-1.028.774-1.028 1.152v.75a.75.75 0 0 1-1.5 0v-.75c0-1.279 1.06-2.107 1.875-2.502.182-.088.351-.199.503-.331.83-.727.83-1.857 0-2.584ZM12 18a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clip-rule="evenodd"/>
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
      <path class="lmn-path-1" d="M9.879 7.519 c1.171 -1.025 3.071 -1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712 -0.203 0.179 -0.43 0.326 -0.67 0.442 -0.745 0.361 -1.45 0.999 -1.45 1.827 v0.75"/><path class="lmn-path-2" d="M21 12 a9 9 0 1 1 -18 0 9 9 0 0 1 18 0 Z"/><path class="lmn-path-3" d="M12 17.25 h0.008 v0.008 H12 v-0.008 Z"/>
    </svg>
    }
  `,
})
export class LmnQuestionMarkCircleIcon extends LmnIconBase {}
