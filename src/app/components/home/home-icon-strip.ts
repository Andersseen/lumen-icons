import { NgComponentOutlet } from "@angular/common";
import { ChangeDetectionStrategy, Component, type Type } from "@angular/core";
import { MOVEMENT_DIRECTIVES } from "angular-movement";
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

interface StripIcon {
  readonly component: Type<unknown>;
  readonly name: string;
}

@Component({
  selector: "app-home-icon-strip",
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgComponentOutlet, MOVEMENT_DIRECTIVES],
  template: `
    <div
      class="border-y border-border bg-card/40 py-8"
      aria-label="All available icons"
      role="region"
    >
      <div class="mx-auto max-w-3xl px-4">
        <div
          class="flex flex-wrap items-center justify-center gap-6 text-muted-foreground"
          [moveStagger]="45"
        >
          @for (icon of icons; track icon.name) {
            <span
              class="inline-flex"
              [move]="{ opacity: [0, 1], y: [6, 0], scale: [0.92, 1] }"
              [moveWhileHover]="{ scale: [1, 1.14], y: [0, -2] }"
              [moveDuration]="220"
            >
              <ng-container
                [ngComponentOutlet]="icon.component"
                [ngComponentOutletInputs]="{ size: 20, strokeWidth: 1.75 }"
              />
            </span>
          }
        </div>
      </div>
    </div>
  `,
})
export class HomeIconStripComponent {
  readonly icons: StripIcon[] = [
    { component: LmnCheckIcon, name: "check" },
    { component: LmnXIcon, name: "x" },
    { component: LmnSearchIcon, name: "search" },
    { component: LmnMenuIcon, name: "menu" },
    { component: LmnInfoIcon, name: "info" },
    { component: LmnArrowLeftIcon, name: "arrow-left" },
    { component: LmnStarIcon, name: "star" },
    { component: LmnHeartIcon, name: "heart" },
    { component: LmnAlertCircleIcon, name: "alert-circle" },
    { component: LmnArrowRightIcon, name: "arrow-right" },
    { component: LmnCopyIcon, name: "copy" },
    { component: LmnExternalLinkIcon, name: "external-link" },
  ];
}
