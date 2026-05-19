import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MoveVariantsDirective } from 'angular-movement';
import { LmnIconBase, LM_ICON_HOST } from '../lib/icon-base';

@Component({
  selector: 'lmn-bold',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MoveVariantsDirective],
  host: LM_ICON_HOST,
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
      <path class="bold-stroke" d="M14 12a4 4 0 0 0 0-8H6v8"/>
      <path class="bold-stroke" d="M15 20a4 4 0 0 0 0-8H6v8Z"/>
    </svg>
  `,
  styles: [`
    .bold-stroke {
      stroke-width: 2;
      transition: none;
    }
    .is-animated .bold-stroke {
      animation: bold-pulse 500ms ease-out both;
    }
    .is-animated .bold-stroke:nth-child(2) {
      animation-delay: 60ms;
    }
    @keyframes bold-pulse {
      0%   { stroke-width: 2; }
      45%  { stroke-width: 4.5; }
      100% { stroke-width: 2; }
    }
  `],
})
export class LmnBoldIcon extends LmnIconBase {}
