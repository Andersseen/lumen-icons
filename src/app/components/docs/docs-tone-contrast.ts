import { ChangeDetectionStrategy, Component } from "@angular/core";
import { VoltCard } from "@voltui/components";

interface ContrastRow {
  readonly tone: string;
  /** [light, dark] WCAG 2 contrast ratios, rounded down. */
  readonly none: readonly [number, number];
  readonly soft: readonly [number, number];
  readonly solid: readonly [number, number];
}

/**
 * Measured against this site's tokens (`src/styles.css`).
 * Regenerate with `pnpm run docs:tone-contrast` after changing them, and keep
 * the README table in sync.
 */
const ROWS: readonly ContrastRow[] = [
  { tone: "foreground", none: [17.8, 19.2], soft: [12.1, 12.1], solid: [17.8, 19.2] },
  { tone: "muted", none: [4.7, 7.8], soft: [4.7, 7.7], solid: [4.5, 6.9] },
  { tone: "primary", none: [5.6, 4.7], soft: [4.3, 4.0], solid: [5.6, 4.2] },
  { tone: "secondary", none: [10.3, 7.8], soft: [10.1, 7.5], solid: [9.4, 5.7] },
  { tone: "accent", none: [1.0, 1.3], soft: [1.0, 1.3], solid: [9.4, 13.9] },
  { tone: "success", none: [2.5, 10.4], soft: [2.1, 7.8], solid: [2.5, 10.4] },
  { tone: "info", none: [3.6, 7.9], soft: [2.9, 6.1], solid: [3.6, 7.9] },
  { tone: "warning", none: [2.1, 12.0], soft: [1.8, 8.8], solid: [2.1, 12.0] },
  { tone: "destructive", none: [3.7, 5.3], soft: [2.9, 4.6], solid: [3.7, 3.7] },
];

@Component({
  selector: "app-docs-tone-contrast",
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [VoltCard],
  templateUrl: "./docs-tone-contrast.html",
})
export class DocsToneContrastComponent {
  protected readonly rows = ROWS;
  protected readonly columns = ["none", "soft", "solid"] as const;

  protected verdict(ratio: number): string {
    if (ratio >= 4.5) return "pass";
    if (ratio >= 3) return "ok for graphics";
    return "fail";
  }
}
