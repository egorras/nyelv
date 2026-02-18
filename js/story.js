
import { escHtml, escAttr } from './utils.js';
import { speak, injectSpeakerIcons } from './tts.js';
import { observeFadeIns } from './layout.js';

let currentStoryView = 'sentence';

export function setStoryView(mode) {
    currentStoryView = mode;
    const btnS = document.getElementById('view-sentence');
    const btnP = document.getElementById('view-paragraph');
    if (btnS && btnP) {
        if (mode === 'sentence') {
            btnS.classList.add('active');
            btnP.classList.remove('active');
        } else {
            btnS.classList.remove('active');
            btnP.classList.add('active');
        }
    }
    renderStory();
}

export function renderStory() {
    const container = document.getElementById('story-content');
    if (!container) return;
    const storyData = (window.APP_DATA || {}).storyData || [];
    if (!storyData.length) return;

    const SPEAKER_ICON = `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>`;

    let html = '';

    if (currentStoryView === 'paragraph') {
        // ── Paragraph View ──
        for (const act of storyData) {
            for (const scene of act.scenes) {
                const label = escHtml(act.act) + ' \u00b7 ' + escHtml(scene.scene);
                html += '<div class="act-header fade-in"><span class="act-header-line"></span>'
                    + '<span class="act-header-label">' + label + '</span>'
                    + '<span class="act-header-line"></span></div>';

                let huPara = '';
                let ruPara = '';

                for (const block of scene.blocks) {
                    huPara += block.hu + ' ';
                    if (block.ru) ruPara += block.ru + ' ';
                }
                huPara = huPara.trim();

                html += '<div class="paragraph-block fade-in">'
                    + '<div class="paragraph-hu">'
                    + escHtml(huPara)
                    + '</div>'
                    + (ruPara.trim() ? '<div class="paragraph-ru">' + escHtml(ruPara) + '</div>' : '')
                    + '</div>';
            }
        }
    } else {
        // ── Sentence View (Default) ──
        let firstExpanded = false;
        for (const act of storyData) {
            for (const scene of act.scenes) {
                const label = escHtml(act.act) + ' \u00b7 ' + escHtml(scene.scene);
                html += '<div class="act-header fade-in"><span class="act-header-line"></span>'
                    + '<span class="act-header-label">' + label + '</span>'
                    + '<span class="act-header-line"></span></div>';

                for (const block of scene.blocks) {
                    let translationHtml = '';
                    let isExpanded = false;
                    if (!firstExpanded && block.ru) {
                        isExpanded = true;
                        firstExpanded = true;
                    }

                    if (block.ru) {
                        translationHtml = '<div class="translation-panel' + (isExpanded ? ' open' : '') + '">'
                            + '<div class="trans-row"><span class="trans-flag">RU</span>'
                            + '<span class="trans-text">' + escHtml(block.ru) + '</span></div>'
                            + (block.note
                                ? '<div class="vocab-section">'
                                + '<div class="vocab-note">' + block.note + '</div>'
                                + '</div>'
                                : '')
                            + '</div>';
                    }

                    html += '<div class="bilingual-block fade-in">'
                        + '<div class="sentence-hu' + (block.ru ? (isExpanded ? ' revealed' : '') + '" onclick="window.toggleTranslation(this)"' : ' no-trans"') + '>'
                        + '<div class="hu-text">'
                        + escHtml(block.hu)
                        + '<button class="speaker-btn" title="Kiejtés" aria-label="Kiejtés" onclick="event.stopPropagation(); window.speak(\'' + escAttr(block.hu) + '\', \'hu-HU\', this)">' + SPEAKER_ICON + '</button>'
                        + '</div>'
                        + '</div>'
                        + translationHtml
                        + '</div>';
                }
            }
        }
    }
    container.innerHTML = html;
    requestAnimationFrame(observeFadeIns);
    injectSpeakerIcons(container);
}
