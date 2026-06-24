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
  plus: { recipe: 'rotate-once', duration: '450ms', args: [180] },
  'plus-circle': { recipe: 'rotate-once', duration: '450ms', args: [180] },
  'plus-small': { recipe: 'rotate-once', duration: '400ms', args: [180] },
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
  'arrow-path': { recipe: 'spin', duration: '900ms' },
  'arrow-path-rounded-square': { recipe: 'spin', duration: '900ms' },
  'refresh-cw': { recipe: 'spin', duration: '800ms' },

  // Settings / tools
  cog: { recipe: 'rotate-once', duration: '700ms', args: [180] },
  'cog-6-tooth': { recipe: 'rotate-once', duration: '700ms', args: [180] },
  'cog-8-tooth': { recipe: 'rotate-once', duration: '700ms', args: [180] },
  settings: { recipe: 'rotate-once', duration: '700ms', args: [180] },
  scissors: { recipe: 'rotate-once', duration: '500ms', args: [180] },
  wrench: { recipe: 'rotate-once', duration: '500ms', args: [180] },
  'wrench-screwdriver': { recipe: 'rotate-once', duration: '500ms', args: [180] },
  'paper-clip': { recipe: 'rotate-once', duration: '500ms', args: [180] },
  paperclip: { recipe: 'rotate-once', duration: '500ms', args: [180] },
  'puzzle-piece': { recipe: 'rotate-once', duration: '500ms', args: [180] },
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
  'alert-circle': { recipe: 'wiggle', duration: '450ms' },
  info: { recipe: 'wiggle', duration: '450ms' },
  'information-circle': { recipe: 'wiggle', duration: '450ms' },
  'no-symbol': { recipe: 'no-shake', duration: '450ms' },

  // Arrows
  'arrow-right': { recipe: 'slide-right', duration: '400ms' },
  'arrow-long-right': { recipe: 'slide-right', duration: '400ms' },
  'arrow-small-right': { recipe: 'slide-right', duration: '350ms', args: ['4px'] },
  'chevron-right': { recipe: 'slide-right', duration: '350ms', args: ['4px'] },
  'arrow-left': { recipe: 'slide-left', duration: '400ms' },
  'arrow-long-left': { recipe: 'slide-left', duration: '400ms' },
  'arrow-small-left': { recipe: 'slide-left', duration: '350ms', args: ['4px'] },
  'chevron-left': { recipe: 'slide-left', duration: '350ms', args: ['4px'] },
  'arrow-up': { recipe: 'slide-up', duration: '400ms' },
  'arrow-long-up': { recipe: 'slide-up', duration: '400ms' },
  'arrow-small-up': { recipe: 'slide-up', duration: '350ms', args: ['4px'] },
  'chevron-up': { recipe: 'slide-up', duration: '350ms', args: ['4px'] },
  'arrow-down': { recipe: 'slide-down', duration: '400ms' },
  'arrow-long-down': { recipe: 'slide-down', duration: '400ms' },
  'arrow-small-down': { recipe: 'slide-down', duration: '350ms', args: ['4px'] },
  'chevron-down': { recipe: 'slide-down', duration: '350ms', args: ['4px'] },

  // Transfer arrows
  'arrow-top-right-on-square': { recipe: 'arrow-bounce', duration: '500ms', args: ['5px'] },
  'external-link': { recipe: 'arrow-bounce', duration: '500ms', args: ['5px'] },
  'arrow-down-tray': { recipe: 'download-arrow', duration: '550ms' },
  download: { recipe: 'download-arrow', duration: '550ms' },
  'cloud-arrow-down': { recipe: 'download-arrow', duration: '550ms' },
  'arrow-up-tray': { recipe: 'upload-arrow', duration: '550ms' },
  upload: { recipe: 'upload-arrow', duration: '550ms' },
  'cloud-arrow-up': { recipe: 'upload-arrow', duration: '550ms' },

  // Navigation
  home: { recipe: 'home-bounce', duration: '500ms' },
  'home-modern': { recipe: 'home-bounce', duration: '500ms' },
  menu: { recipe: 'menu-morph', duration: '400ms' },
  'bars-3': { recipe: 'menu-morph', duration: '400ms' },
  'bars-2': { recipe: 'menu-morph', duration: '400ms' },
  'bars-4': { recipe: 'menu-morph', duration: '400ms' },

  // Communication
  mail: { recipe: 'open-envelope', duration: '500ms' },
  envelope: { recipe: 'open-envelope', duration: '500ms' },
  'envelope-open': { recipe: 'open-envelope', duration: '500ms' },
  send: { recipe: 'send-plane', duration: '550ms' },
  'paper-airplane': { recipe: 'send-plane', duration: '550ms' },
  'chat-bubble-bottom-center': { recipe: 'pulse-scale', duration: '450ms' },
  'chat-bubble-bottom-center-text': { recipe: 'pulse-scale', duration: '450ms' },
  'chat-bubble-left': { recipe: 'pulse-scale', duration: '450ms' },
  'chat-bubble-left-ellipsis': { recipe: 'pulse-scale', duration: '450ms' },
  'chat-bubble-left-right': { recipe: 'pulse-scale', duration: '450ms' },
  'chat-bubble-oval-left': { recipe: 'pulse-scale', duration: '450ms' },
  'chat-bubble-oval-left-ellipsis': { recipe: 'pulse-scale', duration: '450ms' },
  'message-circle': { recipe: 'pulse-scale', duration: '450ms' },
  megaphone: { recipe: 'pulse-scale', duration: '450ms' },
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
  'battery-0': { recipe: 'wave', duration: '600ms' },
  'battery-50': { recipe: 'wave', duration: '600ms' },
  'battery-100': { recipe: 'wave', duration: '600ms' },

  // Code / terminal
  'code-bracket': { recipe: 'typewriter', duration: '500ms' },
  'code-bracket-square': { recipe: 'typewriter', duration: '500ms' },
  terminal: { recipe: 'typewriter', duration: '500ms' },
  'command-line': { recipe: 'typewriter', duration: '500ms' },
  hashtag: { recipe: 'typewriter', duration: '500ms' },
  variable: { recipe: 'typewriter', duration: '500ms' },
  calculator: { recipe: 'typewriter', duration: '500ms' },
  'at-symbol': { recipe: 'typewriter', duration: '500ms' },
  'cpu-chip': { recipe: 'pulse-scale', duration: '450ms' },

  // Cloud / weather
  cloud: { recipe: 'float', duration: '2000ms' },
  'cloud-arrow-down': { recipe: 'float', duration: '2000ms' },
  'cloud-arrow-up': { recipe: 'float', duration: '2000ms' },

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
  document: { recipe: 'file-appear', duration: '500ms' },
  'document-text': { recipe: 'file-appear', duration: '500ms' },
  'document-check': { recipe: 'file-appear', duration: '500ms' },
  'document-plus': { recipe: 'file-appear', duration: '500ms' },
  'document-minus': { recipe: 'file-appear', duration: '500ms' },
  'document-arrow-up': { recipe: 'file-appear', duration: '500ms' },
  'document-arrow-down': { recipe: 'file-appear', duration: '500ms' },
  'document-chart-bar': { recipe: 'file-appear', duration: '500ms' },
  'document-magnifying-glass': { recipe: 'file-appear', duration: '500ms' },
  'document-duplicate': { recipe: 'copy-offset', duration: '450ms' },
  'archive-box': { recipe: 'file-appear', duration: '500ms' },
  'archive-box-arrow-down': { recipe: 'file-appear', duration: '500ms' },
  'archive-box-x-mark': { recipe: 'file-appear', duration: '500ms' },
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
  shield: { recipe: 'pulse-scale', duration: '450ms' },
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
  wallet: { recipe: 'pulse-scale', duration: '450ms' },
  tag: { recipe: 'pulse-scale', duration: '450ms' },
  'percent-badge': { recipe: 'pulse-scale', duration: '450ms' },
  'receipt-percent': { recipe: 'pulse-scale', duration: '450ms' },
  'receipt-refund': { recipe: 'pulse-scale', duration: '450ms' },
  scale: { recipe: 'rotate-once', duration: '500ms', args: [180] },

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
  'device-tablet': { recipe: 'pulse-scale', duration: '450ms' },
  'computer-desktop': { recipe: 'pulse-scale', duration: '450ms' },
  tv: { recipe: 'pulse-scale', duration: '450ms' },
  window: { recipe: 'pulse-scale', duration: '450ms' },

  // Interaction
  'cursor-arrow-rays': { recipe: 'tap', duration: '400ms' },
  'cursor-arrow-ripple': { recipe: 'tap', duration: '400ms' },
  'hand-raised': { recipe: 'tap', duration: '400ms' },
  'finger-print': { recipe: 'tap', duration: '400ms' },

  // Misc
  ellipsis: { recipe: 'ellipsis-pulse', duration: '600ms' },
  'ellipsis-horizontal': { recipe: 'ellipsis-pulse', duration: '600ms' },
  'ellipsis-vertical': { recipe: 'ellipsis-pulse', duration: '600ms' },
  'ellipsis-horizontal-circle': { recipe: 'ellipsis-pulse', duration: '600ms' },
  'qr-code': { recipe: 'scan', duration: '700ms' },
  eye: { recipe: 'pulse-scale', duration: '450ms' },
  'eye-slash': { recipe: 'pulse-scale', duration: '450ms' },
  'eye-dropper': { recipe: 'pulse-scale', duration: '450ms' },
  link: { recipe: 'pulse-scale', duration: '450ms' },
  'link-slash': { recipe: 'pulse-scale', duration: '450ms' },
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
  { match: n => n.includes('chat') || n.includes('message') || n === 'chat-bubble-oval-left' || n === 'chat-bubble-oval-left-ellipsis', recipe: 'pulse-scale', duration: '450ms' },
  { match: n => n.includes('phone') || n === 'device-phone-mobile', recipe: 'phone-vibrate', duration: '450ms' },
  { match: n => n === 'megaphone', recipe: 'pulse-scale', duration: '450ms' },
  { match: n => n === 'rss', recipe: 'wave', duration: '600ms' },

  // Feedback / social
  { match: n => n.includes('heart') || n.includes('like') || n.includes('star') || n.includes('fav'), recipe: 'beat' },
  { match: n => n === 'hand-thumb-up', recipe: 'thumbs-up', duration: '500ms' },
  { match: n => n === 'hand-thumb-down', recipe: 'thumbs-down', duration: '500ms' },
  { match: n => n.includes('bell') || n === 'lifebuoy', recipe: 'ring', duration: '500ms' },
  { match: n => n.includes('exclamation') || n.includes('warning') || n.includes('question') || n === 'alert-circle' || n === 'info' || n === 'information-circle', recipe: 'wiggle', duration: '450ms' },
  { match: n => n === 'no-symbol' || n === 'hand-raised' || n === 'bug-ant', recipe: 'no-shake', duration: '450ms' },
  { match: n => n.includes('smile') || n.includes('frown'), recipe: 'pulse-scale', duration: '450ms' },

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
  { match: n => n === 'cpu-chip' || n === 'command-line' || n.includes('chip'), recipe: 'pulse-scale', duration: '450ms' },
  { match: n => n === 'radio', recipe: 'pulse-scale', duration: '450ms' },
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
  { match: n => n.includes('shield'), recipe: 'pulse-scale', duration: '450ms' },
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
  { match: n => n === 'device-tablet' || n === 'computer-desktop' || n === 'tv' || n === 'window', recipe: 'pulse-scale', duration: '450ms' },

  // Navigation / layout
  { match: n => n === 'home' || n === 'home-modern', recipe: 'home-bounce', duration: '500ms' },
  { match: n => n.includes('menu') || n.includes('bars'), recipe: 'menu-morph', duration: '400ms' },
  { match: n => n.includes('search') || n.includes('magnifying'), recipe: 'zoom', duration: '500ms' },
  { match: n => n.includes('ellipsis'), recipe: 'ellipsis-pulse', duration: '600ms' },
  { match: n => n.includes('grid') || n.includes('squares') || n === 'view-columns' || n === 'rectangle-group' || n === 'rectangle-stack' || n === 'square-2-stack' || n === 'square-3-stack-3d', recipe: 'pulse-scale', duration: '450ms' },
  { match: n => n.includes('cursor') || n.includes('hand') || n.includes('finger') || n.includes('tap'), recipe: 'tap', duration: '400ms' },
  { match: n => n === 'eye' || n === 'eye-slash' || n === 'eye-dropper', recipe: 'pulse-scale', duration: '450ms' },
  { match: n => n === 'link' || n === 'link-slash', recipe: 'pulse-scale', duration: '450ms' },

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

  const tagPattern = /<(path|line|circle|rect|polyline|polygon|g)\b([^>]*)>/gi;
  let index = 0;

  return innerSvg.replace(tagPattern, (match, tag, attrs) => {
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
  // to target the icon when animation is enabled.
  const placeholder = '__LMN_ANIMATE_EL__';
  return raw
    .replace(/\.lmn-animate-el/g, placeholder)
    .replace(/\.lmn-animate/g, ':host(.lmn-animate)')
    .replace(new RegExp(placeholder, 'g'), ':host(.lmn-animate) .lmn-animate-el');
}
