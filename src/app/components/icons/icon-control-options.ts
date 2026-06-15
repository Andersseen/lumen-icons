import type { LmnIconBackground, LmnIconTone, LmnIconVariant } from 'lumen-icons';

import { ICON_CATEGORIES, type IconCategory } from '../../data/icon-metadata';

export type CategoryFilter = IconCategory | 'all';

export interface CategoryFilterOption {
  readonly value: CategoryFilter;
  readonly label: string;
}

export interface ToneOption {
  readonly value: LmnIconTone;
  readonly label: string;
  readonly swatch: string;
}

export interface ControlOption<T extends string> {
  readonly value: T;
  readonly label: string;
}

export const CATEGORY_FILTERS: readonly CategoryFilterOption[] = [
  { value: 'all', label: 'All' },
  ...ICON_CATEGORIES,
];

export const TONE_OPTIONS: readonly ToneOption[] = [
  { value: 'inherit', label: 'Inherit', swatch: 'linear-gradient(135deg, var(--muted-foreground), var(--foreground))' },
  { value: 'foreground', label: 'Foreground', swatch: 'var(--foreground)' },
  { value: 'muted', label: 'Muted', swatch: 'var(--muted-foreground)' },
  { value: 'primary', label: 'Primary', swatch: 'var(--primary)' },
  { value: 'accent', label: 'Accent', swatch: 'var(--accent)' },
  { value: 'success', label: 'Success', swatch: 'var(--success)' },
  { value: 'info', label: 'Info', swatch: 'var(--info)' },
  { value: 'warning', label: 'Warning', swatch: 'var(--warning)' },
  { value: 'destructive', label: 'Destructive', swatch: 'var(--destructive)' },
];

export const BACKGROUND_TONE_OPTIONS: readonly ToneOption[] = [
  { value: 'primary', label: 'Primary background', swatch: 'var(--primary)' },
  { value: 'secondary', label: 'Secondary background', swatch: 'var(--secondary)' },
  { value: 'accent', label: 'Accent background', swatch: 'var(--accent)' },
  { value: 'success', label: 'Success background', swatch: 'var(--success)' },
  { value: 'warning', label: 'Warning background', swatch: 'var(--warning)' },
  { value: 'destructive', label: 'Destructive background', swatch: 'var(--destructive)' },
];

export const VARIANT_OPTIONS: readonly ControlOption<LmnIconVariant>[] = [
  { value: 'outline', label: 'Outline' },
  { value: 'filled', label: 'Filled' },
];

export const BACKGROUND_OPTIONS: readonly ControlOption<LmnIconBackground>[] = [
  { value: 'none', label: 'None' },
  { value: 'soft', label: 'Soft' },
  { value: 'solid', label: 'Solid' },
];
