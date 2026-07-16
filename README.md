# bobcermak.cz | Portfolio — Bob Čermák

![Náhled portfolia bobcermak.cz](/)

> 🌐 Osobní portfolio – moderní, responzivní, postavené v **Next.js**

[🚀 Otevřít web](https://bobcermak.cz)

> 🛠️ Portfolio full stack developera — weby s administrací, rezervační & vlastní systémy a mobilní appky. Postaveno v **Next.js 16** (App Router) + **TypeScript**.

---

## O projektu

Jsem **Bob Čermák**, 19, full stack developer z Prahy a Liberce — freelance a v PROCONOM. Tenhle web je moje portfolio: ukazuje, co dělám, za kolik, a na čem právě teď pracuju. Žádný korporátní žargon, žádné stockové fotky — jen věci, co si na nic nehrajou.

Web zahrnuje:

- 🌐 **prezentaci služeb** (Weby s administrací · Rezervační & vlastní systémy · Mobilní appky),
- 🧮 interaktivní **kalkulačku ceny** webu / appky,
- 💼 **přehled projektů** (klientské i vlastní / soutěžní),
- ⚡ sekci **„Co teď kóduju"** připravenou na napojení na GitHub API,
- ✉️ **poptávkový formulář** s odesíláním e-mailů.

---

## Tech stack

| Vrstva | Technologie |
|---|---|
| Framework | Next.js 16 (App Router), TypeScript (strict) |
| Styling | Tailwind CSS v4 (`@theme`, design tokeny), `tailwind-merge` |
| Animace | GSAP + `@gsap/react`, Lenis (smooth scroll) |
| DB / Auth / Storage | Supabase (Postgres, Auth, Storage) |
| Kalendář a data | `react-day-picker`, `date-fns` |
| Ikony | `@phosphor-icons/react` |
| E-maily | Resend + `@react-email/components` |

---

## Design

Vizuální styl staví na neutrální paletě (černá `#111111`, teplé off-white plochy) doplněné o drobné akcenty (levandulová, broskvová, fialová) — **neutrály nesou ~95 % plochy, akcenty jsou jen koření** (logo tečky, proužky karet, grafy). Typografie: **Montserrat**. Kompletní design systém a obsah jsou v [`AGENTS.md`](AGENTS.md).

---

## Spuštění projektu

```bash
npm install
npm run dev        # vývojový server (http://localhost:3000)
npm run build      # produkční build
npm run start      # spuštění buildu
npm run lint       # eslint
```

---

## Struktura

```
app/                # routy (App Router), globals.css, layout, loading, not-found
components/
  buttons/          # sdílené UI (Button s variantami primary/secondary/tertiary/danger/light)
  layout/           # FloatNav (plovoucí navigace), HeroSection, Footer
  layout/wrappers/  # PageWrapper (Lenis + GSAP), RevealSection
  animations/       # znovupoužitelné animační hooky (useRevealAnimation přes GSAP)
public/images/      # statická obrazová data
```

---

## Licence

Open source pod licencí **MIT** — kód si můžeš prohlédnout, učit se z něj i použít ve vlastních projektech. Podrobnosti v souboru [LICENSE](LICENSE.txt).

---

**Autor:** Bob Čermák 🛠️ · [bobcermak.cz](https://bobcermak.cz) · [@bobcermak](https://github.com/bobcermak) · ahoj@bobcermak.cz

> ⚡ „Stavím weby a appky, které si na nic nehrajou."
