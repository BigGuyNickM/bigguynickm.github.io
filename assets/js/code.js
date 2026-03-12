const COPY_RESET_MS = 2000;

document.addEventListener('DOMContentLoaded', () => {
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.block-code-copy');
    if (!btn) return;

    const pre = btn.closest('.block-code-wrap').querySelector('.block-code-pre');
    if (!pre) return;

    navigator.clipboard.writeText(pre.textContent.trim()).then(() => {
      btn.textContent = 'Copied!';
      btn.classList.add('copied');
      setTimeout(() => {
        btn.textContent = 'Copy';
        btn.classList.remove('copied');
      }, COPY_RESET_MS);
    });
  });
});