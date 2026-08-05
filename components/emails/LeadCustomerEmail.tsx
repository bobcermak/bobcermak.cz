import type { FC } from "react";
import { Hr, Link, Section, Text } from "@react-email/components";
import EmailShell from "./EmailShell";
import PriceBreakdown from "./PriceBreakdown";
import { button, divider, EMAIL_COLORS, eyebrow, heading, link, paragraph, price, priceBox, small } from "./emailTheme";
import type { CalculatorResult } from "@/lib/calculator";
import { REPLY_WITHIN_HOURS } from "@/types/lead";

type LeadCustomerEmailProps = {
  name: string;
  result: CalculatorResult;
  typeLabel: string;
  accent: string;
  replyTo: string;
};
const LeadCustomerEmail: FC<LeadCustomerEmailProps> = ({ name, result, typeLabel, accent, replyTo }) => (
  <EmailShell
    preview={`${result.rangeLabel} — ozvu se do ${REPLY_WITHIN_HOURS} hodin.`}
    label="Potvrzení ceny"
    accent={accent}
  >
    <Text style={heading}>Díky, {name || "kámo"} 👋</Text>
    <Text style={paragraph}>
      Cena z kalkulačky mi dorazila. Projdu si ji a ozvu se osobně do {REPLY_WITHIN_HOURS} hodin —
      nezávazně, jen si řekneme, co přesně potřebuješ.
    </Text>
    <Section style={priceBox}>
      <Text style={eyebrow}>{typeLabel}</Text>
      <Text style={price}>{result.rangeLabel}</Text>
      <Text style={{ ...small, margin: "10px 0 0" }}>
        Orientační odhad — přesnou cenu doladíme podle detailů.
      </Text>
    </Section>
    <Text style={{ ...eyebrow, margin: "0 0 6px" }}>Co se do ceny počítá</Text>
    <PriceBreakdown rows={result.rows} />
    <Hr style={divider} />
    <Section>
      <Link href="https://bobcermak.cz/projekty" style={button}>
        Mrkni na moje projekty
      </Link>
    </Section>
    <Text style={{ ...paragraph, margin: "26px 0 0" }}>
      Napadlo tě mezitím něco dalšího? Stačí odpovědět na tenhle e-mail.
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
export default LeadCustomerEmail;