import { computed, Directive, input } from '@angular/core';
import type {
  LmnIconBackground,
  LmnIconInstance,
  LmnIconSize,
  LmnIconTone,
  LmnIconVariant,
} from '../types/icon.types';

const TONE_COLORS: Record<LmnIconTone, string | null> = {
  inherit: null,
  foreground: 'var(--foreground, currentColor)',
  muted: 'var(--muted-foreground, currentColor)',
  primary: 'var(--primary, currentColor)',
  secondary: 'var(--secondary-foreground, currentColor)',
  accent: 'var(--accent, currentColor)',
  success: 'var(--success, currentColor)',
  info: 'var(--info, currentColor)',
  warning: 'var(--warning, currentColor)',
  destructive: 'var(--destructive, currentColor)',
};

const TONE_FOREGROUNDS: Record<LmnIconTone, string | null> = {
  inherit: null,
  foreground: 'var(--background, currentColor)',
  muted: 'var(--muted-foreground, currentColor)',
  primary: 'var(--primary-foreground, currentColor)',
  secondary: 'var(--secondary-foreground, currentColor)',
  accent: 'var(--accent-foreground, currentColor)',
  success: 'var(--success-foreground, currentColor)',
  info: 'var(--info-foreground, currentColor)',
  warning: 'var(--warning-foreground, currentColor)',
  destructive: 'var(--destructive-foreground, currentColor)',
};

const TONE_BACKGROUNDS: Record<LmnIconTone, string | null> = {
  inherit: null,
  foreground: 'var(--foreground, currentColor)',
  muted: 'var(--muted, currentColor)',
  primary: 'var(--primary, currentColor)',
  secondary: 'var(--secondary, currentColor)',
  accent: 'var(--accent, currentColor)',
  success: 'var(--success, currentColor)',
  info: 'var(--info, currentColor)',
  warning: 'var(--warning, currentColor)',
  destructive: 'var(--destructive, currentColor)',
};

@Directive({
  host: {
    '[class.lmn-filled]': 'filledClass()',
    '[class.lmn-has-background]': 'hasBackgroundClass()',
    '[style.color]': 'hostColorStyle()',
    '[style.display]': '"inline-flex"',
    '[style.align-items]': '"center"',
    '[style.justify-content]': '"center"',
    '[style.vertical-align]': '"middle"',
    '[style.padding.px]': 'hostPaddingStyle()',
    '[style.border-radius]': 'hostRadiusStyle()',
    '[style.background]': 'hostBackgroundStyle()',
  },
})
export abstract class LmnIconBase implements LmnIconInstance {
  readonly size = input<LmnIconSize>(24);
  readonly strokeWidth = input<number>(2);
  readonly ariaLabel = input<string | undefined>(undefined);
  readonly animate = input<boolean>(false);
  readonly tone = input<LmnIconTone>('inherit');
  readonly color = input<string | undefined>(undefined);
  readonly variant = input<LmnIconVariant>('outline');
  readonly background = input<LmnIconBackground>('none');
  readonly backgroundTone = input<LmnIconTone>('primary');
  readonly backgroundColor = input<string | undefined>(undefined);
  readonly padding = input<number>(0);
  readonly radius = input<number | string>('0.5rem');

  readonly filledClass = computed(() => this.variant() === 'filled');
  readonly hasBackgroundClass = computed(() => this.background() !== 'none');

  readonly hostColorStyle = computed(() => {
    if (this.color()) return this.color() ?? null;
    if (this.background() === 'solid') {
      return TONE_FOREGROUNDS[this.backgroundTone()] ?? null;
    }
    if (this.tone() !== 'inherit') return TONE_COLORS[this.tone()] ?? null;
    return null;
  });

  readonly hostPaddingStyle = computed(() => {
    return this.background() === 'none' && this.padding() === 0 ? null : this.padding();
  });

  readonly hostRadiusStyle = computed(() => {
    if (this.background() === 'none') return null;
    const radius = this.radius();
    return typeof radius === 'number' ? `${radius}px` : radius;
  });

  readonly hostBackgroundStyle = computed(() => {
    switch (this.background()) {
      case 'soft':
        return this.backgroundColor() ?? `color-mix(in oklab, ${TONE_BACKGROUNDS[this.backgroundTone()] ?? 'currentColor'} 18%, transparent)`;
      case 'solid':
        return this.backgroundColor() ?? TONE_BACKGROUNDS[this.backgroundTone()] ?? 'currentColor';
      case 'none':
        return null;
    }
  });
}
