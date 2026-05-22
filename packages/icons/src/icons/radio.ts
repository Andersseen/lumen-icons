import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MoveVariantsDirective } from 'angular-movement';
import { LmnIconBase, LM_ICON_HOST } from '../lib/icon-base';

@Component({
  selector: 'lmn-radio',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MoveVariantsDirective],
  host: LM_ICON_HOST,
  styles: [`
    svg { transform-origin: center; transform-box: fill-box; }

    circle {
      transform-origin: center;
      transition: transform 220ms ease-out;
    }

    .is-animated circle:nth-child(1) {
      animation: radio-outer 500ms ease-in-out forwards;
    }

    .is-animated circle:nth-child(2) {
      animation: radio-inner 500ms ease-in-out forwards;
    }

    @keyframes radio-outer {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.15); }
    }

    @keyframes radio-inner {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(0.85); }
    }
  `],
  template: `
    <svg
      [attr.width]="size()"
      [attr.height]="size()"
      [attr.stroke-width]="strokeWidth()"
      [class.is-animated]="animate()"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="12" cy="12" r="10"/>
      <circle cx="12" cy="12" r="4"/>
    </svg>
  `,
})
export class LmnRadioIcon extends LmnIconBase {}
