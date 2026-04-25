import { ChangeDetectionStrategy, Component, input } from "@angular/core";

@Component({
  selector: "app-logo",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <svg
      [attr.width]="size()"
      [attr.height]="size()"
      viewBox="0 0 512 512"
      fill="none"
      aria-hidden="true"
    >
      <circle
        cx="256"
        cy="256"
        r="220"
        stroke="currentColor"
        [attr.stroke-width]="24 * size() / 512"
        opacity="0.15"
      />
      <circle
        cx="256"
        cy="256"
        r="180"
        stroke="currentColor"
        [attr.stroke-width]="16 * size() / 512"
        opacity="0.25"
      />
      <path
        d="M256 48 L280 180 L432 180 L308 268 L352 400 L256 312 L160 400 L204 268 L80 180 L232 180 Z"
        fill="currentColor"
        opacity="0.95"
      />
      <circle cx="256" cy="256" r="48" fill="white" opacity="0.15" />
      <circle cx="256" cy="256" r="28" fill="currentColor" opacity="0.3" />
    </svg>
  `,
})
export class AppLogoComponent {
  readonly size = input<number>(28);
}
