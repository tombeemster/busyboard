
let pool, extras = [], copies = [];

// Before the library loads, so it defines the extras' components too.
export function addExtras(el, root, board) {
  pool = document.createElement('div');
  if (getComputedStyle(root).getPropertyValue('--mobile').trim() !== '1' && board.extras) {
    pool.className = 'pool';
    pool.innerHTML = ['low', 'tall'].map(kind => board.extras[kind].map(html => `<div class="item tile" data-kind="${kind}">${html}</div>`).join('')).join('');
    el.append(pool);
    el.querySelectorAll('.row').forEach(row => row.insertAdjacentHTML('beforeend', '<div class="wing left"></div><div class="wing right"></div>'));
    el.insertAdjacentHTML('beforeend', '<div class="above"></div><div class="below"></div>');
    el.addEventListener('click', e => { const day = e.target.closest('.day'); day?.setAttribute('aria-pressed', String(day.getAttribute('aria-pressed') !== 'true')); });
  }
  extras = [...pool.children];
  // A tag cloud (on the board or around it): a removed tag goes; an emptied cloud's tile too, for good.
  el.addEventListener('wa-remove', e => {
    const cloud = e.target.closest('.cloud');
    if (!cloud) return;
    e.target.remove();
    if (cloud.querySelector('wa-tag')) return;
    const tile = cloud.closest('.item');
    for (const list of [extras, copies]) if (list.includes(tile)) list.splice(list.indexOf(tile), 1);
    tile.remove();
    el.dispatchEvent(new Event('cleaned')); // the clean-up minigame (minigames.js); layout refills
  });
}

export function startLayout(el, root) {
  const fill = () => {
    const items = [...el.querySelectorAll('.row > .item')];
    items.forEach(item => { item.hidden = false; item.style.order = ''; });
    // Measured at natural width, one frame, nothing painted in between (styles.css: .measuring).
    el.classList.add('measuring');
    const width = new Map(items.map(item => [item, item.getBoundingClientRect().width]));
    el.classList.remove('measuring');
    const gap = parseFloat(getComputedStyle(el.querySelector('.row')).columnGap);
    if (getComputedStyle(root).getPropertyValue('--mobile').trim() === '1') return pack(width, gap, el.parentElement.clientWidth);
    const tall = [...el.querySelectorAll('.row[data-kind="tall"] > .item')];
    const target = Math.min(tall.reduce((sum, item) => sum + width.get(item), 0) + gap * (tall.length - 1), el.parentElement.clientWidth);
    for (const row of el.querySelectorAll('.row[data-kind="low"]')) {
      const tiles = [...row.querySelectorAll(':scope > .item')];
      const first = item => item.matches('.keep, .stretch');
      const used = tiles.filter(first).reduce((sum, item) => sum + gap + width.get(item), -gap);
      const optional = tiles.filter(item => !first(item));
      let best = [], most = -Infinity;
      // Of every combination of the optional tiles (at most three), the one that fills the row furthest.
      for (let mask = 0; mask < 1 << optional.length; mask++) {
        const shown = optional.filter((_, i) => mask & (1 << i));
        const filled = shown.reduce((sum, item) => sum + gap + width.get(item), used);
        if (filled <= target && filled > most) [best, most] = [shown, filled];
      }
      optional.forEach(item => (item.hidden = !best.includes(item)));
    }
    for (const row of el.querySelectorAll('.row')) {
      // Where the row's tiles end: its right wing starts there.
      const last = [...row.querySelectorAll(':scope > .item:not([hidden])')].at(-1);
      row.style.setProperty('--end', `${last.offsetLeft + last.offsetWidth}px`);
    }
    if (!dragging) arrange(gap);
  };
  const arrange = gap => {
    if (!extras.length) return;
    copies.splice(0).forEach(copy => copy.remove());
    pool.append(...extras);
    el.querySelectorAll('.band').forEach(band => band.remove());
    const width = new Map(extras.map(tile => [tile, tile.getBoundingClientRect().width]));
    const view = el.parentElement.getBoundingClientRect(), box = el.getBoundingClientRect();
    // A shown tile: a hidden one measures 0.
    const low = el.querySelector('.row[data-kind="low"] > .item:not([hidden])').offsetHeight, high = { low, tall: 2 * low + gap };
    const rows = [...el.querySelectorAll('.row')];
    const places = rows.flatMap(row => {
      const at = row.getBoundingClientRect(), end = at.left + parseFloat(row.style.getPropertyValue('--end'));
      return [{ el: row.querySelector('.wing.left'), kind: row.dataset.kind, room: at.left - view.left },
        { el: row.querySelector('.wing.right'), kind: row.dataset.kind, room: view.right - end }];
    });
    const ofKind = kind => extras.filter(tile => tile.dataset.kind === kind);
    const left = { low: ofKind('low'), tall: ofKind('tall') }, all = { low: ofKind('low'), tall: ofKind('tall') }, turns = { low: 0, tall: 0 };
    // Every extra once before any repeats; repeats are copies with unique ids.
    const next = kind => left[kind].shift() ?? copy(all[kind][turns[kind]++ % all[kind].length], turns[kind]);
    const copy = (tile, n) => {
      const twin = tile.cloneNode(true);
      twin.querySelectorAll('[id]').forEach(node => (node.id += `-${n}`));
      twin.querySelectorAll('[for]').forEach(node => node.setAttribute('for', `${node.getAttribute('for')}-${n}`));
      width.set(twin, width.get(tile));
      copies.push(twin);
      return twin;
    };
    const deal = place => {
      for (let filled = 0; filled < place.room && all[place.kind].length;) {
        const tile = next(place.kind);
        place.el.append(tile);
        filled += width.get(tile) + gap;
      }
    };
    places.forEach(deal);
    const ends = [
      { where: el.querySelector('.above'), space: box.top - view.top, kind: rows[0].dataset.kind },
      { where: el.querySelector('.below'), space: view.bottom - box.bottom, kind: rows.at(-1).dataset.kind },
    ];
    for (let more = true; more;) {
      more = false;
      for (const end of ends) {
        const kind = [end.kind === 'low' ? 'tall' : 'low', end.kind].find(k => all[k].length);
        if (end.space <= 0 || !kind) continue;
        const band = Object.assign(document.createElement('div'), { className: 'band' });
        end.where.append(band);
        deal({ el: band, kind, room: view.width });
        Object.assign(end, { space: end.space - high[kind] - gap, kind });
        more = true;
      }
    }
  };
  const pack = (width, gap, target) => {
    for (const row of el.querySelectorAll('.row')) {
      const tiles = [...row.querySelectorAll(':scope > .item')], lines = [];
      const fits = (line, tile) => line.used + gap + width.get(tile) <= target;
      const add = (line, tile) => { line.tiles.push(tile); line.used += gap + width.get(tile); return line; };
      const newLine = () => lines[lines.push({ tiles: [], used: -gap }) - 1];
      const prev = tiles.find(t => t.dataset.type === 'prev'), next = tiles.find(t => t.dataset.type === 'next');
      if (prev) add(newLine(), prev);
      for (const tile of tiles.filter(t => t !== prev && t !== next).sort((a, b) => width.get(b) - width.get(a))) {
        add(lines.find(line => fits(line, tile)) ?? newLine(), tile);
      }
      if (next) {
        const line = lines.find(l => fits(l, next));
        if (line) lines.push(...lines.splice(lines.indexOf(line), 1));
        add(line ?? newLine(), next);
      }
      lines.flatMap(line => line.tiles).forEach((tile, i) => (tile.style.order = i));
    }
  };
  // While the spacing slider is dragged only the rows refill; the extras follow on release.
  let pending, dragging = false;
  fill();
  const refill = () => { cancelAnimationFrame(pending); pending = requestAnimationFrame(fill); };
  const watch = new ResizeObserver(refill);
  // The tall row sets the target width and finishes drawing late (chart, QR code).
  el.querySelectorAll('.row[data-kind="tall"] > .item').forEach(item => watch.observe(item));
  // Width only: phones fire resize when the toolbar slides away, and a refill then jumps the scroll.
  let wide = innerWidth;
  addEventListener('resize', () => { if (innerWidth !== wide) { wide = innerWidth; refill(); } });
  el.addEventListener('cleaned', refill);

  const spacing = el.querySelector('.row > .item wa-slider[range]');
  if (spacing) {
    const css = getComputedStyle(root), [pad, gap] = ['--pad', '--gap'].map(name => parseFloat(css.getPropertyValue(name)));
    const scale = { pad: [24, 40], gap: [2, 24] }, to = ([lo, hi], v) => lo + (v / 100) * (hi - lo), from = ([lo, hi], px) => ((px - lo) / (hi - lo)) * 100;
    spacing.minValue = Math.min(100, Math.max(0, from(scale.pad, pad)));
    spacing.maxValue = Math.max(spacing.minValue, Math.min(100, from(scale.gap, gap)));
    spacing.addEventListener('input', () => {
      root.style.setProperty('--pad', `${to(scale.pad, spacing.minValue)}px`);
      root.style.setProperty('--gap', `${to(scale.gap, spacing.maxValue)}px`);
      dragging = true;
      refill();
    });
    spacing.addEventListener('change', () => { dragging = false; refill(); });
  }
}
