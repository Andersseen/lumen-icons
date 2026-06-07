import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { MOVEMENT_DIRECTIVES } from "angular-movement";
import { LmnMoonIcon } from "lumen-icons/moon";
import { LmnSunIcon } from "lumen-icons/sun";
import { VoltButton } from "@voltui/components";
import { ThemeService } from "../services/theme";

@Component({
  selector: "app-theme-toggle",
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LmnSunIcon, LmnMoonIcon, VoltButton, MOVEMENT_DIRECTIVES],
  templateUrl: "./theme-toggle.html",
})
export class ThemeToggleComponent {
  readonly themeService = inject(ThemeService);
  readonly resolvedTheme = this.themeService.resolvedTheme;
}
