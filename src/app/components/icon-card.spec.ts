import { signal } from "@angular/core";
import { render, screen } from "@testing-library/angular";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { IconCardComponent } from "./icon-card";
import { LmnCheckIcon } from "@lumen/icons/check";
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
          importStr: "import { LmnCheckIcon } from '@lumen/icons/check';",
        },
        iconInputs: { size: 24, strokeWidth: 2, animate: "none" as const },
      },
      providers: [{ provide: ClipboardService, useValue: clipboardMock }],
    });

    expect(screen.getByText("check")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /copy import for check/i })).toBeInTheDocument();

    const button = screen.getByRole("button");
    await user.click(button);

    expect(copyMock).toHaveBeenCalledWith(
      "import { LmnCheckIcon } from '@lumen/icons/check';",
      "check"
    );
  });
});
