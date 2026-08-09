import type { FC } from "react";
import { Hr, Link, Section, Text } from "@react-email/components";
import EmailShell from "./EmailShell";
import { divider, EMAIL_COLORS, eyebrow, heading, link, paragraph, priceBox, small } from "./emailTheme";
import { REPLY_WITHIN_HOURS } from "@/types/lead";
import { PROMO_CLAIM_LABEL, PROMO_CLAIM_NOTE } from "@/types/promo";

type ContactEmailProps = {
  name: string;
  topic: string;
  message: string;
  promo?: boolean;
  accent: string;
  replyTo: string;
};
const ContactEmail: FC<ContactEmailProps> = ({ name, topic, message, promo, accent, replyTo }) => (
  <EmailShell
    preview={`Zpráva dorazila — ozvu se do ${REPLY_WITHIN_HOURS} hodin.`}
    label="Zpráva"
    accent={accent}
  >
    <Text style={heading}>Díky, {name || "kámo"} 👋</Text>
    <Text style={paragraph}>
      Zpráva mi dorazila. Přečtu si ji a ozvu se osobně do {REPLY_WITHIN_HOURS} hodin na tenhle
      e-mail.
    </Text>
    <Section style={priceBox}>
      <Text style={eyebrow}>{topic}</Text>
      <Text style={{ ...paragraph, margin: "10px 0 0", color: EMAIL_COLORS.ink, whiteSpace: "pre-wrap" }}>
        {message}
      </Text>
    </Section>
    {promo && (
      <Section style={{ ...priceBox, borderColor: EMAIL_COLORS.blueStrong }}>
        <Text style={eyebrow}>{PROMO_CLAIM_LABEL}</Text>
        <Text style={{ ...paragraph, margin: "10px 0 0", color: EMAIL_COLORS.ink }}>
          {PROMO_CLAIM_NOTE}
        </Text>
      </Section>
    )}
    <Text style={small}>Tohle je opis toho, co jsi odeslal — pro tvoji kontrolu.</Text>
    <Hr style={divider} />
    <Text style={{ ...paragraph, margin: 0 }}>
      Zapomněl jsi na něco? Stačí odpovědět na tenhle e-mail.
    </Text>
    <Text style={{ ...small, margin: "18px 0 0", color: EMAIL_COLORS.text2 }}>
      Bob Čermák
      <br />
      <Link href={`mailto:${replyTo}`} style={link}>
        {replyTo}
      </Link>
    </Text>
  </EmailShell>
);
export default ContactEmail;