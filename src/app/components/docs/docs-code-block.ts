import { ChangeDetectionStrategy, Component, inject, input } from "@angular/core";
import { VoltCard } from "@voltui/components";
import { ClipboardService } from "../../services/clipboard";

@Component({
  standalone: true,
  selector: "app-docs-code-block",
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [VoltCard],
  template: `
    <volt-card class="block overflow-hidden">
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
      <div class="p-4">
        <pre class="overflow-x-auto text-sm text-muted-foreground"><code>{{ code() }}</code></pre>
      </div>
    </volt-card>
  `,
})
export class DocsCodeBlockComponent {
  readonly clipboard = inject(ClipboardService);

  readonly code = input("");
  readonly label = input("");
  readonly copyKey = input("");
}
