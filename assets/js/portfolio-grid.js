const COL_BREAKPOINTS = [
  { min: 971, cols: 3 },
  { min: 691, cols: 2 },
];
const RESIZE_DEBOUNCE_MS = 120;
const RELAYOUT_DEBOUNCE_MS = 60;
const IMAGE_WAIT_MS = 4000;

let grid;
let cards;
let column_count = 0;
let layout_ready = false;
let resize_timer = null;
let relayout_timer = null;

const _getColumnCount = () => {
  const match = COL_BREAKPOINTS.find((breakpoint) => window.innerWidth >= breakpoint.min);
  return match?.cols ?? 1;
};

const _getShortestIndex = (heights) => heights.indexOf(Math.min(...heights));

const _waitForImage = (img) =>
  new Promise((resolve) => {
    if (img.complete && img.naturalWidth > 0) return resolve();
    img.addEventListener('load', resolve, { once: true });
    img.addEventListener('error', resolve, { once: true });
  });

const layoutGrid = () => {
  const cols = _getColumnCount();
  column_count = cols;

  const columns = Array.from({ length: cols }, () => {
    const column = document.createElement('div');
    column.className = 'portfolio-col';
    return column;
  });

  grid.replaceChildren(...columns);
  grid.classList.add('is-masonry');

  const heights = new Array(cols).fill(0);
  cards.forEach((card) => {
    const target = _getShortestIndex(heights);
    columns[target].appendChild(card);
    heights[target] += card.offsetHeight;
  });
};

const _scheduleRelayout = () => {
  if (!layout_ready) return;
  clearTimeout(relayout_timer);
  relayout_timer = setTimeout(layoutGrid, RELAYOUT_DEBOUNCE_MS);
};

const handleResize = () => {
  clearTimeout(resize_timer);
  resize_timer = setTimeout(() => {
    if (_getColumnCount() !== column_count) layoutGrid();
  }, RESIZE_DEBOUNCE_MS);
};

document.addEventListener('DOMContentLoaded', async () => {
  grid = document.querySelector('.portfolio-grid');
  if (!grid) return;

  cards = Array.from(grid.querySelectorAll('.post-card'));
  if (!cards.length) return;

  grid.style.visibility = 'hidden';

  const images = cards.map((card) => card.querySelector('.post-card-img')).filter(Boolean);
  images.forEach((img) => {
    img.loading = 'eager';
    img.addEventListener('load', _scheduleRelayout);
  });

  await Promise.race([
    Promise.all(images.map(_waitForImage)),
    new Promise((resolve) => setTimeout(resolve, IMAGE_WAIT_MS)),
  ]);

  layoutGrid();
  layout_ready = true;
  grid.style.visibility = '';

  window.addEventListener('resize', handleResize, { passive: true });
});