import { render } from "@testing-library/angular";
import { describe, expect, it } from "vitest";
import { LmnCheckIcon } from "./check";

describe("LmnCheckIcon", () => {
  it("renders an svg", async () => {
    const { fixture } = await render(LmnCheckIcon);
    expect(fixture.nativeElement.querySelector("svg")).toBeInTheDocument();
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

  it("applies animation attribute", async () => {
    const { fixture } = await render(LmnCheckIcon, {
      componentInputs: { animate: "spin" },
    });

    const host = fixture.nativeElement as HTMLElement;
    expect(host.getAttribute("data-animate")).toBe("spin");
  });
});
