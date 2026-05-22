import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MoveVariantsDirective } from 'angular-movement';
import { LmnIconBase, LM_ICON_HOST } from '../lib/icon-base';

@Component({
  selector: 'lmn-italic',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MoveVariantsDirective],
  host: LM_ICON_HOST,
  styles: [`svg { transform-origin: center; transform-box: fill-box; }`],
  template: `
    <svg
      [attr.width]="size()"
      [attr.height]="size()"
      [attr.stroke-width]="strokeWidth()"
      [class.is-animated]="animate()"
      [moveVariants]="{ active: { rotate: [0, -4, 0], x: [0, -2, 0] } }"
      [moveAnimate]="animate() ? 'active' : undefined"
      [moveDuration]="500"
      [moveSpring]="{ stiffness: 260, damping: 13 }"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M19 4h-9"/>
      <path d="M14 20H5"/>
      <path d="M15 4 9 20"/>
    </svg>
  `,
})
export class LmnItalicIcon extends LmnIconBase {}
