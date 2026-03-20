document.addEventListener('DOMContentLoaded', () => {
  const hero = document.querySelector('.post-hero');
  if (!hero) return;

  if (window.matchMedia('(max-width: 768px)').matches) return;

  const base_position_y = getComputedStyle(hero).backgroundPositionY || '50%';
  const parallax_factor = 0.25;

  const updateParallax = () => {
    hero.style.backgroundPositionY = `calc(${base_position_y} + ${window.scrollY * parallax_factor}px)`;
  };

  window.addEventListener('scroll', updateParallax, { passive: true });
});