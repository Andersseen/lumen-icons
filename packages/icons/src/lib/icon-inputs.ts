import type { LmnIconNumberInput, LmnIconSize, LmnIconSizeInput } from '../types/icon.types';

/**
 * Input transforms for the numeric icon inputs.
 *
 * They let static attributes (`size="14"`) type-check under `strictTemplates`
 * the way `numberAttribute` does, while still validating the value: an
 * invalid value falls back to the input's default and, in dev mode only,
 * logs a warning. Pure functions — no module-level side effects.
 */

export const LMN_ICON_SIZES: readonly LmnIconSize[] = [12, 14, 16, 20, 24, 32];

export const LMN_DEFAULT_SIZE: LmnIconSize = 24;
export const LMN_DEFAULT_STROKE_WIDTH = 2;
export const LMN_DEFAULT_PADDING = 0;

const NUMERIC = /^\s*[+-]?(\d+\.?\d*|\.\d+)\s*$/;

function warnInvalid(input: string, value: unknown, fallback: unknown, hint: string): void {
  if (typeof ngDevMode === 'undefined' || ngDevMode) {
    console.warn(
      `[lumen-icons] Invalid \`${input}\` value ${JSON.stringify(value)}; ` +
        `expected ${hint}. Falling back to ${JSON.stringify(fallback)}.`,
    );
  }
}

function toNumber(value: unknown): number {
  if (typeof value === 'number') return value;
  if (typeof value === 'string' && NUMERIC.test(value)) return Number(value);
  return Number.NaN;
}

/** `size`: one of {@link LMN_ICON_SIZES}, as a number or numeric string. */
export function lmnIconSizeAttribute(value: LmnIconSizeInput): LmnIconSize {
  const size = toNumber(value);
  if ((LMN_ICON_SIZES as readonly number[]).includes(size)) return size as LmnIconSize;
  warnInvalid('size', value, LMN_DEFAULT_SIZE, `one of ${LMN_ICON_SIZES.join(', ')}`);
  return LMN_DEFAULT_SIZE;
}

function toNonNegative(input: string, value: LmnIconNumberInput, fallback: number): number {
  const n = toNumber(value);
  if (Number.isFinite(n) && n >= 0) return n;
  warnInvalid(input, value, fallback, 'a non-negative number');
  return fallback;
}

/** `strokeWidth`: a non-negative number or numeric string. */
export function lmnIconStrokeWidthAttribute(value: LmnIconNumberInput): number {
  return toNonNegative('strokeWidth', value, LMN_DEFAULT_STROKE_WIDTH);
}

/** `padding`: a non-negative number (px) or numeric string. */
export function lmnIconPaddingAttribute(value: LmnIconNumberInput): number {
  return toNonNegative('padding', value, LMN_DEFAULT_PADDING);
}

/**
 * `radius`: a number (px), a numeric string (also px — `radius="12"` used to
 * reach CSS as the unitless, invalid `border-radius: 12`), or any CSS length.
 */
export function lmnIconRadiusAttribute(value: number | string): number | string {
  return typeof value === 'string' && NUMERIC.test(value) ? Number(value) : value;
}
