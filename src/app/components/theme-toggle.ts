import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { MOVEMENT_DIRECTIVES } from "angular-movement";
import { LmnMoonIcon } from "@lumen/icons/moon";
import { LmnSunIcon } from "@lumen/icons/sun";
import { ThemeService } from "../services/theme";
import { VoltButton } from "@voltui/components";

@Component({
  selector: "app-theme-toggle",
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LmnSunIcon, LmnMoonIcon, VoltButton, MOVEMENT_DIRECTIVES],
  template: `
    <volt-button
      variant="solid"
      [attr.aria-label]="
        resolvedTheme() === 'dark'
          ? 'Switch to light mode'
          : 'Switch to dark mode'
      "
      (click)="themeService.toggle()"
      [moveWhileHover]="{ scale: [1, 1.06], rotate: [0, -4] }"
      [moveWhileTap]="{ scale: [1, 0.94] }"
      [moveDuration]="180"
    >
      @if (resolvedTheme() === "dark") {
        <lmn-sun
          [size]="16"
          [strokeWidth]="2"
          [move]="{ opacity: [0, 1], rotate: [-18, 0], scale: [0.86, 1] }"
          [moveDuration]="260"
        />
      } @else {
        <lmn-moon
          [size]="16"
          [strokeWidth]="2"
          [move]="{ opacity: [0, 1], rotate: [14, 0], scale: [0.86, 1] }"
          [moveDuration]="260"
        />
      }
    </volt-button>
  `,
})
export class ThemeToggleComponent {
  readonly themeService = inject(ThemeService);
  readonly resolvedTheme = this.themeService.resolvedTheme;
}
