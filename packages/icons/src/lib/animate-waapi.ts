/**
 * WAAPI animation helpers for Lumen Icons semantic animations.
 * Each icon calls these imperatively when animate() becomes true.
 */

export function animateStrokeDraw(
  el: SVGGeometryElement,
  duration = 400,
): Animation {
  const length = el.getTotalLength?.() ?? 28;
  el.style.strokeDasharray = `${length}`;
  el.style.strokeDashoffset = `${length}`;

  return el.animate(
    [{ strokeDashoffset: length }, { strokeDashoffset: 0 }],
    { duration, easing: 'ease-out', fill: 'forwards' },
  );
}

export function animateScalePulse(
  el: Element,
  {
    from = 1,
    to = 1.2,
    duration = 600,
  }: { from?: number; to?: number; duration?: number } = {},
): Animation {
  return el.animate(
    [
      { transform: `scale(${from})` },
      { transform: `scale(${to})` },
      { transform: `scale(${from})` },
    ],
    { duration, iterations: Infinity, easing: 'ease-in-out' },
  );
}

export function animateShake(
  el: Element,
  duration = 400,
): Animation {
  return el.animate(
    [
      { transform: 'translateX(0)' },
      { transform: 'translateX(-3px)' },
      { transform: 'translateX(3px)' },
      { transform: 'translateX(-3px)' },
      { transform: 'translateX(0)' },
    ],
    { duration, easing: 'ease-in-out' },
  );
}

export function animateRotate(
  el: Element,
  { duration = 2000 }: { duration?: number } = {},
): Animation {
  return el.animate(
    [{ transform: 'rotate(0deg)' }, { transform: 'rotate(360deg)' }],
    { duration, iterations: Infinity, easing: 'linear' },
  );
}

export function animateRing(
  el: Element,
  duration = 600,
): Animation {
  return el.animate(
    [
      { transform: 'rotate(0deg)' },
      { transform: 'rotate(15deg)' },
      { transform: 'rotate(-15deg)' },
      { transform: 'rotate(10deg)' },
      { transform: 'rotate(-10deg)' },
      { transform: 'rotate(0deg)' },
    ],
    { duration, easing: 'ease-in-out' },
  );
}
