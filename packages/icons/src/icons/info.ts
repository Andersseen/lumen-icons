import { ChangeDetectionStrategy, Component, effect, ElementRef, inject, input, viewChild } from '@angular/core';
import { AnimationEngine } from 'angular-movement';
import { LmnIconBase, LM_ICON_HOST } from '../lib/icon-base';
import { applyTransformOrigin } from '../lib/animation-utils';

@Component({
  selector: 'lmn-info',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: LM_ICON_HOST,
  template: `
<svg [attr.width]="size()" [attr.height]="size()" [attr.stroke-width]="strokeWidth()"
      viewBox="0 0 24 24" fill="none" stroke="currentColor"
      stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
      <circle cx="12" cy="12" r="10"/>
      <path #p2 #p1 #c d="M12 16v-4"/>
      <path d="M12 8h.01"/>
    </svg>
  `,
})
export class LmnInfoIcon extends LmnIconBase {
  readonly animate = input<boolean>(false);

  private c = viewChild('c', { read: ElementRef<SVGPathElement> });
  private p1 = viewChild('p1', { read: ElementRef<SVGPathElement> });
  private p2 = viewChild('p2', { read: ElementRef<SVGPathElement> });
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

      const c = this.c()?.nativeElement;
      const p1 = this.p1()?.nativeElement;
      const p2 = this.p2()?.nativeElement;
      if (!c || !p1 || !p2) return;
      applyTransformOrigin(c); applyTransformOrigin(p1); applyTransformOrigin(p2);
      if (this.animate()) {
        this.player = this.engine.play(c, { scale: [1, 1.1, 1] }, { config: { duration: 500, easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)', delay: 0, disabled: false } });
        this.player2 = this.engine.play(p1, { y: [0, -2, 0] }, { config: { duration: 400, easing: 'ease-out', delay: 100, disabled: false } });
        this.player3 = this.engine.play(p2, { y: [0, -2, 0] }, { config: { duration: 400, easing: 'ease-out', delay: 150, disabled: false } });
      } else {
        this.player = this.engine.play(c, { scale: [1] }, { config: { duration: 200, easing: 'ease-out', delay: 0, disabled: false } });
        this.player2 = this.engine.play(p1, { y: [0] }, { config: { duration: 150, easing: 'ease-out', delay: 0, disabled: false } });
        this.player3 = this.engine.play(p2, { y: [0] }, { config: { duration: 150, easing: 'ease-out', delay: 0, disabled: false } });
      }
    });
  }
}
