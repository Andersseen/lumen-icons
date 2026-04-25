import { render, screen } from "@testing-library/angular";
import { describe, expect, it } from "vitest";
import { App } from "./app";

describe("App", () => {
  it("renders skip link and main layout", async () => {
    await render(App);

    expect(screen.getByText("Skip to main content")).toBeInTheDocument();
    expect(document.getElementById("main-content")).toBeInTheDocument();
  });
});
