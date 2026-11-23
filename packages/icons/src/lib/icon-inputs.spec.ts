import { afterEach, describe, expect, it, vi } from "vitest";
import {
  lmnIconPaddingAttribute,
  lmnIconRadiusAttribute,
  lmnIconSizeAttribute,
  lmnIconStrokeWidthAttribute,
} from "./icon-inputs";

describe("icon input transforms", () => {
  afterEach(() => vi.restoreAllMocks());

  it("accepts every allowed size as a number or a numeric string", () => {
    for (const size of [12, 14, 16, 20, 24, 32] as const) {
      expect(lmnIconSizeAttribute(size)).toBe(size);
      expect(lmnIconSizeAttribute(`${size}`)).toBe(size);
    }
  });

  it("accepts sizes off the recommended scale", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => undefined);
    expect(lmnIconSizeAttribute(40)).toBe(40);
    expect(lmnIconSizeAttribute("40")).toBe(40);
    expect(lmnIconSizeAttribute(18)).toBe(18);
    expect(lmnIconSizeAttribute("15.5")).toBe(15.5);
    expect(warn).not.toHaveBeenCalled();
  });

  it("falls back to 24 and warns in dev mode for a non-positive or non-numeric size", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => undefined);
    expect(lmnIconSizeAttribute("large" as never)).toBe(24);
    expect(lmnIconSizeAttribute(0)).toBe(24);
    expect(lmnIconSizeAttribute(-8)).toBe(24);
    expect(lmnIconSizeAttribute("" as never)).toBe(24);
    expect(lmnIconSizeAttribute(undefined as never)).toBe(24);
    expect(warn).toHaveBeenCalledTimes(5);
    expect(warn.mock.calls[0]?.[0]).toContain("Invalid `size` value \"large\"");
  });

  it("does not warn in production mode", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => undefined);
    const previous = globalThis.ngDevMode;
    globalThis.ngDevMode = false;
    try {
      expect(lmnIconSizeAttribute("large" as never)).toBe(24);
    } finally {
      globalThis.ngDevMode = previous;
    }
    expect(warn).not.toHaveBeenCalled();
  });

  it("parses strokeWidth and padding strings, falling back on invalid values", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => undefined);
    expect(lmnIconStrokeWidthAttribute("1.5")).toBe(1.5);
    expect(lmnIconStrokeWidthAttribute(3)).toBe(3);
    expect(lmnIconStrokeWidthAttribute("thick" as never)).toBe(2);
    expect(lmnIconPaddingAttribute("8")).toBe(8);
    expect(lmnIconPaddingAttribute(-4)).toBe(0);
    expect(warn).toHaveBeenCalledTimes(2);
  });

  it("turns a numeric radius string into px and passes CSS lengths through", () => {
    expect(lmnIconRadiusAttribute("12")).toBe(12);
    expect(lmnIconRadiusAttribute(10)).toBe(10);
    expect(lmnIconRadiusAttribute("50%")).toBe("50%");
    expect(lmnIconRadiusAttribute("0.5rem")).toBe("0.5rem");
  });
});
