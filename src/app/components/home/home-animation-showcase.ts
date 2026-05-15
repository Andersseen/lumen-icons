import { NgComponentOutlet } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { LmnAlertCircleIcon } from "@lumen/icons/alert-circle";
import { LmnArrowRightIcon } from "@lumen/icons/arrow-right";
import { LmnHeartIcon } from "@lumen/icons/heart";
import { LmnStarIcon } from "@lumen/icons/star";
import { VoltCard } from "@voltui/components";

@Component({
  selector: "app-home-animation-showcase",
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgComponentOutlet, VoltCard],
  templateUrl:'./home-animation-showcase.html'
})
export class HomeAnimationShowcaseComponent {
  readonly demos = [
    {
      icon: LmnStarIcon,
      animate: "spin" as const,
      colorClass: "text-primary",
      hoverClasses: "hover:border-primary/50 hover:bg-primary/30",
    },
    {
      icon: LmnHeartIcon,
      animate: "pulse" as const,
      colorClass: "text-destructive",
      hoverClasses: "hover:border-destructive/50 hover:bg-destructive/20",
    },
    {
      icon: LmnArrowRightIcon,
      animate: "bounce" as const,
      colorClass: "text-info",
      hoverClasses: "hover:border-info/50 hover:bg-info/20",
    },
    {
      icon: LmnAlertCircleIcon,
      animate: "ping" as const,
      colorClass: "text-warning",
      hoverClasses: "hover:border-warning/50 hover:bg-warning/20",
    },
  ];
}
