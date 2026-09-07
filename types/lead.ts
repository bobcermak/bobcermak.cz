import type { CalculatorType } from "@/lib/calculator";

export type LeadSelection = {
  type: CalculatorType;
  pages: number;
  extras: string[];
  rush: boolean;
};
export const FALLBACK_CONTACT = "bob.cermak.dev@gmail.com";
export const REPLY_WITHIN_HOURS = 24;
export const MIN_FILL_MS = 800;
export type ProcessStep = {
  title: string;
  desc: string;
};
export const PROCESS_STEPS: ProcessStep[] = [
  {
    title: "Proberem zadání",
    desc: `Ozvu se ti do ${REPLY_WITHIN_HOURS} hodin, zeptám se na detaily a ujasníme si rozsah.`,
  },
  {
    title: "Návrh",
    desc: "Připravím první návrh a doladíme ho spolu, dokud nebude sedět.",
  },
  {
    title: "Vývoj",
    desc: "Odsouhlasený návrh naprogramuju od začátku do konce.",
  },
  {
    title: "Konzultace a úpravy",
    desc: "Průběžně ti ukazuju, jak to roste, a zapracuju připomínky.",
  },
  {
    title: "Spuštění",
    desc: "Nasadím projekt naživo, předám přístupy a ukážu, jak s ním pracovat.",
  },
];