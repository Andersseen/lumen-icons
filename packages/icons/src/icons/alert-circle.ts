import { ChangeDetectionStrategy, Component, effect, ElementRef, inject, input, viewChild } from '@angular/core';
import { AnimationEngine } from 'angular-movement';
import { LmnIconBase, LM_ICON_HOST } from '../lib/icon-base';

@Component({
  selector: 'lmn-alert-circle',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: LM_ICON_HOST,
  template: `
<svg #svg [attr.width]="size()" [attr.height]="size()" [attr.stroke-width]="strokeWidth()"
      viewBox="0 0 24 24" fill="none" stroke="currentColor"
      stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
      <circle cx="12" cy="12" r="10"/>
      <line x1="12" x2="12" y1="8" y2="12"/>
      <line x1="12" x2="12.01" y1="16" y2="16"/>
    </svg>
  `,
})
export class LmnAlertCircleIcon extends LmnIconBase {
  readonly animate = input<boolean>(false);

  private svg = viewChild('svg', { read: ElementRef<SVGElement> });
  private engine = inject(AnimationEngine);
  private player: ReturnType<AnimationEngine['play']> = null;

  constructor() {
    super();
    effect(() => {
      this.player?.cancel();
      this.player = null;

      const el = this.svg()?.nativeElement;
      if (!el) return;
      if (this.animate()) {
        this.player = this.engine.play(el, { x: [0, -4, 4, -3, 3, 0] }, { config: { duration: 500, easing: 'ease-in-out', delay: 0, disabled: false } });
      }
    });
  }
}
