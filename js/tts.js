
import { state } from './state.js';
import { escAttr } from './utils.js';

export const SPEAKER_SVG = `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>`;

export const SMALL_SPEAKER_ICON = `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>`;

export const STOP_SVG = `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="6" width="12" height="12"></rect></svg>`;

export const SMALL_STOP_SVG = `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="6" width="12" height="12"></rect></svg>`;

export function speak(text, lang = 'hu-HU', btn = null) {
    if (!window.speechSynthesis) return;

    // If already playing THIS specific text on THIS button, stop it
    if (btn && btn.classList.contains('is-playing')) {
        window.speechSynthesis.cancel();
        return;
    }

    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = lang;
    u.rate = state.speechRate;

    // Set voice
    const voices = window.speechSynthesis.getVoices();
    const voice = voices.find(v => v.lang === lang && !v.localService) || voices.find(v => v.lang === lang);
    if (voice) u.voice = voice;

    // Toggle icon if btn provided
    if (btn) {
        const originalHTML = btn.innerHTML;
        const svg = btn.querySelector('svg');
        const size = svg ? (svg.getAttribute('width') || '20') : '20';

        btn.innerHTML = `<svg viewBox="0 0 24 24" width="${size}" height="${size}" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="6" width="12" height="12"></rect></svg>`;
        btn.classList.add('is-playing');

        u.onend = u.onerror = () => {
            btn.innerHTML = originalHTML;
            btn.classList.remove('is-playing');
        };
    }

    window.speechSynthesis.speak(u);
}

export function getSpeakerBtn(text, lang = 'hu-HU') {
    // Simple inline button for quiz headers etc
    return `<button class="speaker-btn" title="Kiejtés" aria-label="Kiejtés" style="margin-left:8px;vertical-align:middle;display:inline-flex;" onclick="event.stopPropagation(); window.speak('${escAttr(text)}', '${lang}', this)">${SPEAKER_SVG}</button>`;
}

export function injectSpeakerIcons(root) {
    if (!root) return;
    const notes = root.querySelectorAll('.vocab-note b');
    const ICON = `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>`;

    notes.forEach(b => {
        const next = b.nextElementSibling;
        if (next && next.classList.contains('speaker-btn')) return;

        if (b.querySelector('.speaker-btn')) return;
        const btn = document.createElement('button');
        btn.className = 'speaker-btn';
        btn.style.marginLeft = '4px';
        btn.style.padding = '2px';
        btn.innerHTML = ICON;
        btn.title = 'Kiejtés';
        btn.setAttribute('aria-label', 'Kiejtés');
        btn.onclick = (e) => {
            e.stopPropagation();
            speak(b.innerText.replace(/[.,;:]/g, '').trim(), 'hu-HU', btn);
        };
        b.insertAdjacentElement('afterend', btn);
    });
}
