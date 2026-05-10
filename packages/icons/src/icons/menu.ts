import { ChangeDetectionStrategy, Component, effect, ElementRef, inject, viewChild } from '@angular/core';
import { AnimationEngine } from 'angular-movement';
import { LmnIconBase, LM_ICON_HOST } from '../lib/icon-base';
import { applyTransformOrigin } from '../lib/animation-utils';

@Component({
  selector: 'lmn-menu',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: LM_ICON_HOST,
  template: `
<svg [attr.width]="size()" [attr.height]="size()" [attr.stroke-width]="strokeWidth()"
      viewBox="0 0 24 24" fill="none" stroke="currentColor"
      stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
      <line x1="4" x2="20" y1="6" y2="6"/>
      <line x1="4" x2="20" y1="12" y2="12"/>
      <line x1="4" x2="20" y1="18" y2="18"/>
    </svg>
  `,
})
export class LmnMenuIcon extends LmnIconBase {

  private l1 = viewChild('l1', { read: ElementRef<SVGPathElement> });
  private l2 = viewChild('l2', { read: ElementRef<SVGPathElement> });
  private l3 = viewChild('l3', { read: ElementRef<SVGPathElement> });
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

      const el1 = this.l1()?.nativeElement;
      const el2 = this.l2()?.nativeElement;
      const el3 = this.l3()?.nativeElement;
      if (!el1 || !el2 || !el3) return;
      applyTransformOrigin(el1); applyTransformOrigin(el2); applyTransformOrigin(el3);
      if (this.animate()) {
        this.player = this.engine.play(el1, { scaleX: [1, 0.85, 1] }, { config: { duration: 500, easing: 'ease-in-out', delay: 0, disabled: false } });
        this.player2 = this.engine.play(el2, { scaleX: [1, 0.85, 1] }, { config: { duration: 500, easing: 'ease-in-out', delay: 80, disabled: false } });
        this.player3 = this.engine.play(el3, { scaleX: [1, 0.85, 1] }, { config: { duration: 500, easing: 'ease-in-out', delay: 160, disabled: false } });
      } else {
        this.player = this.engine.play(el1, { scaleX: [1] }, { config: { duration: 200, easing: 'ease-out', delay: 0, disabled: false } });
        this.player2 = this.engine.play(el2, { scaleX: [1] }, { config: { duration: 200, easing: 'ease-out', delay: 0, disabled: false } });
        this.player3 = this.engine.play(el3, { scaleX: [1] }, { config: { duration: 200, easing: 'ease-out', delay: 0, disabled: false } });
      }
    });
  }
}
