import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LmnArrowRightIcon } from '@lumen/icons/icons/arrow-right';
import { LmnCheckIcon } from '@lumen/icons/icons/check';
import { LmnHeartIcon } from '@lumen/icons/icons/heart';
import { LmnInfoIcon } from '@lumen/icons/icons/info';
import { LmnSearchIcon } from '@lumen/icons/icons/search';
import { LmnStarIcon } from '@lumen/icons/icons/star';

@Component({
  selector: 'app-home-features',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LmnCheckIcon, LmnStarIcon, LmnInfoIcon, LmnHeartIcon, LmnSearchIcon, LmnArrowRightIcon],
  template: `
    <section class="py-20" aria-labelledby="features-heading">
      <div class="mx-auto max-w-6xl px-4">
        <div class="mb-12 text-center">
          <h2 id="features-heading" class="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Designed for Angular
          </h2>
          <p class="mt-3 text-slate-600 dark:text-slate-300">Every decision optimised for the Angular ecosystem.</p>
        </div>

        <ul class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3" role="list">
          @for (f of features; track f.title) {
            <li class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div class="mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800"
                [class]="f.iconColor">
                @switch (f.icon) {
                  @case ('check')       { <lmn-check [size]="16" [strokeWidth]="2.5" /> }
                  @case ('star')        { <lmn-star [size]="16" [strokeWidth]="2.5" /> }
                  @case ('info')        { <lmn-info [size]="16" [strokeWidth]="2.5" /> }
                  @case ('heart')       { <lmn-heart [size]="16" [strokeWidth]="2.5" animate="pulse" /> }
                  @case ('search')      { <lmn-search [size]="16" [strokeWidth]="2.5" /> }
                  @case ('arrow-right') { <lmn-arrow-right [size]="16" [strokeWidth]="2.5" /> }
                }
              </div>
              <h3 class="font-semibold text-slate-900 dark:text-white">{{ f.title }}</h3>
              <p class="mt-1.5 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{{ f.description }}</p>
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
      icon: 'check',
      iconColor: 'text-slate-600 dark:text-slate-400',
      title: 'Accessible by default',
      description: 'ARIA attributes handled automatically. Decorative icons hidden; meaningful icons labelled.',
    },
    {
      icon: 'star',
      iconColor: 'text-slate-600 dark:text-slate-400',
      title: 'Fully tree-shakable',
      description: 'Each icon is its own entry point. Import only what you use — zero dead code in your bundle.',
    },
    {
      icon: 'info',
      iconColor: 'text-slate-600 dark:text-slate-400',
      title: 'Angular 21 signals',
      description: 'Standalone components, OnPush, typed input() signals. No NgModule, no wrapper libs.',
    },
    {
      icon: 'heart',
      iconColor: 'text-violet-600 dark:text-violet-400',
      title: 'Opt-in animations',
      description: 'Pass animate="spin | pulse | bounce | ping". Pure CSS — no extra dependencies required.',
    },
    {
      icon: 'search',
      iconColor: 'text-slate-600 dark:text-slate-400',
      title: 'Customisable',
      description: 'Control size, stroke width and colour via typed inputs. CSS color is always inherited.',
    },
    {
      icon: 'arrow-right',
      iconColor: 'text-slate-600 dark:text-slate-400',
      title: 'Copy-paste ready',
      description: 'No npm needed. Click any icon to copy its standalone component source directly.',
    },
  ] as const;
}
