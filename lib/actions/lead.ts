"use server";

import { clientIp, isFlooding, isTracked, recordAttempt } from "@/lib/antiSpam";
import { calculatePrice } from "@/lib/calculator";
import { insertLead } from "@/lib/services/supabase/queries/leads";
import { sendLeadEmails } from "@/lib/services/resend/sendLeadEmails";
import { lastSendError } from "@/lib/services/resend/send";
import { calculatorExtras, PAGES_MAX, PAGES_MIN, projectTypes } from "@/types/calculator";
import { MIN_FILL_MS, type LeadSelection } from "@/types/lead";
import { formFailed, formSent, type FormState } from "@/types/formState";

const EMAIL = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
const isDev = process.env.NODE_ENV !== "production";
const dropAsBot = (reason: string, detail: string): FormState => {
  console.warn(`[lead] ZAHOZENO — ${detail}`);
  return isDev
    ? formFailed("form", `Zahozeno jako spam — ${reason}. Tuhle hlášku vidíš jen ve vývoji.`)
    : formSent(true);
};
export const submitLead = async (
  selection: LeadSelection,
  _prev: FormState,
  data: FormData
): Promise<FormState> => {
  if (data.get("company")) {
    return dropAsBot("honeypot", `honeypot vyplněn: "${data.get("company")}"`);
  }
  const elapsedMs = Number(data.get("elapsedMs"));
  if (Number.isFinite(elapsedMs) && elapsedMs < MIN_FILL_MS) {
    return dropAsBot("čas vyplnění", `odesláno za ${elapsedMs} ms`);
  }
  const ip = await clientIp();
  if (isTracked(ip) && (await isFlooding(ip))) {
    console.warn(`[lead] ZAHOZENO — příliš mnoho pokusů z ${ip}`);
    return formFailed("send", "Moc pokusů po sobě. Zkus to prosím za chvíli.");
  }
  const picked = Array.isArray(selection.extras) ? selection.extras : [];
  const lead = {
    email: String(data.get("email") ?? "").trim().slice(0, 200),
    name: String(data.get("name") ?? "").trim().slice(0, 100),
    type: projectTypes.find((item) => item.id === selection.type) ?? projectTypes[0],
    pages: Math.min(
      PAGES_MAX,
      Math.max(PAGES_MIN, Math.round(Number(selection.pages) || PAGES_MIN))
    ),
    extras: calculatorExtras.filter((extra) => picked.includes(extra.id)),
    rush: selection.rush === true,
  };
  if (!EMAIL.test(lead.email)) return formFailed("form", "Zadejte platný e-mail.");
  if (data.get("gdpr") !== "on") {
    return formFailed("form", "Potřebuju souhlas se zpracováním e-mailu.");
  }
  if (isTracked(ip)) await recordAttempt(ip);
  console.info(`[lead] Přijato od ${lead.email}`);
  const result = calculatePrice(lead);
  const stored = await insertLead({
    source: "kalkulacka",
    email: lead.email,
    name: lead.name,
    projectType: lead.type.id,
    pages: lead.pages,
    extras: lead.extras.map((extra) => extra.id),
    rush: lead.rush,
    yearly: true,
    priceLabel: result.rangeLabel,
    priceLow: lead.type.base + lead.extras.reduce((sum, extra) => sum + extra.price, 0),
  });
  const { customerSent } = await sendLeadEmails({ ...lead, result });
  if (!stored && !customerSent) {
    return formFailed(
      "send",
      "Odeslání se nepovedlo. Zkus to prosím znovu, nebo mi napiš přímo na e-mail."
    );
  }
  if (!customerSent && isDev) console.warn("[lead] Potvrzení neodešlo:", lastSendError);
  return formSent(customerSent);
};