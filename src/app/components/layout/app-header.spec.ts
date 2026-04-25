import { render, screen } from "@testing-library/angular";
import { describe, expect, it } from "vitest";
import { AppHeaderComponent } from "./app-header";

describe("AppHeaderComponent", () => {
  it("renders logo and navigation links", async () => {
    await render(AppHeaderComponent);

    expect(screen.getByRole("link", { name: /^lumen icons home$/i })).toBeInTheDocument();
    expect(screen.getByRole("navigation", { name: /main navigation/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /^icons$/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /^docs$/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /view source on github/i })).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });
});
