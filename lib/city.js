// Hero backdrop: a city in perspective, drawn in thin gold line on a dark ground.
// Each tower is sketched from the ground up (edges rise, a scan line climbs the floors,
// then it fills and lights up). Afterwards the camera drifts and, now and then, a tower is
// re-traced in brighter gold - the city keeps being drawn. One canvas, plain DOM, no libraries.

function rng(seed) {
  let a = seed;
  return () => { a |= 0; a = (a + 0x6d2b79f5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
}

// prism tier: n-sided footprint (4 = box, 8/12 = round tower), radii rx/rz, rotation rot
const tier = (cx, cz, n, rx, rz, rot, y0, y1) => ({ cx, cz, n, rx, rz, rot, y0, y1 });
const boxTier = (cx, cz, w, d, y0, y1) => tier(cx, cz, 4, w / 2 / Math.SQRT1_2, d / 2 / Math.SQRT1_2, Math.PI / 4, y0, y1);

function buildCity() {
  const R = rng(19), r = (a, b) => a + R() * (b - a), pick = (a) => a[Math.floor(R() * a.length)];
  const B = [];
  const add = (b) => { b.lit = b.lit || []; B.push(b); };
  const BX = 150, BZ = 140, ST = 34;

  for (let gz = 0; gz < 15; gz++) {
    for (let gx = -9; gx <= 9; gx++) {
      if (gx === 0 || Math.abs(gx) === 1 && gz < 6) continue; // the avenue stays open, wider near the camera
      if (R() < 0.3) continue; // open plazas and low blocks - room between towers
      const x0 = gx * BX + (gx > 0 ? -30 : 30), z0 = 120 + gz * BZ;
      const mid = Math.exp(-(((z0 - 1150) / 520) ** 2));
      const side = Math.min(1, Math.abs(x0) / 700);
      const lots = R() < 0.55 ? 1 : 2;
      const lw = (BX - ST) / lots;
      for (let l = 0; l < lots; l++) {
        const cx = x0 - (BX - ST) / 2 + (l + 0.5) * lw, cz = z0 + r(-8, 8);
        let h = r(40, 140) + mid * r(60, 440) * (0.5 + side * 0.7);
        if (R() < 0.07) h *= 1.7;
        if (z0 < 400) h = Math.min(h, r(60, 170));
        const w = (lw - r(10, 26)) * (lots === 1 ? r(0.6, 0.9) : 1), d = (BZ - ST - r(10, 40)) * r(0.7, 1);
        const kind = h < 120 ? pick(['box', 'box', 'podium', 'pitched']) : pick(['box', 'setback', 'setback', 'slim', 'round', 'podium', 'diamond', 'pyramid', 'crown']);
        const tiers = [];
        let roof = null, style = pick(['floors', 'floors', 'mullions', 'grid']);
        if (kind === 'box' || kind === 'pitched') { tiers.push(boxTier(cx, cz, w, d, 0, h)); if (kind === 'pitched' || R() < 0.25) roof = R() < 0.5 ? 'tank' : 'plant'; }
        if (kind === 'setback' || kind === 'crown') {
          let y = 0, ww = w, dd = d; const n = 2 + (R() < 0.6 ? 1 : 0) + (kind === 'crown' ? 1 : 0);
          for (let k = 0; k < n; k++) { const th = k === n - 1 ? h - y : (h - y) * r(0.5, 0.68); tiers.push(boxTier(cx, cz, ww, dd, y, y + th)); y += th; ww *= r(0.64, 0.8); dd *= r(0.64, 0.8); }
          roof = kind === 'crown' ? 'spire' : R() < 0.5 ? 'antenna' : null;
        }
        if (kind === 'slim') { const s = Math.min(w, d) * r(0.45, 0.7); tiers.push(boxTier(cx, cz, s, s, 0, h * 1.25)); roof = 'antenna'; style = 'mullions'; }
        if (kind === 'round') { const rr = Math.min(w, d) / 2 * r(0.7, 0.95); tiers.push(tier(cx, cz, 12, rr, rr, 0, 0, h)); if (R() < 0.5) tiers.push(tier(cx, cz, 12, rr * 0.7, rr * 0.7, 0, h, h * 1.12)); roof = R() < 0.5 ? 'spire' : null; style = 'floors'; }
        if (kind === 'podium') { tiers.push(boxTier(cx, cz, w, d, 0, Math.min(60, h * 0.3))); const s = Math.min(w, d) * r(0.5, 0.7); tiers.push(boxTier(cx + r(-8, 8), cz, s, s * r(0.8, 1.2), Math.min(60, h * 0.3), h)); roof = R() < 0.4 ? 'plant' : null; }
        if (kind === 'diamond') { const s = Math.min(w, d) / 2 * r(0.8, 1); tiers.push(tier(cx, cz, 4, s, s, 0, 0, h)); roof = 'pyramid'; style = 'grid'; }
        if (kind === 'pyramid') { tiers.push(boxTier(cx, cz, w * 0.8, d * 0.8, 0, h)); roof = 'pyramid'; }
        const lit = Array.from({ length: Math.min(10, Math.floor(h / 36)) }, () => [R(), R(), r(0, 6)]);
        add({ tiers, roof, style, lit, h, cx, cz, delay: 0.2 + Math.abs(cx) / 2000 + (gz / 15) * 2.4 + R() * 0.8 });
      }
    }
  }
  // landmarks in "midtown": supertalls with spires and crowns
  [[-420, 1180, 640, 'setback'], [380, 1040, 700, 'slim'], [-120, 1460, 560, 'round'], [640, 1320, 600, 'crown'], [-760, 1300, 520, 'diamond']].forEach(([cx, cz, h, k]) => {
    const tiers = [];
    if (k === 'setback' || k === 'crown') { let y = 0, w = 90; for (let i = 0; i < 4; i++) { const th = i === 3 ? h - y : (h - y) * 0.5; tiers.push(boxTier(cx, cz, w, w, y, y + th)); y += th; w *= 0.74; } }
    if (k === 'slim') tiers.push(boxTier(cx, cz, 54, 54, 0, h));
    if (k === 'round') { tiers.push(tier(cx, cz, 12, 48, 48, 0, 0, h * 0.8)); tiers.push(tier(cx, cz, 12, 34, 34, 0, h * 0.8, h)); }
    if (k === 'diamond') tiers.push(tier(cx, cz, 4, 52, 52, 0, 0, h));
    add({ tiers, roof: k === 'diamond' ? 'pyramid' : 'spire', style: 'mullions', h, cx, cz, landmark: true, lit: Array.from({ length: 12 }, () => [R(), R(), r(0, 6)]), delay: 1.6 + R() * 1.2 });
  });
  // distant giants on the horizon
  for (let i = 0; i < 30; i++) {
    const cx = r(-2800, 2800), cz = r(2400, 3300), w = r(50, 110), h = r(240, 760);
    add({ tiers: [R() < 0.25 ? tier(cx, cz, 12, w / 2, w / 2, 0, 0, h) : boxTier(cx, cz, w, w, 0, h)], roof: R() < 0.35 ? 'spire' : null, style: null, h, cx, cz, far: true, delay: 2.4 + R() * 1.6 });
  }
  return B;
}

export function startCity(root) {
  const c = root.querySelector('canvas'), ctx = c.getContext('2d');
  const band = root.classList.contains('band');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const city = buildCity();
  let W, H, dpr, raf, t0 = performance.now(), visible = true, nextTrace = 6;

  const size = () => {
    dpr = Math.min(2, devicePixelRatio || 1);
    W = c.clientWidth; H = c.clientHeight; c.width = W * dpr; c.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };
  const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; }); io.observe(root);

  // camera: aerial, slowly drifting
  let cam, cosY, sinY, F, cxs, cys, pitch, cosP, sinP;
  const setCam = (t) => {
    const s = reduce ? 0 : t;
    const yaw = Math.sin(s / 16) * 0.07;
    cam = { x: Math.sin(s / 21) * 60, y: band ? 300 : 380, z: (band ? -420 : -520) + Math.sin(s / 13) * 40 };
    pitch = band ? -0.16 : -0.24;
    cosY = Math.cos(yaw); sinY = Math.sin(yaw); cosP = Math.cos(pitch); sinP = Math.sin(pitch);
    F = Math.max(W, H * 1.4) * (W < 760 ? 0.62 : 0.78);
    cxs = W / 2; cys = H * (band ? 0.55 : W < 760 ? 0.6 : 0.52);
  };
  const P = (x, y, z) => {
    const dx = x - cam.x, dy = y - cam.y, dz = z - cam.z;
    const x1 = dx * cosY - dz * sinY, z1 = dx * sinY + dz * cosY;
    const y2 = dy * cosP - z1 * sinP, z2 = dy * sinP + z1 * cosP;
    return z2 > 5 ? [cxs + (x1 / z2) * F, cys - (y2 / z2) * F, z2] : null;
  };
  const fog = (z) => (z < 950 ? 0.1 + Math.max(0, (z - 500) / 450) * 0.3 : z < 2100 ? 0.4 + ((z - 950) / 1150) * 0.28 : Math.max(0.1, 0.68 - (z - 2100) / 2400));
  const gold = (a) => `rgba(158,114,40,${Math.max(0, a * 0.85).toFixed(3)})`;
  const ez = (p) => (p < 0.5 ? 2 * p * p : 1 - (-2 * p + 2) ** 2 / 2);
  const clamp = (v) => Math.max(0, Math.min(1, v));
  const ring = (tr, y) => Array.from({ length: tr.n }, (_, k) => { const a = tr.rot + (k * 2 * Math.PI) / tr.n; return [tr.cx + Math.cos(a) * tr.rx, y, tr.cz + Math.sin(a) * tr.rz]; });
  const line = (a, b) => { if (a && b) { ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); } };

  function drawTier(tr, b, p, alpha, trace) {
    const n = tr.n, bot = ring(tr, tr.y0).map((v) => P(...v)), top = ring(tr, tr.y1).map((v) => P(...v));
    if (bot.some((q) => !q) || top.some((q) => !q)) return;
    if (bot.every((q) => q[0] < -200 || q[0] > W + 200)) return;
    // visible side faces (convex prism, consistent winding)
    const vis = [];
    for (let k = 0; k < n; k++) {
      const q = [bot[k], bot[(k + 1) % n], top[(k + 1) % n], top[k]];
      let area = 0; for (let i = 0; i < 4; i++) { const a = q[i], m = q[(i + 1) % 4]; area += a[0] * m[1] - m[0] * a[1]; }
      if (area < 0) vis.push(k);
    }
    let ta = 0; for (let i = 0; i < n; i++) { const a = top[i], m = top[(i + 1) % n]; ta += a[0] * m[1] - m[0] * a[1]; }
    const topVis = ta < 0;
    const grow = ez(clamp(p / 0.62)), fill = ez(clamp((p - 0.55) / 0.45));
    const hNow = tr.y0 + (tr.y1 - tr.y0) * grow;

    // 1) fill the faces once the frame has risen (hides what is behind)
    if (fill > 0) {
      ctx.fillStyle = `rgba(250,247,240,${(0.97 * fill).toFixed(3)})`;
      for (const k of vis) { ctx.beginPath(); ctx.moveTo(bot[k][0], bot[k][1]); ctx.lineTo(bot[(k + 1) % n][0], bot[(k + 1) % n][1]); ctx.lineTo(top[(k + 1) % n][0], top[(k + 1) % n][1]); ctx.lineTo(top[k][0], top[k][1]); ctx.closePath(); ctx.fill(); }
      if (topVis) { ctx.beginPath(); top.forEach((q, i) => (i ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1]))); ctx.closePath(); ctx.fill(); }
    }
    // 2) frame: vertical edges rising + base, then the top outline
    const edgeSet = new Set(); vis.forEach((k) => { edgeSet.add(k); edgeSet.add((k + 1) % n); });
    const round = n > 4;
    ctx.strokeStyle = gold(alpha * (round ? 0.75 : 1)); ctx.lineWidth = 1; ctx.beginPath();
    const now = ring(tr, hNow).map((v) => P(...v));
    for (const k of edgeSet) if (!round || k % 3 === 0 || vis.length < 4) line(bot[k], now[k]);
    for (const k of vis) line(bot[k], bot[(k + 1) % n]);
    if (grow < 1) for (const k of vis) line(now[k], now[(k + 1) % n]); // the scan line climbing the floors
    if (grow >= 1) { for (const k of vis) line(top[k], top[(k + 1) % n]); if (topVis) for (let k = 0; k < n; k++) if (!vis.includes(k)) line(top[k], top[(k + 1) % n]); }
    ctx.stroke();
    if (round && grow >= 1) { ctx.strokeStyle = gold(alpha * 0.9); ctx.beginPath(); const l = vis[0], rr = vis[vis.length - 1]; line(bot[l], top[l]); line(bot[(rr + 1) % n], top[(rr + 1) % n]); ctx.stroke(); }

    // 3) facade: floors / mullions appear upwards after the fill
    const depth = bot[0][2];
    if (b.style && fill > 0.2 && depth > 650 && depth < 2900 && tr.y1 - tr.y0 > 50) {
      const fa = alpha * 0.26 * fill;
      ctx.strokeStyle = gold(fa); ctx.beginPath();
      const hF = tr.y0 + (tr.y1 - tr.y0) * fill;
      if (b.style !== 'mullions') for (let y = tr.y0 + 20; y < hF - 4; y += round ? 16 : 22) { const rg = ring(tr, y).map((v) => P(...v)); for (const k of vis) line(rg[k], rg[(k + 1) % n]); }
      if (b.style !== 'floors' && !round) for (const k of vis) {
        const a0 = ring(tr, tr.y0)[k], a1 = ring(tr, tr.y0)[(k + 1) % n];
        const cols = Math.max(2, Math.round(Math.hypot(a1[0] - a0[0], a1[2] - a0[2]) / 14));
        for (let i = 1; i < cols; i++) { const u = i / cols, x = a0[0] + (a1[0] - a0[0]) * u, z = a0[2] + (a1[2] - a0[2]) * u; line(P(x, tr.y0, z), P(x, hF, z)); }
      }
      ctx.stroke();
    }
    // 4) re-trace: a brighter line sweeping up an already built tower
    if (trace >= 0 && trace <= 1) {
      const y = tr.y0 + (tr.y1 - tr.y0) * trace, rg = ring(tr, y).map((v) => P(...v));
      ctx.strokeStyle = gold(Math.min(1, alpha * 2.2)); ctx.lineWidth = 1.3; ctx.beginPath();
      for (const k of vis) line(rg[k], rg[(k + 1) % n]);
      for (const k of edgeSet) line(bot[k], rg[k]);
      ctx.stroke(); ctx.lineWidth = 1;
    }
    return { top, vis, topVis };
  }

  function drawRoof(b, alpha) {
    const tr = b.tiers[b.tiers.length - 1], x = tr.cx, z = tr.cz, y = tr.y1;
    ctx.strokeStyle = gold(alpha); ctx.beginPath();
    if (b.roof === 'spire') { line(P(x, y, z), P(x, y + (b.landmark ? 150 : 70), z)); }
    if (b.roof === 'antenna') { line(P(x - tr.rx * 0.2, y, z), P(x - tr.rx * 0.2, y + 50, z)); line(P(x + tr.rx * 0.2, y, z), P(x + tr.rx * 0.2, y + 34, z)); }
    if (b.roof === 'pyramid') { const apex = P(x, y + Math.max(tr.rx, tr.rz) * 1.1, z); ring(tr, y).forEach((v) => line(P(...v), apex)); }
    ctx.stroke();
    if (b.roof === 'tank' || b.roof === 'plant') {
      const t2 = b.roof === 'tank' ? tier(x + tr.rx * 0.25, z, 8, 9, 9, 0, y, y + 16) : boxTier(x - tr.rx * 0.15, z, tr.rx * 0.6, tr.rz * 0.5, y, y + 10);
      drawTier(t2, { style: null }, 1, alpha * 0.8, -1);
    }
  }

  const frame = (nowMs) => {
    raf = requestAnimationFrame(frame);
    if (!visible) return;
    const t = (nowMs - t0) / 1000;
    setCam(t);
    ctx.clearRect(0, 0, W, H);

    // horizon haze
    const hy = cys + Math.tan(pitch) * F;
    const g = ctx.createLinearGradient(0, hy - H * 0.35, 0, hy + H * 0.1);
    g.addColorStop(0, 'rgba(232,205,142,0)'); g.addColorStop(0.75, 'rgba(232,205,142,.22)'); g.addColorStop(1, 'rgba(232,205,142,0)');
    ctx.fillStyle = g; ctx.fillRect(0, hy - H * 0.35, W, H * 0.45);

    // street grid
    ctx.lineWidth = 1; ctx.beginPath(); ctx.strokeStyle = 'rgba(158,114,40,.06)';
    for (let z = 120; z < 2400; z += 140) line(P(-2600, 0, z), P(2600, 0, z));
    for (let x = -2700; x <= 2700; x += 150) line(P(x, 0, 60), P(x, 0, 2600));
    ctx.stroke();

    // every few seconds a built tower gets re-traced
    if (false) {
      const cand = city.filter((b) => !b.far && b.h > 160 && b.cz > 500 && b.cz < 2000);
      const b = cand[Math.floor(Math.random() * cand.length)]; if (b) b.traceAt = t;
      nextTrace = t + 1.6 + Math.random() * 1.6;
    }

    const order = city.map((b) => [b, (b.cx - cam.x) * sinY + (b.cz - cam.z) * cosY]).sort((p, q) => q[1] - p[1]);
    for (const [b, depth] of order) {
      if (depth < 40) continue;
      const p = reduce ? 1 : clamp((t - b.delay) / (b.landmark ? 3.2 : 2.2));
      if (p <= 0) continue;
      const alpha = fog(depth) * 0.82 * (b.far ? 0.55 : 1);
      const tr = b.traceAt ? (t - b.traceAt) / 2.4 : -1;
      // tiers rise one after another
      const nT = b.tiers.length;
      b.tiers.forEach((tierObj, i) => {
        const tp = clamp(p * nT - i * 0.85);
        if (tp > 0) drawTier(tierObj, b, nT === 1 ? p : tp, alpha, tr >= 0 && tr <= 1 ? clamp(tr * nT - i) : -1);
      });
      if (b.roof && p >= 1) drawRoof(b, alpha);
      // lit windows on visible faces of the lowest tier
      if (p >= 1 && b.lit.length && !b.far) {
        const t0r = b.tiers[0];
        for (const [u, v, ph] of b.lit) {
          const k = Math.floor(u * t0r.n), rg0 = ring(t0r, 0), a = rg0[k], m = rg0[(k + 1) % t0r.n], s = (u * t0r.n) % 1;
          const y = t0r.y0 + 8 + v * (t0r.y1 - t0r.y0 - 16);
          const q = P(a[0] + (m[0] - a[0]) * s, y, a[2] + (m[2] - a[2]) * s);
          if (!q) continue;
          // only on faces turned to the camera
          const qa = P(a[0], y, a[2]), qm = P(m[0], y, m[2]), qt = P(a[0], y + 10, a[2]);
          if (!qa || !qm || !qt) continue;
          if ((qm[0] - qa[0]) * (qt[1] - qa[1]) - (qm[1] - qa[1]) * (qt[0] - qa[0]) >= 0) continue;
          const tw = 0.55 + 0.45 * Math.sin(t * 0.9 + ph * 3), sz = Math.max(1.2, 1500 / q[2]);
          ctx.fillStyle = `rgba(214,160,58,${(alpha * 1.1 * tw).toFixed(3)})`;
          ctx.fillRect(q[0] - sz / 2, q[1] - sz * 0.7, sz, sz * 1.4);
        }
      }
    }
  };
  size(); setCam(0);
  addEventListener('resize', size);
  raf = requestAnimationFrame(frame);
  return () => { cancelAnimationFrame(raf); removeEventListener('resize', size); io.disconnect(); };
}
