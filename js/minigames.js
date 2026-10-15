
export function setupMinigames({ el, at, jump, progressRow, callout }) {
  const own = selector => el.querySelector(`.row > .item ${selector}`);
  const otp = own('wa-otp-input');
  const faders = [...el.querySelectorAll('[data-type="faders"] wa-slider')];

  const stage = document.createElement('div');
  stage.innerHTML = '<wa-toast placement="bottom-center"></wa-toast><wa-dialog light-dismiss with-footer></wa-dialog>';
  document.body.append(stage);
  const toast = (message, variant = 'brand') => {
    const item = Object.assign(document.createElement('wa-toast-item'), { variant, textContent: message });
    stage.querySelector('wa-toast').append(item);
  };
  let queue = Promise.resolve();
  const celebrate = ({ title, body, action = 'Nice!' }) => (queue = queue.then(() => new Promise(resolve => {
    const dialog = stage.querySelector('wa-dialog');
    let chosen = false;
    dialog.label = title;
    dialog.innerHTML = `<p>${body}</p><wa-button slot="footer" variant="brand" data-dialog="close">${action}</wa-button>`;
    dialog.querySelector('wa-button').addEventListener('click', () => (chosen = true));
    dialog.addEventListener('wa-after-hide', () => resolve(chosen), { once: true });
    dialog.open = true;
  })));
  const progressKey = 'busyboard:minigames';
  const completed = (() => { try { return new Set(JSON.parse(localStorage.getItem(progressKey) ?? '[]')); } catch { return new Set(); } })();
  const unlock = name => {
    if (completed.has(name)) return false;
    completed.add(name);
    try { localStorage.setItem(progressKey, JSON.stringify([...completed])); } catch { /* memory only */ }
    return true;
  };
  const minigames = { code: 'The code', series: 'Next in the series', fifth: 'The fifth member', sync: 'Time in sync', hundred: 'Counting to a hundred', scan: 'The QR code', clean: 'Clean-up' };
  const total = Object.keys(minigames).length;
  const [tags, dropdown, number] = ['wa-tag-input', 'wa-select[data-answer]', 'wa-number-input'].map(own);
  const showProgress = (message = '') => {
    const done = Object.keys(minigames).filter(game => completed.has(game));
    progressRow.hidden = !done.length;
    callout.innerHTML = '<svg slot="icon" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12l5 5 9-10"/></svg>'
      + `<div class="progress"><span>${message && message + ' · '}${done.length} of ${total} minigames completed</span><span class="done">${done.map(game => `<s>${minigames[game]}</s>`).join('')}<button class="reset" type="button">Reset</button></span></div>`;
    return done.length;
  };
  showProgress();
  callout.addEventListener('click', async e => {
    if (!e.target.closest('.reset')) return;
    if (!(await celebrate({ title: 'Reset the minigames?', body: 'Your progress on every board starts over.', action: 'Reset' }))) return;
    completed.clear();
    try { localStorage.removeItem(progressKey); } catch { /* memory only */ }
    showProgress();
  });
  const complete = (name, message) => {
    if (!unlock(name)) return;
    if (showProgress(message) === total) celebrate({ title: 'All minigames done!', body: `You completed all ${total} minigames across the boards. Every toy has given up its secret.`, action: 'Yay!' });
    else toast(message, 'success');
  };
  window.busyboard = { toast, celebrate, jump, unlock, complete };
  el.addEventListener('cleaned', () => complete('clean', 'Cleaned up'));

  // Listeners sit on the whole board, so copies of minigame tiles around it play too.
  const shown = selector => [...el.querySelectorAll(selector)].filter(node => !node.closest('.pool'));

  el.addEventListener('change', async ({ target: time }) => {
    if (time.localName !== 'wa-time-input' || !time.value) return;
    const [hours, minutes] = String(time.value).split(':').map(Number);
    const now = new Date();
    const apart = Math.abs(hours * 60 + minutes - (now.getHours() * 60 + now.getMinutes()));
    if (Math.min(apart, 24 * 60 - apart) <= 1) complete('sync', 'You’re in sync');
    if (hours || minutes) return;
    if (at <= 0) return celebrate({ title: 'Midnight!', body: 'This is the newest board. A new one appears tomorrow.', action: 'Okay' });
    if (await celebrate({ title: 'Midnight!', body: 'The clock struck twelve: a new day, a new board. Shall we jump to the next one?', action: 'Jump' })) jump(1);
  });

  tags?.addEventListener('change', () => {
    const added = [...tags.value].map(tag => String(tag).trim().toLowerCase());
    if (added.some(tag => [tags.dataset.next, tags.dataset.nextName].includes(tag))) complete('series', 'Pattern spotted');
    if (shown('wa-qr-code').some(code => added.includes(code.dataset.secret))) complete('scan', 'Secret found');
  });

  dropdown?.addEventListener('change', () => {
    if (dropdown.value === dropdown.dataset.answer) complete('fifth', 'Five out of five');
  });

  const secret = tags?.dataset.code ?? '';
  const clearCode = box => { box.classList.remove('wrong'); box.customError = null; };
  const checkCode = box => {
    if (box.value.length < box.length) return;
    if (box.value === secret) return complete('code', 'Code cracked');
    box.classList.add('wrong');
    box.customError = 'Not this code';
  };
  el.addEventListener('input', ({ target: box }) => { if (box.localName === 'wa-otp-input') { clearCode(box); checkCode(box); } });

  el.addEventListener('click', e => {
    const key = e.target.closest('.numpad wa-button'), box = otp ?? shown('wa-otp-input')[0];
    if (!key || !box) return;
    const code = box.value ?? '';
    clearCode(box);
    // Setting the value from script fires no input event, so the code is checked here.
    box.value = (code.length >= box.length ? '' : code) + key.textContent.trim();
    checkCode(box);
  });

  // Registered before the chart's redraw, so it sees the new counter state.
  let count = Number(number?.value) || 0, counter = false;
  for (const type of ['input', 'change']) {
    el.addEventListener(type, ({ target }) => {
      if (target.localName === 'wa-number-input') [count, counter] = [Number(target.value) || 0, (Number(target.value) || 0) >= 10];
    });
    for (const control of el.querySelectorAll('[data-type="switches"] wa-switch, [data-type="faders"] wa-slider')) {
      control.addEventListener(type, () => (counter = false));
    }
  }
  el.addEventListener('change', ({ target }) => {
    if (target.localName === 'wa-number-input' && count >= 100) complete('hundred', 'One hundred!');
  });

  const chart = el.querySelector('.chart');
  if (chart) {
    const colour = k => `var(--accent-${k + 1})`;
    const switches = [...el.querySelectorAll('[data-type="switches"] wa-switch')];
    const thickness = el.querySelector('[data-type="sliders"] wa-slider:not([range])');
    const labels = switches.map(s => s.textContent.trim());
    faders.forEach((f, k) => {
      f.style.setProperty('--wa-form-control-activated-color', colour(k));
      f.addEventListener('input', () => { if (switches[k]) switches[k].checked = true; });
    });
    const legend = chart.querySelector('.legend');
    legend.innerHTML = labels.map((label, k) => `<li style="--swatch:${colour(k)}">${label}</li>`).join('');
    const draw = () => {
      chart.classList.toggle('counting', counter);
      chart.style.setProperty('--hole', `${thickness ? 80 - thickness.value * 0.6 : 55}%`);
      if (counter) {
        chart.querySelector('.doughnut').style.background = `conic-gradient(${colour(0)} ${Math.min(count, 100)}%, var(--wa-color-surface-border) 0)`;
        chart.querySelector('.count').textContent = `${count}%`;
        return;
      }
      const values = switches.map((s, k) => (s.checked ? faders[k]?.value ?? 0 : 0));
      const total = values.reduce((sum, v) => sum + v, 0) || 1;
      let from = 0;
      chart.querySelector('.doughnut').style.background = `conic-gradient(${values.map((v, k) => `${colour(k)} ${from}turn ${(from += v / total)}turn`).join(', ')}, transparent ${from}turn), var(--wa-color-surface-border)`;
      [...legend.children].forEach((li, k) => li.classList.toggle('off', !values[k]));
    };
    el.addEventListener('input', draw);
    el.addEventListener('change', draw);
    draw();
  }
}
