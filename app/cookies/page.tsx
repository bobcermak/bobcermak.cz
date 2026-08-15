import type { Metadata } from "next";
import LegalPage from "@/components/layout/legal/LegalPage";
import ConsentControls from "@/components/layout/legal/ConsentControls";
import { CONTACT_EMAIL } from "@/types/contact";

export const metadata: Metadata = {
  title: "Cookies",
  description: "Jaké cookies a měření bobcermak.cz používá, k čemu slouží a jak souhlas kdykoli změnit.",
  alternates: { canonical: "/cookies" },
  robots: { index: true, follow: true },
};
const CookiesPage = () => (
  <LegalPage title="Cookies" updated="13. 8. 2026" path="/cookies">
    <p>
      Krátká verze: <strong>bez vašeho souhlasu se tu nic neměří.</strong> Nezbytné věci web
      potřebuje k provozu, všechno ostatní se načte, až když kliknete na „Přijmout vše“.
    </p>
    <ConsentControls/>
    <h2>Co je nezbytné</h2>
    <p>
      Tyhle položky si web ukládá do prohlížeče sám a souhlas na ně nepotřebuje — bez nich by
      nefungoval nebo by vás otravoval dokola.
    </p>
    <ul>
      <li>
        <strong>Vaše volba u cookies</strong> — abych se neptal při každém načtení. Ukládá se do
        localStorage prohlížeče, ne do cookie, a neodchází nikam na server.
      </li>
      <li>
        <strong>Zavření nabídky slevy</strong> — drží se jen po dobu jedné návštěvy
        (sessionStorage).
      </li>
      <li>
        <strong>Technické údaje o požadavku</strong> (IP adresa, typ prohlížeče) zpracovává
        hosting při každém načtení stránky. Bez toho by web nešel doručit.
      </li>
      <li>
        <strong>Ochrana formulářů</strong> — u odeslané zprávy se krátkodobě eviduje IP adresa,
        aby web nešlo zaplavit spamem.
      </li>
    </ul>
    <h2>Co běží jen se souhlasem</h2>
    <ul>
      <li>
        <strong>Microsoft Clarity</strong> — anonymní měření návštěvnosti a chování na stránce.
        Ukazuje mi, kam lidé klikají a kde se v kalkulačce zaseknou, abych web mohl zlepšovat.
        Clarity si k tomu ukládá cookies do vašeho prohlížeče.
      </li>
    </ul>
    <p>
      Clarity <strong>neukládá jméno, e-mail ani nic, co jste vyplnili do formuláře</strong> —
      texty v polích jsou v nahrávkách maskované. Data se nikomu neprodávají a nepoužívají se
      k reklamnímu cílení. Provozovatelem je Microsoft Ireland Operations Limited, data se
      uchovávají nejdéle 13 měsíců a pak se automaticky mažou.
    </p>
    <h2>Co se nepoužívá vůbec</h2>
    <p>
      Žádné reklamní pixely, žádný remarketing, žádné sdílení dat s inzertními sítěmi. Web
      neprodává ani nepředává vaše údaje třetím stranám k jejich vlastním účelům.
    </p>
    <h2>Jak souhlas změnit</h2>
    <p>
      Kdykoli — přepínačem výš na téhle stránce. Cookies, které už Clarity vytvořil, můžete navíc
      smazat v nastavení prohlížeče spolu s ostatními daty webu.
    </p>
    <h2>Kdyby se to změnilo</h2>
    <p>
      Až by přibyl další měřicí nástroj, budete o něj požádáni znovu a tahle stránka se upraví.
      Do té doby platí, co je výše.
    </p>
    <p>
      Otázky posílejte na <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
    </p>
  </LegalPage>
);
export default CookiesPage;