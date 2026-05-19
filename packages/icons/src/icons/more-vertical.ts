import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MoveVariantsDirective } from 'angular-movement';
import { LmnIconBase, LM_ICON_HOST } from '../lib/icon-base';

@Component({
  selector: 'lmn-more-vertical',
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
      <circle class="dot" cx="12" cy="12" r="1"/>
      <circle class="dot" cx="12" cy="5" r="1"/>
      <circle class="dot" cx="12" cy="19" r="1"/>
    </svg>
  `,
  styles: [`
    .dot {
      transform-box: fill-box;
      transform-origin: center;
      opacity: 1;
      transform: scale(1);
    }
    .is-animated .dot {
      animation: dot-pop 420ms cubic-bezier(0.34, 1.56, 0.64, 1) both;
    }
    .is-animated .dot:nth-child(2) { animation-delay: 80ms; }
    .is-animated .dot:nth-child(3) { animation-delay: 160ms; }
    @keyframes dot-pop {
      0%   { transform: scale(0.3); opacity: 0; }
      60%  { transform: scale(1.3); opacity: 1; }
      100% { transform: scale(1); opacity: 1; }
    }
  `],
})
export class LmnMoreVerticalIcon extends LmnIconBase {}
