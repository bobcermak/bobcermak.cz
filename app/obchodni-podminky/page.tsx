import type { Metadata } from "next";
import LegalPage from "@/components/layout/legal/LegalPage";
import { CONTACT_EMAIL } from "@/types/contact";

/*
 * POZOR — než tohle půjde do produkce, projdi si to a doplň:
 *   • IČO a sídlo (fakturační údaje)
 *   • jestli jsi plátce DPH
 *   • splatnost faktur a případnou zálohu
 *   • kdy přechází autorská práva ke kódu na klienta
 * Text níže popisuje jen to, co web sám slibuje. Není to právní posudek.
 */
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
      Bob Čermák, kontakt <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. Fakturační
      údaje najdete na každé faktuře.
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

    <h2>Provoz a údržba</h2>
    <p>
      Hosting, doména a služby třetích stran (databáze, e-mailová brána, platební brána) běží na
      účet klienta, pokud se nedomluvíme jinak. Roční správu si můžete přiobjednat — obsahuje
      hosting, e-mailovou doménu, opravy a aktualizace.
    </p>

    <h2>Reklamace</h2>
    <p>
      Když po předání narazíte na chybu proti odsouhlasenému zadání, opravím ji zdarma. Napište
      na <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> a ozvu se do 24 hodin.
    </p>
  </LegalPage>
);
export default TermsPage;
