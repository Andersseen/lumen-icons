import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MoveVariantsDirective } from 'angular-movement';
import { LmnIconBase, LM_ICON_HOST } from '../lib/icon-base';

@Component({
  selector: 'lmn-plus',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MoveVariantsDirective],
  host: LM_ICON_HOST,
  template: `
    <svg
      [attr.width]="size()"
      [attr.height]="size()"
      [attr.stroke-width]="strokeWidth()"
      [moveVariants]="{
        active: { scale: [0.82, 1.12, 1], rotate: [0, 90, 0] }
      }"
      [moveAnimate]="animate() ? 'active' : undefined"
      [moveDuration]="420"
      moveEasing="cubic-bezier(0.34, 1.56, 0.64, 1)"
      style="transform-origin: center; transform-box: fill-box;"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M5 12h14"/>
      <path d="M12 5v14"/>
    </svg>
  `,
})
export class LmnPlusIcon extends LmnIconBase {}
