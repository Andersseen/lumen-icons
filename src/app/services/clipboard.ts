import { DestroyRef, inject, Injectable, signal } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { timer } from "rxjs";

@Injectable({ providedIn: "root" })
export class ClipboardService {
  private readonly destroyRef = inject(DestroyRef);

  readonly copiedKey = signal<string | null>(null);

  copy(text: string, key: string): void {
    navigator.clipboard.writeText(text).catch(() => {});
    this.copiedKey.set(key);
    timer(2000)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.copiedKey.set(null));
  }
}
