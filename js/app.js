import { addExtras, startLayout } from './layout.js';
import { setupColour } from './colour.js';
import { setupMinigames } from './minigames.js';

// Only a date listed in the index is used; anything else shows the newest board.
const json = url => fetch(url).then(r => (r.ok ? r.json() : null)).catch(() => null);
const asked = new URLSearchParams(location.search).get('d');
const [dates, askedBoard] = await Promise.all([json('boards/index.json'), asked && json(`boards/${asked}.json`)]);
const date = dates.includes(asked) ? asked : dates[0];
const board = (date === asked && askedBoard) || (await json(`boards/${date}.json`));

const go = d => (location.search = `?d=${d}`);
// Dates are newest first: jump(1) goes to the newer board, jump(-1) to the older one.
const at = dates.indexOf(date);
const jump = step => { const d = dates[at - step]; if (d) go(d); return Boolean(d); };
addEventListener('keydown', e => {
  if (e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return;
  // Arrow keys belong to the components when focus is on the board or in a field.
  if (e.composedPath().some(n => n.matches?.('.board, input, select, textarea'))) return;
  if (e.key === 'ArrowLeft') jump(-1);
  if (e.key === 'ArrowRight') jump(1);
});

const root = document.documentElement;
root.classList.add(...board.classes);
const setMode = isDark => {
  root.classList.toggle('wa-dark', isDark);
  root.classList.toggle('wa-light', !isDark);
  root.style.colorScheme = isDark ? 'dark' : 'light';
  const toggle = document.querySelector('[data-type="card"] wa-radio-group');
  if (toggle) toggle.value = isDark ? 'dark' : 'light';
};
setMode(true);
const styles = board.css.map(href => new Promise(resolve => {
  document.head.append(Object.assign(document.createElement('link'), { rel: 'stylesheet', href, onload: resolve, onerror: resolve }));
}));

const el = document.getElementById('board');
el.innerHTML = board.rows.map(row => `<div class="row" data-kind="${row.kind}">${row.tiles.map(t => `<div class="item${t.keep ? ' keep' : ''}${t.stretch ? ' stretch' : ''}${t.tile ? ' tile' : ''}" data-type="${t.type}">${t.html}</div>`).join('')}</div>`).join('');
// The credits tile's place is seeded by the date here, so published boards stay unchanged.
const seed = [...board.date].reduce((h, c) => Math.imul(h ^ c.charCodeAt(0), 2654435761), 7) >>> 0;
const lows = [...el.querySelectorAll('.row[data-kind="low"]')], creditRow = lows[seed % lows.length];
const spots = [...[...creditRow.children].filter(tile => tile.dataset.type !== 'prev'), ...(creditRow.querySelector(':scope > [data-type="next"]') ? [] : [null])];
const credit = '<div class="item tile keep" data-type="credit"><div class="set credit"><wa-avatar image="assets/avatar.jpg" label="tombeemster"></wa-avatar>'
  + '<span>Busyboard by <a href="https://github.com/tombeemster" target="_blank">tombeemster</a></span></div></div>';
creditRow.insertBefore(Object.assign(document.createElement('template'), { innerHTML: credit }).content, spots[(seed >>> 8) % spots.length]);
addExtras(el, root, board);
const callout = Object.assign(document.createElement('wa-callout'), { id: 'progress' });
const progressRow = Object.assign(document.createElement('div'), { className: 'progress-row', hidden: true });
progressRow.append(Object.assign(document.createElement('div'), { className: 'tile filler left' }), callout, Object.assign(document.createElement('div'), { className: 'tile filler right' }));
el.prepend(progressRow);

// The autoloader finds its components relative to a <script> tag for it; importing the same
// URL then gives the same module instance.
document.head.append(Object.assign(document.createElement('script'), { type: 'module', src: board.js }));
const { allDefined } = await import(board.js);
await Promise.all([allDefined(), ...styles]);

startLayout(el, root);
setMode(true);
for (const button of el.querySelectorAll('wa-button[data-step]')) {
  const step = Number(button.dataset.step);
  button.addEventListener('click', () => jump(step));
}
el.classList.add('ready');

el.querySelector('[data-type="card"] wa-button')?.addEventListener('click', () => {
  setMode(el.querySelector('[data-type="card"] wa-radio-group').value === 'dark');
});

setupColour(el, root);
setupMinigames({ el, at, jump, progressRow, callout });
