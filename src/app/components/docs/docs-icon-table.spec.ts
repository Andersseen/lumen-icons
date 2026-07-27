import { signal } from "@angular/core";
import { render, screen } from "@testing-library/angular";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { DocsIconTableComponent } from "./docs-icon-table";
import { ClipboardService } from "../../services/clipboard";

describe("DocsIconTableComponent", () => {
  it("renders icon catalog rows", async () => {
    await render(DocsIconTableComponent);

    expect(screen.getByRole("heading", { name: /available icons/i })).toBeInTheDocument();
    expect(screen.getByText("check")).toBeInTheDocument();
    expect(screen.getByText("star")).toBeInTheDocument();
    // Renders the whole 362-icon catalog, so it needs more than the 5s default
    // on a cold Vite cache (i.e. every CI run).
  }, 30_000);

  it("copies import on row button click", async () => {
    const copyMock = vi.fn();
    const clipboardMock = {
      copiedKey: signal<string | null>(null),
      copy: copyMock,
    };

    const user = userEvent.setup();
    await render(DocsIconTableComponent, {
      providers: [{ provide: ClipboardService, useValue: clipboardMock }],
    });

    const checkButton = screen.getByRole("button", { name: "Copy import for check" });
    await user.click(checkButton);

    expect(copyMock).toHaveBeenCalledWith(
      "import { LmnCheckIcon } from 'lumen-icons/check';",
      "check"
    );
  }, 30_000);
});
