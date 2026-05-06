import { ChangeDetectionStrategy, Component, inject, input } from "@angular/core";
import { MOVEMENT_DIRECTIVES } from "angular-movement";
import { LmnCheckIcon } from "@lumen/icons/check";
import { LmnCopyIcon } from "@lumen/icons/copy";
import { VoltCard } from "@voltui/components";
import { ClipboardService } from "../../services/clipboard";

@Component({
  selector: "app-code-snippet",
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [VoltCard, LmnCheckIcon, LmnCopyIcon, MOVEMENT_DIRECTIVES],
  template: `
    <volt-card class="block overflow-hidden">
      <div class="flex items-center justify-between border-b border-border px-4 py-2">
        <span class="text-xs font-medium text-muted-foreground">{{ label() }}</span>
        <button
          type="button"
          (click)="clipboard.copy(code(), copyKey())"
          class="rounded-md p-1 text-secondary-foreground transition-colors hover:bg-secondary hover:text-muted-foreground"
          [moveWhileHover]="{ scale: [1, 1.08], rotate: [0, -3] }"
          [moveWhileTap]="{ scale: [1, 0.92] }"
          [moveDuration]="160"
          [attr.aria-label]="clipboard.copiedKey() === copyKey() ? 'Copied!' : 'Copy ' + label()"
        >
          @if (clipboard.copiedKey() === copyKey()) {
            <lmn-check
              [size]="12"
              [strokeWidth]="2.5"
              class="text-success"
              [move]="{ opacity: [0, 1], scale: [0.7, 1.08, 1], rotate: [-8, 3, 0] }"
              [moveDuration]="420"
            />
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
