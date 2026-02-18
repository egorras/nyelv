
import { escHtml, escAttr, shuffle } from './utils.js';
import { getSpeakerBtn } from './tts.js';

export class QuizEngine {
    constructor(config) {
        this.containerId = config.containerId || 'quiz-area';
        this.pool = config.pool || {};
        this.quizType = config.quizType || 'main'; // 'main' or 'grammar'

        // State
        this.session = [];
        this.index = 0;
        this.score = 0;
        this.answered = false;
        this.results = [];
        this.currentData = null; // Current question data props
    }

    init() {
        if (!this.pool || !this.pool.choice) {
            this.renderError();
            return;
        }
        this.session = this.buildSession();
        this.index = 0;
        this.score = 0;
        this.results = [];
        this.render();
    }

    buildSession() {
        const session = [];
        const pick = (arr, n) => (arr && arr.length) ? shuffle([...arr]).slice(0, n) : [];

        // Configurable mix? Since we want to balance types:
        if (this.quizType === 'grammar') {
            pick(this.pool.choice, 4).forEach(q => session.push({ type: 'choice', data: q }));
            pick(this.pool.fill, 3).forEach(q => session.push({ type: 'fill', data: q }));
            pick(this.pool.order, 2).forEach(q => session.push({ type: 'order', data: q }));
        } else {
            pick(this.pool.choice, 4).forEach(q => session.push({ type: 'choice', data: q }));
            pick(this.pool.fill, 3).forEach(q => session.push({ type: 'fill', data: q }));
            pick(this.pool.order, 3).forEach(q => session.push({ type: 'order', data: q }));
        }
        return shuffle(session);
    }

    renderError() {
        const el = document.getElementById(this.containerId);
        if (el) el.innerHTML = '<div class="quiz-result"><p>Hiba: A kvíz adatok nem töltődtek be.</p></div>';
    }

    render() {
        const area = document.getElementById(this.containerId);
        if (!area) return;

        const dots = this.renderDots();

        if (this.index >= this.session.length) {
            this.renderEndScreen(area, dots);
            return;
        }

        this.answered = false;
        const item = this.session[this.index];
        const typeLabels = { choice: 'Válassz', fill: 'Töltsd ki', order: 'Rakd sorba' };
        const label = typeLabels[item.type] || item.type;

        if (item.type === 'choice') this.renderChoice(area, dots, item.data, label);
        else if (item.type === 'fill') this.renderFill(area, dots, item.data, label);
        else if (item.type === 'order') this.renderOrder(area, dots, item.data, label);
    }

    renderDots() {
        return `<div class="quiz-progress">${this.session.map((_, i) => {
            let cls = 'quiz-dot';
            if (i < this.index) cls += this.results[i] ? ' done' : ' failed';
            else if (i === this.index) cls += ' current';
            return `<div class="${cls}"></div>`;
        }).join('')}</div>`;
    }

    renderEndScreen(area, dots) {
        const pct = Math.round(this.score / this.session.length * 100);
        const msg = pct >= 80 ? 'Kiváló! Szuper vagy!' :
            pct >= 50 ? 'Jó munka! Gyakorolj tovább!' :
                'Ne add fel, próbáld újra!';

        area.innerHTML = `
      ${dots}
      <div class="quiz-result">
        <div class="score">${this.score} / ${this.session.length}</div>
        <p>${msg}</p>
        <button class="quiz-restart">Újra</button>
      </div>`;

        // Bind click safely
        area.querySelector('.quiz-restart').onclick = () => this.init();
    }

    recordResult(correct) {
        this.results[this.index] = correct;
        if (correct) this.score++;

        // Update dots in place
        const area = document.getElementById(this.containerId);
        if (area) {
            const progEl = area.querySelector('.quiz-progress');
            if (progEl) progEl.outerHTML = this.renderDots();
        }
    }

    next() {
        this.index++;
        this.render();
    }

    // ── Choice Renderer ──
    renderChoice(area, dots, data, label) {
        if (!data || !data.opts || !Array.isArray(data.opts)) {
            console.error('QuizEngine: Invalid options for choice:', data);
            area.innerHTML = `${dots}<div class="quiz-error">Hiba: Érvénytelen kérdés adat.</div><div class="quiz-btn-row"><button class="quiz-next show">Következő</button></div>`;
            area.querySelector('.quiz-next').onclick = () => this.next();
            return;
        }

        area.innerHTML = `
      ${dots}
      <div class="quiz-type-badge choice">${label}</div>
      <div class="quiz-question">${escHtml(data.q)}</div>
      <div class="quiz-options"></div>
      <div class="quiz-feedback"></div>
      <div class="quiz-btn-row"><button class="quiz-next">Következő</button></div>
    `;

        // Logic setup
        const allIdxs = data.opts.map((_, i) => i);
        const shuffledIdxs = shuffle([...allIdxs]);
        const correctIdx = shuffledIdxs.indexOf(data.correct);

        this.currentData = { correctIdx, hint: data.hint };

        const optsEl = area.querySelector('.quiz-options');
        optsEl.innerHTML = shuffledIdxs.map((origIdx, i) =>
            // Handle "Text / Translation" format by stripping translation for display if needed?
            `<button class="quiz-opt" data-i="${i}">${escHtml(data.opts[origIdx].replace(/\s*\/.*$/, ''))}</button>`
        ).join('');

        // Attach events
        area.querySelectorAll('.quiz-opt').forEach(el => {
            el.onclick = () => this.handleChoiceAnswer(el, parseInt(el.dataset.i), area);
        });

        const nextBtn = area.querySelector('.quiz-next');
        nextBtn.onclick = () => this.next();
    }

    handleChoiceAnswer(el, idx, area) {
        if (this.answered) return;
        this.answered = true;

        const { correctIdx, hint } = this.currentData;
        const fb = area.querySelector('.quiz-feedback');
        const nextBtn = area.querySelector('.quiz-next');

        area.querySelectorAll('.quiz-opt').forEach(o => o.classList.add('disabled'));

        if (idx === correctIdx) {
            el.classList.add('correct');
            fb.innerHTML = '<span style="color:var(--success)">Helyes!</span>';
            this.recordResult(true);
        } else {
            el.classList.add('wrong');
            const correctEl = area.querySelectorAll('.quiz-opt')[correctIdx];
            if (correctEl) correctEl.classList.add('correct');
            fb.innerHTML = `<span style="color:var(--danger)">Sajnos nem.</span><div class="quiz-hint">${escHtml(hint)}</div>`;
            this.recordResult(false);
        }
        nextBtn.classList.add('show');
    }

    // ── Fill Renderer ──
    renderFill(area, dots, data, label) {
        if (!data || !data.sentence || !data.distractors || !Array.isArray(data.distractors)) {
            console.error('QuizEngine: Invalid fill data:', data);
            area.innerHTML = `${dots}<div class="quiz-error">Hiba: Érvénytelen kérdés adat.</div><div class="quiz-btn-row"><button class="quiz-next show">Következő</button></div>`;
            area.querySelector('.quiz-next').onclick = () => this.next();
            return;
        }

        const parts = data.sentence.split('___');
        const allOpts = shuffle([data.blank, ...data.distractors]);

        this.currentData = { correct: data.blank, hint: data.hint };

        area.innerHTML = `
      ${dots}
      <div class="quiz-type-badge fill">${label}</div>
      <div class="fill-container">
        <div class="fill-sentence">
          ${escHtml(parts[0])}<span class="fill-blank">?</span>${escHtml(parts[1] || '')}
          ${getSpeakerBtn(data.sentence.replace('___', '...'), 'hu-HU')}
        </div>
        <div class="fill-options">
          ${allOpts.map(o => `<button class="fill-chip">${escHtml(o)}</button>`).join('')}
        </div>
      </div>
      <div class="quiz-feedback"></div>
      <div class="quiz-btn-row"><button class="quiz-next">Következő</button></div>
    `;

        const blank = area.querySelector('.fill-blank');
        const nextBtn = area.querySelector('.quiz-next');
        nextBtn.onclick = () => this.next();

        area.querySelectorAll('.fill-chip').forEach(chip => {
            chip.onclick = () => this.handleFillAnswer(chip, chip.textContent, blank, area);
        });
    }

    handleFillAnswer(chip, chosen, blank, area) {
        if (this.answered) return;
        this.answered = true;

        const { correct, hint } = this.currentData;
        const fb = area.querySelector('.quiz-feedback');
        const nextBtn = area.querySelector('.quiz-next');

        blank.textContent = chosen;
        area.querySelectorAll('.fill-chip').forEach(c => c.style.pointerEvents = 'none');

        if (chosen === correct) {
            blank.classList.add('correct-answer');
            chip.classList.add('correct');
            fb.innerHTML = '<span style="color:var(--success)">Helyes!</span>';
            this.recordResult(true);
        } else {
            blank.classList.add('wrong-answer');
            chip.classList.add('wrong');
            // Highlight correct chip
            area.querySelectorAll('.fill-chip').forEach(c => {
                if (c.textContent === correct) c.classList.add('correct');
            });
            fb.innerHTML = `<span style="color:var(--danger)">Helyes válasz: <b>${escHtml(correct)}</b></span><div class="quiz-hint">${escHtml(hint)}</div>`;
            this.recordResult(false);
        }
        nextBtn.classList.add('show');
    }

    // ── Order Renderer ──
    renderOrder(area, dots, data, label) {
        if (!data || !data.words || !Array.isArray(data.words)) {
            console.error('QuizEngine: Invalid order data:', data);
            area.innerHTML = `${dots}<div class="quiz-error">Hiba: Érvénytelen kérdés adat.</div><div class="quiz-btn-row"><button class="quiz-next show">Következő</button></div>`;
            area.querySelector('.quiz-next').onclick = () => this.next();
            return;
        }

        const shuffledWords = shuffle([...data.words]);
        this.currentData = {
            correctWords: data.words,
            hint: data.hint,
            placedWords: []
        };

        area.innerHTML = `
      ${dots}
      <div class="quiz-type-badge order">${label}</div>
      <div class="quiz-question" style="font-size:1rem;font-family:Inter,sans-serif;color:var(--text-dim)">
        ${escHtml(data.ru)}
      </div>
      <div class="order-target"></div>
      <div class="order-bank">
        ${shuffledWords.map((w, i) => `<button class="order-word in-bank" data-word="${escAttr(w)}" data-idx="${i}">${escHtml(w)}</button>`).join('')}
      </div>
      <div class="quiz-feedback"></div>
      <div class="quiz-btn-row">
        <button class="quiz-check" style="display:none">Ellenőriz</button>
        <button class="quiz-next">Következő</button>
      </div>
    `;

        const target = area.querySelector('.order-target');
        const bank = area.querySelector('.order-bank');
        const checkBtn = area.querySelector('.quiz-check');
        const nextBtn = area.querySelector('.quiz-next');

        nextBtn.onclick = () => this.next();
        checkBtn.onclick = () => this.handleOrderCheck(area);

        // Initial Bank Clicks
        bank.querySelectorAll('.order-word').forEach(el => {
            el.onclick = () => this.handlePlaceWord(el, target, checkBtn, area);
        });
    }

    handlePlaceWord(el, target, checkBtn, area) {
        if (this.answered) return;
        if (!el.classList.contains('in-bank')) return; // Should be in bank

        el.classList.add('placed');

        const clone = document.createElement('div');
        clone.className = 'order-word placed';
        clone.dataset.word = el.dataset.word;
        clone.dataset.srcIdx = el.dataset.idx;
        clone.textContent = el.textContent;

        clone.onclick = () => {
            if (this.answered) return;
            const srcIdx = clone.dataset.srcIdx;
            const bankWord = area.querySelector(`.order-bank .order-word[data-idx="${srcIdx}"]`);
            if (bankWord) bankWord.classList.remove('placed');
            clone.remove();
            this.updatePlacedWords(area, checkBtn);
        };

        target.appendChild(clone);
        this.updatePlacedWords(area, checkBtn);
    }

    updatePlacedWords(area, checkBtn) {
        const placedEls = [...area.querySelectorAll('.order-target .order-word')];
        this.currentData.placedWords = placedEls.map(w => w.dataset.word);

        if (this.currentData.placedWords.length === this.currentData.correctWords.length) {
            checkBtn.style.display = 'inline-block';
        } else {
            checkBtn.style.display = 'none';
        }
    }

    handleOrderCheck(area) {
        if (this.answered) return;
        this.answered = true;

        const { correctWords, hint, placedWords } = this.currentData;
        const fb = area.querySelector('.quiz-feedback');
        const target = area.querySelector('.order-target');
        const checkBtn = area.querySelector('.quiz-check');
        const nextBtn = area.querySelector('.quiz-next');

        // Freeze
        area.querySelectorAll('.order-word').forEach(w => w.style.pointerEvents = 'none');
        checkBtn.style.display = 'none';

        const correctSentence = correctWords.join(' ');
        const isCorrect = placedWords.join(' ') === correctSentence;

        if (isCorrect) {
            target.classList.add('correct-order');
            fb.innerHTML = `<span style="color:var(--success)">Helyes!</span> ${getSpeakerBtn(correctSentence, 'hu-HU')}`;
            this.recordResult(true);
        } else {
            target.classList.add('wrong-order');
            fb.innerHTML = `<span style="color:var(--danger)">Helyes sorrend: <b>${escHtml(correctSentence)}</b></span>
                      ${getSpeakerBtn(correctSentence, 'hu-HU')}
                      <div class="quiz-hint">${escHtml(hint)}</div>`;
            this.recordResult(false);
        }
        nextBtn.classList.add('show');
    }
}
