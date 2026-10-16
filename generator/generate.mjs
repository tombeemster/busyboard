import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { lib, looks, fields, five, secrets, components, extras } from './catalog.mjs';

const today = new Date().toLocaleDateString('sv-SE');
const [from = today, to = from] = process.argv.slice(2);

// Seeded PRNG (mulberry32): a date always gives the same board.
function rng(seed) {
  let a = [...seed].reduce((h, c) => Math.imul(h ^ c.charCodeAt(0), 2654435761), 1779033703);
  const next = () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  const r = {
    int: (min, max) => min + Math.floor(next() * (max - min + 1)),
    pick: arr => arr[Math.floor(next() * arr.length)],
    chance: p => next() < p,
    shuffle: arr => arr.map(x => [next(), x]).sort((x, y) => x[0] - y[0]).map(x => x[1]),
    some: (arr, n) => r.shuffle(arr).slice(0, n),
  };
  return r;
}

function rows(r, board) {
  const left = [board.field.type, ...offTall(board), ...board.out];
  const used = components.filter(c => !left.includes(c.type));
  const low = r.shuffle(used.filter(c => c.row === 'low'));
  const lowRows = [[], []];
  const order = c => (c.stretch && !c.keep ? 0 : c.keep ? (c.stretch ? 1 : c.nav ? 2 : 3) : 4);
  [...low].sort((a, b) => order(a) - order(b)).forEach((c, i) => lowRows[i % 2].push(c));
  const place = t => (t.type === 'prev' ? -1 : t.type === 'next' ? 1 : 0);
  return r.shuffle([
    ...lowRows.map(tiles => ({ kind: 'low', tiles: r.shuffle(tiles).sort((a, b) => place(a) - place(b)) })),
    { kind: 'tall', tiles: r.shuffle(used.filter(c => c.row === 'tall')) },
  ]);
}

// The extras use an RNG stream of their own, so adding them never changes the board itself.
function around(date, board) {
  const r = rng(`${date}/wings`), all = offBoard(r, board);
  return Object.fromEntries(['low', 'tall'].map(kind => [kind, once(r, all.filter(e => e.row === kind)).map((e, i) => e.html(r, `x${kind[0]}${i}`))]));
}

// The tall place for the numpad, the QR code or the tag cloud: the two that aren't in it.
const offTall = board => (board.cloud ? ['numpad', 'qr'] : [board.qr ? 'numpad' : 'qr', 'cloud']);

function offBoard(r, board) {
  const left = [...board.out, ...offTall(board)];
  const outside = { ...board, secret: r.pick(secrets) };
  return [...extras, ...components.filter(c => left.includes(c.type)).map(c => ({ row: c.row, html: (r, id) => c.html(r, id, outside) }))];
}
function once(r, list) {
  const pool = r.shuffle(list);
  return pool.filter(e => !e.either || e === pool.find(x => x.either));
}

function generate(date) {
  const r = rng(date);
  const look = Object.fromEntries(Object.entries(looks).map(([k, v]) => [k, r.pick(v)]));
  const field = r.pick(fields);
  const out = r.some(['otp', ...['time', 'number'].filter(type => type !== field.type)], r.int(1, 2));
  const board = { field, five: five(r), out, qr: out.includes('otp') || r.chance(0.5), secret: r.pick(secrets), cloud: rng(`${date}/cloud`).chance(1 / 3) };
  const laid = rows(r, board);
  return {
    date,
    look,
    css: lib.css(look),
    js: lib.js,
    classes: lib.classes(look),
    rows: laid.map(({ kind, tiles }, row) => ({ kind, tiles: tiles.map((c, i) => ({
      type: c.type, ...(c.keep && { keep: true }), ...(c.stretch && { stretch: true }), ...(c.tile && { tile: true }), html: c.html(r, `r${row}t${i}`, board),
    })) })),
    extras: around(date, board),
  };
}

mkdirSync('boards', { recursive: true });
const index = new Set(existsSync('boards/index.json') ? JSON.parse(readFileSync('boards/index.json', 'utf8')) : []);
for (let d = new Date(from); d <= new Date(to); d.setUTCDate(d.getUTCDate() + 1)) {
  const date = d.toISOString().slice(0, 10);
  const file = `boards/${date}.json`;
  if (existsSync(file)) { console.log(`${date} exists, kept`); }
  else { writeFileSync(file, JSON.stringify(generate(date), null, 2) + '\n'); console.log(`${date} written`); }
  index.add(date);
}
writeFileSync('boards/index.json', JSON.stringify([...index].sort().reverse()) + '\n');
