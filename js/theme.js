
export function initTheme() {
    // Apply lesson-specific theme
    if (window.APP_DATA && window.APP_DATA.theme) {
        document.documentElement.dataset.lessonTheme = window.APP_DATA.theme;
    }

    // Default is light (no attribute). If stored is 'dark', set it.
    if (localStorage.getItem('nyelv_theme') === 'dark') {
        document.documentElement.dataset.theme = 'dark';
    }
    updateThemeBtn();
}

export function toggleTheme() {
    const isDark = document.documentElement.dataset.theme === 'dark';
    if (isDark) {
        // Switch to Light
        delete document.documentElement.dataset.theme;
        localStorage.setItem('nyelv_theme', 'light');
    } else {
        // Switch to Dark
        document.documentElement.dataset.theme = 'dark';
        localStorage.setItem('nyelv_theme', 'dark');
    }
    updateThemeBtn();
}

export function updateThemeBtn() {
    const btn = document.getElementById('theme-toggle');
    if (!btn) return;
    // Light if NOT dark
    const isLight = document.documentElement.dataset.theme !== 'dark';
    const SUN = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`;
    const MOON = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
    btn.innerHTML = isLight ? MOON : SUN;
    btn.title = isLight ? 'Sötét mód' : 'Világos mód';
}
