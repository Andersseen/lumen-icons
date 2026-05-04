import { ChangeDetectionStrategy, Component, effect, ElementRef, inject, input, viewChild } from '@angular/core';
import { AnimationEngine } from 'angular-movement';
import { LmnIconBase, LM_ICON_HOST } from '../lib/icon-base';
import { applyTransformOrigin } from '../lib/animation-utils';

@Component({
  selector: 'lmn-more-vertical',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: LM_ICON_HOST,
  template: `
<svg [attr.width]="size()" [attr.height]="size()" [attr.stroke-width]="strokeWidth()"
      viewBox="0 0 24 24" fill="none" stroke="currentColor"
      stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
      <circle cx="12" cy="12" r="1"/>
      <circle cx="12" cy="5" r="1"/>
      <circle cx="12" cy="19" r="1"/>
    </svg>
  `,
})
export class LmnMoreVerticalIcon extends LmnIconBase {
  readonly animate = input<boolean>(false);

  private c1 = viewChild('c1', { read: ElementRef<SVGPathElement> });
  private c2 = viewChild('c2', { read: ElementRef<SVGPathElement> });
  private c3 = viewChild('c3', { read: ElementRef<SVGPathElement> });
  private engine = inject(AnimationEngine);
  private player: ReturnType<AnimationEngine['play']> = null;
  private player2: ReturnType<AnimationEngine['play']> = null;
  private player3: ReturnType<AnimationEngine['play']> = null;

  constructor() {
    super();
    effect(() => {
      this.player?.cancel();
      this.player2?.cancel();
      this.player3?.cancel();
      this.player = null;
      this.player2 = null;
      this.player3 = null;

      const el1 = this.c1()?.nativeElement;
      const el2 = this.c2()?.nativeElement;
      const el3 = this.c3()?.nativeElement;
      if (!el1 || !el2 || !el3) return;
      applyTransformOrigin(el1); applyTransformOrigin(el2); applyTransformOrigin(el3);
      if (this.animate()) {
        this.player = this.engine.play(el1, { scale: [1, 1.5, 1] }, { config: { duration: 400, easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)', delay: 0, disabled: false } });
        this.player2 = this.engine.play(el2, { scale: [1, 1.5, 1] }, { config: { duration: 400, easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)', delay: 100, disabled: false } });
        this.player3 = this.engine.play(el3, { scale: [1, 1.5, 1] }, { config: { duration: 400, easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)', delay: 200, disabled: false } });
      } else {
        this.player = this.engine.play(el1, { scale: [1] }, { config: { duration: 200, easing: 'ease-out', delay: 0, disabled: false } });
        this.player2 = this.engine.play(el2, { scale: [1] }, { config: { duration: 200, easing: 'ease-out', delay: 0, disabled: false } });
        this.player3 = this.engine.play(el3, { scale: [1] }, { config: { duration: 200, easing: 'ease-out', delay: 0, disabled: false } });
      }
    });
  }
}
