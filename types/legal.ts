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
export const BUSINESS_NAME = "Bohuslav Čermák";
export const BUSINESS_ICO = "30107601";
export const BUSINESS_ADDRESS = "Janův Důl 29, 463 52 Janův Důl";
export const BUSINESS_REGISTRY = "Fyzická osoba podnikající dle živnostenského zákona, zapsaná v živnostenském rejstříku vedeném Magistrátem města Liberce";
export const ARES_URL = `https://ares.gov.cz/ekonomicke-subjekty?ico=${BUSINESS_ICO}`;