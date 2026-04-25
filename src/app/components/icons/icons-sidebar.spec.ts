import { render, screen } from "@testing-library/angular";
import { describe, expect, it } from "vitest";
import { IconsSidebarComponent } from "./icons-sidebar";

describe("IconsSidebarComponent", () => {
  it("renders search, size, stroke and animation controls", async () => {
    await render(IconsSidebarComponent);

    expect(screen.getByLabelText(/search/i)).toBeInTheDocument();
    expect(screen.getByText(/stroke/i)).toBeInTheDocument();
    expect(screen.getByRole("slider")).toBeInTheDocument();
    expect(screen.getByText("Size")).toBeInTheDocument();
    expect(screen.getByText("Animation")).toBeInTheDocument();
  });

  it("has size buttons", async () => {
    await render(IconsSidebarComponent);

    expect(screen.getByRole("button", { name: "12" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "24" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "32" })).toBeInTheDocument();
  });
});
