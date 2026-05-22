import { render } from "@testing-library/angular";
import { describe, expect, it } from "vitest";
import { LmnExternalLinkIcon } from "./external-link";

describe("LmnExternalLinkIcon", () => {
  it("renders an svg", async () => {
    const { fixture } = await render(LmnExternalLinkIcon);
    expect(fixture.nativeElement.querySelector("svg")).toBeInTheDocument();
  });

  it("is aria-hidden by default", async () => {
    const { fixture } = await render(LmnExternalLinkIcon);
    const host = fixture.nativeElement as HTMLElement;
    expect(host.getAttribute("aria-hidden")).toBe("true");
  });

  it("adds role=img and aria-label when ariaLabel is provided", async () => {
    const { fixture } = await render(LmnExternalLinkIcon, {
      componentInputs: { ariaLabel: "External link" },
    });
    const host = fixture.nativeElement as HTMLElement;
    expect(host.getAttribute("role")).toBe("img");
    expect(host.getAttribute("aria-label")).toBe("External link");
    expect(host.hasAttribute("aria-hidden")).toBe(false);
  });

  it("accepts animate input as boolean", async () => {
    const { fixture } = await render(LmnExternalLinkIcon, {
      componentInputs: { animate: true },
    });
    expect(fixture.componentInstance.animate()).toBe(true);
  });
});
