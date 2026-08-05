import type { FC, ReactNode } from "react";
import { Body, Column, Container, Font, Head, Html, Link, Preview, Row, Section, Text } from "@react-email/components";
import EmailLogo from "./EmailLogo";
import { body, card, chip, content, EMAIL_COLORS, footer, header } from "./emailTheme";
import { CONTACT_PHONE, CONTACT_PHONE_HREF } from "@/types/contact";

type EmailShellProps = {
  preview: string;
  label: string;
  accent: string;
  children: ReactNode;
};
const EmailShell: FC<EmailShellProps> = ({ preview, label, accent, children }) => (
  <Html lang="cs">
    <Head>
      <Font
        fontFamily="Montserrat"
        fallbackFontFamily="Helvetica"
        webFont={{ url: "https://fonts.gstatic.com/s/montserrat/v26/JTUSjIg1_i6t8kCHKm459Wlhyw.woff2", format: "woff2" }}
        fontWeight={400}
        fontStyle="normal"
      />
    </Head>
    <Preview>{preview}</Preview>
    <Body style={body}>
      <Container style={card}>
        <Section style={{ height: "3px", backgroundColor: accent, lineHeight: "3px", fontSize: 0 }}>
          &nbsp;
        </Section>
        <Section style={header}>
          <Row>
            <Column>
              <EmailLogo />
            </Column>
            <Column align="right">
              <Text style={chip}>{label}</Text>
            </Column>
          </Row>
        </Section>
        <Section style={content}>{children}</Section>
      </Container>
      <Text style={footer}>
        <Link href="https://bobcermak.cz" style={{ color: EMAIL_COLORS.text3, textDecoration: "none" }}>
          bobcermak.cz
        </Link>
        {" · "}
        <Link href={CONTACT_PHONE_HREF} style={{ color: EMAIL_COLORS.text3, textDecoration: "none" }}>
          {CONTACT_PHONE}
        </Link>
        <br />
        Full stack developer — weby, systémy a mobilní appky
      </Text>
    </Body>
  </Html>
);
export default EmailShell;