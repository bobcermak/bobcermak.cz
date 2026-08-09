import LeadCustomerEmail from "@/components/emails/LeadCustomerEmail";
import { ACCENT_HEX } from "@/components/emails/emailTheme";
import { calculatorFrom, getResend, ownerEmail } from "./client";
import { sendEmail } from "./send";
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
  const customerSent = await sendEmail(
    resend,
    "potvrzení klientovi",
    {
      from: calculatorFrom(),
      to: args.email,
      ...(args.email.toLowerCase() === owner.toLowerCase() ? {} : { bcc: owner }),
      replyTo: owner,
      subject: `Potvrzení ceny${args.promo ? " · sleva 10 %" : ""} — ozvu se do ${REPLY_WITHIN_HOURS} hodin`,
    },
    (
      <LeadCustomerEmail
        name={args.name}
        result={args.result}
        promo={args.promo}
        typeLabel={args.type.label}
        accent={ACCENT_HEX[args.type.accent]}
        replyTo={owner}
      />
    )
  );
  return { customerSent };
};