import { ChangeDetectionStrategy, Component, effect, ElementRef, inject, input, viewChild } from '@angular/core';
import { AnimationEngine } from 'angular-movement';
import { LmnIconBase, LM_ICON_HOST } from '../lib/icon-base';
import { applyTransformOrigin } from '../lib/animation-utils';

@Component({
  selector: 'lmn-sun',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: LM_ICON_HOST,
  template: `
<svg #svg [attr.width]="size()" [attr.height]="size()" [attr.stroke-width]="strokeWidth()"
      viewBox="0 0 24 24" fill="none" stroke="currentColor"
      stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
      <circle cx="12" cy="12" r="4"/>
      <path #r8 #r7 #r6 #r5 #r4 #r3 #r2 #r1 #center d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
    </svg>
  `,
})
export class LmnSunIcon extends LmnIconBase {
  readonly animate = input<boolean>(false);

  private center = viewChild('center', { read: ElementRef<SVGPathElement> });
  private r1 = viewChild('r1', { read: ElementRef<SVGPathElement> });
  private r2 = viewChild('r2', { read: ElementRef<SVGPathElement> });
  private r3 = viewChild('r3', { read: ElementRef<SVGPathElement> });
  private r4 = viewChild('r4', { read: ElementRef<SVGPathElement> });
  private r5 = viewChild('r5', { read: ElementRef<SVGPathElement> });
  private r6 = viewChild('r6', { read: ElementRef<SVGPathElement> });
  private r7 = viewChild('r7', { read: ElementRef<SVGPathElement> });
  private r8 = viewChild('r8', { read: ElementRef<SVGPathElement> });
  private engine = inject(AnimationEngine);
  private player: ReturnType<AnimationEngine['play']> = null;
  private player2: ReturnType<AnimationEngine['play']> = null;
  private player3: ReturnType<AnimationEngine['play']> = null;
  private player4: ReturnType<AnimationEngine['play']> = null;
  private player5: ReturnType<AnimationEngine['play']> = null;
  private player6: ReturnType<AnimationEngine['play']> = null;
  private player7: ReturnType<AnimationEngine['play']> = null;
  private player8: ReturnType<AnimationEngine['play']> = null;
  private player9: ReturnType<AnimationEngine['play']> = null;

  constructor() {
    super();
    effect(() => {
      this.player?.cancel();
      this.player2?.cancel();
      this.player3?.cancel();
      this.player4?.cancel();
      this.player5?.cancel();
      this.player6?.cancel();
      this.player7?.cancel();
      this.player8?.cancel();
      this.player9?.cancel();
      this.player = null;
      this.player2 = null;
      this.player3 = null;
      this.player4 = null;
      this.player5 = null;
      this.player6 = null;
      this.player7 = null;
      this.player8 = null;
      this.player9 = null;

      const center = this.center()?.nativeElement;
      if (!center) return;
      applyTransformOrigin(center);
      const r1 = this.r1()?.nativeElement;
      const r2 = this.r2()?.nativeElement;
      const r3 = this.r3()?.nativeElement;
      const r4 = this.r4()?.nativeElement;
      const r5 = this.r5()?.nativeElement;
      const r6 = this.r6()?.nativeElement;
      const r7 = this.r7()?.nativeElement;
      const r8 = this.r8()?.nativeElement;
      if (!r1 || !r2 || !r3 || !r4 || !r5 || !r6 || !r7 || !r8) return;
      if (this.animate()) {
        this.player = this.engine.play(center, { scale: [1, 1.15, 1] }, { config: { duration: 600, easing: 'ease-in-out', delay: 0, disabled: false } });
        applyTransformOrigin(r1); this.player2 = this.engine.play(r1, { scaleY: [1, 1.4, 1] }, { config: { duration: 400, easing: 'ease-out', delay: 60, disabled: false } });
        applyTransformOrigin(r2); this.player3 = this.engine.play(r2, { scaleY: [1, 1.4, 1] }, { config: { duration: 400, easing: 'ease-out', delay: 120, disabled: false } });
        applyTransformOrigin(r3); this.player4 = this.engine.play(r3, { scaleY: [1, 1.4, 1] }, { config: { duration: 400, easing: 'ease-out', delay: 180, disabled: false } });
        applyTransformOrigin(r4); this.player5 = this.engine.play(r4, { scaleY: [1, 1.4, 1] }, { config: { duration: 400, easing: 'ease-out', delay: 240, disabled: false } });
        applyTransformOrigin(r5); this.player6 = this.engine.play(r5, { scaleY: [1, 1.4, 1] }, { config: { duration: 400, easing: 'ease-out', delay: 300, disabled: false } });
        applyTransformOrigin(r6); this.player7 = this.engine.play(r6, { scaleY: [1, 1.4, 1] }, { config: { duration: 400, easing: 'ease-out', delay: 360, disabled: false } });
        applyTransformOrigin(r7); this.player8 = this.engine.play(r7, { scaleY: [1, 1.4, 1] }, { config: { duration: 400, easing: 'ease-out', delay: 420, disabled: false } });
        applyTransformOrigin(r8); this.player9 = this.engine.play(r8, { scaleY: [1, 1.4, 1] }, { config: { duration: 400, easing: 'ease-out', delay: 480, disabled: false } });
      } else {
        this.player = this.engine.play(center, { scale: [1] }, { config: { duration: 200, easing: 'ease-out', delay: 0, disabled: false } });
        applyTransformOrigin(r1); this.player2 = this.engine.play(r1, { scaleY: [1] }, { config: { duration: 200, easing: 'ease-out', delay: 0, disabled: false } });
        applyTransformOrigin(r2); this.player3 = this.engine.play(r2, { scaleY: [1] }, { config: { duration: 200, easing: 'ease-out', delay: 0, disabled: false } });
        applyTransformOrigin(r3); this.player4 = this.engine.play(r3, { scaleY: [1] }, { config: { duration: 200, easing: 'ease-out', delay: 0, disabled: false } });
        applyTransformOrigin(r4); this.player5 = this.engine.play(r4, { scaleY: [1] }, { config: { duration: 200, easing: 'ease-out', delay: 0, disabled: false } });
        applyTransformOrigin(r5); this.player6 = this.engine.play(r5, { scaleY: [1] }, { config: { duration: 200, easing: 'ease-out', delay: 0, disabled: false } });
        applyTransformOrigin(r6); this.player7 = this.engine.play(r6, { scaleY: [1] }, { config: { duration: 200, easing: 'ease-out', delay: 0, disabled: false } });
        applyTransformOrigin(r7); this.player8 = this.engine.play(r7, { scaleY: [1] }, { config: { duration: 200, easing: 'ease-out', delay: 0, disabled: false } });
        applyTransformOrigin(r8); this.player9 = this.engine.play(r8, { scaleY: [1] }, { config: { duration: 200, easing: 'ease-out', delay: 0, disabled: false } });
      }
    });
  }
}
