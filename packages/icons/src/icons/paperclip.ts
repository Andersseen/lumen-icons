import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MoveVariantsDirective } from 'angular-movement';
import { LmnIconBase, LM_ICON_HOST } from '../lib/icon-base';

@Component({
  selector: 'lmn-paperclip',
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
      [moveVariants]="{ active: { rotate: [0, -6, 0] } }"
      [moveAnimate]="animate() ? 'active' : undefined"
      [moveDuration]="600"
      moveEasing="ease-in-out"
      style="transform-origin: center; transform-box: fill-box;"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path class="clip" pathLength="1" d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/>
    </svg>
  `,
  styles: [`
    .clip {
      stroke-dasharray: none;
      stroke-dashoffset: 0;
    }
    .is-animated .clip {
      stroke-dasharray: 1;
      stroke-dashoffset: 1;
      animation: clip-draw 500ms ease-out forwards;
    }
    @keyframes clip-draw {
      to { stroke-dashoffset: 0; }
    }
  `],
})
export class LmnPaperclipIcon extends LmnIconBase {}
