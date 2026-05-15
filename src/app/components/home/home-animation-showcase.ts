import { NgComponentOutlet } from "@angular/common";
import { ChangeDetectionStrategy, Component, type Type } from "@angular/core";
import { MOVEMENT_DIRECTIVES } from "angular-movement";
import { LmnAlertCircleIcon } from "@lumen/icons/alert-circle";
import { LmnArrowRightIcon } from "@lumen/icons/arrow-right";
import { LmnCheckIcon } from "@lumen/icons/check";
import { LmnHeartIcon } from "@lumen/icons/heart";
import { LmnHomeIcon } from "@lumen/icons/home";
import { LmnSparklesIcon } from "@lumen/icons/sparkles";
import { VoltCard } from "@voltui/components";

interface AnimationDemo {
  readonly icon: Type<unknown>;
  readonly label: string;
  readonly animate: boolean;
  readonly colorClass: string;
  readonly hoverClasses: string;
}

@Component({
  selector: "app-home-animation-showcase",
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgComponentOutlet, VoltCard, MOVEMENT_DIRECTIVES],
  templateUrl: "./home-animation-showcase.html",
})
export class HomeAnimationShowcaseComponent {
  readonly demos: AnimationDemo[] = [
    {
      icon: LmnCheckIcon,
      label: "check · directive",
      animate: true,
      colorClass: "text-success",
      hoverClasses: "hover:border-success/50 hover:bg-success/20",
    },
    {
      icon: LmnSparklesIcon,
      label: "sparkles · directive",
      animate: true,
      colorClass: "text-primary",
      hoverClasses: "hover:border-primary/50 hover:bg-primary/30",
    },
    {
      icon: LmnArrowRightIcon,
      label: "arrow · directive",
      animate: true,
      colorClass: "text-info",
      hoverClasses: "hover:border-info/50 hover:bg-info/20",
    },
    {
      icon: LmnHomeIcon,
      label: "home · directive",
      animate: true,
      colorClass: "text-secondary-foreground",
      hoverClasses: "hover:border-muted-foreground/50 hover:bg-muted/80",
    },
    {
      icon: LmnHeartIcon,
      label: "heart · engine",
      animate: true,
      colorClass: "text-destructive",
      hoverClasses: "hover:border-destructive/50 hover:bg-destructive/20",
    },
    {
      icon: LmnAlertCircleIcon,
      label: "alert · engine",
      animate: true,
      colorClass: "text-warning",
      hoverClasses: "hover:border-warning/50 hover:bg-warning/20",
    },
  ];
}
