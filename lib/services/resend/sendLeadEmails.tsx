import LeadCustomerEmail from "@/components/emails/LeadCustomerEmail";
import { ACCENT_HEX } from "@/components/emails/emailTheme";
import { calculatorFrom, getResend, ownerEmail } from "./client";
import { sendEmail } from "./send";
import { getSiteSettings } from "@/lib/services/supabase/queries/siteSettings";
import type { CalculatorResult } from "@/lib/calculator";
import type { ProjectType } from "@/types/calculator";
import { REPLY_WITHIN_HOURS } from "@/types/lead";

export type LeadEmailArgs = {
  email: string;
  name: string;
  type: ProjectType;
  result: CalculatorResult;
  promo?: boolean;
};
export type LeadEmailOutcome = {
  customerSent: boolean;
};
export const sendLeadEmails = async (args: LeadEmailArgs): Promise<LeadEmailOutcome> => {
  const resend = getResend();
  const owner = ownerEmail();
  if (!resend || !owner) {
    console.error("[resend] Chybí klient nebo LEAD_TO_EMAIL — e-mail se neodešle.");
    return { customerSent: false };
  }
  const settings = await getSiteSettings();
  const subject = `Potvrzení ceny${args.promo ? ` · ${settings.promoSubjectTag}` : ""} — ozvu se do ${REPLY_WITHIN_HOURS} hodin`;
  const email = (
    <LeadCustomerEmail
      name={args.name}
      result={args.result}
      promo={args.promo}
      typeLabel={args.type.label}
      accent={ACCENT_HEX[args.type.accent]}
      replyTo={owner}
      promoClaimLabel={settings.promoClaimLabel}
      promoClaimNote={settings.promoClaimNote}
    />
  );
  const customerSent = await sendEmail(
    resend,
    "potvrzení klientovi",
    {
      from: calculatorFrom(),
      to: args.email,
      replyTo: owner,
      subject,
    },
    email
  );
  if (args.email.toLowerCase() !== owner.toLowerCase()) {
    await sendEmail(
      resend,
      "kopie majiteli",
      {
        from: calculatorFrom(),
        to: owner,
        replyTo: args.email,
        subject,
      },
      email
    );
  }
  return { customerSent };
};