import type { CalculatorType } from "@/lib/calculator";

export type LeadSelection = {
  type: CalculatorType;
  pages: number;
  extras: string[];
  rush: boolean;
  yearly: boolean;
};
export type LeadPayload = LeadSelection & {
  email: string;
  name: string;
  gdpr: boolean;
  company: string;
};
export type LeadResponse = { ok: true } | { ok: false; error: string };
export const LEAD_ENDPOINT = "/api/lead";
export const REPLY_WITHIN_HOURS = 24;