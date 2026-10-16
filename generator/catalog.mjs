
const base = 'https://cdn.jsdelivr.net/npm/@awesome.me/webawesome@3.14.0/dist-cdn';
export const lib = {
  js: `${base}/webawesome.loader.js`,
  css: look => ['webawesome.css', `themes/${look.theme}.css`, `color/palettes/${look.palette}.css`, 'color/variants.css']
    .map(f => `${base}/styles/${f}`),
  classes: look => [`wa-theme-${look.theme}`, `wa-palette-${look.palette}`, `wa-brand-${look.brand}`],
};
export const looks = {
  theme: ['awesome'],
  palette: ['default', 'bright', 'shoelace', 'base'],
  brand: ['blue', 'cyan', 'green', 'indigo', 'orange', 'pink', 'purple', 'red', 'yellow'],
};

const words = {
  colour: ['Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Purple', 'Pink', 'Teal'],
  shape: ['Circle', 'Square', 'Star', 'Heart', 'Triangle', 'Hexagon'],
  size: ['XS', 'S', 'M', 'L', 'XL'],
};
const fives = [
  ['Backstreet Boys', ['Nick', 'Brian', 'AJ', 'Kevin', 'Howie'], ['Justin', 'Lance', 'JC', 'Joey', 'Chris']],
  ['Spice Girls', ['Scary', 'Sporty', 'Baby', 'Posh', 'Ginger'], ['Grumpy', 'Sleepy', 'Dopey', 'Sneezy']],
  ['Senses', ['Sight', 'Hearing', 'Smell', 'Taste', 'Touch'], ['Balance', 'Humour', 'Direction', 'Intuition']],
  ['Tastes', ['Sweet', 'Sour', 'Salty', 'Bitter', 'Umami'], ['Spicy', 'Smoky', 'Tangy', 'Creamy']],
  ['Olympic rings', ['Blue', 'Yellow', 'Black', 'Green', 'Red'], ['Purple', 'Orange', 'Pink', 'White']],
  ['Safari Big Five', ['Lion', 'Leopard', 'Elephant', 'Rhino', 'Buffalo'], ['Giraffe', 'Hippo', 'Cheetah', 'Zebra']],
  ['Workdays', ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], ['Saturday', 'Sunday', 'Funday', 'Someday']],
  ['The five W’s', ['Who', 'What', 'When', 'Where', 'Why'], ['How', 'Which', 'Whom', 'Whence']],
  ['Power Rangers', ['Red', 'Black', 'Blue', 'Yellow', 'Pink'], ['Green', 'White', 'Purple', 'Gold']],
  ['Ninja Turtles', ['Leonardo', 'Raphael', 'Donatello', 'Michelangelo', 'Splinter'], ['Shredder', 'April', 'Casey', 'Krang']],
  ['Mario Kart cups', ['Mushroom', 'Flower', 'Star', 'Special', 'Shell'], ['Coin', 'Feather', 'Boo', 'Cape']],
  ['Saja Boys', ['Jinu', 'Abby', 'Mystery', 'Romance', 'Baby'], ['Rumi', 'Mira', 'Zoey', 'Gwi-Ma']],
  ['CSS position', ['static', 'relative', 'absolute', 'fixed', 'sticky'], ['float', 'flex', 'inherit', 'center']],
  ['Gestalt principles', ['Proximity', 'Similarity', 'Closure', 'Continuity', 'Figure-ground'], ['Contrast', 'Hierarchy', 'Alignment', 'Repetition']],
  ['Vowels', ['A', 'E', 'I', 'O', 'U'], ['Y', 'W', 'K', 'Z']],
];
export const five = r => {
  const [name, members, decoys] = r.pick(fives);
  const missing = r.pick(members);
  return { name, shown: members.filter(m => m !== missing), missing, decoys: r.some(decoys, 3) };
};
export const secrets = ['wombat', 'pickle', 'marmalade', 'tadpole', 'noodle', 'biscuit', 'walrus', 'kazoo'];
const slug = text => text.toLowerCase().replace(/[^a-z0-9]+/g, '-');
const scripts = ['ru', 'ar', 'zh', 'ko', 'ja'];
const pick = { ru: 'Выбери', ar: 'اختر', zh: '选', ko: '골라', ja: '選んで' };
const option = { ru: 'вариант', ar: 'الخيار', zh: '选项', ko: '옵션', ja: 'オプション' };
const inScripts = {
  Nick: ['Ник', 'نيك', '尼克', '닉', 'ニック'], Brian: ['Брайан', 'براين', '布莱恩', '브라이언', 'ブライアン'],
  AJ: ['Эй Джей', 'إيه جيه', null, '에이제이', 'エージェー'], Kevin: ['Кевин', 'كيفن', '凯文', '케빈', 'ケヴィン'],
  Howie: ['Хауи', 'هاوي', '豪伊', '하위', 'ハウイー'],
  Scary: ['Страшная', 'مخيفة', '恐怖', '스케어리', 'スケアリー'], Sporty: ['Спортивная', 'رياضية', '运动', '스포티', 'スポーティ'],
  Baby: ['Бэйби', 'بيبي', '宝贝', '베이비', 'ベイビー'], Posh: ['Шикарная', 'أنيقة', '高贵', '포쉬', 'ポッシュ'],
  Ginger: ['Рыжая', 'صهباء', '姜汁', '진저', 'ジンジャー'],
  Sight: ['Зрение', 'البصر', '视觉', '시각', '視覚'], Hearing: ['Слух', 'السمع', '听觉', '청각', '聴覚'],
  Smell: ['Обоняние', 'الشم', '嗅觉', '후각', '嗅覚'], Taste: ['Вкус', 'التذوق', '味觉', '미각', '味覚'],
  Touch: ['Осязание', 'اللمس', '触觉', '촉각', '触覚'],
  Sweet: ['Сладкий', 'حلو', '甜', '단맛', '甘味'], Sour: ['Кислый', 'حامض', '酸', '신맛', '酸味'],
  Salty: ['Солёный', 'مالح', '咸', '짠맛', '塩味'], Bitter: ['Горький', 'مر', '苦', '쓴맛', '苦味'],
  Umami: ['Умами', 'أومامي', '鲜', '감칠맛', 'うま味'],
  Blue: ['Синий', 'أزرق', '蓝', '파랑', '青'], Yellow: ['Жёлтый', 'أصفر', '黄', '노랑', '黄'], Black: ['Чёрный', 'أسود', '黑', '검정', '黒'],
  Green: ['Зелёный', 'أخضر', '绿', '초록', '緑'], Red: ['Красный', 'أحمر', '红', '빨강', '赤'],
  Pink: ['Розовый', 'وردي', '粉红', '분홍', 'ピンク'],
  Lion: ['Лев', 'أسد', '狮子', '사자', 'ライオン'], Leopard: ['Леопард', 'نمر', '豹', '표범', 'ヒョウ'],
  Elephant: ['Слон', 'فيل', '大象', '코끼리', 'ゾウ'], Rhino: ['Носорог', 'وحيد القرن', '犀牛', '코뿔소', 'サイ'],
  Buffalo: ['Буйвол', 'جاموس', '水牛', '물소', 'スイギュウ'],
  Monday: ['Понедельник', 'الاثنين', '星期一', '월요일', '月曜日'], Tuesday: ['Вторник', 'الثلاثاء', '星期二', '화요일', '火曜日'],
  Wednesday: ['Среда', 'الأربعاء', '星期三', '수요일', '水曜日'], Thursday: ['Четверг', 'الخميس', '星期四', '목요일', '木曜日'],
  Friday: ['Пятница', 'الجمعة', '星期五', '금요일', '金曜日'],
  Who: ['Кто', 'من', '谁', '누구', '誰'], What: ['Что', 'ماذا', '什么', '무엇', '何'], When: ['Когда', 'متى', '什么时候', '언제', 'いつ'],
  Where: ['Где', 'أين', '哪里', '어디', 'どこ'], Why: ['Почему', 'لماذا', '为什么', '왜', 'なぜ'],
  Leonardo: ['Леонардо', 'ليوناردو', '列奥纳多', '레오나르도', 'レオナルド'], Raphael: ['Рафаэль', 'رافائيل', '拉斐尔', '라파엘', 'ラファエロ'],
  Donatello: ['Донателло', 'دوناتيلو', '多纳泰罗', '도나텔로', 'ドナテロ'], Michelangelo: ['Микеланджело', 'مايكل أنجلو', '米开朗基罗', '미켈란젤로', 'ミケランジェロ'],
  Splinter: ['Сплинтер', 'سبلينتر', '斯普林特', '스플린터', 'スプリンター'],
  Mushroom: ['Гриб', 'الفطر', '蘑菇', '버섯', 'キノコ'], Flower: ['Цветок', 'الزهرة', '花', '꽃', 'フラワー'],
  Star: ['Звезда', 'النجمة', '星星', '별', 'スター'], Special: ['Особый', 'الخاص', '特别', '스페셜', 'スペシャル'],
  Shell: ['Панцирь', 'الصدفة', '龟壳', '등껍질', 'コウラ'],
  Jinu: ['Джину', 'جينو', null, '진우', 'ジヌ'], Abby: ['Эбби', 'آبي', '艾比', '애비', 'アビー'],
  Mystery: ['Мистери', 'ميستري', '神秘', '미스터리', 'ミステリー'], Romance: ['Романс', 'رومانس', '浪漫', '로맨스', 'ロマンス'],
  static: ['Статичный', 'ثابت', '静态', '정적', '静的'], relative: ['Относительный', 'نسبي', '相对', '상대', '相対'],
  absolute: ['Абсолютный', 'مطلق', '绝对', '절대', '絶対'], fixed: ['Фиксированный', 'مثبت', '固定', '고정', '固定'],
  sticky: ['Липкий', 'لاصق', '粘性', '스티키', '粘着'],
  Proximity: ['Близость', 'التقارب', '接近', '근접성', '近接'], Similarity: ['Сходство', 'التشابه', '相似', '유사성', '類同'],
  Closure: ['Замкнутость', 'الإغلاق', '闭合', '폐쇄성', '閉合'], Continuity: ['Непрерывность', 'الاستمرارية', '连续', '연속성', '連続'],
  'Figure-ground': ['Фигура и фон', 'الشكل والأرضية', '图形与背景', '전경과 배경', '図と地'],
  A: ['А', null, null, '아', 'ア'], E: ['Е', null, null, '에', 'エ'], I: ['И', null, null, '이', 'イ'],
  O: ['О', null, null, '오', 'オ'], U: ['У', null, null, '우', 'ウ'],
};
const clue = (r, missing) => {
  const names = Object.fromEntries(scripts.map((lang, i) => [lang, inScripts[missing][i]]));
  const last = r.pick(scripts.filter(lang => names[lang]));
  const [one, two] = r.some(scripts.filter(lang => lang !== last), 2);
  return [[pick[one], one], [option[two], two], [names[last], last]];
};
const numberNames = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten',
  'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen', 'twenty'];
const series = r => {
  for (;;) {
    const steps = r.chance(0.25)
      ? Array(2).fill(r.pick([1, 2, -1, -2]))
      : r.shuffle([r.int(2, 5), -r.int(1, 2)]);
    const terms = [r.int(1, 9)];
    for (let i = 0; i < 4; i++) terms.push(terms[i] + steps[i % 2]);
    const [next] = terms.splice(4);
    if (terms.every(t => t >= 1 && t <= 9) && new Set([...terms, next]).size === 5 && next >= 0) return { terms, next };
  }
};
const hexes = ['#e63946', '#f4a261', '#e9c46a', '#2a9d8f', '#457b9d', '#8338ec', '#ff006e', '#06d6a0'];
const value = r => r.int(5, 95);
export const fields = [
  { type: 'select', html: (r, id, { five }) => {
    const [first, ...rest] = five.decoys;
    return `<wa-select aria-label='Who completes the ${five.name}?' data-answer='${slug(five.missing)}'>${[first, ...r.shuffle([...rest, five.missing])].map((t, i) => `<wa-option value='${slug(t)}'${i ? '' : ' selected'}>${t}</wa-option>`).join('')}</wa-select>`;
  } },
  { type: 'time', html: r => `<wa-time-input aria-label='Time' hour-format='24' value='${String(r.int(6, 22)).padStart(2, '0')}:${r.pick(['00', '15', '30', '45'])}'></wa-time-input>` },
  { type: 'number', html: r => `<wa-number-input aria-label='Amount' value='${r.int(1, 9)}' min='0'></wa-number-input>` },
];
const icon = path => `<svg viewBox='0 0 24 24' width='1.2em' height='1.2em' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' aria-hidden='true'>${path}</svg>`;
const sun = icon("<circle cx='12' cy='12' r='4'/><path d='M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4'/>");
const arrow = d => icon(`<path d='${d}'/>`);
const moon = icon("<path d='M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z'/>");
const segmented = (id, items) => `<wa-radio-group name='${id}' orientation='horizontal' value='${items[0]}'>${items.map(t => `<wa-radio appearance='button' value='${t}'>${t}</wa-radio>`).join('')}</wa-radio-group>`;

// Each component: type, row (low/tall), keep (always shown), stretch (takes spare width),
// tile (framed) and html(r, id, board). Rules: nothing navigates or fetches (no href, no src).
export const components = [
  { type: 'prev', row: 'low', keep: true, nav: true, tile: true, html: () => `<wa-button aria-label='Previous board' data-step='-1'>${arrow('M19 12H5M12 19l-7-7 7-7')}</wa-button>` },
  { type: 'next', row: 'low', keep: true, nav: true, tile: true, html: () => `<wa-button aria-label='Next board' data-step='1'>${arrow('M5 12h14M12 5l7 7-7 7')}</wa-button>` },

  ...fields.map(f => ({ ...f, row: 'low', keep: true, tile: true })),

  { type: 'card', row: 'tall', html: (r, id, board) => `<wa-card with-header><div slot='header'>${board.field.html(r, id, board)}</div>`
    + `<div class='set spread'><wa-radio-group name='${id}' orientation='horizontal' value='light' aria-label='Mode'>`
    + `<wa-radio appearance='button' value='light' aria-label='Light'>${sun}</wa-radio><wa-radio appearance='button' value='dark' aria-label='Dark'>${moon}</wa-radio></wa-radio-group>`
    + `<wa-button variant='brand'>Save</wa-button></div></wa-card>` },

  { type: 'numpad', row: 'tall', tile: true, html: () => `<div class='numpad'>${[1, 2, 3, 4, 5, 6, 7, 8, 9].map(n => `<wa-button>${n}</wa-button>`).join('')}</div>` },

  { type: 'cta', row: 'low', tile: true, html: (r, id, { five }) => { const variants = r.some(['brand', 'success', 'warning', 'danger'], 3); return `<wa-button-group label='A clue'>${clue(r, five.missing).map(([text, lang], i) => `<wa-button variant='${variants[i]}' lang='${lang}'><bdi>${text}</bdi></wa-button>`).join('')}</wa-button-group>`; } },

  { type: 'faders', row: 'tall', tile: true, html: r => `<div class='faders'>${[1, 2, 3, 4].map(() => `<wa-slider orientation='vertical' value='${value(r)}'></wa-slider>`).join('')}</div>` },

  { type: 'sliders', row: 'low', stretch: true, tile: true, html: r => { const lo = r.int(10, 40); return `<div class='sliders'><wa-slider value='${value(r)}'></wa-slider><wa-slider range min-value='${lo}' max-value='${lo + r.int(20, 50)}'></wa-slider></div>`; } },

  { type: 'segmented', row: 'low', tile: true, html: (r, id) => segmented(id, r.some(r.pick([words.size, words.colour, words.shape]), 3)) },

  { type: 'colour', row: 'low', tile: true, html: () => `<wa-color-picker swatches='${hexes.join('; ')}' aria-label='Main colour'></wa-color-picker>` },

  { type: 'switches', row: 'tall', tile: true, html: (r, id, { five }) => `<wa-checkbox-group label='${five.name}'>${five.shown.map(t => `<wa-switch${r.chance(.5) ? ' checked' : ''}>${t}</wa-switch>`).join('')}</wa-checkbox-group>` },

  // The tag cloud: removing every tag is the clean-up minigame.
  { type: 'cloud', row: 'tall', tile: true, html: r => `<div class='cloud'>${r.some([...words.colour, ...words.shape], r.int(4, 6)).map(t => `<wa-tag size='small' with-remove>${t}</wa-tag>`).join('')}</div>` },
  { type: 'qr', row: 'tall', tile: true, html: (r, id, { secret }) => `<wa-qr-code value='Add &#39;${secret}&#39; as tag' size='160' label='A secret message' data-secret='${secret}'></wa-qr-code>` },

  { type: 'chart', row: 'tall', tile: true, html: () => `<div class='chart'><div class='dial'><div class='doughnut'></div><span class='count'></span></div><ul class='legend'></ul></div>` },

  { type: 'otp', row: 'low', keep: true, tile: true, html: () => `<wa-otp-input aria-label='Code' type='numeric' length='4'></wa-otp-input>` },

  { type: 'tags', row: 'low', keep: true, stretch: true, tile: true, html: r => {
    const { terms, next } = series(r);
    return `<wa-tag-input aria-label='Tags' placeholder='What comes next?' value='${terms.map(t => numberNames[t]).join(',')}' data-code='${terms.join('')}' data-next='${next}' data-next-name='${numberNames[next]}' style='width:100%'></wa-tag-input>`;
  } },
];

const say = ['Hello', 'Boop', 'Busy', 'Toy', 'Yay', 'Psst'];
const accent = k => `var(--accent-${(k % 4) + 1})`;
const names = ['Robin', 'Sam', 'Alex', 'Kim', 'Noor', 'Jules', 'Max', 'Lou'];
const picture = r => {
  const [a, b, c] = r.some(hexes, 3);
  return 'data:image/svg+xml,' + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 8"><rect width="8" height="8" fill="${a}"/><circle cx="${r.int(1, 7)}" cy="${r.int(1, 7)}" r="${r.int(2, 4)}" fill="${b}"/><rect x="${r.int(0, 4)}" y="${r.int(1, 5)}" width="${r.int(3, 6)}" height="2" fill="${c}" transform="rotate(${r.int(0, 3) * 45} 4 4)"/></svg>`);
};
// Extras around the board on wide screens; they avoid the elements the minigames look for.
export const extras = [
  { row: 'low', html: r => `<wa-rating label='Rating' value='${r.int(1, 5)}'></wa-rating>` },
  { row: 'low', html: r => `<wa-switch${r.chance(0.5) ? ' checked' : ''}>${r.pick(words.colour)}</wa-switch>` },
  { row: 'low', html: r => `<wa-checkbox${r.chance(0.5) ? ' checked' : ''}>${r.pick(words.shape)}</wa-checkbox>` },
  { row: 'low', html: r => `<wa-input aria-label='Text' placeholder='${r.pick(say)}…'></wa-input>` },
  { row: 'low', html: r => `<wa-button variant='${r.pick(['brand', 'success', 'warning', 'danger', 'neutral'])}'>${r.pick(['Click', 'Press', 'Push', 'Tap'])}</wa-button>` },
  { row: 'low', html: (r, id) => segmented(id, r.some(r.pick([words.size, words.colour, words.shape]), 3)) },
  { row: 'low', html: r => `<wa-slider aria-label='Level' value='${value(r)}' style='width: 10rem'></wa-slider>` },
  { row: 'low', html: r => `<wa-copy-button value='${r.pick(say)}'></wa-copy-button>` },
  { row: 'low', html: r => `<nav class='set' aria-label='Menu'>${r.some(['Home', 'Toys', 'Games', 'About', 'Shop', 'Help'], 3).map(t => `<wa-button appearance='plain'>${t}</wa-button>`).join('')}</nav>` },
  { row: 'low', html: r => `<wa-breadcrumb label='Where you are'>${['Home', r.pick(['Toys', 'Games', 'Boards']), r.pick(words.shape)].map(t => `<wa-breadcrumb-item>${t}</wa-breadcrumb-item>`).join('')}</wa-breadcrumb>` },
  { row: 'low', html: () => `<wa-progress-bar indeterminate label='Loading' style='width: 10rem; --track-height: 8px'></wa-progress-bar>` },
  { row: 'low', html: r => `<div class='meter' role='img' aria-label='A stacked bar'>${[1, 2, 3, 4].map(k => `<span style='flex: ${value(r)}; background: ${accent(k)}'></span>`).join('')}</div>` },
  { row: 'low', html: r => `<svg class='spark' viewBox='0 0 100 30' role='img' aria-label='A sparkline'><polyline points='${[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(i => `${i * 10},${r.int(3, 27)}`).join(' ')}' style='stroke: ${accent(r.int(0, 3))}'/></svg>` },
  { row: 'tall', html: r => `<div class='bars' role='img' aria-label='A bar chart'>${[0, 1, 2, 3, 4].map(k => `<span style='height: ${value(r)}%; background: ${accent(k)}'></span>`).join('')}</div>` },
  { row: 'tall', html: r => `<div class='stack'>${r.some(['Start', 'Pause', 'Stop', 'Again', 'Skip'], 3).map((t, i) => `<wa-button${i ? '' : " variant='brand'"}>${t}</wa-button>`).join('')}</div>` },
  { row: 'tall', html: r => `<div class='faders'>${[1, 2, 3].map(() => `<wa-slider orientation='vertical' value='${value(r)}'></wa-slider>`).join('')}</div>` },
  { row: 'tall', either: true, html: r => `<div class='stack'>${r.some(words.colour, 4).map(t => `<wa-checkbox${r.chance(0.5) ? ' checked' : ''}>${t}</wa-checkbox>`).join('')}</div>` },
  { row: 'tall', either: true, html: (r, id) => { const items = r.some(words.shape, 4); return `<wa-radio-group label='Pick one' name='${id}' value='${items[0]}'>${items.map(t => `<wa-radio value='${t}'>${t}</wa-radio>`).join('')}</wa-radio-group>`; } },
  { row: 'tall', html: r => `<wa-textarea aria-label='Notes' placeholder='${r.pick(say)}…' rows='5'></wa-textarea>` },
  { row: 'tall', html: r => { const name = r.pick(names); return `<div class='stack profile'><wa-avatar initials='${name[0]}' label='${name}'></wa-avatar><strong>${name}</strong><wa-button size='small' variant='brand'>Follow</wa-button></div>`; } },
  { row: 'tall', html: r => { const today = r.int(1, 28); return `<div class='month' role='group' aria-label='A month'>${'<span></span>'.repeat(r.int(0, 6))}${Array.from({ length: 30 }, (_, i) => `<button class='day' type='button' aria-pressed='${i + 1 === today}'>${i + 1}</button>`).join('')}</div>`; } },
  { row: 'tall', html: r => { const k = r.int(0, 3); return `<wa-split-panel position='${r.int(30, 70)}' style='width: 12rem; height: 12rem'><div slot='start' style='background: ${accent(k)}'></div><div slot='end' style='background: ${accent(k + 2)}'></div></wa-split-panel>`; } },
  { row: 'tall', html: r => `<wa-button-group orientation='vertical' label='Choose a size'>${r.some(['Tiny', 'Small', 'Medium', 'Large', 'Huge'], 4).map(t => `<wa-button size='small'>${t}</wa-button>`).join('')}</wa-button-group>` },
  { row: 'tall', html: r => `<wa-scroller orientation='vertical' style='height: 12rem; width: 10rem'><ol class='list'>${r.shuffle([...words.colour, ...words.shape]).map(t => `<li>${t}</li>`).join('')}</ol></wa-scroller>` },
  { row: 'low', html: r => `<wa-dropdown><wa-button slot='trigger' with-caret>${r.pick(['Menu', 'Options', 'More'])}</wa-button>${r.some(['Copy', 'Paste', 'Undo', 'Redo', 'Share', 'Rename'], 4).map(t => `<wa-dropdown-item>${t}</wa-dropdown-item>`).join('')}</wa-dropdown>` },
  { row: 'low', html: (r, id) => `<div><wa-button id='tip-${id}'>${r.pick(['Hover me', 'Psst', 'What’s this?'])}</wa-button><wa-tooltip for='tip-${id}'>${r.pick(['Boo!', 'Hi there', 'Nothing here', 'Gotcha'])}</wa-tooltip></div>` },
  { row: 'low', html: r => `<div class='avatars'>${r.some(names, 3).map(n => `<wa-avatar image='${picture(r)}' label='${n}'></wa-avatar>`).join('')}<wa-avatar initials='+${r.int(2, 9)}' label='And more'></wa-avatar></div>` },
];
