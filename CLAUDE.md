@AGENTS.md
--------
# Bob Čermák — Portfolio: Design & Content Reference

Kompletní referenční dokument (design systém + veškerý obsah) pro portfolio Boba Čermáka.
Vše postaveno na paletě, typografii a komponentách níže. Předej Claudovi jako podklad.

---

## 1. Brand & tón

- **Osoba:** Bob Čermák, 19 let, full stack developer. Studuje průmyslovku v Liberci, freelance + PROCONOM.
- **Doména / handle:** `bobcermak.cz`, GitHub `@bobcermak`, e-mail `ahoj@bobcermak.cz`.
- **Lokace:** Praha · Liberec · online.
- **Tón:** přímý, bez keců, sebevědomý ale ne arogantní. Krátké české věty, tykání ("Napiš mi"). Žádný korporátní žargon.
- **Tagline:** „Stavím weby a appky, které si na nic nehrajou."

---

## 2. Barevná paleta

### Neutrály (základ webu)
| Účel | Hex |
|---|---|
| Text / primární (černá) | `#111111` |
| Hover černá / active | `#000000` |
| Sekundární text | `#6b6b6b` |
| Terciární / muted | `#9a9a9a` |
| Placeholder text | `#b0aeac` / `#b3b1af` |
| Číslice muted | `#cfcdcb` / `#d0cecb` |
| Pozadí bílé | `#ffffff` |
| Pozadí off-white (footer, dlaždice) | `#fafaf8` / `#faf9f7` / `#f4f3f1` / `#f4f2ef` |
| Border světlý | `#eeecea` / `#e6e4e2` / `#eceae8` |
| Border střední | `#dcdad8` / `#d6d4d2` |

### Akcentní barvy (jen v malých dávkách — tečky, proužky, grafy)
| Název | Hex | Použití |
|---|---|---|
| Levandulově modrá | `#96ace8` | logo tečka, orbit, grafy |
| Modrá (sytější) | `#6f86d6` | sekce „Pro klienty", TypeScript |
| Broskvová | `#f3ccb2` | logo tečka, grafy |
| Broskvová (sytější) | `#e0a373` | sekce „Pro zábavu", JavaScript |
| Fialová | `#cebeec` | logo tečka, CSS, GitHub sekce |
| Zelená | `#8ab98f` | Python (grafy) |

**Pravidlo:** neutrály nesou 95 % plochy; akcenty jsou koření (logo grid, accent proužky karet, jazykový graf, section-header tečky). Nikdy velké gradientové plochy.

---

## 3. Typografie

- **Font:** `Montserrat` (Google Fonts), váhy `300, 400, 500, 600, 700` + italic 400.
  ```html
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap" />
  ```
- **Fallback:** `system-ui, sans-serif`.
- **Nadpisy:** weight 600, `letter-spacing: -0.02em` až `-0.04em` (čím větší, tím těsnější). Velká čísla/displaye weight 300.
- **Body:** weight 400, `line-height: 1.55–1.65`, barva `#6b6b6b`.
- **Eyebrow labely:** 12px, weight 600, `letter-spacing: 0.12–0.14em`, `text-transform: uppercase`, barva `#9a9a9a`.
- **Velké displaye:** `clamp()` responsivně, např. hero `clamp(2.5rem, 5.6vw, 4.8rem)`.

---

## 4. Logo

**Lockup:** malé písmo `bc` (weight 700, `letter-spacing: -0.11em` — písmena splývají) + 2×2 grid barevných teček těsně vpravo.

Grid teček (pořadí Z): `#96ace8` (levá horní), `#f3ccb2` (pravá horní), `#cebeec` (levá dolní), `#111111` nebo `#ffffff` (pravá dolní — podle light/dark).

```html
<span style="display: inline-flex; align-items: center; gap: 6px;">
  <span style="font-weight: 700; font-size: 22px; letter-spacing: -0.11em; color: #111111; line-height: 1;">bc</span>
  <span style="display: inline-grid; grid-template-columns: repeat(2, 5px); gap: 3px;">
    <span style="width: 5px; height: 5px; border-radius: 50%; background: #96ace8;"></span>
    <span style="width: 5px; height: 5px; border-radius: 50%; background: #f3ccb2;"></span>
    <span style="width: 5px; height: 5px; border-radius: 50%; background: #cebeec;"></span>
    <span style="width: 5px; height: 5px; border-radius: 50%; background: #111111;"></span>
  </span>
</span>
```

- **Light varianta:** čtvrtá tečka `#111111`, text černý.
- **Dark varianta:** čtvrtá tečka `#ffffff`, text bílý.
- **Favicon / app ikona:** JEN samotný 2×2 grid na tmavé zaoblené dlaždici (`#111111`, `border-radius: 22 %`). Bez písmen.
- **Exporty:** `logo.svg/png`, `logo-dark.svg/png`, `favicon.svg`, `favicon-16x16.png`, `favicon-32x32.png`, `apple-touch-icon.png` (180×180).

---

## 5. Komponenty & vzory

### Floating navigace (pill)
Plovoucí zaoblená lišta, odlepená od kraje, sklo/blur, spadne při načtení, při scrollu se zmenší.
- `position: fixed; top: clamp(14px,2.2vw,24px); left: 50%; transform: translateX(-50%)`
- `width: min(1120px, calc(100% - clamp(24px,6vw,80px)))`
- `border-radius: 999px; backdrop-filter: blur(18px) saturate(1.6); background: rgba(255,255,255,0.62)`
- `border: 1px solid rgba(255,255,255,0.7)`
- box-shadow: `0 1px 0 rgba(255,255,255,0.6) inset, 0 10px 30px rgba(30,40,80,0.10), 0 2px 8px rgba(30,40,80,0.06)`
- Scrolled stav: světlejší bg + silnější stín + menší padding.
- Nav odkazy = pill s hoverem `background: rgba(17,17,17,0.06)`.

### Tlačítka (JEDNOTNÝ styl všude)
- **Primární CTA:** plný pill `background:#111111; color:#fff; weight:600; padding:15px 28px; border-radius:999px` + hover `#000000` + `translateY(-1px)`. Volitelně **samostatné kruhové tlačítko** (48–50px, kruh, šipka ↗) hned vedle — na hover `rotate(45deg)`.
- **Sekundární:** obrysový pill `border:1px solid #dcdad8; border-radius:999px` + hover `border-color:#111111; background:rgba(17,17,17,0.03)`.
- **Submit v formuláři:** plný pill, `border-radius:999px`.

### Karty projektů
- `border:1px solid #eeecea; border-radius:18px; background:#fff`
- Nahoře accent proužek (`.pcard-bar`, height 4px → 8px na hover, barva = accent skupiny).
- Hover: `translateY(-6px)` + stín + zoom obrázku (`scale(1.05)`) + kruhová šipka `↗` se posune.
- Badge na obrázku: pill `rgba(255,255,255,0.92)` s blur, číslo v accent barvě + typ.

### Pilulky / tagy
- Filtry: `border-radius:999px`, aktivní = `#111111` bílý text, neaktivní = bílá + `border:1px solid #e6e4e2`.
- Tagy: `border:1px solid #e6e4e2; border-radius:6px; padding:4px 9px; font-size:11px; color:#6b6b6b`.

### Section header (opakující se vzor)
```
[● accent tečka s halo]  Nadpis   ———————————  [meta label vpravo]
```
accent tečka: `width:12px; height:12px; border-radius:50%` + `box-shadow: 0 0 0 4px <halo>`.

### Sklová karta (formulář poptávky)
`background: rgba(255,255,255,0.55); backdrop-filter: blur(18px) saturate(1.5); border:1px solid rgba(255,255,255,0.7); border-radius:26px` + jemný stín + inset highlight.

### Reaktivní pozadí
4 organické „blob" tvary, autonomní drift + parallax na myš/scroll. Volitelné (prop `reactiveBg`).

### Animace
- `floatUp`: opacity 0→1 + `translateY(20px)→0`.
- `navDrop`: nav spadne shora.
- Easing: `cubic-bezier(.2,.8,.25,1)`.
- Respektuj `prefers-reduced-motion`.

---

## 6. Struktura webu

### Stránka `Portfolio` (hlavní)
1. **Floating nav** — logo · Projekty · Kalkulačka · Kontakt (pill CTA).
2. **Hero** — badge „k dispozici pro nové projekty" (blikající tečka), H1 „Stavím weby a appky, které si na nic nehrajou.", podnadpis o stacku, CTA „Spočítat cenu webu" + „Moje projekty". 3 varianty layoutu (prop `heroVariant`: A klasik / B centrovaný / C asymetrický). Volitelný 3D lanyard prvek.
3. **Co dělám** — 3 služby jako řádky (viz sekce 7).
4. **Vybrané projekty** — featured karty, odkaz na všechny.
5. **Kalkulačka ceny** — interaktivní (viz sekce 8).
6. **API tipy** — seznam doporučených free API/služeb (viz sekce 9).
7. **O mně** — foto + bio + skill tagy.
8. **Poptávka / Spolupráce & dotazy** — sklový formulář.
9. **Footer** — „Máš projekt? Napiš mi.", e-mail, social s ikonami.

### Stránka `Projekty`
1. Floating nav (Domů · Kalkulačka · Kontakt).
2. Hlavička + filtry (typ, kontext) + vyhledávání.
3. **Projekty ve 2 skupinách:** „Pro klienty" (accent `#6f86d6`) a „Pro zábavu & soutěže" (accent `#e0a373`). Karty.
4. **Co teď kóduju** (GitHub sekce — viz sekce 10).
5. Detail projektu = modal (cover, tagy, popis, stack, screenshoty, odkazy).
6. Footer (shodný s hlavní).

---

## 7. Obsah — Co dělám (služby)

**Nadpis:** „Co dělám" · eyebrow „tři věci, pořádně"

1. **Weby s administrací** — `Next.js · CMS` — „Prezentační weby, kde si obsah (texty, fotky) měníte sami. Rychlé, čisté, žádný WordPress."
2. **Rezervační & vlastní systémy** — `Supabase · iCal` — „Rezervace, synchronizace obsazenosti s Booking.com a systémy na míru — přesně to, co potřebujete."
3. **Mobilní appky** — `Expo · RN` — „React Native / Expo — iOS i Android z jednoho kódu. Nativní pocit, jedna codebase."

---

## 8. Obsah — Kalkulačka ceny

**Typy projektu:**
- Statický web — Vizitka, do 3 stránek — od 0 Kč*
- Web s vlastní administrací — Sami si měníte texty, fotky a obsah — od 20 000 Kč
- Web s vlastním systémem — Web + váš vlastní systém na míru (rezervace, správa obsahu, e-mailové šablony, evidence…) — od 37 000 Kč
- Mobilní aplikace — React Native, iOS + Android — od 55 000 Kč*

**Rozsah:** 1–3 stránky (+0) · 4–7 stránek (+8 000) · 8+ stránek (+18 000)

**Doplňky:**
- Vícejazyčnost +4 000
- Napojení na AI (chatbot) +8 000
- E-shop / platby (Stripe) +12 000
- Blog / články +4 000
- Newsletter / emailing +3 000
- Animace & mikrointerakce +4 500
- SEO & výkon +3 500

**Logika:** subtotal = base + rozsah + doplňky. Rush (spěch) = ×1,2 zaokrouhleno na 500. Cílové rozpětí = base → base×1,18 (na 1000). Výstupní kontejner „orientační cena" je širší (`minmax(0, 560px)`).

---

## 9. Obsah — Doporučené API / služby

Kategorie: Vše · Backend · AI · Data · Mapy · E-mail

- **Supabase** (Backend) — Free tier navždy — „Postgres databáze, auth, storage a edge functions. Kompletní backend bez serveru."
- **Google Gemini** (AI) — Štědrý free tier — „Flash modely mají velký free tier — ideální na prototypy a AI featury bez nákladů."
- **Resend** (E-mail) — 3 000 / měsíc — „Transakční e-maily pro vývojáře. Čisté API, hezké React e-mail šablony."
- **Open Food Facts** (Data) — Zcela zdarma — „Otevřená databáze potravin s čárovými kódy a nutričními hodnotami. Bez API klíče."
- **OpenStreetMap** (Mapy) — Bez limitů Google — „Mapy a geokódování bez placených limitů Google Maps. Skvělé přes Leaflet."
- **TMDB** (Data) — Zdarma nekomerčně — „Filmy, seriály, obsazení a plakáty. Bohaté API pro nekomerční projekty."

---

## 10. Obsah — Projekty

Filtry typu: `Web · Mobilní app · AI · Systém/CMS`
Filtry kontextu: `Klientské · Vlastní produkt · Soutěž · Škola`

### Pro klienty (accent #6f86d6)
- **Chata Abertamy** (2026) — Web · Systém/CMS — Klientské
  Stack: Next.js · Supabase · iCal.
  „Web horské chaty s vlastním CMS a rezervačním systémem — iCal sync s Booking.com, správa obsazenosti."
- **PROCONOM** (2025–26) — Web · Systém/CMS — Klientské
  Stack: TypeScript · Syncfusion · Microsoft Entra ID.
  „Full stack práce na firemní platformě: TS strict refactoring, redesign frontendu, SSO přes Microsoft Entra ID, role & permissions."

### Pro zábavu & soutěže (accent #e0a373)
- **Yumi** (2025–26) — Mobilní app · AI — Vlastní produkt
  Stack: Expo · Supabase Edge Functions · Gemini Flash Lite + GPT-4o Mini · PostHog.
  „React Native/Expo kalorická appka s AI skenováním jídla (Magic Scan), barcode scan, gamifikace, freemium." Odkazy: App Store, Web.
- **TriAI** (2026) — AI — Soutěž
  Stack: Claude API (tool-use) · TypeScript.
  „Agentní triage systém pro urgentní příjem — Claude API s tool-use. Národní finále AI olympiády v Plzni." Odkaz: GitHub.
- **Lumio** (2026) — AI — Soutěž
  Stack: MediaPipe · Gemini 2.0 Flash.
  „Adaptivní bezdotyková herní platforma pro děti s autismem — MediaPipe hand tracking + Gemini 2.0 Flash. Vítěz regionálního kola." Odkaz: GitHub.

---

## 11. Obsah — GitHub sekce „Co teď kóduju"

Náhledová data, připraveno na napojení na GitHub API (`@bobcermak`).
- **Poslední commity** (repo, zpráva, kdy) — řádky s ikonou repozitáře v accent dlaždici.
- **Statistiky:** commitů tento měsíc · aktivních repozitářů · dní v řadě (streak) · PR čeká na review.
- **Jazyky:** barevný proužek + legenda — TypeScript `#6f86d6`, JavaScript `#e0a373`, CSS `#cebeec`, Python `#8ab98f`.

---

## 12. Obsah — O mně

Eyebrow „O mně". Foto/avatar vlevo.

„Je mi 19, studuju průmyslovku v Liberci a vedle školy dělám full stack development — freelance a v PROCONOM. Nové technologie se učím tak, že v nich rovnou stavím reálné produkty. Když zrovna nekóduju, lítám s dronem."

Skill tagy: TypeScript · React · Next.js · React Native · Supabase · .NET · Figma.

---

## 13. Obsah — Formulář (Spolupráce & dotazy)

Eyebrow „Spolupráce & dotazy", nadpis „Napiš mi.", podnadpis „Chceš se domluvit na spolupráci, nebo se jen na něco zeptat? Sem s tím — ozvu se osobně do 24 hodin, nezávazně."

Kontakty vlevo: ✉ ahoj@bobcermak.cz · ⚡ odpověď do 24 h · ◎ Praha · Liberec · online.

Pole: Jméno · E-mail (povinné) · „O co jde?" (pilulky: Spolupráce / Projekt na míru / Konzultace / Dotaz / Něco jiného) · Zpráva · GDPR checkbox. Honeypot proti spamu. Po odeslání „díky" stav. Tlačítko „Odeslat zprávu →".

---

## 14. Footer

Nadpis „Máš projekt? Napiš mi." (druhý řádek muted `#b3b1af`). E-mail `ahoj@bobcermak.cz`.
Social s ikonami (SVG, v zaoblených dlaždicích `34px, border-radius:10px, bílá + border`): **GitHub · LinkedIn · Email**.
Spodní řádek: „© 2026 Bob Čermák" + odkaz (open source / zpět na hlavní stránku).

---

## 15. Globální styly (reset)

```css
* { box-sizing: border-box; }
html { scroll-behavior: smooth; }
body { margin: 0; background: #ffffff; color: #111111;
  font-family: 'Montserrat', system-ui, sans-serif;
  -webkit-font-smoothing: antialiased; overflow-x: hidden; }
a { color: #111111; text-decoration: none; }
a:hover { color: #6b6b6b; }
::selection { background: #111111; color: #ffffff; }
```

---

*Poznámka: obrázky/screenshoty jsou drag-and-drop sloty (uživatel doplní vlastní). Odkazy projektů (`href: '#'`) čekají na reálné URL.*
--------
# Bob Čermák — Barevná paleta

## Neutrály (nesou ~95 % plochy)

| Účel | Hex |
|---|---|
| Text / primární (černá) | `#111111` |
| Hover černá / active | `#000000` |
| Sekundární text | `#6b6b6b` |
| Terciární / muted | `#9a9a9a` |
| Placeholder text | `#b0aeac` / `#b3b1af` |
| Číslice / muted grafiky | `#cfcdcb` / `#d0cecb` |
| Pozadí bílé | `#ffffff` |
| Pozadí off-white | `#fafaf8` · `#faf9f7` · `#f4f3f1` · `#f4f2ef` |
| Border světlý | `#eeecea` · `#e6e4e2` · `#eceae8` |
| Border střední | `#dcdad8` · `#d6d4d2` |

## Akcenty (jen v malých dávkách — tečky, proužky, grafy)

| Název | Hex |
|---|---|
| Levandulově modrá | `#96ace8` |
| Modrá (sytější) | `#6f86d6` |
| Broskvová | `#f3ccb2` |
| Broskvová (sytější) | `#e0a373` |
| Fialová | `#cebeec` |
| Zelená | `#8ab98f` |

## CSS proměnné

```css
:root {
  /* Neutrály */
  --ink: #111111;
  --ink-hover: #000000;
  --text-2: #6b6b6b;
  --text-3: #9a9a9a;
  --placeholder: #b0aeac;
  --muted-num: #cfcdcb;
  --bg: #ffffff;
  --bg-soft: #fafaf8;
  --bg-tint: #f4f3f1;
  --border: #e6e4e2;
  --border-mid: #dcdad8;

  /* Akcenty */
  --accent-blue: #96ace8;
  --accent-blue-strong: #6f86d6;
  --accent-peach: #f3ccb2;
  --accent-peach-strong: #e0a373;
  --accent-purple: #cebeec;
  --accent-green: #8ab98f;
}
```

**Pravidlo:** neutrály = 95 % plochy; akcenty jsou koření (logo grid, accent proužky karet, jazykový graf, section-header tečky). Nikdy velké gradientové plochy.