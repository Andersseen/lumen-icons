import { render } from "@testing-library/angular";
import { describe, expect, it } from "vitest";
import { LmnPaperclipIcon } from "./paperclip";

describe("LmnPaperclipIcon", () => {
  it("renders an svg", async () => {
    const { fixture } = await render(LmnPaperclipIcon);
    expect(fixture.nativeElement.querySelector("svg")).toBeInTheDocument();
  });

  it("is aria-hidden by default", async () => {
    const { fixture } = await render(LmnPaperclipIcon);
    const host = fixture.nativeElement as HTMLElement;
    expect(host.getAttribute("aria-hidden")).toBe("true");
  });

  it("adds role=img and aria-label when ariaLabel is provided", async () => {
    const { fixture } = await render(LmnPaperclipIcon, {
      componentInputs: { ariaLabel: "Attachment" },
    });
    const host = fixture.nativeElement as HTMLElement;
    expect(host.getAttribute("role")).toBe("img");
    expect(host.getAttribute("aria-label")).toBe("Attachment");
    expect(host.hasAttribute("aria-hidden")).toBe(false);
  });

  it("accepts animate input as boolean", async () => {
    const { fixture } = await render(LmnPaperclipIcon, {
      componentInputs: { animate: true },
    });
    expect(fixture.componentInstance.animate()).toBe(true);
  });
});
