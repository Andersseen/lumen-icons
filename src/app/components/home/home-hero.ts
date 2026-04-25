import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { LmnAlertCircleIcon } from '@lumen/icons/icons/alert-circle';
import { LmnArrowLeftIcon } from '@lumen/icons/icons/arrow-left';
import { LmnArrowRightIcon } from '@lumen/icons/icons/arrow-right';
import { LmnCheckIcon } from '@lumen/icons/icons/check';
import { LmnCopyIcon } from '@lumen/icons/icons/copy';
import { LmnExternalLinkIcon } from '@lumen/icons/icons/external-link';
import { LmnHeartIcon } from '@lumen/icons/icons/heart';
import { LmnInfoIcon } from '@lumen/icons/icons/info';
import { LmnMenuIcon } from '@lumen/icons/icons/menu';
import { LmnSearchIcon } from '@lumen/icons/icons/search';
import { LmnStarIcon } from '@lumen/icons/icons/star';
import { LmnXIcon } from '@lumen/icons/icons/x';

@Component({
  selector: 'app-home-hero',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    LmnStarIcon, LmnHeartIcon, LmnArrowRightIcon, LmnAlertCircleIcon,
    LmnCheckIcon, LmnXIcon, LmnSearchIcon, LmnMenuIcon, LmnInfoIcon,
    LmnArrowLeftIcon, LmnCopyIcon, LmnExternalLinkIcon,
  ],
  template: `
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
                <lmn-arrow-right [size]="14" [strokeWidth]="2.5" />
              </a>
              <a routerLink="/docs"
                class="inline-flex items-center rounded-lg border border-slate-700 px-5 py-2.5 text-sm font-semibold text-slate-300 transition-all hover:border-slate-500 hover:text-white">
                Documentation
              </a>
            </div>

            <!-- Install command -->
            <div class="mt-6 flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-900/60 px-4 py-3">
              <lmn-arrow-right [size]="14" [strokeWidth]="2" class="shrink-0 text-slate-600" />
              <code class="text-sm text-slate-400">
                <span class="text-slate-600 select-none">$ </span>npm install &#64;lumen/icons
              </code>
              <button type="button" (click)="copyInstall()"
                class="ml-auto shrink-0 rounded-md p-1.5 text-slate-600 transition-colors hover:bg-slate-800 hover:text-slate-400"
                [attr.aria-label]="installCopied() ? 'Copied!' : 'Copy install command'">
                @if (installCopied()) {
                  <lmn-check [size]="14" [strokeWidth]="2.5" class="text-emerald-400" />
                } @else {
                  <lmn-copy [size]="14" [strokeWidth]="2" />
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

    <!-- Icon strip -->
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
          <lmn-copy [size]="20" [strokeWidth]="1.75" />
          <lmn-external-link [size]="20" [strokeWidth]="1.75" />
        </div>
      </div>
    </div>
  `,
})
export class HomeHeroComponent {
  readonly installCopied = signal(false);

  copyInstall() {
    navigator.clipboard.writeText('npm install @lumen/icons').catch(() => {});
    this.installCopied.set(true);
    setTimeout(() => this.installCopied.set(false), 2000);
  }
}
