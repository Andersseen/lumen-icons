import { ChangeDetectionStrategy, Component, effect, ElementRef, inject, viewChild } from '@angular/core';
import { AnimationEngine } from 'angular-movement';
import { LmnIconBase, LM_ICON_HOST } from '../lib/icon-base';
import { applyTransformOrigin } from '../lib/animation-utils';

@Component({
  selector: 'lmn-mail',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: LM_ICON_HOST,
  template: `
<svg [attr.width]="size()" [attr.height]="size()" [attr.stroke-width]="strokeWidth()"
      viewBox="0 0 24 24" fill="none" stroke="currentColor"
      stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
      <rect width="20" height="16" x="2" y="4" rx="2"/>
      <path #p #r d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
    </svg>
  `,
})
export class LmnMailIcon extends LmnIconBase {

  private r = viewChild('r', { read: ElementRef<SVGPathElement> });
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

      const rect = this.r()?.nativeElement;
      const flap = this.p()?.nativeElement;
      if (!rect || !flap) return;
      applyTransformOrigin(rect); applyTransformOrigin(flap);
      if (this.animate()) {
        this.player = this.engine.play(rect, { scale: [1, 1.06, 1] }, { config: { duration: 500, easing: 'ease-in-out', delay: 0, disabled: false } });
        this.player2 = this.engine.play(flap, { y: [0, -2, 0] }, { config: { duration: 400, easing: 'ease-out', delay: 80, disabled: false } });
      } else {
        this.player = this.engine.play(rect, { scale: [1] }, { config: { duration: 200, easing: 'ease-out', delay: 0, disabled: false } });
        this.player2 = this.engine.play(flap, { y: [0] }, { config: { duration: 200, easing: 'ease-out', delay: 0, disabled: false } });
      }
    });
  }
}
