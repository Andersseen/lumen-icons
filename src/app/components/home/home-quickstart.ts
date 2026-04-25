import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { timer } from 'rxjs';

import { LmnArrowRightIcon } from '@lumen/icons/arrow-right';
import { LmnCheckIcon } from '@lumen/icons/check';
import { LmnCopyIcon } from '@lumen/icons/copy';

@Component({
  selector: 'app-home-quickstart',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, LmnCheckIcon, LmnCopyIcon, LmnArrowRightIcon],
  template: `
    <section
      class="border-t border-border bg-muted py-20 dark:border-border dark:bg-card"
      aria-labelledby="quickstart-heading"
    >
      <div class="mx-auto max-w-2xl px-4">
        <div class="mb-8 text-center">
          <h2 id="quickstart-heading" class="text-3xl font-bold tracking-tight text-foreground">
            Up and running in seconds
          </h2>
          <p class="mt-3 text-secondary-foreground">Three steps — install, import, drop the tag.</p>
        </div>

        <div class="space-y-3">
          <!-- Install snippet -->
          <div class="overflow-hidden rounded-xl border border-border bg-background dark:border-border">
            <div class="flex items-center justify-between border-b border-border px-4 py-2">
              <span class="text-xs font-medium text-muted-foreground">Terminal</span>
              <button
                type="button"
                (click)="copy('install', installCode)"
                class="rounded-md p-1 text-secondary-foreground transition-colors hover:bg-secondary hover:text-muted-foreground"
                [attr.aria-label]="copiedKey() === 'install' ? 'Copied!' : 'Copy Terminal'"
              >
                @if (copiedKey() === 'install') {
                  <lmn-check [size]="12" [strokeWidth]="2.5" class="text-success" />
                } @else {
                  <lmn-copy [size]="12" [strokeWidth]="2" />
                }
              </button>
            </div>
            <pre class="overflow-x-auto p-4 text-sm leading-relaxed"><code><span class="text-muted-foreground">$</span> npm install <span class="text-info">&#64;lumen/icons</span></code></pre>
          </div>

          <!-- Import snippet -->
          <div class="overflow-hidden rounded-xl border border-border bg-background dark:border-border">
            <div class="flex items-center justify-between border-b border-border px-4 py-2">
              <span class="text-xs font-medium text-muted-foreground">TypeScript</span>
              <button
                type="button"
                (click)="copy('import', importCode)"
                class="rounded-md p-1 text-secondary-foreground transition-colors hover:bg-secondary hover:text-muted-foreground"
                [attr.aria-label]="copiedKey() === 'import' ? 'Copied!' : 'Copy TypeScript'"
              >
                @if (copiedKey() === 'import') {
                  <lmn-check [size]="12" [strokeWidth]="2.5" class="text-success" />
                } @else {
                  <lmn-copy [size]="12" [strokeWidth]="2" />
                }
              </button>
            </div>
            <pre class="overflow-x-auto p-4 text-sm leading-relaxed"><code><span class="text-primary">import</span> &#123; <span class="text-info">LmnCheckIcon</span> &#125; <span class="text-primary">from</span> <span class="text-success">'&#64;lumen/icons/icons/check'</span>;</code></pre>
          </div>

          <!-- Template snippet -->
          <div class="overflow-hidden rounded-xl border border-border bg-background dark:border-border">
            <div class="flex items-center justify-between border-b border-border px-4 py-2">
              <span class="text-xs font-medium text-muted-foreground">Template</span>
              <button
                type="button"
                (click)="copy('template', templateCode)"
                class="rounded-md p-1 text-secondary-foreground transition-colors hover:bg-secondary hover:text-muted-foreground"
                [attr.aria-label]="copiedKey() === 'template' ? 'Copied!' : 'Copy Template'"
              >
                @if (copiedKey() === 'template') {
                  <lmn-check [size]="12" [strokeWidth]="2.5" class="text-success" />
                } @else {
                  <lmn-copy [size]="12" [strokeWidth]="2" />
                }
              </button>
            </div>
            <pre class="overflow-x-auto p-4 text-sm leading-relaxed"><code><span class="text-muted-foreground">&lt;</span><span class="text-primary">lmn-check</span> <span class="text-info">[size]</span><span class="text-muted-foreground">=</span><span class="text-success">"24"</span> <span class="text-info">animate</span><span class="text-muted-foreground">=</span><span class="text-success">"spin"</span> <span class="text-muted-foreground">/&gt;</span></code></pre>
          </div>
        </div>

        <div class="mt-8 text-center">
          <a routerLink="/docs"
            class="inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-primary dark:text-primary dark:hover:text-primary">
            Read the full documentation
            <lmn-arrow-right [size]="14" [strokeWidth]="2" />
          </a>
        </div>
      </div>
    </section>
  `,
})
export class HomeQuickstartComponent {
  private readonly destroyRef = inject(DestroyRef);

  readonly copiedKey = signal<string | null>(null);

  readonly installCode = 'npm install @lumen/icons';
  readonly importCode = "import { LmnCheckIcon } from '@lumen/icons/check';";
  readonly templateCode = '<lmn-check [size]="24" animate="spin" />';

  copy(key: string, code: string) {
    navigator.clipboard.writeText(code).catch(() => {});
    this.copiedKey.set(key);
    timer(2000)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.copiedKey.set(null));
  }
}
