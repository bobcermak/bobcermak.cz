import type { Metadata } from "next";
import Link from "next/link";
import LegalPage from "@/components/layout/legal/LegalPage";
import { CONTACT_EMAIL, CONTACT_PHONE, CONTACT_PHONE_HREF } from "@/types/contact";

export const metadata: Metadata = {
  title: "Zásady ochrany osobních údajů",
  description: "Jaké údaje sbírám přes formuláře na bobcermak.cz, proč je zpracovávám a jak s nimi nakládám.",
  alternates: { canonical: "/zasady-ochrany-osobnich-udaju" },
  robots: { index: true, follow: true },
};
const PrivacyPage = () => (
  <LegalPage title="Zásady ochrany osobních údajů" updated="13. 8. 2026" path="/zasady-ochrany-osobnich-udaju">
    <p>
      Tenhle web provozuju já, Bohuslav Čermák. Když mi přes formulář napíšete, zpracovávám vaše údaje
      jako správce. Níže je popsané přesně to, co se s nimi děje — žádné obecné fráze.
    </p>
    <h2>Kdo je správce</h2>
    <p>
      Bohuslav Čermák, kontakt{" "}
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
      Nad rámec formulářů se měří návštěvnost — ale <strong>jen pokud k tomu dáte souhlas</strong>{" "}
      v liště, která vyskočí při první návštěvě. Měření je anonymní, neváže se na vaše jméno ani
      e-mail a nepoužívá se k profilování ani k reklamě. Podrobnosti a přepínač souhlasu najdete
      na stránce <Link href="/cookies">Cookies</Link>.
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
      <li>
        <a href="https://clarity.microsoft.com" target="_blank" rel="noopener noreferrer">
          Microsoft Clarity
        </a>{" "}
        — anonymní měření návštěvnosti. Zapne se výhradně s vaším souhlasem, provozuje ho
        Microsoft Ireland Operations Limited a data se mažou po 13 měsících.
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