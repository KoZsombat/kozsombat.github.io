/* Leckék 1/2: 1–4. témakör. Minden lecke: steps[] + quiz */
const R = String.raw;
window.TOPICS = [
{ id: 't1', icon: '🧩', title: 'Halmazok, logika, kombinatorika, gráfok', lessons: [
  { id: 't1l1', title: 'Halmazműveletek és logika', steps: [
    { h: 'Halmazok és műveletek', html: R`<p>A halmaz különböző elemek összessége. Legyenek $A$ és $B$ halmazok.</p>
      <div class="box">Unió: $A\cup B$ (legalább az egyikben benne van)<br>Metszet: $A\cap B$ (mindkettőben benne van)<br>Különbség: $A\setminus B$ ($A$-ban igen, $B$-ben nem)<br>Komplementer: $\overline{A}$ (az alaphalmaz többi eleme)</div>` },
    { h: 'A szitaformula', html: R`<p>Ha egy elemet mindkét halmazban megszámolunk, kétszer számoltuk. Ezért:</p>
      $$|A\cup B| = |A| + |B| - |A\cap B|$$
      <div class="box"><b>Példa.</b> 30 fős osztályban 18-an focizni, 15-en kosarazni járnak, 5-en egyikre sem. Mindkettőre hányan?<br>
      Legalább az egyikre: $30-5=25$. Tehát $25=18+15-x$, ebből $x=8$.</div>
      <div class="warn"><b>Gyakori hiba:</b> a „egyikre sem” csoportot elfelejtik levonni az összlétszámból.</div>` },
    { h: 'Állítások, tagadás, „ha–akkor”', html: R`<p>Az „és” tagadása „vagy”, a „vagy” tagadása „és” (De Morgan): $\neg(A\wedge B)=\neg A\vee\neg B$.</p>
      <p>A „Minden $x$-re igaz…” tagadása: „Van olyan $x$, amelyre nem igaz…”.</p>
      <div class="box">„Ha $A$, akkor $B$” megfordítása: „Ha $B$, akkor $A$” – ez <b>nem</b> következik az eredetiből!<br>Az eredeti állítással egyenértékű az <b>ellenkezőjének megfordítása</b>: „Ha nem $B$, akkor nem $A$”.</div>
      <div class="fun">Ha esik az eső, elázom. Ha elázok, az nem jelenti, hogy esik: lehet, hogy a szomszéd locsol. 🌧️</div>` }
  ], quiz: { q: 'Az „Minden diák szereti a matekot” állítás tagadása:', opts: ['Egy diák sem szereti a matekot.', 'Van olyan diák, aki nem szereti a matekot.', 'Minden diák utálja a matekot.'], a: 1, why: 'A „minden” tagadása „van olyan, hogy nem”. Az első válasz túl erős.' } },

  { id: 't1l2', title: 'Kombinatorika', steps: [
    { h: 'Sorrend számít: permutáció, variáció', html: R`<p><b>Permutáció:</b> $n$ különböző elem sorba rendezése: $n!=n\cdot(n-1)\cdots 2\cdot 1$.</p>
      <p><b>Ismétléses permutáció:</b> ha $k_1,k_2,\dots$ darab egyforma elem van: $\dfrac{n!}{k_1!\,k_2!\cdots}$.</p>
      <div class="box"><b>Példa.</b> A MATEMATIKA szó betűit hányféleképp lehet sorba rakni? 10 betű: M×2, A×3, T×2, E, I, K.<br>$\dfrac{10!}{2!\,3!\,2!}=\dfrac{3628800}{24}=151200$</div>
      <p><b>Variáció:</b> $n$ elemből $k$-t sorrenddel kiválasztva (ismétlés nélkül): $n(n-1)\cdots(n-k+1)$; ismétléssel: $n^k$.</p>` },
    { h: 'Sorrend nem számít: kombináció', html: R`<p>$n$ elemből $k$ elem kiválasztása sorrend nélkül:</p>
      $$\binom{n}{k}=\frac{n!}{k!\,(n-k)!}$$
      <div class="box"><b>Példa.</b> Lottó (90 számból 5): $\binom{90}{5}=43\,949\,268$ különböző húzás.</div>
      <p>Hasznos: $\binom{n}{k}=\binom{n}{n-k}$, és $\binom{n}{0}=\binom{n}{n}=1$.</p>
      <div class="fun">Tipp: ha a feladat azt kérdezi, „hányféleképpen választhat”, kombináció; ha „hányféleképpen sorolhatja”, akkor általában sorrend is számít.</div>` },
    { h: 'Trükk: két dolog egymás mellett', html: R`<p>Ha két elem mindig egymás mellett áll, <b>összeragasztjuk</b> őket egyetlen elemmé, majd a két elem belső sorrendjét is megszorozzuk 2-vel.</p>
      <div class="box">6 ember sorba, A és B egymás mellett: $2\cdot 5!=240$.</div>
      <p>„Nem állhatnak egymás mellett” = összes eset − egymás melletti esetek: $6!-240=480$.</p>` }
  ], quiz: { q: '5 fős csoportból 2 fős küldöttséget választunk. Hányféleképpen?', opts: ['5', '10', '20'], a: 1, why: '$\\binom{5}{2}=10$; a sorrend nem számít, ezért nem 20.' } },

  { id: 't1l3', title: 'Gráfok', steps: [
    { h: 'Alapfogalmak', html: R`<p>A gráf csúcsokból és élekből áll. A csúcs <b>fokszáma</b> a rá illeszkedő élek száma.</p>
      <div class="box"><b>Kézfogás-lemma:</b> a fokszámok összege az élszám kétszerese: $\sum d(v)=2e$.<br>Következmény: páratlan fokú csúcsból páros sok van.</div>
      <p>Az $n$ csúcsú <b>teljes gráf</b> éleinek száma: $\binom{n}{2}=\dfrac{n(n-1)}{2}$.</p>` },
    { h: 'Fák, összefüggőség, Euler-út', html: R`<p>Az $n$ csúcsú <b>fa</b> összefüggő és körmentes; éleinek száma pontosan $n-1$.</p>
      <p><b>Euler-vonal</b> (minden élen pontosan egyszer végigmegy) összefüggő gráfban akkor van, ha a páratlan fokú csúcsok száma 0 vagy 2. Zárt Euler-vonalhoz mind a csúcsok foka páros.</p>
      <div class="box"><b>Példa.</b> 7 csúcsú fának 6 éle van; ha egy új élt húzunk be a két nem szomszédos csúcs közé, pontosan egy kör keletkezik.</div>` }
  ], quiz: { q: 'Létezik-e olyan gráf, amelyben 5 csúcs van és mindegyik foka 3?', opts: ['Igen', 'Nem, mert a fokszámösszeg 15, ami páratlan', 'Nem, mert túl sok él kellene'], a: 1, why: 'A fokszámösszeg $5\\cdot3=15$ lenne, de ennek az élszám kétszeresének, tehát párosnak kell lennie.' } }
]},

{ id: 't2', icon: '🔢', title: 'Számelmélet', lessons: [
  { id: 't2l1', title: 'Oszthatóság, lnko és lkkt', steps: [
    { h: 'Prímtényezős felbontás', html: R`<p>Minden 1-nél nagyobb egész szám egyértelműen felírható prímek szorzataként (a számtan alaptétele).</p>
      <div class="box">$360=2^3\cdot3^2\cdot5$. Osztók száma: $(3+1)(2+1)(1+1)=24$.</div>
      <p>Ha $n=p_1^{a_1}p_2^{a_2}\cdots$, akkor az osztók száma $(a_1+1)(a_2+1)\cdots$.</p>` },
    { h: 'Legnagyobb közös osztó, legkisebb közös többszörös', html: R`<p>lnko: a közös prímek <b>kisebb</b> kitevővel; lkkt: minden prím a <b>nagyobb</b> kitevővel.</p>
      <div class="box">$84=2^2\cdot3\cdot7$, $126=2\cdot3^2\cdot7$.<br>lnko $=2\cdot3\cdot7=42$, lkkt $=2^2\cdot3^2\cdot7=252$.<br>Ellenőrzés: $42\cdot252=10584=84\cdot126$.</div>
      <p>Mindig igaz: $\text{lnko}(a,b)\cdot\text{lkkt}(a,b)=a\cdot b$.</p>` },
    { h: 'Oszthatósági szabályok', html: R`<table class="f"><tr><th>Osztó</th><th>Szabály</th></tr>
      <tr><td>2, 5, 10</td><td>az utolsó számjegy</td></tr><tr><td>3, 9</td><td>a számjegyek összege osztható 3-mal, 9-cel</td></tr>
      <tr><td>4</td><td>az utolsó két számjegy által alkotott szám osztható 4-gyel</td></tr>
      <tr><td>11</td><td>a váltakozó előjelű számjegyösszeg osztható 11-gyel</td></tr></table>
      <div class="fun">A 3 többszöröseit a számjegyösszeg elárulja – a számok is ilyen pletykásak. 🤫</div>` }
  ], quiz: { q: 'Hány pozitív osztója van a 72-nek? ($72=2^3\\cdot3^2$)', opts: ['6', '12', '9'], a: 1, why: '$(3+1)(2+1)=12$.' } },

  { id: 't2l2', title: 'Maradékok és számrendszerek', steps: [
    { h: 'Maradékok és utolsó számjegy', html: R`<p>Az $a$ szám $m$-mel osztott maradékával lehet számolni: összeg és szorzat maradéka a maradékok összegéből/szorzatából adódik.</p>
      <div class="box"><b>Példa.</b> A $7^{2025}$ utolsó számjegye? A 7 hatványainak utolsó számjegye: 7, 9, 3, 1, majd ismétlődik (periódus 4). $2025=4\cdot506+1$, ezért az utolsó számjegy 7.</div>` },
    { h: 'Számrendszerek', html: R`<p>A kettes számrendszerben $1101_2=1\cdot8+1\cdot4+0\cdot2+1=13$.</p>
      <p>Átváltás tízesből kettesbe: ismételt osztás 2-vel, a maradékokat alulról felfelé olvassuk. $13=2\cdot6+1$, $6=2\cdot3+0$, $3=2\cdot1+1$, $1=2\cdot0+1$ → $1101_2$.</p>` },
    { h: 'Bizonyítás: három szomszéd szorzata', html: R`<p><b>Állítás:</b> három egymást követő egész szám szorzata osztható 6-tal.</p>
      <p>Három szomszéd közül pontosan egy osztható 3-mal, és legalább egy páros. Mivel 2 és 3 relatív prímek, a szorzat osztható $2\cdot3=6$-tal. ∎</p>` }
  ], quiz: { q: 'Mennyi $1011_2$ értéke tízes számrendszerben?', opts: ['9', '11', '13'], a: 1, why: '$8+0+2+1=11$.' } }
]},

{ id: 't3', icon: '🟰', title: 'Algebra és egyenletek', lessons: [
  { id: 't3l1', title: 'Másodfokú egyenletek és egyenlőtlenségek', steps: [
    { h: 'Megoldóképlet', html: R`<p>$ax^2+bx+c=0$ megoldásai: $$x_{1,2}=\frac{-b\pm\sqrt{D}}{2a},\quad D=b^2-4ac.$$</p>
      <div class="box">$D>0$: két valós gyök; $D=0$: egy (kétszeres) gyök; $D<0$: nincs valós gyök.<br><b>Viète:</b> $x_1+x_2=-\dfrac ba$, $x_1x_2=\dfrac ca$.</div>
      <p><b>Példa.</b> $x^2-5x+6=0$: $D=25-24=1$, $x=\dfrac{5\pm1}{2}$, tehát $x_1=3,\ x_2=2$.</p>` },
    { h: 'Másodfokú egyenlőtlenség', html: R`<p>Szorzattá alakítunk: $x^2-4x-5=(x-5)(x+1)<0$. A parabola felfelé nyílik, ezért a gyökök között negatív: $-1<x<5$.</p>
      <div class="warn"><b>Figyelem:</b> egyenlőtlenségnél negatív számmal szorozva/osztva megfordul a reláció iránya!</div>` }
  ], quiz: { q: 'Mennyi az $x^2-6x+9=0$ egyenlet diszkriminánsa, és hány gyöke van?', opts: ['D=0, egy gyök', 'D=36, két gyök', 'D=−9, nincs gyök'], a: 0, why: '$D=36-36=0$, a gyök $x=3$ (kétszeres).' } },

  { id: 't3l2', title: 'Abszolútérték és gyökös egyenletek', steps: [
    { h: 'Abszolútérték', html: R`<p>$|x|$ a szám távolsága a nullától. $|f(x)|=a$ ($a>0$) esetén $f(x)=a$ vagy $f(x)=-a$.</p>
      <div class="box"><b>Példa.</b> $|2x-3|=7$ → $2x-3=7$ ($x=5$) vagy $2x-3=-7$ ($x=-2$).</div>
      <p>$|x-1|<3$ azt jelenti, hogy $x$ távolsága 1-től kisebb 3-nál: $-2<x<4$.</p>` },
    { h: 'Gyökös egyenletek: ellenőrizni kell!', html: R`<p>Négyzetre emeléskor hamis gyökök keletkezhetnek.</p>
      <div class="box"><b>Példa.</b> $\sqrt{x+6}=x$. Feltétel: $x\ge0$. Négyzetre emelve $x+6=x^2$, azaz $x^2-x-6=0$, $x=3$ vagy $x=-2$. Az $x=-2$ nem felel meg ($x\ge0$), tehát csak $x=3$.</div>
      <div class="warn"><b>Mindig:</b> ellenőrizd a gyököt az eredeti egyenletbe visszahelyettesítve!</div>` }
  ], quiz: { q: 'Melyik $x$-re igaz: $|x-1|<3$?', opts: ['$-2<x<4$', '$x<-2$ vagy $x>4$', '$1<x<3$'], a: 0, why: 'A 1-től mért távolság 3-nál kisebb: $1-3<x<1+3$.' } },

  { id: 't3l3', title: 'Exponenciális és logaritmusos egyenletek', steps: [
    { h: 'Logaritmus és azonosságai', html: R`<p>$\log_a b=c \iff a^c=b$ ($a>0,\ a\ne1,\ b>0$).</p>
      <div class="box">$\log_a(xy)=\log_a x+\log_a y$<br>$\log_a\dfrac xy=\log_a x-\log_a y$<br>$\log_a x^k=k\log_a x$<br>Áttérés: $\log_a b=\dfrac{\log_c b}{\log_c a}$</div>` },
    { h: 'Exponenciális egyenlet: új változó', html: R`<p><b>Példa.</b> $4^x-6\cdot2^x+8=0$. Legyen $t=2^x>0$: $t^2-6t+8=0$, $t=2$ vagy $t=4$. Tehát $2^x=2\Rightarrow x=1$, $2^x=4\Rightarrow x=2$.</p>` },
    { h: 'Logaritmusos egyenlet', html: R`<p><b>Példa.</b> $\log_2 x+\log_2(x-2)=3$. Értelmezés: $x>2$. Összevonva $\log_2 x(x-2)=3$, így $x^2-2x=8$, $x^2-2x-8=0$, $x=4$ vagy $x=-2$. Az utóbbi kiesik az értelmezési tartomány miatt. $x=4$.</p>
      <div class="fun">A logaritmus olyan, mint a szuperhős-álnév: csak pozitív számoknak van. 🦸</div>` }
  ], quiz: { q: 'Mennyi $\\log_2 32$?', opts: ['4', '5', '16'], a: 1, why: '$2^5=32$.' } }
]},

{ id: 't4', icon: '📈', title: 'Függvények és sorozatok', lessons: [
  { id: 't4l1', title: 'Függvények jellemzése és transzformációk', steps: [
    { h: 'Jellemzés', html: R`<p>Egy függvényről a következőket kérdezik: <b>értelmezési tartomány</b>, <b>értékkészlet</b>, monotonitás, zérushely, szélsőérték, paritás, periodicitás.</p>
      <div class="box">Páros: $f(-x)=f(x)$ (y-tengelyre szimmetrikus). Páratlan: $f(-x)=-f(x)$ (origóra szimmetrikus).</div>
      <p><b>Példa.</b> $f(x)=-x^2+4x+1=-(x-2)^2+5$: maximuma $x=2$-nél 5, értékkészlet: $(-\infty;5]$.</p>` },
    { h: 'Transzformációk', html: R`<table class="f"><tr><th>Új függvény</th><th>Hatás</th></tr>
      <tr><td>$f(x)+c$</td><td>fel $c$-vel</td></tr><tr><td>$f(x-c)$</td><td>jobbra $c$-vel</td></tr>
      <tr><td>$-f(x)$</td><td>tükrözés az x-tengelyre</td></tr><tr><td>$f(-x)$</td><td>tükrözés az y-tengelyre</td></tr>
      <tr><td>$a\cdot f(x)$</td><td>függőleges nyújtás $a$-szoros</td></tr><tr><td>$f(ax)$</td><td>vízszintes zsugorítás $a$-szoros</td></tr>
      <tr><td>$|f(x)|$</td><td>a negatív részt tükrözzük felfelé</td></tr></table>
      <p>$g(x)=(x-2)^2+3$ tehát az $x^2$ parabolája jobbra 2-vel és fel 3-mal eltolva.</p>` }
  ], quiz: { q: 'Mit csinál az $f(x-3)$ az $f(x)$ grafikonjával?', opts: ['Balra tolja 3-mal', 'Jobbra tolja 3-mal', 'Felfelé tolja 3-mal'], a: 1, why: 'A belső változtatás „fordítva” hat: $x-3$ jobbra tolást jelent.' } },

  { id: 't4l2', title: 'Számtani és mértani sorozat', steps: [
    { h: 'Számtani sorozat', html: R`<p>Szomszédos tagok különbsége állandó: $d$.</p>
      <div class="box">$a_n=a_1+(n-1)d$<br>$S_n=\dfrac{n(a_1+a_n)}{2}=\dfrac{n\,(2a_1+(n-1)d)}{2}$</div>
      <p><b>Példa.</b> $a_1=5,\ d=3$: $a_{20}=5+19\cdot3=62$, $S_{20}=\dfrac{20\cdot(5+62)}{2}=670$.</p>` },
    { h: 'Mértani sorozat', html: R`<p>Szomszédos tagok hányadosa állandó: $q$.</p>
      <div class="box">$a_n=a_1q^{n-1}$<br>$S_n=a_1\dfrac{q^n-1}{q-1}\ (q\neq1)$<br>Végtelen sor: $|q|<1$ esetén $S=\dfrac{a_1}{1-q}$</div>
      <p><b>Példa.</b> $a_1=2,\ q=3$: $S_6=2\cdot\dfrac{3^6-1}{2}=728$.</p>` },
    { h: 'Kamatos kamat', html: R`<p>$K$ Ft-ot évi $p\%$-kal kamatoztatva $n$ év után $K\cdot\left(1+\dfrac p{100}\right)^n$ Ft lesz – ez mértani sorozat.</p>
      <div class="box"><b>Példa.</b> 500 000 Ft, 6% évente, 5 év: $500000\cdot1{,}06^5\approx669\,113$ Ft.<br>Hány év alatt duplázódik? $1{,}06^n\ge2\Rightarrow n\ge\dfrac{\lg 2}{\lg1{,}06}\approx11{,}9$, tehát 12 év.</div>` }
  ], quiz: { q: 'Mértani sorozat: $a_1=3,\\ q=2$. Mennyi $a_5$?', opts: ['24', '48', '96'], a: 1, why: '$a_5=3\\cdot2^4=48$.' } }
]}
];
