import { render } from "@testing-library/angular";
import { describe, expect, it } from "vitest";
import { LmnCheckIcon } from "../icons/check";

describe("LmnIconBase host bindings", () => {
  it("defaults size to 24", async () => {
    const { fixture } = await render(LmnCheckIcon);
    expect(fixture.componentInstance.size()).toBe(24);
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
    expect(fixture.componentInstance.hostColor).toBe("var(--primary, currentColor)");
    expect(fixture.componentInstance.hostBackground).toBe("color-mix(in oklab, var(--primary, currentColor) 18%, transparent)");
    expect(host.style.padding).toBe("8px");
    expect(host.style.borderRadius).toBe("10px");
  });
});
