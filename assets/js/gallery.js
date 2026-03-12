const COL_BREAKPOINTS = [
  { min: 1250, cols: 4 },
  { min: 970,  cols: 3 },
  { min: 690,  cols: 2 },
];
const ROW_LIMIT = 2;

let filter_btns, post_cards, show_more_btn;
let show_all    = false;
let resize_timer = null;

const getColumnCount = () =>
  (COL_BREAKPOINTS.find(b => window.innerWidth >= b.min) ?? { cols: 1 }).cols;

const applyRowLimit = () => {
  const cols    = getColumnCount();
  const visible = Math.min(cols * ROW_LIMIT, post_cards.length);

  post_cards.forEach((card, i) => {
    card.classList.toggle('post-card-hidden', !show_all && i >= visible);
  });

  show_more_btn.style.display = (!show_all && post_cards.length > visible) ? 'flex' : 'none';
};

const applyFilter = (filter) => {
  post_cards.forEach(card => {
    const match = filter === 'all' || card.classList.contains(`post-card--${filter}`);
    card.style.display = match ? 'block' : 'none';
  });
};

document.addEventListener('DOMContentLoaded', () => {
  filter_btns   = document.querySelectorAll('.filter-btn');
  post_cards    = document.querySelectorAll('.posts-grid .post-card');
  show_more_btn = document.getElementById('show-more-btn');
  if (!filter_btns.length || !post_cards.length || !show_more_btn) return;

  filter_btns.forEach(btn => {
    btn.addEventListener('click', () => {
      filter_btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      show_all = false;
      applyFilter(btn.dataset.filter);
      applyRowLimit();
    });
  });

  show_more_btn.addEventListener('click', () => {
    show_all = true;
    applyRowLimit();
  });

  // debounced resize — avoids hammering layout recalc on every px
  window.addEventListener('resize', () => {
    clearTimeout(resize_timer);
    resize_timer = setTimeout(applyRowLimit, 120);
  }, { passive: true });

  applyRowLimit();
});