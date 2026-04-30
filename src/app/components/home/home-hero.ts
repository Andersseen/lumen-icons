import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  signal,
} from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { RouterLink } from "@angular/router";
import { timer } from "rxjs";

import { LmnArrowRightIcon } from "@lumen/icons/arrow-right";
import { LmnCheckIcon } from "@lumen/icons/check";
import { LmnCopyIcon } from "@lumen/icons/copy";
import { VoltBadge, VoltButton } from "@voltui/components";

import { HomeAnimationShowcaseComponent } from "./home-animation-showcase";
import { HomeIconStripComponent } from "./home-icon-strip";

@Component({
  selector: "app-home-hero",
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    LmnArrowRightIcon,
    LmnCheckIcon,
    LmnCopyIcon,
    VoltBadge,
    VoltButton,
    HomeAnimationShowcaseComponent,
    HomeIconStripComponent,
  ],
  templateUrl:'./home-hero.html'
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
