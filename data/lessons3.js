/* Bővítés: új leckék és további kidolgozott példák a meglévő leckékhez */
(function () {
const R = String.raw;
const T = id => window.TOPICS.find(t => t.id === id);
const L = id => window.TOPICS.flatMap(t => t.lessons).find(l => l.id === id);
const more = (id, html) => L(id).steps.push({ h: 'További kidolgozott példák', html });

/* ---------- További példák a meglévő leckékhez ---------- */
more('t1l1', R`<div class="box"><b>Három halmaz.</b> 100 diák: 60 tanul angolt, 50 németet, 30 franciát; angolt és németet 20, angolt és franciát 15, németet és franciát 10, mindhármat 5-en.<br>
$|E\cup N\cup F|=60+50+30-20-15-10+5=100$. Mindenki tanul legalább egy nyelvet.</div>
<div class="box"><b>Tagadás.</b> „Minden páros szám osztható 4-gyel.” Tagadása: „Van olyan páros szám, amely nem osztható 4-gyel.” (pl. 6) Ez az állítás igaz, tehát az eredeti hamis.</div>`);
more('t1l2', R`<div class="box"><b>1. példa.</b> Az 0, 1, 2, 3, 4 számjegyekből hány ötjegyű szám készíthető, ha minden számjegyet pontosan egyszer használunk?<br>
Az első számjegy nem lehet 0: $4\cdot4\cdot3\cdot2\cdot1=96$.</div>
<div class="box"><b>2. példa.</b> Ezek közül hány páros? Ha az utolsó számjegy 0: $4!=24$. Ha 2 vagy 4: az első nem lehet 0, így $3\cdot3\cdot2\cdot1=18$, ez kétféle számjegyre $2\cdot18=36$. Összesen $24+36=60$.</div>
<div class="box"><b>3. példa.</b> 5 fiú és 4 lány váltakozva ül egy padon. Fiú–lány–…–fiú: $5!\cdot4!=2880$ féleképp.</div>`);
more('t2l1', R`<div class="box"><b>Autóbuszok.</b> Három járat 12, 18 és 20 percenként indul, 6:00-kor egyszerre indulnak. Mikor indulnak legközelebb együtt?<br>
$12=2^2\cdot3$, $18=2\cdot3^2$, $20=2^2\cdot5$ → lkkt $=2^2\cdot3^2\cdot5=180$ perc, azaz 9:00-kor.</div>
<div class="box"><b>Euklideszi algoritmus.</b> lnko(252;198): $252=1\cdot198+54$; $198=3\cdot54+36$; $54=1\cdot36+18$; $36=2\cdot18$. Az utolsó nem nulla maradék: 18.</div>`);
more('t3l1', R`<div class="box"><b>Viète-formulával.</b> Az $x^2-7x+k=0$ egyenlet gyökeinek különbsége 3. Mekkora $k$?<br>
$x_1+x_2=7$, $x_1-x_2=3$ → $x_1=5$, $x_2=2$, $k=x_1x_2=10$.</div>
<div class="box"><b>Paraméteres feladat.</b> Mely $m$ esetén van az $x^2-2mx+m+2=0$ egyenletnek két különböző valós gyöke?<br>
$D=4m^2-4(m+2)>0\iff m^2-m-2>0\iff(m-2)(m+1)>0$, tehát $m<-1$ vagy $m>2$.</div>`);
more('t3l3', R`<div class="box"><b>1.</b> $3^{x+1}=27^{x-1}$: $3^{x+1}=3^{3x-3}\Rightarrow x+1=3x-3\Rightarrow x=2$.</div>
<div class="box"><b>2.</b> $\lg x+\lg(x+3)=1$, $x>0$: $x(x+3)=10$, $x^2+3x-10=0$, $x=2$ vagy $x=-5$ (kiesik). $x=2$.</div>
<div class="box"><b>3. Egyenlőtlenségek.</b> $2^x>8\iff x>3$ (az $a>1$ alapú exponenciális szigorúan nő). $\log_2(x-1)<3$: $x>1$ és $x-1<8$, tehát $1<x<9$.<br><b>Vigyázat:</b> $0<a<1$ alapnál a reláció iránya megfordul!</div>`);
more('t4l2', R`<div class="box"><b>1.</b> Számtani sorozatban $a_3=7$, $a_8=22$. $a_8-a_3=5d=15$, $d=3$, $a_1=7-2\cdot3=1$. $a_{10}=28$, $S_{10}=\dfrac{10(1+28)}2=145$.</div>
<div class="box"><b>2. Végtelen mértani sor.</b> $8+4+2+1+\dots$: $q=\frac12$, $S=\dfrac{8}{1-\frac12}=16$.</div>
<div class="box"><b>3. Népesség.</b> Egy város lakossága évente 2%-kal nő, most 1 000 000 fő. Mikor éri el az 1,5 milliót?<br>$1{,}02^n=1{,}5\Rightarrow n=\dfrac{\lg1{,}5}{\lg1{,}02}\approx20{,}5$, tehát 21 év múlva.</div>`);
more('t5l1', R`<div class="box"><b>Kiszámítás egy adatból.</b> Ha $\sin x=\frac35$ és $x$ hegyesszög, akkor $\cos x=\sqrt{1-\frac9{25}}=\frac45$, $\tan x=\frac34$, $\sin2x=2\cdot\frac35\cdot\frac45=\frac{24}{25}$, $\cos2x=\frac{16}{25}-\frac9{25}=\frac7{25}$.</div>`);
more('t6l2', R`<div class="box"><b>Szög két vektor között.</b> $\vec a=(1;2),\ \vec b=(3;-1)$: $\vec a\cdot\vec b=3-2=1$, $|\vec a|=\sqrt5$, $|\vec b|=\sqrt{10}$, $\cos\varphi=\dfrac1{\sqrt{50}}\approx0{,}1414$, $\varphi\approx81{,}9^\circ$.</div>
<div class="box"><b>Háromszög szöge.</b> $A(1;1),\ B(5;3),\ C(3;7)$: $\vec{AB}=(4;2)$, $\vec{AC}=(2;6)$. $\cos\alpha=\dfrac{8+12}{\sqrt{20}\sqrt{40}}=\dfrac{20}{\sqrt{800}}=\dfrac{\sqrt2}2$, tehát $\alpha=45^\circ$.</div>`);
more('t6l3', R`<div class="box"><b>Kör egyenletéből.</b> $x^2+y^2-6x+4y-12=0$. Teljes négyzet: $(x-3)^2+(y+2)^2=12+9+4=25$. Középpont $(3;-2)$, sugár 5.</div>`);
more('t8l2', R`<div class="box"><b>Hányados.</b> $f(x)=\dfrac{x^2+1}{x-1}$: $f'(x)=\dfrac{2x(x-1)-(x^2+1)}{(x-1)^2}=\dfrac{x^2-2x-1}{(x-1)^2}$.</div>
<div class="box"><b>Összetett függvény.</b> $(\sin3x)'=3\cos3x$; $\big((2x+1)^5\big)'=5(2x+1)^4\cdot2=10(2x+1)^4$; $(e^{x^2})'=2x\,e^{x^2}$.</div>`);
more('t8l4', R`<div class="box"><b>1.</b> $\int_0^1(x^2+2x)\,dx=\left[\dfrac{x^3}3+x^2\right]_0^1=\dfrac43$.</div>
<div class="box"><b>2.</b> $\int_1^e\dfrac1x\,dx=[\ln x]_1^e=1$. <b>3.</b> $\int_0^\pi\sin x\,dx=[-\cos x]_0^\pi=2$.</div>`);
more('t9l1', R`<div class="box"><b>Három kocka.</b> Mi a valószínűsége, hogy három kockával dobva az összeg 10? A kedvező esetek száma 27 (az összegek eloszlását összeszámolva), az összes eset $6^3=216$: $P=\dfrac{27}{216}=\dfrac18$.</div>`);
more('t9l2', R`<div class="box"><b>Lövész.</b> Egy lövész találati valószínűsége 0,6. 5 lövésből legalább 4 találat:<br>$\binom54\cdot0{,}6^4\cdot0{,}4+0{,}6^5=0{,}2592+0{,}07776\approx0{,}337$.</div>`);

/* ---------- Új leckék ---------- */
T('t1').lessons.push(
{ id: 't1l4', title: 'Binomiális tétel és Pascal-háromszög', steps: [
  { h: 'A binomiális tétel', html: R`$$(a+b)^n=\sum_{k=0}^n\binom nk a^{n-k}b^k$$
    <p>A binomiális együtthatók a Pascal-háromszög soraiban vannak: 1; 1 1; 1 2 1; 1 3 3 1; 1 4 6 4 1; … Mindegyik szám a fölötte lévő kettő összege: $\binom nk=\binom{n-1}{k-1}+\binom{n-1}k$.</p>
    <div class="box">Egy sor összege $2^n$ (helyettesítsd $a=b=1$-et).</div>` },
  { h: 'Példák', html: R`<div class="box"><b>1.</b> $(2x-1)^4$: együtthatók 1, 4, 6, 4, 1. $16x^4-32x^3+24x^2-8x+1$.</div>
    <div class="box"><b>2.</b> $(x+2)^7$ kifejtésében az $x^3$ együtthatója $\binom73\cdot2^4=35\cdot16=560$.</div>
    <div class="warn">Ha a tagban negatív szám van, az előjelet is hatványozd: $(-1)^k$!</div>` }
], quiz: { q: 'A $(a+b)^5$ kifejtésében mennyi az $a^3b^2$ együtthatója?', opts: ['5', '10', '20'], a: 1, why: '$\\binom52=10$.' } },

{ id: 't1l5', title: 'Bizonyítási módszerek: indirekt, indukció, skatulya', steps: [
  { h: 'Skatulya-elv', html: R`<p>Ha $n$ dolgot $k<n$ dobozba tesznek, lesz olyan doboz, amelyben legalább 2 van. Általánosabban: legalább $\lceil n/k\rceil$.</p>
    <div class="box"><b>Példa.</b> Legalább hány ember között van biztosan kettő, aki ugyanabban a hónapban született? 12 hónap → 13 ember.</div>` },
  { h: 'Indirekt bizonyítás', html: R`<p>Feltesszük az állítás tagadását, és ellentmondásra jutunk.</p>
    <div class="box"><b>$\sqrt2$ irracionális.</b> Tegyük fel, hogy $\sqrt2=\frac pq$ (törtet tovább nem egyszerűsíthető). Akkor $p^2=2q^2$, ezért $p$ páros, $p=2r$. Így $4r^2=2q^2$, $q^2=2r^2$, tehát $q$ is páros – ellentmond annak, hogy a tört nem egyszerűsíthető. ∎</div>` },
  { h: 'Teljes indukció', html: R`<p>Lépések: (1) alapeset ($n=1$), (2) indukciós feltevés: $n=k$-ra igaz, (3) bizonyítjuk $n=k+1$-re.</p>
    <div class="box"><b>Állítás:</b> $1+2+\dots+n=\dfrac{n(n+1)}2$.<br>(1) $n=1$: $1=\frac{1\cdot2}2$. ✓<br>(2) Tegyük fel, hogy igaz $n=k$-ra.<br>(3) $1+\dots+k+(k+1)=\dfrac{k(k+1)}2+(k+1)=\dfrac{(k+1)(k+2)}2$. ∎</div>` }
], quiz: { q: 'Az indukciós bizonyítás első lépése:', opts: ['A $k+1$ eset bizonyítása', 'Az alapeset ellenőrzése (pl. $n=1$)', 'Ellentmondásra jutás'], a: 1, why: 'Előbb az alapesetet ellenőrizzük.' } },

{ id: 't1l6', title: 'Gráfok: feladatok', steps: [
  { h: 'Színezés és fák', html: R`<p>Egy gráf csúcsainak színezése <b>szabályos</b>, ha szomszédos csúcsok színe különböző. A szükséges színek minimális száma a kromatikus szám. Páratlan kör 3 színt igényel, páros kör 2-t, az $n$ csúcsú teljes gráf $n$-et.</p>
    <div class="box">Az $n$ csúcsú fának $n-1$ éle van, van legalább két 1 fokú csúcsa (levél). Két csúcs között fában pontosan egy út van.</div>` },
  { h: 'Példa', html: R`<div class="box">12 csúcsú fának 11 éle van. Ha a fához hozzáveszünk egy új élt, pontosan egy kör keletkezik.</div>
    <div class="box"><b>Kézfogás.</b> Egy 8 fős társaságban mindenki pontosan 3 másikkal fogott kezet. Hány kézfogás történt? $\dfrac{8\cdot3}2=12$.</div>` }
], quiz: { q: 'Hány színnel színezhető szabályosan egy 5 csúcsú kör (5-szög)?', opts: ['2', '3', '5'], a: 1, why: 'Páratlan körhöz 3 szín kell.' } }
);

T('t2').lessons.push(
{ id: 't2l3', title: 'Diofantoszi egyenletek', steps: [
  { h: 'Lineáris diofantoszi egyenlet', html: R`<p>Egész megoldásokat keresünk: $ax+by=c$. Van megoldás, ha $\text{lnko}(a,b)\mid c$.</p>
    <div class="box"><b>Példa.</b> $3x+5y=41$, $x,y$ pozitív egészek. $x=\dfrac{41-5y}3$. Az 5$y$ maradéka 3-mal osztva legyen egyenlő a 41 maradékával (2): $y=1,4,7$ jó.<br>$y=1\Rightarrow x=12$; $y=4\Rightarrow x=7$; $y=7\Rightarrow x=2$.<br>Megoldások: $(12;1),(7;4),(2;7)$.</div>` },
  { h: 'Számolás korlátokkal', html: R`<p>Ha $x,y>0$, akkor $y<\frac{41}5$, így csak $y=1,\dots,8$ jöhet szóba – gyors kipróbálás.</p>` }
], quiz: { q: 'Van-e egész megoldása a $4x+6y=9$ egyenletnek?', opts: ['Van', 'Nincs, mert lnko(4,6)=2 nem osztja 9-et', 'Csak negatív'], a: 1, why: 'A bal oldal mindig páros, a jobb páratlan.' } },

{ id: 't2l4', title: 'Kongruenciák és maradékok', steps: [
  { h: 'Számolás maradékokkal', html: R`<p>$a\equiv b\pmod m$, ha $m\mid a-b$. Összeadhatók, szorozhatók: ha $a\equiv b$, $c\equiv d$, akkor $a+c\equiv b+d$ és $ac\equiv bd$.</p>
    <div class="box"><b>Példa.</b> $3^{100}$ maradéka 7-tel osztva. $3^6=729=7\cdot104+1\equiv1$. $100=6\cdot16+4$, $3^{100}\equiv3^4=81\equiv4\pmod7$.</div>` },
  { h: 'Négyzetszámok maradéka', html: R`<p>Egy négyzetszám 4-gyel osztva 0 vagy 1 maradékot ad: $n=2k\Rightarrow n^2=4k^2$; $n=2k+1\Rightarrow n^2=4k^2+4k+1$. Ezért $x^2+y^2=4k+3$ alakú szám soha nem előáll.</p>
    <div class="box"><b>Bizonyítás:</b> $n^3-n=(n-1)n(n+1)$ három szomszéd szorzata, osztható 6-tal.</div>` }
], quiz: { q: 'Mennyi a $2^{10}$ maradéka 3-mal osztva?', opts: ['0', '1', '2'], a: 1, why: '$2^2=4\\equiv1$, $2^{10}=(2^2)^5\\equiv1$.' } }
);

T('t3').lessons.push(
{ id: 't3l4', title: 'Polinomok és harmadfokú egyenletek', steps: [
  { h: 'Gyöktényező, Horner', html: R`<p>Ha $P(a)=0$, akkor $P(x)=(x-a)Q(x)$. Egész együtthatós, főegyütthatója 1 polinom egész gyökei osztói a konstans tagnak.</p>
    <div class="box"><b>Példa.</b> $x^3-6x^2+11x-6=0$. Osztók: $\pm1,\pm2,\pm3,\pm6$. $x=1$ gyök: $1-6+11-6=0$. Osztunk $(x-1)$-gyel: $x^2-5x+6$, ennek gyökei 2 és 3.<br>Megoldások: 1, 2, 3.</div>` },
  { h: 'Horner-elrendezés', html: R`<p>1 | 1, −6, 11, −6 → 1, −5, 6, 0. A sor a hányados együtthatói és a maradék: $x^2-5x+6$, maradék 0.</p>
    <p>Viète: $x_1+x_2+x_3=6$, $x_1x_2+x_1x_3+x_2x_3=11$, $x_1x_2x_3=6$ ✓.</p>` }
], quiz: { q: 'Az $x^3-x=0$ egyenlet gyökei:', opts: ['0', '−1, 0, 1', '1'], a: 1, why: '$x(x-1)(x+1)=0$.' } },

{ id: 't3l5', title: 'Egyenletrendszerek', steps: [
  { h: 'Behelyettesítés és Viète', html: R`<p><b>Példa.</b> $x+y=5$, $xy=6$. Ekkor $x$ és $y$ az $t^2-5t+6=0$ gyökei: $(2;3)$ és $(3;2)$. Közben $x^2+y^2=(x+y)^2-2xy=25-12=13$.</p>` },
  { h: 'Egyik ismeretlen kifejezése', html: R`<p>$\begin{cases}x^2+y^2=25\\x+y=7\end{cases}$: $y=7-x$: $x^2+49-14x+x^2=25\Rightarrow x^2-7x+12=0\Rightarrow x=3$ vagy $4$. Megoldások: $(3;4)$ és $(4;3)$.</p>` }
], quiz: { q: 'Ha $x+y=6$ és $xy=8$, mennyi $x^2+y^2$?', opts: ['20', '36', '52'], a: 0, why: '$36-16=20$.' } },

{ id: 't3l6', title: 'Számtani és mértani közép', steps: [
  { h: 'A közepek egyenlőtlensége', html: R`<p>Pozitív $a,b$ esetén: $$\frac{a+b}2\ge\sqrt{ab}$$ egyenlőség csak $a=b$ esetén.</p>
    <div class="box"><b>Példa.</b> $x>0$: $x+\dfrac9x\ge2\sqrt{x\cdot\frac9x}=6$, egyenlőség $x=3$-nál. A minimum 6.</div>` },
  { h: 'Szélsőérték-feladat', html: R`<p>Adott kerületű téglalapok közül a négyzetnek a legnagyobb a területe: $a+b=k\Rightarrow ab\le\left(\frac k2\right)^2$.</p>` }
], quiz: { q: 'Mennyi $x+\\frac4x$ legkisebb értéke $x>0$ esetén?', opts: ['2', '4', '8'], a: 1, why: '$2\\sqrt4=4$, $x=2$-nél.' } }
);

T('t4').lessons.push(
{ id: 't4l3', title: 'Elemi függvények, inverz és összetett függvény', steps: [
  { h: 'Az elemi függvények', html: R`<table class="f"><tr><th>Függvény</th><th>Tulajdonságok</th></tr>
    <tr><td>$\sqrt x$</td><td>$x\ge0$, $y\ge0$, szigorúan nő</td></tr>
    <tr><td>$\dfrac1x$</td><td>$x\ne0$, páratlan, két ágban csökken</td></tr>
    <tr><td>$a^x$</td><td>$y>0$; $a>1$ nő, $0<a<1$ csökken; $(0;1)$-en át</td></tr>
    <tr><td>$\log_ax$</td><td>$x>0$; az $a^x$ inverze; $(1;0)$-n át</td></tr>
    <tr><td>$|x|$</td><td>páros, $y\ge0$</td></tr></table>` },
  { h: 'Inverz és összetett függvény', html: R`<p>Az inverzet kapjuk, ha $x$-et és $y$-t felcseréljük és $y$-ra rendezünk. Grafikonja az $y=x$ egyenesre tükrös.</p>
    <div class="box"><b>Példa.</b> $f(x)=2x+3$: $x=2y+3\Rightarrow f^{-1}(x)=\dfrac{x-3}2$. $f(x)=x^2\ (x\ge0)$: $f^{-1}(x)=\sqrt x$.</div>
    <p>Összetett: $(f\circ g)(x)=f(g(x))$. Ha $f(x)=x^2,\ g(x)=x+1$: $f(g(2))=9$, $g(f(2))=5$ – a sorrend számít!</p>` }
], quiz: { q: 'Mi az $f(x)=3x-6$ függvény inverze?', opts: ['$\\frac{x+6}3$', '$\\frac{x-6}3$', '$3x+6$'], a: 0, why: '$x=3y-6\\Rightarrow y=\\frac{x+6}3$.' } },

{ id: 't4l4', title: 'Rekurzív sorozatok és határérték', steps: [
  { h: 'Rekurzió', html: R`<p>Példa: $a_1=1,\ a_{n+1}=2a_n+1$. Tagok: 1, 3, 7, 15, 31, … Sejtés: $a_n=2^n-1$.</p>
    <div class="box"><b>Bizonyítás indukcióval.</b> $n=1$: $2^1-1=1$. ✓ Ha $a_k=2^k-1$, akkor $a_{k+1}=2(2^k-1)+1=2^{k+1}-1$. ∎</div>` },
  { h: 'Sorozat határértéke', html: R`<p>$\lim_{n\to\infty}\dfrac{3n^2+1}{n^2-5}=3$; $\lim\dfrac1n=0$; $\lim q^n=0$, ha $|q|<1$; $\lim\left(1+\dfrac1n\right)^n=e\approx2{,}718$.</p>
    <p>Monoton és korlátos sorozat konvergens.</p>` }
], quiz: { q: '$\\lim_{n\\to\\infty}\\left(\\frac12\\right)^n$ értéke:', opts: ['0', '$\\frac12$', '$\\infty$'], a: 0, why: '$|q|<1$, tehát 0-hoz tart.' } }
);

T('t5').lessons.push(
{ id: 't5l4', title: 'Addíciós tételek és trigonometrikus függvények', steps: [
  { h: 'Addíciós tételek', html: R`<div class="box">$\sin(\alpha\pm\beta)=\sin\alpha\cos\beta\pm\cos\alpha\sin\beta$<br>$\cos(\alpha\pm\beta)=\cos\alpha\cos\beta\mp\sin\alpha\sin\beta$</div>
    <p><b>Példa.</b> $\sin75^\circ=\sin(45^\circ+30^\circ)=\frac{\sqrt2}2\cdot\frac{\sqrt3}2+\frac{\sqrt2}2\cdot\frac12=\dfrac{\sqrt6+\sqrt2}4\approx0{,}966$.</p>` },
  { h: 'Függvények ábrázolása', html: R`<p>$y=A\sin(bx+c)+d$: amplitúdó $|A|$, periódus $\frac{2\pi}{|b|}$, függőleges eltolás $d$.</p>
    <div class="box"><b>Példa.</b> $y=3\sin2x+1$: periódus $\pi$, értékkészlet $[-2;4]$.</div>` },
  { h: 'Egyenlet szorzattá alakítással', html: R`<p>$\sin2x=\cos x$, $x\in[0;2\pi)$: $2\sin x\cos x-\cos x=0\Rightarrow\cos x(2\sin x-1)=0$. $\cos x=0$: $\frac\pi2,\frac{3\pi}2$; $\sin x=\frac12$: $\frac\pi6,\frac{5\pi}6$. Összesen 4 megoldás.</p>
    <div class="warn">Ne oszd el $\cos x$-szel – elvesztenéd a $\cos x=0$ megoldásokat!</div>` }
], quiz: { q: 'Mennyi $\\sin2x$, ha $\\sin x=\\frac35,\\ \\cos x=\\frac45$?', opts: ['$\\frac{24}{25}$', '$\\frac{12}{25}$', '$\\frac{7}{25}$'], a: 0, why: '$2\\cdot\\frac35\\cdot\\frac45=\\frac{24}{25}$.' } },

{ id: 't5l5', title: 'Trigonometria a gyakorlatban', steps: [
  { h: 'Magasságmérés', html: R`<p><b>Egy szögből:</b> $h=d\tan\alpha$. Pl. 50 m távolságból a torony csúcsa $30^\circ$ szög alatt látszik: $h=50\tan30^\circ\approx28{,}9$ m.</p>` },
  { h: 'Két szögből (nem közelíthető torony)', html: R`<p>Az $A$ pontból $40^\circ$, a 20 m-rel közelebbi $B$ pontból $55^\circ$ alatt látszik a torony teteje. Legyen $d$ az $A$ távolsága a talppontól.</p>
    <p>$h=d\tan40^\circ=(d-20)\tan55^\circ\Rightarrow d=\dfrac{20\tan55^\circ}{\tan55^\circ-\tan40^\circ}\approx48{,}5$ m, így $h\approx48{,}5\cdot0{,}839\approx40{,}7$ m.</p>` }
], quiz: { q: '30 m távolságból 45°-os szög alatt látszik egy fa teteje. Milyen magas a fa (a szemmagasságot elhanyagolva)?', opts: ['15 m', '30 m', '$30\\sqrt2$ m'], a: 1, why: '$30\\tan45^\\circ=30$.' } }
);

T('t6').lessons.push(
{ id: 't6l4', title: 'Nevezetes pontok és transzformációk', steps: [
  { h: 'Nevezetes pontok', html: R`<table class="f"><tr><th>Pont</th><th>Honnan</th></tr>
    <tr><td>Súlypont</td><td>súlyvonalak metszéspontja, harmadolja a súlyvonalat</td></tr>
    <tr><td>Magasságpont</td><td>magasságvonalak metszéspontja</td></tr>
    <tr><td>Körülírt kör középpontja</td><td>oldalfelező merőlegesek metszéspontja</td></tr>
    <tr><td>Beírt kör középpontja</td><td>szögfelezők metszéspontja</td></tr></table>
    <div class="box">Súlypont koordinátái: $S\left(\dfrac{x_A+x_B+x_C}3;\dfrac{y_A+y_B+y_C}3\right)$. Pl. $A(0;0),B(6;0),C(0;9)$: $S=(2;3)$.</div>` },
  { h: 'Transzformációk', html: R`<p>Eltolás, tengelyes tükrözés, pontra tükrözés, forgatás: távolságtartók (egybevágóság). Középpontos hasonlóság: aránytartó, $\lambda$ arányú nagyítás.</p>
    <div class="box">Pontra tükrözés a $P(p;q)$ pontra: $(x;y)\mapsto(2p-x;2q-y)$. Tükrözés az $y$ tengelyre: $(x;y)\mapsto(-x;y)$.</div>` }
], quiz: { q: 'A háromszög súlypontja a súlyvonalat a csúcstól számítva milyen arányban osztja?', opts: ['1:1', '2:1', '3:1'], a: 1, why: 'A csúcstól számítva 2:1.' } },

{ id: 't6l5', title: 'Koordinátageometria: kör és egyenes', steps: [
  { h: 'Kölcsönös helyzet', html: R`<p>Az egyenes és a kör közös pontjait a két egyenlet közös megoldása adja. Másodfokú egyenletet kapunk: $D>0$ két metszéspont, $D=0$ érintő, $D<0$ nem metszik.</p>
    <p>Középpont–egyenes távolság: $d=\dfrac{|Ax_0+By_0-C|}{\sqrt{A^2+B^2}}$; $d<r$ metszi, $d=r$ érinti.</p>` },
  { h: 'Példa', html: R`<div class="box"><b>$x^2+y^2=25$ és $y=x+1$.</b> $x^2+(x+1)^2=25\Rightarrow x^2+x-12=0\Rightarrow x=3$ vagy $-4$. Metszéspontok: $(3;4)$ és $(-4;-3)$.<br>Húr hossza: $\sqrt{7^2+7^2}=7\sqrt2\approx9{,}9$.</div>
    <p>Két kör helyzete: a középpontok távolsága $d$; $d>r_1+r_2$ nincs közös pont, $d=r_1+r_2$ kívülről érintik, $|r_1-r_2|<d<r_1+r_2$ két metszéspont, $d=|r_1-r_2|$ belülről érintik.</p>` }
], quiz: { q: 'Az $x^2+y^2=4$ kör és az $y=3$ egyenes közös pontjainak száma:', opts: ['0', '1', '2'], a: 0, why: 'A középpont–egyenes távolság 3 > 2 = $r$.' } },

{ id: 't6l6', title: 'Háromszög területe koordinátákból', steps: [
  { h: 'Képlet', html: R`<p>$A(x_1;y_1),\ B(x_2;y_2),\ C(x_3;y_3)$ háromszög területe: $$T=\frac12\left|(x_2-x_1)(y_3-y_1)-(x_3-x_1)(y_2-y_1)\right|.$$</p>
    <div class="box"><b>Példa.</b> $A(1;1),B(5;2),C(3;6)$: $\vec{AB}=(4;1),\ \vec{AC}=(2;5)$, $T=\frac12|20-2|=9$.</div>` },
  { h: 'Egyenlőszárú háromszög', html: R`<div class="box"><b>Példa.</b> $A(-2;0),B(4;0),C(1;6)$: $AC=\sqrt{9+36}=\sqrt{45}=BC$, tehát egyenlőszárú. Alap: 6, magasság: 6, $T=\frac12\cdot6\cdot6=18$.</div>` }
], quiz: { q: 'Mekkora az $O(0;0),\\ A(4;0),\\ B(0;3)$ háromszög területe?', opts: ['6', '12', '7'], a: 0, why: '$\\frac12\\cdot4\\cdot3=6$.' } }
);

T('t7').lessons.push(
{ id: 't7l3', title: 'Csonkakúp és összetett testek', steps: [
  { h: 'Csonkakúp', html: R`<p>Sugarai $R,r$, magassága $m$: $$V=\frac{\pi m}3(R^2+Rr+r^2).$$</p>
    <div class="box"><b>Példa.</b> $R=5,\ r=2,\ m=6$: $V=\dfrac{6\pi}3(25+10+4)=78\pi$.</div>` },
  { h: 'Gömbbe írt henger', html: R`<div class="box"><b>Példa.</b> $R=5$ sugarú gömbbe 3 sugarú hengert írunk (a henger köralapjai a gömbön vannak). A henger fele magassága $\sqrt{25-9}=4$, tehát $m=8$. $V_{henger}=\pi\cdot9\cdot8=72\pi$. A gömb térfogata $\dfrac{500\pi}3$; a henger a gömb $\dfrac{72\cdot3}{500}=43{,}2\%$-a.</div>` },
  { h: 'Vízbe merülő test', html: R`<div class="box"><b>Példa.</b> 4 cm sugarú, 10 cm magas hengeres edényben 5 cm magasan áll a víz. Belemerítünk egy 3 cm sugarú gömböt (teljesen elmerül). $V_{gömb}=36\pi$; a vízszint emelkedése $\dfrac{36\pi}{16\pi}=2{,}25$ cm.</div>` }
], quiz: { q: 'Melyik képlet szerint számoljuk a csonkakúp térfogatát?', opts: ['$\\frac{\\pi m}3(R^2+Rr+r^2)$', '$\\pi m(R+r)$', '$\\frac13\\pi R^2m$'], a: 0, why: 'Ez a csonkakúp térfogatképlete.' } },

{ id: 't7l4', title: 'Térbeli szögek és távolságok', steps: [
  { h: 'Az alapfogalmak', html: R`<p>Egyenes és sík hajlásszöge: az egyenes és merőleges vetülete által bezárt szög. Két sík hajlásszöge: a metszésvonalra merőleges egyenesek szöge.</p>
    <div class="box"><b>Kocka:</b> lapátló $a\sqrt2$, testátló $a\sqrt3$. A testátló és az alaplap hajlásszöge: $\tan\varphi=\dfrac{a}{a\sqrt2}=\dfrac1{\sqrt2}$, $\varphi\approx35{,}3^\circ$.</div>` },
  { h: 'Gúla', html: R`<div class="box"><b>Példa.</b> A szabályos négyzet alapú gúla $a=6$, oldaléle 5, $m=\sqrt7$. Az oldalél és az alap hajlásszöge: $\sin\varphi=\dfrac{\sqrt7}5\Rightarrow\varphi\approx31{,}9^\circ$. Az oldallap és az alap hajlásszöge: $\tan\psi=\dfrac{\sqrt7}3\Rightarrow\psi\approx41{,}4^\circ$.</div>` }
], quiz: { q: 'Mekkora a $2$ cm élű kocka testátlója?', opts: ['$2\\sqrt2$', '$2\\sqrt3$', '$4$'], a: 1, why: '$a\\sqrt3$.' } }
);

T('t8').lessons.push(
{ id: 't8l5', title: 'Érintő, konvexitás, inflexió', steps: [
  { h: 'A derivált definíciója és az érintő', html: R`<p>$f'(a)=\lim_{h\to0}\dfrac{f(a+h)-f(a)}h$; például $f=x^2$: $\dfrac{(a+h)^2-a^2}h=2a+h\to2a$.</p>
    <div class="box"><b>Példa.</b> $y=x^3$ érintője az $x=1$ pontban: $f(1)=1$, $f'(1)=3$, $y-1=3(x-1)\Rightarrow y=3x-2$.</div>` },
  { h: 'Konvex, konkáv', html: R`<p>$f''>0$: konvex ($\cup$ alakú), $f''<0$: konkáv. Inflexiós pont: ahol $f''$ előjelet vált.</p>
    <div class="box"><b>Példa.</b> $f(x)=x^3-3x$: $f'=3x^2-3=3(x-1)(x+1)$; helyi max $x=-1$ ($f=2$), helyi min $x=1$ ($f=-2$). $f''=6x$: inflexió $x=0$-nál ($f(0)=0$); balra konkáv, jobbra konvex.</div>` }
], quiz: { q: 'Ha $f\'\'(x)>0$ egy intervallumon, akkor ott $f$:', opts: ['konvex', 'konkáv', 'csökkenő'], a: 0, why: 'Pozitív második derivált: konvex.' } },

{ id: 't8l6', title: 'Optimalizálási feladatok', steps: [
  { h: 'Módszer', html: R`<p>1) Vezess be változót. 2) Fejezd ki a kérdezett mennyiséget egy változóval. 3) Add meg a változó megengedett tartományát. 4) Deriválj, keresd a szélsőértéket. 5) Ellenőrizd (előjel, széleken), válaszolj szöveggel.</p>` },
  { h: 'Nyitott doboz', html: R`<div class="box"><b>Példa.</b> Négyzet alapú, felül nyitott doboz térfogata 32 dm³. Mekkora legyen az alapél, hogy a felszín minimális?<br>$a^2h=32\Rightarrow h=\dfrac{32}{a^2}$. $F(a)=a^2+4ah=a^2+\dfrac{128}a$. $F'(a)=2a-\dfrac{128}{a^2}=0\Rightarrow a^3=64\Rightarrow a=4$, $h=2$. $F(4)=16+32=48$ dm². Minimum, mert $F''=2+\dfrac{256}{a^3}>0$.</div>` },
  { h: 'Téglalap a parabolában', html: R`<div class="box"><b>Példa.</b> Az $y=4-x^2$ parabola és az $x$-tengely közé téglalapot írunk (a szimmetriatengelyre szimmetrikusan). Legnagyobb terület?<br>Oldalak: $2x$ és $4-x^2$, $A(x)=8x-2x^3$, $0<x<2$. $A'=8-6x^2=0\Rightarrow x=\dfrac2{\sqrt3}$. $A=2\cdot\dfrac2{\sqrt3}\cdot\dfrac83=\dfrac{32}{3\sqrt3}=\dfrac{32\sqrt3}9\approx6{,}16$.</div>` }
], quiz: { q: 'Mi a szélsőérték-számítás utolsó lépése?', opts: ['A derivált felírása', 'A szélsőérték ellenőrzése és a szöveges válasz', 'A változó bevezetése'], a: 1, why: 'Mindig ellenőrizni kell, és a kérdésre válaszolni.' } },

{ id: 't8l7', title: 'Integrálás: területek és forgástestek', steps: [
  { h: 'Lineáris helyettesítés', html: R`<p>$\int f(ax+b)\,dx=\dfrac1aF(ax+b)+C$.</p>
    <div class="box">$\int(2x+1)^3dx=\dfrac{(2x+1)^4}8+C$; $\int e^{2x}dx=\dfrac{e^{2x}}2+C$; $\int\cos3x\,dx=\dfrac{\sin3x}3+C$.</div>` },
  { h: 'Terület zérushelyek között', html: R`<p>Ha a függvény előjelet vált, a területet szakaszonként, abszolút értékben kell venni.</p>
    <div class="box"><b>Példa.</b> $y=x^2-4$ és az $x$-tengely által közbezárt terület: zérushelyek $\pm2$, a függvény itt negatív. $T=\left|\int_{-2}^2(x^2-4)dx\right|=\left|\left[\dfrac{x^3}3-4x\right]_{-2}^{2}\right|=\left|-\dfrac{16}3-\dfrac{16}3\right|=\dfrac{32}3$.</div>` },
  { h: 'Forgástest', html: R`<div class="box"><b>Példa.</b> $y=x^2$, $0\le x\le2$ x-tengely körüli forgatása: $V=\pi\int_0^2x^4dx=\pi\cdot\dfrac{32}5=\dfrac{32\pi}5$.</div>
    <p>Ellenőrzés: a henger ($r=4,\ m=2$) térfogata $32\pi$; a forgástest a 20%-a, vagyis kisebb, ahogy várjuk (az $x^2$ nagyrészt kis értékű).</p>` }
], quiz: { q: 'Mennyi $\\int_0^\\pi\\sin x\\,dx$?', opts: ['0', '1', '2'], a: 2, why: '$[-\\cos x]_0^\\pi=1+1=2$.' } }
);

T('t9').lessons.push(
{ id: 't9l4', title: 'Várható érték és geometriai valószínűség', steps: [
  { h: 'Várható érték', html: R`<p>$E(X)=\sum x_iP(X=x_i)$.</p>
    <div class="box"><b>Példa.</b> Kockadobás: 6-osra 60 Ft, 5-ösre 12 Ft, mást dobva 0 Ft. $E=60\cdot\frac16+12\cdot\frac16=12$ Ft. Ha a játék ára 15 Ft, hosszú távon veszítesz.</div>` },
  { h: 'Geometriai valószínűség', html: R`<p>Kedvező mérték/összes mérték (hossz, terület, térfogat).</p>
    <div class="box"><b>1. Céllövés.</b> 10 cm sugarú körlapon belül a 4 cm sugarú kör: $\dfrac{16\pi}{100\pi}=\dfrac4{25}=0{,}16$.</div>
    <div class="box"><b>2. Találkozás.</b> Két barát 12 és 13 óra között véletlenszerűen érkezik, és 15 percet vár. Találkozás: $1-\left(\dfrac34\right)^2=\dfrac7{16}$. (Négyzetben a sáv, $|x-y|\le\frac14$.)</div>` }
], quiz: { q: 'Mennyi a szabályos kocka dobásának várható értéke?', opts: ['3', '3,5', '4'], a: 1, why: '$\\frac{1+2+\\dots+6}6=3{,}5$.' } },

{ id: 't9l5', title: 'Visszatevés nélküli húzás és statisztikai adatok', steps: [
  { h: 'Visszatevés nélküli mintavétel', html: R`<div class="box"><b>Példa.</b> 20 termék közül 4 selejtes, 3-at kiválasztunk. Pontosan 1 selejtes: $\dfrac{\binom41\binom{16}2}{\binom{20}3}=\dfrac{4\cdot120}{1140}=\dfrac8{19}\approx0{,}421$.</div>
    <div class="box"><b>Feltételes valószínűség.</b> Két kockával 8 az összeg (5 eset). Ha tudjuk, hogy legalább az egyik 6-os: (2;6), (6;2) → $\dfrac25$.</div>` },
  { h: 'Gyakorisági táblázat', html: R`<table class="f"><tr><th>érték</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th></tr><tr><td>gyakoriság</td><td>1</td><td>2</td><td>4</td><td>2</td><td>1</td></tr></table>
    <p>$n=10$, átlag $\bar x=\dfrac{1+4+12+8+5}{10}=3$. Szórásnégyzet: $\dfrac{1\cdot4+2\cdot1+0+2\cdot1+1\cdot4}{10}=1{,}2$, szórás $\approx1{,}10$.</p>` }
], quiz: { q: 'Az 1, 2, 3, 4, 5 adatok átlaga és mediánja:', opts: ['3 és 3', '3 és 2', '15 és 3'], a: 0, why: 'Az összeg 15, az elemszám 5 → átlag 3; medián a középső: 3.' } }
);
})();
