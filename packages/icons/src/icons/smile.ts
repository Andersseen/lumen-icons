import { ChangeDetectionStrategy, Component, effect, ElementRef, inject, input, viewChild } from '@angular/core';
import { AnimationEngine } from 'angular-movement';
import { LmnIconBase, LM_ICON_HOST } from '../lib/icon-base';
import { applyTransformOrigin } from '../lib/animation-utils';

@Component({
  selector: 'lmn-smile',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: LM_ICON_HOST,
  template: `
<svg [attr.width]="size()" [attr.height]="size()" [attr.stroke-width]="strokeWidth()"
      viewBox="0 0 24 24" fill="none" stroke="currentColor"
      stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
      <circle cx="12" cy="12" r="10"/>
      <path #e2 #e1 #mouth #face d="M8 14s1.5 2 4 2 4-2 4-2"/>
      <line x1="9" y1="9" x2="9.01" y2="9"/>
      <line x1="15" y1="9" x2="15.01" y2="9"/>
    </svg>
  `,
})
export class LmnSmileIcon extends LmnIconBase {
  readonly animate = input<boolean>(false);

  private face = viewChild('face', { read: ElementRef<SVGPathElement> });
  private mouth = viewChild('mouth', { read: ElementRef<SVGPathElement> });
  private e1 = viewChild('e1', { read: ElementRef<SVGPathElement> });
  private e2 = viewChild('e2', { read: ElementRef<SVGPathElement> });
  private engine = inject(AnimationEngine);
  private player: ReturnType<AnimationEngine['play']> = null;
  private player2: ReturnType<AnimationEngine['play']> = null;
  private player3: ReturnType<AnimationEngine['play']> = null;
  private player4: ReturnType<AnimationEngine['play']> = null;

  constructor() {
    super();
    effect(() => {
      this.player?.cancel();
      this.player2?.cancel();
      this.player3?.cancel();
      this.player4?.cancel();
      this.player = null;
      this.player2 = null;
      this.player3 = null;
      this.player4 = null;

      const f = this.face()?.nativeElement;
      const m = this.mouth()?.nativeElement;
      const le = this.e1()?.nativeElement;
      const re = this.e2()?.nativeElement;
      if (!f || !m || !le || !re) return;
      applyTransformOrigin(f); applyTransformOrigin(m); applyTransformOrigin(le); applyTransformOrigin(re);
      if (this.animate()) {
        this.player = this.engine.play(f, { rotate: [0, 8, -8, 0] }, { config: { duration: 600, easing: 'ease-in-out', delay: 0, disabled: false } });
        this.player2 = this.engine.play(m, { scaleY: [1, 1.15, 1] }, { config: { duration: 400, easing: 'ease-out', delay: 100, disabled: false } });
        this.player3 = this.engine.play(le, { y: [0, -1, 0] }, { config: { duration: 300, easing: 'ease-out', delay: 150, disabled: false } });
        this.player4 = this.engine.play(re, { y: [0, -1, 0] }, { config: { duration: 300, easing: 'ease-out', delay: 180, disabled: false } });
      } else {
        this.player = this.engine.play(f, { rotate: [0] }, { config: { duration: 200, easing: 'ease-out', delay: 0, disabled: false } });
        this.player2 = this.engine.play(m, { scaleY: [1] }, { config: { duration: 200, easing: 'ease-out', delay: 0, disabled: false } });
        this.player3 = this.engine.play(le, { y: [0] }, { config: { duration: 150, easing: 'ease-out', delay: 0, disabled: false } });
        this.player4 = this.engine.play(re, { y: [0] }, { config: { duration: 150, easing: 'ease-out', delay: 0, disabled: false } });
      }
    });
  }
}
