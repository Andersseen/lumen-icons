import { ChangeDetectionStrategy, Component, effect, ElementRef, inject, input, viewChild } from '@angular/core';
import { AnimationEngine } from 'angular-movement';
import { LmnIconBase, LM_ICON_HOST } from '../lib/icon-base';
import { applyTransformOrigin } from '../lib/animation-utils';

@Component({
  selector: 'lmn-search',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: LM_ICON_HOST,
  template: `
<svg [attr.width]="size()" [attr.height]="size()" [attr.stroke-width]="strokeWidth()"
      viewBox="0 0 24 24" fill="none" stroke="currentColor"
      stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
      <circle cx="11" cy="11" r="8"/><path #p #c d="m21 21-4.3-4.3"/>
    </svg>
  `,
})
export class LmnSearchIcon extends LmnIconBase {
  readonly animate = input<boolean>(false);

  private c = viewChild('c', { read: ElementRef<SVGPathElement> });
  private p = viewChild('p', { read: ElementRef<SVGPathElement> });
  private engine = inject(AnimationEngine);
  private player: ReturnType<AnimationEngine['play']> = null;
  private player2: ReturnType<AnimationEngine['play']> = null;

  constructor() {
    super();
    effect(() => {
      this.player?.cancel();
      this.player2?.cancel();
      this.player = null;
      this.player2 = null;

      const circle = this.c()?.nativeElement;
      const handle = this.p()?.nativeElement;
      if (!circle || !handle) return;
      applyTransformOrigin(circle); applyTransformOrigin(handle);
      if (this.animate()) {
        this.player = this.engine.play(circle, { scale: [1, 1.1, 1] }, { config: { duration: 500, easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)', delay: 0, disabled: false } });
        this.player2 = this.engine.play(handle, { rotate: [0, -10, 0], x: [0, 1, 0] }, { config: { duration: 400, easing: 'ease-in-out', delay: 100, disabled: false } });
      } else {
        this.player = this.engine.play(circle, { scale: [1] }, { config: { duration: 200, easing: 'ease-out', delay: 0, disabled: false } });
        this.player2 = this.engine.play(handle, { rotate: [0], x: [0] }, { config: { duration: 200, easing: 'ease-out', delay: 0, disabled: false } });
      }
    });
  }
}
