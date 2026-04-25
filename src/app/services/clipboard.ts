import { Injectable, signal } from "@angular/core";

@Injectable({ providedIn: "root" })
export class ClipboardService {
  private timerId: ReturnType<typeof setTimeout> | null = null;

  readonly copiedKey = signal<string | null>(null);

  copy(text: string, key: string): void {
    navigator.clipboard.writeText(text).catch(() => {});
    this.copiedKey.set(key);

    if (this.timerId) {
      clearTimeout(this.timerId);
    }
    this.timerId = setTimeout(() => {
      this.copiedKey.set(null);
      this.timerId = null;
    }, 2000);
  }
}
