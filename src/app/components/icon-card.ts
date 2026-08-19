import { NgComponentOutlet } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  output,
  signal,
} from "@angular/core";
import { MOVEMENT_DIRECTIVES } from "angular-movement";
import {
  VoltBadge,
  VoltCard,
  VoltDropdownMenu,
  VoltDropdownMenuItem,
  VoltDropdownMenuLabel,
  VoltDropdownMenuSeparator,
  VoltDropdownMenuTrigger,
  VoltTooltip,
} from "@voltui/components";

import { ClipboardService } from "../services/clipboard";

import { LmnCopyIcon } from "lumen-icons/copy";
import type { LmnIconBackground, LmnIconSize, LmnIconTone, LmnIconVariant } from "lumen-icons";

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

const COPY_LABELS: Record<CopyAction, string> = {
  import: "import statement",
  selector: "HTML selector",
  example: "Angular example",
};

type CopyAction = "import" | "selector" | "example";

@Component({
  selector: "app-icon-card",
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgComponentOutlet,
    LmnCopyIcon,
    VoltCard,
    VoltBadge,
    VoltTooltip,
    VoltDropdownMenu,
    VoltDropdownMenuItem,
    VoltDropdownMenuLabel,
    VoltDropdownMenuSeparator,
    VoltDropdownMenuTrigger,
    MOVEMENT_DIRECTIVES,
  ],
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

      @media (prefers-reduced-motion: reduce) {
        .icon-inner.popped {
          animation: none;
        }
      }
    `,
  ],
  templateUrl: "./icon-card.html",
})
export class IconCardComponent {
  private readonly clipboard = inject(ClipboardService);

  readonly icon = input.required<IconEntry>();
  readonly iconInputs = input.required<IconCardInputs>();
  readonly categoryLabel = input.required<string>();

  /** Raised so the page can show one toast instead of 362 inline pills. */
  readonly copied = output<string>();

  readonly isHovered = signal(false);
  readonly popped = signal(false);

  readonly idleCardInputs = (): IconCardInputs => ({
    ...this.iconInputs(),
    animate: false,
  });

  readonly animatedCardInputs = (): IconCardInputs => ({
    ...this.iconInputs(),
    animate: true,
  });

  copySnippet(action: CopyAction) {
    this.triggerPop();

    this.clipboard.copy(this.snippetFor(action), `${this.icon().name}:${action}`);
    this.copied.emit(`Copied ${COPY_LABELS[action]} for ${this.icon().name}`);
  }

  private snippetFor(action: CopyAction): string {
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
    if (inputs.radius !== undefined && inputs.radius !== "0.5rem") {
      const radiusAttr = typeof inputs.radius === 'number'
        ? `[radius]="${inputs.radius}"`
        : `radius="${inputs.radius}"`;
      attrs.push(radiusAttr);
    }

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
