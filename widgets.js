/* Interaktív ábrák: <div class="widget" data-w="név"></div> */
(function () {
  'use strict';
  const NS = 'http://www.w3.org/2000/svg';
  const S = (tag, attrs = {}) => { const e = document.createElementNS(NS, tag); for (const k in attrs) e.setAttribute(k, attrs[k]); return e; };
  const H = (tag, cls, html) => { const e = document.createElement(tag); if (cls) e.className = cls; if (html !== undefined) e.innerHTML = html; return e; };
  const fmt = (x, d = 2) => (Math.round(x * 10 ** d) / 10 ** d).toString().replace('.', ',');
  const st = (o) => Object.entries(o).map(([k, v]) => `${k}:${v}`).join(';');

  /* ---------- koordináta-rendszer ---------- */
  function Plot(box, o) {
    const W = o.W || 520, Hh = o.H || 340, [x0, x1] = o.xr, [y0, y1] = o.yr;
    const svg = S('svg', { viewBox: `0 0 ${W} ${Hh}`, class: 'wplot', role: 'img' });
    const X = x => (x - x0) / (x1 - x0) * W, Y = y => Hh - (y - y0) / (y1 - y0) * Hh;
    const stepOf = r => (r > 30 ? 5 : r > 14 ? 2 : 1);
    if (!o.nogrid) {
      const sx = o.sx || stepOf(x1 - x0), sy = o.sy || stepOf(y1 - y0);
      for (let x = Math.ceil(x0 / sx) * sx; x <= x1 + 1e-9; x += sx) {
        svg.append(S('line', { x1: X(x), x2: X(x), y1: 0, y2: Hh, style: st({ stroke: 'var(--line)', 'stroke-width': x === 0 ? 0 : 1 }) }));
        if (x !== 0 && !o.nolabels) svg.append(Object.assign(S('text', { x: X(x), y: Math.min(Hh - 4, Math.max(12, Y(0) + 14)), 'text-anchor': 'middle', style: st({ fill: 'var(--muted)', 'font-size': '11px' }) }), { textContent: fmt(x, 1) }));
      }
      for (let y = Math.ceil(y0 / sy) * sy; y <= y1 + 1e-9; y += sy) {
        svg.append(S('line', { x1: 0, x2: W, y1: Y(y), y2: Y(y), style: st({ stroke: 'var(--line)', 'stroke-width': y === 0 ? 0 : 1 }) }));
        if (y !== 0 && !o.nolabels) svg.append(Object.assign(S('text', { x: Math.max(4, Math.min(W - 18, X(0) + 5)), y: Y(y) - 3, style: st({ fill: 'var(--muted)', 'font-size': '11px' }) }), { textContent: fmt(y, 1) }));
      }
      if (y0 < 0 && y1 > 0) svg.append(S('line', { x1: 0, x2: W, y1: Y(0), y2: Y(0), style: st({ stroke: 'var(--ink)', 'stroke-width': 1.4 }) }));
      if (x0 < 0 && x1 > 0) svg.append(S('line', { x1: X(0), x2: X(0), y1: 0, y2: Hh, style: st({ stroke: 'var(--ink)', 'stroke-width': 1.4 }) }));
    }
    const dyn = S('g'); svg.append(dyn); box.append(svg);
    const colr = c => c || 'var(--ink)';
    const api = {
      svg, X, Y,
      clear() { dyn.replaceChildren(); },
      curve(f, c = {}) {
        let d = '', pen = false, prev = null; const N = 500;
        for (let i = 0; i <= N; i++) {
          const x = x0 + (x1 - x0) * i / N, y = f(x);
          if (!isFinite(y) || Math.abs(y) > 1e4 || (prev !== null && Math.abs(y - prev) > (y1 - y0) * 3)) { pen = false; prev = null; continue; }
          d += (pen ? 'L' : 'M') + X(x).toFixed(1) + ' ' + Y(y).toFixed(1); pen = true; prev = y;
        }
        dyn.append(S('path', { d, fill: 'none', style: st({ stroke: colr(c.color), 'stroke-width': c.w || 2.5, 'stroke-dasharray': c.dash || 'none', opacity: c.op || 1 }) }));
      },
      line(ax, ay, bx, by, c = {}) { dyn.append(S('line', { x1: X(ax), y1: Y(ay), x2: X(bx), y2: Y(by), style: st({ stroke: colr(c.color), 'stroke-width': c.w || 2, 'stroke-dasharray': c.dash || 'none' }) })); },
      arrow(ax, ay, bx, by, c = {}) {
        api.line(ax, ay, bx, by, c);
        const a = Math.atan2(Y(by) - Y(ay), X(bx) - X(ax)), L = 11;
        const p = (t) => `${X(bx) - L * Math.cos(a + t)},${Y(by) - L * Math.sin(a + t)}`;
        dyn.append(S('polygon', { points: `${X(bx)},${Y(by)} ${p(.4)} ${p(-.4)}`, style: st({ fill: colr(c.color) }) }));
      },
      pt(x, y, c = {}) { dyn.append(S('circle', { cx: X(x), cy: Y(y), r: c.r || 5, style: st({ fill: colr(c.color) }) })); },
      text(x, y, s, c = {}) { dyn.append(Object.assign(S('text', { x: X(x), y: Y(y), 'text-anchor': c.anchor || 'start', style: st({ fill: colr(c.color), 'font-size': (c.size || 13) + 'px', 'font-weight': 600 }) }), { textContent: s })); },
      poly(pts, c = {}) { dyn.append(S('polygon', { points: pts.map(p => X(p[0]) + ',' + Y(p[1])).join(' '), style: st({ fill: colr(c.fill), opacity: c.op || .25, stroke: 'none' }) })); },
      circle(cx, cy, r, c = {}) { dyn.append(S('ellipse', { cx: X(cx), cy: Y(cy), rx: r * W / (x1 - x0), ry: r * Hh / (y1 - y0), fill: c.fill || 'none', style: st({ stroke: colr(c.color), 'stroke-width': c.w || 2.5 }) })); }
    };
    return api;
  }

  function slider(box, label, min, max, step, val, cb, unit = '') {
    const w = H('label', 'wctl');
    w.innerHTML = `<span>${label}</span><input type="range" min="${min}" max="${max}" step="${step}" value="${val}"><output></output>`;
    const inp = w.querySelector('input'), out = w.querySelector('output');
    const upd = () => { out.textContent = fmt(+inp.value, 2) + unit; };
    inp.addEventListener('input', () => { upd(); cb(); }); upd(); box.append(w);
    return { get: () => +inp.value, set: v => { inp.value = v; upd(); }, inp };
  }
  function select(box, label, opts, cb) {
    const w = H('label', 'wctl'); w.innerHTML = `<span>${label}</span><select>${opts.map((o, i) => `<option value="${i}">${o}</option>`).join('')}</select><span></span>`;
    const s = w.querySelector('select'); s.addEventListener('change', cb); box.append(w); return { get: () => +s.value };
  }
  function shell(root, title) {
    root.replaceChildren();
    const cap = H('div', 'wtitle', title), fig = H('div', 'wfig'), ctl = H('div', 'wctls'), out = H('div', 'wout');
    root.append(cap, fig, ctl, out); return { fig, ctl, out };
  }

  const W = {};

  W.quad = root => {
    const { fig, ctl, out } = shell(root, 'Interaktív: másodfokú függvény  y = ax² + bx + c');
    const p = Plot(fig, { xr: [-8, 8], yr: [-8, 10] });
    let A, B, C;
    const draw = () => {
      let a = A.get(); if (Math.abs(a) < .05) a = .1; const b = B.get(), c = C.get(), D = b * b - 4 * a * c;
      p.clear(); p.curve(x => a * x * x + b * x + c, { color: 'var(--accent)' });
      const xv = -b / (2 * a), yv = a * xv * xv + b * xv + c; p.pt(xv, yv, { color: 'var(--brand)' });
      let t = `D = b² − 4ac = ${fmt(D)} → `;
      if (D > 0) { const r1 = (-b - Math.sqrt(D)) / (2 * a), r2 = (-b + Math.sqrt(D)) / (2 * a); t += `két gyök: x₁ = ${fmt(Math.min(r1, r2))}, x₂ = ${fmt(Math.max(r1, r2))}`; p.pt(r1, 0, { color: 'var(--ink)' }); p.pt(r2, 0, { color: 'var(--ink)' }); }
      else if (Math.abs(D) < 1e-9) { t += `egy gyök: x = ${fmt(xv)}`; p.pt(xv, 0, { color: 'var(--ink)' }); } else t += 'nincs valós gyök';
      out.innerHTML = `${t}<br>Csúcs: (${fmt(xv)}; ${fmt(yv)}) · ${a > 0 ? 'felfelé' : 'lefelé'} nyílik`;
    };
    A = slider(ctl, 'a', -3, 3, .1, 1, draw); B = slider(ctl, 'b', -6, 6, .1, -2, draw); C = slider(ctl, 'c', -6, 6, .1, -3, draw); draw();
  };

  W.transform = root => {
    const { fig, ctl, out } = shell(root, 'Interaktív: függvénytranszformáció  g(x) = a·f(x − p) + q');
    const p = Plot(fig, { xr: [-8, 8], yr: [-6, 6] });
    const F = [['x²', x => x * x], ['√x', Math.sqrt], ['|x|', Math.abs], ['sin x', Math.sin], ['2ˣ', x => 2 ** x], ['1/x', x => 1 / x]];
    let sel, a, pp, q;
    const draw = () => {
      const f = F[sel.get()][1], A = a.get(), P = pp.get(), Q = q.get();
      p.clear(); p.curve(f, { color: 'var(--muted)', dash: '6 5', w: 2 }); p.curve(x => A * f(x - P) + Q, { color: 'var(--accent)' });
      out.innerHTML = `Szürke: f(x) = ${F[sel.get()][0]} · Színes: g(x) = ${fmt(A)}·f(x − ${fmt(P)}) + ${fmt(Q)}<br>${P !== 0 ? `Eltolás ${P > 0 ? 'jobbra' : 'balra'} ${fmt(Math.abs(P))}-vel. ` : ''}${Q !== 0 ? `Eltolás ${Q > 0 ? 'felfelé' : 'lefelé'} ${fmt(Math.abs(Q))}-val. ` : ''}${A < 0 ? 'Tükrözés az x-tengelyre. ' : ''}${Math.abs(A) !== 1 ? `Függőleges nyújtás ${fmt(Math.abs(A))}-szeres.` : ''}`;
    };
    sel = select(ctl, 'f(x) =', F.map(f => f[0]), draw); a = slider(ctl, 'a', -3, 3, .1, 1, draw); pp = slider(ctl, 'p', -5, 5, .5, 0, draw); q = slider(ctl, 'q', -5, 5, .5, 0, draw); draw();
  };

  W.sine = root => {
    const { fig, ctl, out } = shell(root, 'Interaktív: y = A·sin(b·(x − c)) + d');
    const p = Plot(fig, { xr: [-7, 7], yr: [-6, 6] });
    let A, B, C, D;
    const draw = () => {
      const a = A.get(), b = B.get(), c = C.get(), d = D.get();
      p.clear(); p.curve(Math.sin, { color: 'var(--muted)', dash: '6 5', w: 2 }); p.curve(x => a * Math.sin(b * (x - c)) + d, { color: 'var(--accent)' });
      out.innerHTML = `Periódus: 2π/b = ${fmt(2 * Math.PI / b)} · Értékkészlet: [${fmt(d - Math.abs(a))}; ${fmt(d + Math.abs(a))}] · Amplitúdó: ${fmt(Math.abs(a))}`;
    };
    A = slider(ctl, 'A', -4, 4, .25, 1, draw); B = slider(ctl, 'b', .25, 4, .25, 1, draw); C = slider(ctl, 'c', -3, 3, .25, 0, draw); D = slider(ctl, 'd', -3, 3, .25, 0, draw); draw();
  };

  W.tangent = root => {
    const { fig, ctl, out } = shell(root, 'Interaktív: az érintő meredeksége = a derivált');
    const p = Plot(fig, { xr: [-4, 4], yr: [-6, 6] });
    const F = [['x³ − 3x', x => x ** 3 - 3 * x], ['x²', x => x * x], ['sin x', Math.sin], ['eˣ', Math.exp]];
    let sel, X0;
    const draw = () => {
      const f = F[sel.get()][1], x0 = X0.get(), h = 1e-5, m = (f(x0 + h) - f(x0 - h)) / (2 * h), y0 = f(x0);
      p.clear(); p.curve(f, { color: 'var(--ink)' }); p.line(-4, m * (-4 - x0) + y0, 4, m * (4 - x0) + y0, { color: 'var(--accent)' }); p.pt(x0, y0, { color: 'var(--accent)', r: 6 });
      out.innerHTML = `f(${fmt(x0)}) = ${fmt(y0)} · <b>f′(${fmt(x0)}) = ${fmt(m)}</b><br>Érintő: y = ${fmt(m)}·x ${m * -x0 + y0 >= 0 ? '+' : '−'} ${fmt(Math.abs(y0 - m * x0))} · ${Math.abs(m) < .03 ? 'vízszintes érintő: lehet szélsőérték!' : m > 0 ? 'itt a függvény nő' : 'itt a függvény csökken'}`;
    };
    sel = select(ctl, 'f(x) =', F.map(f => f[0]), draw); X0 = slider(ctl, 'x₀', -3, 3, .05, 1.5, draw); draw();
  };

  W.integral = root => {
    const { fig, ctl, out } = shell(root, 'Interaktív: határozott integrál = előjeles terület');
    const p = Plot(fig, { xr: [-4, 4], yr: [-3, 9] });
    const F = [['x²', x => x * x], ['x', x => x], ['sin x', Math.sin], ['eˣ', Math.exp]];
    let sel, a, b;
    const draw = () => {
      const f = F[sel.get()][1]; let lo = a.get(), hi = b.get(); if (lo > hi) [lo, hi] = [hi, lo];
      const n = 200, hh = (hi - lo) / n; let s = 0; const pts = [[lo, 0]];
      for (let i = 0; i <= n; i++) { const x = lo + i * hh; s += (i === 0 || i === n ? 1 : i % 2 ? 4 : 2) * f(x); pts.push([x, f(x)]); }
      pts.push([hi, 0]); s *= hh / 3;
      p.clear(); p.poly(pts, { fill: 'var(--accent)', op: .3 }); p.curve(f, { color: 'var(--ink)' }); p.line(lo, 0, lo, f(lo), { color: 'var(--accent)', dash: '4 4' }); p.line(hi, 0, hi, f(hi), { color: 'var(--accent)', dash: '4 4' });
      out.innerHTML = `∫ ${F[sel.get()][0]} dx  ${fmt(lo)}-tól ${fmt(hi)}-ig = <b>${fmt(s, 3)}</b>${s < 0 ? '<br>Negatív: az x-tengely alatti rész! Területnél abszolút értéket kell venni.' : ''}`;
    };
    sel = select(ctl, 'f(x) =', F.map(f => f[0]), draw); a = slider(ctl, 'alsó határ', -3, 3, .1, 0, draw); b = slider(ctl, 'felső határ', -3, 3, .1, 2, draw); draw();
  };

  W.unitcircle = root => {
    const { fig, ctl, out } = shell(root, 'Interaktív: egységkör – szinusz és koszinusz');
    const p = Plot(fig, { xr: [-1.6, 1.6], yr: [-1.3, 1.3], W: 420, H: 342, sx: .5, sy: .5, nolabels: true });
    let ang;
    const draw = () => {
      const d = ang.get(), r = d * Math.PI / 180, c = Math.cos(r), s = Math.sin(r);
      p.clear(); p.circle(0, 0, 1, { color: 'var(--ink)', w: 2 }); p.line(0, 0, c, s, { color: 'var(--ink)' });
      p.line(c, 0, c, s, { color: 'var(--accent)', w: 3.5 }); p.line(0, 0, c, 0, { color: 'var(--brand)', w: 3.5 }); p.pt(c, s, { color: 'var(--ink)', r: 6 });
      p.text(c / 2, -.09, 'cos', { color: 'var(--brand)', anchor: 'middle' }); p.text(c + .04 * (c >= 0 ? 1 : -3), s / 2, 'sin', { color: 'var(--accent)' });
      out.innerHTML = `α = ${d}° = ${fmt(r, 3)} rad<br>cos α = ${fmt(c, 3)} · sin α = ${fmt(s, 3)} · tan α = ${Math.abs(c) < 1e-9 ? 'nem értelmezett' : fmt(s / c, 3)}`;
    };
    ang = slider(ctl, 'α (fok)', 0, 360, 1, 40, draw, '°'); draw();
  };

  W.venn = root => {
    const { fig, ctl, out } = shell(root, 'Interaktív: két halmaz – szitaformula');
    let N, A, B, K;
    const svg = S('svg', { viewBox: '0 0 520 250', class: 'wplot' }); fig.append(svg);
    const draw = () => {
      const n = N.get(), a = Math.min(A.get(), n), b = Math.min(B.get(), n); K.inp.max = Math.min(a, b); const k = Math.min(K.get(), a, b);
      const union = a + b - k, none = n - union, bad = none < 0;
      svg.replaceChildren();
      svg.append(S('rect', { x: 6, y: 6, width: 508, height: 238, fill: 'none', style: 'stroke:var(--ink);stroke-width:1.5' }));
      svg.append(S('circle', { cx: 205, cy: 125, r: 85, style: 'fill:var(--accent);opacity:.28;stroke:var(--accent);stroke-width:2' }));
      svg.append(S('circle', { cx: 315, cy: 125, r: 85, style: 'fill:var(--brand);opacity:.28;stroke:var(--brand);stroke-width:2' }));
      const t = (x, y, s, sz = 22) => svg.append(Object.assign(S('text', { x, y, 'text-anchor': 'middle', style: `fill:var(--ink);font-size:${sz}px;font-weight:600` }), { textContent: s }));
      t(160, 133, a - k); t(260, 133, k); t(360, 133, b - k); t(40, 228, none, 18); t(150, 30, 'A', 16); t(370, 30, 'B', 16);
      out.innerHTML = `|A ∪ B| = ${a} + ${b} − ${k} = <b>${union}</b> · egyikbe sem tartozik: ${bad ? '—' : none}${bad ? '<br>Ez nem lehetséges: az unió nagyobb az alaphalmaznál!' : ''}`;
    };
    N = slider(ctl, 'alaphalmaz', 10, 60, 1, 30, draw); A = slider(ctl, '|A|', 0, 60, 1, 18, draw); B = slider(ctl, '|B|', 0, 60, 1, 15, draw); K = slider(ctl, '|A ∩ B|', 0, 15, 1, 8, draw); draw();
  };

  W.binom = root => {
    const { fig, ctl, out } = shell(root, 'Interaktív: binomiális eloszlás');
    let Nn, P, K;
    const svg = S('svg', { viewBox: '0 0 520 260', class: 'wplot' }); fig.append(svg);
    const comb = (n, k) => { let r = 1; for (let i = 1; i <= k; i++) r = r * (n - k + i) / i; return r; };
    const draw = () => {
      const n = Nn.get(), p = P.get(); K.inp.max = n; const k = Math.min(K.get(), n);
      const pm = Array.from({ length: n + 1 }, (_, i) => comb(n, i) * p ** i * (1 - p) ** (n - i)), mx = Math.max(...pm);
      svg.replaceChildren(); const bw = 500 / (n + 1);
      pm.forEach((v, i) => {
        const h = v / mx * 200; svg.append(S('rect', { x: 10 + i * bw + 1, y: 225 - h, width: Math.max(1, bw - 2), height: h, style: `fill:${i === k ? 'var(--accent)' : i > k ? 'var(--brand)' : 'var(--muted)'};opacity:${i === k ? 1 : .55}` }));
        if (n <= 20) svg.append(Object.assign(S('text', { x: 10 + i * bw + bw / 2, y: 245, 'text-anchor': 'middle', style: 'fill:var(--muted);font-size:11px' }), { textContent: i }));
      });
      const ge = pm.slice(k).reduce((s, v) => s + v, 0);
      out.innerHTML = `E(X) = np = ${fmt(n * p)} · σ = ${fmt(Math.sqrt(n * p * (1 - p)))}<br>P(X = ${k}) = ${fmt(pm[k], 4)} · P(X ≥ ${k}) = ${fmt(ge, 4)}`;
    };
    Nn = slider(ctl, 'n (kísérlet)', 1, 30, 1, 10, draw); P = slider(ctl, 'p (siker)', .05, .95, .05, .5, draw); K = slider(ctl, 'k', 0, 30, 1, 5, draw); draw();
  };

  W.circline = root => {
    const { fig, ctl, out } = shell(root, 'Interaktív: kör és egyenes kölcsönös helyzete');
    const p = Plot(fig, { xr: [-8, 8], yr: [-5.5, 5.5], W: 560, H: 385 });
    let U, V, R, M, B;
    const draw = () => {
      const u = U.get(), v = V.get(), r = R.get(), m = M.get(), b = B.get();
      const qa = 1 + m * m, qb = 2 * (m * (b - v) - u), qc = u * u + (b - v) ** 2 - r * r, D = qb * qb - 4 * qa * qc, d = Math.abs(m * u - v + b) / Math.sqrt(qa);
      p.clear(); p.circle(u, v, r, { color: 'var(--accent)' }); p.line(-8, m * -8 + b, 8, m * 8 + b, { color: 'var(--ink)' }); p.pt(u, v, { color: 'var(--accent)', r: 3 });
      let t;
      if (D > 1e-9) { const x1 = (-qb - Math.sqrt(D)) / (2 * qa), x2 = (-qb + Math.sqrt(D)) / (2 * qa); [x1, x2].forEach(x => p.pt(x, m * x + b, { color: 'var(--brand)', r: 6 })); t = `két metszéspont: (${fmt(x1)}; ${fmt(m * x1 + b)}) és (${fmt(x2)}; ${fmt(m * x2 + b)})`; }
      else if (Math.abs(D) <= 1e-9) { const x = -qb / (2 * qa); p.pt(x, m * x + b, { color: 'var(--brand)', r: 6 }); t = 'érintő: egy közös pont'; } else t = 'nincs közös pont';
      out.innerHTML = `Kör: (x − ${fmt(u)})² + (y − ${fmt(v)})² = ${fmt(r * r)} · Egyenes: y = ${fmt(m)}x + ${fmt(b)}<br>Középpont–egyenes távolság: d = ${fmt(d)}, sugár: r = ${fmt(r)} → <b>${t}</b>`;
    };
    U = slider(ctl, 'u', -4, 4, .5, 0, draw); V = slider(ctl, 'v', -3, 3, .5, 0, draw); R = slider(ctl, 'r', 1, 5, .5, 3, draw); M = slider(ctl, 'meredekség', -3, 3, .1, 1, draw); B = slider(ctl, 'y-metszet', -5, 5, .1, 1, draw); draw();
  };

  W.seq = root => {
    const { fig, ctl, out } = shell(root, 'Interaktív: számtani és mértani sorozat');
    let T, A1, Q, N;
    const draw = () => {
      const geo = T.get() === 1, a1 = A1.get(), q = Q.get(), n = N.get();
      const terms = Array.from({ length: n }, (_, i) => geo ? a1 * q ** i : a1 + i * q);
      const lo = Math.min(0, ...terms), hi = Math.max(0, ...terms), pad = (hi - lo || 1) * .15;
      fig.replaceChildren(); const p = Plot(fig, { xr: [0, 13], yr: [lo - pad, hi + pad], sx: 1, sy: Math.max(1, Math.round((hi - lo) / 8)) });
      terms.forEach((v, i) => { p.line(i + 1, 0, i + 1, v, { color: 'var(--line)', w: 1.5 }); p.pt(i + 1, v, { color: 'var(--accent)', r: 5 }); });
      const an = terms[n - 1], S = geo ? (q === 1 ? a1 * n : a1 * (q ** n - 1) / (q - 1)) : n * (a1 + an) / 2;
      out.innerHTML = `${geo ? 'a₁ = ' + fmt(a1) + ', q = ' + fmt(q) : 'a₁ = ' + fmt(a1) + ', d = ' + fmt(q)} · a${n} = <b>${fmt(an)}</b> · S${n} = <b>${fmt(S)}</b>${geo && Math.abs(q) < 1 ? `<br>|q| < 1: a végtelen sor összege: ${fmt(a1 / (1 - q))}` : ''}`;
    };
    T = select(ctl, 'típus', ['számtani', 'mértani'], draw); A1 = slider(ctl, 'a₁', -5, 10, 1, 2, draw); Q = slider(ctl, 'd vagy q', -3, 3, .5, 1.5, draw); N = slider(ctl, 'n', 1, 12, 1, 8, draw); draw();
  };

  W.exp = root => {
    const { fig, ctl, out } = shell(root, 'Interaktív: aˣ és log_a x – egymás inverzei');
    const p = Plot(fig, { xr: [-5, 5], yr: [-5, 5], W: 440, H: 440 });
    let A;
    const draw = () => {
      let a = A.get(); if (Math.abs(a - 1) < .05) a = 1.1;
      p.clear(); p.line(-5, -5, 5, 5, { color: 'var(--muted)', dash: '6 5', w: 1.5 });
      p.curve(x => a ** x, { color: 'var(--accent)' }); p.curve(x => Math.log(x) / Math.log(a), { color: 'var(--brand)' }); p.pt(0, 1, { color: 'var(--accent)' }); p.pt(1, 0, { color: 'var(--brand)' });
      out.innerHTML = `Mauve: y = ${fmt(a)}ˣ · olíva: y = log_${fmt(a)} x · szaggatott: y = x<br>${a > 1 ? 'a > 1: mindkettő szigorúan nő.' : '0 < a < 1: mindkettő szigorúan csökken.'} Az (0; 1) és (1; 0) pont mindig rajta van.`;
    };
    A = slider(ctl, 'a (alap)', .2, 5, .1, 2, draw); draw();
  };

  W.vector = root => {
    const { fig, ctl, out } = shell(root, 'Interaktív: skaláris szorzat és szög');
    const p = Plot(fig, { xr: [-7, 7], yr: [-6, 6] });
    let a1, a2, b1, b2;
    const draw = () => {
      const x1 = a1.get(), y1 = a2.get(), x2 = b1.get(), y2 = b2.get(), dot = x1 * x2 + y1 * y2, la = Math.hypot(x1, y1), lb = Math.hypot(x2, y2);
      p.clear(); p.arrow(0, 0, x1, y1, { color: 'var(--accent)', w: 3 }); p.arrow(0, 0, x2, y2, { color: 'var(--brand)', w: 3 });
      p.text(x1, y1 + .3, 'a', { color: 'var(--accent)' }); p.text(x2, y2 + .3, 'b', { color: 'var(--brand)' });
      const ang = la && lb ? Math.acos(Math.max(-1, Math.min(1, dot / (la * lb)))) * 180 / Math.PI : NaN;
      out.innerHTML = `a·b = ${fmt(x1 * x2)} + ${fmt(y1 * y2)} = <b>${fmt(dot)}</b> · |a| = ${fmt(la)}, |b| = ${fmt(lb)}<br>Szög: ${isNaN(ang) ? '—' : fmt(ang, 1) + '°'}${Math.abs(dot) < 1e-9 && la && lb ? ' → merőlegesek!' : ''}`;
    };
    a1 = slider(ctl, 'a₁', -5, 5, 1, 3, draw); a2 = slider(ctl, 'a₂', -5, 5, 1, 2, draw); b1 = slider(ctl, 'b₁', -5, 5, 1, -2, draw); b2 = slider(ctl, 'b₂', -5, 5, 1, 3, draw); draw();
  };

  window.initWidgets = function (scope) {
    scope.querySelectorAll('.widget').forEach(el => { if (!el.dataset.ready && W[el.dataset.w]) { el.dataset.ready = 1; W[el.dataset.w](el); } });
  };
})();
