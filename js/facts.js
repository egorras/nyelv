
import { escHtml, escAttr } from './utils.js';
import { speak, injectSpeakerIcons, SMALL_SPEAKER_ICON } from './tts.js';
import { observeFadeIns } from './layout.js';

export function renderFacts() {
  const container = document.getElementById('facts-content');
  if (!container) return;
  const factsData = (window.APP_DATA || {}).factsData || [];
  if (!factsData.length) return;

  const SPEAKER_ICON = SMALL_SPEAKER_ICON;

  let html = '';
  factsData.forEach((fact, idx) => {
    const revealed = idx === 0 ? ' revealed' : '';
    html += `
      <div class="fact-card${revealed} fade-in" onclick="window.toggleFact(this)">
        <div class="fact-top">
          <div class="fact-icon">${fact.icon}</div>
          <div class="fact-content">
            <h3>${escHtml(fact.title)} <button class="speaker-btn" title="Kiejtés" aria-label="Kiejtés"
                onclick="event.stopPropagation(); window.speak('${escAttr(fact.title)}', 'hu-HU', this)">${SPEAKER_ICON}</button></h3>
            <p>${escHtml(fact.hu)} <button class="speaker-btn" title="Kiejtés" aria-label="Kiejtés"
                onclick="event.stopPropagation(); window.speak('${escAttr(fact.hu)}', 'hu-HU', this)">${SPEAKER_ICON}</button></p>
          </div>
        </div>
        <div class="fact-trans">
          <div class="trans-row"><span class="trans-flag">RU</span><span class="trans-text">${escHtml(fact.ru)}</span></div>
          ${fact.note ? `<div class="vocab-section"><div class="vocab-note">${fact.note}</div></div>` : ''}
        </div>
      </div>`;
  });

  container.innerHTML = html;
  requestAnimationFrame(observeFadeIns);
  injectSpeakerIcons(container);
}
