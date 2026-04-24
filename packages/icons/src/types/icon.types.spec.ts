import { describe, expect, it } from "vitest";

import type { LmnIconProps } from "./icon.types";

describe("LmnIconProps", () => {
  it("supports optional icon configuration", () => {
    const props: LmnIconProps = {
      size: 24,
      strokeWidth: 1.5,
      ariaLabel: "check icon",
    };

    expect(props.size).toBe(24);
  });
});
