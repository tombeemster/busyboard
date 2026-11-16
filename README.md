# Busyboard

A daily board of interactive UI components, like a digital toddler's busyboard.

Every day, a new selection of [Web Awesome](https://webawesome.com) components renders over night. Familiar toys like sliders, switches and buttons to tweak and tune. Some of them drive others, some purely exist for fidgeting purposes. All boards are stored and accessible using the prev/next buttons or the keyboard arrows.

Live at [tombeemster.github.io/busyboard](https://tombeemster.github.io/busyboard/)

![busyboard](/assets/busyboard.gif)

## Run it locally

No build step. Serve the folder with any static server:

```sh
npx serve
```

## Generate boards

```sh
node generator/generate.mjs                         # today
node generator/generate.mjs 2026-10-08 2026-10-31   # a range
```

This writes `boards/YYYY-MM-DD.json` and updates `boards/index.json`. Existing boards are never overwritten.

## Files

- `generator/catalog.mjs`: the components and their content
- `generator/generate.mjs`: the seeded generator (run from the repo root)
- `js/app.js`: loads and renders a board, then starts `layout.js` (rows and extras), `colour.js` (accents) and `minigames.js`
- `index.html`: the page shell
- `css/styles.css`: all layout and styling
- `assets/`: images (the credits avatar)
- `product.md`: the three principles, decisions and library quirks
