const _clamp = (value, min = 0, max = 1) => Math.max(min, Math.min(max, value));

let _active = null;

const _setPos = (root, top_layer, divider, handle, client_x) => {
  const rect = root.getBoundingClientRect();
  const pct = _clamp((client_x - rect.left) / rect.width);
  const pct_str = `${(pct * 100).toFixed(3)}%`;
  const right_pct = `${(100 - pct * 100).toFixed(3)}%`;

  top_layer.style.clipPath = `inset(0 ${right_pct} 0 0)`;
  divider.style.left = pct_str;
  handle.style.left = pct_str;
  return pct;
};

const _initCompare = (root) => {
  const top_layer = root.querySelector('[data-compare-top]');
  const divider = root.querySelector('[data-compare-divider]');
  const handle = root.querySelector('[data-compare-handle]');
  if (!(top_layer && divider && handle)) return;

  let current_pct = 0.5;

  const set_from_client_x = (client_x) => {
    current_pct = _setPos(root, top_layer, divider, handle, client_x);
  };

  handle.addEventListener('pointerdown', () => {
    _active = { root, get_pct: () => current_pct, set_from_client_x };
  });

  const center_x = root.getBoundingClientRect().left + root.offsetWidth / 2;
  set_from_client_x(center_x);

  root._compare_pct = () => current_pct;
  root._compare_set = set_from_client_x;
};

const handlePointerMove = (event) => {
  if (!_active) return;
  _active.set_from_client_x(event.clientX);
};

const handlePointerUp = () => {
  _active = null;
};

const handleResize = () => {
  document.querySelectorAll('[data-compare]').forEach((compare_root) => {
    const set = compare_root._compare_set;
    const get_pct = compare_root._compare_pct;
    if (!set || !get_pct) return;
    const rect = compare_root.getBoundingClientRect();
    const center_x = rect.left + get_pct() * rect.width;
    set(center_x);
  });
};

window.addEventListener('pointermove', handlePointerMove, { passive: true });
window.addEventListener('pointerup', handlePointerUp);

window.addEventListener('resize', handleResize, { passive: true });

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-compare]').forEach(_initCompare);
});
