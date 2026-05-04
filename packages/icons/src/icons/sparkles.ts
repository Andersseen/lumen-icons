import { ChangeDetectionStrategy, Component, effect, ElementRef, inject, input, viewChild } from '@angular/core';
import { AnimationEngine } from 'angular-movement';
import { LmnIconBase, LM_ICON_HOST } from '../lib/icon-base';
import { applyTransformOrigin } from '../lib/animation-utils';

@Component({
  selector: 'lmn-sparkles',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: LM_ICON_HOST,
  template: `
<svg [attr.width]="size()" [attr.height]="size()" [attr.stroke-width]="strokeWidth()"
      viewBox="0 0 24 24" fill="none" stroke="currentColor"
      stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
      <path #c #p6 #p5 #p4 #p3 #p2 #p1 d="M12 2v4"/>
      <path d="m5 5 2.8 2.8"/>
      <path d="m19 5-2.8 2.8"/>
      <path d="M12 12v8"/>
      <path d="m5 19 2.8-2.8"/>
      <path d="m19 19-2.8-2.8"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  `,
})
export class LmnSparklesIcon extends LmnIconBase {
  readonly animate = input<boolean>(false);

  private p1 = viewChild('p1', { read: ElementRef<SVGPathElement> });
  private p2 = viewChild('p2', { read: ElementRef<SVGPathElement> });
  private p3 = viewChild('p3', { read: ElementRef<SVGPathElement> });
  private p4 = viewChild('p4', { read: ElementRef<SVGPathElement> });
  private p5 = viewChild('p5', { read: ElementRef<SVGPathElement> });
  private p6 = viewChild('p6', { read: ElementRef<SVGPathElement> });
  private c = viewChild('c', { read: ElementRef<SVGPathElement> });
  private engine = inject(AnimationEngine);
  private player: ReturnType<AnimationEngine['play']> = null;
  private player2: ReturnType<AnimationEngine['play']> = null;
  private player3: ReturnType<AnimationEngine['play']> = null;
  private player4: ReturnType<AnimationEngine['play']> = null;
  private player5: ReturnType<AnimationEngine['play']> = null;
  private player6: ReturnType<AnimationEngine['play']> = null;
  private player7: ReturnType<AnimationEngine['play']> = null;

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
      this.player = null;
      this.player2 = null;
      this.player3 = null;
      this.player4 = null;
      this.player5 = null;
      this.player6 = null;
      this.player7 = null;

      const el1 = this.p1()?.nativeElement;
      const el2 = this.p2()?.nativeElement;
      const el3 = this.p3()?.nativeElement;
      const el4 = this.p4()?.nativeElement;
      const el5 = this.p5()?.nativeElement;
      const el6 = this.p6()?.nativeElement;
      const el7 = this.c()?.nativeElement;
      if (!el1 || !el2 || !el3 || !el4 || !el5 || !el6 || !el7) return;
      applyTransformOrigin(el1); applyTransformOrigin(el2); applyTransformOrigin(el3);
      applyTransformOrigin(el4); applyTransformOrigin(el5); applyTransformOrigin(el6); applyTransformOrigin(el7);
      if (this.animate()) {
        this.player = this.engine.play(el1, { scale: [0.8, 1.2, 1], opacity: [0.6, 1, 1] }, { config: { duration: 400, easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)', delay: 0, disabled: false } });
        this.player2 = this.engine.play(el2, { scale: [0.8, 1.2, 1], opacity: [0.6, 1, 1] }, { config: { duration: 400, easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)', delay: 60, disabled: false } });
        this.player3 = this.engine.play(el3, { scale: [0.8, 1.2, 1], opacity: [0.6, 1, 1] }, { config: { duration: 400, easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)', delay: 120, disabled: false } });
        this.player4 = this.engine.play(el4, { scale: [0.8, 1.2, 1], opacity: [0.6, 1, 1] }, { config: { duration: 400, easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)', delay: 180, disabled: false } });
        this.player5 = this.engine.play(el5, { scale: [0.8, 1.2, 1], opacity: [0.6, 1, 1] }, { config: { duration: 400, easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)', delay: 240, disabled: false } });
        this.player6 = this.engine.play(el6, { scale: [0.8, 1.2, 1], opacity: [0.6, 1, 1] }, { config: { duration: 400, easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)', delay: 300, disabled: false } });
        this.player7 = this.engine.play(el7, { scale: [0.8, 1.2, 1], opacity: [0.6, 1, 1] }, { config: { duration: 400, easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)', delay: 360, disabled: false } });
      } else {
        this.player = this.engine.play(el1, { scale: [1], opacity: [1] }, { config: { duration: 200, easing: 'ease-out', delay: 0, disabled: false } });
        this.player2 = this.engine.play(el2, { scale: [1], opacity: [1] }, { config: { duration: 200, easing: 'ease-out', delay: 0, disabled: false } });
        this.player3 = this.engine.play(el3, { scale: [1], opacity: [1] }, { config: { duration: 200, easing: 'ease-out', delay: 0, disabled: false } });
        this.player4 = this.engine.play(el4, { scale: [1], opacity: [1] }, { config: { duration: 200, easing: 'ease-out', delay: 0, disabled: false } });
        this.player5 = this.engine.play(el5, { scale: [1], opacity: [1] }, { config: { duration: 200, easing: 'ease-out', delay: 0, disabled: false } });
        this.player6 = this.engine.play(el6, { scale: [1], opacity: [1] }, { config: { duration: 200, easing: 'ease-out', delay: 0, disabled: false } });
        this.player7 = this.engine.play(el7, { scale: [1], opacity: [1] }, { config: { duration: 200, easing: 'ease-out', delay: 0, disabled: false } });
      }
    });
  }
}
