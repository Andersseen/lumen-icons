import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  signal,
} from "@angular/core";
import { RouterLink } from "@angular/router";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { timer } from "rxjs";

import { LmnAlertCircleIcon } from "@lumen/icons/alert-circle";
import { LmnArrowLeftIcon } from "@lumen/icons/arrow-left";
import { LmnArrowRightIcon } from "@lumen/icons/arrow-right";
import { LmnCheckIcon } from "@lumen/icons/check";
import { LmnCopyIcon } from "@lumen/icons/copy";
import { LmnExternalLinkIcon } from "@lumen/icons/external-link";
import { LmnHeartIcon } from "@lumen/icons/heart";
import { LmnInfoIcon } from "@lumen/icons/info";
import { LmnMenuIcon } from "@lumen/icons/menu";
import { LmnSearchIcon } from "@lumen/icons/search";
import { LmnStarIcon } from "@lumen/icons/star";
import { LmnXIcon } from "@lumen/icons/x";
import { AppLogoComponent } from "../layout/app-logo";
import { VoltBadge, VoltButton, VoltCard } from "@voltui/components";

@Component({
  selector: "app-home-hero",
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    LmnHeartIcon,
    LmnArrowRightIcon,
    LmnAlertCircleIcon,
    LmnCheckIcon,
    LmnXIcon,
    LmnSearchIcon,
    LmnMenuIcon,
    LmnInfoIcon,
    LmnArrowLeftIcon,
    LmnCopyIcon,
    LmnExternalLinkIcon,
    LmnStarIcon,
    AppLogoComponent,
    VoltBadge,
    VoltButton,
    VoltCard,
  ],
  template: `
    <section
      class="dark relative overflow-hidden bg-background py-20 sm:py-28"
      aria-labelledby="hero-heading"
    >
      <!-- Ambient glow -->
      <div
        class="pointer-events-none absolute inset-0 flex items-start justify-center pt-10"
        aria-hidden="true"
      >
        <div class="h-80 w-[600px] rounded-full bg-primary/20 blur-3xl"></div>
      </div>
      <!-- Dot grid -->
      <div
        class="pointer-events-none absolute inset-0 opacity-[0.35]"
        style="background-image: radial-gradient(circle, rgb(148 163 184 / 0.18) 1px, transparent 1px); background-size: 28px 28px;"
        aria-hidden="true"
      ></div>

      <div class="relative mx-auto max-w-6xl px-4">
        <div class="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <!-- Left: content -->
          <div>
            <div class="mb-6 inline-flex items-center gap-2">
              <volt-badge variant="outline" class="inline-flex items-center gap-2">
                <span class="h-1.5 w-1.5 animate-pulse rounded-full bg-primary"></span>
                <span class="text-xs font-medium">v0.1 &middot; Open source &middot; MIT</span>
              </volt-badge>
            </div>

            <h1
              id="hero-heading"
              class="text-4xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-5xl xl:text-6xl"
            >
              Beautiful icons,<br />
              <span
                class="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
              >
                built for Angular.
              </span>
            </h1>

            <p class="mt-5 text-lg leading-relaxed text-muted-foreground">
              Accessible, tree-shakable, Angular&#8209;native icon components.
              Zero framework dependencies. Opt&#8209;in animations included.
            </p>

            <div class="mt-8 flex flex-wrap gap-3">
              <volt-button
                routerLink="/icons"
                variant="solid"
                class="inline-flex items-center gap-1"
              >
                Browse icons
                <lmn-arrow-right [size]="14" [strokeWidth]="2.5" />
              </volt-button>
              <volt-button
                routerLink="/docs"
                variant="outline"
                class="inline-flex items-center gap-1"
              >
                Documentation
              </volt-button>
            </div>

            <!-- Install command -->
            <div
              class="mt-6 flex items-center gap-3 rounded-xl border border-border bg-card/60 px-4 py-3"
            >
              <lmn-arrow-right
                [size]="14"
                [strokeWidth]="2"
                class="shrink-0 text-secondary-foreground"
              />
              <code class="text-sm text-muted-foreground">
                <span class="text-secondary-foreground select-none">$ </span>npm
                install &#64;lumen/icons
              </code>
              <button
                type="button"
                (click)="copyInstall()"
                class="ml-auto shrink-0 rounded-md p-1.5 text-secondary-foreground transition-colors hover:bg-secondary hover:text-muted-foreground"
                [attr.aria-label]="
                  installCopied() ? 'Copied!' : 'Copy install command'
                "
              >
                @if (installCopied()) {
                  <lmn-check
                    [size]="14"
                    [strokeWidth]="2.5"
                    class="text-success"
                  />
                } @else {
                  <lmn-copy [size]="14" [strokeWidth]="2" />
                }
              </button>
            </div>
          </div>

          <!-- Right: live animation showcase -->
          <volt-card
            class="rounded-2xl border border-border bg-card/60 p-5 backdrop-blur-sm"
            aria-label="Live icon animation preview"
            role="region"
          >
            <p
              class="mb-4 text-lg font-semibold uppercase tracking-widest text-muted-foreground"
            >
              Animations — live preview
            </p>

            <div class="grid grid-cols-2 gap-3">
              <div
                class="group flex flex-col items-center gap-3 rounded-xl border border-border/50 bg-secondary/70 px-4 py-5 transition-colors hover:border-primary/50 hover:bg-primary/30"
              >
                <div class="text-primary">
                  <lmn-star [size]="32" [strokeWidth]="1.5" animate="spin" />
                </div>
                <code
                  class="text-[11px] font-mono text-muted-foreground group-hover:text-muted-foreground"
                  >animate="spin"</code
                >
              </div>
              <div
                class="group flex flex-col items-center gap-3 rounded-xl border border-border/50 bg-secondary/70 px-4 py-5 transition-colors hover:border-destructive/50 hover:bg-destructive/20"
              >
                <div class="text-destructive">
                  <lmn-heart [size]="32" [strokeWidth]="1.5" animate="pulse" />
                </div>
                <code
                  class="text-[11px] font-mono text-muted-foreground group-hover:text-muted-foreground"
                  >animate="pulse"</code
                >
              </div>
              <div
                class="group flex flex-col items-center gap-3 rounded-xl border border-border/50 bg-secondary/70 px-4 py-5 transition-colors hover:border-info/50 hover:bg-info/20"
              >
                <div class="text-info">
                  <lmn-arrow-right
                    [size]="32"
                    [strokeWidth]="1.5"
                    animate="bounce"
                  />
                </div>
                <code
                  class="text-[11px] font-mono text-muted-foreground group-hover:text-muted-foreground"
                  >animate="bounce"</code
                >
              </div>
              <div
                class="group flex flex-col items-center gap-3 rounded-xl border border-border/50 bg-secondary/70 px-4 py-5 transition-colors hover:border-warning/50 hover:bg-warning/20"
              >
                <div class="text-warning">
                  <lmn-alert-circle
                    [size]="32"
                    [strokeWidth]="1.5"
                    animate="ping"
                  />
                </div>
                <code
                  class="text-[11px] font-mono text-muted-foreground group-hover:text-muted-foreground"
                  >animate="ping"</code
                >
              </div>
            </div>

            <!-- Code snippet -->
            <div class="mt-3 rounded-lg bg-background px-4 py-3">
              <pre class="text-[12px] leading-relaxed"><code
                ><span style="color:#94a3b8">&lt;</span><span style="color:#c084fc">lmn-star</span
                ><br>  <span style="color:#7dd3fc">animate</span><span style="color:#94a3b8">=</span><span style="color:#86efac">"spin"</span
                ><br>  <span style="color:#7dd3fc">[size]</span><span style="color:#94a3b8">=</span><span style="color:#86efac">"24"</span
                ><br><span style="color:#94a3b8">/&gt;</span></code></pre>
            </div>
          </volt-card>
        </div>
      </div>
    </section>

    <!-- Icon strip -->
    <div
      class="border-y border-border bg-card/40 py-8"
      aria-label="All available icons"
      role="region"
    >
      <div class="mx-auto max-w-3xl px-4">
        <div
          class="flex flex-wrap items-center justify-center gap-6 text-muted-foreground"
        >
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
  private readonly destroyRef = inject(DestroyRef);

  readonly installCopied = signal(false);

  copyInstall() {
    navigator.clipboard.writeText("npm install @lumen/icons").catch(() => {});
    this.installCopied.set(true);
    timer(2000)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.installCopied.set(false));
  }
}
