import { LEGAL_LINKS } from "./legal";

export const SITE_URL = "https://bobcermak.cz";
export const SITE_NAME = "Bob Čermák";
export const SITE_TAGLINE = "Full stack developer — weby, systémy & mobilní appky";
export const SITE_DESCRIPTION =
  "Bob Čermák — full stack developer z Prahy a Liberce. Stavím weby, rezervační systémy a mobilní appky v Next.js, React Native a Supabase. Od nápadu po nasazení.";
export const SITE_LOCALE = "cs_CZ";
export const SITE_LANG = "cs";
export const absoluteUrl = (path: string) => new URL(path, SITE_URL).toString();
export type SiteRoute = {
  path: string;
  label: string;
  priority: number;
  changeFrequency: "daily" | "weekly" | "monthly" | "yearly";
  summary: string;
};
export const SITE_ROUTES: SiteRoute[] = [
  {
    path: "/",
    label: "Domů",
    priority: 1,
    changeFrequency: "weekly",
    summary:
      "Přehled služeb (weby s administrací, rezervační a vlastní systémy, mobilní aplikace), kalkulačka orientační ceny, doporučená free API, medailonek a kontaktní formulář.",
  },
  {
    path: "/projekty",
    label: "Projekty",
    priority: 0.9,
    changeFrequency: "weekly",
    summary:
      "Katalog realizovaných projektů rozdělený na klientské zakázky a vlastní produkty či soutěže. U každého technologický stack, popis a odkazy. Součástí je i živá aktivita z GitHubu.",
  },
  ...LEGAL_LINKS.map((link) => ({
    path: link.href,
    label: link.label,
    priority: 0.3,
    changeFrequency: "yearly" as const,
    summary: `Právní dokument: ${link.label.toLowerCase()}.`,
  })),
];