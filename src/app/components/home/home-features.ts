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
  templateUrl:'./home-features.html'
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
