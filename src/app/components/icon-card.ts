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
import type { LmnIconBackground, LmnIconSize, LmnIconTone, LmnIconVariant } from "@lumen/icons";

import type { IconEntry } from "../types/icon-entry.type";

export interface IconCardInputs {
  readonly size: LmnIconSize;
  readonly strokeWidth: number;
  readonly animate: boolean;
  readonly tone?: LmnIconTone;
  readonly color?: string;
  readonly variant?: LmnIconVariant;
  readonly background?: LmnIconBackground;
  readonly backgroundTone?: LmnIconTone;
  readonly backgroundColor?: string;
  readonly padding?: number;
  readonly radius?: number | string;
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
        return this.selectorSnippet();
      case "example":
        return this.exampleSnippet();
      case "import":
        return this.icon().importStr;
    }
  }

  private selectorSnippet(): string {
    const attrs = this.selectorAttributes();
    return `<${this.icon().selector}${attrs.length ? ` ${attrs.join(" ")}` : ""} />`;
  }

  private exampleSnippet(): string {
    const className = this.icon().importStr.match(/import \{ ([^ }]+) \}/)?.[1] ?? "IconComponent";

    return `import { Component } from '@angular/core';
${this.icon().importStr}

@Component({
  selector: 'app-example',
  imports: [${className}],
  template: \`${this.selectorSnippet()}\`,
})
export class ExampleComponent {}`;
  }

  private selectorAttributes(): string[] {
    const inputs = this.iconInputs();
    const attrs = [`ariaLabel="${this.icon().name}"`];

    if (inputs.size !== 24) attrs.push(`[size]="${inputs.size}"`);
    if (inputs.strokeWidth !== 2) attrs.push(`[strokeWidth]="${inputs.strokeWidth}"`);
    if (inputs.animate) attrs.push(`[animate]="true"`);
    if (inputs.tone && inputs.tone !== "inherit") attrs.push(`tone="${inputs.tone}"`);
    if (inputs.color) attrs.push(`color="${inputs.color}"`);
    if (inputs.variant && inputs.variant !== "outline") attrs.push(`variant="${inputs.variant}"`);
    if (inputs.background && inputs.background !== "none") attrs.push(`background="${inputs.background}"`);
    if (inputs.backgroundTone && inputs.backgroundTone !== "primary") attrs.push(`backgroundTone="${inputs.backgroundTone}"`);
    if (inputs.backgroundColor) attrs.push(`backgroundColor="${inputs.backgroundColor}"`);
    if (inputs.padding && inputs.padding > 0) attrs.push(`[padding]="${inputs.padding}"`);
    if (inputs.radius !== undefined && inputs.radius !== "0.5rem") attrs.push(`[radius]="${inputs.radius}"`);

    return attrs;
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
