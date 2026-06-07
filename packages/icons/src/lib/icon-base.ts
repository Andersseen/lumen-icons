import { Directive, HostBinding, input } from '@angular/core';
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

@Directive()
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

  @HostBinding('class.lmn-filled')
  get filledClass(): boolean {
    return this.variant() === 'filled';
  }

  @HostBinding('class.lmn-has-background')
  get backgroundClass(): boolean {
    return this.background() !== 'none';
  }

  @HostBinding('style.color')
  get hostColor(): string | null {
    if (this.color()) return this.color() ?? null;
    if (this.background() === 'solid') {
      return TONE_FOREGROUNDS[this.backgroundTone()] ?? null;
    }
    if (this.tone() !== 'inherit') return TONE_COLORS[this.tone()];
    return null;
  }

  @HostBinding('style.display')
  readonly hostDisplay = 'inline-flex';

  @HostBinding('style.align-items')
  readonly hostAlignItems = 'center';

  @HostBinding('style.justify-content')
  readonly hostJustifyContent = 'center';

  @HostBinding('style.vertical-align')
  readonly hostVerticalAlign = 'middle';

  @HostBinding('style.padding.px')
  get hostPadding(): number | null {
    return this.background() === 'none' && this.padding() === 0 ? null : this.padding();
  }

  @HostBinding('style.border-radius')
  get hostRadius(): string | null {
    if (this.background() === 'none') return null;
    const radius = this.radius();
    return typeof radius === 'number' ? `${radius}px` : radius;
  }

  @HostBinding('style.background')
  get hostBackground(): string | null {
    switch (this.background()) {
      case 'soft':
        return this.backgroundColor() ?? `color-mix(in oklab, ${TONE_BACKGROUNDS[this.backgroundTone()] ?? 'currentColor'} 18%, transparent)`;
      case 'solid':
        return this.backgroundColor() ?? TONE_BACKGROUNDS[this.backgroundTone()] ?? 'currentColor';
      case 'none':
        return null;
    }
  }
}
