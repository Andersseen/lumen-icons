import { DOCUMENT } from '@angular/common';
import { effect, inject, Injectable, signal } from '@angular/core';

type Theme = 'light' | 'dark' | 'system';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly document = inject(DOCUMENT);
  private readonly storageKey = 'lumen-theme';

  readonly theme = signal<Theme>(this.getInitialTheme());
  readonly resolvedTheme = signal<'light' | 'dark'>('light');

  constructor() {
    this.updateResolvedTheme();

    effect(() => {
      const t = this.theme();
      this.applyTheme(t);
      this.saveTheme(t);
    });

    // Listen for system preference changes when in system mode
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      mediaQuery.addEventListener('change', () => {
        if (this.theme() === 'system') {
          this.updateResolvedTheme();
        }
      });
    }
  }

  setTheme(theme: Theme): void {
    this.theme.set(theme);
  }

  toggle(): void {
    const current = this.theme();
    if (current === 'light') {
      this.setTheme('dark');
    } else {
      this.setTheme('light');
    }
  }

  private getInitialTheme(): Theme {
    if (typeof window === 'undefined') return 'system';

    const stored = localStorage.getItem(this.storageKey) as Theme | null;
    if (stored && ['light', 'dark', 'system'].includes(stored)) {
      return stored;
    }
    return 'system';
  }

  private saveTheme(theme: Theme): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(this.storageKey, theme);
  }

  private applyTheme(theme: Theme): void {
    const root = this.document.documentElement;
    const isDark =
      theme === 'dark' ||
      (theme === 'system' &&
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-color-scheme: dark)').matches);

    root.classList.toggle('dark', isDark);
    this.resolvedTheme.set(isDark ? 'dark' : 'light');
  }

  private updateResolvedTheme(): void {
    const t = this.theme();
    const isDark =
      t === 'dark' ||
      (t === 'system' &&
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-color-scheme: dark)').matches);
    this.resolvedTheme.set(isDark ? 'dark' : 'light');
  }
}
