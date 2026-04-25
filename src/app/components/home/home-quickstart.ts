import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LmnArrowRightIcon } from '@lumen/icons/icons/arrow-right';
import { LmnCheckIcon } from '@lumen/icons/icons/check';
import { LmnCopyIcon } from '@lumen/icons/icons/copy';

@Component({
  selector: 'app-home-quickstart',
  standalone: true,
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
          <p class="mt-3 text-slate-600 dark:text-slate-400">Three steps — install, import, drop the tag.</p>
        </div>

        <div class="space-y-3">
          @for (s of snippets; track s.key) {
            <div class="overflow-hidden rounded-xl border border-slate-200 bg-slate-950 dark:border-slate-800">
              <div class="flex items-center justify-between border-b border-slate-800 px-4 py-2">
                <span class="text-xs font-medium text-slate-500">{{ s.lang }}</span>
                <button
                  type="button"
                  (click)="copy(s.key, s.code)"
                  class="rounded-md p-1 text-slate-600 transition-colors hover:bg-slate-800 hover:text-slate-400"
                  [attr.aria-label]="copiedKey() === s.key ? 'Copied!' : 'Copy ' + s.lang"
                >
                  @if (copiedKey() === s.key) {
                    <lmn-check [size]="12" [strokeWidth]="2.5" class="text-emerald-400" />
                  } @else {
                    <lmn-copy [size]="12" [strokeWidth]="2" />
                  }
                </button>
              </div>
              <pre class="overflow-x-auto p-4 text-sm leading-relaxed"><code [innerHTML]="s.html"></code></pre>
            </div>
          }
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
  readonly copiedKey = signal<string | null>(null);

  readonly snippets = [
    {
      key: 'install',
      lang: 'Terminal',
      code: 'npm install @lumen/icons',
      html: '<span style="color:#94a3b8">$</span> npm install <span style="color:#a5f3fc">&#64;lumen/icons</span>',
    },
    {
      key: 'import',
      lang: 'TypeScript',
      code: "import { LmnCheckIcon } from '@lumen/icons/icons/check';",
      html: '<span style="color:#c084fc">import</span> &#123; <span style="color:#a5f3fc">LmnCheckIcon</span> &#125; <span style="color:#c084fc">from</span> <span style="color:#86efac">\'&#64;lumen/icons/icons/check\'</span>;',
    },
    {
      key: 'template',
      lang: 'Template',
      code: '<lmn-check [size]="24" animate="spin" />',
      html: '<span style="color:#94a3b8">&lt;</span><span style="color:#c084fc">lmn-check</span> <span style="color:#7dd3fc">[size]</span><span style="color:#94a3b8">=</span><span style="color:#86efac">"24"</span> <span style="color:#7dd3fc">animate</span><span style="color:#94a3b8">=</span><span style="color:#86efac">"spin"</span> <span style="color:#94a3b8">/&gt;</span>',
    },
  ] as const;

  copy(key: string, code: string) {
    navigator.clipboard.writeText(code).catch(() => {});
    this.copiedKey.set(key);
    setTimeout(() => this.copiedKey.set(null), 2000);
  }
}
