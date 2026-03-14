// parallax on post hero background
document.addEventListener('DOMContentLoaded', () => {
  const hero = document.querySelector('.post-hero');
  if (!hero) return;

  // skip on mobile; parallax feels janky and drains battery
  if (window.matchMedia('(max-width: 768px)').matches) return;

  const base_focus = getComputedStyle(hero).backgroundPositionY || '50%';

  window.addEventListener('scroll', () => {
    hero.style.backgroundPositionY = `calc(${base_focus} + ${window.scrollY * 0.25}px)`;
  }, { passive: true });
});