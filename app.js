// ── Theme ──
(function () {
  // Default is light (no attribute). If stored is 'dark', set it.
  if (localStorage.getItem('onegin_theme') === 'dark') {
    document.documentElement.dataset.theme = 'dark';
  }
  updateThemeBtn();
})();

function toggleTheme() {
  const isDark = document.documentElement.dataset.theme === 'dark';
  if (isDark) {
    // Switch to Light
    delete document.documentElement.dataset.theme;
    localStorage.setItem('onegin_theme', 'light');
  } else {
    // Switch to Dark
    document.documentElement.dataset.theme = 'dark';
    localStorage.setItem('onegin_theme', 'dark');
  }
  updateThemeBtn();
}

function updateThemeBtn() {
  const btn = document.getElementById('theme-toggle');
  if (!btn) return;
  // Light if NOT dark
  const isLight = document.documentElement.dataset.theme !== 'dark';
  const SUN = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`;
  const MOON = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
  btn.innerHTML = isLight ? MOON : SUN;
  btn.title = isLight ? 'Sötét mód' : 'Világos mód';
}

// ── Tabs ──
document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById(tab.dataset.tab).classList.add('active');
    if (tab.dataset.tab === 'cards') initCards();
    requestAnimationFrame(() => {
      window.scrollTo({ top: document.querySelector('.tabs').offsetTop, behavior: 'smooth' });
      observeFadeIns();
    });
  });
});

// ── Translation toggle (story, facts) ──
function toggleTranslation(el) {
  el.classList.toggle('revealed');
  const panel = el.nextElementSibling;
  panel.classList.toggle('open');
}
function toggleFact(card) {
  card.classList.toggle('revealed');
}

// ── Scroll fade-in ──
function observeFadeIns() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
    });
  }, { threshold: 0.15 });
  document.querySelectorAll('.fade-in:not(.visible)').forEach(el => obs.observe(el));
}
observeFadeIns();

// ── Render story from data ──
function renderStory() {
  const container = document.getElementById('story-content');
  if (!container) return;
  const storyData = (window.APP_DATA || {}).storyData || [];
  if (!storyData.length) return;

  let html = '';
  for (const act of storyData) {
    for (const scene of act.scenes) {
      const label = escHtml(act.act) + ' \u00b7 ' + escHtml(scene.scene);
      html += '<div class="act-header fade-in"><span class="act-header-line"></span>'
        + '<span class="act-header-label">' + label + '</span>'
        + '<span class="act-header-line"></span></div>';

      for (const block of scene.blocks) {
        html += '<div class="bilingual-block fade-in">'
          + '<div class="sentence-hu" onclick="toggleTranslation(this)">'
          + '<div class="hu-text">' + escHtml(block.hu) + '</div>'
          + '</div>'
          + '<div class="translation-panel">'
          + '<div class="trans-row"><span class="trans-flag">RU</span>'
          + '<span class="trans-text">' + escHtml(block.ru) + '</span></div>'
          + (block.note
            ? '<div class="vocab-section">'
            + '<div class="vocab-note">' + block.note + '</div>'
            + '</div>'
            : '')
          + '</div>'
          + '</div>';
      }
    }
  }
  container.innerHTML = html;
  requestAnimationFrame(observeFadeIns);
}

// ══════════════════════════════════════
// ── Quiz Engine (Duolingo-style) ──
// ══════════════════════════════════════

let quizPool = {};

let quizSession = [];
let quizIndex = 0;
let quizScore = 0;
let quizAnswered = false;
let quizResults = [];

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function buildQuizSession() {
  const session = [];
  const pick = (arr, n) => shuffle([...arr]).slice(0, n);
  pick(quizPool.choice, 4).forEach(q => session.push({ type: 'choice', data: q }));
  pick(quizPool.fill, 3).forEach(q => session.push({ type: 'fill', data: q }));
  pick(quizPool.order, 3).forEach(q => session.push({ type: 'order', data: q }));
  return shuffle(session);
}

function startQuiz() {
  if (!quizPool || !quizPool.choice) {
    const area = document.getElementById('quiz-area');
    if (area) area.innerHTML = '<div class="quiz-result"><p>Hiba: A kvíz adatok nem töltődtek be.</p></div>';
    return;
  }
  quizSession = buildQuizSession();
  quizIndex = 0;
  quizScore = 0;
  quizResults = [];
  renderQuiz();
}

function renderProgressDots() {
  return '<div class="quiz-progress">' +
    quizSession.map((_, i) => {
      let cls = 'quiz-dot';
      if (i < quizIndex) cls += quizResults[i] ? ' done' : ' failed';
      else if (i === quizIndex) cls += ' current';
      return '<div class="' + cls + '"></div>';
    }).join('') + '</div>';
}

function renderQuiz() {
  const area = document.getElementById('quiz-area');
  if (!area) return;

  const dots = renderProgressDots();

  if (quizIndex >= quizSession.length) {
    const pct = Math.round(quizScore / quizSession.length * 100);
    area.innerHTML = dots +
      '<div class="quiz-result">' +
      '<div class="score">' + quizScore + ' / ' + quizSession.length + '</div>' +
      '<p>' + (pct >= 80 ? 'Kiv\u00e1l\u00f3! Szuper vagy!' : pct >= 50 ? 'J\u00f3 munka! Gyakorolj tov\u00e1bb!' : 'Ne add fel, pr\u00f3b\u00e1ld \u00fajra!') + '</p>' +
      '<button class="quiz-restart" onclick="startQuiz()">\u00dajra</button>' +
      '</div>';
    return;
  }

  quizAnswered = false;
  const item = quizSession[quizIndex];
  const typeName = { choice: 'V\u00e1lassz', fill: 'T\u00f6ltsd ki', order: 'Rakd sorba' }[item.type];

  if (item.type === 'choice') renderChoice(area, dots, item.data, typeName);
  else if (item.type === 'fill') renderFill(area, dots, item.data, typeName);
  else if (item.type === 'order') renderOrder(area, dots, item.data, typeName);
}

function recordResult(correct) {
  quizResults[quizIndex] = correct;
  if (correct) quizScore++;
  const progEl = document.querySelector('.quiz-progress');
  if (progEl) progEl.outerHTML = renderProgressDots();
}

// ── Choice ──
function renderChoice(area, dots, data, label) {
  area.innerHTML = dots +
    '<div class="quiz-type-badge choice">' + label + '</div>' +
    '<div class="quiz-question">' + escHtml(data.q) + '</div>' +
    '<div class="quiz-options" id="quiz-options"></div>' +
    '<div class="quiz-feedback" id="quiz-feedback"></div>' +
    '<div class="quiz-btn-row"><button class="quiz-next" id="quiz-next" onclick="nextQuestion()">K\u00f6vetkez\u0151</button></div>';

  const optsEl = document.getElementById('quiz-options');
  const shuffledIdxs = shuffle([0, 1, 2, 3]);
  const newCorrect = shuffledIdxs.indexOf(data.correct);

  window._currentHint = data.hint;
  window._currentCorrectIdx = newCorrect;

  optsEl.innerHTML = shuffledIdxs.map((origIdx, i) =>
    '<div class="quiz-opt" onclick="answerChoice(this,' + i + ')">' + escHtml(data.opts[origIdx].replace(/\s*\/.*$/, '')) + '</div>'
  ).join('');
}

function answerChoice(el, idx) {
  if (quizAnswered) return;
  quizAnswered = true;
  const correct = window._currentCorrectIdx;
  document.querySelectorAll('.quiz-opt').forEach(o => o.classList.add('disabled'));
  const fb = document.getElementById('quiz-feedback');

  if (idx === correct) {
    el.classList.add('correct');
    fb.innerHTML = '<span style="color:var(--success)">Helyes!</span>';
    recordResult(true);
  } else {
    el.classList.add('wrong');
    document.querySelectorAll('.quiz-opt')[correct].classList.add('correct');
    fb.innerHTML = '<span style="color:var(--danger)">Sajnos nem.</span>' +
      '<div class="quiz-hint">' + escHtml(window._currentHint) + '</div>';
    recordResult(false);
  }
  document.getElementById('quiz-next').classList.add('show');
}

// ── Fill ──
function renderFill(area, dots, data, label) {
  const parts = data.sentence.split('___');
  const allOpts = shuffle([data.blank, ...data.distractors]);

  window._fillCorrect = data.blank;
  window._fillHint = data.hint;

  area.innerHTML = dots +
    '<div class="quiz-type-badge fill">' + label + '</div>' +
    '<div class="fill-container">' +
    '<div class="fill-sentence">' + escHtml(parts[0]) + '<span class="fill-blank" id="fill-blank">?</span>' + escHtml(parts[1] || '') + '</div>' +
    '<div class="fill-options" id="fill-options">' +
    allOpts.map(o => '<div class="fill-chip" onclick="answerFill(this,\'' + escAttr(o) + '\')">' + escHtml(o) + '</div>').join('') +
    '</div>' +
    '</div>' +
    '<div class="quiz-feedback" id="quiz-feedback"></div>' +
    '<div class="quiz-btn-row"><button class="quiz-next" id="quiz-next" onclick="nextQuestion()">K\u00f6vetkez\u0151</button></div>';
}

function answerFill(el, chosen) {
  if (quizAnswered) return;
  quizAnswered = true;
  const correct = window._fillCorrect;
  const blank = document.getElementById('fill-blank');
  const fb = document.getElementById('quiz-feedback');
  blank.textContent = chosen;
  document.querySelectorAll('.fill-chip').forEach(c => c.style.pointerEvents = 'none');

  if (chosen === correct) {
    blank.classList.add('correct-answer');
    el.classList.add('correct');
    fb.innerHTML = '<span style="color:var(--success)">Helyes!</span>';
    recordResult(true);
  } else {
    blank.classList.add('wrong-answer');
    el.classList.add('wrong');
    document.querySelectorAll('.fill-chip').forEach(c => {
      if (c.textContent === correct) c.classList.add('correct');
    });
    fb.innerHTML = '<span style="color:var(--danger)">Helyes v\u00e1lasz: <b>' + escHtml(correct) + '</b></span>' +
      '<div class="quiz-hint">' + escHtml(window._fillHint) + '</div>';
    recordResult(false);
  }
  document.getElementById('quiz-next').classList.add('show');
}

// ── Order ──
function renderOrder(area, dots, data, label) {
  const shuffledWords = shuffle([...data.words]);

  window._orderCorrect = data.words;
  window._orderPlaced = [];
  window._orderHint = data.hint;

  area.innerHTML = dots +
    '<div class="quiz-type-badge order">' + label + '</div>' +
    '<div class="quiz-question" style="font-size:1rem;font-family:Inter,sans-serif;color:var(--text-dim)">' + escHtml(data.ru) + '</div>' +
    '<div class="order-target" id="order-target"></div>' +
    '<div class="order-bank" id="order-bank">' +
    shuffledWords.map((w, i) => '<div class="order-word in-bank" data-word="' + escAttr(w) + '" data-idx="' + i + '" onclick="placeWord(this)">' + escHtml(w) + '</div>').join('') +
    '</div>' +
    '<div class="quiz-feedback" id="quiz-feedback"></div>' +
    '<div class="quiz-btn-row">' +
    '<button class="quiz-check" id="order-check" onclick="checkOrder()" style="display:none">Ellen\u0151riz</button>' +
    '<button class="quiz-next" id="quiz-next" onclick="nextQuestion()">K\u00f6vetkez\u0151</button>' +
    '</div>';
}

function placeWord(el) {
  if (quizAnswered) return;
  const target = document.getElementById('order-target');

  if (el.classList.contains('in-bank')) {
    el.classList.add('placed');
    const clone = document.createElement('div');
    clone.className = 'order-word placed';
    clone.dataset.word = el.dataset.word;
    clone.dataset.srcIdx = el.dataset.idx;
    clone.textContent = el.textContent;
    clone.onclick = function () { unplaceWord(this); };
    target.appendChild(clone);
    window._orderPlaced.push(el.dataset.word);
  }

  if (window._orderPlaced.length === window._orderCorrect.length) {
    document.getElementById('order-check').style.display = 'inline-block';
  }
}

function unplaceWord(el) {
  if (quizAnswered) return;
  const srcIdx = el.dataset.srcIdx;
  const bankWord = document.querySelector('.order-bank .order-word[data-idx="' + srcIdx + '"]');
  if (bankWord) bankWord.classList.remove('placed');
  el.remove();
  window._orderPlaced = [...document.getElementById('order-target').querySelectorAll('.order-word')].map(w => w.dataset.word);
  if (window._orderPlaced.length < window._orderCorrect.length) {
    document.getElementById('order-check').style.display = 'none';
  }
}

function checkOrder() {
  if (quizAnswered) return;
  quizAnswered = true;
  const fb = document.getElementById('quiz-feedback');
  const target = document.getElementById('order-target');
  const isCorrect = window._orderPlaced.join(' ') === window._orderCorrect.join(' ');

  document.querySelectorAll('.order-word').forEach(w => w.style.pointerEvents = 'none');
  document.getElementById('order-check').style.display = 'none';

  if (isCorrect) {
    target.classList.add('correct-order');
    fb.innerHTML = '<span style="color:var(--success)">Helyes!</span>';
    recordResult(true);
  } else {
    target.classList.add('wrong-order');
    fb.innerHTML = '<span style="color:var(--danger)">Helyes sorrend: <b>' + escHtml(window._orderCorrect.join(' ')) + '</b></span>' +
      '<div class="quiz-hint">' + escHtml(window._orderHint) + '</div>';
    recordResult(false);
  }
  document.getElementById('quiz-next').classList.add('show');
}

function nextQuestion() {
  quizIndex++;
  renderQuiz();
}

function escHtml(s) {
  const d = document.createElement('div');
  d.textContent = s;
  return d.innerHTML;
}
function escAttr(s) {
  return s.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/"/g, '&quot;');
}

// ══════════════════════════════════════
// ── Anki-style Flashcards ──
// ══════════════════════════════════════

const STORAGE_KEY = 'onegin_anki';

function loadAnki() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; }
  catch (e) { return {}; }
}
function saveAnki(state) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }
  catch (e) { }
}

function getCardState(id) {
  return loadAnki()[id] || { box: 0, due: 0 };
}
function setCardState(id, box, due) {
  const state = loadAnki();
  state[id] = { box, due };
  saveAnki(state);
}

const INTERVALS = [0, 1, 10, 60, 1440, 4320, 10080];

let cardQueue = [];
let cardIdx = 0;
let cardFlipped = false;

function initCards() {
  if (!ankiDeck || !ankiDeck.length) {
    const box = document.getElementById('card-box');
    if (box) box.innerHTML = '<div class="cards-empty"><p>Hiba: A kártya adatok nem töltődtek be.</p></div>';
    return;
  }
  cardQueue = shuffle(ankiDeck.map((_, i) => i));
  cardIdx = 0;
  cardFlipped = false;
  renderCardStats();
  renderCard();
}

function renderCardStats() {
  const now = Date.now();
  let newC = 0, learnC = 0, youngC = 0, reviewC = 0, matureC = 0;
  const total = ankiDeck.length;
  ankiDeck.forEach((_, i) => {
    const st = getCardState(i);
    const box = st.box || 0;
    if (box === 0) newC++;
    else if (box <= 2) learnC++;
    else if (now >= st.due) reviewC++;
    else if (box >= 6) matureC++;
    else youngC++;
  });
  const el = document.getElementById('cards-stats');
  if (!el) return;

  const pct = v => (v / total * 100).toFixed(1);
  const progressBar = total > 0
    ? '<div class="anki-progress-bar">' +
    (matureC ? '<div class="apb-seg apb-mature" style="width:' + pct(matureC) + '%"></div>' : '') +
    (youngC ? '<div class="apb-seg apb-young"  style="width:' + pct(youngC) + '%"></div>' : '') +
    (learnC ? '<div class="apb-seg apb-learn"  style="width:' + pct(learnC) + '%"></div>' : '') +
    (reviewC ? '<div class="apb-seg apb-review" style="width:' + pct(reviewC) + '%"></div>' : '') +
    (newC ? '<div class="apb-seg apb-new"    style="width:' + pct(newC) + '%"></div>' : '') +
    '</div>'
    : '';

  el.innerHTML =
    '<div class="stat-box"><div class="stat-num new-n">' + newC + '</div><div class="stat-label">Uj</div></div>' +
    '<div class="stat-box"><div class="stat-num learn-n">' + learnC + '</div><div class="stat-label">Tanulas</div></div>' +
    '<div class="stat-box"><div class="stat-num young-n">' + youngC + '</div><div class="stat-label">Fiatal</div></div>' +
    '<div class="stat-box"><div class="stat-num review-n">' + reviewC + '</div><div class="stat-label">Esedékes</div></div>' +
    '<div class="stat-box"><div class="stat-num mature-n">' + matureC + '</div><div class="stat-label">Megtanult</div></div>' +
    progressBar;
}

function renderCard() {
  const box = document.getElementById('card-box');
  const empty = document.getElementById('cards-empty');
  if (!box) return;

  if (cardIdx >= cardQueue.length) {
    box.innerHTML = '';
    empty.style.display = 'block';
    return;
  }
  empty.style.display = 'none';
  cardFlipped = false;

  const ci = cardQueue[cardIdx];
  const card = ankiDeck[ci];
  const st = getCardState(ci);
  const remaining = cardQueue.length - cardIdx;

  const boxNow = st.box || 0;
  const intervals = {
    again: formatInterval(INTERVALS[1]),
    hard: formatInterval(INTERVALS[Math.min(boxNow, INTERVALS.length - 1)]),
    good: formatInterval(INTERVALS[Math.min(boxNow + 1, INTERVALS.length - 1)]),
    easy: formatInterval(INTERVALS[Math.min(boxNow + 2, INTERVALS.length - 1)]),
  };

  box.innerHTML =
    '<div class="card-flip" id="card-flip" onclick="flipCard()">' +
    '<div class="card-face card-front">' +
    '<div class="card-word">' + escHtml(card.hu) + '</div>' +
    '<div class="card-pos">' + escHtml(card.pos) + '</div>' +
    '<div class="card-tap-label">koppints a ford\u00edt\u00e1s\u00e9rt</div>' +
    '</div>' +
    '<div class="card-face card-back">' +
    '<div class="card-word">' + escHtml(card.hu) + '</div>' +
    '<div class="card-translation">' + escHtml(card.ru) + '</div>' +
    '<div class="card-translation-en">' + escHtml(card.en) + '</div>' +
    '<div class="card-example">\u00ab' + escHtml(card.ex) + '\u00bb</div>' +
    '</div>' +
    '</div>' +
    '<div class="card-actions" id="card-actions" style="display:none">' +
    '<button class="card-btn again" onclick="rateCard(0)">Megint<span class="btn-interval">' + intervals.again + '</span></button>' +
    '<button class="card-btn hard"  onclick="rateCard(1)">Neh\u00e9z<span class="btn-interval">' + intervals.hard + '</span></button>' +
    '<button class="card-btn good"  onclick="rateCard(2)">J\u00f3<span class="btn-interval">' + intervals.good + '</span></button>' +
    '<button class="card-btn easy"  onclick="rateCard(3)">K\u00f6nny\u0171<span class="btn-interval">' + intervals.easy + '</span></button>' +
    '</div>' +
    '<div class="card-counter">' + remaining + ' k\u00e1rtya h\u00e1travan</div>';
}

function flipCard() {
  if (cardFlipped) return;
  cardFlipped = true;
  document.getElementById('card-flip').classList.add('flipped');
  document.getElementById('card-actions').style.display = 'flex';
}

function rateCard(rating) {
  const ci = cardQueue[cardIdx];
  const st = getCardState(ci);
  let newBox;
  if (rating === 0) newBox = 1;
  else if (rating === 1) newBox = Math.max(1, (st.box || 0));
  else if (rating === 2) newBox = Math.min((st.box || 0) + 1, INTERVALS.length - 1);
  else newBox = Math.min((st.box || 0) + 2, INTERVALS.length - 1);

  const interval = INTERVALS[newBox] || 0;
  setCardState(ci, newBox, Date.now() + interval * 60000);

  if (rating === 0) cardQueue.push(ci);

  cardIdx++;
  renderCardStats();
  renderCard();
}

function resetCards() {
  localStorage.removeItem(STORAGE_KEY);
  initCards();
}

function formatInterval(minutes) {
  if (minutes < 1) return 'most';
  if (minutes < 60) return minutes + ' p';
  if (minutes < 1440) return Math.round(minutes / 60) + ' \u00f3';
  return Math.round(minutes / 1440) + ' n';
}

// ── Load data and boot ──
const appData = window.APP_DATA || {};
let ankiDeck = appData.ankiDeck || [];
quizPool = appData.quizPool || {};

renderStory();
startQuiz();
