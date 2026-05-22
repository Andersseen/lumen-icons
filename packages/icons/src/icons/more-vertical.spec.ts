import { render } from "@testing-library/angular";
import { describe, expect, it } from "vitest";
import { LmnMoreVerticalIcon } from "./more-vertical";

describe("LmnMoreVerticalIcon", () => {
  it("renders an svg", async () => {
    const { fixture } = await render(LmnMoreVerticalIcon);
    expect(fixture.nativeElement.querySelector("svg")).toBeInTheDocument();
  });

  it("is aria-hidden by default", async () => {
    const { fixture } = await render(LmnMoreVerticalIcon);
    const host = fixture.nativeElement as HTMLElement;
    expect(host.getAttribute("aria-hidden")).toBe("true");
  });

  it("adds role=img and aria-label when ariaLabel is provided", async () => {
    const { fixture } = await render(LmnMoreVerticalIcon, {
      componentInputs: { ariaLabel: "More options" },
    });
    const host = fixture.nativeElement as HTMLElement;
    expect(host.getAttribute("role")).toBe("img");
    expect(host.getAttribute("aria-label")).toBe("More options");
    expect(host.hasAttribute("aria-hidden")).toBe(false);
  });

  it("accepts animate input as boolean", async () => {
    const { fixture } = await render(LmnMoreVerticalIcon, {
      componentInputs: { animate: true },
    });
    expect(fixture.componentInstance.animate()).toBe(true);
  });
});
