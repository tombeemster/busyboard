# Busyboard

A daily board of real, interactive Web Awesome components: a busy board for grown-ups, with
hidden minigames. An art project, not a product: delight over weight. Live at
tombeemster.github.io/busyboard, a new board every day after midnight (Amsterdam).

## Principles

1. **One library.** Components straight from Web Awesome, styled by its own theme.
2. **Toys, not tools.** Nothing leaves the board: no fetching, no external links, except moving
   between boards and the credits link. Images are local or drawn inline.
3. **One system.** Components drive each other (sliders → chart, numpad → code, colour picker →
   accents, range slider → spacing). New ones should connect to what's there.
4. **Daily, seeded, kept.** Each date seeds its board; the snapshot never changes once published.
5. **Two heights, tiles hug.** Low and tall rows; on wide screens tall = two low + a gap. Tiles hug
   their component; only stretch tiles take a row's spare width. The browser fills the rows.
6. **Board in the middle, toys around.** Wide screens fill out to the window's edges with extras
   (and the board's left-out components, which play too); each shows once before any repeats.
   Phones get the board alone.
7. **Gestalt spacing.** Tight within a control set, roomier inside tiles, one gap between tiles.
8. **One accent.** A single main colour; the rest follow on the OKLCH wheel. Dark by default.
9. **Accessible by rule.** Text on colour meets WCAG AA.
10. **Small and simple.** One component at a time; drop what fights the setup.

## Decisions

- Minigames are collected across boards (no board has them all); clues stay within a board.
- Each board leaves one or two minigame tiles out, so optional tiles get room.
- Dark mode by default; only the card's toggle switches it.

## Library quirks

- The autoloader needs a `<script>` tag for the loader, so `app.js` adds one before importing it.
- Recolour a component through its `--wa-color-*` variables, inline on the element; outside
  `::part()` rules beat the component's own.
- Web Awesome styles every native `<button>`; bare buttons start from `all: unset`.
- A vertical `wa-slider` track is a fixed 200px; it sets the tall tile's height.
- `wa-tag` only announces removal (`wa-remove`); the page removes it.
- Phones fire `resize` when the toolbar slides away: re-layout only when the width changes.
- Tried and dropped: accordion, drawer, stepper, animation, tree, tab group, pagination,
  carousel, spinner, skeleton, comparison; strict grids; following the system's light/dark.
