
import { initCards } from './cards.js';
import { setSpeechRate } from './state.js';
import { updateThemeBtn, toggleTheme } from './theme.js';

export function renderTopBar(isHome = false) {
  const d = window.APP_DATA || {};
  const homePath = isHome ? '#' : (d.homePath || '../index.html');

  return `
    <div class="top-nav">
        <a href="${homePath}" class="top-btn home-btn ${isHome ? 'hidden' : ''}" title="Vissza a főoldalra" aria-label="Vissza a főoldalra">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
        </a>
        <div class="top-controls">
            <button class="top-btn" id="theme-toggle" onclick="window.toggleTheme()" title="Témaváltás"></button>
            <div style="position:relative">
                <button class="top-btn" id="settings-toggle" onclick="window.toggleSettings(event)" title="Beállítások">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="12" cy="12" r="3"></circle>
                        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                    </svg>
                </button>
                <div class="settings-menu" id="settings-menu" onclick="event.stopPropagation()">
                    <div class="settings-item">
                        <div class="settings-label">
                            <span style="display:flex; align-items:center">
                                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:6px">
                                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                                    <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                                </svg>
                                Felolvasás sebessége
                            </span>
                            <span class="speech-rate-value settings-val">1.0x</span>
                        </div>
                        <input type="range" class="speech-rate-slider" min="0.5" max="1.5" step="0.1" value="1.0" oninput="window.setSpeechRate(this.value)">
                    </div>
                </div>
            </div>
        </div>
    </div>`;
}

export function renderLayout() {
  // Only render if body is empty (or nearly empty, just scripts)
  if (document.querySelector('.hero')) return;

  const d = window.APP_DATA || {};
  const title = d.title || 'Lesson';
  const subtitle = d.titleRu || '';
  const badge = d.badge || '';

  const layoutHtml = `
  ${renderTopBar()}
  <!-- HERO -->
  <div class="hero">
    <div class="hero-badge">${badge}</div>
    <h1>${title}</h1>
    <div class="hero-sub">${subtitle}</div>
  </div>

  <!-- TABS -->
  <nav class="tabs">
    <button class="tab active" data-tab="story">Cselekmény</button>
    <button class="tab" data-tab="facts">Érdekességek</button>
    <button class="tab" data-tab="grammar">Nyelvtan</button>
    <button class="tab" data-tab="cards">Kártyák</button>
    <button class="tab" data-tab="quiz">Kvíz</button>
  </nav>

  <!-- SECTIONS -->
  <div class="section active" id="story">
    <div class="container">
      <div class="view-toggle">
        <button id="view-sentence" class="active" onclick="window.setStoryView('sentence')">Mondat</button>
        <button id="view-paragraph" onclick="window.setStoryView('paragraph')">Bekezdés</button>
      </div>
      <div id="story-content"></div>
    </div>
  </div>

  <div class="section" id="facts">
    <div class="container">
      <div id="facts-content"></div>
    </div>
  </div>

  <div class="section" id="grammar">
    <div class="container">
      <div id="grammar-content"></div>
      <div class="grammar-quiz-section" id="grammar-quiz-section">
        <div class="quiz-card" id="grammar-quiz-area"></div>
      </div>
    </div>
  </div>

  <div class="section" id="cards">
    <div class="container">
      <div class="cards-stats" id="cards-stats"></div>
      <div class="cards-controls">
        <button class="cards-ctrl-btn cards-ctrl-reset" onclick="window.resetCards()">↺ Visszaállítás</button>
      </div>
      <div class="card-box" id="card-box"></div>
      <div class="cards-empty" id="cards-empty" style="display:none">
        <p>Végeztél az összes kártyával! 🎉</p>
        <button class="quiz-restart" onclick="window.initCards()">↺ Újra</button>
      </div>
    </div>
  </div>

  <div class="section" id="quiz">
    <div class="container">
      <div class="quiz-card" id="quiz-area"></div>
    </div>
  </div>

  <div class="footer">
    <a href="${d.footerHref || ''}" target="_blank">${d.footerLabel || ''}</a> &middot; Magyar Állami Operaház &middot; 2026
  </div>
  `;

  // Insert at top of body, before scripts if possible, or just append since body is empty
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = layoutHtml;
  const refNode = document.body.firstChild;
  while (tempDiv.firstChild) {
    document.body.insertBefore(tempDiv.firstChild, refNode);
  }

  // Hide empty tabs
  if (!d.factsData || d.factsData.length === 0) {
    const factsTab = document.querySelector('.tab[data-tab="facts"]');
    if (factsTab) factsTab.style.display = 'none';
  }
  if (!d.grammarData || d.grammarData.length === 0) {
    const grammarTab = document.querySelector('.tab[data-tab="grammar"]');
    if (grammarTab) grammarTab.style.display = 'none';
  }

  // Set title
  if (d.title) {
    const suffix = d.title.includes('Operaház') ? ' története | Magyar Állami Operaház' : ' — Balett | Magyar Állami Operaház';
    document.title = d.title + suffix;
  }
}

export function initTabs() {
  document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
      tab.classList.add('active');
      document.getElementById(tab.dataset.tab).classList.add('active');
      if (tab.dataset.tab === 'cards') initCards();

      const tabsContainer = document.querySelector('.tabs');
      if (tabsContainer) {
        requestAnimationFrame(() => {
          window.scrollTo({ top: tabsContainer.offsetTop, behavior: 'smooth' });
          observeFadeIns();
        });
      }
    });
  });
}

// ── Translation toggle (story, facts) ──
export function toggleTranslation(el) {
  el.classList.toggle('revealed');
  const panel = el.nextElementSibling;
  panel.classList.toggle('open');
}

export function toggleFact(card) {
  card.classList.toggle('revealed');
}

// ── Settings Menu ──
export function toggleSettings(e) {
  e.stopPropagation();
  const menu = document.getElementById('settings-menu');
  if (menu) menu.classList.toggle('open');
}

document.addEventListener('click', () => {
  const menu = document.getElementById('settings-menu');
  if (menu) menu.classList.remove('open');
});

// ── Scroll fade-in ──
export function observeFadeIns() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
    });
  }, { threshold: 0.15 });
  document.querySelectorAll('.fade-in:not(.visible)').forEach(el => obs.observe(el));
}
