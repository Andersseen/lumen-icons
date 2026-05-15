import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MoveVariantsDirective } from 'angular-movement';
import { LmnIconBase, LM_ICON_HOST } from '../lib/icon-base';

@Component({
  selector: 'lmn-x',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MoveVariantsDirective],
  host: LM_ICON_HOST,
  styles: [`
    .x-stroke {
      transform-box: fill-box;
      transform-origin: center;
    }
    .is-animated .x-stroke:first-child {
      animation: x-cut-a 420ms cubic-bezier(0.34, 1.56, 0.64, 1) both;
    }
    .is-animated .x-stroke:last-child {
      animation: x-cut-b 420ms cubic-bezier(0.34, 1.56, 0.64, 1) both;
    }

    @keyframes x-cut-a {
      0%, 100% { transform: rotate(0deg) translateY(0); }
      38% { transform: rotate(-18deg) translateY(-1px); }
      68% { transform: rotate(7deg) translateY(0); }
    }

    @keyframes x-cut-b {
      0%, 100% { transform: rotate(0deg) translateY(0); }
      38% { transform: rotate(18deg) translateY(1px); }
      68% { transform: rotate(-7deg) translateY(0); }
    }
  `],
  template: `
    <svg
      [attr.width]="size()"
      [attr.height]="size()"
      [attr.stroke-width]="strokeWidth()"
      [class.is-animated]="animate()"
      [moveVariants]="{
        active: { opacity: [0.85, 1], rotate: [-8, 4, 0] }
      }"
      [moveAnimate]="animate() ? 'active' : undefined"
      [moveDuration]="380"
      moveEasing="cubic-bezier(0.34, 1.56, 0.64, 1)"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path class="x-stroke" d="M18 6 6 18"/>
      <path class="x-stroke" d="m6 6 12 12"/>
    </svg>
  `,
})
export class LmnXIcon extends LmnIconBase {}
