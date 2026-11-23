import { render } from "@testing-library/angular";
import { describe, expect, it, vi } from "vitest";
import { LmnCheckIcon } from "../icons/check";
import type { LmnIconInputs } from "../types/icon.types";

describe("LmnIconBase host bindings", () => {
  it("defaults size to 24", async () => {
    const { fixture } = await render(LmnCheckIcon);
    expect(fixture.componentInstance.size()).toBe(24);
  });

  it("renders sizes off the recommended scale", async () => {
    const { container } = await render(LmnCheckIcon, {
      componentInputs: { size: 40 },
    });
    const svg = container.querySelector("svg");
    expect(svg).toHaveAttribute("width", "40");
    expect(svg).toHaveAttribute("height", "40");
  });

  it("accepts an LmnIconInputs object as component inputs", async () => {
    const inputs: LmnIconInputs = { size: "40", tone: "primary", background: "soft", radius: "50%" };
    const { fixture } = await render(LmnCheckIcon, { componentInputs: inputs });
    expect(fixture.componentInstance.size()).toBe(40);
    expect(fixture.componentInstance.radius()).toBe("50%");
  });

  it("defaults strokeWidth to 2", async () => {
    const { fixture } = await render(LmnCheckIcon);
    expect(fixture.componentInstance.strokeWidth()).toBe(2);
  });

  it("defaults animate to false", async () => {
    const { fixture } = await render(LmnCheckIcon);
    expect(fixture.componentInstance.animate()).toBe(false);
  });

  it("defaults visual options to outline without background", async () => {
    const { fixture } = await render(LmnCheckIcon);
    expect(fixture.componentInstance.color()).toBeUndefined();
    expect(fixture.componentInstance.tone()).toBe("inherit");
    expect(fixture.componentInstance.variant()).toBe("outline");
    expect(fixture.componentInstance.background()).toBe("none");
    expect(fixture.componentInstance.backgroundTone()).toBe("primary");
    expect(fixture.componentInstance.backgroundColor()).toBeUndefined();
    expect(fixture.componentInstance.padding()).toBe(0);
    expect(fixture.componentInstance.radius()).toBe("0.5rem");
  });

  it("is aria-hidden by default", async () => {
    const { fixture } = await render(LmnCheckIcon);
    const host = fixture.nativeElement as HTMLElement;
    expect(host.getAttribute("aria-hidden")).toBe("true");
  });

  it("adds role=img and aria-label when ariaLabel is provided", async () => {
    const { fixture } = await render(LmnCheckIcon, {
      componentInputs: { ariaLabel: "Completed" },
    });
    const host = fixture.nativeElement as HTMLElement;
    expect(host.getAttribute("role")).toBe("img");
    expect(host.getAttribute("aria-label")).toBe("Completed");
    expect(host.hasAttribute("aria-hidden")).toBe(false);
  });

  it("applies theme tone, filled class and background host styles", async () => {
    const { fixture } = await render(LmnCheckIcon, {
      componentInputs: {
        tone: "primary",
        variant: "filled",
        background: "soft",
        backgroundTone: "primary",
        padding: 8,
        radius: 10,
      },
    });

    const host = fixture.nativeElement as HTMLElement;
    expect(host).toHaveClass("lmn-filled");
    expect(host).toHaveClass("lmn-has-background");
    expect(fixture.componentInstance.hostColorStyle()).toBe("var(--primary, currentColor)");
    expect(fixture.componentInstance.hostBackgroundStyle()).toBe("color-mix(in oklab, var(--primary, currentColor) 18%, transparent)");
    expect(host.style.padding).toBe("8px");
    expect(host.style.borderRadius).toBe("10px");
  });

  it("accepts numeric inputs as static attributes", async () => {
    const { container } = await render(
      `<lmn-check size="14" strokeWidth="1.5" background="soft" padding="8" radius="12" />`,
      { imports: [LmnCheckIcon] },
    );
    const host = container.querySelector("lmn-check") as HTMLElement;
    const svg = host.querySelector("svg") as SVGElement;
    expect(svg).toHaveAttribute("width", "14");
    expect(svg).toHaveAttribute("height", "14");
    expect(svg).toHaveAttribute("stroke-width", "1.5");
    expect(host.style.padding).toBe("8px");
    expect(host.style.borderRadius).toBe("12px");
  });

  it("accepts numeric inputs as property bindings", async () => {
    const { container } = await render(`<lmn-check [size]="14" [strokeWidth]="1.5" />`, {
      imports: [LmnCheckIcon],
    });
    const svg = container.querySelector("lmn-check svg") as SVGElement;
    expect(svg).toHaveAttribute("width", "14");
    expect(svg).toHaveAttribute("stroke-width", "1.5");
  });

  it("falls back to size 24 and warns in dev mode for an invalid size", async () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => undefined);
    try {
      const { container } = await render(`<lmn-check size="large" />`, { imports: [LmnCheckIcon] });
      const svg = container.querySelector("lmn-check svg") as SVGElement;
      expect(svg).toHaveAttribute("width", "24");
      expect(warn).toHaveBeenCalledWith(expect.stringContaining("Invalid `size` value \"large\""));
    } finally {
      warn.mockRestore();
    }
  });
});
