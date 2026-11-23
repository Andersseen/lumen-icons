import { describe, expect, it } from "vitest";

import type { LmnIconInputs, LmnIconProps } from "./icon.types";

describe("LmnIconProps", () => {
  it("supports optional icon configuration", () => {
    const props: LmnIconProps = {
      size: 24,
      strokeWidth: 1.5,
      ariaLabel: "check icon",
    };

    expect(props.size).toBe(24);
  });

  it("allows sizes off the recommended scale", () => {
    const props: LmnIconProps = { size: 40 };
    const inputs: LmnIconInputs = { size: "40", padding: "8", strokeWidth: 1.5 };
    expect(props.size).toBe(40);
    expect(inputs.size).toBe("40");
  });
});
