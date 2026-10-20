# Busyboard

A daily board of real, interactive Web Awesome components: a busy board for grown-ups, with
hidden minigames. An art project, not a product: delight over weight. Live at
tombeemster.github.io/busyboard, a new board every day after midnight (Amsterdam).

## Principles

1. **Small and simple.** Lightweight. Drop what fights the setup rather than patch it. Preferably nothing leaves the board: no outside data and no external links (exceptions: library loads from CDN, moving between boards, credits link).
2. **Toys, not tools.** It's a busy board: components are interactive and can be played with. Some drive each     other.
3. **Daily generation.** Each date seeds its own board, kept as a snapshot so past days stay around. A snapshot may grow (e.g. extras added later), but what made that day's board stays.


## Decisions

- Two row heights; on wide screens a tall tile is two low ones plus a gap. Tiles hug their
  component; only stretch tiles take a row's spare width.
- The board sits in the middle; wide screens fill out to the window's edges with extras, each
  once before any repeats. Phones get the board alone.
- One accent colour, the rest from the OKLCH wheel; text on colour meets WCAG AA. Dark by default;
  only the card's toggle switches it.
- Minigames are collected across boards (no board has them all); clues stay within a board.
- Each board leaves one or two minigame tiles out, so optional tiles get room.
- One tall place holds the numpad, the QR code or (on about a third of the boards) the tag cloud;
  the others join the extras.

## Library quirks

- The autoloader needs a `<script>` tag for the loader, so `js/app.js` adds one before importing it.
- Recolour a component through its `--wa-color-*` variables, inline on the element; outside
  `::part()` rules beat the component's own.
- Web Awesome styles every native `<button>`; bare buttons start from `all: unset`.
- A vertical `wa-slider` track is a fixed 200px; it sets the tall tile's height.
- `wa-tag` only announces removal (`wa-remove`); the page removes it.
- `wa-qr-code` pins its canvas with inline min/max sizes: resize it through `::part(base)` with `!important`.
- Phones fire `resize` when the toolbar slides away: re-layout only when the width changes.
- Tried and dropped: accordion, drawer, stepper, animation, tree, tab group, pagination,
  carousel, spinner, skeleton, comparison; strict grids; following the system's light/dark.
