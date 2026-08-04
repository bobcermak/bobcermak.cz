import type { FC, ReactNode } from "react";
import { Body, Container, Head, Html, Preview, Section, Text } from "@react-email/components";
import { body, card, EMAIL_COLORS, footer, inner } from "./emailTheme";

const DOTS = [EMAIL_COLORS.blue, EMAIL_COLORS.peach, EMAIL_COLORS.purple, EMAIL_COLORS.ink];
type EmailShellProps = {
  preview: string;
  accent: string;
  children: ReactNode;
};
const EmailShell: FC<EmailShellProps> = ({ preview, accent, children }) => (
  <Html lang="cs">
    <Head/>
    <Preview>{preview}</Preview>
    <Body style={body}>
      <Container style={card}>
        <Section style={{ height: "5px", backgroundColor: accent, lineHeight: "5px" }}>&nbsp;</Section>
        <Section style={{ padding: "22px 28px 0" }}>
          <table role="presentation" cellPadding={0} cellSpacing={0} style={{ borderCollapse: "collapse" }}>
            <tbody>
              <tr>
                <td
                  style={{
                    paddingRight: "8px",
                    fontSize: "20px",
                    fontWeight: 700,
                    letterSpacing: "-0.11em",
                    color: EMAIL_COLORS.ink,
                  }}
                >
                  bc
                </td>
                <td>
                  <table role="presentation" cellPadding={0} cellSpacing={0} style={{ borderCollapse: "separate", borderSpacing: "3px" }}>
                    <tbody>
                      <tr>
                        {DOTS.slice(0, 2).map((color) => (
                          <td key={color} style={{ width: "5px", height: "5px", backgroundColor: color, borderRadius: "50%", fontSize: 0, lineHeight: 0 }}>&nbsp;</td>
                        ))}
                      </tr>
                      <tr>
                        {DOTS.slice(2).map((color) => (
                          <td key={color} style={{ width: "5px", height: "5px", backgroundColor: color, borderRadius: "50%", fontSize: 0, lineHeight: 0 }}>&nbsp;</td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        </Section>
        <Section style={inner}>{children}</Section>
      </Container>
      <Text style={footer}>bobcermak.cz · ahoj@bobcermak.cz</Text>
    </Body>
  </Html>
);
export default EmailShell;