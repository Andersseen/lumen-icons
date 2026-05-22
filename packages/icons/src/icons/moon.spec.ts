import { render } from "@testing-library/angular";
import { describe, expect, it } from "vitest";
import { LmnMoonIcon } from "./moon";

describe("LmnMoonIcon", () => {
  it("renders an svg", async () => {
    const { fixture } = await render(LmnMoonIcon);
    expect(fixture.nativeElement.querySelector("svg")).toBeInTheDocument();
  });

  it("is aria-hidden by default", async () => {
    const { fixture } = await render(LmnMoonIcon);
    const host = fixture.nativeElement as HTMLElement;
    expect(host.getAttribute("aria-hidden")).toBe("true");
  });

  it("adds role=img and aria-label when ariaLabel is provided", async () => {
    const { fixture } = await render(LmnMoonIcon, {
      componentInputs: { ariaLabel: "Dark mode" },
    });
    const host = fixture.nativeElement as HTMLElement;
    expect(host.getAttribute("role")).toBe("img");
    expect(host.getAttribute("aria-label")).toBe("Dark mode");
    expect(host.hasAttribute("aria-hidden")).toBe(false);
  });

  it("accepts animate input as boolean", async () => {
    const { fixture } = await render(LmnMoonIcon, {
      componentInputs: { animate: true },
    });
    expect(fixture.componentInstance.animate()).toBe(true);
  });
});
