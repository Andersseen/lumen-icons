/**
 * Minimal animation utilities for Lumen Icons.
 * These are pure functions, not services.
 */

export function applyTransformOrigin(el: Element): void {
  const htmlEl = el as HTMLElement;
  htmlEl.style.transformOrigin = 'center';
  htmlEl.style.transformBox = 'fill-box';
}
