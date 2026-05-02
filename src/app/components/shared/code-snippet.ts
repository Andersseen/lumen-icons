import { ChangeDetectionStrategy, Component, inject, input } from "@angular/core";
import { LmnCheckIcon } from "@lumen/icons/check";
import { LmnCopyIcon } from "@lumen/icons/copy";
import { VoltCard } from "@voltui/components";
import { ClipboardService } from "../../services/clipboard";

@Component({
  selector: "app-code-snippet",
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [VoltCard, LmnCheckIcon, LmnCopyIcon],
  templateUrl:'./code-snippet.html'
})
export class CodeSnippetComponent {
  readonly clipboard = inject(ClipboardService);

  readonly code = input.required<string>();
  readonly label = input.required<string>();
  readonly copyKey = input.required<string>();
}
