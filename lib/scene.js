// Small line-drawing 3D scenes for page headers (same hand as the home city):
// gold strokes on cream that draw themselves in, light occlusion fills, a slowly orbiting camera.
// startTable - dinner table, then the online session (Events). startInsight - growth chart and notes (Blog).

const TAU = Math.PI * 2;
const ez = (p) => (p < 0.5 ? 2 * p * p : 1 - (-2 * p + 2) ** 2 / 2);
const clamp = (v) => Math.max(0, Math.min(1, v));
const circle = (cx, y, cz, r, n = 48, a0 = 0, a1 = TAU) => Array.from({ length: n + 1 }, (_, i) => { const a = a0 + ((a1 - a0) * i) / n; return [cx + Math.cos(a) * r, y, cz + Math.sin(a) * r]; });

function run(root, build, cam) {
  const c = root.querySelector('canvas'), ctx = c.getContext('2d');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const scene = build();
  let W, H, raf, visible = true; const t0 = performance.now();
  const size = () => { const d = Math.min(2, devicePixelRatio || 1); W = c.clientWidth; H = c.clientHeight; c.width = W * d; c.height = H * d; ctx.setTransform(d, 0, 0, d, 0, 0); };
  const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; }); io.observe(root);

  const frame = (now) => {
    raf = requestAnimationFrame(frame);
    if (!visible) return;
    const t = Math.max(0, (now - t0) / 1000), tm = reduce ? 0 : t;
    // orbit camera
    const yaw = cam.yaw0 + tm * cam.spin + Math.sin(tm / 11) * (cam.sway || 0), el = cam.elev + Math.sin(tm / 9) * 0.03;
    const [tx, ty, tz] = cam.target;
    const ex = tx + Math.sin(yaw) * Math.cos(el) * cam.dist, ey = ty + Math.sin(el) * cam.dist, ez2 = tz - Math.cos(yaw) * Math.cos(el) * cam.dist;
    let fx = tx - ex, fy = ty - ey, fz = tz - ez2; const fl = Math.hypot(fx, fy, fz); fx /= fl; fy /= fl; fz /= fl;
    let rx = fz, rz = -fx; const rl = Math.hypot(rx, rz); rx /= rl; rz /= rl; // right = forward x up
    const ux = fy * rz, uy = fz * rx - fx * rz, uz = -fy * rx;   // up = forward x right
    const F = Math.min(W, H * 1.5) * cam.zoom, cx = W * cam.cx, cy = H * cam.cy;
    const P = ([x, y, z]) => { const dx = x - ex, dy = y - ey, dz = z - ez2; const zc = dx * fx + dy * fy + dz * fz; if (zc < 1) return null; return [cx + ((dx * rx + dz * rz) / zc) * F, cy - ((dx * ux + dy * uy + dz * uz) / zc) * F, zc]; };

    ctx.clearRect(0, 0, W, H);
    // several scenes play in turn: each draws in, holds, then comes apart before the next one
    let sc = scene, lt = t, outAt = Infinity;
    if (scene.scenes) {
      const n = scene.scenes.length, len = scene.len, ct = reduce ? 0 : t % (n * len), k = Math.floor(ct / len);
      sc = scene.scenes[k]; lt = reduce ? 99 : ct - k * len; outAt = reduce ? Infinity : len - 1.9;
    }
    const items = sc.items.concat(sc.dyn ? sc.dyn(lt) : []);
    const proj = [];
    for (const it of items) {
      const pts = it.pts.map(P); if (pts.some((q) => !q)) continue;
      proj.push([it, pts, pts.reduce((s, q) => s + q[2], 0) / pts.length]);
    }
    proj.sort((a, b) => b[2] - a[2] + (a[0].fill ? 0 : 0) - (b[0].fill ? 0 : 0));
    for (const [it, pts] of proj) {
      const pin = reduce ? 1 : ez(clamp((lt - (it.delay || 0)) / (it.dur || 1.6)));
      const pout = lt > outAt ? ez(clamp((lt - outAt - (it.delay || 0) * 0.18) / 0.9)) : 0;
      const p = pin * (1 - pout);
      if (p <= 0) continue;
      if (it.fill) {
        ctx.beginPath(); pts.forEach((q, i) => (i ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1]))); ctx.closePath();
        ctx.fillStyle = it.fill.replace('A', (p * (it.fa ?? 1)).toFixed(3)); ctx.fill();
      }
      if (it.alpha === 0) continue;
      // stroke up to p of its length
      let L = 0; const seg = []; for (let i = 1; i < pts.length; i++) { const d = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); seg.push(d); L += d; }
      let left = L * p;
      ctx.beginPath(); ctx.moveTo(pts[0][0], pts[0][1]);
      for (let i = 1; i < pts.length && left > 0; i++) {
        const d = seg[i - 1];
        if (d <= left) { ctx.lineTo(pts[i][0], pts[i][1]); left -= d; }
        else { const k = left / d; ctx.lineTo(pts[i - 1][0] + (pts[i][0] - pts[i - 1][0]) * k, pts[i - 1][1] + (pts[i][1] - pts[i - 1][1]) * k); left = 0; }
      }
      ctx.strokeStyle = `rgba(158,114,40,${((it.alpha ?? 0.6) * (it.glow ? 1 : 1)).toFixed(3)})`;
      ctx.lineWidth = it.w || 1; ctx.stroke();
      if (it.glow && p >= 1) { // candle flame
        const q = pts[pts.length - 1], fl2 = 0.7 + 0.3 * Math.sin(t * 7 + it.glow * 3);
        const g = ctx.createRadialGradient(q[0], q[1] - 3, 0, q[0], q[1] - 3, 16);
        g.addColorStop(0, `rgba(240,190,90,${(0.7 * fl2).toFixed(3)})`); g.addColorStop(1, 'rgba(240,190,90,0)');
        ctx.fillStyle = g; ctx.beginPath(); ctx.arc(q[0], q[1] - 3, 16, 0, TAU); ctx.fill();
      }
    }
  };
  size(); addEventListener('resize', size); raf = requestAnimationFrame(frame);
  return () => { cancelAnimationFrame(raf); removeEventListener('resize', size); io.disconnect(); };
}

const FILL = 'rgba(250,247,240,A)';

// ---------- Events: a dinner table for ten, then the same ten as an online session ----------
export function startTable(root) {
  return run(root, () => {
    const table = [], online = [];
    const add = (arr) => (pts, o = {}) => arr.push({ pts, ...o });
    const T = add(table), O = add(online);
    // shared floor rings
    [260, 330, 400].forEach((r, i) => { const o = { alpha: 0.12 - i * 0.03, delay: 0.1 + i * 0.15, dur: 2 }; T(circle(0, 0, 0, r, 72), o); O(circle(0, 0, 0, r, 72), o); });

    // --- table
    T(circle(0, 2, 0, 46, 32), { alpha: 0.45, delay: 0.4 });
    for (let k = 0; k < 4; k++) { const a = (k / 4) * TAU + 0.4; T([[Math.cos(a) * 14, 2, Math.sin(a) * 14], [Math.cos(a) * 10, 70, Math.sin(a) * 10]], { alpha: 0.45, delay: 0.6 }); }
    T(circle(0, 74, 0, 165, 72), { fill: FILL, fa: 0.98, alpha: 0.75, delay: 0.7, dur: 2, w: 1.2 });
    T(circle(0, 66, 0, 165, 72), { alpha: 0.35, delay: 0.9, dur: 2 });
    T(circle(0, 74.5, 0, 140, 72), { alpha: 0.18, delay: 1.3, dur: 1.8 });
    for (let i = 0; i < 10; i++) {
      const a = (i / 10) * TAU, ca = Math.cos(a), sa = Math.sin(a), R = 222, d = 1.6 + i * 0.12, s2 = 22;
      const at = (dr, dt, y) => [ca * (R + dr) - sa * dt, y, sa * (R + dr) + ca * dt];
      T([at(-s2, -s2, 46), at(-s2, s2, 46), at(s2, s2, 46), at(s2, -s2, 46), at(-s2, -s2, 46)], { fill: FILL, fa: 0.95, alpha: 0.6, delay: d });
      T([at(s2, -s2, 46), at(s2 + 4, -s2, 118), at(s2 + 4, s2, 118), at(s2, s2, 46)], { fill: FILL, fa: 0.95, alpha: 0.6, delay: d + 0.25 });
      [[-s2, -s2], [-s2, s2], [s2, s2], [s2, -s2]].forEach(([u, v]) => T([at(u * 0.85, v * 0.85, 46), at(u * 0.85, v * 0.85, 0)], { alpha: 0.32, delay: d + 0.15, dur: 0.8 }));
      const pa = [ca * 120, 75, sa * 120];
      T(circle(pa[0], 75, pa[2], 19, 28), { alpha: 0.55, delay: d + 0.5 });
      T(circle(pa[0], 75.5, pa[2], 12, 24), { alpha: 0.25, delay: d + 0.7 });
      const g = [ca * 128 - sa * 30, sa * 128 + ca * 30];
      T(circle(g[0], 75, g[1], 4, 12), { alpha: 0.4, delay: d + 0.8, dur: 0.6 });
      T([[g[0] - 4, 75, g[1]], [g[0] - 6, 98, g[1]]], { alpha: 0.4, delay: d + 0.9, dur: 0.6 });
      T([[g[0] + 4, 75, g[1]], [g[0] + 6, 98, g[1]]], { alpha: 0.4, delay: d + 0.9, dur: 0.6 });
      T(circle(g[0], 98, g[1], 6, 14), { alpha: 0.4, delay: d + 1, dur: 0.6 });
    }

    // --- online: ten screens in the same circle, facing the middle, with a person in each
    for (let i = 0; i < 10; i++) {
      const a = (i / 10) * TAU, ca = Math.cos(a), sa = Math.sin(a), R = 200, d = 0.6 + i * 0.14;
      const at = (dr, dt, y) => [ca * (R + dr) - sa * dt, y, sa * (R + dr) + ca * dt];
      const w = 46, y0 = 70, y1 = 150;
      O([at(0, -w, y0), at(0, w, y0), at(0, w, y1), at(0, -w, y1), at(0, -w, y0)], { fill: FILL, fa: 0.96, alpha: 0.65, delay: d, w: 1.1 });
      O([at(0, -6, y0), at(0, -10, 40), at(0, 10, 40), at(0, 6, y0)], { alpha: 0.35, delay: d + 0.3, dur: 0.8 });
      O([at(0, -18, 40), at(0, 18, 40)], { alpha: 0.35, delay: d + 0.5, dur: 0.6 });
      // person: head + shoulders, drawn on the screen
      const head = Array.from({ length: 21 }, (_, k) => { const q = (k / 20) * TAU; return at(-0.5, Math.cos(q) * 10, 118 + Math.sin(q) * 11); });
      O(head, { alpha: 0.5, delay: d + 0.7, dur: 0.8 });
      O(Array.from({ length: 17 }, (_, k) => { const q = Math.PI + (k / 16) * Math.PI; return at(-0.5, Math.cos(q) * 26, 74 - Math.sin(q) * 26); }), { alpha: 0.5, delay: d + 0.9, dur: 0.8 });
      // thin link to the centre: everyone is in one room
      O([at(-R + 30, 0, 110), at(-R * 0.45, 0, 110)].map((q, k) => k ? q : q), { alpha: 0.16, delay: d + 1.4, dur: 1 });
    }
    // the shared room in the middle
    O(circle(0, 110, 0, 60, 48), { alpha: 0.45, delay: 2.4, dur: 1.4 });
    O(circle(0, 110, 0, 36, 40), { alpha: 0.3, delay: 2.7, dur: 1.2 });
    O(circle(0, 110, 0, 10, 20), { fill: 'rgba(214,160,58,A)', fa: 0.55, alpha: 0.6, delay: 3, dur: 0.8 });

    return root.dataset.only ? { items: table } : { scenes: [{ items: table }, { items: online }], len: 9.5 };
  }, { target: [0, 70, 0], dist: 900, elev: 0.5, yaw0: 0.4, spin: 0.045, zoom: 2.0, cx: 0.5, cy: 0.52 });
}

// ---------- Blog: investor intelligence - a growth chart on a drafting plane, notes floating above ----------
export function startInsight(root) {
  return run(root, () => {
    const items = [];
    const add = (pts, o = {}) => items.push({ pts, ...o });
    const X = 260, Z = 170;
    // drafting plane with a grid
    add([[-X, 0, -Z], [X, 0, -Z], [X, 0, Z], [-X, 0, Z], [-X, 0, -Z]], { fill: 'rgba(246,240,226,A)', fa: 0.9, alpha: 0.4, delay: 0.1, dur: 1.6 });
    for (let i = 1; i < 10; i++) add([[-X + (i * 2 * X) / 10, 0, -Z], [-X + (i * 2 * X) / 10, 0, Z]], { alpha: 0.1, delay: 0.4 + i * 0.05, dur: 1 });
    for (let i = 1; i < 6; i++) add([[-X, 0, -Z + (i * 2 * Z) / 6], [X, 0, -Z + (i * 2 * Z) / 6]], { alpha: 0.1, delay: 0.5 + i * 0.05, dur: 1 });
    // bars rising along the back
    const bars = [0.22, 0.3, 0.28, 0.4, 0.46, 0.44, 0.58, 0.66, 0.74];
    bars.forEach((h, i) => {
      const x = -X + 40 + i * 52, z = 60, w = 14, hh = h * 260;
      add([[x - w, 0, z], [x - w, hh, z], [x + w, hh, z], [x + w, 0, z]], { fill: FILL, fa: 0.92, alpha: 0.5, delay: 1.2 + i * 0.12, dur: 1 });
      add([[x - w, hh, z], [x - w + 6, hh + 5, z + 10], [x + w + 6, hh + 5, z + 10], [x + w, hh, z]], { alpha: 0.3, delay: 1.6 + i * 0.12, dur: 0.6 });
    });
    // the growth line in front, with points
    const line = bars.map((h, i) => [-X + 40 + i * 52, 30 + h * 300, -40]);
    add(line, { alpha: 0.85, w: 1.5, delay: 2.6, dur: 2.2 });
    line.forEach((p, i) => add(circle(p[0], p[1], p[2], 4, 12), { alpha: 0.7, delay: 2.8 + i * 0.22, dur: 0.4 }));
    add([[line[0][0], line[0][1], -40], [line[0][0], 0, -40]], { alpha: 0.15, delay: 2.6 });
    add([[line[8][0], line[8][1], -40], [line[8][0], 0, -40]], { alpha: 0.15, delay: 4.4 });
    return {
      items,
      // notes (article cards) floating above the plane
      dyn: (t) => [[-170, 300, -60, 0], [60, 360, 40, 1.4], [210, 270, -90, 2.6]].flatMap(([x, y, z, ph]) => {
        const fy = y + Math.sin(t * 0.6 + ph) * 8, w = 80, d = 52, dl = 3.6 + ph * 0.4;
        const card = [[x - w, fy, z - d], [x + w, fy, z - d], [x + w, fy, z + d], [x - w, fy, z + d], [x - w, fy, z - d]];
        const rows = [0.62, 0.36, 0.1, -0.16, -0.42].map((k, i) => ({ pts: [[x - w + 16, fy + 0.5, z + d * k], [x - w + 16 + (i === 0 ? 0.7 : i === 4 ? 0.5 : 0.9) * (2 * w - 32), fy + 0.5, z + d * k]], alpha: i === 0 ? 0.6 : 0.28, w: i === 0 ? 1.6 : 1, delay: dl + 0.6 + i * 0.12, dur: 0.5 }));
        return [{ pts: card, fill: FILL, fa: 0.97, alpha: 0.6, delay: dl, dur: 1.1 }, ...rows];
      }),
    };
  }, { target: [0, 120, 0], dist: 1100, elev: 0.42, yaw0: -0.5, spin: 0, sway: 0.22, zoom: 1.9, cx: 0.5, cy: 0.55 });
}
