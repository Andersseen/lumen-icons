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
});
