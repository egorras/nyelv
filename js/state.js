
export const state = {
    speechRate: parseFloat(localStorage.getItem('speech_rate')) || 1.0
};

export function setSpeechRate(rate) {
    state.speechRate = parseFloat(rate);
    localStorage.setItem('speech_rate', state.speechRate);

    // Dispatch a custom event so UI components can update themselves
    window.dispatchEvent(new CustomEvent('speech-rate-changed', { detail: state.speechRate }));
}

// Global listener for speech rate changes to update sliders anywhere
window.addEventListener('speech-rate-changed', (e) => {
    const rate = e.detail;
    document.querySelectorAll('.speech-rate-slider').forEach(el => el.value = rate);
    document.querySelectorAll('.speech-rate-value').forEach(el => el.textContent = rate + 'x');
});

// Since the slider calls this globally in HTML: oninput="setSpeechRate(this.value)"
// We must expose it to window eventually, but here we just export.
// The main app.js or layout.js will handle binding.
