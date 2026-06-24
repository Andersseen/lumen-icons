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
};

/**
 * Per-icon animation map.
 * @type {Record<string, { recipe: keyof RECIPES, duration?: string, args?: unknown[] }>}
 */
export const ICON_ANIMATIONS = {
  // Actions
  check: { recipe: 'draw-scale', duration: '420ms' },
  'check-circle': { recipe: 'draw-scale', duration: '500ms' },
  'check-badge': { recipe: 'draw-scale', duration: '500ms' },
  'x-mark': { recipe: 'draw-scale', duration: '420ms' },
  x: { recipe: 'draw-scale', duration: '420ms' },
  plus: { recipe: 'rotate-once', duration: '450ms', args: [180] },
  'plus-circle': { recipe: 'rotate-once', duration: '450ms', args: [180] },
  'plus-small': { recipe: 'rotate-once', duration: '400ms', args: [180] },
  minus: { recipe: 'stretch-x', duration: '400ms' },
  'minus-circle': { recipe: 'stretch-x', duration: '400ms' },
  'minus-small': { recipe: 'stretch-x', duration: '350ms' },
  copy: { recipe: 'copy-offset', duration: '450ms' },
  'clipboard-document-check': { recipe: 'copy-offset', duration: '450ms' },
  trash: { recipe: 'shake', duration: '500ms' },
  'arrow-path': { recipe: 'spin', duration: '900ms' },
  'arrow-path-rounded-square': { recipe: 'spin', duration: '900ms' },
  'refresh-cw': { recipe: 'spin', duration: '800ms' },
  loader: { recipe: 'spin-infinite', duration: '800ms' },
  cog: { recipe: 'rotate-once', duration: '700ms', args: [180] },
  'cog-6-tooth': { recipe: 'rotate-once', duration: '700ms', args: [180] },
  'cog-8-tooth': { recipe: 'rotate-once', duration: '700ms', args: [180] },
  settings: { recipe: 'rotate-once', duration: '700ms', args: [180] },

  // Navigation
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
  'arrow-top-right-on-square': { recipe: 'slide-right', duration: '450ms' },
  'external-link': { recipe: 'slide-right', duration: '450ms' },
  home: { recipe: 'bounce', duration: '450ms' },
  'home-modern': { recipe: 'bounce', duration: '450ms' },
  menu: { recipe: 'menu-morph', duration: '400ms' },
  'bars-3': { recipe: 'menu-morph', duration: '400ms' },
  'bars-2': { recipe: 'menu-morph', duration: '400ms' },
  'bars-4': { recipe: 'menu-morph', duration: '400ms' },

  // Communication
  search: { recipe: 'search', duration: '650ms' },
  'magnifying-glass': { recipe: 'search', duration: '650ms' },
  mail: { recipe: 'fly', duration: '500ms' },
  envelope: { recipe: 'fly', duration: '500ms' },
  send: { recipe: 'fly', duration: '500ms' },
  'paper-airplane': { recipe: 'fly', duration: '500ms' },

  // Feedback
  heart: { recipe: 'beat', duration: '600ms' },
  star: { recipe: 'beat', duration: '550ms' },
  bell: { recipe: 'swing', duration: '500ms' },
  'bell-alert': { recipe: 'swing', duration: '500ms' },
  'bell-slash': { recipe: 'swing', duration: '500ms' },
  'bell-snooze': { recipe: 'swing', duration: '500ms' },
  'exclamation-circle': { recipe: 'pulse-scale', duration: '450ms' },
  'exclamation-triangle': { recipe: 'pulse-scale', duration: '450ms' },
  'question-mark-circle': { recipe: 'pulse-scale', duration: '450ms' },
  'no-symbol': { recipe: 'pulse-scale', duration: '450ms' },

  // Media
  play: { recipe: 'pulse-scale', duration: '450ms' },
  'play-circle': { recipe: 'pulse-scale', duration: '450ms' },
  pause: { recipe: 'pulse-scale', duration: '400ms' },
  'pause-circle': { recipe: 'pulse-scale', duration: '400ms' },
  camera: { recipe: 'flash', duration: '450ms' },
  video: { recipe: 'pulse-scale', duration: '450ms' },
  'video-camera': { recipe: 'pulse-scale', duration: '450ms' },
  image: { recipe: 'pulse-scale', duration: '450ms' },
  photo: { recipe: 'pulse-scale', duration: '450ms' },

  // System / Theme
  sun: { recipe: 'sun-rays', duration: '600ms' },
  moon: { recipe: 'moon-wobble', duration: '800ms' },

  // Content
  download: { recipe: 'slide-down', duration: '500ms' },
  'cloud-arrow-down': { recipe: 'slide-down', duration: '500ms' },
  'arrow-down-tray': { recipe: 'slide-down', duration: '500ms' },
  upload: { recipe: 'slide-up', duration: '500ms' },
  'cloud-arrow-up': { recipe: 'slide-up', duration: '500ms' },
  'arrow-up-tray': { recipe: 'slide-up', duration: '500ms' },
  folder: { recipe: 'bounce', duration: '450ms' },
  'folder-open': { recipe: 'bounce', duration: '450ms' },
  document: { recipe: 'bounce', duration: '450ms' },
  file: { recipe: 'bounce', duration: '450ms' },
  calendar: { recipe: 'bounce', duration: '450ms' },
  bookmark: { recipe: 'bounce', duration: '450ms' },

  // Security
  lock: { recipe: 'shake', duration: '450ms' },
  'lock-closed': { recipe: 'shake', duration: '450ms' },
  'lock-open': { recipe: 'shake', duration: '450ms' },
  key: { recipe: 'rotate-once', duration: '500ms', args: [90] },
  shield: { recipe: 'pulse-scale', duration: '450ms' },
  'shield-check': { recipe: 'draw-scale', duration: '500ms' },

  // Users
  user: { recipe: 'pulse-scale', duration: '450ms' },
  users: { recipe: 'pulse-scale', duration: '450ms' },
  'user-circle': { recipe: 'pulse-scale', duration: '450ms' },
};

/**
 * Fallback pattern-based animations for icons without a specific recipe.
 * @type {Array<{ match: (n: string) => boolean, recipe: keyof RECIPES, duration?: string, args?: unknown[] }>}
 */
export const FALLBACK_ANIMATIONS = [
  { match: n => n === 'check' || n.includes('check') || n.includes('tick'), recipe: 'draw-scale', duration: '420ms' },
  { match: n => n === 'x' || n === 'x-mark' || n.includes('cross') || n.includes('close'), recipe: 'draw-scale', duration: '420ms' },
  { match: n => n.includes('arrow-right') || n.includes('arrow-long-right') || n === 'chevron-right' || n.includes('external-link'), recipe: 'slide-right' },
  { match: n => n.includes('arrow-left') || n.includes('arrow-long-left') || n === 'chevron-left', recipe: 'slide-left' },
  { match: n => n.includes('arrow-up') || n.includes('arrow-long-up') || n === 'chevron-up' || n.includes('upload'), recipe: 'slide-up' },
  { match: n => n.includes('arrow-down') || n.includes('arrow-long-down') || n === 'chevron-down' || n.includes('download'), recipe: 'slide-down' },
  { match: n => n.includes('arrow-turn') || n.includes('arrow-uturn') || n.includes('arrow-path') || n.includes('refresh') || n.includes('reload') || n.includes('rotate') || n.includes('sync'), recipe: 'spin', duration: '900ms' },
  { match: n => n.includes('cog') || n.includes('settings') || n.includes('gear'), recipe: 'rotate-once', duration: '700ms', args: [180] },
  { match: n => n.includes('heart') || n.includes('like') || n.includes('thumb') || n.includes('star') || n.includes('fav'), recipe: 'beat' },
  { match: n => n.includes('bell') || n.includes('alert') || n.includes('warning') || n.includes('exclamation') || n.includes('question'), recipe: 'swing' },
  { match: n => n.includes('sun') || n.includes('sparkle') || n.includes('bolt') || n.includes('fire') || n.includes('zap'), recipe: 'pulse-scale' },
  { match: n => n.includes('moon') || n.includes('night'), recipe: 'moon-wobble' },
  { match: n => n.includes('minus') || n.includes('dash') || n.includes('remove'), recipe: 'stretch-x' },
  { match: n => n.includes('plus') || n.includes('add') || n.includes('crosshair'), recipe: 'rotate-once', args: [180] },
  { match: n => n.includes('trash') || n.includes('delete') || n.includes('bin'), recipe: 'shake' },
  { match: n => n.includes('lock') || n.includes('key') || n.includes('shield') || n.includes('security'), recipe: 'shake' },
  { match: n => n.includes('mail') || n.includes('message') || n.includes('chat') || n.includes('envelope') || n.includes('send') || n.includes('paper-airplane'), recipe: 'fly' },
  { match: n => n.includes('user') || n.includes('person') || n.includes('profile') || n.includes('avatar'), recipe: 'pulse-scale' },
  { match: n => n.includes('folder') || n.includes('file') || n.includes('document') || n.includes('archive') || n.includes('calendar') || n.includes('clock') || n.includes('bookmark'), recipe: 'bounce' },
  { match: n => n.includes('camera') || n.includes('video') || n.includes('photo') || n.includes('image') || n.includes('picture'), recipe: 'pulse-scale' },
  { match: n => n.includes('play') || n.includes('pause') || n.includes('stop') || n.includes('media'), recipe: 'pulse-scale' },
  { match: n => n.includes('home'), recipe: 'bounce' },
  { match: n => n.includes('menu') || n.includes('bars'), recipe: 'menu-morph' },
  { match: n => n.includes('search') || n.includes('magnifying'), recipe: 'search' },
  { match: n => n === true, recipe: 'pulse-scale', duration: '500ms' },
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
