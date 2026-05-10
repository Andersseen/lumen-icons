import { ChangeDetectionStrategy, Component, effect, ElementRef, inject, viewChild } from '@angular/core';
import { AnimationEngine } from 'angular-movement';
import type { MoveKeyframes } from 'angular-movement';
import { LmnIconBase, LM_ICON_HOST } from '../lib/icon-base';

@Component({
  selector: 'lmn-external-link',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: LM_ICON_HOST,
  template: `
<svg [attr.width]="size()" [attr.height]="size()" [attr.stroke-width]="strokeWidth()"
      viewBox="0 0 24 24" fill="none" stroke="currentColor"
      stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
      <path #p3 #p2 #p1 d="M15 3h6v6"/>
      <path d="M10 14 21 3"/>
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
    </svg>
  `,
})
export class LmnExternalLinkIcon extends LmnIconBase {

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
      if (this.animate()) {
        const len1 = el1.getTotalLength?.() ?? 28;
        (el1 as unknown as HTMLElement).style.strokeDasharray = `${len1}`;
        (el1 as unknown as HTMLElement).style.strokeDashoffset = `${len1}`;
        this.player = this.engine.play(el1, { strokeDashoffset: [len1, 0] } as MoveKeyframes, { config: { duration: 350, easing: 'ease-out', delay: 0, disabled: false } });
        const len2 = el2.getTotalLength?.() ?? 28;
        (el2 as unknown as HTMLElement).style.strokeDasharray = `${len2}`;
        (el2 as unknown as HTMLElement).style.strokeDashoffset = `${len2}`;
        this.player2 = this.engine.play(el2, { strokeDashoffset: [len2, 0] } as MoveKeyframes, { config: { duration: 350, easing: 'ease-out', delay: 80, disabled: false } });
        const len3 = el3.getTotalLength?.() ?? 28;
        (el3 as unknown as HTMLElement).style.strokeDasharray = `${len3}`;
        (el3 as unknown as HTMLElement).style.strokeDashoffset = `${len3}`;
        this.player3 = this.engine.play(el3, { strokeDashoffset: [len3, 0] } as MoveKeyframes, { config: { duration: 350, easing: 'ease-out', delay: 160, disabled: false } });
      } else {
        (el1 as unknown as HTMLElement).style.strokeDasharray = '';
        (el1 as unknown as HTMLElement).style.strokeDashoffset = '';
        (el2 as unknown as HTMLElement).style.strokeDasharray = '';
        (el2 as unknown as HTMLElement).style.strokeDashoffset = '';
        (el3 as unknown as HTMLElement).style.strokeDasharray = '';
        (el3 as unknown as HTMLElement).style.strokeDashoffset = '';
      }
    });
  }
}
