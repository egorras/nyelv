
export function escHtml(s) {
    if (typeof s !== 'string') return s;
    const d = document.createElement('div');
    d.textContent = s;
    return d.innerHTML;
}

export function escAttr(s) {
    if (typeof s !== 'string') return s;
    return s.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/"/g, '&quot;');
}

export function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}
