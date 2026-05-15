import { ChangeDetectionStrategy, Component, effect, ElementRef, inject, viewChild } from '@angular/core';
import { AnimationEngine } from 'angular-movement';
import type { MoveKeyframes } from 'angular-movement';
import { LmnIconBase, LM_ICON_HOST } from '../lib/icon-base';

@Component({
  selector: 'lmn-bold',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: LM_ICON_HOST,
  template: `
<svg [attr.width]="size()" [attr.height]="size()" [attr.stroke-width]="strokeWidth()"
      viewBox="0 0 24 24" fill="none" stroke="currentColor"
      stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
      <path #p2 #p1 d="M14 12a4 4 0 0 0 0-8H6v8"/>
      <path d="M15 20a4 4 0 0 0 0-8H6v8Z"/>
    </svg>
  `,
})
export class LmnBoldIcon extends LmnIconBase {

  private p1 = viewChild('p1', { read: ElementRef<SVGPathElement> });
  private p2 = viewChild('p2', { read: ElementRef<SVGPathElement> });
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

      const el1 = this.p1()?.nativeElement;
      const el2 = this.p2()?.nativeElement;
      if (!el1 || !el2) return;
      if (this.animate()) {
        const len1 = el1.getTotalLength?.() ?? 28;
        (el1 as unknown as HTMLElement).style.strokeDasharray = `${len1}`;
        (el1 as unknown as HTMLElement).style.strokeDashoffset = `${len1}`;
        this.player = this.engine.play(el1, { strokeDashoffset: [len1, 0] } as MoveKeyframes, { config: { duration: 400, easing: 'ease-out', delay: 0, disabled: false } });
        const len2 = el2.getTotalLength?.() ?? 28;
        (el2 as unknown as HTMLElement).style.strokeDasharray = `${len2}`;
        (el2 as unknown as HTMLElement).style.strokeDashoffset = `${len2}`;
        this.player2 = this.engine.play(el2, { strokeDashoffset: [len2, 0] } as MoveKeyframes, { config: { duration: 400, easing: 'ease-out', delay: 100, disabled: false } });
      } else {
        (el1 as unknown as HTMLElement).style.strokeDasharray = '';
        (el1 as unknown as HTMLElement).style.strokeDashoffset = '';
        (el2 as unknown as HTMLElement).style.strokeDasharray = '';
        (el2 as unknown as HTMLElement).style.strokeDashoffset = '';
      }
    });
  }
}
