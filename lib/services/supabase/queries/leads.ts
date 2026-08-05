import { getServerSupabase } from "../server";
import type { CalculatorType } from "@/lib/calculator";

export type LeadSource = "kalkulacka" | "dotazy";
export type LeadRow = {
  source: LeadSource;
  email: string;
  name: string;
  projectType: CalculatorType;
  pages: number;
  extras: string[];
  rush: boolean;
  yearly: boolean;
  priceLabel: string;
  priceLow: number;
};
export const insertLead = async (lead: LeadRow): Promise<boolean> => {
  const supabase = getServerSupabase();
  if (!supabase) return false;
  const { error } = await supabase.from("leads").insert({
    source: lead.source,
    email: lead.email,
    name: lead.name || null,
    project_type: lead.projectType,
    pages: lead.pages,
    extras: lead.extras,
    rush: lead.rush,
    yearly: lead.yearly,
    price_label: lead.priceLabel,
    price_low: lead.priceLow,
    status: "new",
  });
  if (error) {
    console.error("[leads] Zápis selhal:", error.message);
    return false;
  }
  console.info("[leads] Uloženo");
  return true;
};