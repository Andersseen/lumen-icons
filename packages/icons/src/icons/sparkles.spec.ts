import { render } from "@testing-library/angular";
import { describe, expect, it } from "vitest";
import { LmnSparklesIcon } from "./sparkles";

describe("LmnSparklesIcon", () => {
  it("renders an svg", async () => {
    const { fixture } = await render(LmnSparklesIcon);
    expect(fixture.nativeElement.querySelector("svg")).toBeInTheDocument();
  });

  it("is aria-hidden by default", async () => {
    const { fixture } = await render(LmnSparklesIcon);
    const host = fixture.nativeElement as HTMLElement;
    expect(host.getAttribute("aria-hidden")).toBe("true");
  });

  it("adds role=img and aria-label when ariaLabel is provided", async () => {
    const { fixture } = await render(LmnSparklesIcon, {
      componentInputs: { ariaLabel: "Sparkle" },
    });

    const host = fixture.nativeElement as HTMLElement;
    expect(host.getAttribute("role")).toBe("img");
    expect(host.getAttribute("aria-label")).toBe("Sparkle");
    expect(host.hasAttribute("aria-hidden")).toBe(false);
  });

  it("accepts animate input as boolean", async () => {
    const { fixture } = await render(LmnSparklesIcon, {
      componentInputs: { animate: true },
    });
    expect(fixture.componentInstance.animate()).toBe(true);
  });
});
