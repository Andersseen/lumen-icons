import { signal } from "@angular/core";
import { render, screen } from "@testing-library/angular";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { OptionGroupComponent } from "./option-group";

const SIZES = [
  { value: 12, label: "12" },
  { value: 24, label: "24" },
  { value: 32, label: "32" },
] as const;

describe("OptionGroupComponent", () => {
  it("marks only the current value as checked", async () => {
    await render(OptionGroupComponent<number>, {
      componentInputs: { options: SIZES, ariaLabel: "Icon size" },
      componentProperties: { value: signal(24) },
    });

    expect(screen.getByRole("radio", { name: "24" })).toHaveAttribute("aria-checked", "true");
    expect(screen.getByRole("radio", { name: "12" })).toHaveAttribute("aria-checked", "false");
  });

  it("writes the typed value back, not the stringified one", async () => {
    const value = signal<number>(24);
    const user = userEvent.setup();

    await render(OptionGroupComponent<number>, {
      componentInputs: { options: SIZES, ariaLabel: "Icon size" },
      componentProperties: { value },
    });

    await user.click(screen.getByRole("radio", { name: "32" }));

    expect(value()).toBe(32);
  });

  it("exposes the group under its accessible name", async () => {
    await render(OptionGroupComponent<number>, {
      componentInputs: { options: SIZES, ariaLabel: "Icon size" },
      componentProperties: { value: signal(24) },
    });

    expect(screen.getByLabelText("Icon size")).toBeInTheDocument();
  });
});
