/* Emelt matek érettségi – közös logika */
(function () {
  'use strict';
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const page = document.body.dataset.page;

  /* ---------- haladás (localStorage) ---------- */
  const KEY = 'mk_emelt_progress_v1';
  let prog = { lessons: {}, tasks: {}, quiz: {}, exams: {} };
  try { prog = Object.assign(prog, JSON.parse(localStorage.getItem(KEY) || '{}')); } catch (e) { /* nincs tárhely */ }
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(prog)); } catch (e) { /* nincs tárhely */ } };

  /* ---------- képlet-megjelenítés ---------- */
  function math(el) {
    if (window.renderMathInElement) {
      window.renderMathInElement(el || document.body, {
        delimiters: [{ left: '$$', right: '$$', display: true }, { left: '$', right: '$', display: false }],
        throwOnError: false
      });
    }
  }
  window.addEventListener('load', () => math());
  function touchStreak() {
    const d = new Date().toISOString().slice(0, 10), s = prog.streak || { last: '', n: 0 };
    if (s.last === d) return;
    const y = new Date(Date.now() - 864e5).toISOString().slice(0, 10);
    prog.streak = { last: d, n: s.last === y ? s.n + 1 : 1 }; save();
  }
  window.MK = { prog, save, math, touchStreak };

  /* ---------- fejléc / lábléc ---------- */
  const links = [
    ['index.html', 'Főoldal', 'index'], ['tanulas.html', 'Tanulás', 'tanulas'],
    ['feladatok.html', 'Feladatok', 'feladatok'], ['probaerettsegi.html', 'Próbaérettségi', 'proba'],
    ['kepletek.html', 'Képletek', 'kepletek'], ['gyik.html', 'GYIK', 'gyik']
  ];
  $('#hdr').outerHTML = `<header class="site"><div class="wrap">
    <a class="logo" href="index.html">Emelt<b>Matek</b></a>
    <nav class="main">${links.map(l => `<a href="${l[0]}" class="${l[2] === page ? 'on' : ''}">${l[1]}</a>`).join('')}
    <button class="ghost" id="theme" title="Világos/sötét">◐</button></nav></div></header>`;
  $('#ftr').outerHTML = `<footer class="site"><div class="wrap"><span class="label">EmeltMatek</span><div>
    <p><a href="tanulas.html">Tanulás</a><a href="feladatok.html">Feladatok</a><a href="probaerettsegi.html">Próbaérettségi</a><a href="gyik.html">GYIK</a></p>
    <p>Független, önálló tananyag az emelt szintű matematika érettségihez. A tartalom saját szerkesztésű; a hivatalos követelményeket és a korábbi feladatsorokat az
    <a href="https://www.oktatas.hu/kozneveles/erettsegi/feladatsorok" target="_blank" rel="noopener">Oktatási Hivatal oldalán</a> találod.
    Inspirálta: <a href="https://www.mateking.hu/" target="_blank" rel="noopener">mateking.hu</a> (nem áll kapcsolatban vele).</p></div></div></footer>`;
  $('#theme').onclick = () => {
    const r = document.documentElement;
    const dark = r.dataset.theme ? r.dataset.theme === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
    r.dataset.theme = dark ? 'light' : 'dark';
  };

  const TOPICS = window.TOPICS || [];
  const TASKS = window.TASKS || [];
  const topicName = id => (TOPICS.find(t => t.id === id) || {}).title || id;
  const norm = s => String(s).toLowerCase().replace(/\s+/g, '').replace(',', '.').replace(/[;]/g, ';');

  /* ---------- főoldal ---------- */
  if (page === 'index') {
    const total = TOPICS.reduce((n, t) => n + t.lessons.length, 0);
    const done = Object.keys(prog.lessons).length;
    $('#topics').innerHTML = TOPICS.map((t, i) => `<a href="tanulas.html#${t.id}/${t.lessons[0].id}">
      <span class="n">${String(i + 1).padStart(2, '0')}</span><span class="t">${t.title}</span><span class="m">${t.lessons.length} lecke · ${TASKS.filter(x => x.topic === t.id).length} feladat</span></a>`).join('');
    $('#lessonCount').textContent = total;
    $('#taskCount').textContent = TASKS.length;
    $('#myprog').textContent = `${done}/${total} lecke kész`;
    if (prog.streak && prog.streak.n > 1) $('#myprog').nextElementSibling.textContent = `a te haladásod · ${prog.streak.n} napos széria`;
  }

  /* ---------- feladatok ---------- */
  function taskCard(t, opts = {}) {
    const st = prog.tasks[t.id];
    return `<div class="card task" id="${t.id}"><div class="top"><span class="tag">${topicName(t.topic)}</span><span class="tag">${t.part}. rész</span>
      <b>${t.title}</b><span class="pts">${t.points} pont</span></div>
      <div>${t.q}</div>
      ${t.answer && !opts.exam ? `<div class="row"><input type="text" placeholder="Végeredmény" data-ans="${t.id}"><button data-check="${t.id}">Ellenőriz</button><span class="msg" data-msg="${t.id}">${st === 'ok' ? '✓ megoldva' : ''}</span></div>` : ''}
      <div class="row">${opts.exam ? '' : `<button class="alt" data-hint="${t.id}">Tipp</button>`}<button class="alt" data-sol="${t.id}" ${opts.exam ? 'style="display:none"' : ''}>Megoldás</button></div>
      <div data-hbox="${t.id}"></div><div data-sbox="${t.id}"></div></div>`;
  }
  function wireTasks(root, opts = {}) {
    $$('[data-hint]', root).forEach(b => b.onclick = () => {
      const t = TASKS.find(x => x.id === b.dataset.hint);
      $(`[data-hbox="${t.id}"]`, root).innerHTML = `<div class="hint"><b>Tipp:</b> ${t.hint}</div>`; math(root);
    });
    $$('[data-sol]', root).forEach(b => b.onclick = () => {
      const t = TASKS.find(x => x.id === b.dataset.sol), box = $(`[data-sbox="${t.id}"]`, root);
      box.innerHTML = box.innerHTML ? '' : `<div class="sol"><b>Megoldás</b>${t.sol}${t.answer ? `<p><b>Végeredmény:</b> ${t.show || t.answer}</p>` : ''}</div>`; math(root);
    });
    $$('[data-check]', root).forEach(b => b.onclick = () => {
      const t = TASKS.find(x => x.id === b.dataset.check);
      const v = $(`[data-ans="${t.id}"]`, root).value, m = $(`[data-msg="${t.id}"]`, root);
      const ok = [].concat(t.answer).some(a => norm(a) === norm(v));
      m.className = 'msg ' + (ok ? 'ok' : 'no');
      m.textContent = ok ? '✓ Helyes!' : '✗ Ez most nem jó, próbáld újra vagy nézd meg a tippet.';
      if (ok) { prog.tasks[t.id] = 'ok'; save(); }
    });
  }

  if (page === 'feladatok') {
    const fT = $('#fTopic'), fP = $('#fPart'), list = $('#list');
    fT.innerHTML = '<option value="">Minden témakör</option>' + TOPICS.map(t => `<option value="${t.id}">${t.title}</option>`).join('');
    if (location.hash.slice(1)) fT.value = location.hash.slice(1);
    function draw() {
      const rows = TASKS.filter(t => (!fT.value || t.topic === fT.value) && (!fP.value || t.part === fP.value));
      const solved = TASKS.filter(t => prog.tasks[t.id] === 'ok').length;
      $('#count').textContent = `${rows.length} feladat · ${solved} helyesen megoldott (ellenőrizhető végeredménnyel)`;
      list.innerHTML = rows.map(t => taskCard(t)).join('');
      wireTasks(list); math(list);
    }
    fT.onchange = fP.onchange = draw;
    draw();
  }

  /* ---------- próbaérettségi ---------- */
  if (page === 'proba') {
    const EX = window.EXAMS || [];
    const root = $('#exam');
    let timer = null;
    function menu() {
      clearInterval(timer);
      root.innerHTML = `<div class="exams">${EX.map((e, i) => `<div class="card"><h3>${e.title}</h3>
        <p>I. rész: ${e.part1.length} feladat · ${e.t1} perc<br>II. rész: ${e.part2.length} feladat · ${e.t2} perc</p>
        <p>Összesen: ${[...e.part1, ...e.part2].reduce((n, id) => n + TASKS.find(t => t.id === id).points, 0)} pont</p>
        ${prog.exams[i] !== undefined ? `<p>Legutóbbi eredményed: <b>${prog.exams[i]}</b> pont</p>` : ''}
        <button data-start="${i}">Kezdés</button></div>`).join('')}</div>`;
      $$('[data-start]', root).forEach(b => b.onclick = () => start(+b.dataset.start));
    }
    function start(i) {
      const e = EX[i];
      let phase = 1, left = e.t1 * 60;
      const ids = () => (phase === 1 ? e.part1 : e.part2);
      function draw() {
        root.innerHTML = `<div class="exam-bar"><div><span class="label">${e.title}</span><br><b style="font:500 1.4rem var(--serif)">${phase}. rész</b></div>
          <div class="timer" id="tm"></div><button id="fin">${phase === 1 ? 'Tovább a II. részre' : 'Befejezés'}</button></div>
          <div id="tl">${ids().map(id => taskCard(TASKS.find(t => t.id === id), { exam: true })).join('')}</div>`;
        $('#fin').onclick = next; tick(); math(root);
      }
      function tick() { const m = Math.floor(left / 60), s = left % 60; const el = $('#tm'); if (el) el.textContent = `${m}:${String(s).padStart(2, '0')}`; }
      function next() {
        if (phase === 1) { phase = 2; left = e.t2 * 60; draw(); } else finish();
      }
      function finish() {
        clearInterval(timer);
        const all = [...e.part1, ...e.part2];
        root.innerHTML = `<div class="card"><h3>Önértékelés</h3><p>Az idő letelt (vagy befejezted). Nézd meg a megoldásokat, és pontozd magad a kapott pontszám szerint (részpontok is járhatnak!).</p>
          <div id="tl">${all.map(id => { const t = TASKS.find(x => x.id === id); return taskCard(t, { exam: true }).replace('style="display:none"', '') +
            `<p>Elért pont: <input type="text" size="3" data-sc="${id}" value="0"> / ${t.points}</p>`; }).join('')}</div>
          <p class="timer" id="tot"></p><button id="saveSc">Eredmény mentése</button> <button class="alt" id="back">Vissza a menübe</button></div>`;
        wireTasks(root); math(root);
        const sum = () => { const s = $$('[data-sc]', root).reduce((n, i) => n + (Math.max(0, parseInt(i.value, 10)) || 0), 0); $('#tot').textContent = `Összesen: ${s} pont`; return s; };
        $$('[data-sc]', root).forEach(i => i.oninput = sum); sum();
        $('#saveSc').onclick = () => { prog.exams[i] = sum(); save(); menu(); };
        $('#back').onclick = menu;
      }
      draw();
      timer = setInterval(() => { left--; tick(); if (left <= 0) { clearInterval(timer); next(); } }, 1000);
    }
    menu();
  }

  /* ---------- képletek ---------- */
  if (page === 'kepletek') math();
})();
