import { render } from "@testing-library/angular";
import { describe, expect, it } from "vitest";
import { LmnCheckIcon } from "../icons/check";

describe("LmnIconBase host bindings", () => {
  it("applies display: inline-flex on the host", async () => {
    const { fixture } = await render(LmnCheckIcon);
    const host = fixture.nativeElement as HTMLElement;
    expect(host.style.display).toBe("inline-flex");
  });

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
});
