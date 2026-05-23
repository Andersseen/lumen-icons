import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MoveTargetDirective } from 'angular-movement';
import { LmnIconBase, LM_ICON_HOST } from '../lib/icon-base';

@Component({
  selector: 'lmn-paperclip',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MoveTargetDirective],
  host: LM_ICON_HOST,
  styles: [`
    .paperclip-path {
      stroke-dasharray: 1;
      stroke-dashoffset: 1;
      transition: stroke-dashoffset 180ms ease-out;
    }
    .is-animated .paperclip-path {
      animation: draw 500ms ease-out forwards;
    }
    @keyframes draw {
      to { stroke-dashoffset: 0; }
    }
  `],
  template: `
    <svg
      [attr.width]="size()"
      [attr.height]="size()"
      [attr.stroke-width]="strokeWidth()"
      [class.is-animated]="animate()"
      [moveTarget]="animate()"
      [moveFrames]="{ scale: [0.95, 1.05, 1] }"
      moveDuration="500"
      [moveSpring]="{ stiffness: 280, damping: 13 }"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path class="paperclip-path" pathLength="1" d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/>
    </svg>
  `,
})
export class LmnPaperclipIcon extends LmnIconBase {}
