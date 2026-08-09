import ContactEmail from "@/components/emails/ContactEmail";
import { EMAIL_COLORS } from "@/components/emails/emailTheme";
import { contactFrom, getResend, ownerEmail } from "./client";
import { sendEmail } from "./send";
import { REPLY_WITHIN_HOURS } from "@/types/lead";

export type ContactEmailArgs = {
  name: string;
  email: string;
  topic: string;
  message: string;
  /** Přišel z promo popupu a uplatňuje slevu. */
  promo?: boolean;
};
export const sendContactEmail = async ({ name, email, topic, message, promo }: ContactEmailArgs) => {
  const resend = getResend();
  const owner = ownerEmail();
  if (!resend || !owner) {
    console.error("[resend] Chybí klient nebo LEAD_TO_EMAIL — e-mail se neodešle.");
    return { confirmationSent: false };
  }
  const confirmationSent = await sendEmail(
    resend,
    "potvrzení zprávy",
    {
      from: contactFrom(),
      to: email,
      ...(email.toLowerCase() === owner.toLowerCase() ? {} : { bcc: owner }),
      replyTo: owner,
      subject: `Dotazy — ${topic}${promo ? " · sleva 10 %" : ""} · ozvu se do ${REPLY_WITHIN_HOURS} hodin`,
    },
    <ContactEmail name={name} topic={topic} message={message} promo={promo} accent={EMAIL_COLORS.blueStrong} replyTo={owner} />
  );
  return { confirmationSent };
};