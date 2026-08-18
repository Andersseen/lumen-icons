/**
 * Semantic, per-icon animation recipes for lumen-icons.
 *
 * Each recipe produces CSS for one icon and optionally mutates the SVG inner
 * markup (adds per-path classes, pathLength, etc.).
 *
 * The library ships pure CSS animations with no runtime animation dependency.
 */

const prefersReducedMotion = `
    @media (prefers-reduced-motion: reduce) {
      .lmn-animate,
      .lmn-animate svg,
      .lmn-animate path,
      .lmn-animate line,
      .lmn-animate circle,
      .lmn-animate rect,
      .lmn-animate g,
      .lmn-animate-el {
        animation: none !important;
      }
    }
  `;

const animateBase = `
    .lmn-animate svg path,
    .lmn-animate svg line,
    .lmn-animate svg circle,
    .lmn-animate svg rect,
    .lmn-animate svg g {
      transform-box: fill-box;
      transform-origin: center;
    }
  `;

/**
 * @typedef {Object} AnimationRecipeResult
 * @property {string} keyframes
 * @property {string} base
 * @property {string} animate
 * @property {string[]} pathClasses
 * @property {boolean} pathLength
 * @property {boolean|'outline'|'both'} splitPaths — split compound <path> d's into
 * one element per subpath so recipes can animate parts ('outline' = outline variant
 * only, the default for true; 'both' = outline and filled). Never split filled
 * compound paths whose subpaths punch holes (winding) — check before opting in.
 * @property {number[]} [reversePaths] — indices of split, straight outline paths
 * whose drawing direction should be reversed before assigning path length.
 */

/** @type {Record<string, (name: string, duration?: string) => AnimationRecipeResult>} */
const RECIPES = {
  'draw-scale'(name, duration = '420ms') {
    return {
      pathLength: true,
      pathClasses: [],
      keyframes: `
        @keyframes lmn-${name} {
          0% { stroke-dashoffset: 1; opacity: 0; transform: scale(0.6); }
          60% { transform: scale(1.12); }
          100% { stroke-dashoffset: 0; opacity: 1; transform: scale(1); }
        }
      `,
      base: '',
      animate: `
        .lmn-animate svg path {
          stroke-dasharray: 1;
          stroke-dashoffset: 0;
          animation: lmn-${name} ${duration} ease both;
        }
      `,
    };
  },

  'beat'(name, duration = '600ms') {
    return {
      pathLength: false,
      pathClasses: [],
      keyframes: `
        @keyframes lmn-${name} {
          0%, 100% { transform: scale(1); }
          15% { transform: scale(1.25); }
          30% { transform: scale(0.92); }
          45% { transform: scale(1.12); }
          60% { transform: scale(1); }
        }
      `,
      base: '',
      animate: `
        .lmn-animate svg {
          animation: lmn-${name} ${duration} ease-in-out both;
        }
      `,
    };
  },

  'spin'(name, duration = '600ms') {
    return {
      pathLength: false,
      pathClasses: [],
      keyframes: `
        @keyframes lmn-${name} {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `,
      base: '',
      animate: `
        .lmn-animate svg {
          animation: lmn-${name} ${duration} ease both;
        }
      `,
    };
  },

  'spin-infinite'(name, duration = '800ms') {
    return {
      pathLength: false,
      pathClasses: [],
      keyframes: `
        @keyframes lmn-${name} {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `,
      base: '',
      animate: `
        .lmn-animate svg {
          animation: lmn-${name} ${duration} linear infinite;
        }
      `,
    };
  },

  'rotate-once'(name, duration = '600ms', angle = 180) {
    return {
      pathLength: false,
      pathClasses: [],
      keyframes: `
        @keyframes lmn-${name} {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(${angle}deg); }
        }
      `,
      base: '',
      animate: `
        .lmn-animate svg {
          animation: lmn-${name} ${duration} ease-in-out both;
        }
      `,
    };
  },

  'slide-right'(name, duration = '400ms', distance = '5px') {
    return {
      pathLength: false,
      pathClasses: [],
      keyframes: `
        @keyframes lmn-${name} {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(${distance}); }
        }
      `,
      base: '',
      animate: `
        .lmn-animate svg {
          animation: lmn-${name} ${duration} ease both;
        }
      `,
    };
  },

  'slide-left'(name, duration = '400ms', distance = '5px') {
    return {
      pathLength: false,
      pathClasses: [],
      keyframes: `
        @keyframes lmn-${name} {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(-${distance}); }
        }
      `,
      base: '',
      animate: `
        .lmn-animate svg {
          animation: lmn-${name} ${duration} ease both;
        }
      `,
    };
  },

  'slide-up'(name, duration = '400ms', distance = '5px') {
    return {
      pathLength: false,
      pathClasses: [],
      keyframes: `
        @keyframes lmn-${name} {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-${distance}); }
        }
      `,
      base: '',
      animate: `
        .lmn-animate svg {
          animation: lmn-${name} ${duration} ease both;
        }
      `,
    };
  },

  'slide-down'(name, duration = '400ms', distance = '5px') {
    return {
      pathLength: false,
      pathClasses: [],
      keyframes: `
        @keyframes lmn-${name} {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(${distance}); }
        }
      `,
      base: '',
      animate: `
        .lmn-animate svg {
          animation: lmn-${name} ${duration} ease both;
        }
      `,
    };
  },

  'search'(name, duration = '650ms') {
    return {
      pathLength: false,
      pathClasses: [],
      keyframes: `
        @keyframes lmn-${name} {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(-2px, -5px) rotate(-12deg); }
          50% { transform: translate(0, 0) rotate(0deg); }
          75% { transform: translate(2px, -3px) rotate(8deg); }
        }
      `,
      base: '',
      animate: `
        .lmn-animate svg {
          animation: lmn-${name} ${duration} ease-in-out both;
        }
      `,
    };
  },

  'swing'(name, duration = '500ms') {
    return {
      pathLength: false,
      pathClasses: [],
      keyframes: `
        @keyframes lmn-${name} {
          0%, 100% { transform: rotate(0deg); }
          15% { transform: rotate(18deg); }
          30% { transform: rotate(-14deg); }
          50% { transform: rotate(10deg); }
          70% { transform: rotate(-6deg); }
          85% { transform: rotate(3deg); }
        }
      `,
      base: `
        .lmn-animate svg {
          transform-origin: top center;
        }
      `,
      animate: `
        .lmn-animate svg {
          animation: lmn-${name} ${duration} ease-in-out both;
        }
      `,
    };
  },

  'bounce'(name, duration = '450ms') {
    return {
      pathLength: false,
      pathClasses: [],
      keyframes: `
        @keyframes lmn-${name} {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
      `,
      base: '',
      animate: `
        .lmn-animate svg {
          animation: lmn-${name} ${duration} ease both;
        }
      `,
    };
  },

  'shake'(name, duration = '500ms') {
    return {
      pathLength: false,
      pathClasses: [],
      keyframes: `
        @keyframes lmn-${name} {
          0%, 100% { transform: rotate(0deg) translateX(0); }
          20% { transform: rotate(8deg) translateX(2px); }
          40% { transform: rotate(-8deg) translateX(-2px); }
          60% { transform: rotate(5deg) translateX(1px); }
          80% { transform: rotate(-5deg) translateX(-1px); }
        }
      `,
      base: '',
      animate: `
        .lmn-animate svg {
          animation: lmn-${name} ${duration} ease-in-out both;
        }
      `,
    };
  },

  'fly'(name, duration = '500ms') {
    return {
      pathLength: false,
      pathClasses: [],
      keyframes: `
        @keyframes lmn-${name} {
          0%, 100% { transform: translate(0, 0); opacity: 1; }
          50% { transform: translate(5px, -5px); opacity: 0.65; }
        }
      `,
      base: '',
      animate: `
        .lmn-animate svg {
          animation: lmn-${name} ${duration} ease both;
        }
      `,
    };
  },

  'pulse-scale'(name, duration = '450ms') {
    return {
      pathLength: false,
      pathClasses: [],
      keyframes: `
        @keyframes lmn-${name} {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.18); opacity: 0.85; }
        }
      `,
      base: '',
      animate: `
        .lmn-animate svg {
          animation: lmn-${name} ${duration} ease both;
        }
      `,
    };
  },

  'flash'(name, duration = '450ms') {
    return {
      pathLength: false,
      pathClasses: [],
      keyframes: `
        @keyframes lmn-${name} {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.35; }
        }
      `,
      base: '',
      animate: `
        .lmn-animate svg {
          animation: lmn-${name} ${duration} ease both;
        }
      `,
    };
  },

  'menu-morph'(name, duration = '400ms') {
    return {
      pathLength: false,
      pathClasses: ['lmn-path-1', 'lmn-path-2', 'lmn-path-3'],
      keyframes: `
        @keyframes lmn-${name}-top {
          0% { transform: translateY(0) rotate(0deg); }
          100% { transform: translateY(6px) rotate(45deg); }
        }
        @keyframes lmn-${name}-mid {
          0% { opacity: 1; }
          100% { opacity: 0; }
        }
        @keyframes lmn-${name}-bot {
          0% { transform: translateY(0) rotate(0deg); }
          100% { transform: translateY(-6px) rotate(-45deg); }
        }
      `,
      base: `
        .lmn-animate svg .lmn-path-1,
        .lmn-animate svg .lmn-path-2,
        .lmn-animate svg .lmn-path-3 {
          transform-origin: center;
        }
      `,
      animate: `
        .lmn-animate svg .lmn-path-1 { animation: lmn-${name}-top ${duration} ease both; }
        .lmn-animate svg .lmn-path-2 { animation: lmn-${name}-mid ${duration} ease both; }
        .lmn-animate svg .lmn-path-3 { animation: lmn-${name}-bot ${duration} ease both; }
      `,
    };
  },

  'bars-stagger'(name, duration = '440ms', total = 3, reverseIndices = []) {
    const pathClasses = Array.from({ length: total }, (_, i) => `lmn-path-${i + 1}`);
    const normal = pathClasses
      .map((cls, i) => reverseIndices.includes(i + 1) ? '' : `.lmn-animate svg .${cls}`)
      .filter(Boolean)
      .join(',\n        ');
    const reversed = reverseIndices
      .map((i) => `.lmn-animate svg .lmn-path-${i}`)
      .join(',\n        ');
    const rules = pathClasses.map((cls, i) => (
      `.lmn-animate svg .${cls} { animation-delay: ${i * 70}ms; }`
    )).join('\n        ');
    const reversedBlock = reversed ? `${reversed} {
          stroke-dasharray: 1;
          stroke-dashoffset: 0;
          animation: lmn-${name}-line-reverse ${duration} cubic-bezier(0.22, 0.8, 0.32, 1) both;
        }` : '';
    return {
      pathLength: true,
      pathClasses,
      splitPaths: 'both',
      keyframes: `
        @keyframes lmn-${name}-line {
          0% { stroke-dashoffset: 1; opacity: 0; }
          100% { stroke-dashoffset: 0; opacity: 1; }
        }
        @keyframes lmn-${name}-line-reverse {
          0% { stroke-dashoffset: -1; opacity: 0; }
          100% { stroke-dashoffset: 0; opacity: 1; }
        }
      `,
      base: '',
      animate: [
        `${normal} {
          stroke-dasharray: 1;
          stroke-dashoffset: 0;
          animation: lmn-${name}-line ${duration} cubic-bezier(0.22, 0.8, 0.32, 1) both;
        }`,
        reversedBlock,
        rules,
      ].filter(Boolean).join('\n        '),
    };
  },

  'bars-arrow'(name, duration = '650ms', direction = 'down') {
    const fromY = direction === 'down' ? '-3px' : '3px';
    const shaftIndex = direction === 'down' ? 4 : 6;
    const headIndices = direction === 'down' ? [5, 6] : [4, 5];
    const listSelectors = [1, 2, 3].map(i => `.lmn-animate--outline svg .lmn-path-${i}`).join(',\n        ');
    const arrowSelectors = [shaftIndex, ...headIndices].map(i => `.lmn-animate--outline svg .lmn-path-${i}`).join(',\n        ');
    return {
      pathLength: true,
      pathClasses: ['lmn-path-1', 'lmn-path-2', 'lmn-path-3', 'lmn-path-4', 'lmn-path-5', 'lmn-path-6'],
      splitPaths: 'both',
      keyframes: `
        @keyframes lmn-${name}-list {
          0% { stroke-dashoffset: 1; opacity: 0; }
          52%, 100% { stroke-dashoffset: 0; opacity: 1; }
        }
        @keyframes lmn-${name}-arrow {
          0%, 36% { transform: translateY(${fromY}); opacity: 0; }
          82%, 100% { transform: translateY(0); opacity: 1; }
        }
        @keyframes lmn-${name}-solid {
          0% { transform: translateY(${fromY}); opacity: 0.2; }
          82%, 100% { transform: translateY(0); opacity: 1; }
        }
      `,
      base: '',
      animate: `
        ${listSelectors} {
          stroke-dasharray: 1;
          stroke-dashoffset: 0;
          animation: lmn-${name}-list ${duration} cubic-bezier(0.22, 0.8, 0.32, 1) both;
        }
        .lmn-animate--outline svg .lmn-path-2 { animation-delay: 60ms; }
        .lmn-animate--outline svg .lmn-path-3 { animation-delay: 120ms; }
        ${arrowSelectors} { animation: lmn-${name}-arrow ${duration} cubic-bezier(0.22, 0.8, 0.32, 1) both; }
        .lmn-animate--filled svg { animation: lmn-${name}-solid ${duration} cubic-bezier(0.22, 0.8, 0.32, 1) both; }
      `,
    };
  },

  'copy-offset'(name, duration = '400ms') {
    return {
      pathLength: false,
      pathClasses: ['lmn-path-1', 'lmn-path-2'],
      keyframes: `
        @keyframes lmn-${name}-front {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-3px, -3px); }
        }
        @keyframes lmn-${name}-back {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(3px, 3px); }
        }
      `,
      base: '',
      animate: `
        .lmn-animate svg .lmn-path-1 { animation: lmn-${name}-front ${duration} ease both; }
        .lmn-animate svg .lmn-path-2 { animation: lmn-${name}-back ${duration} ease both; }
      `,
    };
  },

  'sun-rays'(name, duration = '600ms') {
    return {
      pathLength: false,
      pathClasses: [],
      keyframes: `
        @keyframes lmn-${name}-core {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        @keyframes lmn-${name}-ray {
          0% { opacity: 0; transform: scale(0.5); }
          100% { opacity: 1; transform: scale(1); }
        }
      `,
      base: '',
      animate: `
        .lmn-animate svg :first-child {
          animation: lmn-${name}-core ${duration} ease both;
        }
        .lmn-animate svg path:nth-child(n+2) {
          opacity: 1;
          animation: lmn-${name}-ray ${duration} ease both;
          animation-delay: calc(var(--lmn-ray-index, 0) * 40ms);
        }
        .lmn-animate svg path:nth-child(2) { --lmn-ray-index: 0; }
        .lmn-animate svg path:nth-child(3) { --lmn-ray-index: 1; }
        .lmn-animate svg path:nth-child(4) { --lmn-ray-index: 2; }
        .lmn-animate svg path:nth-child(5) { --lmn-ray-index: 3; }
        .lmn-animate svg path:nth-child(6) { --lmn-ray-index: 4; }
        .lmn-animate svg path:nth-child(7) { --lmn-ray-index: 5; }
        .lmn-animate svg path:nth-child(8) { --lmn-ray-index: 6; }
        .lmn-animate svg path:nth-child(9) { --lmn-ray-index: 7; }
      `,
    };
  },

  'moon-wobble'(name, duration = '800ms') {
    return {
      pathLength: false,
      pathClasses: [],
      keyframes: `
        @keyframes lmn-${name} {
          0%, 100% { transform: rotate(0deg); }
          15% { transform: rotate(-12deg); }
          30% { transform: rotate(10deg); }
          45% { transform: rotate(-6deg); }
          60% { transform: rotate(4deg); }
          75% { transform: rotate(-2deg); }
        }
      `,
      base: '',
      animate: `
        .lmn-animate svg {
          animation: lmn-${name} ${duration} ease-in-out both;
        }
      `,
    };
  },

  'stretch-x'(name, duration = '400ms') {
    return {
      pathLength: false,
      pathClasses: [],
      keyframes: `
        @keyframes lmn-${name} {
          0%, 100% { transform: scaleX(1); }
          50% { transform: scaleX(1.25); }
        }
      `,
      base: '',
      animate: `
        .lmn-animate svg {
          animation: lmn-${name} ${duration} ease both;
        }
      `,
    };
  },

  'ring'(name, duration = '500ms') {
    return {
      pathLength: false,
      pathClasses: [],
      keyframes: `
        @keyframes lmn-${name} {
          0%, 100% { transform: rotate(0deg); }
          10% { transform: rotate(18deg); }
          25% { transform: rotate(-16deg); }
          40% { transform: rotate(14deg); }
          55% { transform: rotate(-10deg); }
          70% { transform: rotate(6deg); }
          85% { transform: rotate(-3deg); }
        }
      `,
      base: `
        .lmn-animate svg {
          transform-origin: top center;
        }
      `,
      animate: `
        .lmn-animate svg {
          animation: lmn-${name} ${duration} ease-in-out both;
        }
      `,
    };
  },

  'wiggle'(name, duration = '450ms') {
    return {
      pathLength: false,
      pathClasses: [],
      keyframes: `
        @keyframes lmn-${name} {
          0%, 100% { transform: rotate(0deg) translateX(0); }
          15% { transform: rotate(8deg) translateX(2px); }
          30% { transform: rotate(-8deg) translateX(-2px); }
          45% { transform: rotate(5deg) translateX(1px); }
          60% { transform: rotate(-5deg) translateX(-1px); }
          75% { transform: rotate(2deg) translateX(0); }
        }
      `,
      base: '',
      animate: `
        .lmn-animate svg {
          animation: lmn-${name} ${duration} ease-in-out both;
        }
      `,
    };
  },

  'float'(name, duration = '2000ms') {
    return {
      pathLength: false,
      pathClasses: [],
      keyframes: `
        @keyframes lmn-${name} {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
      `,
      base: '',
      animate: `
        .lmn-animate svg {
          animation: lmn-${name} ${duration} ease-in-out both;
        }
      `,
    };
  },

  'wave'(name, duration = '600ms') {
    return {
      pathLength: false,
      pathClasses: ['lmn-path-1', 'lmn-path-2', 'lmn-path-3'],
      keyframes: `
        @keyframes lmn-${name}-bar {
          0%, 100% { transform: scaleY(1); }
          50% { transform: scaleY(1.4); }
        }
      `,
      base: `
        .lmn-animate svg path,
        .lmn-animate svg line,
        .lmn-animate svg circle,
        .lmn-animate svg rect {
          transform-origin: bottom center;
        }
      `,
      animate: `
        .lmn-animate svg .lmn-path-1 { animation: lmn-${name}-bar ${duration} ease both; }
        .lmn-animate svg .lmn-path-2 { animation: lmn-${name}-bar ${duration} ease both 80ms; }
        .lmn-animate svg .lmn-path-3 { animation: lmn-${name}-bar ${duration} ease both 160ms; }
      `,
    };
  },

  'tap'(name, duration = '400ms') {
    return {
      pathLength: false,
      pathClasses: [],
      keyframes: `
        @keyframes lmn-${name} {
          0%, 100% { transform: scale(1); }
          40% { transform: scale(0.85); }
          60% { transform: scale(1.08); }
        }
      `,
      base: '',
      animate: `
        .lmn-animate svg {
          animation: lmn-${name} ${duration} ease both;
        }
      `,
    };
  },

  'typewriter'(name, duration = '500ms') {
    return {
      pathLength: false,
      pathClasses: [],
      keyframes: `
        @keyframes lmn-${name} {
          0% { opacity: 0; transform: translateY(3px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `,
      base: '',
      animate: `
        .lmn-animate svg {
          animation: lmn-${name} ${duration} ease both;
        }
      `,
    };
  },

  'draw-underline'(name, duration = '400ms') {
    return {
      pathLength: true,
      pathClasses: [],
      keyframes: `
        @keyframes lmn-${name} {
          0% { stroke-dashoffset: 1; }
          100% { stroke-dashoffset: 0; }
        }
      `,
      base: '',
      animate: `
        .lmn-animate svg path {
          stroke-dasharray: 1;
          stroke-dashoffset: 0;
          animation: lmn-${name} ${duration} ease both;
        }
      `,
    };
  },

  'draw-strikethrough'(name, duration = '400ms') {
    return {
      pathLength: true,
      pathClasses: [],
      keyframes: `
        @keyframes lmn-${name} {
          0% { stroke-dashoffset: 1; opacity: 0; }
          100% { stroke-dashoffset: 0; opacity: 1; }
        }
      `,
      base: '',
      animate: `
        .lmn-animate svg path {
          stroke-dasharray: 1;
          stroke-dashoffset: 0;
          animation: lmn-${name} ${duration} ease both;
        }
      `,
    };
  },

  'chart-grow'(name, duration = '600ms') {
    return {
      pathLength: false,
      pathClasses: ['lmn-path-1', 'lmn-path-2', 'lmn-path-3', 'lmn-path-4'],
      keyframes: `
        @keyframes lmn-${name}-bar {
          0% { transform: scaleY(0); opacity: 0; }
          100% { transform: scaleY(1); opacity: 1; }
        }
      `,
      base: `
        .lmn-animate svg path,
        .lmn-animate svg line,
        .lmn-animate svg rect {
          transform-origin: bottom center;
        }
      `,
      animate: `
        .lmn-animate svg .lmn-path-1 { animation: lmn-${name}-bar ${duration} ease both; }
        .lmn-animate svg .lmn-path-2 { animation: lmn-${name}-bar ${duration} ease both 80ms; }
        .lmn-animate svg .lmn-path-3 { animation: lmn-${name}-bar ${duration} ease both 160ms; }
        .lmn-animate svg .lmn-path-4 { animation: lmn-${name}-bar ${duration} ease both 240ms; }
      `,
    };
  },

  'chart-pie-slice'(name, duration = '600ms') {
    return {
      pathLength: true,
      pathClasses: [],
      keyframes: `
        @keyframes lmn-${name} {
          0% { stroke-dashoffset: 1; opacity: 0; transform: scale(0.8) rotate(-30deg); }
          100% { stroke-dashoffset: 0; opacity: 1; transform: scale(1) rotate(0deg); }
        }
      `,
      base: '',
      animate: `
        .lmn-animate svg path {
          stroke-dasharray: 1;
          stroke-dashoffset: 0;
          animation: lmn-${name} ${duration} ease both;
        }
      `,
    };
  },

  'scribble'(name, duration = '500ms') {
    return {
      pathLength: true,
      pathClasses: [],
      keyframes: `
        @keyframes lmn-${name} {
          0% { stroke-dashoffset: 1; opacity: 0; transform: rotate(-8deg); }
          100% { stroke-dashoffset: 0; opacity: 1; transform: rotate(0deg); }
        }
      `,
      base: '',
      animate: `
        .lmn-animate svg path {
          stroke-dasharray: 1;
          stroke-dashoffset: 0;
          animation: lmn-${name} ${duration} ease both;
        }
      `,
    };
  },

  'glow'(name, duration = '700ms') {
    return {
      pathLength: false,
      pathClasses: [],
      keyframes: `
        @keyframes lmn-${name} {
          0%, 100% { transform: scale(1); opacity: 1; }
          25% { transform: scale(1.12); opacity: 0.9; }
          50% { transform: scale(1.05); opacity: 1; }
          75% { transform: scale(1.1); opacity: 0.95; }
        }
      `,
      base: '',
      animate: `
        .lmn-animate svg {
          animation: lmn-${name} ${duration} ease-in-out both;
        }
      `,
    };
  },

  'shutter'(name, duration = '450ms') {
    return {
      pathLength: false,
      pathClasses: [],
      keyframes: `
        @keyframes lmn-${name} {
          0% { transform: scale(1); opacity: 1; }
          40% { transform: scale(0.82); opacity: 0.6; }
          100% { transform: scale(1); opacity: 1; }
        }
      `,
      base: '',
      animate: `
        .lmn-animate svg {
          animation: lmn-${name} ${duration} ease both;
        }
      `,
    };
  },

  'play-morph'(name, duration = '400ms') {
    return {
      pathLength: false,
      pathClasses: [],
      keyframes: `
        @keyframes lmn-${name} {
          0% { transform: scale(1); }
          50% { transform: scale(0.85); }
          100% { transform: scale(1); }
        }
      `,
      base: '',
      animate: `
        .lmn-animate svg {
          animation: lmn-${name} ${duration} ease both;
        }
      `,
    };
  },

  'phone-vibrate'(name, duration = '450ms') {
    return {
      pathLength: false,
      pathClasses: [],
      keyframes: `
        @keyframes lmn-${name} {
          0%, 100% { transform: translateX(0); }
          15% { transform: translateX(-2px) rotate(-2deg); }
          30% { transform: translateX(2px) rotate(2deg); }
          45% { transform: translateX(-2px) rotate(-2deg); }
          60% { transform: translateX(2px) rotate(2deg); }
          75% { transform: translateX(-1px) rotate(-1deg); }
        }
      `,
      base: '',
      animate: `
        .lmn-animate svg {
          animation: lmn-${name} ${duration} ease-in-out both;
        }
      `,
    };
  },

  'open-envelope'(name, duration = '500ms') {
    return {
      pathLength: false,
      pathClasses: ['lmn-path-1', 'lmn-path-2'],
      keyframes: `
        @keyframes lmn-${name}-flap {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px) rotateX(25deg); }
        }
        @keyframes lmn-${name}-body {
          0%, 100% { transform: scaleY(1); }
          50% { transform: scaleY(1.04); }
        }
      `,
      base: `
        .lmn-animate svg .lmn-path-1,
        .lmn-animate svg .lmn-path-2 {
          transform-origin: top center;
        }
      `,
      animate: `
        .lmn-animate svg .lmn-path-1 { animation: lmn-${name}-flap ${duration} ease both; }
        .lmn-animate svg .lmn-path-2 { animation: lmn-${name}-body ${duration} ease both; }
      `,
    };
  },

  'send-plane'(name, duration = '550ms') {
    return {
      pathLength: false,
      pathClasses: [],
      keyframes: `
        @keyframes lmn-${name} {
          0% { transform: translate(0, 0) rotate(0deg); opacity: 1; }
          40% { transform: translate(10px, -10px) rotate(-8deg); opacity: 0.75; }
          100% { transform: translate(0, 0) rotate(0deg); opacity: 1; }
        }
      `,
      base: '',
      animate: `
        .lmn-animate svg {
          animation: lmn-${name} ${duration} ease both;
        }
      `,
    };
  },

  'folder-pop'(name, duration = '450ms') {
    return {
      pathLength: false,
      pathClasses: [],
      keyframes: `
        @keyframes lmn-${name} {
          0%, 100% { transform: translateY(0) scale(1); }
          40% { transform: translateY(-6px) scale(1.05); }
          70% { transform: translateY(2px) scale(0.98); }
        }
      `,
      base: '',
      animate: `
        .lmn-animate svg {
          animation: lmn-${name} ${duration} ease both;
        }
      `,
    };
  },

  'file-appear'(name, duration = '500ms') {
    return {
      pathLength: false,
      pathClasses: [],
      keyframes: `
        @keyframes lmn-${name} {
          0% { opacity: 0; transform: translateY(6px) scale(0.96); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
      `,
      base: '',
      animate: `
        .lmn-animate svg {
          animation: lmn-${name} ${duration} ease both;
        }
      `,
    };
  },

  'document-draw'(name, duration = '620ms') {
    return {
      pathLength: true,
      pathClasses: [],
      keyframes: `
        @keyframes lmn-${name}-outline {
          0% { stroke-dashoffset: 1; opacity: 0; }
          18% { opacity: 1; }
          100% { stroke-dashoffset: 0; opacity: 1; }
        }
        @keyframes lmn-${name}-filled {
          0% { transform: translateY(3px) scale(0.94); opacity: 0.35; }
          72%, 100% { transform: translateY(0) scale(1); opacity: 1; }
        }
      `,
      base: '',
      animate: `
        .lmn-animate--outline svg path {
          stroke-dasharray: 1;
          stroke-dashoffset: 0;
          animation: lmn-${name}-outline ${duration} cubic-bezier(0.22, 0.8, 0.32, 1) both;
        }
        .lmn-animate--filled svg {
          animation: lmn-${name}-filled ${duration} cubic-bezier(0.22, 0.8, 0.32, 1) both;
        }
      `,
    };
  },

  'plus-draw'(name, duration = '480ms') {
    return {
      pathLength: true,
      pathClasses: ['lmn-path-1', 'lmn-path-2', 'lmn-path-3'],
      splitPaths: true,
      keyframes: `
        @keyframes lmn-${name}-draw {
          0% { stroke-dashoffset: 1; opacity: 0; }
          16% { opacity: 1; }
          100% { stroke-dashoffset: 0; opacity: 1; }
        }
        @keyframes lmn-${name}-solid {
          0% { transform: scale(0.72); opacity: 0.2; }
          70%, 100% { transform: scale(1); opacity: 1; }
        }
      `,
      base: '',
      animate: `
        .lmn-animate--outline svg .lmn-path-1,
        .lmn-animate--outline svg .lmn-path-2,
        .lmn-animate--outline svg .lmn-path-3 {
          stroke-dasharray: 1;
          stroke-dashoffset: 0;
          animation: lmn-${name}-draw ${duration} cubic-bezier(0.22, 0.8, 0.32, 1) both;
        }
        .lmn-animate--outline svg .lmn-path-1 { animation-delay: 60ms; }
        .lmn-animate--outline svg .lmn-path-2 { animation-delay: 150ms; }
        .lmn-animate--outline svg .lmn-path-3 { animation-delay: 0ms; }
        .lmn-animate--filled svg {
          animation: lmn-${name}-solid ${duration} cubic-bezier(0.22, 0.8, 0.32, 1) both;
        }
      `,
    };
  },

  'battery-charge'(name, duration = '720ms', chargePathIndex = 0) {
    const frameSelectors = [2, 3]
      .filter((index) => index !== chargePathIndex)
      .map((index) => `.lmn-animate--outline svg .lmn-path-${index}`)
      .join(',\n        ');
    const chargeSelector = chargePathIndex
      ? `.lmn-animate--outline svg .lmn-path-${chargePathIndex}`
      : '';
    const chargeBlock = chargeSelector ? `${chargeSelector} {
          animation: lmn-${name}-charge ${duration} cubic-bezier(0.22, 0.8, 0.32, 1) both;
        }` : '';
    return {
      pathLength: true,
      pathClasses: ['lmn-path-1', 'lmn-path-2', 'lmn-path-3'],
      splitPaths: true,
      keyframes: `
        @keyframes lmn-${name}-frame {
          0% { stroke-dashoffset: 1; opacity: 0; }
          26% { opacity: 1; }
          100% { stroke-dashoffset: 0; opacity: 1; }
        }
        @keyframes lmn-${name}-terminal {
          0%, 26% { opacity: 0; transform: scaleX(0.35); }
          52%, 100% { opacity: 1; transform: scaleX(1); }
        }
        @keyframes lmn-${name}-charge {
          0%, 38% { transform: scaleX(0); opacity: 0; }
          78%, 100% { transform: scaleX(1); opacity: 1; }
        }
        @keyframes lmn-${name}-filled {
          0% { transform: scaleX(0.9); opacity: 0.35; }
          74% { transform: scaleX(1.015); opacity: 1; }
          100% { transform: scaleX(1); opacity: 1; }
        }
      `,
      base: `
        .lmn-animate svg .lmn-path-1,
        .lmn-animate svg .lmn-path-2,
        .lmn-animate svg .lmn-path-3 {
          transform-origin: left center;
        }
      `,
      animate: [
        `${frameSelectors} {
          stroke-dasharray: 1;
          stroke-dashoffset: 0;
          animation: lmn-${name}-frame ${duration} cubic-bezier(0.22, 0.8, 0.32, 1) both;
        }`,
        `.lmn-animate--outline svg .lmn-path-1 {
          animation: lmn-${name}-terminal ${duration} cubic-bezier(0.22, 0.8, 0.32, 1) both;
        }`,
        chargeBlock,
        `.lmn-animate--filled svg {
          transform-origin: left center;
          animation: lmn-${name}-filled ${duration} cubic-bezier(0.22, 0.8, 0.32, 1) both;
        }`,
      ].filter(Boolean).join('\n        '),
    };
  },

  'scale-settle'(name, duration = '680ms') {
    return {
      pathLength: false,
      pathClasses: [],
      keyframes: `
        @keyframes lmn-${name} {
          0% { transform: rotate(-5deg); }
          42% { transform: rotate(3deg); }
          72% { transform: rotate(-1deg); }
          100% { transform: rotate(0deg); }
        }
      `,
      base: `
        .lmn-animate svg { transform-origin: center top; }
      `,
      animate: `
        .lmn-animate svg {
          animation: lmn-${name} ${duration} cubic-bezier(0.22, 0.8, 0.32, 1) both;
        }
      `,
    };
  },

  'scissors-snip'(name, duration = '560ms') {
    return {
      pathLength: false,
      pathClasses: [],
      keyframes: `
        @keyframes lmn-${name} {
          0% { transform: translateX(-1px) rotate(-5deg) scale(0.96); }
          48% { transform: translateX(1px) rotate(3deg) scale(1.035); }
          72% { transform: translateX(0) rotate(-1deg) scale(0.99); }
          100% { transform: translateX(0) rotate(0) scale(1); }
        }
      `,
      base: '',
      animate: `
        .lmn-animate svg {
          animation: lmn-${name} ${duration} cubic-bezier(0.22, 0.8, 0.32, 1) both;
        }
      `,
    };
  },

  'clip-flex'(name, duration = '600ms') {
    return {
      pathLength: false,
      pathClasses: [],
      keyframes: `
        @keyframes lmn-${name} {
          0% { transform: translate(-2px, 2px) rotate(-8deg) scale(0.94); opacity: 0.5; }
          60% { transform: translate(0.5px, -0.5px) rotate(2deg) scale(1.02); opacity: 1; }
          100% { transform: translate(0, 0) rotate(0) scale(1); opacity: 1; }
        }
      `,
      base: '',
      animate: `
        .lmn-animate svg {
          animation: lmn-${name} ${duration} cubic-bezier(0.22, 0.8, 0.32, 1) both;
        }
      `,
    };
  },

  'puzzle-seat'(name, duration = '620ms') {
    return {
      pathLength: false,
      pathClasses: [],
      keyframes: `
        @keyframes lmn-${name} {
          0% { transform: translate(-3px, -3px) scale(0.88); opacity: 0.35; }
          68% { transform: translate(0, 0) scale(1.035); opacity: 1; }
          84% { transform: translate(0, 0) scale(0.99); opacity: 1; }
          100% { transform: translate(0, 0) scale(1); opacity: 1; }
        }
      `,
      base: '',
      animate: `
        .lmn-animate svg {
          animation: lmn-${name} ${duration} cubic-bezier(0.22, 0.8, 0.32, 1) both;
        }
      `,
    };
  },

  'bookmark-fold'(name, duration = '450ms') {
    return {
      pathLength: false,
      pathClasses: [],
      keyframes: `
        @keyframes lmn-${name} {
          0%, 100% { transform: scaleY(1); }
          50% { transform: scaleY(0.85) skewX(-3deg); }
        }
      `,
      base: `
        .lmn-animate svg {
          transform-origin: top center;
        }
      `,
      animate: `
        .lmn-animate svg {
          animation: lmn-${name} ${duration} ease both;
        }
      `,
    };
  },

  'trash-lid'(name, duration = '450ms') {
    return {
      pathLength: false,
      pathClasses: ['lmn-path-1', 'lmn-path-2'],
      keyframes: `
        @keyframes lmn-${name}-lid {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-5px) rotate(-12deg); }
        }
        @keyframes lmn-${name}-body {
          0%, 100% { transform: scaleY(1); }
          50% { transform: scaleY(1.03); }
        }
      `,
      base: `
        .lmn-animate svg .lmn-path-1 {
          transform-origin: left center;
        }
      `,
      animate: `
        .lmn-animate svg .lmn-path-1 { animation: lmn-${name}-lid ${duration} ease both; }
        .lmn-animate svg .lmn-path-2 { animation: lmn-${name}-body ${duration} ease both; }
      `,
    };
  },

  'unlock'(name, duration = '500ms') {
    return {
      pathLength: false,
      pathClasses: ['lmn-path-1', 'lmn-path-2'],
      keyframes: `
        @keyframes lmn-${name}-shackle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px) rotate(-8deg); }
        }
        @keyframes lmn-${name}-body {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
      `,
      base: `
        .lmn-animate svg .lmn-path-1 {
          transform-origin: bottom center;
        }
      `,
      animate: `
        .lmn-animate svg .lmn-path-1 { animation: lmn-${name}-shackle ${duration} ease both; }
        .lmn-animate svg .lmn-path-2 { animation: lmn-${name}-body ${duration} ease both; }
      `,
    };
  },

  'lock-click'(name, duration = '400ms') {
    return {
      pathLength: false,
      pathClasses: [],
      keyframes: `
        @keyframes lmn-${name} {
          0%, 100% { transform: scale(1); }
          40% { transform: scale(1.08); }
          60% { transform: scale(0.96); }
        }
      `,
      base: '',
      animate: `
        .lmn-animate svg {
          animation: lmn-${name} ${duration} ease both;
        }
      `,
    };
  },

  'rocket-launch'(name, duration = '700ms') {
    return {
      pathLength: false,
      pathClasses: [],
      keyframes: `
        @keyframes lmn-${name} {
          0% { transform: translateY(0) scale(1); }
          30% { transform: translateY(-4px) scale(1.05); }
          60% { transform: translateY(-10px) scale(0.95); opacity: 1; }
          100% { transform: translateY(-16px) scale(0.85); opacity: 0.6; }
        }
      `,
      base: '',
      animate: `
        .lmn-animate svg {
          animation: lmn-${name} ${duration} ease both;
        }
      `,
    };
  },

  'cart-roll'(name, duration = '550ms') {
    return {
      pathLength: false,
      pathClasses: [],
      keyframes: `
        @keyframes lmn-${name} {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-4px); }
          75% { transform: translateX(4px); }
        }
      `,
      base: '',
      animate: `
        .lmn-animate svg {
          animation: lmn-${name} ${duration} ease-in-out both;
        }
      `,
    };
  },

  'truck-move'(name, duration = '600ms') {
    return {
      pathLength: false,
      pathClasses: [],
      keyframes: `
        @keyframes lmn-${name} {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(6px); }
        }
      `,
      base: '',
      animate: `
        .lmn-animate svg {
          animation: lmn-${name} ${duration} ease-in-out both;
        }
      `,
    };
  },

  'credit-card-swipe'(name, duration = '500ms') {
    return {
      pathLength: false,
      pathClasses: [],
      keyframes: `
        @keyframes lmn-${name} {
          0%, 100% { transform: translateX(0); }
          40% { transform: translateX(-6px) rotate(-3deg); }
          60% { transform: translateX(6px) rotate(3deg); }
        }
      `,
      base: '',
      animate: `
        .lmn-animate svg {
          animation: lmn-${name} ${duration} ease both;
        }
      `,
    };
  },

  'banknote-flutter'(name, duration = '600ms') {
    return {
      pathLength: false,
      pathClasses: [],
      keyframes: `
        @keyframes lmn-${name} {
          0%, 100% { transform: rotateY(0deg) rotate(0deg); }
          25% { transform: rotateY(25deg) rotate(-2deg); }
          75% { transform: rotateY(-25deg) rotate(2deg); }
        }
      `,
      base: '',
      animate: `
        .lmn-animate svg {
          animation: lmn-${name} ${duration} ease-in-out both;
        }
      `,
    };
  },

  'globe-spin'(name, duration = '900ms') {
    return {
      pathLength: false,
      pathClasses: [],
      keyframes: `
        @keyframes lmn-${name} {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(25deg); }
        }
      `,
      base: '',
      animate: `
        .lmn-animate svg {
          animation: lmn-${name} ${duration} ease both;
        }
      `,
    };
  },

  'flag-wave'(name, duration = '600ms') {
    return {
      pathLength: false,
      pathClasses: [],
      keyframes: `
        @keyframes lmn-${name} {
          0%, 100% { transform: skewX(0deg); }
          25% { transform: skewX(-4deg); }
          75% { transform: skewX(4deg); }
        }
      `,
      base: `
        .lmn-animate svg {
          transform-origin: left center;
        }
      `,
      animate: `
        .lmn-animate svg {
          animation: lmn-${name} ${duration} ease-in-out both;
        }
      `,
    };
  },

  'pin-drop'(name, duration = '500ms') {
    return {
      pathLength: false,
      pathClasses: [],
      keyframes: `
        @keyframes lmn-${name} {
          0% { transform: translateY(-10px) scale(0.8); opacity: 0; }
          50% { transform: translateY(2px) scale(1.05); opacity: 1; }
          100% { transform: translateY(0) scale(1); opacity: 1; }
        }
      `,
      base: '',
      animate: `
        .lmn-animate svg {
          animation: lmn-${name} ${duration} ease both;
        }
      `,
    };
  },

  'clock-tick'(name, duration = '600ms') {
    return {
      pathLength: false,
      pathClasses: ['lmn-path-1', 'lmn-path-2'],
      keyframes: `
        @keyframes lmn-${name}-hour {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(25deg); }
        }
        @keyframes lmn-${name}-minute {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(90deg); }
        }
      `,
      base: `
        .lmn-animate svg .lmn-path-1,
        .lmn-animate svg .lmn-path-2 {
          transform-origin: center;
        }
      `,
      animate: `
        .lmn-animate svg .lmn-path-1 { animation: lmn-${name}-hour ${duration} ease both; }
        .lmn-animate svg .lmn-path-2 { animation: lmn-${name}-minute ${duration} ease both; }
      `,
    };
  },

  'calendar-flip'(name, duration = '500ms') {
    return {
      pathLength: false,
      pathClasses: [],
      keyframes: `
        @keyframes lmn-${name} {
          0%, 100% { transform: rotateX(0deg); }
          50% { transform: rotateX(-25deg); }
        }
      `,
      base: `
        .lmn-animate svg {
          transform-origin: top center;
        }
      `,
      animate: `
        .lmn-animate svg {
          animation: lmn-${name} ${duration} ease both;
        }
      `,
    };
  },

  'ticket-tear'(name, duration = '500ms') {
    return {
      pathLength: false,
      pathClasses: [],
      keyframes: `
        @keyframes lmn-${name} {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-6deg); }
          75% { transform: rotate(6deg); }
        }
      `,
      base: '',
      animate: `
        .lmn-animate svg {
          animation: lmn-${name} ${duration} ease-in-out both;
        }
      `,
    };
  },

  'gift-unbox'(name, duration = '550ms') {
    return {
      pathLength: false,
      pathClasses: ['lmn-path-1', 'lmn-path-2'],
      keyframes: `
        @keyframes lmn-${name}-lid {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px) rotate(-3deg); }
        }
        @keyframes lmn-${name}-box {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.04); }
        }
      `,
      base: `
        .lmn-animate svg .lmn-path-1 {
          transform-origin: bottom center;
        }
      `,
      animate: `
        .lmn-animate svg .lmn-path-1 { animation: lmn-${name}-lid ${duration} ease both; }
        .lmn-animate svg .lmn-path-2 { animation: lmn-${name}-box ${duration} ease both; }
      `,
    };
  },

  'trophy-shine'(name, duration = '600ms') {
    return {
      pathLength: false,
      pathClasses: [],
      keyframes: `
        @keyframes lmn-${name} {
          0%, 100% { transform: scale(1); opacity: 1; }
          40% { transform: scale(1.1); opacity: 0.9; }
          60% { transform: scale(1.05); opacity: 1; }
        }
      `,
      base: '',
      animate: `
        .lmn-animate svg {
          animation: lmn-${name} ${duration} ease both;
        }
      `,
    };
  },

  'music-beat'(name, duration = '500ms') {
    return {
      pathLength: false,
      pathClasses: [],
      keyframes: `
        @keyframes lmn-${name} {
          0%, 100% { transform: scale(1); }
          25% { transform: scale(1.12); }
          50% { transform: scale(0.96); }
          75% { transform: scale(1.06); }
        }
      `,
      base: '',
      animate: `
        .lmn-animate svg {
          animation: lmn-${name} ${duration} ease both;
        }
      `,
    };
  },

  'film-roll'(name, duration = '700ms') {
    return {
      pathLength: false,
      pathClasses: [],
      keyframes: `
        @keyframes lmn-${name} {
          0% { transform: translateX(0); }
          100% { transform: translateX(-4px); }
        }
      `,
      base: '',
      animate: `
        .lmn-animate svg {
          animation: lmn-${name} ${duration} ease both;
        }
      `,
    };
  },

  'microphone-pulse'(name, duration = '500ms') {
    return {
      pathLength: false,
      pathClasses: [],
      keyframes: `
        @keyframes lmn-${name} {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.1); opacity: 0.8; }
        }
      `,
      base: '',
      animate: `
        .lmn-animate svg {
          animation: lmn-${name} ${duration} ease both;
        }
      `,
    };
  },

  'book-open'(name, duration = '550ms') {
    return {
      pathLength: false,
      pathClasses: ['lmn-path-1', 'lmn-path-2'],
      keyframes: `
        @keyframes lmn-${name}-page {
          0%, 100% { transform: rotateY(0deg); }
          50% { transform: rotateY(-35deg); }
        }
      `,
      base: `
        .lmn-animate svg .lmn-path-1,
        .lmn-animate svg .lmn-path-2 {
          transform-origin: left center;
        }
      `,
      animate: `
        .lmn-animate svg .lmn-path-1 { animation: lmn-${name}-page ${duration} ease both; }
        .lmn-animate svg .lmn-path-2 { animation: lmn-${name}-page ${duration} ease both 80ms; }
      `,
    };
  },

  'home-bounce'(name, duration = '500ms') {
    return {
      pathLength: false,
      pathClasses: [],
      keyframes: `
        @keyframes lmn-${name} {
          0%, 100% { transform: translateY(0) scale(1); }
          40% { transform: translateY(-6px) scale(1.05); }
          70% { transform: translateY(2px) scale(0.98); }
        }
      `,
      base: `
        .lmn-animate svg {
          transform-origin: bottom center;
        }
      `,
      animate: `
        .lmn-animate svg {
          animation: lmn-${name} ${duration} ease both;
        }
      `,
    };
  },

  'arrow-bounce'(name, duration = '500ms', distance = '6px') {
    return {
      pathLength: false,
      pathClasses: [],
      keyframes: `
        @keyframes lmn-${name} {
          0%, 100% { transform: translate(0, 0); }
          35% { transform: translate(${distance}); }
          65% { transform: translate(calc(${distance} * -0.25)); }
        }
      `,
      base: '',
      animate: `
        .lmn-animate svg {
          animation: lmn-${name} ${duration} ease both;
        }
      `,
    };
  },

  'upload-arrow'(name, duration = '550ms') {
    return {
      pathLength: false,
      pathClasses: [],
      keyframes: `
        @keyframes lmn-${name} {
          0%, 100% { transform: translateY(0); opacity: 1; }
          40% { transform: translateY(-7px); opacity: 0.75; }
          60% { transform: translateY(2px); opacity: 1; }
        }
      `,
      base: '',
      animate: `
        .lmn-animate svg {
          animation: lmn-${name} ${duration} ease both;
        }
      `,
    };
  },

  'download-arrow'(name, duration = '550ms') {
    return {
      pathLength: false,
      pathClasses: [],
      keyframes: `
        @keyframes lmn-${name} {
          0%, 100% { transform: translateY(0); opacity: 1; }
          40% { transform: translateY(7px); opacity: 0.75; }
          60% { transform: translateY(-2px); opacity: 1; }
        }
      `,
      base: '',
      animate: `
        .lmn-animate svg {
          animation: lmn-${name} ${duration} ease both;
        }
      `,
    };
  },

  'zoom'(name, duration = '500ms') {
    return {
      pathLength: false,
      pathClasses: [],
      keyframes: `
        @keyframes lmn-${name} {
          0%, 100% { transform: scale(1) rotate(0deg); }
          40% { transform: scale(1.15) rotate(-8deg); }
          70% { transform: scale(1.08) rotate(4deg); }
        }
      `,
      base: '',
      animate: `
        .lmn-animate svg {
          animation: lmn-${name} ${duration} ease both;
        }
      `,
    };
  },

  'scan'(name, duration = '700ms') {
    return {
      pathLength: false,
      pathClasses: [],
      keyframes: `
        @keyframes lmn-${name} {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.55; }
        }
      `,
      base: '',
      animate: `
        .lmn-animate svg {
          animation: lmn-${name} ${duration} ease-in-out both;
        }
      `,
    };
  },

  'ellipsis-pulse'(name, duration = '600ms') {
    return {
      pathLength: false,
      pathClasses: ['lmn-path-1', 'lmn-path-2', 'lmn-path-3'],
      keyframes: `
        @keyframes lmn-${name}-dot {
          0%, 100% { opacity: 1; transform: translateY(0); }
          50% { opacity: 0.5; transform: translateY(-3px); }
        }
      `,
      base: '',
      animate: `
        .lmn-animate svg .lmn-path-1 { animation: lmn-${name}-dot ${duration} ease both; }
        .lmn-animate svg .lmn-path-2 { animation: lmn-${name}-dot ${duration} ease both 100ms; }
        .lmn-animate svg .lmn-path-3 { animation: lmn-${name}-dot ${duration} ease both 200ms; }
      `,
    };
  },

  'no-shake'(name, duration = '450ms') {
    return {
      pathLength: false,
      pathClasses: [],
      keyframes: `
        @keyframes lmn-${name} {
          0%, 100% { transform: rotate(0deg); }
          20% { transform: rotate(-8deg); }
          40% { transform: rotate(8deg); }
          60% { transform: rotate(-4deg); }
          80% { transform: rotate(4deg); }
        }
      `,
      base: '',
      animate: `
        .lmn-animate svg {
          animation: lmn-${name} ${duration} ease-in-out both;
        }
      `,
    };
  },

  'thumbs-up'(name, duration = '500ms') {
    return {
      pathLength: false,
      pathClasses: [],
      keyframes: `
        @keyframes lmn-${name} {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-16deg); }
          50% { transform: rotate(8deg); }
          75% { transform: rotate(-4deg); }
        }
      `,
      base: `
        .lmn-animate svg {
          transform-origin: bottom left;
        }
      `,
      animate: `
        .lmn-animate svg {
          animation: lmn-${name} ${duration} ease both;
        }
      `,
    };
  },

  'thumbs-down'(name, duration = '500ms') {
    return {
      pathLength: false,
      pathClasses: [],
      keyframes: `
        @keyframes lmn-${name} {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(16deg); }
          50% { transform: rotate(-8deg); }
          75% { transform: rotate(4deg); }
        }
      `,
      base: `
        .lmn-animate svg {
          transform-origin: top left;
        }
      `,
      animate: `
        .lmn-animate svg {
          animation: lmn-${name} ${duration} ease both;
        }
      `,
    };
  },

  // --- Semantic recipes (Phase 1: pulse-scale purge) ---

  'blink'(name, duration = '450ms') {
    return {
      pathLength: false,
      pathClasses: [],
      keyframes: `
        @keyframes lmn-${name} {
          0%, 100% { transform: scaleY(1); }
          50% { transform: scaleY(0.1); }
        }
      `,
      base: `
        .lmn-animate svg {
          transform-origin: center;
        }
      `,
      animate: `
        .lmn-animate svg {
          animation: lmn-${name} ${duration} ease-in-out both;
        }
      `,
    };
  },

  'drip'(name, duration = '500ms') {
    return {
      pathLength: false,
      pathClasses: [],
      keyframes: `
        @keyframes lmn-${name} {
          0%, 100% { transform: translateY(0); opacity: 1; }
          40% { transform: translateY(3px); opacity: 0.55; }
        }
      `,
      base: '',
      animate: `
        .lmn-animate svg {
          animation: lmn-${name} ${duration} ease both;
        }
      `,
    };
  },

  'sound-waves'(name, duration = '500ms') {
    return {
      pathLength: false,
      pathClasses: [],
      keyframes: `
        @keyframes lmn-${name} {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.12); opacity: 0.7; }
        }
      `,
      base: `
        .lmn-animate svg {
          transform-origin: left center;
        }
      `,
      animate: `
        .lmn-animate svg {
          animation: lmn-${name} ${duration} ease both;
        }
      `,
    };
  },

  'mute-fade'(name, duration = '400ms') {
    return {
      pathLength: false,
      pathClasses: [],
      keyframes: `
        @keyframes lmn-${name} {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
      `,
      base: '',
      animate: `
        .lmn-animate svg {
          animation: lmn-${name} ${duration} ease both;
        }
      `,
    };
  },

  'slider-pins'(name, duration = '600ms', axis = 'x') {
    const t = (v) => (axis === 'y' ? `translateY(${v})` : `translateX(${v})`);
    // Outline variant is split into 12 subpaths (3 rows × line/knob/knob/line);
    // only the knob subpaths move. The solid artwork also splits into its
    // tracks and three knob circles, avoiding a generic whole-icon nudge.
    return {
      pathLength: false,
      pathClasses: [
        'lmn-path-1', 'lmn-path-2', 'lmn-path-3', 'lmn-path-4',
        'lmn-path-5', 'lmn-path-6', 'lmn-path-7', 'lmn-path-8',
        'lmn-path-9', 'lmn-path-10', 'lmn-path-11', 'lmn-path-12',
      ],
      splitPaths: 'both',
      keyframes: `
        @keyframes lmn-${name}-pin-a {
          0%, 100% { transform: ${t('0')}; }
          50% { transform: ${t('2px')}; }
        }
        @keyframes lmn-${name}-pin-b {
          0%, 100% { transform: ${t('0')}; }
          50% { transform: ${t('-2px')}; }
        }
      `,
      base: '',
      animate: `
        .lmn-animate--outline svg .lmn-path-2,
        .lmn-animate--outline svg .lmn-path-3 { animation: lmn-${name}-pin-a ${duration} ease-in-out both; }
        .lmn-animate--outline svg .lmn-path-6,
        .lmn-animate--outline svg .lmn-path-7 { animation: lmn-${name}-pin-b ${duration} ease-in-out both; }
        .lmn-animate--outline svg .lmn-path-10,
        .lmn-animate--outline svg .lmn-path-11 { animation: lmn-${name}-pin-a ${duration} ease-in-out both 80ms; }
        .lmn-animate--filled svg .lmn-path-7 { animation: lmn-${name}-pin-a ${duration} ease-in-out both; }
        .lmn-animate--filled svg .lmn-path-8 { animation: lmn-${name}-pin-b ${duration} ease-in-out both; }
        .lmn-animate--filled svg .lmn-path-9 { animation: lmn-${name}-pin-a ${duration} ease-in-out both 80ms; }
      `,
    };
  },

  'swap-x'(name, duration = '450ms') {
    return {
      pathLength: false,
      pathClasses: [],
      keyframes: `
        @keyframes lmn-${name} {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(3px); }
          75% { transform: translateX(-3px); }
        }
      `,
      base: '',
      animate: `
        .lmn-animate svg {
          animation: lmn-${name} ${duration} ease-in-out both;
        }
      `,
    };
  },

  'swap-y'(name, duration = '450ms') {
    return {
      pathLength: false,
      pathClasses: [],
      keyframes: `
        @keyframes lmn-${name} {
          0%, 100% { transform: translateY(0); }
          25% { transform: translateY(3px); }
          75% { transform: translateY(-3px); }
        }
      `,
      base: '',
      animate: `
        .lmn-animate svg {
          animation: lmn-${name} ${duration} ease-in-out both;
        }
      `,
    };
  },

  'converge'(name, duration = '450ms') {
    return {
      pathLength: false,
      pathClasses: [],
      keyframes: `
        @keyframes lmn-${name} {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(0.8); }
        }
      `,
      base: `
        .lmn-animate svg {
          transform-origin: center;
        }
      `,
      animate: `
        .lmn-animate svg {
          animation: lmn-${name} ${duration} ease-in-out both;
        }
      `,
    };
  },

  'diverge'(name, duration = '450ms') {
    return {
      pathLength: false,
      pathClasses: [],
      keyframes: `
        @keyframes lmn-${name} {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.2); }
        }
      `,
      base: `
        .lmn-animate svg {
          transform-origin: center;
        }
      `,
      animate: `
        .lmn-animate svg {
          animation: lmn-${name} ${duration} ease-in-out both;
        }
      `,
    };
  },

  'chevron-cascade'(name, duration = '450ms', axis = 'y', distance = '-3px') {
    const t = (v) => (axis === 'x' ? `translateX(${v})` : `translateY(${v})`);
    return {
      pathLength: false,
      pathClasses: ['lmn-path-1', 'lmn-path-2'],
      keyframes: `
        @keyframes lmn-${name}-slide {
          0%, 100% { transform: ${t('0')}; }
          50% { transform: ${t(distance)}; }
        }
      `,
      base: '',
      animate: `
        .lmn-animate svg .lmn-path-1 { animation: lmn-${name}-slide ${duration} ease both; }
        .lmn-animate svg .lmn-path-2 { animation: lmn-${name}-slide ${duration} ease both 90ms; }
      `,
    };
  },

  'trend-draw'(name, duration = '600ms') {
    return {
      pathLength: true,
      pathClasses: [],
      keyframes: `
        @keyframes lmn-${name} {
          0% { stroke-dashoffset: 1; opacity: 0.4; }
          100% { stroke-dashoffset: 0; opacity: 1; }
        }
      `,
      base: '',
      animate: `
        .lmn-animate svg path {
          stroke-dasharray: 1;
          stroke-dashoffset: 0;
          animation: lmn-${name} ${duration} ease-out both;
        }
      `,
    };
  },

  'door-enter'(name, duration = '450ms', offset = '-4px') {
    return {
      pathLength: false,
      pathClasses: [],
      keyframes: `
        @keyframes lmn-${name} {
          0% { transform: translateX(${offset}); opacity: 0; }
          100% { transform: translateX(0); opacity: 1; }
        }
      `,
      base: '',
      animate: `
        .lmn-animate svg {
          animation: lmn-${name} ${duration} ease-out both;
        }
      `,
    };
  },

  'door-exit'(name, duration = '450ms', offset = '4px') {
    return {
      pathLength: false,
      pathClasses: [],
      keyframes: `
        @keyframes lmn-${name} {
          0%, 100% { transform: translateX(0); opacity: 1; }
          50% { transform: translateX(${offset}); opacity: 0.4; }
        }
      `,
      base: '',
      animate: `
        .lmn-animate svg {
          animation: lmn-${name} ${duration} ease-in-out both;
        }
      `,
    };
  },

  'stack-rise'(name, duration = '500ms') {
    return {
      pathLength: false,
      pathClasses: [],
      keyframes: `
        @keyframes lmn-${name} {
          0% { transform: scaleY(0); opacity: 0; }
          100% { transform: scaleY(1); opacity: 1; }
        }
      `,
      base: `
        .lmn-animate svg {
          transform-origin: bottom center;
        }
      `,
      animate: `
        .lmn-animate svg {
          animation: lmn-${name} ${duration} ease-out both;
        }
      `,
    };
  },

  'cell-pop'(name, duration = '400ms') {
    return {
      pathLength: false,
      pathClasses: ['lmn-path-1', 'lmn-path-2', 'lmn-path-3', 'lmn-path-4'],
      keyframes: `
        @keyframes lmn-${name}-cell {
          0% { transform: scale(0.5); opacity: 0; }
          70% { transform: scale(1.08); }
          100% { transform: scale(1); opacity: 1; }
        }
      `,
      base: '',
      animate: `
        .lmn-animate svg .lmn-path-1 { animation: lmn-${name}-cell ${duration} ease both; }
        .lmn-animate svg .lmn-path-2 { animation: lmn-${name}-cell ${duration} ease both 60ms; }
        .lmn-animate svg .lmn-path-3 { animation: lmn-${name}-cell ${duration} ease both 120ms; }
        .lmn-animate svg .lmn-path-4 { animation: lmn-${name}-cell ${duration} ease both 180ms; }
      `,
    };
  },

  'screen-on'(name, duration = '450ms') {
    return {
      pathLength: false,
      pathClasses: [],
      keyframes: `
        @keyframes lmn-${name} {
          0% { transform: scaleY(0.2); opacity: 0; }
          60% { transform: scaleY(1.02); opacity: 1; }
          100% { transform: scaleY(1); opacity: 1; }
        }
      `,
      base: `
        .lmn-animate svg {
          transform-origin: center;
        }
      `,
      animate: `
        .lmn-animate svg {
          animation: lmn-${name} ${duration} ease-out both;
        }
      `,
    };
  },

  'core-pulse'(name, duration = '500ms') {
    return {
      pathLength: false,
      pathClasses: [],
      keyframes: `
        @keyframes lmn-${name} {
          0%, 100% { transform: scale(1); }
          20% { transform: scale(1.08); }
          40% { transform: scale(0.97); }
          60% { transform: scale(1.05); }
          80% { transform: scale(1); }
        }
      `,
      base: `
        .lmn-animate svg {
          transform-origin: center;
        }
      `,
      animate: `
        .lmn-animate svg {
          animation: lmn-${name} ${duration} ease-in-out both;
        }
      `,
    };
  },

  'bubble-pop'(name, duration = '450ms', origin = 'bottom left') {
    return {
      pathLength: false,
      pathClasses: [],
      keyframes: `
        @keyframes lmn-${name} {
          0% { transform: scale(0.6); opacity: 0; }
          70% { transform: scale(1.08); }
          100% { transform: scale(1); opacity: 1; }
        }
      `,
      base: `
        .lmn-animate svg {
          transform-origin: ${origin};
        }
      `,
      animate: `
        .lmn-animate svg {
          animation: lmn-${name} ${duration} ease both;
        }
      `,
    };
  },

  'shout'(name, duration = '500ms') {
    return {
      pathLength: false,
      pathClasses: [],
      keyframes: `
        @keyframes lmn-${name} {
          0%, 100% { transform: rotate(0deg) scale(1); }
          30% { transform: rotate(-4deg) scale(1.1); }
          60% { transform: rotate(2deg) scale(1.05); }
        }
      `,
      base: `
        .lmn-animate svg {
          transform-origin: left center;
        }
      `,
      animate: `
        .lmn-animate svg {
          animation: lmn-${name} ${duration} ease both;
        }
      `,
    };
  },

  'emit'(name, duration = '600ms') {
    return {
      pathLength: false,
      pathClasses: [],
      keyframes: `
        @keyframes lmn-${name} {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.06); opacity: 0.6; }
        }
      `,
      base: `
        .lmn-animate svg {
          transform-origin: bottom center;
        }
      `,
      animate: `
        .lmn-animate svg {
          animation: lmn-${name} ${duration} ease-in-out both;
        }
      `,
    };
  },

  'cap-toss-fade'(name, duration = '700ms') {
    return {
      pathLength: false,
      pathClasses: [],
      keyframes: `
        @keyframes lmn-${name} {
          0% { transform: translateY(0) rotate(0deg); }
          32% { transform: translateY(-6px) rotate(-11deg); }
          58% { transform: translateY(-7px) rotate(-7deg); }
          82% { transform: translateY(1px) rotate(1deg); }
          100% { transform: translateY(0) rotate(0deg); }
        }
      `,
      base: '',
      animate: `
        .lmn-animate svg {
          animation: lmn-${name} ${duration} ease-in-out both;
        }
      `,
    };
  },

  'alert-signal'(name, duration = '560ms') {
    return {
      pathLength: true,
      pathClasses: [],
      keyframes: `
        @keyframes lmn-${name}-ring {
          0% { stroke-dashoffset: 1; opacity: 0.25; }
          56% { stroke-dashoffset: 0; opacity: 1; }
          100% { stroke-dashoffset: 0; opacity: 1; }
        }
        @keyframes lmn-${name}-mark {
          0%, 42% { transform: translateY(-1.5px); opacity: 0; }
          68% { transform: translateY(0.5px); opacity: 1; }
          100% { transform: translateY(0); opacity: 1; }
        }
      `,
      base: '',
      animate: `
        .lmn-animate svg circle {
          stroke-dasharray: 1;
          stroke-dashoffset: 0;
          animation: lmn-${name}-ring ${duration} cubic-bezier(0.22, 0.8, 0.32, 1) both;
        }
        .lmn-animate svg line { animation: lmn-${name}-mark ${duration} cubic-bezier(0.22, 0.8, 0.32, 1) both; }
      `,
    };
  },

  'shine'(name, duration = '550ms') {
    return {
      pathLength: false,
      pathClasses: [],
      keyframes: `
        @keyframes lmn-${name} {
          0%, 100% { transform: scale(1); opacity: 1; }
          25% { transform: scale(1.05); opacity: 0.75; }
          50% { transform: scale(1.1); opacity: 1; }
          75% { transform: scale(1.05); opacity: 0.85; }
        }
      `,
      base: '',
      animate: `
        .lmn-animate svg {
          animation: lmn-${name} ${duration} ease-in-out both;
        }
      `,
    };
  },

  'fan'(name, duration = '500ms') {
    return {
      pathLength: false,
      pathClasses: [],
      keyframes: `
        @keyframes lmn-${name} {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(10deg); }
        }
      `,
      base: `
        .lmn-animate svg {
          transform-origin: bottom left;
        }
      `,
      animate: `
        .lmn-animate svg {
          animation: lmn-${name} ${duration} ease-in-out both;
        }
      `,
    };
  },

  'funnel-drain'(name, duration = '500ms') {
    return {
      pathLength: false,
      pathClasses: [],
      keyframes: `
        @keyframes lmn-${name} {
          0%, 100% { transform: translateY(0) scaleY(1); }
          50% { transform: translateY(2px) scaleY(0.92); }
        }
      `,
      base: `
        .lmn-animate svg {
          transform-origin: top center;
        }
      `,
      animate: `
        .lmn-animate svg {
          animation: lmn-${name} ${duration} ease-in-out both;
        }
      `,
    };
  },

  'package-pop'(name, duration = '500ms') {
    return {
      pathLength: false,
      pathClasses: [],
      keyframes: `
        @keyframes lmn-${name} {
          0% { transform: translateY(-4px); opacity: 0.7; }
          60% { transform: translateY(1px); opacity: 1; }
          100% { transform: translateY(0); opacity: 1; }
        }
      `,
      base: `
        .lmn-animate svg {
          transform-origin: bottom center;
        }
      `,
      animate: `
        .lmn-animate svg {
          animation: lmn-${name} ${duration} ease both;
        }
      `,
    };
  },

  'grin'(name, duration = '450ms', energy = 1) {
    const peak = 1 + 0.12 * energy;
    return {
      pathLength: false,
      pathClasses: [],
      keyframes: `
        @keyframes lmn-${name} {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(${peak.toFixed(3)}); }
        }
      `,
      base: `
        .lmn-animate svg {
          transform-origin: center;
        }
      `,
      animate: `
        .lmn-animate svg {
          animation: lmn-${name} ${duration} ease both;
        }
      `,
    };
  },

  'frame-flip'(name, duration = '600ms') {
    return {
      pathLength: false,
      pathClasses: [],
      keyframes: `
        @keyframes lmn-${name} {
          0%, 24% { opacity: 1; }
          25%, 49% { opacity: 0.5; }
          50%, 74% { opacity: 1; }
          75%, 99% { opacity: 0.5; }
          100% { opacity: 1; }
        }
      `,
      base: '',
      animate: `
        .lmn-animate svg {
          animation: lmn-${name} ${duration} ease both;
        }
      `,
    };
  },

  'translate-flip'(name, duration = '600ms') {
    return {
      pathLength: false,
      pathClasses: [],
      keyframes: `
        @keyframes lmn-${name} {
          0% { transform: rotateY(0deg); }
          100% { transform: rotateY(360deg); }
        }
      `,
      base: '',
      animate: `
        .lmn-animate svg {
          animation: lmn-${name} ${duration} ease-in-out both;
        }
      `,
    };
  },

  'tag-swing'(name, duration = '550ms') {
    return {
      pathLength: false,
      pathClasses: [],
      keyframes: `
        @keyframes lmn-${name} {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-10deg); }
          60% { transform: rotate(6deg); }
        }
      `,
      base: `
        .lmn-animate svg {
          transform-origin: 75% 25%;
        }
      `,
      animate: `
        .lmn-animate svg {
          animation: lmn-${name} ${duration} ease-in-out both;
        }
      `,
    };
  },

  'receipt-print'(name, duration = '500ms') {
    return {
      pathLength: false,
      pathClasses: [],
      keyframes: `
        @keyframes lmn-${name} {
          0% { transform: translateY(-3px); opacity: 0.5; }
          100% { transform: translateY(0); opacity: 1; }
        }
      `,
      base: '',
      animate: `
        .lmn-animate svg {
          animation: lmn-${name} ${duration} ease-out both;
        }
      `,
    };
  },

  'percent-pop'(name, duration = '400ms') {
    return {
      pathLength: false,
      pathClasses: [],
      keyframes: `
        @keyframes lmn-${name} {
          0%, 100% { transform: scale(1); }
          30% { transform: scale(1.12); }
          55% { transform: scale(0.95); }
          80% { transform: scale(1.05); }
        }
      `,
      base: `
        .lmn-animate svg {
          transform-origin: center;
        }
      `,
      animate: `
        .lmn-animate svg {
          animation: lmn-${name} ${duration} ease both;
        }
      `,
    };
  },

  'share-cast'(name, duration = '450ms') {
    return {
      pathLength: false,
      pathClasses: [],
      keyframes: `
        @keyframes lmn-${name} {
          0%, 100% { transform: translate(0, 0); opacity: 1; }
          50% { transform: translate(2px, -2px); opacity: 0.75; }
        }
      `,
      base: '',
      animate: `
        .lmn-animate svg {
          animation: lmn-${name} ${duration} ease both;
        }
      `,
    };
  },

  'focus-lock'(name, duration = '450ms') {
    return {
      pathLength: false,
      pathClasses: [],
      keyframes: `
        @keyframes lmn-${name} {
          0%, 100% { transform: scale(1); }
          40% { transform: scale(1.1); }
          70% { transform: scale(0.98); }
        }
      `,
      base: `
        .lmn-animate svg {
          transform-origin: center;
        }
      `,
      animate: `
        .lmn-animate svg {
          animation: lmn-${name} ${duration} ease-out both;
        }
      `,
    };
  },

  'crawl'(name, duration = '500ms') {
    return {
      pathLength: false,
      pathClasses: [],
      keyframes: `
        @keyframes lmn-${name} {
          0%, 100% { transform: translate(0, 0); }
          20% { transform: translate(1px, -1px); }
          40% { transform: translate(-1px, 1px); }
          60% { transform: translate(1px, 1px); }
          80% { transform: translate(-1px, -1px); }
        }
      `,
      base: '',
      animate: `
        .lmn-animate svg {
          animation: lmn-${name} ${duration} ease-in-out both;
        }
      `,
    };
  },

  // --- Directed per-icon recipes (batch of 2026-08-18, first 15 catalog icons) ---

  'archive-peek'(name, duration = '650ms') {
    // Outline split: [1]=body [2]=handle [3]=lid. Filled: [1]=lid [2]=box.
    return {
      pathLength: false,
      pathClasses: ['lmn-path-1', 'lmn-path-2', 'lmn-path-3'],
      splitPaths: true,
      keyframes: `
        @keyframes lmn-${name}-lid {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          25%, 55% { transform: translateY(-2.5px) rotate(-7deg); }
        }
      `,
      base: `
        .lmn-animate--outline svg .lmn-path-3,
        .lmn-animate--filled svg .lmn-path-1 {
          transform-origin: left center;
        }
      `,
      animate: `
        .lmn-animate--outline svg .lmn-path-3 { animation: lmn-${name}-lid ${duration} ease-in-out both; }
        .lmn-animate--filled svg .lmn-path-1 { animation: lmn-${name}-lid ${duration} ease-in-out both; }
      `,
    };
  },

  'archive-drop'(name, duration = '750ms') {
    // Outline split: [1]=body [2..4]=arrow [5]=lid. Filled: [1]=lid [2]=box+arrow.
    return {
      pathLength: false,
      pathClasses: ['lmn-path-1', 'lmn-path-2', 'lmn-path-3', 'lmn-path-4', 'lmn-path-5'],
      splitPaths: true,
      keyframes: `
        @keyframes lmn-${name}-lid {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          15%, 70% { transform: translateY(-2.5px) rotate(-7deg); }
        }
        @keyframes lmn-${name}-drop {
          0%, 25% { transform: translateY(-3px); opacity: 0; }
          50% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(0); opacity: 1; }
        }
      `,
      base: `
        .lmn-animate--outline svg .lmn-path-5,
        .lmn-animate--filled svg .lmn-path-1 {
          transform-origin: left center;
        }
      `,
      animate: `
        .lmn-animate--outline svg .lmn-path-5 { animation: lmn-${name}-lid ${duration} ease-in-out both; }
        .lmn-animate--filled svg .lmn-path-1 { animation: lmn-${name}-lid ${duration} ease-in-out both; }
        .lmn-animate--outline svg .lmn-path-2,
        .lmn-animate--outline svg .lmn-path-3,
        .lmn-animate--outline svg .lmn-path-4 { animation: lmn-${name}-drop ${duration} ease-in-out both; }
      `,
    };
  },

  'archive-reject'(name, duration = '700ms') {
    // Outline split: [1]=body [2..5]=x-mark [6]=lid. Filled: [1]=lid [2]=box+x.
    return {
      pathLength: false,
      pathClasses: ['lmn-path-1', 'lmn-path-2', 'lmn-path-3', 'lmn-path-4', 'lmn-path-5', 'lmn-path-6'],
      splitPaths: true,
      keyframes: `
        @keyframes lmn-${name}-lid {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          15%, 70% { transform: translateY(-2.5px) rotate(-7deg); }
        }
        @keyframes lmn-${name}-xpop {
          0%, 30% { transform: scale(0.4); opacity: 0; }
          50% { transform: scale(1.15); opacity: 1; }
          65% { transform: scale(0.96); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
      `,
      base: `
        .lmn-animate--outline svg .lmn-path-6,
        .lmn-animate--filled svg .lmn-path-1 {
          transform-origin: left center;
        }
      `,
      animate: `
        .lmn-animate--outline svg .lmn-path-6 { animation: lmn-${name}-lid ${duration} ease-in-out both; }
        .lmn-animate--filled svg .lmn-path-1 { animation: lmn-${name}-lid ${duration} ease-in-out both; }
        .lmn-animate--outline svg .lmn-path-2,
        .lmn-animate--outline svg .lmn-path-3,
        .lmn-animate--outline svg .lmn-path-4,
        .lmn-animate--outline svg .lmn-path-5 { animation: lmn-${name}-xpop ${duration} ease-in-out both; }
      `,
    };
  },

  'draw-drift'(name, duration = '700ms', dx = '0', dy = '3px', shaftIndices = [3], headIndices = [1, 2], total = 3, reverseShafts = true) {
    // Heroicons often starts a compound arrow path at its point. Split it so
    // the shaft can draw from tail to tip before the arrowhead resolves.
    const pathClasses = Array.from({ length: total }, (_, i) => `lmn-path-${i + 1}`);
    const shaftSelectors = shaftIndices
      .map((i) => `.lmn-animate--outline svg .lmn-path-${i}`)
      .join(',\n        ');
    const headSelectors = headIndices
      .map((i) => `.lmn-animate--outline svg .lmn-path-${i}`)
      .join(',\n        ');
    return {
      pathLength: true,
      pathClasses,
      splitPaths: true,
      reversePaths: reverseShafts ? shaftIndices : [],
      keyframes: `
        @keyframes lmn-${name}-draw-shaft {
          0% { stroke-dashoffset: 1; }
          62% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: 0; }
        }
        @keyframes lmn-${name}-draw-head {
          0%, 42% { stroke-dashoffset: 1; }
          100% { stroke-dashoffset: 0; }
        }
        @keyframes lmn-${name}-drift {
          0%, 100% { transform: translate(0, 0); }
          72% { transform: translate(${dx}, ${dy}); }
        }
      `,
      base: '',
      animate: `
        ${shaftSelectors} {
          stroke-dasharray: 1;
          stroke-dashoffset: 0;
          animation: lmn-${name}-draw-shaft ${duration} cubic-bezier(0.22, 0.8, 0.32, 1) both;
        }
        ${headSelectors} {
          stroke-dasharray: 1;
          stroke-dashoffset: 0;
          animation: lmn-${name}-draw-head ${duration} cubic-bezier(0.22, 0.8, 0.32, 1) both;
        }
        .lmn-animate svg {
          animation: lmn-${name}-drift ${duration} cubic-bezier(0.22, 0.8, 0.32, 1) both;
        }
      `,
    };
  },

  'parallel-arrow-draw'(name, duration = '760ms') {
    // This is a pair of independent return arrows, not a rotating object.
    // Both curved shafts write at the same time, then both arrowheads resolve.
    // The outline paths begin at their tips, so a negative dash offset makes
    // their visible stroke travel from each tail toward its arrowhead.
    const selectors = (variant, indices) => indices
      .map((i) => `.lmn-animate--${variant} svg .lmn-path-${i}`)
      .join(',\n        ');
    return {
      pathLength: true,
      pathClasses: ['lmn-path-1', 'lmn-path-2', 'lmn-path-3', 'lmn-path-4', 'lmn-path-5', 'lmn-path-6'],
      splitPaths: 'both',
      keyframes: `
        @keyframes lmn-${name}-shaft {
          0% { stroke-dashoffset: -1; opacity: 0.45; }
          62% { stroke-dashoffset: 0; opacity: 1; }
          100% { stroke-dashoffset: 0; opacity: 1; }
        }
        @keyframes lmn-${name}-head {
          0%, 44% { stroke-dashoffset: -1; opacity: 0.25; }
          100% { stroke-dashoffset: 0; opacity: 1; }
        }
        @keyframes lmn-${name}-solid-half {
          0% { transform: scale(0.94); opacity: 0.2; }
          72% { transform: scale(1.02); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
      `,
      base: '',
      animate: `
        ${selectors('outline', [1, 4])} {
          stroke-dasharray: 1;
          stroke-dashoffset: 0;
          animation: lmn-${name}-shaft ${duration} cubic-bezier(0.22, 0.8, 0.32, 1) both;
        }
        ${selectors('outline', [2, 3, 5, 6])} {
          stroke-dasharray: 1;
          stroke-dashoffset: 0;
          animation: lmn-${name}-head ${duration} cubic-bezier(0.22, 0.8, 0.32, 1) both;
        }
        ${selectors('filled', [1, 2])} { animation: lmn-${name}-solid-half ${duration} cubic-bezier(0.22, 0.8, 0.32, 1) both; }
      `,
    };
  },

  'turn-draw'(name, duration = '700ms') {
    // Heroicons encodes every turn as [1]=first head stroke,
    // [2]=second head stroke, [3]=the long route. The route begins at the
    // arrow tip, so its negative dash offset writes it tail → corner → tip.
    return {
      pathLength: true,
      pathClasses: ['lmn-path-1', 'lmn-path-2', 'lmn-path-3'],
      splitPaths: 'both',
      keyframes: `
        @keyframes lmn-${name}-route {
          0% { stroke-dashoffset: -1; opacity: 0.35; }
          64% { stroke-dashoffset: 0; opacity: 1; }
          100% { stroke-dashoffset: 0; opacity: 1; }
        }
        @keyframes lmn-${name}-head-forward {
          0%, 46% { stroke-dashoffset: 1; opacity: 0; }
          100% { stroke-dashoffset: 0; opacity: 1; }
        }
        @keyframes lmn-${name}-head-reverse {
          0%, 46% { stroke-dashoffset: -1; opacity: 0; }
          100% { stroke-dashoffset: 0; opacity: 1; }
        }
        @keyframes lmn-${name}-solid {
          0% { transform: scale(0.94); opacity: 0.25; }
          72% { transform: scale(1.02); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
      `,
      base: '',
      animate: `
        .lmn-animate--outline svg .lmn-path-3 {
          stroke-dasharray: 1;
          stroke-dashoffset: 0;
          animation: lmn-${name}-route ${duration} cubic-bezier(0.22, 0.8, 0.32, 1) both;
        }
        .lmn-animate--outline svg .lmn-path-1 {
          stroke-dasharray: 1;
          stroke-dashoffset: 0;
          animation: lmn-${name}-head-forward ${duration} cubic-bezier(0.22, 0.8, 0.32, 1) both;
        }
        .lmn-animate--outline svg .lmn-path-2 {
          stroke-dasharray: 1;
          stroke-dashoffset: 0;
          animation: lmn-${name}-head-reverse ${duration} cubic-bezier(0.22, 0.8, 0.32, 1) both;
        }
        .lmn-animate--filled svg { animation: lmn-${name}-solid ${duration} cubic-bezier(0.22, 0.8, 0.32, 1) both; }
      `,
    };
  },

  'arrow-in-circle'(name, duration = '760ms', headIndices = [1, 2], shaftIndices = [3], total = 4, fromX = '0', fromY = '-3px') {
    // The ring establishes the destination first; the arrow then travels into
    // it from the opposite direction. Solid Heroicons circles split cleanly
    // into [1]=ring and [2]=arrow, so they retain the same story.
    const pathClasses = Array.from({ length: total }, (_, i) => `lmn-path-${i + 1}`);
    const selectors = (variant, indices) => indices
      .map((i) => `.lmn-animate--${variant} svg .lmn-path-${i}`)
      .join(',\n        ');
    return {
      pathLength: true,
      pathClasses,
      splitPaths: 'both',
      reversePaths: shaftIndices,
      keyframes: `
        @keyframes lmn-${name}-ring {
          0% { stroke-dashoffset: 1; opacity: 0.25; }
          54% { stroke-dashoffset: 0; opacity: 1; }
          100% { stroke-dashoffset: 0; opacity: 1; }
        }
        @keyframes lmn-${name}-shaft {
          0%, 24% { stroke-dashoffset: 1; }
          72% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: 0; }
        }
        @keyframes lmn-${name}-head {
          0%, 52% { stroke-dashoffset: 1; }
          100% { stroke-dashoffset: 0; }
        }
        @keyframes lmn-${name}-arrive {
          0%, 20% { transform: translate(${fromX}, ${fromY}); }
          78%, 100% { transform: translate(0, 0); }
        }
        @keyframes lmn-${name}-solid-ring {
          0% { transform: scale(0.88); opacity: 0.35; }
          58%, 100% { transform: scale(1); opacity: 1; }
        }
      `,
      base: '',
      animate: `
        ${selectors('outline', [total])} {
          stroke-dasharray: 1;
          stroke-dashoffset: 0;
          animation: lmn-${name}-ring ${duration} cubic-bezier(0.22, 0.8, 0.32, 1) both;
        }
        ${selectors('outline', shaftIndices)} {
          stroke-dasharray: 1;
          stroke-dashoffset: 0;
          animation: lmn-${name}-shaft ${duration} cubic-bezier(0.22, 0.8, 0.32, 1) both, lmn-${name}-arrive ${duration} cubic-bezier(0.22, 0.8, 0.32, 1) both;
        }
        ${selectors('outline', headIndices)} {
          stroke-dasharray: 1;
          stroke-dashoffset: 0;
          animation: lmn-${name}-head ${duration} cubic-bezier(0.22, 0.8, 0.32, 1) both, lmn-${name}-arrive ${duration} cubic-bezier(0.22, 0.8, 0.32, 1) both;
        }
        ${selectors('filled', [1])} { animation: lmn-${name}-solid-ring ${duration} cubic-bezier(0.22, 0.8, 0.32, 1) both; }
        ${selectors('filled', [2])} { animation: lmn-${name}-arrive ${duration} cubic-bezier(0.22, 0.8, 0.32, 1) both; }
      `,
    };
  },

  'arrow-through-rectangle'(name, duration = '650ms', headIndices = [2, 3], shaftIndices = [4], total = 4, fromX = '-4px') {
    // A login/logout rectangle is a fixed threshold, not an object to draw.
    // The arrow crosses that threshold, including for the split filled SVG.
    const pathClasses = Array.from({ length: total }, (_, i) => `lmn-path-${i + 1}`);
    const selectors = (variant, indices) => indices
      .map((i) => `.lmn-animate--${variant} svg .lmn-path-${i}`)
      .join(',\n        ');
    return {
      pathLength: true,
      pathClasses,
      splitPaths: 'both',
      reversePaths: shaftIndices,
      keyframes: `
        @keyframes lmn-${name}-cross {
          0%, 16% { transform: translateX(${fromX}); opacity: 0.2; }
          78%, 100% { transform: translateX(0); opacity: 1; }
        }
        @keyframes lmn-${name}-shaft {
          0%, 18% { stroke-dashoffset: 1; }
          70% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: 0; }
        }
        @keyframes lmn-${name}-head {
          0%, 48% { stroke-dashoffset: 1; }
          100% { stroke-dashoffset: 0; }
        }
        @keyframes lmn-${name}-frame {
          0%, 36% { opacity: 0.55; }
          100% { opacity: 1; }
        }
      `,
      base: '',
      animate: `
        ${selectors('outline', [1])} { animation: lmn-${name}-frame ${duration} ease-out both; }
        ${selectors('outline', shaftIndices)} {
          stroke-dasharray: 1;
          stroke-dashoffset: 0;
          animation: lmn-${name}-shaft ${duration} cubic-bezier(0.22, 0.8, 0.32, 1) both, lmn-${name}-cross ${duration} cubic-bezier(0.22, 0.8, 0.32, 1) both;
        }
        ${selectors('outline', headIndices)} {
          stroke-dasharray: 1;
          stroke-dashoffset: 0;
          animation: lmn-${name}-head ${duration} cubic-bezier(0.22, 0.8, 0.32, 1) both, lmn-${name}-cross ${duration} cubic-bezier(0.22, 0.8, 0.32, 1) both;
        }
        ${selectors('filled', [1])} { animation: lmn-${name}-frame ${duration} ease-out both; }
        ${selectors('filled', [2])} { animation: lmn-${name}-cross ${duration} cubic-bezier(0.22, 0.8, 0.32, 1) both; }
      `,
    };
  },

  'arrow-into-receiver'(name, duration = '700ms', headIndices = [2, 3], shaftIndices = [4], total = 4, receiverIndices = [1], fromY = '-4px', filledArrowIndices = [], receiverImpact = false) {
    // Squares and trays are destinations. Keep their outline legible, then
    // let the arrow descend into it; only a tray gets a tiny impact response.
    const pathClasses = Array.from({ length: total }, (_, i) => `lmn-path-${i + 1}`);
    const selectors = (variant, indices) => indices
      .map((i) => `.lmn-animate--${variant} svg .lmn-path-${i}`)
      .join(',\n        ');
    return {
      pathLength: true,
      pathClasses,
      splitPaths: 'both',
      reversePaths: shaftIndices,
      keyframes: `
        @keyframes lmn-${name}-arrive {
          0%, 18% { transform: translateY(${fromY}); opacity: 0.15; }
          72% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(0); opacity: 1; }
        }
        @keyframes lmn-${name}-shaft {
          0%, 18% { stroke-dashoffset: 1; }
          66% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: 0; }
        }
        @keyframes lmn-${name}-head {
          0%, 46% { stroke-dashoffset: 1; }
          100% { stroke-dashoffset: 0; }
        }
        @keyframes lmn-${name}-receiver {
          0%, 68%, 100% { transform: translateY(0); opacity: 1; }
          82% { transform: translateY(1px); opacity: 0.9; }
        }
      `,
      base: '',
      animate: `
        ${receiverImpact ? `${selectors('outline', receiverIndices)} { animation: lmn-${name}-receiver ${duration} ease-out both; }` : ''}
        ${selectors('outline', shaftIndices)} {
          stroke-dasharray: 1;
          stroke-dashoffset: 0;
          animation: lmn-${name}-shaft ${duration} cubic-bezier(0.22, 0.8, 0.32, 1) both, lmn-${name}-arrive ${duration} cubic-bezier(0.22, 0.8, 0.32, 1) both;
        }
        ${selectors('outline', headIndices)} {
          stroke-dasharray: 1;
          stroke-dashoffset: 0;
          animation: lmn-${name}-head ${duration} cubic-bezier(0.22, 0.8, 0.32, 1) both, lmn-${name}-arrive ${duration} cubic-bezier(0.22, 0.8, 0.32, 1) both;
        }
        ${selectors('filled', filledArrowIndices)} { animation: lmn-${name}-arrive ${duration} cubic-bezier(0.22, 0.8, 0.32, 1) both; }
      `,
    };
  },

  'draw-part'(name, duration = '700ms', headIndices = [2, 3], shaftIndices = [4], total = 4, filledArrowIndices = null, filledDx = '0', filledDy = '3px') {
    // Outline is split into `total` subpaths. Draw the shaft from tail to tip,
    // then resolve the head; optional artifacts can draw around the action.
    // Filled is not split: whole-icon lunge, plus an opacity dip on the arrow's
    // filled paths when `filledArrowIndices` is given (per solid-SVG tag order).
    const pathClasses = Array.from({ length: total }, (_, i) => `lmn-path-${i + 1}`);
    const headSelectors = headIndices
      .map((i) => `.lmn-animate--outline svg .lmn-path-${i}`)
      .join(',\n        ');
    const shaftSelectors = shaftIndices
      .map((i) => `.lmn-animate--outline svg .lmn-path-${i}`)
      .join(',\n        ');
    const filledArrowSelectors = (filledArrowIndices ?? [])
      .map((i) => `.lmn-animate--filled svg .lmn-path-${i}`)
      .join(',\n        ');
    const lungeKeyframes = filledDx === '0' && filledDy === '3px'
      ? `@keyframes lmn-${name}-lunge {
          0%, 100% { transform: translateY(0); }
          40% { transform: translateY(3px); }
          60% { transform: translateY(-1px); }
        }`
      : `@keyframes lmn-${name}-lunge {
          0%, 100% { transform: translate(0, 0); }
          40% { transform: translate(${filledDx}, ${filledDy}); }
          60% { transform: translate(calc(${filledDx} * -0.33), calc(${filledDy} * -0.33)); }
        }`;
    return {
      pathLength: true,
      pathClasses,
      splitPaths: true,
      reversePaths: shaftIndices,
      keyframes: `
        @keyframes lmn-${name}-draw-shaft {
          0% { stroke-dashoffset: 1; }
          62% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: 0; }
        }
        @keyframes lmn-${name}-draw-head {
          0%, 42% { stroke-dashoffset: 1; }
          100% { stroke-dashoffset: 0; }
        }
        ${lungeKeyframes}
        @keyframes lmn-${name}-fade {
          0%, 100% { opacity: 1; }
          30% { opacity: 0.25; }
          70% { opacity: 1; }
        }
      `,
      base: '',
      animate: `
        ${shaftSelectors} {
          stroke-dasharray: 1;
          stroke-dashoffset: 0;
          animation: lmn-${name}-draw-shaft ${duration} cubic-bezier(0.22, 0.8, 0.32, 1) both;
        }
        ${headSelectors} {
          stroke-dasharray: 1;
          stroke-dashoffset: 0;
          animation: lmn-${name}-draw-head ${duration} cubic-bezier(0.22, 0.8, 0.32, 1) both;
        }
        .lmn-animate--filled svg {
          animation: lmn-${name}-lunge ${duration} ease both;
        }
        ${filledArrowSelectors ? `${filledArrowSelectors} {
          animation: lmn-${name}-fade ${duration} ease-in-out both;
        }` : ''}
      `,
    };
  },
};

/**
 * Per-icon animation map.
 * @type {Record<string, { recipe: keyof RECIPES, duration?: string, args?: unknown[] }>}
 */
export const ICON_ANIMATIONS = {
  // Loading (only infinite animation allowed by contract)
  loader: { recipe: 'spin-infinite', duration: '800ms' },

  // Actions / confirmation
  check: { recipe: 'draw-scale', duration: '420ms' },
  'check-circle': { recipe: 'draw-scale', duration: '500ms' },
  'check-badge': { recipe: 'draw-scale', duration: '500ms' },
  checkbox: { recipe: 'draw-scale', duration: '420ms' },
  'x-mark': { recipe: 'draw-scale', duration: '420ms' },
  x: { recipe: 'draw-scale', duration: '420ms' },
  'x-circle': { recipe: 'draw-scale', duration: '500ms' },

  // Math / toggles
  plus: { recipe: 'plus-draw', duration: '440ms' },
  'plus-circle': { recipe: 'plus-draw', duration: '520ms' },
  'plus-small': { recipe: 'plus-draw', duration: '400ms' },
  minus: { recipe: 'stretch-x', duration: '400ms' },
  'minus-circle': { recipe: 'stretch-x', duration: '400ms' },
  'minus-small': { recipe: 'stretch-x', duration: '350ms' },
  divide: { recipe: 'stretch-x', duration: '400ms' },
  equals: { recipe: 'stretch-x', duration: '400ms' },

  // Edit / write
  pencil: { recipe: 'scribble', duration: '500ms' },
  'pencil-square': { recipe: 'scribble', duration: '500ms' },
  edit: { recipe: 'scribble', duration: '500ms' },
  'paint-brush': { recipe: 'scribble', duration: '500ms' },
  underline: { recipe: 'draw-underline', duration: '400ms' },
  strikethrough: { recipe: 'draw-strikethrough', duration: '400ms' },
  slash: { recipe: 'draw-strikethrough', duration: '400ms' },
  bold: { recipe: 'typewriter', duration: '500ms' },
  italic: { recipe: 'typewriter', duration: '500ms' },
  h1: { recipe: 'typewriter', duration: '500ms' },
  h2: { recipe: 'typewriter', duration: '500ms' },
  h3: { recipe: 'typewriter', duration: '500ms' },
  list: { recipe: 'typewriter', duration: '500ms' },
  'list-bullet': { recipe: 'typewriter', duration: '500ms' },
  'numbered-list': { recipe: 'typewriter', duration: '500ms' },

  // Copy / duplicate
  copy: { recipe: 'copy-offset', duration: '450ms' },
  'clipboard-document-check': { recipe: 'copy-offset', duration: '450ms' },
  'document-duplicate': { recipe: 'copy-offset', duration: '450ms' },

  // Delete
  trash: { recipe: 'trash-lid', duration: '450ms' },

  // Refresh / rotate
  'arrow-path': { recipe: 'spin', duration: '1000ms' },
  'arrow-path-rounded-square': { recipe: 'parallel-arrow-draw', duration: '760ms' },
  'refresh-cw': { recipe: 'spin', duration: '800ms' },

  // Settings / tools
  cog: { recipe: 'rotate-once', duration: '700ms', args: [180] },
  'cog-6-tooth': { recipe: 'rotate-once', duration: '700ms', args: [180] },
  'cog-8-tooth': { recipe: 'rotate-once', duration: '700ms', args: [180] },
  settings: { recipe: 'rotate-once', duration: '700ms', args: [180] },
  scissors: { recipe: 'scissors-snip', duration: '560ms' },
  wrench: { recipe: 'rotate-once', duration: '500ms', args: [180] },
  'wrench-screwdriver': { recipe: 'rotate-once', duration: '500ms', args: [180] },
  'paper-clip': { recipe: 'clip-flex', duration: '600ms' },
  paperclip: { recipe: 'clip-flex', duration: '600ms' },
  'puzzle-piece': { recipe: 'puzzle-seat', duration: '620ms' },
  cube: { recipe: 'rotate-once', duration: '500ms', args: [180] },
  'cube-transparent': { recipe: 'rotate-once', duration: '500ms', args: [180] },

  // Social / feedback
  heart: { recipe: 'beat', duration: '600ms' },
  star: { recipe: 'beat', duration: '550ms' },
  'hand-thumb-up': { recipe: 'thumbs-up', duration: '500ms' },
  'hand-thumb-down': { recipe: 'thumbs-down', duration: '500ms' },

  // Alerts
  bell: { recipe: 'ring', duration: '500ms' },
  'bell-alert': { recipe: 'ring', duration: '500ms' },
  'bell-slash': { recipe: 'ring', duration: '500ms' },
  'bell-snooze': { recipe: 'ring', duration: '500ms' },
  'exclamation-circle': { recipe: 'wiggle', duration: '450ms' },
  'exclamation-triangle': { recipe: 'wiggle', duration: '450ms' },
  'question-mark-circle': { recipe: 'wiggle', duration: '450ms' },
  'alert-circle': { recipe: 'alert-signal', duration: '560ms' },
  info: { recipe: 'wiggle', duration: '450ms' },
  'information-circle': { recipe: 'wiggle', duration: '450ms' },
  'no-symbol': { recipe: 'no-shake', duration: '450ms' },

  // Arrows
  'arrow-right': { recipe: 'draw-drift', duration: '700ms', args: ['3px', '0', [3], [1, 2], 3] },
  'arrow-long-right': { recipe: 'draw-drift', duration: '700ms', args: ['3px', '0', [3], [1, 2], 3] },
  'arrow-small-right': { recipe: 'slide-right', duration: '350ms', args: ['4px'] },
  'chevron-right': { recipe: 'slide-right', duration: '350ms', args: ['4px'] },
  'arrow-left': { recipe: 'draw-drift', duration: '700ms', args: ['-3px', '0', [3], [1, 2], 3] },
  'arrow-long-left': { recipe: 'draw-drift', duration: '700ms', args: ['-3px', '0', [3], [1, 2], 3] },
  'arrow-small-left': { recipe: 'slide-left', duration: '350ms', args: ['4px'] },
  'chevron-left': { recipe: 'slide-left', duration: '350ms', args: ['4px'] },
  'arrow-up': { recipe: 'slide-up', duration: '400ms' },
  'arrow-long-up': { recipe: 'draw-drift', duration: '700ms', args: ['0', '-3px', [3], [1, 2], 3] },
  'arrow-small-up': { recipe: 'slide-up', duration: '350ms', args: ['4px'] },
  'chevron-up': { recipe: 'slide-up', duration: '350ms', args: ['4px'] },
  'arrow-down': { recipe: 'draw-drift', duration: '700ms', args: ['0', '3px', [3], [1, 2], 3] },
  'arrow-long-down': { recipe: 'draw-drift', duration: '700ms', args: ['0', '3px', [3], [1, 2], 3] },
  'arrow-small-down': { recipe: 'slide-down', duration: '350ms', args: ['4px'] },
  'chevron-down': { recipe: 'slide-down', duration: '350ms', args: ['4px'] },

  // Transfer arrows
  'arrow-top-right-on-square': { recipe: 'arrow-bounce', duration: '500ms', args: ['5px'] },
  'external-link': { recipe: 'arrow-bounce', duration: '500ms', args: ['5px'] },
  download: { recipe: 'download-arrow', duration: '550ms' },
  'cloud-arrow-down': { recipe: 'download-arrow', duration: '550ms' },
  'arrow-up-tray': { recipe: 'upload-arrow', duration: '550ms' },
  upload: { recipe: 'upload-arrow', duration: '550ms' },
  'cloud-arrow-up': { recipe: 'upload-arrow', duration: '550ms' },

  // Navigation
  home: { recipe: 'home-bounce', duration: '500ms' },
  'home-modern': { recipe: 'home-bounce', duration: '500ms' },
  menu: { recipe: 'bars-stagger', duration: '440ms', args: [3] },
  'bars-2': { recipe: 'bars-stagger', duration: '360ms', args: [2] },
  'bars-3': { recipe: 'bars-stagger', duration: '440ms', args: [3] },
  'bars-3-bottom-left': { recipe: 'bars-stagger', duration: '440ms', args: [3] },
  'bars-3-bottom-right': { recipe: 'bars-stagger', duration: '440ms', args: [3, [3]] },
  'bars-3-center-left': { recipe: 'bars-stagger', duration: '440ms', args: [3] },
  'bars-4': { recipe: 'bars-stagger', duration: '510ms', args: [4] },
  'bars-arrow-down': { recipe: 'bars-arrow', duration: '650ms', args: ['down'] },
  'bars-arrow-up': { recipe: 'bars-arrow', duration: '650ms', args: ['up'] },

  // Communication
  mail: { recipe: 'open-envelope', duration: '500ms' },
  envelope: { recipe: 'open-envelope', duration: '500ms' },
  'envelope-open': { recipe: 'open-envelope', duration: '500ms' },
  send: { recipe: 'send-plane', duration: '550ms' },
  'paper-airplane': { recipe: 'send-plane', duration: '550ms' },
  'chat-bubble-bottom-center': { recipe: 'bubble-pop', duration: '450ms', args: ['bottom center'] },
  'chat-bubble-bottom-center-text': { recipe: 'bubble-pop', duration: '450ms', args: ['bottom center'] },
  'chat-bubble-left': { recipe: 'bubble-pop', duration: '450ms' },
  'chat-bubble-left-ellipsis': { recipe: 'bubble-pop', duration: '450ms' },
  'chat-bubble-left-right': { recipe: 'bubble-pop', duration: '450ms', args: ['bottom center'] },
  'chat-bubble-oval-left': { recipe: 'bubble-pop', duration: '450ms' },
  'chat-bubble-oval-left-ellipsis': { recipe: 'bubble-pop', duration: '450ms' },
  'message-circle': { recipe: 'bubble-pop', duration: '450ms' },
  megaphone: { recipe: 'shout', duration: '500ms' },
  phone: { recipe: 'phone-vibrate', duration: '450ms' },
  'phone-arrow-down-left': { recipe: 'phone-vibrate', duration: '450ms' },
  'phone-arrow-up-right': { recipe: 'phone-vibrate', duration: '450ms' },
  'phone-x-mark': { recipe: 'phone-vibrate', duration: '450ms' },
  'device-phone-mobile': { recipe: 'phone-vibrate', duration: '450ms' },
  rss: { recipe: 'wave', duration: '600ms' },

  // Search
  search: { recipe: 'zoom', duration: '500ms' },
  'magnifying-glass': { recipe: 'zoom', duration: '500ms' },
  'magnifying-glass-plus': { recipe: 'zoom', duration: '500ms' },
  'magnifying-glass-minus': { recipe: 'zoom', duration: '500ms' },
  'magnifying-glass-circle': { recipe: 'zoom', duration: '500ms' },
  'document-magnifying-glass': { recipe: 'zoom', duration: '500ms' },

  // Media
  play: { recipe: 'play-morph', duration: '400ms' },
  'play-circle': { recipe: 'play-morph', duration: '400ms' },
  pause: { recipe: 'play-morph', duration: '400ms' },
  'pause-circle': { recipe: 'play-morph', duration: '400ms' },
  'play-pause': { recipe: 'play-morph', duration: '400ms' },
  stop: { recipe: 'play-morph', duration: '400ms' },
  'stop-circle': { recipe: 'play-morph', duration: '400ms' },
  camera: { recipe: 'shutter', duration: '450ms' },
  photo: { recipe: 'shutter', duration: '450ms' },
  image: { recipe: 'shutter', duration: '450ms' },
  'video-camera': { recipe: 'film-roll', duration: '700ms' },
  'video-camera-slash': { recipe: 'film-roll', duration: '700ms' },
  video: { recipe: 'film-roll', duration: '700ms' },
  film: { recipe: 'film-roll', duration: '700ms' },
  'musical-note': { recipe: 'music-beat', duration: '500ms' },
  microphone: { recipe: 'microphone-pulse', duration: '500ms' },

  // System / theme
  sun: { recipe: 'glow', duration: '700ms' },
  moon: { recipe: 'moon-wobble', duration: '800ms' },
  fire: { recipe: 'glow', duration: '700ms' },
  zap: { recipe: 'glow', duration: '700ms' },
  bolt: { recipe: 'glow', duration: '700ms' },
  'bolt-slash': { recipe: 'glow', duration: '700ms' },
  sparkles: { recipe: 'glow', duration: '700ms' },
  'light-bulb': { recipe: 'glow', duration: '700ms' },
  power: { recipe: 'glow', duration: '700ms' },
  cake: { recipe: 'glow', duration: '700ms' },

  // Signals
  wifi: { recipe: 'wave', duration: '600ms' },
  signal: { recipe: 'wave', duration: '600ms' },
  'signal-slash': { recipe: 'wave', duration: '600ms' },
  'battery-0': { recipe: 'battery-charge', duration: '640ms' },
  'battery-50': { recipe: 'battery-charge', duration: '720ms', args: [2] },
  'battery-100': { recipe: 'battery-charge', duration: '800ms', args: [2] },

  // Code / terminal
  'code-bracket': { recipe: 'typewriter', duration: '500ms' },
  'code-bracket-square': { recipe: 'typewriter', duration: '500ms' },
  terminal: { recipe: 'typewriter', duration: '500ms' },
  'command-line': { recipe: 'typewriter', duration: '500ms' },
  hashtag: { recipe: 'typewriter', duration: '500ms' },
  variable: { recipe: 'typewriter', duration: '500ms' },
  calculator: { recipe: 'typewriter', duration: '500ms' },
  'at-symbol': { recipe: 'typewriter', duration: '500ms' },
  'cpu-chip': { recipe: 'core-pulse', duration: '500ms' },

  // Cloud / weather
  cloud: { recipe: 'float', duration: '2000ms' },

  // Content / files
  folder: { recipe: 'folder-pop', duration: '450ms' },
  'folder-open': { recipe: 'folder-pop', duration: '450ms' },
  'folder-plus': { recipe: 'folder-pop', duration: '450ms' },
  'folder-minus': { recipe: 'folder-pop', duration: '450ms' },
  'folder-arrow-down': { recipe: 'folder-pop', duration: '450ms' },
  inbox: { recipe: 'folder-pop', duration: '450ms' },
  'inbox-arrow-down': { recipe: 'folder-pop', duration: '450ms' },
  'inbox-stack': { recipe: 'folder-pop', duration: '450ms' },
  file: { recipe: 'file-appear', duration: '500ms' },
  document: { recipe: 'document-draw', duration: '620ms' },
  'document-text': { recipe: 'document-draw', duration: '660ms' },
  'document-check': { recipe: 'document-draw', duration: '660ms' },
  'document-plus': { recipe: 'document-draw', duration: '660ms' },
  'document-minus': { recipe: 'document-draw', duration: '660ms' },
  'document-arrow-up': { recipe: 'document-draw', duration: '660ms' },
  'document-arrow-down': { recipe: 'document-draw', duration: '660ms' },
  'document-chart-bar': { recipe: 'document-draw', duration: '660ms' },
  'archive-box': { recipe: 'archive-peek', duration: '650ms' },
  'archive-box-arrow-down': { recipe: 'archive-drop', duration: '750ms' },
  'archive-box-x-mark': { recipe: 'archive-reject', duration: '700ms' },
  newspaper: { recipe: 'file-appear', duration: '500ms' },
  identification: { recipe: 'file-appear', duration: '500ms' },
  clipboard: { recipe: 'file-appear', duration: '500ms' },
  'clipboard-document': { recipe: 'file-appear', duration: '500ms' },
  'clipboard-document-list': { recipe: 'file-appear', duration: '500ms' },
  save: { recipe: 'file-appear', duration: '500ms' },
  printer: { recipe: 'file-appear', duration: '500ms' },
  calendar: { recipe: 'calendar-flip', duration: '500ms' },
  'calendar-days': { recipe: 'calendar-flip', duration: '500ms' },
  'calendar-date-range': { recipe: 'calendar-flip', duration: '500ms' },
  clock: { recipe: 'clock-tick', duration: '600ms' },
  bookmark: { recipe: 'bookmark-fold', duration: '450ms' },
  'bookmark-slash': { recipe: 'bookmark-fold', duration: '450ms' },
  'bookmark-square': { recipe: 'bookmark-fold', duration: '450ms' },
  'book-open': { recipe: 'book-open', duration: '550ms' },
  ticket: { recipe: 'ticket-tear', duration: '500ms' },
  gift: { recipe: 'gift-unbox', duration: '550ms' },
  'gift-top': { recipe: 'gift-unbox', duration: '550ms' },

  // Security
  lock: { recipe: 'lock-click', duration: '400ms' },
  'lock-closed': { recipe: 'lock-click', duration: '400ms' },
  'lock-open': { recipe: 'unlock', duration: '500ms' },
  key: { recipe: 'rotate-once', duration: '500ms', args: [90] },
  shield: { recipe: 'core-pulse', duration: '450ms' },
  'shield-check': { recipe: 'draw-scale', duration: '500ms' },
  'shield-exclamation': { recipe: 'wiggle', duration: '450ms' },
  'finger-print': { recipe: 'tap', duration: '400ms' },

  // Users
  user: { recipe: 'bounce', duration: '450ms' },
  users: { recipe: 'bounce', duration: '450ms' },
  'user-circle': { recipe: 'bounce', duration: '450ms' },
  'user-group': { recipe: 'bounce', duration: '450ms' },
  'user-plus': { recipe: 'bounce', duration: '450ms' },
  'user-minus': { recipe: 'bounce', duration: '450ms' },
  avatar: { recipe: 'bounce', duration: '450ms' },

  // Commerce
  'shopping-cart': { recipe: 'cart-roll', duration: '550ms' },
  'shopping-bag': { recipe: 'bounce', duration: '450ms' },
  'credit-card': { recipe: 'credit-card-swipe', duration: '500ms' },
  banknotes: { recipe: 'banknote-flutter', duration: '600ms' },
  'currency-dollar': { recipe: 'banknote-flutter', duration: '600ms' },
  'currency-euro': { recipe: 'banknote-flutter', duration: '600ms' },
  'currency-pound': { recipe: 'banknote-flutter', duration: '600ms' },
  'currency-yen': { recipe: 'banknote-flutter', duration: '600ms' },
  'currency-rupee': { recipe: 'banknote-flutter', duration: '600ms' },
  'currency-bangladeshi': { recipe: 'banknote-flutter', duration: '600ms' },
  truck: { recipe: 'truck-move', duration: '600ms' },
  wallet: { recipe: 'calendar-flip', duration: '500ms' },
  tag: { recipe: 'tag-swing', duration: '550ms' },
  'percent-badge': { recipe: 'percent-pop', duration: '400ms' },
  'receipt-percent': { recipe: 'receipt-print', duration: '500ms' },
  'receipt-refund': { recipe: 'receipt-print', duration: '500ms' },
  scale: { recipe: 'scale-settle', duration: '680ms' },

  // Charts
  'chart-bar': { recipe: 'chart-grow', duration: '600ms' },
  'chart-bar-square': { recipe: 'chart-grow', duration: '600ms' },
  'presentation-chart-bar': { recipe: 'chart-grow', duration: '600ms' },
  'presentation-chart-line': { recipe: 'chart-grow', duration: '600ms' },
  'chart-pie': { recipe: 'chart-pie-slice', duration: '600ms' },

  // Objects / places
  'rocket-launch': { recipe: 'rocket-launch', duration: '700ms' },
  globe: { recipe: 'globe-spin', duration: '900ms' },
  'globe-alt': { recipe: 'globe-spin', duration: '900ms' },
  'globe-americas': { recipe: 'globe-spin', duration: '900ms' },
  'globe-asia-australia': { recipe: 'globe-spin', duration: '900ms' },
  'globe-europe-africa': { recipe: 'globe-spin', duration: '900ms' },
  flag: { recipe: 'flag-wave', duration: '600ms' },
  'map-pin': { recipe: 'pin-drop', duration: '500ms' },
  map: { recipe: 'globe-spin', duration: '900ms' },
  trophy: { recipe: 'trophy-shine', duration: '600ms' },
  beaker: { recipe: 'wiggle', duration: '450ms' },
  'device-tablet': { recipe: 'screen-on', duration: '450ms' },
  'computer-desktop': { recipe: 'screen-on', duration: '500ms' },
  tv: { recipe: 'screen-on', duration: '450ms' },
  window: { recipe: 'screen-on', duration: '400ms' },

  // Interaction
  'cursor-arrow-rays': { recipe: 'tap', duration: '400ms' },
  'cursor-arrow-ripple': { recipe: 'tap', duration: '400ms' },
  'hand-raised': { recipe: 'tap', duration: '400ms' },

  // Semantic remap — Phase 1 (docs/specs/2026-08-17-semantic-animation-remap.md)
  'arrow-trending-up': { recipe: 'trend-draw', duration: '600ms' },
  'arrow-trending-down': { recipe: 'trend-draw', duration: '600ms' },
  'arrow-up-right': { recipe: 'draw-drift', duration: '700ms', args: ['2.5px', '-2.5px', [1], [2, 3], 3, false] },
  'arrow-turn-down-left': { recipe: 'turn-draw', duration: '700ms' },
  'arrow-turn-down-right': { recipe: 'turn-draw', duration: '700ms' },
  'arrow-turn-left-down': { recipe: 'turn-draw', duration: '700ms' },
  'arrow-turn-left-up': { recipe: 'turn-draw', duration: '700ms' },
  'arrow-turn-right-down': { recipe: 'turn-draw', duration: '700ms' },
  'arrow-turn-right-up': { recipe: 'turn-draw', duration: '700ms' },
  'arrow-turn-up-left': { recipe: 'turn-draw', duration: '700ms' },
  'arrow-turn-up-right': { recipe: 'turn-draw', duration: '700ms' },
  'arrow-uturn-down': { recipe: 'turn-draw', duration: '720ms' },
  'arrow-uturn-left': { recipe: 'turn-draw', duration: '720ms' },
  'arrow-uturn-right': { recipe: 'turn-draw', duration: '720ms' },
  'arrow-uturn-up': { recipe: 'turn-draw', duration: '720ms' },
  'arrows-pointing-in': { recipe: 'converge', duration: '450ms' },
  'arrows-pointing-out': { recipe: 'diverge', duration: '450ms' },
  'arrows-right-left': { recipe: 'swap-x', duration: '450ms' },
  'arrows-up-down': { recipe: 'swap-y', duration: '450ms' },
  'chevron-up-down': { recipe: 'swap-y', duration: '400ms' },
  'chevron-double-up': { recipe: 'chevron-cascade', duration: '450ms', args: ['y', '-3px'] },
  'chevron-double-down': { recipe: 'chevron-cascade', duration: '450ms', args: ['y', '3px'] },
  'chevron-double-left': { recipe: 'chevron-cascade', duration: '450ms', args: ['x', '-3px'] },
  'chevron-double-right': { recipe: 'chevron-cascade', duration: '450ms', args: ['x', '3px'] },
  'log-in': { recipe: 'door-enter', duration: '450ms', args: ['-4px'] },
  'log-out': { recipe: 'door-exit', duration: '450ms', args: ['4px'] },
  'arrow-right-on-rectangle': { recipe: 'arrow-through-rectangle', duration: '650ms', args: [[2, 3], [4], 4, '-4px'] },
  'arrow-left-on-rectangle': { recipe: 'arrow-through-rectangle', duration: '650ms', args: [[2, 3], [4], 4, '4px'] },
  'arrow-right-start-on-rectangle': { recipe: 'arrow-through-rectangle', duration: '650ms', args: [[2, 3], [4], 4, '-4px'] },
  'arrow-left-start-on-rectangle': { recipe: 'arrow-through-rectangle', duration: '650ms', args: [[2, 3], [4], 4, '4px'] },
  'arrow-right-end-on-rectangle': { recipe: 'arrow-through-rectangle', duration: '650ms', args: [[2, 3], [4], 4, '-4px'] },
  'arrow-left-end-on-rectangle': { recipe: 'arrow-through-rectangle', duration: '650ms', args: [[2, 3], [4], 4, '4px'] },
  'arrow-down-on-square': { recipe: 'arrow-into-receiver', duration: '700ms', args: [[2, 3], [4], 4, [1], '-4px', [1, 2]] },
  'arrow-down-on-square-stack': { recipe: 'arrow-into-receiver', duration: '700ms', args: [[2, 3], [4], 5, [1, 5], '-4px', [2]] },
  'arrow-up-on-square': { recipe: 'upload-arrow', duration: '550ms' },
  'arrow-up-on-square-stack': { recipe: 'upload-arrow', duration: '550ms' },
  'speaker-wave': { recipe: 'sound-waves', duration: '500ms' },
  'speaker-x-mark': { recipe: 'mute-fade', duration: '400ms' },
  radio: { recipe: 'emit', duration: '600ms' },
  gif: { recipe: 'frame-flip', duration: '600ms' },
  database: { recipe: 'stack-rise', duration: '500ms' },
  server: { recipe: 'stack-rise', duration: '500ms' },
  'server-stack': { recipe: 'stack-rise', duration: '550ms' },
  'circle-stack': { recipe: 'stack-rise', duration: '500ms' },
  'rectangle-stack': { recipe: 'stack-rise', duration: '500ms' },
  'square-2-stack': { recipe: 'stack-rise', duration: '500ms' },
  'square-3-stack-3d': { recipe: 'stack-rise', duration: '550ms' },
  grid: { recipe: 'cell-pop', duration: '450ms' },
  'squares-2x2': { recipe: 'cell-pop', duration: '450ms' },
  'squares-plus': { recipe: 'cell-pop', duration: '450ms' },
  'table-cells': { recipe: 'cell-pop', duration: '450ms' },
  'view-columns': { recipe: 'cell-pop', duration: '450ms' },
  'rectangle-group': { recipe: 'cell-pop', duration: '450ms' },
  'queue-list': { recipe: 'cell-pop', duration: '450ms' },
  'building-library': { recipe: 'stack-rise', duration: '550ms' },
  'building-office': { recipe: 'stack-rise', duration: '500ms' },
  'building-office-2': { recipe: 'stack-rise', duration: '500ms' },
  'building-storefront': { recipe: 'stack-rise', duration: '550ms' },
  'academic-cap': { recipe: 'cap-toss-fade', duration: '700ms' },
  briefcase: { recipe: 'lock-click', duration: '400ms' },
  badge: { recipe: 'shine', duration: '550ms' },
  swatch: { recipe: 'fan', duration: '500ms' },
  filter: { recipe: 'funnel-drain', duration: '500ms' },
  funnel: { recipe: 'funnel-drain', duration: '500ms' },
  package: { recipe: 'package-pop', duration: '500ms' },
  'face-smile': { recipe: 'grin', duration: '450ms', args: [1] },
  smile: { recipe: 'grin', duration: '450ms', args: [1.1] },
  'face-frown': { recipe: 'grin', duration: '600ms', args: [0.5] },
  language: { recipe: 'translate-flip', duration: '600ms' },
  share: { recipe: 'share-cast', duration: '450ms' },
  'viewfinder-circle': { recipe: 'focus-lock', duration: '450ms' },
  'bug-ant': { recipe: 'crawl', duration: '500ms' },
  lifebuoy: { recipe: 'float', duration: '1200ms' },
  'adjustments-horizontal': { recipe: 'slider-pins', duration: '600ms', args: ['x'] },
  'adjustments-vertical': { recipe: 'slider-pins', duration: '600ms', args: ['y'] },

  // Directed batch 2026-08-18 (first 15 catalog icons)
  'arrow-down-left': { recipe: 'draw-drift', duration: '700ms', args: ['-2.5px', '2.5px', [1], [2, 3], 3, false] },
  'arrow-down-right': { recipe: 'draw-drift', duration: '700ms', args: ['2.5px', '2.5px', [1], [2, 3], 3, false] },
  'arrow-down-circle': { recipe: 'arrow-in-circle', duration: '760ms', args: [[1, 2], [3], 4, '0', '-3px'] },
  'arrow-left-circle': { recipe: 'arrow-in-circle', duration: '760ms', args: [[1, 2], [3], 4, '3px', '0'] },
  'arrow-right-circle': { recipe: 'arrow-in-circle', duration: '760ms', args: [[1, 2], [3], 4, '-3px', '0'] },
  'arrow-down-tray': { recipe: 'arrow-into-receiver', duration: '700ms', args: [[2, 3], [4], 4, [1], '-4px', [1], true] },

  // Misc
  'ellipsis-horizontal': { recipe: 'ellipsis-pulse', duration: '600ms' },
  'ellipsis-vertical': { recipe: 'ellipsis-pulse', duration: '600ms' },
  'ellipsis-horizontal-circle': { recipe: 'ellipsis-pulse', duration: '600ms' },
  'more-vertical': { recipe: 'ellipsis-pulse', duration: '600ms' },
  'qr-code': { recipe: 'scan', duration: '700ms' },
  eye: { recipe: 'blink', duration: '450ms' },
  'eye-slash': { recipe: 'blink', duration: '500ms' },
  'eye-dropper': { recipe: 'drip', duration: '500ms' },
  link: { recipe: 'draw-underline', duration: '500ms' },
  'link-slash': { recipe: 'draw-strikethrough', duration: '500ms' },
};

/**
 * Fallback pattern-based animations for icons without a specific recipe.
 * @type {Array<{ match: (n: string) => boolean, recipe: keyof RECIPES, duration?: string, args?: unknown[] }>}
 */
export const FALLBACK_ANIMATIONS = [
  // Editor / text
  { match: n => n === 'underline', recipe: 'draw-underline', duration: '400ms' },
  { match: n => n === 'strikethrough' || n === 'slash', recipe: 'draw-strikethrough', duration: '400ms' },
  { match: n => n === 'pencil' || n === 'pencil-square' || n.includes('edit') || n === 'paint-brush', recipe: 'scribble', duration: '500ms' },
  { match: n => n === 'bold' || n === 'italic' || n.startsWith('h1') || n.startsWith('h2') || n.startsWith('h3') || n.includes('list') || n.includes('align') || n.includes('text') || n.includes('font') || n === 'code-bracket' || n === 'code-bracket-square' || n === 'terminal' || n === 'hashtag' || n === 'variable' || n === 'command-line' || n === 'at-symbol' || n === 'calculator' || n === 'backspace', recipe: 'typewriter', duration: '500ms' },

  // Checks / crosses
  { match: n => n === 'check' || n.includes('check') || n.includes('tick'), recipe: 'draw-scale', duration: '420ms' },
  { match: n => n === 'x' || n === 'x-mark' || n.includes('cross') || n.includes('close'), recipe: 'draw-scale', duration: '420ms' },

  // Arrows (more specific directional recipes first)
  { match: n => n.includes('arrow-turn') || n.includes('arrow-uturn') || n.includes('arrow-path') || n.includes('refresh') || n.includes('reload') || n.includes('sync'), recipe: 'spin', duration: '900ms' },
  { match: n => n === 'arrow-down-tray' || n === 'download' || n.includes('cloud-arrow-down'), recipe: 'download-arrow', duration: '550ms' },
  { match: n => n === 'arrow-up-tray' || n === 'upload' || n.includes('cloud-arrow-up'), recipe: 'upload-arrow', duration: '550ms' },
  { match: n => n.includes('arrow-right') || n.includes('arrow-long-right') || n === 'chevron-right' || n === 'forward', recipe: 'slide-right' },
  { match: n => n.includes('arrow-left') || n.includes('arrow-long-left') || n === 'chevron-left' || n === 'backward', recipe: 'slide-left' },
  { match: n => n.includes('arrow-up') || n.includes('arrow-long-up') || n === 'chevron-up', recipe: 'slide-up' },
  { match: n => n.includes('arrow-down') || n.includes('arrow-long-down') || n === 'chevron-down', recipe: 'slide-down' },
  { match: n => n.includes('external-link') || n === 'arrow-top-right-on-square' || n.includes('arrow-small'), recipe: 'arrow-bounce', duration: '500ms' },

  // Math / actions
  { match: n => n.includes('plus') || n.includes('add') || n.includes('crosshair') || n === 'scissors', recipe: 'rotate-once', args: [180] },
  { match: n => n.includes('minus') || n.includes('dash') || n.includes('remove') || n === 'divide' || n === 'equals', recipe: 'stretch-x' },

  // Communication
  { match: n => n.includes('mail') || n.includes('envelope'), recipe: 'open-envelope', duration: '500ms' },
  { match: n => n === 'send' || n.includes('paper-airplane'), recipe: 'send-plane', duration: '550ms' },
  { match: n => n.includes('chat') || n.includes('message') || n === 'chat-bubble-oval-left' || n === 'chat-bubble-oval-left-ellipsis', recipe: 'bubble-pop', duration: '450ms' },
  { match: n => n.includes('phone') || n === 'device-phone-mobile', recipe: 'phone-vibrate', duration: '450ms' },
  { match: n => n === 'megaphone', recipe: 'shout', duration: '500ms' },
  { match: n => n === 'rss', recipe: 'wave', duration: '600ms' },

  // Feedback / social
  { match: n => n.includes('heart') || n.includes('like') || n.includes('star') || n.includes('fav'), recipe: 'beat' },
  { match: n => n === 'hand-thumb-up', recipe: 'thumbs-up', duration: '500ms' },
  { match: n => n === 'hand-thumb-down', recipe: 'thumbs-down', duration: '500ms' },
  { match: n => n.includes('bell'), recipe: 'ring', duration: '500ms' },
  { match: n => n.includes('exclamation') || n.includes('warning') || n.includes('question') || n === 'alert-circle' || n === 'info' || n === 'information-circle', recipe: 'wiggle', duration: '450ms' },
  { match: n => n === 'no-symbol' || n === 'hand-raised' || n === 'bug-ant', recipe: 'no-shake', duration: '450ms' },
  { match: n => n.includes('smile') || n.includes('frown'), recipe: 'grin', duration: '450ms' },

  // Media
  { match: n => n.includes('play') || n.includes('pause') || n === 'stop' || n === 'stop-circle', recipe: 'play-morph', duration: '400ms' },
  { match: n => n === 'camera' || n === 'photo' || n === 'image', recipe: 'shutter', duration: '450ms' },
  { match: n => n.includes('video') || n === 'film', recipe: 'film-roll', duration: '700ms' },
  { match: n => n === 'musical-note' || n === 'play-pause', recipe: 'music-beat', duration: '500ms' },
  { match: n => n === 'microphone', recipe: 'microphone-pulse', duration: '500ms' },

  // System / theme
  { match: n => n === 'sun' || n === 'fire' || n === 'zap' || n === 'bolt' || n === 'bolt-slash' || n === 'sparkles' || n === 'light-bulb' || n === 'cake' || n === 'power', recipe: 'glow', duration: '700ms' },
  { match: n => n === 'moon', recipe: 'moon-wobble', duration: '800ms' },
  { match: n => n.includes('wifi') || n.includes('signal') || n.includes('battery'), recipe: 'wave', duration: '600ms' },
  { match: n => n === 'cpu-chip' || n === 'command-line' || n.includes('chip'), recipe: 'core-pulse', duration: '500ms' },
  { match: n => n === 'radio', recipe: 'emit', duration: '600ms' },
  { match: n => n === 'qr-code', recipe: 'scan', duration: '700ms' },

  // Content / files
  { match: n => n.includes('folder'), recipe: 'folder-pop', duration: '450ms' },
  { match: n => n.includes('file') || n.includes('document') || n.includes('archive') || n === 'newspaper' || n.includes('clipboard') || n === 'identification', recipe: 'file-appear', duration: '500ms' },
  { match: n => n.includes('calendar'), recipe: 'calendar-flip', duration: '500ms' },
  { match: n => n.includes('bookmark'), recipe: 'bookmark-fold', duration: '450ms' },
  { match: n => n === 'clock', recipe: 'clock-tick', duration: '600ms' },
  { match: n => n === 'book-open', recipe: 'book-open', duration: '550ms' },
  { match: n => n === 'ticket', recipe: 'ticket-tear', duration: '500ms' },
  { match: n => n.includes('gift'), recipe: 'gift-unbox', duration: '550ms' },
  { match: n => n === 'inbox' || n === 'inbox-arrow-down' || n === 'inbox-stack', recipe: 'folder-pop', duration: '450ms' },

  // Security
  { match: n => n === 'lock-closed' || n === 'lock', recipe: 'lock-click', duration: '400ms' },
  { match: n => n === 'lock-open', recipe: 'unlock', duration: '500ms' },
  { match: n => n === 'key', recipe: 'rotate-once', duration: '500ms', args: [90] },
  { match: n => n.includes('shield'), recipe: 'core-pulse', duration: '450ms' },
  { match: n => n === 'finger-print', recipe: 'tap', duration: '400ms' },

  // Users
  { match: n => n.includes('user') || n.includes('person') || n.includes('profile') || n.includes('avatar'), recipe: 'bounce', duration: '450ms' },

  // Commerce
  { match: n => n === 'shopping-cart', recipe: 'cart-roll', duration: '550ms' },
  { match: n => n === 'shopping-bag', recipe: 'bounce', duration: '450ms' },
  { match: n => n === 'credit-card', recipe: 'credit-card-swipe', duration: '500ms' },
  { match: n => n === 'banknotes' || n.includes('currency-'), recipe: 'banknote-flutter', duration: '600ms' },
  { match: n => n === 'truck', recipe: 'truck-move', duration: '600ms' },
  { match: n => n === 'wallet' || n === 'tag' || n === 'percent-badge' || n === 'receipt-percent' || n === 'receipt-refund' || n === 'scale', recipe: 'pulse-scale', duration: '450ms' },

  // Charts
  { match: n => n.includes('chart-bar') || n.includes('presentation-chart') || n === 'chart-bar-square', recipe: 'chart-grow', duration: '600ms' },
  { match: n => n === 'chart-pie', recipe: 'chart-pie-slice', duration: '600ms' },

  // Objects / tools
  { match: n => n === 'trash', recipe: 'trash-lid', duration: '450ms' },
  { match: n => n === 'copy' || n === 'document-duplicate', recipe: 'copy-offset', duration: '450ms' },
  { match: n => n === 'cog' || n === 'cog-6-tooth' || n === 'cog-8-tooth' || n === 'settings', recipe: 'rotate-once', duration: '700ms', args: [180] },
  { match: n => n === 'rocket-launch', recipe: 'rocket-launch', duration: '700ms' },
  { match: n => n === 'globe' || n === 'globe-alt' || n.includes('globe-'), recipe: 'globe-spin', duration: '900ms' },
  { match: n => n === 'flag', recipe: 'flag-wave', duration: '600ms' },
  { match: n => n === 'map-pin', recipe: 'pin-drop', duration: '500ms' },
  { match: n => n === 'trophy', recipe: 'trophy-shine', duration: '600ms' },
  { match: n => n === 'beaker', recipe: 'wiggle', duration: '450ms' },
  { match: n => n === 'cube' || n === 'cube-transparent' || n === 'puzzle-piece' || n === 'wrench' || n === 'wrench-screwdriver' || n === 'paper-clip' || n === 'paperclip', recipe: 'rotate-once', args: [180] },
  { match: n => n === 'printer', recipe: 'file-appear', duration: '500ms' },
  { match: n => n === 'device-tablet' || n === 'computer-desktop' || n === 'tv' || n === 'window', recipe: 'screen-on', duration: '450ms' },

  // Navigation / layout
  { match: n => n === 'home' || n === 'home-modern', recipe: 'home-bounce', duration: '500ms' },
  { match: n => n.includes('menu') || n.includes('bars'), recipe: 'menu-morph', duration: '400ms' },
  { match: n => n.includes('search') || n.includes('magnifying'), recipe: 'zoom', duration: '500ms' },
  { match: n => n.includes('ellipsis'), recipe: 'ellipsis-pulse', duration: '600ms' },
  { match: n => n.includes('grid') || n.includes('squares') || n === 'view-columns' || n === 'rectangle-group' || n === 'rectangle-stack' || n === 'square-2-stack' || n === 'square-3-stack-3d', recipe: 'cell-pop', duration: '450ms' },
  { match: n => n.includes('cursor') || n.includes('hand') || n.includes('finger') || n.includes('tap'), recipe: 'tap', duration: '400ms' },
  { match: n => n === 'eye' || n === 'eye-slash' || n === 'eye-dropper', recipe: 'blink', duration: '450ms' },
  { match: n => n === 'link' || n === 'link-slash', recipe: 'draw-underline', duration: '500ms' },

  // Cloud / weather
  { match: n => n.includes('cloud'), recipe: 'float', duration: '2000ms' },

  // Default
  { match: () => true, recipe: 'pulse-scale', duration: '500ms' },
];

/**
 * @param {string} name
 * @returns {{ recipe: keyof RECIPES, duration?: string, args?: unknown[] }}
 */
export function resolveAnimation(name) {
  const explicit = ICON_ANIMATIONS[name];
  if (explicit) return explicit;

  const n = name.toLowerCase();
  for (const fallback of FALLBACK_ANIMATIONS) {
    if (fallback.match(n)) {
      return { recipe: fallback.recipe, duration: fallback.duration, args: fallback.args };
    }
  }

  return { recipe: 'pulse-scale', duration: '500ms' };
}

/**
 * Build CSS and SVG mutation instructions for an icon.
 * @param {string} name
 * @returns {{ keyframes: string, base: string, animate: string, pathClasses: string[], pathLength: boolean }}
 */
export function buildAnimation(name) {
  const { recipe, duration, args = [] } = resolveAnimation(name);
  const builder = RECIPES[recipe];
  if (!builder) {
    throw new Error(`Unknown animation recipe "${recipe}" for icon "${name}"`);
  }
  return builder(name, duration, ...args);
}

/**
 * Add per-path classes to the inner SVG markup.
 * Only targets top-level <path>, <line>, <circle>, <rect>, <polyline>, <polygon>, <g> tags.
 * @param {string} innerSvg
 * @param {string[]} pathClasses
 * @returns {string}
 */
export function applyPathClasses(innerSvg, pathClasses) {
  if (!pathClasses || pathClasses.length === 0) return innerSvg;

  // Strip previously applied path classes first: custom icons are re-emitted
  // from their committed (already-classed) markup, so without this every
  // regeneration would append another duplicate set of lmn-path-N classes.
  const stripped = innerSvg
    .replace(/class="([^"]*)"/g, (match, classes) => {
      const kept = classes.split(/\s+/).filter(c => !/^lmn-path-\d+$/.test(c));
      return kept.length ? `class="${kept.join(' ')}"` : '';
    })
    .replace(/ {2,}/g, ' ');

  const tagPattern = /<(path|line|circle|rect|polyline|polygon|g)\b([^>]*)>/gi;
  let index = 0;

  return stripped.replace(tagPattern, (match, tag, attrs) => {
    if (index >= pathClasses.length) return match;
    const cls = pathClasses[index++];
    const classMatch = attrs.match(/class="([^"]*)"/);
    const selfClosing = /\/\s*$/.test(attrs);
    const cleanAttrs = attrs.replace(/\/\s*$/, '');
    if (classMatch) {
      const newAttrs = cleanAttrs.replace(classMatch[0], `class="${classMatch[1]} ${cls}"`);
      return selfClosing ? `<${tag}${newAttrs}/>` : `<${tag}${newAttrs}>`;
    }
    return selfClosing
      ? `<${tag} class="${cls}"${cleanAttrs}/>`
      : `<${tag} class="${cls}"${cleanAttrs}>`;
  });
}

/**
 * Add pathLength="1" to all <path>, <line>, <circle>, <rect>, <polyline>, <polygon> tags.
 * @param {string} innerSvg
 * @returns {string}
 */
export function applyPathLength(innerSvg) {
  const tagPattern = /<(path|line|circle|rect|polyline|polygon)\b([^>]*)>/gi;
  return innerSvg.replace(tagPattern, (match, tag, attrs) => {
    if (/\bpathLength=/.test(attrs)) return match;
    const selfClosing = /\/\s*$/.test(attrs);
    const cleanAttrs = attrs.replace(/\/\s*$/, '');
    return selfClosing
      ? `<${tag}${cleanAttrs} pathLength="1"/>`
      : `<${tag}${cleanAttrs} pathLength="1">`;
  });
}

/**
 * Split a path `d` into its subpaths (one per M/m command group). Non-initial
 * subpaths starting with a relative `m` are converted to absolute `M` so each
 * piece renders identically on its own. A current-point tracker computes the
 * absolute start from the preceding commands' endpoints.
 * @param {string} d
 * @returns {string[]}
 */
function splitPathData(d) {
  const tokens = [];
  const re = /([a-zA-Z])([^a-zA-Z]*)/g;
  let m;
  while ((m = re.exec(d)) !== null) {
    const nums = (m[2].match(/-?(?:\d*\.\d+|\d+)(?:[eE][+-]?\d+)?/g) || []).map(Number);
    tokens.push({ cmd: m[1], nums });
  }
  if (tokens.length === 0) return [d];

  const pieces = [];
  let current = [];
  let cx = 0, cy = 0, sx = 0, sy = 0;
  const flush = () => {
    if (current.length > 0) {
      pieces.push(current);
      current = [];
    }
  };

  for (let token of tokens) {
    const { cmd } = token;
    let { nums } = token;
    let implicitLineNums = null;
    if ((cmd === 'M' || cmd === 'm') && current.length > 0) {
      flush();
      if (cmd === 'm') {
        // The first pair of a relative moveto becomes an absolute M for the
        // new standalone path. Subsequent pairs are implicit relative lineto
        // commands, so they must remain relative; retaining them on M would
        // reinterpret them as absolute coordinates and distort the SVG.
        implicitLineNums = nums.slice(2);
        token = { cmd: 'M', nums: [cx + nums[0], cy + nums[1]] };
        nums = token.nums;
      }
    }
    current.push(token);

    // Advance the current point through this token's endpoint. Note: `rel` must
    // be derived from the (possibly converted) token, not the original command —
    // a converted `m` already carries absolute coordinates.
    const upper = token.cmd.toUpperCase();
    const rel = token.cmd !== upper;
    if (upper === 'M') {
      cx = rel ? cx + nums[0] : nums[0];
      cy = rel ? cy + nums[1] : nums[1];
      sx = cx;
      sy = cy;
      for (let i = 2; i + 1 < nums.length; i += 2) {
        cx = rel ? cx + nums[i] : nums[i];
        cy = rel ? cy + nums[i + 1] : nums[i + 1];
      }
    } else if (upper === 'Z') {
      cx = sx;
      cy = sy;
    } else if (upper === 'H') {
      cx = rel ? cx + nums[nums.length - 1] : nums[nums.length - 1];
    } else if (upper === 'V') {
      cy = rel ? cy + nums[nums.length - 1] : nums[nums.length - 1];
    } else if (nums.length >= 2) {
      // L/l, C/c, S/s, Q/q, T/t, A/a — endpoint is the last coordinate pair.
      cx = rel ? cx + nums[nums.length - 2] : nums[nums.length - 2];
      cy = rel ? cy + nums[nums.length - 1] : nums[nums.length - 1];
    }

    // Additional moveto coordinate pairs are implicit lineto commands. Keep
    // them as a relative `l` in split output when this was a converted `m`.
    if (implicitLineNums?.length) {
      const line = { cmd: 'l', nums: implicitLineNums };
      current.push(line);
      for (let i = 0; i + 1 < line.nums.length; i += 2) {
        cx += line.nums[i];
        cy += line.nums[i + 1];
      }
    }
  }
  flush();

  return pieces.map(piece =>
    piece.map(t => t.cmd + (t.nums.length ? t.nums.join(' ') : '')).join(' '),
  );
}

/**
 * Split every compound <path> in the SVG markup into one element per subpath.
 * Idempotent: paths with a single subpath are left untouched.
 * @param {string} innerSvg
 * @returns {string}
 */
export function splitSubpaths(innerSvg) {
  return innerSvg.replace(/<path\b([^>]*?)\/?>/g, (match, attrs) => {
    const dMatch = attrs.match(/\sd="([^"]*)"/);
    if (!dMatch) return match;
    const pieces = splitPathData(dMatch[1]);
    if (pieces.length < 2) return match;
    const otherAttrs = attrs.replace(dMatch[0], '').replace(/\/\s*$/, '');
    return pieces.map(piece => `<path${otherAttrs} d="${piece}"/>`).join('');
  });
}

/**
 * Reverse one straight SVG path, returning null for paths outside the narrow
 * forms generated for arrow shafts. Output uses absolute moveto/lineto values.
 * @param {string} d
 * @returns {string | null}
 */
function reverseStraightPathData(d) {
  const number = '(-?(?:\\d*\\.\\d+|\\d+))';
  const moveLine = new RegExp(`^([Mm])${number} ${number} ${number} ${number}$`);
  const axisLine = new RegExp(`^([Mm])${number} ${number} ([HhVv])${number}$`);
  const lineMatch = d.match(moveLine);
  if (lineMatch) {
    const [, command, startX, startY, nextX, nextY] = lineMatch;
    const sx = Number(startX);
    const sy = Number(startY);
    const ex = command === 'm' ? sx + Number(nextX) : Number(nextX);
    const ey = command === 'm' ? sy + Number(nextY) : Number(nextY);
    return `M${ex} ${ey} L${sx} ${sy}`;
  }

  const axisMatch = d.match(axisLine);
  if (!axisMatch) return null;
  const [, command, startX, startY, axis, value] = axisMatch;
  const sx = Number(startX);
  const sy = Number(startY);
  const relative = axis === axis.toLowerCase();
  const endX = axis.toLowerCase() === 'h' ? (relative ? sx + Number(value) : Number(value)) : sx;
  const endY = axis.toLowerCase() === 'v' ? (relative ? sy + Number(value) : Number(value)) : sy;
  return `M${endX} ${endY} L${sx} ${sy}`;
}

/**
 * Reverse selected split straight paths, identified by their generated class.
 * @param {string} innerSvg
 * @param {number[]} pathIndices
 * @returns {string}
 */
export function reverseStraightPaths(innerSvg, pathIndices) {
  const targetClasses = new Set(pathIndices.map((index) => `lmn-path-${index}`));
  return innerSvg.replace(/<path\b([^>]*?)\sd="([^"]*)"([^>]*)\/?>(?:<\/path>)?/g, (match, before, d, after) => {
    const classMatch = before.match(/\bclass="([^"]*)"/);
    if (!classMatch || !classMatch[1].split(/\s+/).some((name) => targetClasses.has(name))) return match;
    const reversed = reverseStraightPathData(d);
    return reversed ? match.replace(`d="${d}"`, `d="${reversed}"`) : match;
  });
}

/**
 * Compose the final styles block for an icon component.
 * @param {string} name
 * @param {ReturnType<buildAnimation>} animation
 * @returns {string}
 */
export function composeStyles(name, animation) {
  const raw = [
    animation.keyframes.trim(),
    animateBase.trim(),
    animation.base.trim(),
    animation.animate.trim(),
    prefersReducedMotion.trim(),
  ]
    .filter(Boolean)
    .join('\n\n    ');

  // Angular component styles are view-encapsulated. The .lmn-animate class is
  // applied to the host element, so selectors must use :host(.lmn-animate)
  // to target the icon when animation is enabled. Variant markers let recipes
  // scope CSS to one variant: .lmn-animate--outline / .lmn-animate--filled.
  const placeholderEl = '__LMN_ANIMATE_EL__';
  const placeholderFilled = '__LMN_ANIMATE_FILLED__';
  const placeholderOutline = '__LMN_ANIMATE_OUTLINE__';
  return raw
    .replace(/\.lmn-animate-el/g, placeholderEl)
    .replace(/\.lmn-animate--filled/g, placeholderFilled)
    .replace(/\.lmn-animate--outline/g, placeholderOutline)
    .replace(/\.lmn-animate/g, ':host(.lmn-animate)')
    .replace(new RegExp(placeholderEl, 'g'), ':host(.lmn-animate) .lmn-animate-el')
    .replace(new RegExp(placeholderFilled, 'g'), ':host(.lmn-animate.lmn-filled)')
    .replace(new RegExp(placeholderOutline, 'g'), ':host(.lmn-animate:not(.lmn-filled))');
}
