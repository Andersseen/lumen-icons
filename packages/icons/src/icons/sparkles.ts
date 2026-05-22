import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MoveVariantsDirective } from 'angular-movement';
import { LmnIconBase, LM_ICON_HOST } from '../lib/icon-base';

@Component({
  selector: 'lmn-sparkles',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MoveVariantsDirective],
  host: LM_ICON_HOST,
  styles: [`
    svg { transform-origin: center; transform-box: fill-box; }

    .spark-line, .spark-core {
      transform-origin: center;
      transition: transform 220ms ease-out, opacity 220ms ease-out;
    }

    .is-animated .spark-line,
    .is-animated .spark-core {
      animation: spark-pop 420ms cubic-bezier(0.34, 1.56, 0.64, 1) both;
    }

    .is-animated .spark-line:nth-child(2) { animation-delay: 35ms; }
    .is-animated .spark-line:nth-child(3) { animation-delay: 70ms; }
    .is-animated .spark-line:nth-child(4) { animation-delay: 105ms; }
    .is-animated .spark-line:nth-child(5) { animation-delay: 140ms; }
    .is-animated .spark-line:nth-child(6) { animation-delay: 175ms; }
    .is-animated .spark-core { animation-delay: 90ms; }

    @keyframes spark-pop {
      0% { opacity: 0.35; transform: scale(0.45); }
      62% { transform: scale(1.25); }
      100% { opacity: 1; transform: scale(1); }
    }
  `],
  template: `
    <svg
      [attr.width]="size()"
      [attr.height]="size()"
      [attr.stroke-width]="strokeWidth()"
      [class.is-animated]="animate()"
      [moveVariants]="{
        active: { opacity: [0.7, 1], scale: [0.9, 1.04, 1], rotate: [-5, 2, 0] }
      }"
      [moveAnimate]="animate() ? 'active' : undefined"
      [moveDuration]="420"
      [moveSpring]="{ stiffness: 260, damping: 11 }"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path class="spark-line" d="M12 2v4"/>
      <path class="spark-line" d="m5 5 2.8 2.8"/>
      <path class="spark-line" d="m19 5-2.8 2.8"/>
      <path class="spark-line" d="M12 12v8"/>
      <path class="spark-line" d="m5 19 2.8-2.8"/>
      <path class="spark-line" d="m19 19-2.8-2.8"/>
      <circle class="spark-core" cx="12" cy="12" r="3"/>
    </svg>
  `,
})
export class LmnSparklesIcon extends LmnIconBase {}
