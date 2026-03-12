document.addEventListener('DOMContentLoaded', () => {
  const scroll_btn = document.getElementById('scroll-btn');
  if (!scroll_btn) return;

  scroll_btn.addEventListener('click', () => {
    const target = document.getElementById('featured') || document.getElementById('work');
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});