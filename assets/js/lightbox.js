const CLOSE_DELAY_MS = 300;

let overlay;
let lightbox_img;

const openLightbox = (src, alt) => {
  lightbox_img.src = src;
  lightbox_img.alt = alt ?? '';
  overlay.classList.add('is-open');
  document.body.style.overflow = 'hidden';
};

const closeLightbox = () => {
  overlay.classList.remove('is-open');
  document.body.style.overflow = '';
  setTimeout(() => {
    lightbox_img.src = '';
  }, CLOSE_DELAY_MS);
};

const handleDocumentClick = (event) => {
  const trigger = event.target.closest?.('.lightbox-trigger') ?? null;
  if (!trigger) return;
  event.preventDefault();
  openLightbox(trigger.dataset.src, trigger.dataset.alt);
};

const handleOverlayClick = (event) => {
  const should_close = event.target === overlay || event.target.classList.contains('lightbox-close');
  should_close ? closeLightbox() : undefined;
};

const handleKeydown = (event) => {
  event.key === 'Escape' ? closeLightbox() : undefined;
};

document.addEventListener('DOMContentLoaded', () => {
  overlay = document.createElement('div');
  overlay.className = 'lightbox-overlay';
  overlay.innerHTML = `
    <button class="lightbox-close" aria-label="Close">✕</button>
    <img class="lightbox-img" src="" alt="">
  `;
  document.body.appendChild(overlay);

  lightbox_img = overlay.querySelector('.lightbox-img');
  if (!lightbox_img) return;

  document.addEventListener('click', handleDocumentClick);
  overlay.addEventListener('click', handleOverlayClick);
  document.addEventListener('keydown', handleKeydown);
});
