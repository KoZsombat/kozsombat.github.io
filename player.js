/* Lecke-lejátszó: kattintásonként épülő magyarázat, interaktív feladatok, automatikus lejátszás, kabala */
(function () {
  'use strict';
  if (document.body.dataset.page !== 'tanulas') return;
  const { prog, save, math, touchStreak } = window.MK;
  const TOPICS = window.TOPICS;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const side = $('#side'), main = $('#main');
  prog.ix = prog.ix || {};

  const JOKES = [
    'Miért szomorú a matekkönyv? Mert túl sok a problémája.',
    'Mit csinál a matematikus a kertben? Gyököket keres.',
    'Két egyenes találkozik. – Mi a helyzet? – Párhuzamosan élünk, sose találkozunk.',
    'Miért ment el a kör a pszichológushoz? Mert állandóan körbe-körbe járt a gondolata.',
    'Mit mond a szinusz a koszinusznak? – Mindig kicsit el vagy tolódva hozzám képest.',
    'Az integrál nem kérdez: ő mindent összead, aztán még hozzátesz egy C-t.',
    'Miért nem szereti a nulla a szorzást? Mert bárkivel is találkozik, üres kézzel megy haza.',
    'Miért bízik a derivált a függvényben? Mert tudja, merre tart.',
    'Hány matematikus kell egy villanykörte cseréjéhez? Egy, de először bebizonyítja, hogy létezik megoldás.',
    'A prímszám legnagyobb félelme? Hogy elosztják.'
  ];
  const CHEER = ['Szép munka!', 'Ez az! Tovább a következőre.', 'Pontosan így kell ezt!', 'Látom, megy ez neked.', 'Na, ez könnyű volt, igaz?'];
  const TRY = ['Semmi gond, próbáld újra!', 'Majdnem! Nézd át még egyszer a számolást.', 'Nem egészen. Kérj segítséget a gombbal!', 'Hopp! Egy kis előjelhiba? Nézd meg újra.'];
  const TIPS = ['Kattints a Tovább gombra, vagy nyomj jobbra nyilat: lépésről lépésre épül fel a magyarázat.', 'Ha elakadsz, a Vissza gombbal bármikor visszaléphetsz.', 'Tipp: jegyezd meg a piros keretes gyakori hibákat, a vizsgán ezekből lesz a legtöbb pontvesztés.'];
  let n0 = 0;
  const pick = a => a[(n0++) % a.length];

  /* ---------- kabala ---------- */
  const MASCOT = `<svg viewBox="0 0 64 64" class="mascot" aria-hidden="true"><ellipse cx="32" cy="60" rx="16" ry="3" style="fill:var(--line)"/>
    <circle cx="32" cy="36" r="22" style="fill:var(--olive-500)"/><path d="M12 22 32 8l20 14-20 7z" style="fill:var(--mauve-700)"/><path d="M52 22v12" style="stroke:var(--mauve-700);stroke-width:2.5"/><circle cx="52" cy="35" r="2.6" style="fill:var(--mauve-500)"/>
    <circle cx="24" cy="36" r="6" style="fill:#fff"/><circle cx="40" cy="36" r="6" style="fill:#fff"/><circle class="pu" cx="25" cy="37" r="2.6" style="fill:var(--mauve-950)"/><circle class="pu" cx="41" cy="37" r="2.6" style="fill:var(--mauve-950)"/>
    <path class="m-happy" d="M23 47q9 8 18 0" style="fill:none;stroke:var(--mauve-950);stroke-width:2.4;stroke-linecap:round"/><path class="m-sad" d="M24 50q8-6 16 0" style="fill:none;stroke:var(--mauve-950);stroke-width:2.4;stroke-linecap:round"/></svg>`;
  let bubble;
  function say(text, mood) {
    if (!bubble) return;
    bubble.textContent = text; bubble.classList.remove('pop'); void bubble.offsetWidth; bubble.classList.add('pop');
    const m = $('.mascot', main); if (m) { m.classList.toggle('sad', mood === 'sad'); m.classList.toggle('hop', mood === 'happy'); if (mood === 'happy') setTimeout(() => m.classList.remove('hop'), 700); }
  }

  /* ---------- válasz-ellenőrzés ---------- */
  function num(s) {
    s = String(s).toLowerCase().replace(/\s+/g, '').replace(/[−–]/g, '-').replace(/,/g, '.').replace(/[°%]/g, '');
    const fr = s.match(/^(-?\d+(?:\.\d+)?)\/(-?\d+(?:\.\d+)?)$/);
    if (fr) return +fr[1] / +fr[2];
    return /^-?\d+(\.\d+)?$/.test(s) ? +s : NaN;
  }
  const strNorm = s => String(s).toLowerCase().replace(/\s+/g, '').replace(/[−–]/g, '-').replace(/,/g, '.').replace(/pi/g, 'π');
  function matches(input, answers, tol) {
    const v = num(input);
    return answers.some(a => { const an = num(a); return !isNaN(v) && !isNaN(an) ? Math.abs(v - an) <= tol : strNorm(a) === strNorm(input); });
  }
  function initIx(scope) {
    $$('.ix', scope).forEach(el => {
      const answers = el.dataset.a.split('|'), tol = +(el.dataset.tol || 1e-6), hint = el.dataset.hint || '', id = el.dataset.id;
      const q = el.innerHTML;
      el.innerHTML = `<span class="label">Most te jössz</span><div class="ixq">${q}</div>
        <div class="row"><input type="text" placeholder="Válaszod" aria-label="Válaszod" autocomplete="off"><button class="chk">Ellenőrzöm</button><button class="alt hnt">Segíts</button><span class="msg"></span></div><div class="ixhint"></div>`;
      const inp = $('input', el), msg = $('.msg', el); let tries = 0;
      const showHint = () => { $('.ixhint', el).innerHTML = hint ? `<div class="hint"><b>Segítség:</b> ${hint}</div>` : ''; math(el); };
      const check = () => {
        if (!inp.value.trim()) return;
        if (matches(inp.value, answers, tol)) {
          msg.className = 'msg ok'; msg.textContent = '✓ Helyes!'; el.classList.add('solved'); prog.ix[id] = 'ok'; save(); touchStreak(); say(pick(CHEER), 'happy');
        } else { tries++; msg.className = 'msg no'; msg.textContent = '✗ Még nem az.'; say(pick(TRY), 'sad'); if (tries >= 2) showHint(); }
      };
      $('.chk', el).onclick = check; inp.addEventListener('keydown', e => { if (e.key === 'Enter') check(); });
      $('.hnt', el).onclick = showHint;
      if (prog.ix[id] === 'ok') { msg.className = 'msg ok'; msg.textContent = '✓ Korábban megoldottad'; el.classList.add('solved'); }
    });
  }

  /* ---------- lejátszó állapot ---------- */
  let cur = null, frames = [], f = 1, playing = false, voiceOn = false, speed = 1, timer = null, tok = 0;
  const flat = TOPICS.flatMap(t => t.lessons.map(l => [t, l]));

  function stopSpeech() { tok++; clearTimeout(timer); if ('speechSynthesis' in window) speechSynthesis.cancel(); }
  function setPlaying(v) { playing = v; const b = $('#play'); if (b) b.textContent = v ? 'Szünet' : 'Lejátszás'; if (!v) stopSpeech(); else schedule(); }

  function narr(el) {
    if (el.classList.contains('katex-display')) return 'Képlet.';
    if (el.classList.contains('widget')) return 'Próbáld ki az interaktív ábrát: mozgasd a csúszkákat.';
    const c = el.cloneNode(true);
    $$('.katex-display,.katex', c).forEach(k => k.replaceWith(document.createTextNode(' képlet ')));
    $$('svg,.widget,script,.hint,.ixhint,.row', c).forEach(x => x.remove());
    return c.textContent.replace(/\s+/g, ' ').trim();
  }
  function schedule() {
    clearTimeout(timer); if (!playing || !cur || cur.s >= cur.l.steps.length) { if (playing && cur && cur.s >= cur.l.steps.length) setPlaying(false); return; }
    if ('speechSynthesis' in window) speechSynthesis.cancel();
    const fr = frames[f - 1]; if (!fr) return;
    let txt = narr(fr); if (f === 1) txt = cur.l.steps[cur.s].h + '. ' + txt;
    const extra = fr.classList.contains('widget') || fr.classList.contains('ix') ? 14000 : 0;
    const myTok = ++tok;
    const go = () => { if (myTok === tok && playing) advance(); };
    if (voiceOn && 'speechSynthesis' in window) {
      const u = new SpeechSynthesisUtterance(txt); u.lang = 'hu-HU'; u.rate = speed;
      const v = speechSynthesis.getVoices().find(x => x.lang && x.lang.toLowerCase().startsWith('hu')); if (v) u.voice = v;
      u.onend = () => { timer = setTimeout(go, (extra || 700) / speed); }; u.onerror = () => { timer = setTimeout(go, (1800 + txt.length * 55) / speed); };
      speechSynthesis.speak(u); timer = setTimeout(go, (txt.length * 140 + 6000 + extra) / speed); // biztonsági tartalék
    } else timer = setTimeout(go, (1800 + txt.length * 55 + extra) / speed);
  }
  function advance() { next(); }

  /* ---------- megjelenítés ---------- */
  function route() {
    const [tid, lid] = location.hash.slice(1).split('/');
    const t = TOPICS.find(x => x.id === tid) || TOPICS[0];
    const l = t.lessons.find(x => x.id === lid) || t.lessons[0];
    cur = { t, l, s: 0 }; f = 1; show();
  }
  function renderSide() {
    const list = TOPICS.map(t => `<h4>${t.title}</h4>` + t.lessons.map(l =>
      `<a href="#${t.id}/${l.id}" class="${cur.l.id === l.id ? 'on' : ''}"><span>${l.title}</span>${prog.lessons[l.id] ? '<span class="done">✓</span>' : ''}</a>`).join('')).join('');
    const wasOpen = side.querySelector('details') ? side.querySelector('details').open : innerWidth > 900;
    side.innerHTML = `<details class="tocd" ${wasOpen && innerWidth > 900 ? 'open' : ''}><summary><span><small>Tananyag</small>${cur.l.title}</span></summary>${list}</details>`;
    const on = $('a.on', side); if (on && on.scrollIntoView) on.scrollIntoView({ block: 'nearest' });
  }
  function show() {
    const { t, l } = cur, n = l.steps.length, isQuiz = cur.s === n, isDone = cur.s > n;
    stopSpeech(); renderSide();
    const segs = Array.from({ length: n + 1 }, (_, i) => `<button class="seg ${i < cur.s ? 'done' : i === cur.s ? 'now' : ''}" data-s="${i}" aria-label="${i + 1}. lépés"></button>`).join('');
    main.innerHTML = `<p class="crumb label">${t.title}</p>
      <div class="ptop"><h2>${l.title}</h2><div class="pctl"><button class="alt" id="play">${playing ? 'Szünet' : 'Lejátszás'}</button>
      <label class="tog"><input type="checkbox" id="voice" ${voiceOn ? 'checked' : ''}> Felolvasás</label>
      <select id="speed" aria-label="Sebesség"><option value="0.75">0,75×</option><option value="1">1×</option><option value="1.5">1,5×</option><option value="2">2×</option></select></div></div>
      <div class="segs">${segs}</div>
      <div class="coach">${MASCOT}<div class="bubble" id="bubble"></div></div>
      <div class="step" id="stepbox"></div><div class="nav2" id="nav2"></div>`;
    bubble = $('#bubble'); $('#speed').value = String(speed);
    $$('.seg', main).forEach(b => b.onclick = () => { cur.s = +b.dataset.s; f = 1; show(); });
    $('#play').onclick = () => setPlaying(!playing);
    $('#voice').onchange = e => { voiceOn = e.target.checked; if (playing) schedule(); };
    $('#speed').onchange = e => { speed = +e.target.value; if (playing) schedule(); };
    const box = $('#stepbox');
    if (isDone) return done(box);
    if (isQuiz) return quiz(box);
    const stp = l.steps[cur.s];
    const b = document.createElement('div'); b.className = 'stepbody'; b.innerHTML = `<h3>${stp.h}</h3>${stp.html}`;
    box.append(b); initIx(b); math(b); window.initWidgets(b);
    frames = [...b.children].filter(c => c.tagName !== 'H3');
    if (f > frames.length) f = frames.length; if (f < 1) f = 1;
    frames.forEach((c, i) => { if (i >= f) c.classList.add('hid'); });
    say(/Játssz/.test(stp.h) ? 'Húzogasd a csúszkákat, és nézd, mi változik. Ez az igazi tanulás!' : /Próbáld/.test(stp.h) ? 'Most te jössz. Nyugi, nem érettségi – kísérletezz!' : cur.s === 0 && n0 % 2 === 0 ? pick(TIPS) : cur.s % 3 === 2 ? 'Jegyezd meg: ' + stp.h + '.' : stp.h + '.');
    n0++; nav(); window.scrollTo({ top: 0 });
    if (playing) schedule();
  }
  function nav() {
    const { l } = cur, n = l.steps.length, last = f >= frames.length;
    $('#nav2').innerHTML = `<button class="alt" id="prev" ${cur.s === 0 && f <= 1 ? 'disabled' : ''}>← Vissza</button>
      <span>${cur.s + 1}. lépés / ${n + 1} · kép ${f}/${frames.length}</span>
      <button id="next">${last && cur.s === n - 1 ? 'Ellenőrző kérdés →' : 'Tovább →'}</button>`;
    $('#prev').onclick = back; $('#next').onclick = next;
    $$('.seg', main).forEach((b, i) => b.style.setProperty('--fill', i === cur.s ? Math.round(f / Math.max(1, frames.length) * 100) + '%' : ''));
  }
  function next() {
    if (!cur) return;
    if (cur.s >= cur.l.steps.length) return;
    if (f < frames.length) { f++; const el = frames[f - 1]; el.classList.remove('hid'); el.classList.add('frame-in'); nav(); if (playing) schedule(); }
    else { cur.s++; f = 1; show(); }
  }
  function back() {
    if (f > 1) { frames[f - 1].classList.add('hid'); f--; nav(); if (playing) schedule(); }
    else if (cur.s > 0) { cur.s--; f = 1e9; show(); }
  }
  function quiz(box) {
    const { l } = cur, q = l.quiz, ans = prog.quiz[l.id];
    box.innerHTML = `<h3>Ellenőrző kérdés</h3><p>${q.q}</p>` + q.opts.map((o, i) =>
      `<button class="opt ${ans !== undefined ? (i === q.a ? 'right' : i === ans ? 'wrong' : '') : ''}" data-i="${i}">${o}</button>`).join('') +
      (ans !== undefined ? `<div class="box"><b>${ans === q.a ? 'Helyes!' : 'Nem egészen.'}</b> ${q.why}</div>` : '');
    setPlaying(false); math(box); say(ans === undefined ? 'Utolsó kérdés, ígérem, nem harap.' : ans === q.a ? pick(CHEER) : pick(TRY), ans === undefined ? '' : ans === q.a ? 'happy' : 'sad');
    $$('.opt', box).forEach(b => b.onclick = () => { if (prog.quiz[l.id] === undefined) { prog.quiz[l.id] = +b.dataset.i; save(); quiz(box); } });
    $('#nav2').innerHTML = `<button class="alt" id="prev">← Vissza</button><span>${cur.s + 1}. lépés / ${l.steps.length + 1}</span><button id="next" ${ans === undefined ? 'disabled' : ''}>Lecke kész →</button>`;
    $('#prev').onclick = () => { cur.s--; f = 1e9; show(); };
    $('#next').onclick = () => { prog.lessons[l.id] = true; save(); touchStreak(); cur.s++; show(); };
  }
  function done(box) {
    const { t, l } = cur, i = flat.findIndex(p => p[1].id === l.id), nx = flat[i + 1];
    const joke = JOKES[i % JOKES.length];
    const doneCnt = Object.keys(prog.lessons).length;
    box.innerHTML = `<span class="label">Lecke kész</span><h3>Ügyes vagy!</h3><p>Ezzel <b>${doneCnt}/${flat.length}</b> lecke van meg.</p>
      <div class="box"><b>Jutalomvicc:</b> ${joke}</div>
      <div class="row">${nx ? `<a class="btn" href="#${nx[0].id}/${nx[1].id}">Következő: ${nx[1].title} →</a>` : ''}<a class="btn alt" href="feladatok.html#${t.id}">Gyakorolj feladatokkal</a></div>`;
    say('Kész! Jár egy vicc.', 'happy'); $('#nav2').innerHTML = `<button class="alt" id="prev">← Vissza a leckéhez</button>`; $('#prev').onclick = () => { cur.s = 0; f = 1; show(); };
    setPlaying(false);
  }

  const playYt = e => {
    const y = e.target.closest && e.target.closest('.yt'); if (!y || y.dataset.on) return;
    if (e.type === 'keydown' && e.key !== 'Enter') return;
    y.dataset.on = 1; setPlaying(false);
    y.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${y.dataset.id}?autoplay=1&rel=0" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen title="Videó"></iframe>`;
  };
  document.addEventListener('click', playYt); document.addEventListener('keydown', playYt);
  window.addEventListener('hashchange', () => { setPlaying(false); route(); });
  document.addEventListener('keydown', e => {
    if (/^(INPUT|SELECT|TEXTAREA)$/.test(e.target.tagName) && e.target.type !== 'checkbox') return;
    if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); next(); } else if (e.key === 'ArrowLeft') back();
  });
  route();
})();
