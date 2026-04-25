import { signal } from "@angular/core";
import { render, screen } from "@testing-library/angular";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { DocsCodeBlockComponent } from "./docs-code-block";
import { ClipboardService } from "../../services/clipboard";

describe("DocsCodeBlockComponent", () => {
  it("renders label and code", async () => {
    await render(DocsCodeBlockComponent, {
      componentInputs: {
        code: "npm install @lumen/icons",
        label: "Terminal",
        copyKey: "install",
      },
    });

    expect(screen.getByText("Terminal")).toBeInTheDocument();
    expect(screen.getByText("npm install @lumen/icons")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /copy/i })).toBeInTheDocument();
  });

  it("copies code on click", async () => {
    const copyMock = vi.fn();
    const clipboardMock = {
      copiedKey: signal<string | null>(null),
      copy: copyMock,
    };

    const user = userEvent.setup();
    await render(DocsCodeBlockComponent, {
      componentInputs: {
        code: "npm install @lumen/icons",
        label: "Terminal",
        copyKey: "install",
      },
      providers: [{ provide: ClipboardService, useValue: clipboardMock }],
    });

    const button = screen.getByRole("button", { name: /copy/i });
    await user.click(button);

    expect(copyMock).toHaveBeenCalledWith("npm install @lumen/icons", "install");
  });
});
