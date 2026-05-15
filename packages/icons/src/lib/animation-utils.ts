/**
 * Pure helpers for Lumen icon animations using angular-movement's AnimationEngine.
 * Each icon component injects AnimationEngine directly and calls these.
 */

import type { MoveKeyframes } from 'angular-movement';

export function applyTransformOrigin(el: Element): void {
  const htmlEl = el as HTMLElement;
  htmlEl.style.transformOrigin = 'center';
  htmlEl.style.transformBox = 'fill-box';
}

export function strokeDraw(
  el: SVGGeometryElement,
  engine: { play: (host: Element, frames: MoveKeyframes, options?: Record<string, unknown>) => unknown },
  duration = 500,
): ReturnType<typeof engine.play> {
  const length = el.getTotalLength?.() ?? 28;
  (el as unknown as HTMLElement).style.strokeDasharray = `${length}`;
  (el as unknown as HTMLElement).style.strokeDashoffset = `${length}`;

  return engine.play(
    el,
    { strokeDashoffset: [length, 0] } as MoveKeyframes,
    { config: { duration, easing: 'ease-out', delay: 0, disabled: false } },
  ) as ReturnType<typeof engine.play>;
}

export function strokeReset(el: SVGGeometryElement): void {
  (el as unknown as HTMLElement).style.strokeDasharray = '';
  (el as unknown as HTMLElement).style.strokeDashoffset = '';
}
