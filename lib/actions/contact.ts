"use server";

import { clientIp, isFlooding, isTracked, recordAttempt } from "@/lib/antiSpam";
import { insertMessage } from "@/lib/services/supabase/queries/messages";
import { sendContactEmail } from "@/lib/services/resend/sendContactEmail";
import { lastSendError } from "@/lib/services/resend/send";
import { CONTACT_TOPICS, DEFAULT_TOPIC, MESSAGE_MAX, type ContactTopic } from "@/types/contact";
import { MIN_FILL_MS } from "@/types/lead";
import { PROMO_PARAM, PROMO_PARAM_VALUE } from "@/types/promo";
import { formFailed, formSent, type FormState } from "@/types/formState";

const EMAIL = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
const isDev = process.env.NODE_ENV !== "production";
const text = (data: FormData, key: string, max: number) =>
  String(data.get(key) ?? "").trim().slice(0, max);
const dropAsBot = (reason: string, detail: string): FormState => {
  console.warn(`[contact] ZAHOZENO — ${detail}`);
  return isDev
    ? formFailed("form", `Zahozeno jako spam — ${reason}. Tuhle hlášku vidíš jen ve vývoji.`)
    : formSent(true);
};
export const submitContact = async (_prev: FormState, data: FormData): Promise<FormState> => {
  if (data.get("company")) {
    return dropAsBot("honeypot", `honeypot vyplněn: "${data.get("company")}"`);
  }
  const elapsedMs = Number(data.get("elapsedMs"));
  if (Number.isFinite(elapsedMs) && elapsedMs < MIN_FILL_MS) {
    return dropAsBot("čas vyplnění", `odesláno za ${elapsedMs} ms`);
  }
  const ip = await clientIp();
  if (isTracked(ip) && (await isFlooding(ip))) {
    console.warn(`[contact] ZAHOZENO — příliš mnoho pokusů z ${ip}`);
    return formFailed("send", "Moc pokusů po sobě. Zkus to prosím za chvíli.");
  }
  const rawTopic = String(data.get("topic") ?? "");
  const contact = {
    email: text(data, "email", 200),
    name: text(data, "name", 100),
    message: text(data, "message", MESSAGE_MAX),
    topic: (CONTACT_TOPICS.find((item) => item === rawTopic) ?? DEFAULT_TOPIC) as ContactTopic,
  };
  if (!EMAIL.test(contact.email)) return formFailed("form", "Zadejte platný e-mail.");
  if (!contact.message) {
    return formFailed("form", "Napište prosím pár vět, s čím můžu pomoct.");
  }
  if (data.get("gdpr") !== "on") {
    return formFailed("form", "Potřebuju souhlas se zpracováním údajů.");
  }
  if (isTracked(ip)) await recordAttempt(ip);
  const promo = data.get(PROMO_PARAM) === PROMO_PARAM_VALUE;
  console.info(`[contact] Přijato od ${contact.email}${promo ? " — nárok na slevu" : ""}`);
  const stored = await insertMessage(contact);
  const { confirmationSent } = await sendContactEmail({ ...contact, promo });
  if (!stored && !confirmationSent) {
    return formFailed(
      "send",
      "Odeslání se nepovedlo. Zkus to prosím znovu, nebo mi napiš přímo na e-mail."
    );
  }
  if (!confirmationSent && isDev) console.warn("[contact] Potvrzení neodešlo:", lastSendError);
  return formSent(confirmationSent);
};