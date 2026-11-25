// Draws the hero ASCII shapes from simple geometry and prints them as YAML for src/data/hero-shapes.yaml.
// Nothing here runs in the site; it's a sketchpad for designing shapes.
//
// Preview one shape:   node scripts/shapes.mjs brain
// Preview all shapes:  node scripts/shapes.mjs
// To add a shape: copy a render(...) block, change the name and the drawing function, run it,
// then paste the printed YAML into src/data/hero-shapes.yaml (this script never writes files).
//
// Coordinates: x = column (0–48), y = row × 2 (0–44), because a character is about twice as tall
// as it is wide. So circ(...) < r gives a round circle on screen, not an oval.

const W = 48, H = 22; // max size in characters; the hero canvas grid grows to fit the biggest shape
const only = process.argv[2];

// Distance from point (px, py) to the line segment a→b. Use `seg(...) < thickness` for strokes.
const seg = (px, py, ax, ay, bx, by) => {
  const dx = bx - ax, dy = by - ay;
  const t = Math.max(0, Math.min(1, ((px - ax) * dx + (py - ay) * dy) / (dx * dx + dy * dy)));
  return Math.hypot(px - ax - t * dx, py - ay - t * dy);
};
const circ = (px, py, cx, cy) => Math.hypot(px - cx, py - cy);
const box = (px, py, x0, y0, x1, y1) => px >= x0 && px <= x1 && py >= y0 && py <= y1;
// Inside an ellipse outline of thickness t (center cx,cy; radii rx,ry).
const ring = (px, py, cx, cy, rx, ry, t) =>
  ((px - cx) / rx) ** 2 + ((py - cy) / ry) ** 2 < 1 && ((px - cx) / (rx - t)) ** 2 + ((py - cy) / (ry - t)) ** 2 >= 1;

// Samples `inside(x, y)` at each character's center, trims empty edges, prints YAML.
function render(name, inside) {
  if (only && name !== only) return;
  const rows = [];
  for (let r = 0; r < H; r++) {
    let s = '';
    for (let c = 0; c < W; c++) s += inside(c + 0.5, (r + 0.5) * 2) ? '#' : '.';
    rows.push(s);
  }
  let left = W, right = 0;
  for (const s of rows) {
    if (!s.includes('#')) continue;
    left = Math.min(left, s.indexOf('#'));
    right = Math.max(right, s.lastIndexOf('#'));
  }
  const out = rows.filter((s) => s.includes('#')).map((s) => '.' + s.slice(left, right + 1) + '.');
  console.log(`- name: ${name}\n  rows:\n` + out.map((s) => `    - "${s}"`).join('\n') + '\n');
}

render('initials', (x, y) => {
  const t = 2.6; // stroke half-width
  return seg(x, y, 3, 2, 12, 42) < t || seg(x, y, 21, 2, 12, 42) < t ||
         seg(x, y, 27, 2, 36, 42) < t || seg(x, y, 45, 2, 36, 42) < t;
});

render('neural-network', (x, y) => {
  const layers = [[6, [6, 22, 38]], [24, [6, 22, 38]], [42, [14, 30]]]; // [x, node y's]
  for (const [lx, ys] of layers) for (const ly of ys) if (circ(x, y, lx, ly) < 4.4) return true;
  for (let i = 0; i < layers.length - 1; i++)
    for (const a of layers[i][1]) for (const b of layers[i + 1][1])
      if (seg(x, y, layers[i][0], a, layers[i + 1][0], b) < 0.75) return true;
  return false;
});

render('code-tag', (x, y) => {
  const t = 2.6;
  const lt = seg(x, y, 13, 6, 2, 22) < t || seg(x, y, 2, 22, 13, 38) < t;
  const slash = seg(x, y, 29, 3, 19, 41) < t;
  const gt = seg(x, y, 35, 6, 46, 22) < t || seg(x, y, 46, 22, 35, 38) < t;
  return lt || slash || gt;
});

render('game-controller', (x, y) => {
  const body = ((x - 24) / 21) ** 2 + ((y - 15) / 11) ** 2 < 1 || box(x, y, 9, 6, 39, 24);
  const gripL = seg(x, y, 11, 16, 7, 36) < 6.5;
  const gripR = seg(x, y, 37, 16, 41, 36) < 6.5;
  if (!(body || gripL || gripR)) return false;
  const dpad = box(x, y, 12, 12, 16, 24) || box(x, y, 9, 16, 19, 20);
  const buttons = [[35, 12], [35, 24], [30, 18], [40, 18]].some(([bx, by]) => circ(x, y, bx, by) < 2);
  const startSelect = box(x, y, 22, 10, 23, 12) || box(x, y, 25, 10, 26, 12);
  return !(dpad || buttons || startSelect);
});

render('big-o', (x, y) => {
  const t = 4.5; // stroke thickness
  const o = ring(x, y, 9, 22, 8.5, 20, t);
  const open = ring(x, y, 28, 22, 8, 20, t) && x < 24; // "(" = left slice of an ellipse outline
  const close = ring(x, y, 36, 22, 8, 20, t) && x > 40; // ")"
  const one = box(x, y, 30, 3, 34, 41) || seg(x, y, 30.5, 5, 27.5, 9) < 2;
  return o || open || one || close;
});

render('trophy', (x, y) => {
  const cup = box(x, y, 12, 2, 36, 12) || (y >= 12 && ((x - 24) / 12) ** 2 + ((y - 12) / 16) ** 2 < 1);
  const rim = box(x, y, 12, 6, 36, 7.9);
  const handleL = Math.abs(circ(x, y, 11, 12) - 6) < 1.6 && x < 12;
  const handleR = Math.abs(circ(x, y, 37, 12) - 6) < 1.6 && x > 36;
  const stem = box(x, y, 21.5, 27, 26.5, 34);
  const base = box(x, y, 16, 34, 32, 37) || box(x, y, 12, 38, 36, 43);
  return (cup && !rim) || handleL || handleR || stem || base;
});
