import type { FC } from "react";
import { Hr, Link, Section, Text } from "@react-email/components";
import EmailShell from "./EmailShell";
import BreakdownTable from "./BreakdownTable";
import { divider, EMAIL_COLORS, eyebrow, heading, link, paragraph, price, priceBox, rowLabel, rowValue } from "./emailTheme";
import type { CalculatorResult } from "@/lib/calculator";

type LeadOwnerEmailProps = {
  name: string;
  email: string;
  result: CalculatorResult;
  typeLabel: string;
  pagesLabel: string;
  rush: boolean;
  yearly: boolean;
  sentAt: string;
  accent: string;
};
const Fact = ({ label, value }: { label: string; value: string }) => (
  <tr>
    <td style={rowLabel}>{label}</td>
    <td style={rowValue}>{value}</td>
  </tr>
);
const LeadOwnerEmail: FC<LeadOwnerEmailProps> = ({
  name,
  email,
  result,
  typeLabel,
  pagesLabel,
  rush,
  yearly,
  sentAt,
  accent,
}) => (
  <EmailShell preview={`Nová poptávka — ${result.rangeLabel} · ${name || email}`} accent={accent}>
    <Text style={eyebrow}>Nová poptávka z kalkulačky</Text>
    <Text style={heading}>{name || "Bez jména"}</Text>
    <Text style={{ ...paragraph, margin: "0 0 4px" }}>
      <Link href={`mailto:${email}`} style={link}>
        {email}
      </Link>
    </Text>
    <Text style={{ ...paragraph, margin: 0, fontSize: "13px", color: EMAIL_COLORS.text3 }}>{sentAt}</Text>
    <Section style={priceBox}>
      <Text style={{ ...eyebrow, margin: "0 0 6px" }}>Spočítaná cena</Text>
      <Text style={price}>{result.rangeLabel}</Text>
      {result.showCompare && (
        <Text style={{ ...paragraph, margin: "8px 0 0", fontSize: "13px" }}>
          Jinde {result.beforeLabel} · sleva {result.discount} % · ušetří {result.savedLabel}
        </Text>
      )}
    </Section>
    <Text style={eyebrow}>Rozpad</Text>
    <BreakdownTable rows={result.rows}/>
    <Hr style={divider}/>
    <Text style={eyebrow}>Parametry</Text>
    <table role="presentation" width="100%" cellPadding={0} cellSpacing={0} style={{ borderCollapse: "collapse" }}>
      <tbody>
        <Fact label="Typ projektu" value={typeLabel}/>
        <Fact label="Rozsah" value={pagesLabel}/>
        <Fact label="Spěchá to" value={rush ? "Ano — do 3 týdnů" : "Ne"}/>
        <Fact label="Roční správa" value={yearly ? "Ano" : "Ne"}/>
      </tbody>
    </table>
    <Text style={{ ...paragraph, margin: "22px 0 0", fontSize: "13px" }}>
      Odpověz rovnou na tenhle e-mail — poletí to přímo {name || "jemu"}.
    </Text>
  </EmailShell>
);
export default LeadOwnerEmail;