const ANIM_MS = 700;
const PAUSE_MS = 2000;
const START_OFFSET = 3;
const TIMING = 'cubic-bezier(0.45, 0, 0.55, 1)';

let track;
let dots;
let items;
let card_count;
let current_index = START_OFFSET;
let autoplay_timer;

const _getStep = () => {
  const computed = window.getComputedStyle(track);
  const gap = parseInt(computed.gap, 10) || 0;
  return items[0].offsetWidth + gap;
};

const _getTransition = (duration_ms, properties = ['transform']) =>
  properties
    .map((prop) => `${prop} ${duration_ms}ms ${prop === 'opacity' ? 'ease' : TIMING}`)
    .join(', ');

const updateUI = (animate = true) => {
  const step = _getStep();
  const duration_ms = animate ? ANIM_MS : 0;

  track.style.transition = _getTransition(duration_ms);
  items.forEach((item) => {
    item.style.transition = _getTransition(duration_ms, ['transform', 'opacity']);
  });

  const offset = current_index * step + items[0].offsetWidth / 2;
  track.style.transform = `translateX(calc(50% - ${offset}px))`;

  items.forEach((item, i) => {
    item.classList.toggle('active', i === current_index);
    item.classList.toggle('inactive', i !== current_index);
  });

  const real_index = (current_index - START_OFFSET + card_count) % card_count;
  dots.forEach((dot, i) => dot.classList.toggle('active', i === real_index));
};

const jumpNext = () => {
  current_index++;
  updateUI(true);

  if (current_index < START_OFFSET + card_count) return;

  setTimeout(() => {
    track.classList.add('carousel-instant');
    current_index = START_OFFSET;
    updateUI(false);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => track.classList.remove('carousel-instant'));
    });
  }, ANIM_MS);
};

const resetAutoplay = () => {
  clearInterval(autoplay_timer);
  autoplay_timer = setInterval(jumpNext, ANIM_MS + PAUSE_MS);
};

document.addEventListener('DOMContentLoaded', () => {
  track = document.getElementById('carousel');
  dots = document.querySelectorAll('.carousel-dot');
  if (!track || !dots.length) return;

  items = track.querySelectorAll('.carousel-item');
  card_count = dots.length;

  if (card_count <= 1) {
    items[0].classList.add('active');
    track.style.transform = `translateX(calc(50% - ${items[0].offsetWidth / 2}px))`;
    track.closest('.carousel-wrapper').classList.add('no-mask');
    return;
  }

  dots.forEach((dot) => {
    dot.addEventListener('click', () => {
      current_index = START_OFFSET + parseInt(dot.dataset.idx, 10);
      updateUI(true);
      resetAutoplay();
    });
  });

  updateUI(false);
  resetAutoplay();
});
