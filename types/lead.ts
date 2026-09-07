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
    title: "Zadání",
    desc: `ozvu se do ${REPLY_WITHIN_HOURS} h a ujasníme si rozsah`,
  },
  {
    title: "Návrh",
    desc: "připravím první návrh a doladíme ho spolu",
  },
  {
    title: "Vývoj",
    desc: "odsouhlasený návrh naprogramuju od A do Z",
  },
  {
    title: "Úpravy",
    desc: "průběžně ukazuju postup a zapracuju připomínky",
  },
  {
    title: "Spuštění",
    desc: "nasadím projekt naživo a předám přístupy",
  },
];