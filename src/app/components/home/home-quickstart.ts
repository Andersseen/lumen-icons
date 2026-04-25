import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { timer } from 'rxjs';

import { LmnArrowRightIcon } from '@lumen/icons/icons/arrow-right';
import { LmnCheckIcon } from '@lumen/icons/icons/check';
import { LmnCopyIcon } from '@lumen/icons/icons/copy';

@Component({
  selector: 'app-home-quickstart',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, LmnCheckIcon, LmnCopyIcon, LmnArrowRightIcon],
  template: `
    <section
      class="border-t border-slate-200 bg-slate-50 py-20 dark:border-slate-800 dark:bg-slate-900"
      aria-labelledby="quickstart-heading"
    >
      <div class="mx-auto max-w-2xl px-4">
        <div class="mb-8 text-center">
          <h2 id="quickstart-heading" class="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Up and running in seconds
          </h2>
          <p class="mt-3 text-slate-600 dark:text-slate-300">Three steps — install, import, drop the tag.</p>
        </div>

        <div class="space-y-3">
          <!-- Install snippet -->
          <div class="overflow-hidden rounded-xl border border-slate-200 bg-slate-950 dark:border-slate-800">
            <div class="flex items-center justify-between border-b border-slate-800 px-4 py-2">
              <span class="text-xs font-medium text-slate-500">Terminal</span>
              <button
                type="button"
                (click)="copy('install', installCode)"
                class="rounded-md p-1 text-slate-600 transition-colors hover:bg-slate-800 hover:text-slate-400"
                [attr.aria-label]="copiedKey() === 'install' ? 'Copied!' : 'Copy Terminal'"
              >
                @if (copiedKey() === 'install') {
                  <lmn-check [size]="12" [strokeWidth]="2.5" class="text-emerald-400" />
                } @else {
                  <lmn-copy [size]="12" [strokeWidth]="2" />
                }
              </button>
            </div>
            <pre class="overflow-x-auto p-4 text-sm leading-relaxed"><code><span class="text-slate-500">$</span> npm install <span class="text-sky-300">&#64;lumen/icons</span></code></pre>
          </div>

          <!-- Import snippet -->
          <div class="overflow-hidden rounded-xl border border-slate-200 bg-slate-950 dark:border-slate-800">
            <div class="flex items-center justify-between border-b border-slate-800 px-4 py-2">
              <span class="text-xs font-medium text-slate-500">TypeScript</span>
              <button
                type="button"
                (click)="copy('import', importCode)"
                class="rounded-md p-1 text-slate-600 transition-colors hover:bg-slate-800 hover:text-slate-400"
                [attr.aria-label]="copiedKey() === 'import' ? 'Copied!' : 'Copy TypeScript'"
              >
                @if (copiedKey() === 'import') {
                  <lmn-check [size]="12" [strokeWidth]="2.5" class="text-emerald-400" />
                } @else {
                  <lmn-copy [size]="12" [strokeWidth]="2" />
                }
              </button>
            </div>
            <pre class="overflow-x-auto p-4 text-sm leading-relaxed"><code><span class="text-purple-400">import</span> &#123; <span class="text-sky-300">LmnCheckIcon</span> &#125; <span class="text-purple-400">from</span> <span class="text-green-400">'&#64;lumen/icons/icons/check'</span>;</code></pre>
          </div>

          <!-- Template snippet -->
          <div class="overflow-hidden rounded-xl border border-slate-200 bg-slate-950 dark:border-slate-800">
            <div class="flex items-center justify-between border-b border-slate-800 px-4 py-2">
              <span class="text-xs font-medium text-slate-500">Template</span>
              <button
                type="button"
                (click)="copy('template', templateCode)"
                class="rounded-md p-1 text-slate-600 transition-colors hover:bg-slate-800 hover:text-slate-400"
                [attr.aria-label]="copiedKey() === 'template' ? 'Copied!' : 'Copy Template'"
              >
                @if (copiedKey() === 'template') {
                  <lmn-check [size]="12" [strokeWidth]="2.5" class="text-emerald-400" />
                } @else {
                  <lmn-copy [size]="12" [strokeWidth]="2" />
                }
              </button>
            </div>
            <pre class="overflow-x-auto p-4 text-sm leading-relaxed"><code><span class="text-slate-500">&lt;</span><span class="text-purple-400">lmn-check</span> <span class="text-sky-300">[size]</span><span class="text-slate-500">=</span><span class="text-green-400">"24"</span> <span class="text-sky-300">animate</span><span class="text-slate-500">=</span><span class="text-green-400">"spin"</span> <span class="text-slate-500">/&gt;</span></code></pre>
          </div>
        </div>

        <div class="mt-8 text-center">
          <a routerLink="/docs"
            class="inline-flex items-center gap-2 text-sm font-medium text-violet-600 transition-colors hover:text-violet-500 dark:text-violet-400 dark:hover:text-violet-300">
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
  readonly importCode = "import { LmnCheckIcon } from '@lumen/icons/icons/check';";
  readonly templateCode = '<lmn-check [size]="24" animate="spin" />';

  copy(key: string, code: string) {
    navigator.clipboard.writeText(code).catch(() => {});
    this.copiedKey.set(key);
    timer(2000)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.copiedKey.set(null));
  }
}
