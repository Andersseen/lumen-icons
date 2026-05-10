import { ChangeDetectionStrategy, Component, effect, ElementRef, inject, viewChild } from '@angular/core';
import { AnimationEngine } from 'angular-movement';
import { LmnIconBase, LM_ICON_HOST } from '../lib/icon-base';
import { applyTransformOrigin } from '../lib/animation-utils';

@Component({
  selector: 'lmn-radio',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: LM_ICON_HOST,
  template: `
<svg [attr.width]="size()" [attr.height]="size()" [attr.stroke-width]="strokeWidth()"
      viewBox="0 0 24 24" fill="none" stroke="currentColor"
      stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
      <circle cx="12" cy="12" r="10"/>
      <circle cx="12" cy="12" r="4"/>
    </svg>
  `,
})
export class LmnRadioIcon extends LmnIconBase {

  private outer = viewChild('outer', { read: ElementRef<SVGPathElement> });
  private inner = viewChild('inner', { read: ElementRef<SVGPathElement> });
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

      const o = this.outer()?.nativeElement;
      const i = this.inner()?.nativeElement;
      if (!o || !i) return;
      applyTransformOrigin(o); applyTransformOrigin(i);
      if (this.animate()) {
        this.player = this.engine.play(o, { scale: [1, 1.15, 1] }, { config: { duration: 500, easing: 'ease-in-out', delay: 0, disabled: false } });
        this.player2 = this.engine.play(i, { scale: [1, 0.85, 1] }, { config: { duration: 500, easing: 'ease-in-out', delay: 0, disabled: false } });
      } else {
        this.player = this.engine.play(o, { scale: [1] }, { config: { duration: 200, easing: 'ease-out', delay: 0, disabled: false } });
        this.player2 = this.engine.play(i, { scale: [1] }, { config: { duration: 200, easing: 'ease-out', delay: 0, disabled: false } });
      }
    });
  }
}
