// parallax on post hero background
document.addEventListener('DOMContentLoaded', () => {
  const hero = document.querySelector('.post-hero');
  if (!hero) return;

  // skip on mobile — parallax feels janky and drains battery
  if (window.matchMedia('(max-width: 768px)').matches) return;

  window.addEventListener('scroll', () => {
    hero.style.backgroundPositionY = `calc(50% + ${window.scrollY * 0.25}px)`;
  }, { passive: true });
});