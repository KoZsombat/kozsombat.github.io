/* Leckék 2/2: 5–9. témakör */
(function () {
const R = String.raw;
window.TOPICS.push(
{ id: 't5', icon: '📐', title: 'Trigonometria', lessons: [
  { id: 't5l1', title: 'Szögfüggvények és azonosságok', steps: [
    { h: 'Derékszögű háromszög és egységkör', html: R`<p>Derékszögű háromszögben: $\sin\alpha=\dfrac{\text{szemközti}}{\text{átfogó}}$, $\cos\alpha=\dfrac{\text{melletti}}{\text{átfogó}}$, $\tan\alpha=\dfrac{\sin\alpha}{\cos\alpha}$.</p>
      <p>Az egységkörön a $\alpha$ szöghöz tartozó pont: $(\cos\alpha;\sin\alpha)$. Szög átváltás: $180^\circ=\pi$ rad, például $150^\circ=\dfrac{5\pi}6$.</p>
      <table class="f"><tr><th>$\alpha$</th><th>$0^\circ$</th><th>$30^\circ$</th><th>$45^\circ$</th><th>$60^\circ$</th><th>$90^\circ$</th></tr>
      <tr><td>$\sin$</td><td>0</td><td>$\frac12$</td><td>$\frac{\sqrt2}2$</td><td>$\frac{\sqrt3}2$</td><td>1</td></tr>
      <tr><td>$\cos$</td><td>1</td><td>$\frac{\sqrt3}2$</td><td>$\frac{\sqrt2}2$</td><td>$\frac12$</td><td>0</td></tr></table>` },
    { h: 'Fontos azonosságok', html: R`<div class="box">$\sin^2x+\cos^2x=1$<br>$\sin 2x=2\sin x\cos x$<br>$\cos 2x=\cos^2x-\sin^2x=1-2\sin^2x$<br>$\sin(180^\circ-x)=\sin x,\quad\cos(180^\circ-x)=-\cos x$<br>$\sin(x+2\pi)=\sin x$</div>` }
  ], quiz: { q: 'Mennyi $\\sin30^\\circ+\\cos60^\\circ$?', opts: ['$\\frac12$', '1', '$\\sqrt3$'], a: 1, why: '$\\frac12+\\frac12=1$.' } },

  { id: 't5l2', title: 'Szinusz- és koszinusztétel', steps: [
    { h: 'Tételek', html: R`<p>Tetszőleges háromszögben ($a,b,c$ oldalak, $\alpha,\beta,\gamma$ velük szemközti szögek):</p>
      <div class="box">Szinusztétel: $\dfrac a{\sin\alpha}=\dfrac b{\sin\beta}=\dfrac c{\sin\gamma}=2R$<br>Koszinusztétel: $c^2=a^2+b^2-2ab\cos\gamma$<br>Terület: $T=\dfrac12ab\sin\gamma$</div>
      <div class="warn">Szinusztételnél két megoldás lehet ($\sin\alpha=\sin(180^\circ-\alpha)$): gondold meg, hogy a szög hegyes vagy tompa!</div>` },
    { h: 'Példa', html: R`<p>$a=7,\ b=8,\ \gamma=60^\circ$. Ekkor $c^2=49+64-2\cdot7\cdot8\cdot\dfrac12=57$, így $c=\sqrt{57}\approx7{,}55$. Terület: $T=\dfrac12\cdot56\cdot\dfrac{\sqrt3}2\approx24{,}25$.</p>` }
  ], quiz: { q: 'Melyik tételt használod, ha két oldalt és a közbezárt szöget ismered, és a harmadik oldal kell?', opts: ['Szinusztétel', 'Koszinusztétel', 'Thalész-tétel'], a: 1, why: 'Két oldal és közbezárt szög (SAS) esetén koszinusztétel.' } },

  { id: 't5l3', title: 'Trigonometrikus egyenletek', steps: [
    { h: 'Módszer', html: R`<p>Elemi egyenlet: $\sin x=a$ megoldásai: $x=\arcsin a+2k\pi$ vagy $x=\pi-\arcsin a+2k\pi$ $(k\in\mathbb Z)$. $\cos x=a$: $x=\pm\arccos a+2k\pi$.</p>
      <p>Összetettebb egyenletet azonosságokkal egyetlen függvényre hozunk, új változót vezetünk be.</p>` },
    { h: 'Példa', html: R`<p>$2\sin^2x+\sin x-1=0,\ x\in[0;2\pi)$. Legyen $t=\sin x$: $2t^2+t-1=0$, $D=9$, $t=\dfrac{-1\pm3}4$, tehát $t=\dfrac12$ vagy $t=-1$.</p>
      <p>$\sin x=\dfrac12$: $x=\dfrac\pi6$ vagy $\dfrac{5\pi}6$. $\sin x=-1$: $x=\dfrac{3\pi}2$.</p>` }
  ], quiz: { q: 'Hány megoldása van a $\\sin x=\\frac12$ egyenletnek a $[0;2\\pi)$ intervallumon?', opts: ['1', '2', '4'], a: 1, why: '$\\frac\\pi6$ és $\\frac{5\\pi}6$.' } }
]},

{ id: 't6', icon: '🧭', title: 'Síkgeometria és koordinátageometria', lessons: [
  { id: 't6l1', title: 'Síkidomok, hasonlóság, nevezetes tételek', steps: [
    { h: 'Háromszög', html: R`<p>Területe: $T=\dfrac{a\cdot m_a}2=\dfrac12ab\sin\gamma=\sqrt{s(s-a)(s-b)(s-c)}$ (Héron), ahol $s=\dfrac{a+b+c}2$.</p>
      <div class="box">Beírt kör sugara: $r=\dfrac Ts$. Körülírt kör sugara: $R=\dfrac{abc}{4T}$.<br>Derékszögű háromszögben a körülírt kör sugara az átfogó fele (Thalész).</div>` },
    { h: 'Hasonlóság és körök', html: R`<p>Hasonló idomok területének aránya az arányok négyzete, a térfogatoké a köbe.</p>
      <p>Kerületi szög tétele: azonos ívhez tartozó kerületi szögek egyenlők, és fele a középponti szögnek. Érintőszakaszok tétele: külső pontból húzott két érintőszakasz egyenlő hosszú.</p>` }
  ], quiz: { q: 'Két hasonló háromszög hasonlóságának aránya 3. A területek aránya:', opts: ['3', '6', '9'], a: 2, why: 'A területek aránya az arány négyzete: $3^2=9$.' } },

  { id: 't6l2', title: 'Vektorok és egyenes', steps: [
    { h: 'Vektorok', html: R`<p>$\vec a=(a_1;a_2)$, hossza $|\vec a|=\sqrt{a_1^2+a_2^2}$. Skaláris szorzat: $\vec a\cdot\vec b=a_1b_1+a_2b_2=|\vec a||\vec b|\cos\varphi$. Merőlegesek $\iff \vec a\cdot\vec b=0$.</p>
      <p>Két pont távolsága: $AB=\sqrt{(x_B-x_A)^2+(y_B-y_A)^2}$. Felezőpont: $\left(\dfrac{x_A+x_B}2;\dfrac{y_A+y_B}2\right)$.</p>` },
    { h: 'Az egyenes egyenlete', html: R`<div class="box">Meredekség: $m=\dfrac{y_B-y_A}{x_B-x_A}$, egyenes: $y-y_0=m(x-x_0)$.<br>Normálvektoros alak: $Ax+By=C$, normálvektor $(A;B)$.<br>Merőleges egyeneseken $m_1m_2=-1$.</div>
      <p><b>Példa.</b> $A(1;2),\ B(3;8)$: $m=3$, $y-2=3(x-1)\Rightarrow y=3x-1$.</p>` }
  ], quiz: { q: 'Az $y=2x+1$ egyenesre merőleges egyenes meredeksége:', opts: ['2', '$-\\frac12$', '$-2$'], a: 1, why: '$m_1m_2=-1$, így $m_2=-\\frac12$.' } },

  { id: 't6l3', title: 'Kör és parabola', steps: [
    { h: 'A kör egyenlete', html: R`<p>Középpont $(u;v)$, sugár $r$: $$(x-u)^2+(y-v)^2=r^2.$$</p>
      <div class="box">Az $x^2+y^2+ax+by+c=0$ alakot teljes négyzetté alakítva olvasható le a középpont és a sugár.<br><b>Érintő:</b> a $P$ pontbeli érintő merőleges az $OP$ sugárra. Az $x^2+y^2=25$ kör $(3;4)$ pontjában: $3x+4y=25$.</div>` },
    { h: 'Parabola', html: R`<p>$y=a(x-p)^2+q$: csúcs $(p;q)$; $a>0$ felfelé, $a<0$ lefelé nyílik. A tengelye $x=p$.</p>
      <p>Egyenes és kör (parabola) közös pontjai: behelyettesítés után másodfokú egyenletet kapunk. $D>0$ metszés, $D=0$ érintés, $D<0$ nincs közös pont.</p>` }
  ], quiz: { q: 'Mi a középpontja az $(x-2)^2+(y+3)^2=25$ körnek?', opts: ['$(2;3)$', '$(-2;3)$', '$(2;-3)$'], a: 2, why: '$(y+3)=(y-(-3))$, tehát $v=-3$.' } }
]},

{ id: 't7', icon: '🧊', title: 'Térgeometria', lessons: [
  { id: 't7l1', title: 'Testek felszíne és térfogata', steps: [
    { h: 'Képletek', html: R`<table class="f"><tr><th>Test</th><th>Térfogat</th><th>Felszín</th></tr>
      <tr><td>Kocka (él $a$)</td><td>$a^3$</td><td>$6a^2$</td></tr>
      <tr><td>Hasáb / henger</td><td>$T_{alap}\cdot m$ / $\pi r^2m$</td><td>$2T_{alap}+$palást / $2\pi r(r+m)$</td></tr>
      <tr><td>Gúla / kúp</td><td>$\frac13T_{alap}\,m$ / $\frac13\pi r^2m$</td><td>alap + palást / $\pi r(r+a)$</td></tr>
      <tr><td>Gömb</td><td>$\frac43\pi r^3$</td><td>$4\pi r^2$</td></tr></table>
      <p>A kúp alkotója $a$: $a^2=r^2+m^2$.</p>` },
    { h: 'Példa: kúp', html: R`<p>$r=6,\ a=10$: $m=\sqrt{100-36}=8$. $V=\dfrac13\pi\cdot36\cdot8=96\pi$. Palást: $\pi r a=60\pi$, felszín: $60\pi+36\pi=96\pi$.</p>` }
  ], quiz: { q: 'Gömb sugara 3. Térfogata:', opts: ['$12\\pi$', '$36\\pi$', '$108\\pi$'], a: 1, why: '$\\frac43\\pi\\cdot27=36\\pi$.' } },

  { id: 't7l2', title: 'Gúlák, beírt és körülírt testek', steps: [
    { h: 'Szabályos négyzet alapú gúla', html: R`<p>Alapél $a$, oldalél $b$. Az alap átlójának fele: $\dfrac{a\sqrt2}2$. A gúla magassága: $m^2=b^2-\left(\dfrac{a\sqrt2}2\right)^2$. Az oldallap magassága: $m_o^2=b^2-\left(\dfrac a2\right)^2$.</p>
      <div class="box"><b>Példa.</b> $a=6,\ b=5$: átló fele $3\sqrt2$, $m^2=25-18=7$, $m=\sqrt7$, $V=\dfrac13\cdot36\sqrt7=12\sqrt7\approx31{,}7$. Oldallap magassága $\sqrt{25-9}=4$.</div>` },
    { h: 'Beírt és körülírt gömb', html: R`<p>Kocka (él $a$) beírt gömbjének sugara $\dfrac a2$, körülírt gömbjéé $\dfrac{a\sqrt3}2$ (térátló fele).</p>` }
  ], quiz: { q: 'Mekkora a 4 cm élű kocka térátlója?', opts: ['$4\\sqrt2$', '$4\\sqrt3$', '$8$'], a: 1, why: '$a\\sqrt3=4\\sqrt3$.' } }
]},

{ id: 't8', icon: '∫', title: 'Analízis', lessons: [
  { id: 't8l1', title: 'Határérték és folytonosság', steps: [
    { h: 'Határérték', html: R`<p>$\lim_{x\to a}f(x)=A$: ha $x$ közelít $a$-hoz, $f(x)$ közelít $A$-hoz.</p>
      <div class="box"><b>Példa.</b> $\lim_{x\to3}\dfrac{x^2-9}{x-3}=\lim_{x\to3}(x+3)=6$ (egyszerűsítés).<br>Sorozatnál: $\lim_{n\to\infty}\dfrac{3n^2+1}{n^2-5}=3$ (a legnagyobb hatvánnyal osztunk).</div>` },
    { h: 'Folytonosság', html: R`<p>$f$ folytonos $a$-ban, ha $\lim_{x\to a}f(x)=f(a)$. Az elemi függvények az értelmezési tartományukon folytonosak.</p>` }
  ], quiz: { q: '$\\lim_{n\\to\\infty}\\frac{2n+1}{n}$ értéke:', opts: ['1', '2', '$\\infty$'], a: 1, why: 'Osztunk $n$-nel: $2+\\frac1n\\to2$.' } },

  { id: 't8l2', title: 'Deriválás', steps: [
    { h: 'Szabályok', html: R`<div class="box">$(x^n)'=nx^{n-1}$, $(\sin x)'=\cos x$, $(\cos x)'=-\sin x$, $(e^x)'=e^x$, $(\ln x)'=\dfrac1x$<br>$(f+g)'=f'+g'$, $(cf)'=cf'$<br>Szorzat: $(fg)'=f'g+fg'$<br>Hányados: $\left(\dfrac fg\right)'=\dfrac{f'g-fg'}{g^2}$<br>Összetett: $(f(g(x)))'=f'(g(x))\cdot g'(x)$</div>
      <p>A derivált a grafikon meredeksége: az érintő egyenlete $y-f(a)=f'(a)(x-a)$.</p>` },
    { h: 'Példa', html: R`<p>$f(x)=x^3-3x^2$: $f'(x)=3x^2-6x$, $f'(2)=12-12=0$. Az $x=2$ pontban vízszintes az érintő.</p>` }
  ], quiz: { q: 'Mennyi $(x^2\\sin x)^\\prime$?', opts: ['$2x\\cos x$', '$2x\\sin x+x^2\\cos x$', '$x^2\\cos x$'], a: 1, why: 'Szorzatszabály: $f\'g+fg\'$.' } },

  { id: 't8l3', title: 'Függvényvizsgálat és szélsőérték-feladatok', steps: [
    { h: 'Menete', html: R`<p>1) Értelmezési tartomány, zérushelyek. 2) $f'(x)=0$ megoldásai. 3) Ahol $f'>0$, ott $f$ szigorúan nő; ahol $f'<0$, ott csökken. 4) Előjelváltás: $+\to-$ helyi maximum; $-\to+$ helyi minimum. 5) $f''$: konvex ($f''>0$), konkáv ($f''<0$), inflexió, ahol $f''$ előjelet vált.</p>
      <div class="box"><b>Példa.</b> $f(x)=x^3-6x^2+9x+1$: $f'=3(x-1)(x-3)$. Helyi max $x=1$: $f(1)=5$; helyi min $x=3$: $f(3)=1$.</div>` },
    { h: 'Szélsőérték-feladat', html: R`<p><b>Példa.</b> 100 m kerítéssel egy fal mellett téglalap alakú kertet kerítünk (a fal mentén nem kell kerítés). Mekkora lehet a maximális terület?<br>
      Ha a falra merőleges oldal $x$, a fallal párhuzamos $100-2x$: $T(x)=x(100-2x)=100x-2x^2$. $T'(x)=100-4x=0\Rightarrow x=25$. $T(25)=25\cdot50=1250\ \mathrm{m}^2$.</p>
      <div class="fun">Értéktartomány-ellenőrzés: $0<x<50$. A szélsőérték mindig legyen a megengedett tartományban!</div>` }
  ], quiz: { q: 'Ha $f\'(x)$ előjele $-$-ról $+$-ra vált, akkor ott $f$-nek:', opts: ['helyi maximuma van', 'helyi minimuma van', 'inflexiója van'], a: 1, why: 'Csökkenésből növekedésbe vált: minimum.' } },

  { id: 't8l4', title: 'Integrálszámítás', steps: [
    { h: 'Határozatlan és határozott integrál', html: R`<div class="box">$\int x^n\,dx=\dfrac{x^{n+1}}{n+1}+C\ (n\ne-1)$, $\int\dfrac1x dx=\ln|x|+C$, $\int\sin x\,dx=-\cos x+C$, $\int e^xdx=e^x+C$</div>
      <p>Newton–Leibniz: $\int_a^bf(x)\,dx=F(b)-F(a)$, ahol $F'=f$.</p>
      <p>$\int_0^23x^2dx=[x^3]_0^2=8$.</p>` },
    { h: 'Terület és forgástest', html: R`<p>Két görbe közti terület: $T=\int_a^b(f(x)-g(x))\,dx$, ha $f\ge g$.</p>
      <div class="box"><b>Példa.</b> $y=x$ és $y=x^2$ metszéspontjai: 0 és 1. $T=\int_0^1(x-x^2)dx=\dfrac12-\dfrac13=\dfrac16$.</div>
      <p>Forgástest térfogata (x-tengely körül): $V=\pi\int_a^b f^2(x)\,dx$. Például $y=\sqrt x$, $0\le x\le4$: $V=\pi\int_0^4x\,dx=8\pi$.</p>` }
  ], quiz: { q: 'Mennyi $\\int_0^1 2x\\,dx$?', opts: ['1', '2', '$\\frac12$'], a: 0, why: '$[x^2]_0^1=1$.' } }
]},

{ id: 't9', icon: '🎲', title: 'Valószínűség és statisztika', lessons: [
  { id: 't9l1', title: 'Valószínűségszámítás', steps: [
    { h: 'Klasszikus modell', html: R`<p>$P(A)=\dfrac{\text{kedvező esetek}}{\text{összes eset}}$ (egyenlően valószínű kimenetelek). $P(\overline A)=1-P(A)$; $P(A\cup B)=P(A)+P(B)-P(A\cap B)$.</p>
      <p><b>Példa.</b> Két kockával 7-et dobni: $\dfrac6{36}=\dfrac16$.</p>
      <div class="box"><b>Lottó példa:</b> 90-ből 5 számot húznak, mi 5-öt tippelünk. Pontosan 3 találat: $\dfrac{\binom53\binom{85}2}{\binom{90}5}=\dfrac{35700}{43949268}\approx0{,}00081$.</div>` },
    { h: 'Feltételes valószínűség, függetlenség', html: R`<p>$P(A\mid B)=\dfrac{P(A\cap B)}{P(B)}$. $A$ és $B$ független, ha $P(A\cap B)=P(A)P(B)$.</p>
      <div class="box"><b>Példa.</b> Urnában 5 piros, 3 kék golyó, visszatevés nélkül húzunk kettőt. $P(\text{mindkettő piros})=\dfrac58\cdot\dfrac47=\dfrac5{14}$. $P(2.\text{ piros}\mid1.\text{ kék})=\dfrac57$.</div>` }
  ], quiz: { q: 'Egy kockával dobva mi a valószínűsége páros számnak?', opts: ['$\\frac13$', '$\\frac12$', '$\\frac23$'], a: 1, why: '2, 4, 6: $\\frac36=\\frac12$.' } },

  { id: 't9l2', title: 'Binomiális eloszlás', steps: [
    { h: 'A modell', html: R`<p>$n$ egymástól független kísérlet, mindegyikben $p$ a siker valószínűsége. A sikerek száma $X$:</p>
      $$P(X=k)=\binom nk p^k(1-p)^{n-k}$$
      <p>Várható érték: $E(X)=np$. Szórás: $\sigma=\sqrt{np(1-p)}$.</p>` },
    { h: 'Példák', html: R`<p>10 érmedobás, pontosan 3 fej: $\binom{10}3\cdot\left(\frac12\right)^{10}=\dfrac{120}{1024}\approx0{,}117$.</p>
      <p>„Legalább egy” típusú kérdésnél a komplementert használd: 5% selejt, 8 termék, legalább egy selejtes: $1-0{,}95^8\approx0{,}337$.</p>` }
  ], quiz: { q: 'A binomiális eloszlás várható értéke $n=20,\\ p=0{,}3$ esetén:', opts: ['3', '6', '14'], a: 1, why: '$np=6$.' } },

  { id: 't9l3', title: 'Statisztika', steps: [
    { h: 'Középértékek és szórás', html: R`<p><b>Átlag:</b> $\bar x=\dfrac{\sum x_i}n$. <b>Medián:</b> a rendezett lista közepe. <b>Módusz:</b> leggyakoribb érték. <b>Szórás:</b> $\sigma=\sqrt{\dfrac{\sum(x_i-\bar x)^2}n}$.</p>
      <div class="box"><b>Példa.</b> Adatok: 2, 3, 3, 5, 7. Átlag 4; medián 3; módusz 3. Négyzetes eltérések: $4+1+1+1+9=16$; $\sigma=\sqrt{16/5}=\sqrt{3{,}2}\approx1{,}79$.</div>` },
    { h: 'Ábrák', html: R`<p>Oszlopdiagram: kategóriák; hisztogram: osztályközök; kördiagram: arányok (a középponti szög $=$ arány $\cdot360^\circ$); dobozdiagram: minimum, alsó kvartilis, medián, felső kvartilis, maximum.</p>` }
  ], quiz: { q: 'Az 1, 2, 3, 4, 10 adatsor mediánja:', opts: ['3', '4', '2'], a: 0, why: 'A rendezett lista középső eleme 3 (az átlag 4 lenne).' } }
]}
);
})();
