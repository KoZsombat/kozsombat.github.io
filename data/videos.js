/* Külső videók (nem a saját anyagunk): a címek alapján válogatva, tartalmukat nem ellenőriztük végig. */
(function () {
  const L = id => window.TOPICS.flatMap(t => t.lessons).find(l => l.id === id);
  const V = {
    t1l2: ['s76wY6_1ZvA', 'Így értsd meg gyorsan a kombinatorikát (permutáció, variáció, kombináció)'],
    t3l1: ['4D37NReg8Ws', 'Másodfokú egyenlet megoldása megoldóképlettel és Viète-formulákkal'],
    t3l3: ['3u2Vb6-iDLY', 'Logaritmus azonosságok és egyenletek'],
    t5l2: ['_-Y4U3r2Xgk', 'A szinusztétel buktatója – szinusz- és koszinusztétel'],
    t8l2: ['PnM6HgPlWbc', 'Deriválás alapjai – hogyan kell deriválni?'],
    t8l5: ['BZiGOA5Kilg', 'A derivált fogalma (11. osztály)'],
    t8l7: ['qUJrZpueguM', 'Határozott integrál – emelt szintű feladatok megoldása'],
    t9l2: ['tjtNgpYXCpo', 'Binomiális eloszlás, visszatevéses mintavétel – emelt szint']
  };
  Object.entries(V).forEach(([lid, [id, title]]) => {
    const l = L(lid); if (!l) return;
    l.steps.push({ h: 'Videó', html: `<p>Ha inkább hallgatnád is, nézd meg ezt a magyar nyelvű videót (külső forrás: <i>${title}</i>).</p>
      <div class="yt" data-id="${id}" role="button" tabindex="0" aria-label="Videó lejátszása"><img loading="lazy" alt="" src="https://i.ytimg.com/vi/${id}/hqdefault.jpg"><span class="ytplay"></span></div>
      <p class="ytnote">Nem játszódik le? <a href="https://www.youtube.com/watch?v=${id}" target="_blank" rel="noopener">Megnyitás a YouTube-on</a>.</p>` });
  });
})();
