import { signal } from "@angular/core";
import { render, screen } from "@testing-library/angular";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi, beforeEach } from "vitest";
import { ThemeToggleComponent } from "./theme-toggle";
import { ThemeService } from "../services/theme";

describe("ThemeToggleComponent", () => {
  beforeEach(() => {
    document.documentElement.classList.remove("dark");
    localStorage.clear();
  });

  it("renders moon icon in light mode", async () => {
    const themeServiceMock = {
      theme: signal<"light" | "dark" | "system">("system"),
      resolvedTheme: signal<"light" | "dark">("light"),
      toggle: vi.fn(),
      setTheme: vi.fn(),
    };

    await render(ThemeToggleComponent, {
      providers: [{ provide: ThemeService, useValue: themeServiceMock }],
    });

    expect(screen.getByRole("button")).toBeInTheDocument();
    expect(document.querySelector("lmn-moon")).toBeInTheDocument();
  });

  it("toggles theme on click", async () => {
    const themeServiceMock = {
      theme: signal<"light" | "dark" | "system">("system"),
      resolvedTheme: signal<"light" | "dark">("light"),
      toggle: vi.fn(() => {
        themeServiceMock.theme.set("dark");
        themeServiceMock.resolvedTheme.set("dark");
        document.documentElement.classList.add("dark");
        localStorage.setItem("lumen-theme", "dark");
      }),
      setTheme: vi.fn(),
    };

    const user = userEvent.setup();
    await render(ThemeToggleComponent, {
      providers: [{ provide: ThemeService, useValue: themeServiceMock }],
    });

    const button = screen.getByRole("button");
    await user.click(button);

    expect(themeServiceMock.toggle).toHaveBeenCalled();
    expect(document.documentElement.classList.contains("dark")).toBe(true);
    expect(localStorage.getItem("lumen-theme")).toBe("dark");
  });
});
