import { ChangeDetectionStrategy, Component, effect, ElementRef, inject, input, viewChild } from '@angular/core';
import { AnimationEngine } from 'angular-movement';
import { LmnIconBase, LM_ICON_HOST } from '../lib/icon-base';
import { applyTransformOrigin } from '../lib/animation-utils';

@Component({
  selector: 'lmn-arrow-left',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: LM_ICON_HOST,
  template: `
<svg [attr.width]="size()" [attr.height]="size()" [attr.stroke-width]="strokeWidth()"
      viewBox="0 0 24 24" fill="none" stroke="currentColor"
      stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
      <path #p2 #p1 d="M19 12H5"/><path d="m12 19-7-7 7-7"/>
    </svg>
  `,
})
export class LmnArrowLeftIcon extends LmnIconBase {
  readonly animate = input<boolean>(false);

  private p1 = viewChild('p1', { read: ElementRef<SVGPathElement> });
  private p2 = viewChild('p2', { read: ElementRef<SVGPathElement> });
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

      const p1 = this.p1()?.nativeElement;
      const p2 = this.p2()?.nativeElement;
      if (!p1 || !p2) return;
      applyTransformOrigin(p1); applyTransformOrigin(p2);
      if (this.animate()) {
        this.player = this.engine.play(p1, { x: [4, 0], opacity: [0.4, 1] }, { config: { duration: 400, easing: 'ease-out', delay: 0, disabled: false } });
        this.player2 = this.engine.play(p2, { x: [4, 0], opacity: [0.4, 1] }, { config: { duration: 400, easing: 'ease-out', delay: 80, disabled: false } });
      } else {
        this.player = this.engine.play(p1, { x: [0], opacity: [1] }, { config: { duration: 200, easing: 'ease-out', delay: 0, disabled: false } });
        this.player2 = this.engine.play(p2, { x: [0], opacity: [1] }, { config: { duration: 200, easing: 'ease-out', delay: 0, disabled: false } });
      }
    });
  }
}
