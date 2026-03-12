const ANIM_MS = 700;
const PAUSE_MS = 2000;
const START_OFFSET = 3;
const TIMING = 'cubic-bezier(0.45, 0, 0.55, 1)';

let track, dots, items, card_count;
let current_index = START_OFFSET;
let autoplay_timer;

const _getStep = () => {
  const _style = window.getComputedStyle(track);
  return items[0].offsetWidth + parseInt(_style.gap);
};

const _transition = (ms, props = ['transform']) =>
  props.map(p => `${p} ${ms}ms ${p === 'opacity' ? 'ease' : TIMING}`).join(', ');

const updateUI = (animate = true) => {
  const _step = _getStep();
  const _ms = animate ? ANIM_MS : 0;

  track.style.transition = _transition(_ms);
  items.forEach(_item => _item.style.transition = _transition(_ms, ['transform', 'opacity']));

  const _offset = current_index * _step + items[0].offsetWidth / 2;
  track.style.transform = `translateX(calc(50% - ${_offset}px))`;

  items.forEach((_item, _i) => {
    _item.classList.toggle('active', _i === current_index);
    _item.classList.toggle('inactive', _i !== current_index);
  });

  const _real_idx = (current_index - START_OFFSET + card_count) % card_count;
  dots.forEach((_dot, _i) => _dot.classList.toggle('active', _i === _real_idx));
};

const jumpNext = () => {
  current_index++;
  updateUI(true);

  if (current_index < START_OFFSET + card_count) return;

  setTimeout(() => {
    current_index = START_OFFSET;
    updateUI(false);
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

  // single featured post — center it, no scrolling or autoplay
  if (card_count <= 1) {
    items[0].classList.add('active');
    track.style.transform = `translateX(calc(50% - ${items[0].offsetWidth / 2}px))`;
    track.closest('.carousel-wrapper').classList.add('no-mask');
    return;
  }

  dots.forEach(_dot => {
    _dot.addEventListener('click', () => {
      current_index = START_OFFSET + parseInt(_dot.dataset.idx);
      updateUI(true);
      resetAutoplay();
    });
  });

  updateUI(false);
  resetAutoplay();
});