/* Interaktív ábrák és „Próbáld ki!” feladatok a leckékbe (a kvíz elé kerülnek) */
(function () {
  const L = id => window.TOPICS.flatMap(t => t.lessons).find(l => l.id === id);
  const esc = s => s.replace(/"/g, '&quot;');

  /* ---- interaktív ábrák: leckeazonosító → [ábra neve, bevezető szöveg] ---- */
  const WIDGETS = {
    t1l1: ['venn', 'Állítsd be a halmazok elemszámát, és nézd meg, hogyan működik a szitaformula.'],
    t3l1: ['quad', 'Mozgasd az együtthatókat: mikor lesz két gyök, egy gyök, és mikor nincs egy sem? Figyeld a diszkriminánst!'],
    t3l3: ['exp', 'Az aˣ és a log_a x egymás tükörképe az y = x egyenesre. Változtasd az alapot!'],
    t4l1: ['transform', 'Válassz alapfüggvényt, és próbáld ki az eltolást, a nyújtást és a tükrözést.'],
    t4l2: ['seq', 'Számtani vagy mértani sorozat? Állítsd be a paramétereket, és nézd az összeget.'],
    t4l3: ['exp', 'Nézd meg, hogyan tükrözi egymást az exponenciális és a logaritmus függvény.'],
    t5l1: ['unitcircle', 'Forgasd az egységkör pontját: a vízszintes szakasz a koszinusz, a függőleges a szinusz.'],
    t5l4: ['sine', 'Változtasd az amplitúdót, a periódust és az eltolásokat.'],
    t6l2: ['vector', 'Állítsd be két vektor koordinátáit: mikor lesz a skaláris szorzat nulla?'],
    t6l5: ['circline', 'Mozgasd a kört és az egyenest: mikor metszi, érinti vagy kerüli el egymást?'],
    t8l5: ['tangent', 'Húzd a pontot a grafikonon: a meredekség maga a derivált. Hol vízszintes az érintő?'],
    t8l3: ['tangent', 'Keresd meg, hol nulla a derivált: ott lehet szélsőérték.'],
    t8l7: ['integral', 'Állítsd be az integrálási határokat: az integrál az előjeles terület.'],
    t9l2: ['binom', 'Változtasd n-et és p-t, és nézd, hogyan alakul az eloszlás.']
  };
  const widgetStep = ([w, intro]) => ({ h: 'Játssz vele!', html: `<p>${intro}</p><div class="widget" data-w="${w}"></div>` });

  /* ---- gyakorló kérdések: [kérdés, válasz(ok) | jellel elválasztva, segítség, (tolerancia)] ---- */
  const P = {
    t1l1: [['Egy osztályban 24 diák van: 14-en tanulnak angolt, 11-en németet, 4-en mindkettőt. Hányan nem tanulnak egyik nyelvet sem?', '3', 'Legalább az egyiket: $14+11-4$.'], ['$|A|=12,\\ |B|=9,\\ |A\\cap B|=5$. Mennyi $|A\\cup B|$?', '16', 'Szitaformula: $12+9-5$.']],
    t1l2: [['Hányféleképpen lehet sorba állítani 5 különböző könyvet?', '120', '$5!$'], ['8 emberből hányféleképpen választható ki egy 3 fős bizottság?', '56', '$\\binom83=\\frac{8\\cdot7\\cdot6}{6}$']],
    t1l3: [['Egy gráfnak 7 csúcsa van, a fokszámok összege 20. Hány éle van?', '10', 'A fokszámösszeg az élszám kétszerese.'], ['Hány éle van a 6 csúcsú teljes gráfnak?', '15', '$\\binom62$']],
    t1l4: [['Mennyi $\\binom62$?', '15', '$\\frac{6\\cdot5}{2}$'], ['Mennyi a $(1+1)^5$ kifejtésében szereplő binomiális együtthatók összege?', '32', '$2^5$']],
    t1l5: [['Legalább hány zoknit kell kihúznod a sötétben egy 4 színű zoknis fiókból, hogy biztosan legyen két azonos színű?', '5', 'Skatulya-elv: 4 doboz.'], ['Mennyi $1+2+\\dots+20$?', '210', '$\\frac{n(n+1)}2$']],
    t1l6: [['Egy fának 15 csúcsa van. Hány éle van?', '14', '$n-1$'], ['Egy 9 csúcsú gráfban minden csúcs foka 4. Hány éle van?', '18', '$\\frac{9\\cdot4}2$']],
    t2l1: [['Hány pozitív osztója van a 48-nak?', '10', '$48=2^4\\cdot3$, így $(4+1)(1+1)$.'], ['Mennyi a 18 és 24 legnagyobb közös osztója?', '6', '$18=2\\cdot3^2,\\ 24=2^3\\cdot3$.']],
    t2l2: [['Mennyi $10110_2$ értéke tízes számrendszerben?', '22', '$16+4+2$'], ['Mi a $7^{100}$ utolsó számjegye?', '1', 'A 7 hatványainak utolsó számjegye 4-es periódusú: 7, 9, 3, 1.']],
    t2l3: [['Hány pozitív egész megoldása van a $2x+3y=12$ egyenletnek?', '1', '$y$ csak 1, 2, 3 lehet; $12-3y$ legyen páros.'], ['Van-e egész megoldása a $6x+9y=10$ egyenletnek? (igen/nem)', 'nem', 'Osztható-e 3-mal a bal oldal? És a 10?']],
    t2l4: [['Mennyi maradékot ad $2^{10}$ 7-tel osztva?', '2', '$2^3=8\\equiv1\\pmod7$, $2^{10}=2^9\\cdot2$.'], ['Mennyi maradékot ad a 100 hetes osztásnál?', '2', '$100=14\\cdot7+2$']],
    t3l1: [['Mennyi az $x^2-7x+12=0$ egyenlet gyökeinek összege?', '7', 'Viète: $-\\frac ba$.'], ['Mennyi az $x^2+2x+5=0$ egyenlet diszkriminánsa?', '-16', '$b^2-4ac=4-20$']],
    t3l2: [['Mennyi az $|x-4|=3$ egyenlet két megoldásának összege?', '8', '$x=7$ vagy $x=1$.'], ['Oldd meg: $\\sqrt{3x+4}=x$. (a megoldás)', '4', '$3x+4=x^2$, $x=4$ vagy $-1$; utóbbi kiesik.']],
    t3l3: [['Mennyi $\\log_3 81$?', '4', '$3^4=81$'], ['Oldd meg: $2^x=64$.', '6', '$64=2^6$']],
    t3l4: [['Az $x^3-7x+6=0$ egyenletnek $x=1$ gyöke. Mennyi a másik két gyök szorzata?', '-6', 'Viète: a három gyök szorzata $-6$, és az egyik gyök 1.'], ['Mennyi $P(1)$, ha $P(x)=x^3-2x^2-5x+6$?', '0', '$1-2-5+6$']],
    t3l5: [['Ha $x+y=10$ és $xy=21$, mennyi $x^2+y^2$?', '58', '$(x+y)^2-2xy$'], ['Ha $x-y=2$ és $x+y=8$, mennyi $x$?', '5', 'Add össze a két egyenletet.']],
    t3l6: [['Mennyi az $x+\\frac{16}x$ legkisebb értéke $x>0$ esetén?', '8', '$2\\sqrt{16}$'], ['Mennyi a 4 és a 9 mértani közepe?', '6', '$\\sqrt{4\\cdot9}$']],
    t4l1: [['Hány zérushelye van az $f(x)=x^2-4x+3$ függvénynek?', '2', '$D=16-12>0$'], ['Mennyi az $f(x)=|x|-3$ legkisebb értéke?', '-3', '$|x|\\ge0$']],
    t4l2: [['Számtani sorozat: $a_1=2,\\ d=5$. Mennyi $a_{10}$?', '47', '$2+9\\cdot5$'], ['Mennyi $1+2+4+\\dots+2^9$ (10 tag)?', '1023', '$S=\\frac{2^{10}-1}{2-1}$']],
    t4l3: [['Az $f(x)=\\frac x2+1$ függvény inverzének értéke $x=5$-nél?', '8', '$f^{-1}(x)=2(x-1)$'], ['Mennyi $\\log_28+\\log_24$?', '5', '$3+2$']],
    t4l4: [['$a_1=3,\\ a_{n+1}=a_n+4$. Mennyi $a_4$?', '15', '3, 7, 11, 15'], ['Mennyi $\\lim_{n\\to\\infty}\\frac{5n+1}n$?', '5', '$5+\\frac1n$']],
    t5l1: [['Mennyi $\\sin45^\\circ\\cdot\\cos45^\\circ$? (törtként vagy tizedesként)', '1/2', '$\\frac{\\sqrt2}2\\cdot\\frac{\\sqrt2}2$'], ['Mennyi $\\sin^217^\\circ+\\cos^217^\\circ$?', '1', 'Alapazonosság.']],
    t5l2: [['Egy háromszögben $a=6,\\ b=8,\\ \\gamma=90^\\circ$. Mennyi $c$?', '10', '$\\cos90^\\circ=0$, Pitagorasz.'], ['Egy háromszögben $a=6,\\ b=10,\\ \\gamma=30^\\circ$. Mennyi a területe?', '15', '$\\frac12\\cdot6\\cdot10\\cdot\\frac12$']],
    t5l3: [['Oldd meg a $[0;2\\pi)$ intervallumon: $\\sin x=1$. ($x=?$)', 'π/2|pi/2', 'Egységkör: hol a legmagasabb pont?'], ['Hány megoldása van a $\\cos x=0$ egyenletnek a $[0;2\\pi)$ intervallumon?', '2', '$\\frac\\pi2$ és $\\frac{3\\pi}2$']],
    t5l4: [['Mennyi $\\sin2x$, ha $\\sin x=0{,}6$ és $\\cos x=0{,}8$?', '0.96', '$2\\sin x\\cos x$'], ['Mennyi az $y=2\\sin3x$ függvény periódusa? (pl. 2π/5)', '2π/3|2pi/3', '$\\frac{2\\pi}{b}$']],
    t5l5: [['20 m távolságból egy torony csúcsa $45^\\circ$ alatt látszik. Milyen magas (m)?', '20', '$\\tan45^\\circ=1$']],
    t6l1: [['Egy háromszög oldalai 5, 12, 13. Mekkora a területe?', '30', 'Derékszögű háromszög!'], ['Két hasonló idom hasonlóságának aránya 2. Mennyi a területek aránya?', '4', 'Az arány négyzete.']],
    t6l2: [['$\\vec a=(2;3),\\ \\vec b=(4;-1)$. Mennyi $\\vec a\\cdot\\vec b$?', '5', '$8-3$'], ['Mennyi a $(6;8)$ vektor hossza?', '10', '$\\sqrt{36+64}$']],
    t6l3: [['Mekkora a $(x-1)^2+(y+2)^2=16$ kör sugara?', '4', '$r^2=16$'], ['Mennyi az $y=(x-2)^2+5$ parabola csúcsának $y$-koordinátája?', '5', 'Csúcs: $(p;q)$.']],
    t6l4: [['Az $A(1;2),\\ B(5;2),\\ C(3;8)$ háromszög súlypontjának $y$-koordinátája?', '4', '$\\frac{2+2+8}3$'], ['A $(3;-5)$ pont tükörképe az origóra: mi az $x$-koordináta?', '-3', 'Mindkét koordináta előjele megfordul.']],
    t6l5: [['Hány közös pontja van az $x^2+y^2=9$ körnek és az $x=5$ egyenesnek?', '0', 'A kör csak $-3\\le x\\le3$ között van.'], ['Hány közös pontja van az $x^2+y^2=9$ körnek és az $y=3$ egyenesnek?', '1', 'Érintő!']],
    t6l6: [['Mekkora az $O(0;0),\\ A(6;0),\\ B(0;4)$ háromszög területe?', '12', '$\\frac12\\cdot6\\cdot4$'], ['Mekkora az $A(0;0),\\ B(4;0),\\ C(1;3)$ háromszög területe?', '6', 'Alap 4, magasság 3.']],
    t7l1: [['Egy kocka éle 3. Mekkora a felszíne?', '54', '$6a^2$'], ['Henger: $r=2,\\ m=5$. Mennyi $V/\\pi$?', '20', '$r^2m$']],
    t7l2: [['Egy kocka éle 6. Mennyi a testátló négyzete?', '108', '$(a\\sqrt3)^2=3a^2$'], ['Egy gömb sugara 5. Mennyi a felszín/$\\pi$ értéke?', '100', '$4r^2$']],
    t7l3: [['Csonkakúp: $R=4,\\ r=1,\\ m=3$. Mennyi $V/\\pi$?', '21', '$\\frac m3(R^2+Rr+r^2)$'], ['Egy gömb sugara 6. Mennyi $V/\\pi$?', '288', '$\\frac43\\cdot216$']],
    t7l4: [['Egy kocka éle 5. Mennyi a lapátló négyzete?', '50', '$(a\\sqrt2)^2$'], ['Egy egyenes $45^\\circ$-os szöget zár be az alappal, vetülete 7 hosszú. Milyen magas a végpontja?', '7', '$7\\tan45^\\circ$']],
    t8l1: [['Mennyi $\\lim_{x\\to2}\\frac{x^2-4}{x-2}$?', '4', '$x+2$'], ['Mennyi $\\lim_{n\\to\\infty}\\frac{2n^2+3}{n^2+1}$?', '2', 'Oszd $n^2$-tel.']],
    t8l2: [['Mennyi az $x^4$ deriváltja az $x=1$ helyen?', '4', '$4x^3$'], ['Mennyi az $e^{2x}$ deriváltja az $x=0$ helyen?', '2', 'Láncszabály: $2e^{2x}$.']],
    t8l3: [['Hol van az $x^2-6x+5$ függvény minimuma? ($x=?$)', '3', '$f\'=2x-6$'], ['Ha $f\'(x)=(x-2)(x+1)$, akkor az $x=-1$ helyen helyi maximum vagy minimum van? (max/min)', 'max|maximum', 'Balra pozitív, jobbra negatív a derivált.']],
    t8l4: [['Mennyi $\\int_0^32x\\,dx$?', '9', '$[x^2]_0^3$'], ['Mennyi $\\int_1^23x^2\\,dx$?', '7', '$[x^3]_1^2$']],
    t8l5: [['Mekkora az $f(x)=x^2$ érintőjének meredeksége $x=3$-nál?', '6', '$f\'(3)$'], ['Mennyi $f\'\'(2)$, ha $f(x)=x^3-3x$?', '12', '$f\'\'=6x$']],
    t8l6: [['Egy téglalap kerülete 40 cm. Mekkora lehet a legnagyobb területe (cm²)?', '100', 'A négyzet a legjobb.'], ['Mennyi az $x(12-x)$ kifejezés maximuma?', '36', 'A maximum $x=6$-nál van.']],
    t8l7: [['Mennyi $\\int_0^1e^x\\,dx$? (két tizedesre; $e\\approx2{,}718$)', '1.72', '$e-1$', '0.006'], ['Mennyi $\\int_0^2(x+1)\\,dx$?', '4', '$[\\frac{x^2}2+x]_0^2$']],
    t9l1: [['Egy dobozban 3 piros és 2 kék golyó van. Mennyi a valószínűsége, hogy pirosat húzol? (törtként vagy tizedesként)', '3/5', 'Kedvező/összes.'], ['Két érmét dobunk fel. Mennyi annak a valószínűsége, hogy mindkettő fej? (törtként)', '1/4', 'Független események.']],
    t9l2: [['$n=10,\\ p=0{,}5$. Mennyi a várható érték?', '5', '$np$'], ['$n=3,\\ p=\\frac12$. Mennyi $P(X=0)$? (törtként)', '1/8', '$\\left(\\frac12\\right)^3$']],
    t9l3: [['Az 1, 2, 3, 4, 5 adatok szórásnégyzete?', '2', 'Az átlag 3; az eltérések négyzete 4+1+0+1+4=10; osztva 5-tel.'], ['Mennyi a 3, 9, 1, 7, 5 adatok mediánja?', '5', 'Rendezd növekvő sorba!']],
    t9l4: [['Egy dobás nyereménye a dobott szám (Ft). Mennyi a várható nyeremény?', '3.5', '$\\frac{1+\\dots+6}6$'], ['Egy 10 cm hosszú szakaszon véletlenszerűen választunk pontot. Mennyi annak a valószínűsége, hogy a 3 cm hosszú első részbe esik? (törtként)', '3/10|0.3', 'Hosszak aránya.']],
    t9l5: [['Egy urnában 4 piros és 6 kék golyó van. Visszatevés nélkül húzunk kettőt. Mennyi annak a valószínűsége, hogy mindkettő piros? (törtként)', '2/15', '$\\frac4{10}\\cdot\\frac39$'], ['Mennyi a 4, 4, 4, 4 adatsor szórása?', '0', 'Minden adat egyenlő az átlaggal.']]
  };

  let id = 0;
  window.TOPICS.flatMap(t => t.lessons).forEach(l => {
    if (WIDGETS[l.id]) l.steps.push(widgetStep(WIDGETS[l.id]));
    const items = P[l.id];
    if (items) l.steps.push({
      h: 'Próbáld ki!',
      html: '<p>Oldd meg a kérdéseket; ha elakadsz, a „Segíts” gomb segít.</p>' + items.map((it, k) =>
        `<div class="ix" data-id="${l.id}-${k}" data-a="${esc(it[1])}" data-hint="${esc(it[2] || '')}"${it[3] ? ` data-tol="${it[3]}"` : ''}>${it[0]}</div>`).join('')
    });
  });
})();
