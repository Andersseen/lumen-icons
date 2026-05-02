import { ChangeDetectionStrategy, Component } from "@angular/core";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { LmnExternalLinkIcon } from "@lumen/icons/external-link";
import { VoltBadge } from "@voltui/components";
import { ThemeToggleComponent } from "../theme-toggle";
import { AppLogoComponent } from "./app-logo";

@Component({
  selector: "app-header",
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    RouterLinkActive,
    LmnExternalLinkIcon,
    VoltBadge,
    AppLogoComponent,
    ThemeToggleComponent,
  ],
  templateUrl:'./app-header.html'
})
export class AppHeaderComponent {}
