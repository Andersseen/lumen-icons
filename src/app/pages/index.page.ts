import { ChangeDetectionStrategy, Component, signal } from "@angular/core";
import { RouterLink } from "@angular/router";

import { LmnAlertCircleIcon } from "@lumen/icons/icons/alert-circle";
import { LmnArrowLeftIcon } from "@lumen/icons/icons/arrow-left";
import { LmnArrowRightIcon } from "@lumen/icons/icons/arrow-right";
import { LmnCheckIcon } from "@lumen/icons/icons/check";
import { LmnHeartIcon } from "@lumen/icons/icons/heart";
import { LmnInfoIcon } from "@lumen/icons/icons/info";
import { LmnMenuIcon } from "@lumen/icons/icons/menu";
import { LmnSearchIcon } from "@lumen/icons/icons/search";
import { LmnStarIcon } from "@lumen/icons/icons/star";
import { LmnXIcon } from "@lumen/icons/icons/x";

@Component({
  selector: "app-home",
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    LmnStarIcon, LmnHeartIcon, LmnArrowRightIcon, LmnAlertCircleIcon,
    LmnCheckIcon, LmnXIcon, LmnSearchIcon, LmnMenuIcon, LmnInfoIcon, LmnArrowLeftIcon,
  ],
  template: `
    <!-- ═══ HERO ═══ -->
    <section class="relative overflow-hidden bg-slate-950 py-20 sm:py-28" aria-labelledby="hero-heading">
      <!-- Ambient glow -->
      <div class="pointer-events-none absolute inset-0 flex items-start justify-center pt-10" aria-hidden="true">
        <div class="h-80 w-[600px] rounded-full bg-violet-700/20 blur-3xl"></div>
      </div>
      <!-- Dot grid -->
      <div class="pointer-events-none absolute inset-0 opacity-[0.35]"
        style="background-image: radial-gradient(circle, rgb(148 163 184 / 0.18) 1px, transparent 1px); background-size: 28px 28px;"
        aria-hidden="true">
      </div>

      <div class="relative mx-auto max-w-6xl px-4">
        <div class="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">

          <!-- Left: content -->
          <div>
            <div class="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/80 px-3 py-1.5">
              <span class="h-1.5 w-1.5 animate-pulse rounded-full bg-violet-400"></span>
              <span class="text-xs font-medium text-slate-400">v0.1 &middot; Open source &middot; MIT</span>
            </div>

            <h1 id="hero-heading" class="text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl xl:text-6xl">
              Beautiful icons,<br>
              <span class="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
                built for Angular.
              </span>
            </h1>

            <p class="mt-5 text-lg leading-relaxed text-slate-400">
              Accessible, tree-shakable, Angular&#8209;native icon components.
              Zero framework dependencies. Opt&#8209;in animations included.
            </p>

            <div class="mt-8 flex flex-wrap gap-3">
              <a routerLink="/icons"
                class="inline-flex items-center gap-2 rounded-lg bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-600/25 transition-all hover:bg-violet-500 hover:shadow-violet-500/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet-500">
                Browse icons
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
                </svg>
              </a>
              <a routerLink="/docs"
                class="inline-flex items-center gap-2 rounded-lg border border-slate-700 px-5 py-2.5 text-sm font-semibold text-slate-300 transition-all hover:border-slate-500 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-slate-400">
                Documentation
              </a>
            </div>

            <!-- Install command -->
            <div class="mt-6 flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-900/60 px-4 py-3">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                class="shrink-0 text-slate-600" aria-hidden="true">
                <polyline points="4 17 10 11 4 5"/><line x1="12" x2="20" y1="19" y2="19"/>
              </svg>
              <code class="text-sm text-slate-400">
                <span class="text-slate-600 select-none">$ </span>npm install &#64;lumen/icons
              </code>
              <button type="button" (click)="copyInstall()"
                class="ml-auto shrink-0 rounded-md p-1.5 text-slate-600 transition-colors hover:bg-slate-800 hover:text-slate-400"
                [attr.aria-label]="installCopied() ? 'Copied!' : 'Copy install command'">
                @if (installCopied()) {
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"
                    class="text-emerald-400" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
                } @else {
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
                    <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
                  </svg>
                }
              </button>
            </div>
          </div>

          <!-- Right: live animation showcase -->
          <div class="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur-sm"
            aria-label="Live icon animation preview" role="region">
            <p class="mb-4 text-[11px] font-semibold uppercase tracking-widest text-slate-600">
              Animations — live preview
            </p>

            <div class="grid grid-cols-2 gap-3">
              <div class="group flex flex-col items-center gap-3 rounded-xl border border-slate-700/50 bg-slate-800/70 px-4 py-5 transition-colors hover:border-violet-700/50 hover:bg-violet-950/30">
                <div class="text-violet-400">
                  <lmn-star [size]="32" [strokeWidth]="1.5" animate="spin" />
                </div>
                <code class="text-[11px] font-mono text-slate-500 group-hover:text-slate-400">animate="spin"</code>
              </div>
              <div class="group flex flex-col items-center gap-3 rounded-xl border border-slate-700/50 bg-slate-800/70 px-4 py-5 transition-colors hover:border-rose-700/50 hover:bg-rose-950/20">
                <div class="text-rose-400">
                  <lmn-heart [size]="32" [strokeWidth]="1.5" animate="pulse" />
                </div>
                <code class="text-[11px] font-mono text-slate-500 group-hover:text-slate-400">animate="pulse"</code>
              </div>
              <div class="group flex flex-col items-center gap-3 rounded-xl border border-slate-700/50 bg-slate-800/70 px-4 py-5 transition-colors hover:border-blue-700/50 hover:bg-blue-950/20">
                <div class="text-blue-400">
                  <lmn-arrow-right [size]="32" [strokeWidth]="1.5" animate="bounce" />
                </div>
                <code class="text-[11px] font-mono text-slate-500 group-hover:text-slate-400">animate="bounce"</code>
              </div>
              <div class="group flex flex-col items-center gap-3 rounded-xl border border-slate-700/50 bg-slate-800/70 px-4 py-5 transition-colors hover:border-amber-700/50 hover:bg-amber-950/20">
                <div class="text-amber-400">
                  <lmn-alert-circle [size]="32" [strokeWidth]="1.5" animate="ping" />
                </div>
                <code class="text-[11px] font-mono text-slate-500 group-hover:text-slate-400">animate="ping"</code>
              </div>
            </div>

            <!-- Code snippet -->
            <div class="mt-3 rounded-lg bg-slate-950 px-4 py-3">
              <pre class="text-[12px] leading-relaxed"><code
                ><span style="color:#94a3b8">&lt;</span><span style="color:#c084fc">lmn-star</span
                ><br>  <span style="color:#7dd3fc">animate</span><span style="color:#94a3b8">=</span><span style="color:#86efac">"spin"</span
                ><br>  <span style="color:#7dd3fc">[size]</span><span style="color:#94a3b8">=</span><span style="color:#86efac">"24"</span
                ><br><span style="color:#94a3b8">/&gt;</span></code></pre>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ ICON STRIP ═══ -->
    <div class="border-y border-slate-800 bg-slate-900/40 py-8" aria-label="All available icons" role="region">
      <div class="mx-auto max-w-3xl px-4">
        <div class="flex flex-wrap items-center justify-center gap-6 text-slate-500">
          <lmn-check [size]="20" [strokeWidth]="1.75" />
          <lmn-x [size]="20" [strokeWidth]="1.75" />
          <lmn-search [size]="20" [strokeWidth]="1.75" />
          <lmn-menu [size]="20" [strokeWidth]="1.75" />
          <lmn-info [size]="20" [strokeWidth]="1.75" />
          <lmn-arrow-left [size]="20" [strokeWidth]="1.75" />
          <lmn-star [size]="20" [strokeWidth]="1.75" />
          <lmn-heart [size]="20" [strokeWidth]="1.75" />
          <lmn-alert-circle [size]="20" [strokeWidth]="1.75" />
          <lmn-arrow-right [size]="20" [strokeWidth]="1.75" />
        </div>
      </div>
    </div>

    <!-- ═══ FEATURES ═══ -->
    <section class="py-20" aria-labelledby="features-heading">
      <div class="mx-auto max-w-6xl px-4">
        <div class="mb-12 text-center">
          <h2 id="features-heading" class="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Designed for Angular
          </h2>
          <p class="mt-3 text-slate-600 dark:text-slate-400">
            Every decision optimised for the Angular ecosystem.
          </p>
        </div>

        <ul class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3" role="list">
          <li class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div class="mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400">
              <lmn-check [size]="16" [strokeWidth]="2.5" />
            </div>
            <h3 class="font-semibold text-slate-900 dark:text-white">Accessible by default</h3>
            <p class="mt-1.5 text-sm leading-relaxed text-slate-600 dark:text-slate-400">ARIA attributes handled automatically. Decorative icons hidden; meaningful icons labelled.</p>
          </li>
          <li class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div class="mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400">
              <lmn-star [size]="16" [strokeWidth]="2.5" />
            </div>
            <h3 class="font-semibold text-slate-900 dark:text-white">Fully tree-shakable</h3>
            <p class="mt-1.5 text-sm leading-relaxed text-slate-600 dark:text-slate-400">Each icon is its own entry point. Import only what you use — zero dead code in your bundle.</p>
          </li>
          <li class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div class="mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400">
              <lmn-info [size]="16" [strokeWidth]="2.5" />
            </div>
            <h3 class="font-semibold text-slate-900 dark:text-white">Angular 21 signals</h3>
            <p class="mt-1.5 text-sm leading-relaxed text-slate-600 dark:text-slate-400">Standalone components, OnPush, typed input() signals. No NgModule, no wrapper libs.</p>
          </li>
          <li class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div class="mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-violet-600 dark:border-slate-700 dark:bg-slate-800 dark:text-violet-400">
              <lmn-heart [size]="16" [strokeWidth]="2.5" animate="pulse" />
            </div>
            <h3 class="font-semibold text-slate-900 dark:text-white">Opt-in animations</h3>
            <p class="mt-1.5 text-sm leading-relaxed text-slate-600 dark:text-slate-400">Pass animate="spin | pulse | bounce | ping". Pure CSS — no extra dependencies required.</p>
          </li>
          <li class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div class="mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400">
              <lmn-search [size]="16" [strokeWidth]="2.5" />
            </div>
            <h3 class="font-semibold text-slate-900 dark:text-white">Customisable</h3>
            <p class="mt-1.5 text-sm leading-relaxed text-slate-600 dark:text-slate-400">Control size, stroke width and colour via typed inputs. CSS color is always inherited.</p>
          </li>
          <li class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div class="mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400">
              <lmn-arrow-right [size]="16" [strokeWidth]="2.5" />
            </div>
            <h3 class="font-semibold text-slate-900 dark:text-white">Copy-paste ready</h3>
            <p class="mt-1.5 text-sm leading-relaxed text-slate-600 dark:text-slate-400">No npm needed. Click any icon to copy its standalone component source directly.</p>
          </li>
        </ul>
      </div>
    </section>

    <!-- ═══ QUICK START ═══ -->
    <section class="border-t border-slate-200 bg-slate-50 py-20 dark:border-slate-800 dark:bg-slate-900" aria-labelledby="quickstart-heading">
      <div class="mx-auto max-w-2xl px-4">
        <div class="mb-8 text-center">
          <h2 id="quickstart-heading" class="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Up and running in seconds
          </h2>
          <p class="mt-3 text-slate-600 dark:text-slate-400">Three steps — install, import, drop the tag.</p>
        </div>

        <div class="space-y-3">
          <div class="overflow-hidden rounded-xl border border-slate-200 bg-slate-950 dark:border-slate-800">
            <div class="flex items-center justify-between border-b border-slate-800 px-4 py-2">
              <span class="text-xs font-medium text-slate-500">Terminal</span>
              <button type="button" (click)="copyCode('install')"
                class="rounded-md p-1 text-slate-600 transition-colors hover:bg-slate-800 hover:text-slate-400"
                aria-label="Copy install command">
                @if (copiedKey() === 'install') {
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="text-emerald-400" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
                } @else {
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
                }
              </button>
            </div>
            <pre class="overflow-x-auto p-4 text-sm leading-relaxed"><code><span style="color:#94a3b8">$</span> npm install <span style="color:#a5f3fc">&#64;lumen/icons</span></code></pre>
          </div>

          <div class="overflow-hidden rounded-xl border border-slate-200 bg-slate-950 dark:border-slate-800">
            <div class="flex items-center justify-between border-b border-slate-800 px-4 py-2">
              <span class="text-xs font-medium text-slate-500">TypeScript</span>
              <button type="button" (click)="copyCode('import')"
                class="rounded-md p-1 text-slate-600 transition-colors hover:bg-slate-800 hover:text-slate-400"
                aria-label="Copy import statement">
                @if (copiedKey() === 'import') {
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="text-emerald-400" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
                } @else {
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
                }
              </button>
            </div>
            <pre class="overflow-x-auto p-4 text-sm leading-relaxed"><code><span style="color:#c084fc">import</span> &#123; <span style="color:#a5f3fc">LmnCheckIcon</span> &#125; <span style="color:#c084fc">from</span> <span style="color:#86efac">'&#64;lumen/icons/icons/check'</span>;</code></pre>
          </div>

          <div class="overflow-hidden rounded-xl border border-slate-200 bg-slate-950 dark:border-slate-800">
            <div class="flex items-center justify-between border-b border-slate-800 px-4 py-2">
              <span class="text-xs font-medium text-slate-500">Template</span>
              <button type="button" (click)="copyCode('template')"
                class="rounded-md p-1 text-slate-600 transition-colors hover:bg-slate-800 hover:text-slate-400"
                aria-label="Copy template snippet">
                @if (copiedKey() === 'template') {
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="text-emerald-400" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
                } @else {
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
                }
              </button>
            </div>
            <pre class="overflow-x-auto p-4 text-sm leading-relaxed"><code><span style="color:#94a3b8">&lt;</span><span style="color:#c084fc">lmn-check</span> <span style="color:#7dd3fc">[size]</span><span style="color:#94a3b8">=</span><span style="color:#86efac">"24"</span> <span style="color:#7dd3fc">animate</span><span style="color:#94a3b8">=</span><span style="color:#86efac">"spin"</span> <span style="color:#94a3b8">/&gt;</span></code></pre>
          </div>
        </div>

        <div class="mt-8 text-center">
          <a routerLink="/docs"
            class="inline-flex items-center gap-2 text-sm font-medium text-violet-600 transition-colors hover:text-violet-500 dark:text-violet-400 dark:hover:text-violet-300">
            Read the full documentation
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  `,
})
export default class HomePage {
  readonly installCopied = signal(false);
  readonly copiedKey = signal<string | null>(null);

  copyInstall() {
    navigator.clipboard.writeText('npm install @lumen/icons').catch(() => {});
    this.installCopied.set(true);
    setTimeout(() => this.installCopied.set(false), 2000);
  }

  copyCode(key: string) {
    const codes: Record<string, string> = {
      install: 'npm install @lumen/icons',
      import: "import { LmnCheckIcon } from '@lumen/icons/icons/check';",
      template: '<lmn-check [size]="24" animate="spin" />',
    };
    navigator.clipboard.writeText(codes[key] ?? '').catch(() => {});
    this.copiedKey.set(key);
    setTimeout(() => this.copiedKey.set(null), 2000);
  }
}
