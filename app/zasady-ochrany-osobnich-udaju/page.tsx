import type { Metadata } from "next";
import LegalPage from "@/components/layout/legal/LegalPage";
import { CONTACT_EMAIL, CONTACT_PHONE, CONTACT_PHONE_HREF } from "@/types/contact";

export const metadata: Metadata = {
  title: "Zásady ochrany osobních údajů",
  description: "Jaké údaje sbírám přes formuláře na bobcermak.cz, proč je zpracovávám a jak s nimi nakládám.",
  alternates: { canonical: "/zasady-ochrany-osobnich-udaju" },
  robots: { index: true, follow: true },
};
const PrivacyPage = () => (
  <LegalPage title="Zásady ochrany osobních údajů" updated="5. 8. 2026">
    <p>
      Tenhle web provozuju já, Bob Čermák. Když mi přes formulář napíšete, zpracovávám vaše údaje
      jako správce. Níže je popsané přesně to, co se s nimi děje — žádné obecné fráze.
    </p>

    <h2>Kdo je správce</h2>
    <p>
      Bob Čermák, kontakt{" "}
      <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>, telefon{" "}
      <a href={CONTACT_PHONE_HREF}>{CONTACT_PHONE}</a>.
    </p>

    <h2>Jaké údaje sbírám</h2>
    <ul>
      <li>
        <strong>Kalkulačka ceny:</strong> e-mail, nepovinně jméno a parametry, které jste si
        naklikali (typ projektu, rozsah, doplňky).
      </li>
      <li>
        <strong>Kontaktní formulář:</strong> e-mail, nepovinně jméno, téma a text zprávy.
      </li>
    </ul>
    <p>
      Nic dalšího nesbírám. Web nemá analytiku, neměří návštěvnost ani neprofiluje návštěvníky.
    </p>

    <h2>Proč je zpracovávám</h2>
    <p>
      Jediný důvod je odpovědět vám na poptávku nebo dotaz a případně se domluvit na spolupráci.
      Právním základem je váš souhlas, který udělujete zaškrtnutím políčka ve formuláři. Souhlas
      můžete kdykoli odvolat e-mailem — údaje pak smažu.
    </p>

    <h2>Komu se dostanou</h2>
    <p>Používám dvě služby, které fungují jako zpracovatelé:</p>
    <ul>
      <li>
        <a href="https://supabase.com" target="_blank" rel="noopener noreferrer">Supabase</a> —
        databáze, ve které je poptávka uložená. Server ve Frankfurtu (EU).
      </li>
      <li>
        <a href="https://resend.com" target="_blank" rel="noopener noreferrer">Resend</a> —
        odeslání potvrzovacího e-mailu. Server v Irsku (EU).
      </li>
    </ul>
    <p>Nikomu jinému údaje nepředávám a neprodávám je.</p>

    <h2>Jak dlouho je držím</h2>
    <p>
      Poptávky si nechávám po dobu, kdy může komunikace pokračovat, nejdéle 3 roky od poslední
      zprávy. Pak je mažu. Když si o smazání řeknete dřív, udělám to bez zbytečného odkladu.
    </p>

    <h2>Vaše práva</h2>
    <ul>
      <li>vědět, jaké údaje o vás mám, a dostat jejich kopii</li>
      <li>nechat je opravit nebo smazat</li>
      <li>omezit jejich zpracování nebo proti němu vznést námitku</li>
      <li>odvolat souhlas</li>
      <li>podat stížnost u Úřadu pro ochranu osobních údajů</li>
    </ul>
    <p>
      Stačí napsat na <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. Ozvu se nejpozději
      do 30 dnů.
    </p>
  </LegalPage>
);
export default PrivacyPage;
