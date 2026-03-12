document.addEventListener('DOMContentLoaded', () => {
  const scroll_btn = document.getElementById('scroll-btn');
  if (!scroll_btn) return;

  scroll_btn.addEventListener('click', () => {
    document.getElementById('featured').scrollIntoView({ behavior: 'smooth' });
  });
});