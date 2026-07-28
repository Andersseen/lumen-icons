# SVG sources

Source geometry for the generated icon components (`packages/icons/src/icons/`).

- `outline/` and `solid/` — [Heroicons](https://github.com/tailwindlabs/heroicons) v2.2.0 (MIT, see `LICENSE`), vendored on 2026-07-27 so the generator does not depend on an installed npm package.
- `scripts/generate-icons.mjs` reads from these directories; regenerating never reaches the network or `node_modules`.
- To upgrade: replace both directories with a newer Heroicons release, update this note, and review the regeneration diff carefully.
- Icons without a source here are "custom" — their geometry lives in their committed component and is preserved by the generator's extraction pipeline.
