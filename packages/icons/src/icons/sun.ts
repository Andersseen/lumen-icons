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
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
    </svg>
  `,
})
export class LmnSunIcon extends LmnIconBase {
  readonly animate = input<boolean>(false);

  private svg = viewChild.required('svg', { read: ElementRef<SVGElement> });
  private engine = inject(AnimationEngine);
  private player: ReturnType<AnimationEngine['play']> = null;

  constructor() {
    super();
    effect(() => {
      this.player?.cancel();
      this.player = null;

      const el = this.svg().nativeElement;
      applyTransformOrigin(el);

      if (this.animate()) {
        // Sun "wiggle" + pulse - no fade, icon stays fully visible
        this.player = this.engine.play(
          el,
          { rotate: [0, 12, 0], scale: [1, 1.06, 1] },
          { config: { duration: 500, easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)', delay: 0, disabled: false } },
        );
      }
      // No leave animation needed - icon is always fully visible
    });
  }
}
