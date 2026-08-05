export type LegalLink = {
  href: string;
  label: string;
};
export const LEGAL_LINKS: LegalLink[] = [
  { href: "/zasady-ochrany-osobnich-udaju", label: "Zásady ochrany osobních údajů" },
  { href: "/cookies", label: "Cookies" },
  { href: "/obchodni-podminky", label: "Obchodní podmínky" },
];
export const SOURCE_REPO = "https://github.com/bobcermak/bobcermak.cz";