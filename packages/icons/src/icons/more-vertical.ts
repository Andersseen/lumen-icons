import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MoveVariantsDirective } from 'angular-movement';
import { LmnIconBase, LM_ICON_HOST } from '../lib/icon-base';

@Component({
  selector: 'lmn-more-vertical',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MoveVariantsDirective],
  host: LM_ICON_HOST,
  styles: [`
    .is-animated circle {
      animation: dot-scale 400ms cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
      transform-origin: center;
    }

    .is-animated circle:nth-child(1) { animation-delay: 0ms; }
    .is-animated circle:nth-child(2) { animation-delay: 100ms; }
    .is-animated circle:nth-child(3) { animation-delay: 200ms; }

    @keyframes dot-scale {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.5); }
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
      <circle cx="12" cy="12" r="1"/>
      <circle cx="12" cy="5" r="1"/>
      <circle cx="12" cy="19" r="1"/>
    </svg>
  `,
})
export class LmnMoreVerticalIcon extends LmnIconBase {}
