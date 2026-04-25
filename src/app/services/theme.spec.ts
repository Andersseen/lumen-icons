import { TestBed } from "@angular/core/testing";
import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { ThemeService } from "./theme";

async function flushEffects() {
  await new Promise((r) => setTimeout(r, 10));
}

describe("ThemeService", () => {
  let matchMediaListeners: ((e: MediaQueryListEvent) => void)[] = [];

  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove("dark");

    const mockMatchMedia = (query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: (_event: string, cb: (e: MediaQueryListEvent) => void) => {
        matchMediaListeners.push(cb);
      },
      removeEventListener: () => {},
      dispatchEvent: () => false,
    });

    vi.stubGlobal("matchMedia", mockMatchMedia);
    TestBed.configureTestingModule({});
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    matchMediaListeners = [];
  });

  it("defaults to system theme", () => {
    const service = TestBed.inject(ThemeService);
    expect(service.theme()).toBe("system");
  });

  it("restores theme from localStorage", async () => {
    localStorage.setItem("lumen-theme", "dark");
    const service = TestBed.inject(ThemeService);
    await flushEffects();

    expect(service.theme()).toBe("dark");
    expect(service.resolvedTheme()).toBe("dark");
    expect(document.documentElement.classList.contains("dark")).toBe(true);
  });

  it("toggles between light and dark", async () => {
    const service = TestBed.inject(ThemeService);

    service.setTheme("light");
    await flushEffects();
    expect(service.theme()).toBe("light");
    expect(service.resolvedTheme()).toBe("light");
    expect(document.documentElement.classList.contains("dark")).toBe(false);

    service.toggle();
    await flushEffects();
    expect(service.theme()).toBe("dark");
    expect(document.documentElement.classList.contains("dark")).toBe(true);

    service.toggle();
    await flushEffects();
    expect(service.theme()).toBe("light");
    expect(document.documentElement.classList.contains("dark")).toBe(false);
  });

  it("saves theme to localStorage", async () => {
    const service = TestBed.inject(ThemeService);
    service.setTheme("dark");
    await flushEffects();
    expect(localStorage.getItem("lumen-theme")).toBe("dark");
  });
});
