import { ChangeDetectionStrategy, Component, inject, input } from "@angular/core";
import { ClipboardService } from "../../services/clipboard";

@Component({
  standalone: true,
  selector: "app-docs-code-block",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="overflow-hidden rounded-xl border border-border bg-background">
      <div class="flex items-center justify-between border-b border-border px-4 py-2">
        <span class="text-xs text-muted-foreground">{{ label() }}</span>
        <button
          type="button"
          (click)="clipboard.copy(code(), copyKey())"
          class="text-xs text-muted-foreground transition hover:text-foreground"
        >
          {{ clipboard.copiedKey() === copyKey() ? "Copied!" : "Copy" }}
        </button>
      </div>
      <pre class="overflow-x-auto p-4 text-sm text-muted-foreground"><code>{{ code() }}</code></pre>
    </div>
  `,
})
export class DocsCodeBlockComponent {
  readonly clipboard = inject(ClipboardService);

  readonly code = input("");
  readonly label = input("");
  readonly copyKey = input("");
}
