
import { escHtml, escAttr, shuffle } from './utils.js';
import { speak } from './tts.js';

export let ankiDeck = [];
const STORAGE_KEY = 'polyglot_v1';
const INTERVALS = [0, 1, 10, 60, 1440, 4320, 10080];

let cardQueue = [];
let cardIdx = 0;
let cardFlipped = false;

export function setAnkiDeck(deck) {
    ankiDeck = deck;
}

function loadAnki() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; }
    catch (e) { return {}; }
}
function saveAnki(state) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }
    catch (e) { }
}

function getCardState(idx) {
    const card = ankiDeck[idx];
    if (!card) return { box: 0, due: 0 };
    const key = card.hu;
    return loadAnki()[key] || { box: 0, due: 0 };
}

function setCardState(idx, box, due) {
    const card = ankiDeck[idx];
    if (!card) return;
    const key = card.hu;
    const state = loadAnki();
    state[key] = { box, due };
    saveAnki(state);
}

export function initCards() {
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

export function renderCard() {
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

    const SPEAKER_ICON = `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>`;

    box.innerHTML =
        '<div class="card-flip" id="card-flip" onclick="window.flipCard()">' +
        '<div class="card-face card-front">' +
        '<div class="card-word">' + escHtml(card.hu) +
        ' <button class="speaker-btn card-speaker" title="Kiejtés" aria-label="Kiejtés" onclick="event.stopPropagation(); window.speak(\'' + escAttr(card.hu) + '\', \'hu-HU\', this)">' + SPEAKER_ICON + '</button>' +
        '</div>' +
        '<div class="card-pos">' + escHtml(card.pos) + '</div>' +
        '<div class="card-tap-label">koppints a ford\u00edt\u00e1s\u00e9rt</div>' +
        '</div>' +
        '<div class="card-face card-back">' +
        '<div class="card-word">' + escHtml(card.hu) +
        ' <button class="speaker-btn card-speaker" title="Kiejtés" aria-label="Kiejtés" onclick="event.stopPropagation(); window.speak(\'' + escAttr(card.hu) + '\', \'hu-HU\', this)">' + SPEAKER_ICON + '</button>' +
        '</div>' +
        '<div class="card-translation">' + escHtml(card.ru) + '</div>' +
        '<div class="card-translation-en">' + escHtml(card.en) + '</div>' +
        '<div class="card-example">\u00ab' + escHtml(card.ex) + '\u00bb</div>' +
        '</div>' +
        '</div>' +
        '<div class="card-actions" id="card-actions" style="display:none">' +
        '<button class="card-btn again" onclick="window.rateCard(0)">Megint<span class="btn-interval">' + intervals.again + '</span></button>' +
        '<button class="card-btn hard"  onclick="window.rateCard(1)">Neh\u00e9z<span class="btn-interval">' + intervals.hard + '</span></button>' +
        '<button class="card-btn good"  onclick="window.rateCard(2)">J\u00f3<span class="btn-interval">' + intervals.good + '</span></button>' +
        '<button class="card-btn easy"  onclick="window.rateCard(3)">K\u00f6nny\u0171<span class="btn-interval">' + intervals.easy + '</span></button>' +
        '</div>' +
        '<div class="card-counter">' + remaining + ' k\u00e1rtya h\u00e1travan</div>';
}

export function flipCard() {
    if (cardFlipped) return;
    cardFlipped = true;
    const flipEl = document.getElementById('card-flip');
    if (flipEl) flipEl.classList.add('flipped');
    const actionsEl = document.getElementById('card-actions');
    if (actionsEl) actionsEl.style.display = 'flex';

    const ci = cardQueue[cardIdx];
    const card = ankiDeck[ci];
    // Find the speaker btn on the back face to highlight it
    const btn = flipEl ? flipEl.querySelector('.card-back .speaker-btn') : null;
    speak(card.hu, 'hu-HU', btn);
}

export function rateCard(rating) {
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

export function resetCards() {
    localStorage.removeItem(STORAGE_KEY);
    initCards();
}

function formatInterval(minutes) {
    if (minutes < 1) return 'most';
    if (minutes < 60) return minutes + ' p';
    if (minutes < 1440) return Math.round(minutes / 60) + ' \u00f3';
    return Math.round(minutes / 1440) + ' n';
}
