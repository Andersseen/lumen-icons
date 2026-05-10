import { ChangeDetectionStrategy, Component, effect, ElementRef, inject, viewChild } from '@angular/core';
import { AnimationEngine } from 'angular-movement';
import { LmnIconBase, LM_ICON_HOST } from '../lib/icon-base';
import { applyTransformOrigin } from '../lib/animation-utils';

@Component({
  selector: 'lmn-italic',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: LM_ICON_HOST,
  template: `
<svg [attr.width]="size()" [attr.height]="size()" [attr.stroke-width]="strokeWidth()"
      viewBox="0 0 24 24" fill="none" stroke="currentColor"
      stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
      <path #p3 #p2 #p1 d="M19 4h-9"/>
      <path d="M14 20H5"/>
      <path d="M15 4 9 20"/>
    </svg>
  `,
})
export class LmnItalicIcon extends LmnIconBase {

  private p1 = viewChild('p1', { read: ElementRef<SVGPathElement> });
  private p2 = viewChild('p2', { read: ElementRef<SVGPathElement> });
  private p3 = viewChild('p3', { read: ElementRef<SVGPathElement> });
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

      const el1 = this.p1()?.nativeElement;
      const el2 = this.p2()?.nativeElement;
      const el3 = this.p3()?.nativeElement;
      if (!el1 || !el2 || !el3) return;
      applyTransformOrigin(el1); applyTransformOrigin(el2); applyTransformOrigin(el3);
      if (this.animate()) {
        this.player = this.engine.play(el1, { rotate: [0, -8, 0] }, { config: { duration: 500, easing: 'ease-in-out', delay: 0, disabled: false } });
        this.player2 = this.engine.play(el2, { rotate: [0, -8, 0] }, { config: { duration: 500, easing: 'ease-in-out', delay: 50, disabled: false } });
        this.player3 = this.engine.play(el3, { rotate: [0, -8, 0] }, { config: { duration: 500, easing: 'ease-in-out', delay: 100, disabled: false } });
      } else {
        this.player = this.engine.play(el1, { rotate: [0] }, { config: { duration: 200, easing: 'ease-out', delay: 0, disabled: false } });
        this.player2 = this.engine.play(el2, { rotate: [0] }, { config: { duration: 200, easing: 'ease-out', delay: 0, disabled: false } });
        this.player3 = this.engine.play(el3, { rotate: [0] }, { config: { duration: 200, easing: 'ease-out', delay: 0, disabled: false } });
      }
    });
  }
}
