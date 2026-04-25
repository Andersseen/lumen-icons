import { ChangeDetectionStrategy, Component } from "@angular/core";
import { LmnArrowRightIcon } from "@lumen/icons/arrow-right";
import {
  LmnCheckIcon,
  LmnHeartIcon,
  LmnInfoIcon,
  LmnSearchIcon,
  LmnStarIcon,
} from "@lumen/icons";

import { VoltCard } from "@voltui/components";

@Component({
  selector: "app-home-features",
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    LmnCheckIcon,
    LmnStarIcon,
    LmnInfoIcon,
    LmnHeartIcon,
    LmnSearchIcon,
    LmnArrowRightIcon,
    VoltCard,
  ],
  template: `
    <section class="py-20" aria-labelledby="features-heading">
      <div class="mx-auto max-w-6xl px-4">
        <div class="mb-12 text-center">
          <h2
            id="features-heading"
            class="text-3xl font-bold tracking-tight text-foreground"
          >
            Designed for Angular
          </h2>
          <p class="mt-3 text-secondary-foreground">
            Every decision optimised for the Angular ecosystem.
          </p>
        </div>

        <ul class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3" role="list">
          @for (f of features; track f.title) {
            <li>
              <volt-card class="block h-full p-6">
                <div
                  class="mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-muted dark:border-border dark:bg-secondary"
                  [class]="f.iconColor"
                >
                  @switch (f.icon) {
                    @case ("check") {
                      <lmn-check [size]="16" [strokeWidth]="2.5" />
                    }
                    @case ("star") {
                      <lmn-star [size]="16" [strokeWidth]="2.5" />
                    }
                    @case ("info") {
                      <lmn-info [size]="16" [strokeWidth]="2.5" />
                    }
                    @case ("heart") {
                      <lmn-heart
                        [size]="16"
                        [strokeWidth]="2.5"
                        animate="pulse"
                      />
                    }
                    @case ("search") {
                      <lmn-search [size]="16" [strokeWidth]="2.5" />
                    }
                    @case ("arrow-right") {
                      <lmn-arrow-right [size]="16" [strokeWidth]="2.5" />
                    }
                  }
                </div>
                <h3 class="font-semibold text-foreground">{{ f.title }}</h3>
                <p
                  class="mt-1.5 text-sm leading-relaxed text-secondary-foreground"
                >
                  {{ f.description }}
                </p>
              </volt-card>
            </li>
          }
        </ul>
      </div>
    </section>
  `,
})
export class HomeFeaturesComponent {
  readonly features = [
    {
      icon: "check",
      iconColor: "text-secondary-foreground",
      title: "Accessible by default",
      description:
        "ARIA attributes handled automatically. Decorative icons hidden; meaningful icons labelled.",
    },
    {
      icon: "star",
      iconColor: "text-secondary-foreground",
      title: "Fully tree-shakable",
      description:
        "Each icon is its own entry point. Import only what you use — zero dead code in your bundle.",
    },
    {
      icon: "info",
      iconColor: "text-secondary-foreground",
      title: "Angular 21 signals",
      description:
        "Standalone components, OnPush, typed input() signals. No NgModule, no wrapper libs.",
    },
    {
      icon: "heart",
      iconColor: "text-primary dark:text-primary",
      title: "Opt-in animations",
      description:
        'Pass animate="spin | pulse | bounce | ping". Pure CSS — no extra dependencies required.',
    },
    {
      icon: "search",
      iconColor: "text-secondary-foreground",
      title: "Customisable",
      description:
        "Control size, stroke width and colour via typed inputs. CSS color is always inherited.",
    },
    {
      icon: "arrow-right",
      iconColor: "text-secondary-foreground",
      title: "Copy-paste ready",
      description:
        "No npm needed. Click any icon to copy its standalone component source directly.",
    },
  ] as const;
}
