import { TestBed } from "@angular/core/testing";
import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { ClipboardService } from "./clipboard";

describe("ClipboardService", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({});
    vi.stubGlobal("navigator", {
      clipboard: { writeText: vi.fn().mockResolvedValue(undefined) },
    });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.useRealTimers();
  });

  it("copies text and sets copiedKey", () => {
    vi.useFakeTimers();
    const service = TestBed.inject(ClipboardService);

    service.copy("hello", "test-key");

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith("hello");
    expect(service.copiedKey()).toBe("test-key");

    vi.advanceTimersByTime(2000);
    expect(service.copiedKey()).toBeNull();
  });

  it("handles clipboard rejection gracefully", () => {
    vi.useFakeTimers();
    vi.stubGlobal("navigator", {
      clipboard: { writeText: vi.fn().mockRejectedValue(new Error("fail")) },
    });

    const service = TestBed.inject(ClipboardService);

    expect(() => service.copy("hello", "key")).not.toThrow();
    expect(service.copiedKey()).toBe("key");

    vi.advanceTimersByTime(2000);
    expect(service.copiedKey()).toBeNull();
  });
});
