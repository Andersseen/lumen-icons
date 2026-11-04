# Custom filled geometry

Filled (`variant="filled"`) sources for Lumen's **custom** icons — the ones with no
Heroicons outline source. Without a file here a custom icon falls back to CSS
(`fill: currentColor; stroke: none`), which only works for closed shapes: open
strokes vanish and inner details become a solid blob.

- Most files are the [Heroicons](https://github.com/tailwindlabs/heroicons) v2.2.0
  solid glyph of the equivalent icon (MIT, see `../LICENSE`), so the filled family
  stays visually consistent: `x`←`x-mark`, `menu`←`bars-3`, `list`←`list-bullet`,
  `info`←`information-circle`, `alert-circle`←`exclamation-circle`, `smile`←`face-smile`,
  `search`←`magnifying-glass`, `globe`←`globe-alt`, `image`←`photo`, `edit`←`pencil-square`,
  `package`←`cube`, `paperclip`←`paper-clip`, `more-vertical`←`ellipsis-vertical`,
  `log-in`←`arrow-right-end-on-rectangle`, `log-out`←`arrow-right-start-on-rectangle`,
  `terminal`←`command-line`, `refresh-cw`←`arrow-path`, `upload`←`arrow-up-tray`,
  `download`←`arrow-down-tray`, `external-link`←`arrow-top-right-on-square`,
  `mail`←`envelope`, `settings`←`cog-6-tooth`.
- Authored for Lumen (no Heroicons equivalent): `checkbox` (rounded square with the
  `check-circle` tick as a hole), `save` (floppy body with shutter and label holes),
  `loader` (the eight spokes as capsules).
- `scripts/generate-icons.mjs` reads this directory when it regenerates custom icons.
