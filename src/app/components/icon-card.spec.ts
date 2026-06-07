import { signal } from "@angular/core";
import { render, screen } from "@testing-library/angular";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { IconCardComponent } from "./icon-card";
import { LmnCheckIcon } from "lumen-icons/check";
import { ClipboardService } from "../services/clipboard";

describe("IconCardComponent", () => {
  it("renders icon name and copies import on click", async () => {
    const copyMock = vi.fn();
    const clipboardMock = {
      copiedKey: signal<string | null>(null),
      copy: copyMock,
    };

    const user = userEvent.setup();
    await render(IconCardComponent, {
      componentInputs: {
        icon: {
          name: "check",
          selector: "lmn-check",
          component: LmnCheckIcon,
          importStr: "import { LmnCheckIcon } from 'lumen-icons/check';",
          selectorStr: '<lmn-check ariaLabel="check" />',
          exampleStr: "example code",
          category: "status",
          aliases: ["success"],
        },
        iconInputs: {
          size: 20,
          strokeWidth: 1.5,
          animate: true,
          tone: "primary",
          variant: "filled",
          background: "soft",
          backgroundTone: "accent",
          padding: 8,
          radius: 10,
        },
        categoryLabel: "Status",
      },
      providers: [{ provide: ClipboardService, useValue: clipboardMock }],
    });

    expect(screen.getByText("check")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /copy import for check/i })).toBeInTheDocument();

    const button = screen.getByRole("button", { name: /copy import for check/i });
    await user.click(button);

    expect(copyMock).toHaveBeenCalledWith(
      "import { LmnCheckIcon } from 'lumen-icons/check';",
      "check:import"
    );
  });

  it("copies selector and example snippets", async () => {
    const copyMock = vi.fn();
    const clipboardMock = {
      copiedKey: signal<string | null>(null),
      copy: copyMock,
    };

    const user = userEvent.setup();
    await render(IconCardComponent, {
      componentInputs: {
        icon: {
          name: "check",
          selector: "lmn-check",
          component: LmnCheckIcon,
          importStr: "import { LmnCheckIcon } from 'lumen-icons/check';",
          selectorStr: '<lmn-check ariaLabel="check" />',
          exampleStr: "example code",
          category: "status",
          aliases: ["success"],
        },
        iconInputs: {
          size: 20,
          strokeWidth: 1.5,
          animate: true,
          tone: "primary",
          variant: "filled",
          background: "soft",
          backgroundTone: "accent",
          padding: 8,
          radius: 10,
        },
        categoryLabel: "Status",
      },
      providers: [{ provide: ClipboardService, useValue: clipboardMock }],
    });

    await user.click(screen.getByRole("button", { name: /copy selector for check/i }));
    await user.click(screen.getByRole("button", { name: /copy angular example for check/i }));

    expect(copyMock).toHaveBeenCalledWith(
      '<lmn-check ariaLabel="check" [size]="20" [strokeWidth]="1.5" [animate]="true" tone="primary" variant="filled" background="soft" backgroundTone="accent" [padding]="8" [radius]="10" />',
      "check:selector"
    );
    expect(copyMock).toHaveBeenCalledWith(
      expect.stringContaining('template: `<lmn-check ariaLabel="check" [size]="20"'),
      "check:example"
    );
  });
});
