const SCROLL_THRESHOLD = 80;

let nav;

const updateNav = () =>
  nav.classList.toggle('scrolled', window.scrollY > SCROLL_THRESHOLD);

const handleNavClick = (event) => {
  const button = event.currentTarget;
  const target = document.getElementById(button.dataset.scroll);
  target ? (event.preventDefault(), target.scrollIntoView({ behavior: 'smooth' })) : undefined;
};

document.addEventListener('DOMContentLoaded', () => {
  nav = document.getElementById('site-nav');
  if (!nav) return;

  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();

  document.querySelectorAll('.nav-btn[data-scroll]').forEach((btn) => {
    btn.addEventListener('click', handleNavClick);
  });
});