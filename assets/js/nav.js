const SCROLL_THRESHOLD = 80;

let nav;

document.addEventListener('DOMContentLoaded', () => {
  nav = document.getElementById('site-nav');

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > SCROLL_THRESHOLD);
  }, { passive: true });

  document.querySelectorAll('.nav-btn[data-scroll]').forEach(btn => {
    btn.addEventListener('click', e => {
      const target = document.getElementById(btn.dataset.scroll);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    });
  });
});