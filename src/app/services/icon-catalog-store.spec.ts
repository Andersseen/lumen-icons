import { describe, expect, it } from "vitest";

import { CATALOG_DEFAULTS, IconCatalogStore } from "./icon-catalog-store";

describe("IconCatalogStore", () => {
  it("filters by search term across name, selector and aliases", () => {
    const store = new IconCatalogStore();

    store.search.set("battery");
    const names = store.filteredIcons().map(icon => icon.name);

    expect(names.length).toBeGreaterThan(0);
    expect(names.every(name => name.includes("battery"))).toBe(true);
  });

  it("filters by category", () => {
    const store = new IconCatalogStore();

    store.category.set("navigation");

    expect(store.filteredIcons().every(icon => icon.category === "navigation")).toBe(true);
    expect(store.filteredIcons().length).toBeLessThan(store.totalIcons);
  });

  it("returns nothing when search and category disagree", () => {
    const store = new IconCatalogStore();

    store.category.set("navigation");
    store.search.set("zzzznotanicon");

    expect(store.filteredIcons()).toHaveLength(0);
  });

  it("reset() restores every default", () => {
    const store = new IconCatalogStore();

    store.search.set("arrow");
    store.size.set(32);
    store.animate.set(true);
    store.background.set("solid");
    expect(store.isPristine()).toBe(false);

    store.reset();

    expect(store.isPristine()).toBe(true);
    expect(store.size()).toBe(CATALOG_DEFAULTS.size);
    expect(store.filteredIcons()).toHaveLength(store.totalIcons);
  });

  it("drops padding from the icon inputs when there is no background", () => {
    const store = new IconCatalogStore();

    store.background.set("none");
    store.padding.set(12);

    expect(store.iconInputs().padding).toBe(0);
  });
});
