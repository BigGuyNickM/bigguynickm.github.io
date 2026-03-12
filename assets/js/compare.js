const _clamp = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v));

// single module-level drag state — avoids N window listeners for N compare widgets
let _active = null;

const _setPos = (root, top, div, handle, client_x) => {
  const r   = root.getBoundingClientRect();
  const pct = _clamp((client_x - r.left) / r.width);
  const str = `${(pct * 100).toFixed(3)}%`;
  top.style.clipPath = `inset(0 ${(100 - pct * 100).toFixed(3)}% 0 0)`;
  div.style.left     = str;
  handle.style.left  = str;
  return pct;
};

const _initCompare = (root) => {
  const top    = root.querySelector('[data-compare-top]');
  const div    = root.querySelector('[data-compare-divider]');
  const handle = root.querySelector('[data-compare-handle]');
  if (!top || !div || !handle) return;

  let cur_pct = 0.5;

  handle.addEventListener('pointerdown', () => {
    _active = { root, top, div, handle, get_pct: () => cur_pct };
  });

  // set initial 50/50
  cur_pct = _setPos(root, top, div, handle, root.getBoundingClientRect().left + root.offsetWidth / 2);

  // expose for resize recalc
  root._compare_pct = () => cur_pct;
  root._compare_set = (cx) => { cur_pct = _setPos(root, top, div, handle, cx); };
};

// single shared pointermove/pointerup on window
window.addEventListener('pointermove', (e) => {
  if (!_active) return;
  _active.root._compare_set(e.clientX);
}, { passive: true });

window.addEventListener('pointerup', () => { _active = null; });

// resize: nudge each widget to keep ratio
window.addEventListener('resize', () => {
  document.querySelectorAll('[data-compare]').forEach(root => {
    if (!root._compare_set || !root._compare_pct) return;
    const r = root.getBoundingClientRect();
    root._compare_set(r.left + root._compare_pct() * r.width);
  });
}, { passive: true });

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-compare]').forEach(_initCompare);
});