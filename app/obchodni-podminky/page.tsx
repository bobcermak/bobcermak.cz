import type { Metadata } from "next";
import LegalPage from "@/components/layout/legal/LegalPage";
import { formatCzk } from "@/lib/calculator";
import { CONTACT_EMAIL } from "@/types/contact";
import { YEARLY_PRICE } from "@/types/calculator";

export const metadata: Metadata = {
  title: "Obchodní podmínky",
  description: "Jak probíhá spolupráce, co znamená cena z kalkulačky a co platí u zakázek.",
  alternates: { canonical: "/obchodni-podminky" },
  robots: { index: true, follow: true },
};
const TermsPage = () => (
  <LegalPage title="Obchodní podmínky" updated="5. 8. 2026">
    <p>
      Tenhle text popisuje, jak u mě probíhá spolupráce. Nenahrazuje smlouvu — tu na každou
      zakázku uzavíráme zvlášť a má přednost před tím, co je tady.
    </p>
    <h2>Kdo je dodavatel</h2>
    <p>
      Bohuslav Čermák, kontakt <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. Fakturační
      údaje najdete na každé faktuře. <strong>Nejsem plátce DPH</strong> — všechny ceny, které
      ode mě dostanete, jsou konečné a DPH se k nim nepřipočítává.
    </p>
    <h2>Cena z kalkulačky je orientační</h2>
    <p>
      Částka, kterou vám kalkulačka spočítá, je odhad — ne nabídka a ne závazek. Slouží k tomu,
      abyste věděli, v jakém řádu se projekt pohybuje. Závaznou cenu dostanete až po tom, co si
      projdeme zadání.
    </p>
    <h2>Jak spolupráce běží</h2>
    <ul>
      <li>Napíšete přes formulář nebo na e-mail. Ozvu se do 24 hodin.</li>
      <li>Probereme zadání, rozsah a termín. Nezávazně.</li>
      <li>Pošlu nabídku s pevnou cenou a odhadem termínu.</li>
      <li>Po odsouhlasení se pustím do práce a průběžně vám ukazuju, jak to roste.</li>
      <li>Předání, vaše připomínky, nasazení.</li>
    </ul>
    <h2>Poptávka nic nezavazuje</h2>
    <p>
      Odesláním formuláře si nic neobjednáváte a k ničemu se nezavazujete. Závazek vzniká teprve
      odsouhlasením konkrétní nabídky.
    </p>
    <h2>Změny v zadání</h2>
    <p>
      Když se v průběhu rozsah rozšíří nad rámec odsouhlasené nabídky, domluvíme se na ceně a
      termínu dřív, než na tom začnu dělat. Nikdy nic nepřifakturuju bez předchozí domluvy.
    </p>
    <h2>Placení a záloha</h2>
    <p>
      Ceny jsou konečné, nejsem plátce DPH. Faktury jsou splatné do dvou týdnů od vystavení. Jestli
      se platí záloha a jak velká, se domlouváme u každé zakázky zvlášť — u malých projektů
      obvykle žádná není, u větších se na ní dohodneme předem a vždycky ji máte v nabídce,
      kterou odsouhlasíte. Nikdy vás nepřekvapí až na faktuře.
    </p>
    <h2>Práva ke kódu</h2>
    <p>
      Autorská práva ke zdrojovému kódu zůstávají mně. Vy dostáváte právo výsledek používat pro
      vlastní provoz — bez omezení na čas a i po skončení spolupráce. Kód není váš k dalšímu
      prodeji ani k šíření dál.
    </p>
    <p>
      Úpravy, rozšíření a zásahy do kódu dělám já. Není to schválnost — je to jediný způsob, jak
      vám můžu ručit za to, že věci fungují, a opravovat chyby zdarma. Zásah někoho jiného do
      kódu tuhle záruku ruší.
    </p>
    <p>
      Části řešení, které nejsou šité na míru přímo vám (moje komponenty, pomocné knihovny,
      obecné postupy), používám dál i na jiných projektech.
    </p>
    <p>
      Potřebujete-li kód vlastnit celý — třeba kvůli internímu týmu nebo prodeji firmy — jde to
      domluvit jako samostatný převod práv za příplatek. Napište mi a probereme to.
    </p>
    <h2>Provoz a údržba</h2>
    <p>
      Roční správa je součástí každé zakázky, není to volitelný doplněk. Stojí{" "}
      {formatCzk(YEARLY_PRICE)} Kč/rok, běží od předání a obsahuje hosting, e-mailovou doménu,
      opravy a aktualizace. Cena z kalkulačky ji už započítanou má. Fakturuje se rok dopředu.
    </p>
    <p>
      Když platba za další rok nedorazí, ozvu se vám a upozorním na to. Od té výzvy máte 14 dnů na
      doplacení. Teprve když ani potom platba nedorazí a nedomluvíme se jinak, web přestane běžet.
      Nikdy nic nevypínám bez předchozího upozornění.
    </p>
    <p>
      Po vypnutí držím zálohu dat 12 měsíců pro případ, že se domluvíme na obnovení — pak ji mažu.
      Export dat vám na vyžádání pošlu kdykoliv.
    </p>
    <p>
      Placené služby třetích stran nad rámec toho (platební brána, externí API, placené licence)
      jdou na účet klienta, pokud se nedomluvíme jinak. Vždycky vám dopředu řeknu, co to bude
      obnášet.
    </p>
    <h2>Reklamace</h2>
    <p>
      Když po předání narazíte na chybu proti odsouhlasenému zadání, opravím ji zdarma. Napište
      na <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> a ozvu se do 24 hodin.
    </p>
  </LegalPage>
);
export default TermsPage;