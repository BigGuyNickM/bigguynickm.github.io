const CLOSE_DELAY = 300;

let overlay, lightbox_img;

const openLightbox = (src, alt) => {
  lightbox_img.src = src;
  lightbox_img.alt = alt || '';
  overlay.classList.add('is-open');
  document.body.style.overflow = 'hidden';
};

const closeLightbox = () => {
  overlay.classList.remove('is-open');
  document.body.style.overflow = '';
  setTimeout(() => { lightbox_img.src = ''; }, CLOSE_DELAY);
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

  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('.lightbox-trigger');
    if (!trigger) return;
    e.preventDefault();
    openLightbox(trigger.dataset.src, trigger.dataset.alt);
  });

  overlay.addEventListener('click', (e) => {
    if (e.target !== overlay && !e.target.classList.contains('lightbox-close')) return;
    closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });
});