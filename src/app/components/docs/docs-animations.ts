import { ChangeDetectionStrategy, Component } from "@angular/core";
import { LmnBellIcon } from "lumen-icons/bell";
import { LmnCopyIcon } from "lumen-icons/copy";
import { LmnSearchIcon } from "lumen-icons/search";
import { LmnSendIcon } from "lumen-icons/send";
import { DocsCodeBlockComponent } from "./docs-code-block";

@Component({
  selector: "app-docs-animations",
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    DocsCodeBlockComponent,
    LmnBellIcon,
    LmnCopyIcon,
    LmnSearchIcon,
    LmnSendIcon,
  ],
  templateUrl: "./docs-animations.html",
})
export class DocsAnimationsComponent {
  readonly animationSnippet = `<lmn-search [animate]="true" ariaLabel="Search" />
<lmn-copy [animate]="true" ariaLabel="Copy" />
<lmn-send [animate]="true" ariaLabel="Send" />
<lmn-bell [animate]="true" ariaLabel="Notifications" />`;
}
