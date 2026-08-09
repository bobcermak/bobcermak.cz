import type { CalculatorType } from "@/lib/calculator";

export type LeadSelection = {
  type: CalculatorType;
  pages: number;
  extras: string[];
  rush: boolean;
  yearly: boolean;
};
export const FALLBACK_CONTACT = "bob.cermak.dev@gmail.com";
export const REPLY_WITHIN_HOURS = 24;
export const MIN_FILL_MS = 800;