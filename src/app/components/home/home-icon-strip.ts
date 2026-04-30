import { NgComponentOutlet } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";
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
  readonly component: typeof LmnCheckIcon;
  readonly name: string;
}

@Component({
  selector: "app-home-icon-strip",
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgComponentOutlet],
  templateUrl:'./home-icon-strip.html'
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
