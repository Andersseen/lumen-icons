import { NgComponentOutlet } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  input,
  signal,
} from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { timer } from "rxjs";

import { ClipboardService } from "../services/clipboard";

import { LmnCheckIcon } from "@lumen/icons/check";
import { LmnCopyIcon } from "@lumen/icons/copy";
import type { LmnIconSize } from "@lumen/icons";

import type { IconEntry } from "../types/icon-entry.type";

export interface IconCardInputs {
  readonly size: LmnIconSize;
  readonly strokeWidth: number;
  readonly animate: boolean;
  readonly [key: string]: unknown;
}

@Component({
  selector: "app-icon-card",
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgComponentOutlet, LmnCheckIcon, LmnCopyIcon],
  styles: [
    `
      :host {
        display: block;
      }

      @keyframes icon-pop {
        0% {
          transform: scale(1) rotate(0deg);
        }
        20% {
          transform: scale(1.4) rotate(-12deg);
        }
        55% {
          transform: scale(0.85) rotate(7deg);
        }
        80% {
          transform: scale(1.06) rotate(-3deg);
        }
        100% {
          transform: scale(1) rotate(0deg);
        }
      }
      .icon-inner {
        display: inline-flex;
      }
      .icon-inner.popped {
        animation: icon-pop 0.42s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
      }

      .icon-card {
        transform: translateY(0) scale(1);
      }

      .icon-card:focus-within,
      .icon-card:hover {
        transform: translateY(-2px) scale(1.01);
      }
    `,
  ],
  templateUrl: "./icon-card.html",
})
export class IconCardComponent {
  private readonly destroyRef = inject(DestroyRef);
  private readonly clipboard = inject(ClipboardService);

  readonly icon = input.required<IconEntry>();
  readonly iconInputs = input.required<IconCardInputs>();
  readonly categoryLabel = input.required<string>();
  readonly previewColor = input<string>('inherit');

  readonly isHovered = signal(false);
  readonly copiedAction = signal<string | null>(null);
  readonly popped = signal(false);

  readonly cardInputs = (): IconCardInputs => ({
    ...this.iconInputs(),
    animate: this.isHovered() && this.iconInputs().animate,
  });

  handlePreviewClick() {
    this.copySnippet("import");
  }

  copySnippet(action: "import" | "selector" | "example") {
    this.triggerPop();

    const text = this.snippetFor(action);
    const key = `${this.icon().name}:${action}`;

    this.clipboard.copy(text, key);
    this.copiedAction.set(action);
    timer(1500)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.copiedAction.set(null));
  }

  isCopied(action: "import" | "selector" | "example"): boolean {
    return this.copiedAction() === action;
  }

  private snippetFor(action: "import" | "selector" | "example"): string {
    switch (action) {
      case "selector":
        return this.icon().selectorStr;
      case "example":
        return this.icon().exampleStr;
      case "import":
        return this.icon().importStr;
    }
  }

  private triggerPop() {
    this.popped.set(false);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        this.popped.set(true);
      });
    });
  }
}
