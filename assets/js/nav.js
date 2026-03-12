const SCROLL_THRESHOLD = 80;

let nav;

const updateNav = () =>
  nav.classList.toggle('scrolled', window.scrollY > SCROLL_THRESHOLD);

document.addEventListener('DOMContentLoaded', () => {
  nav = document.getElementById('site-nav');

  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav(); // check immediately on load

  document.querySelectorAll('.nav-btn[data-scroll]').forEach(btn => {
    btn.addEventListener('click', e => {
      const target = document.getElementById(btn.dataset.scroll);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    });
  });
});