
import { escHtml, escAttr } from './utils.js';
import { speak, injectSpeakerIcons, SPEAKER_SVG } from './tts.js';
import { observeFadeIns } from './layout.js';

export function renderGrammar() {
  const container = document.getElementById('grammar-content');
  if (!container) return;
  const grammarData = (window.APP_DATA || {}).grammarData || [];
  if (!grammarData.length) return;

  const CHEVRON = `<svg class="grammar-chevron" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>`;
  const LINK_ICON = `<svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>`;

  // Group by type, preserving order of first appearance
  const groups = {};
  const groupOrder = [];
  for (const entry of grammarData) {
    if (!groups[entry.type]) {
      groups[entry.type] = { label: entry.typeLabel, entries: [] };
      groupOrder.push(entry.type);
    }
    groups[entry.type].entries.push(entry);
  }

  let html = '';
  let isFirst = true;

  for (const type of groupOrder) {
    const group = groups[type];
    html += `<div class="grammar-group-label">${escHtml(group.label)}</div>`;

    for (const entry of group.entries) {
      const openClass = isFirst ? ' open' : '';
      isFirst = false;

      const examplesHtml = entry.examples.map(ex =>
        `<div class="grammar-example">
          <div class="grammar-example-hu">
            ${ex.hu}
            <button class="speaker-btn" style="margin-left:4px" onclick="event.stopPropagation(); window.speak('${escAttr(ex.hu.replace(/<[^>]*>/g, ''))}', 'hu-HU', this)">${SPEAKER_SVG}</button>
          </div>
          <div class="grammar-example-ru">${escHtml(ex.ru)}</div>
          ${ex.note ? `<div class="grammar-example-note">${escHtml(ex.note)}</div>` : ''}
        </div>`
      ).join('');

      const linksHtml = (entry.links || []).map(link =>
        `<a class="grammar-link" href="${escAttr(link.url)}" target="_blank" rel="noopener">${LINK_ICON} ${escHtml(link.label)}</a>`
      ).join('');

      const explanationRuHtml = entry.explanationRu
        ? `<div class="grammar-explanation grammar-explanation-ru"><span class="trans-flag" style="font-size:0.7rem;margin-right:6px;vertical-align:middle">RU</span>${escHtml(entry.explanationRu)}</div>`
        : '';

      html += `
        <div class="grammar-card${openClass} fade-in">
          <div class="grammar-card-header" onclick="window.toggleGrammarCard(this.parentElement)">
            <div class="grammar-card-icon">${entry.icon}</div>
            <div class="grammar-card-meta">
              <div class="grammar-card-title">${escHtml(entry.title)}</div>
              <div class="grammar-card-summary">${escHtml(entry.summary)}</div>
            </div>
            ${CHEVRON}
          </div>
          <div class="grammar-card-body" onclick="event.stopPropagation()">
            <div class="grammar-explanation">${escHtml(entry.explanation)}</div>
            ${explanationRuHtml}
            <div class="grammar-examples">${examplesHtml}</div>
            ${linksHtml ? `<div class="grammar-links">${linksHtml}</div>` : ''}
          </div>
        </div>`;
    }
  }

  container.innerHTML = html;
  requestAnimationFrame(observeFadeIns);
  injectSpeakerIcons(container);
}

export function toggleGrammarCard(card) {
  card.classList.toggle('open');
}
