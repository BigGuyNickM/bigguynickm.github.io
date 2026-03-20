(function () {
  const COPY_RESET_MS = 2000;

  const resetCopyButton = (button) => {
    button.textContent = 'Copy';
    button.classList.remove('copied');
  };

  const handleCopySuccess = (button) => {
    button.textContent = 'Copied!';
    button.classList.add('copied');
    setTimeout(() => resetCopyButton(button), COPY_RESET_MS);
  };

  const handleDocumentClick = (event) => {
    const button = event.target.closest('.block-code-copy');
    const pre = button
      ?.closest('.block-code-wrap')
      ?.querySelector('.block-code-pre');
    if (!pre) return;

    const text = pre.textContent.trim();
    navigator.clipboard.writeText(text).then(() => handleCopySuccess(button));
  };

  document.addEventListener('DOMContentLoaded', () => {
    document.addEventListener('click', handleDocumentClick);
  });
})();
