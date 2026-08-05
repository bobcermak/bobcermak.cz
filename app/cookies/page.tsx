import type { Metadata } from "next";
import LegalPage from "@/components/layout/legal/LegalPage";
import { CONTACT_EMAIL } from "@/types/contact";

export const metadata: Metadata = {
  title: "Cookies",
  description: "Jaké cookies bobcermak.cz používá. Spoiler: žádné sledovací.",
  alternates: { canonical: "/cookies" },
  robots: { index: true, follow: true },
};
const CookiesPage = () => (
  <LegalPage title="Cookies" updated="5. 8. 2026">
    <p>
      Krátká verze: <strong>tenhle web vám do prohlížeče nic neukládá.</strong> Žádné sledovací
      cookies, žádná analytika, žádné pixely reklamních sítí. Nemusíte tedy nic odsouhlasit a
      nenajdete tu ani otravnou lištu se souhlasem.
    </p>

    <h2>Proč tu žádná lišta není</h2>
    <p>
      Souhlas se vyžaduje u cookies, které nejsou nezbytné pro provoz webu — typicky u měření
      návštěvnosti a reklamy. Nic z toho tu neběží, takže není s čím souhlasit.
    </p>

    <h2>Co se přesto může uložit</h2>
    <ul>
      <li>
        <strong>Písma Google Fonts</strong> se načítají z externího serveru a prohlížeč si je
        ukládá do své mezipaměti. Není to cookie a neidentifikuje vás to.
      </li>
      <li>
        <strong>Technické údaje o požadavku</strong> (IP adresa, typ prohlížeče) zpracovává
        hosting při každém načtení stránky. Bez toho by web nešel doručit.
      </li>
    </ul>

    <h2>Kdyby se to změnilo</h2>
    <p>
      Až by na webu přibylo měření návštěvnosti, přibude s ním i lišta se souhlasem a tahle
      stránka se upraví. Do té doby platí, co je výše.
    </p>
    <p>
      Otázky posílejte na <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
    </p>
  </LegalPage>
);
export default CookiesPage;
