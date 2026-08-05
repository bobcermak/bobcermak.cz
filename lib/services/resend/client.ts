import { Resend } from "resend";

const FALLBACK_FROM = "Bob Čermák <onboarding@resend.dev>";
export const getResend = () => {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[resend] Chybí RESEND_API_KEY — e-maily se neodešlou.");
    return null;
  }
  return new Resend(apiKey);
};
export const calculatorFrom = () => process.env.CALCULATOR_FROM_EMAIL || FALLBACK_FROM;
export const contactFrom = () => process.env.CONTACT_FROM_EMAIL || FALLBACK_FROM;
export const ownerEmail = () => process.env.LEAD_TO_EMAIL ?? "";