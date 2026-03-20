const COL_BREAKPOINTS = [
  { min: 1250, cols: 4 },
  { min: 970, cols: 3 },
  { min: 690, cols: 2 },
];
const ROW_LIMIT = 2;
const RESIZE_DEBOUNCE_MS = 120;

let filter_btns;
let post_cards;
let show_more_btn;
let show_all = false;
let current_filter = 'all';
let resize_timer = null;

const getColumnCount = () => {
  const match = COL_BREAKPOINTS.find((breakpoint) => window.innerWidth >= breakpoint.min);
  return match?.cols ?? 1;
};

const applyRowLimit = () => {
  const cols = getColumnCount();
  const visible_limit = cols * ROW_LIMIT;
  let visible_count = 0;
  let total_matching = 0;

  post_cards.forEach((card) => {
    const matches_filter = current_filter === 'all' || card.classList.contains(`post-card--${current_filter}`);
    if (!matches_filter) {
      card.style.display = 'none';
      card.classList.remove('post-card-hidden');
      return;
    }
    total_matching++;
    visible_count++;
    const past_limit = !show_all && visible_count > visible_limit;
    card.style.display = past_limit ? 'none' : 'block';
    card.classList.toggle('post-card-hidden', past_limit);
  });

  const has_more = !show_all && total_matching > visible_limit;
  show_more_btn.style.display = has_more ? 'flex' : 'none';
};

const applyFilter = (filter) => {
  current_filter = filter;
  applyRowLimit();
};

const handleFilterClick = (clicked_btn) => {
  filter_btns.forEach((other_btn) => other_btn.classList.remove('active'));
  clicked_btn.classList.add('active');
  show_all = false;
  applyFilter(clicked_btn.dataset.filter);
};

const handleResize = () => {
  clearTimeout(resize_timer);
  resize_timer = setTimeout(applyRowLimit, RESIZE_DEBOUNCE_MS);
};

document.addEventListener('DOMContentLoaded', () => {
  filter_btns = document.querySelectorAll('.filter-btn');
  post_cards = document.querySelectorAll('.posts-grid .post-card');
  show_more_btn = document.getElementById('show-more-btn');
  if (!filter_btns.length || !post_cards.length || !show_more_btn) return;

  filter_btns.forEach((btn) => {
    btn.addEventListener('click', () => handleFilterClick(btn));
  });

  show_more_btn.addEventListener('click', () => {
    show_all = true;
    applyRowLimit();
  });

  window.addEventListener('resize', handleResize, { passive: true });

  applyRowLimit();
});