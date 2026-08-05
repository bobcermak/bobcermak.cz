import { NextResponse } from "next/server";
import { clientIp, isFlooding, recordAttempt } from "@/lib/antiSpam";
import { insertMessage } from "@/lib/services/supabase/queries/messages";
import { sendContactEmail } from "@/lib/services/resend/sendContactEmail";
import { lastSendError } from "@/lib/services/resend/send";
import { CONTACT_TOPICS, DEFAULT_TOPIC, MESSAGE_MAX, type ContactPayload } from "@/types/contact";
import { MIN_FILL_MS, type LeadResponse } from "@/types/lead";

const EMAIL = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
const isDev = process.env.NODE_ENV !== "production";
const fail = (error: string, status: number) =>
  NextResponse.json<LeadResponse>({ ok: false, error }, { status });
const dropAsBot = (reason: string, detail: string) => {
  console.warn(`[contact] ZAHOZENO — ${detail}`);
  return isDev
    ? fail(`Zahozeno jako spam — ${reason}. Tuhle hlášku vidíš jen ve vývoji.`, 400)
    : NextResponse.json<LeadResponse>({ ok: true, confirmationSent: true });
};
const normalize = (payload: Partial<ContactPayload>) => ({
  email: String(payload.email ?? "").trim(),
  name: String(payload.name ?? "").trim().slice(0, 100),
  message: String(payload.message ?? "").trim().slice(0, MESSAGE_MAX),
  topic: CONTACT_TOPICS.find((item) => item === payload.topic) ?? DEFAULT_TOPIC,
});
export const POST = async (request: Request) => {
  let payload: Partial<ContactPayload>;
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
    console.warn(`[contact] ZAHOZENO — příliš mnoho pokusů z ${ip}`);
    return fail("Moc pokusů po sobě. Zkus to prosím za chvíli.", 429);
  }
  const contact = normalize(payload);
  if (!EMAIL.test(contact.email)) return fail("Zadejte platný e-mail.", 400);
  if (!contact.message) return fail("Napište prosím pár vět, s čím můžu pomoct.", 400);
  if (payload.gdpr !== true) return fail("Potřebuju souhlas se zpracováním údajů.", 400);
  recordAttempt(ip);
  console.info(`[contact] Přijato od ${contact.email}`);
  const stored = await insertMessage(contact);
  const { confirmationSent } = await sendContactEmail(contact);
  if (!stored && !confirmationSent) {
    return fail("Odeslání se nepovedlo. Zkus to prosím znovu, nebo mi napiš přímo na e-mail.", 502);
  }
  if (!confirmationSent && isDev) {
    return NextResponse.json({ ok: true, confirmationSent: false, debug: lastSendError });
  }
  return NextResponse.json<LeadResponse>({ ok: true, confirmationSent });
};