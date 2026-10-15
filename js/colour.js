
export function setupColour(el, root) {
  const toHex = (() => { const ctx = document.createElement('canvas').getContext('2d'); return c => ((ctx.fillStyle = '#000'), (ctx.fillStyle = c), ctx.fillStyle); })();
  const rgb = hex => [1, 3, 5].map(i => parseInt(hex.slice(i, i + 2), 16) / 255);
  const hexOf = c => '#' + c.map(v => Math.round(Math.min(1, Math.max(0, v)) * 255).toString(16).padStart(2, '0')).join('');
  const toLinear = v => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4);
  const toGamma = v => (v <= 0.0031308 ? 12.92 * v : 1.055 * Math.sign(v) * Math.abs(v) ** (1 / 2.4) - 0.055);
  const mix = (m, v) => m.map(row => row.reduce((sum, x, i) => sum + x * v[i], 0));
  // OKLab (Björn Ottosson).
  const toLab = hex => mix([[0.2104542553, 0.7936177850, -0.0040720468], [1.9779984951, -2.4285922050, 0.4505937099], [0.0259040371, 0.7827717662, -0.8086757660]],
    mix([[0.4122214708, 0.5363325363, 0.0514459929], [0.2119034982, 0.6806995451, 0.1073969566], [0.0883024619, 0.2817188376, 0.6299787005]], rgb(hex).map(toLinear)).map(Math.cbrt));
  const fromLab = lab => mix([[4.0767416621, -3.3077115913, 0.2309699292], [-1.2684380046, 2.6097574011, -0.3413193965], [-0.0041960863, -0.7034186147, 1.7076147010]],
    mix([[1, 0.3963377774, 0.2158037573], [1, -0.1055613458, -0.0638541728], [1, -0.0894841775, -1.2914855480]], lab).map(v => v ** 3)).map(toGamma);
  const inGamut = (L, C, h) => {
    let c;
    while ((c = fromLab([L, C * Math.cos(h), C * Math.sin(h)])).some(v => v < 0 || v > 1) && C > 0.001) C *= 0.95;
    return hexOf(c);
  };
  const rotate = (hex, degrees) => {
    const [L, a, b] = toLab(hex);
    return inGamut(L, Math.hypot(a, b), Math.atan2(b, a) + degrees * Math.PI / 180);
  };
  // A colourless pick gets some chroma, in its own hue or else the brand's.
  const vivid = hex => {
    const [L, a, b] = toLab(hex), C = Math.hypot(a, b);
    if (C >= 0.12) return hex;
    const [, ba, bb] = toLab(brand);
    return inGamut(Math.min(0.8, Math.max(0.5, L)), 0.12, C > 0.02 ? Math.atan2(b, a) : Math.atan2(bb, ba));
  };
  const luminance = hex => rgb(hex).map(toLinear).reduce((sum, v, i) => sum + v * [0.2126, 0.7152, 0.0722][i], 0);
  const contrast = (a, b) => { const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x); return (hi + 0.05) / (lo + 0.05); };
  const better = fill => (a, b) => (contrast(fill, a) >= contrast(fill, b) ? a : b);
  const rootStyle = getComputedStyle(root);
  const themeText = ['--wa-color-neutral-20', '--wa-color-neutral-95'].map(v => toHex(rootStyle.getPropertyValue(v).trim()));
  // The theme's text colour with the better WCAG contrast, or black/white when neither reaches AA.
  const labelFor = fill => { const text = themeText.reduce(better(fill)); return contrast(fill, text) >= 4.5 ? text : better(fill)('#000000', '#ffffff'); };
  const paint = (button, c) => {
    for (const [name, value] of Object.entries({
      '--wa-color-fill-loud': c,
      '--wa-color-on-loud': labelFor(c),
      '--wa-color-shadow': `color-mix(in oklab, ${c}, black 30%)`,
      '--wa-color-border-normal': `color-mix(in oklab, ${c}, black 30%)`,
      '--wa-color-border-loud': `color-mix(in oklab, ${c}, black 45%)`,
      '--wa-color-fill-quiet': `color-mix(in oklab, ${c}, white 80%)`,
    })) button.style.setProperty(name, value);
  };
  const ctaButtons = [...el.querySelectorAll('[data-type="cta"] wa-button')];
  const primary = el.querySelector('[data-type="card"] wa-button[variant="brand"]');
  const setAccent = picked => {
    const main = vivid(picked);
    const accents = [0, 180, 90, 270].map(degrees => rotate(main, degrees));
    accents.forEach((c, k) => el.style.setProperty(`--accent-${k + 1}`, c));
    ctaButtons.forEach((button, k) => paint(button, accents[k]));
    if (primary) paint(primary, accents[0]);
  };
  const picker = el.querySelector('[data-type="colour"] wa-color-picker');
  const brand = toHex(rootStyle.getPropertyValue('--wa-color-brand-fill-loud').trim());
  if (picker) {
    picker.value = brand;
    picker.addEventListener('input', () => setAccent(toHex(picker.value)));
  }
  setAccent(brand);
}
