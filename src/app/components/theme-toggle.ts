import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { LmnMoonIcon } from "@lumen/icons/moon";
import { LmnSunIcon } from "@lumen/icons/sun";
import { ThemeService } from "../services/theme";
import { VoltButton } from "@voltui/components";

@Component({
  selector: "app-theme-toggle",
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LmnSunIcon, LmnMoonIcon, VoltButton],
  template: `
    <volt-button
      variant="solid"
      [attr.aria-label]="
        resolvedTheme() === 'dark'
          ? 'Switch to light mode'
          : 'Switch to dark mode'
      "
      (click)="themeService.toggle()"
    >
      @if (resolvedTheme() === "dark") {
        <lmn-sun [size]="16" [strokeWidth]="2" />
      } @else {
        <lmn-moon [size]="16" [strokeWidth]="2" />
      }
    </volt-button>
  `,
})
export class ThemeToggleComponent {
  readonly themeService = inject(ThemeService);
  readonly resolvedTheme = this.themeService.resolvedTheme;
}
