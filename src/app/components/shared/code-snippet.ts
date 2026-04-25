import { ChangeDetectionStrategy, Component, inject, input } from "@angular/core";
import { LmnCheckIcon } from "@lumen/icons/check";
import { LmnCopyIcon } from "@lumen/icons/copy";
import { VoltCard } from "@voltui/components";
import { ClipboardService } from "../../services/clipboard";

@Component({
  selector: "app-code-snippet",
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [VoltCard, LmnCheckIcon, LmnCopyIcon],
  template: `
    <volt-card class="block overflow-hidden">
      <div class="flex items-center justify-between border-b border-border px-4 py-2">
        <span class="text-xs font-medium text-muted-foreground">{{ label() }}</span>
        <button
          type="button"
          (click)="clipboard.copy(code(), copyKey())"
          class="rounded-md p-1 text-secondary-foreground transition-colors hover:bg-secondary hover:text-muted-foreground"
          [attr.aria-label]="clipboard.copiedKey() === copyKey() ? 'Copied!' : 'Copy ' + label()"
        >
          @if (clipboard.copiedKey() === copyKey()) {
            <lmn-check [size]="12" [strokeWidth]="2.5" class="text-success" />
          } @else {
            <lmn-copy [size]="12" [strokeWidth]="2" />
          }
        </button>
      </div>
      <div class="p-4">
        <pre class="overflow-x-auto text-sm leading-relaxed"><code>{{ code() }}</code></pre>
      </div>
    </volt-card>
  `,
})
export class CodeSnippetComponent {
  readonly clipboard = inject(ClipboardService);

  readonly code = input.required<string>();
  readonly label = input.required<string>();
  readonly copyKey = input.required<string>();
}
