import { NextResponse } from "next/server";
import { clientIp, isFlooding, recordAttempt } from "@/lib/antiSpam";
import { calculatePrice } from "@/lib/calculator";
import { insertLead } from "@/lib/services/supabase/queries/leads";
import { sendLeadEmails } from "@/lib/services/resend/sendLeadEmails";
import { lastSendError } from "@/lib/services/resend/send";
import { calculatorExtras, PAGES_MAX, PAGES_MIN, projectTypes } from "@/types/calculator";
import { MIN_FILL_MS, type LeadPayload, type LeadResponse } from "@/types/lead";

const EMAIL = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
const isDev = process.env.NODE_ENV !== "production";
const fail = (error: string, status: number) =>
  NextResponse.json<LeadResponse>({ ok: false, error }, { status });
const dropAsBot = (reason: string, detail: string) => {
  console.warn(`[lead] ZAHOZENO — ${detail}`);
  return isDev
    ? fail(`Zahozeno jako spam — ${reason}. Tuhle hlášku vidíš jen ve vývoji.`, 400)
    : NextResponse.json<LeadResponse>({ ok: true, confirmationSent: true });
};
const normalize = (payload: Partial<LeadPayload>) => {
  const picked = Array.isArray(payload.extras) ? payload.extras : [];
  return {
    email: String(payload.email ?? "").trim(),
    name: String(payload.name ?? "").trim().slice(0, 100),
    type: projectTypes.find((item) => item.id === payload.type) ?? projectTypes[0],
    pages: Math.min(PAGES_MAX, Math.max(PAGES_MIN, Math.round(Number(payload.pages) || PAGES_MIN))),
    extras: calculatorExtras.filter((extra) => picked.includes(extra.id)),
    rush: payload.rush === true,
    yearly: payload.yearly === true,
  };
};
export const POST = async (request: Request) => {
  let payload: Partial<LeadPayload>;
  try {
    payload = await request.json();
  } catch {
    return fail("Požadavek se nepodařilo přečíst.", 400);
  }
  if (payload.company) {
    return dropAsBot("honeypot", `honeypot vyplněn: "${payload.company}" (${payload.email})`);
  }
  if (typeof payload.elapsedMs === "number" && payload.elapsedMs < MIN_FILL_MS) {
    return dropAsBot("čas vyplnění", `odesláno za ${payload.elapsedMs} ms (${payload.email})`);
  }
  const ip = clientIp(request);
  if (isFlooding(ip)) {
    console.warn(`[lead] ZAHOZENO — příliš mnoho pokusů z ${ip}`);
    return fail("Moc pokusů po sobě. Zkus to prosím za chvíli.", 429);
  }
  const lead = normalize(payload);
  if (!EMAIL.test(lead.email)) return fail("Zadejte platný e-mail.", 400);
  if (payload.gdpr !== true) return fail("Potřebuju souhlas se zpracováním e-mailu.", 400);
  recordAttempt(ip);
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
    yearly: lead.yearly,
    priceLabel: result.rangeLabel,
    priceLow: lead.type.base + lead.extras.reduce((sum, extra) => sum + extra.price, 0),
  });
  const { customerSent } = await sendLeadEmails({ ...lead, result });
  // Ztracená je poptávka jen tehdy, když ji nemám ani v databázi, ani v kopii e-mailu.
  if (!stored && !customerSent) {
    return fail("Odeslání se nepovedlo. Zkus to prosím znovu, nebo mi napiš přímo na e-mail.", 502);
  }
  if (!customerSent && isDev) {
    return NextResponse.json({ ok: true, confirmationSent: false, debug: lastSendError });
  }
  return NextResponse.json<LeadResponse>({ ok: true, confirmationSent: customerSent });
};