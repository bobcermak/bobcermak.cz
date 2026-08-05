import type { CalculatorAccent } from "@/types/calculator";

export const EMAIL_COLORS = {
  ink: "#111111",
  text2: "#6b6b6b",
  text3: "#9a9a9a",
  placeholder: "#b3b1af",
  bg: "#ffffff",
  bgSoft: "#fafaf8",
  bgTint: "#f4f3f1",
  border: "#eeecea",
  borderMid: "#dcdad8",
  blue: "#96ace8",
  blueStrong: "#6f86d6",
  peach: "#f3ccb2",
  peachStrong: "#e0a373",
  purple: "#cebeec",
  green: "#8ab98f",
} as const;
export const FONT_STACK = "Montserrat, -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif";
export const ACCENT_HEX: Record<CalculatorAccent, string> = {
  blue: EMAIL_COLORS.blueStrong,
  peach: EMAIL_COLORS.peachStrong,
  green: EMAIL_COLORS.green,
};
export const body = {
  margin: 0,
  padding: "40px 12px",
  backgroundColor: EMAIL_COLORS.bgSoft,
  fontFamily: FONT_STACK,
  color: EMAIL_COLORS.ink,
} as const;
export const card = {
  width: "100%",
  maxWidth: "600px",
  margin: "0 auto",
  backgroundColor: EMAIL_COLORS.bg,
  border: `1px solid ${EMAIL_COLORS.border}`,
  borderRadius: "20px",
  overflow: "hidden",
} as const;
export const header = { padding: "26px 32px 20px" } as const;
export const content = { padding: "0 32px 34px" } as const;
export const eyebrow = {
  margin: 0,
  fontSize: "11px",
  fontWeight: 600,
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  color: EMAIL_COLORS.text3,
} as const;
export const heading = {
  margin: "0 0 10px",
  fontSize: "27px",
  lineHeight: "1.15",
  fontWeight: 600,
  letterSpacing: "-0.025em",
  color: EMAIL_COLORS.ink,
} as const;
export const paragraph = {
  margin: "0 0 16px",
  fontSize: "15px",
  lineHeight: "1.65",
  color: EMAIL_COLORS.text2,
} as const;
export const small = {
  margin: 0,
  fontSize: "13px",
  lineHeight: "1.55",
  color: EMAIL_COLORS.text3,
} as const;
export const link = { color: EMAIL_COLORS.ink, fontWeight: 600, textDecoration: "underline" } as const;
export const chip = {
  display: "inline-block",
  padding: "5px 11px",
  backgroundColor: EMAIL_COLORS.ink,
  borderRadius: "999px",
  fontSize: "10px",
  fontWeight: 600,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  color: EMAIL_COLORS.bg,
} as const;
export const priceBox = {
  margin: "4px 0 26px",
  padding: "22px 24px",
  backgroundColor: EMAIL_COLORS.bgTint,
  borderRadius: "16px",
} as const;
export const price = {
  margin: "6px 0 0",
  fontSize: "32px",
  lineHeight: "1.05",
  fontWeight: 700,
  letterSpacing: "-0.03em",
  color: EMAIL_COLORS.ink,
} as const;
export const rowLabel = {
  margin: 0,
  fontSize: "14px",
  lineHeight: "1.45",
  color: EMAIL_COLORS.text2,
} as const;
export const rowValue = {
  margin: 0,
  fontSize: "14px",
  lineHeight: "1.45",
  fontWeight: 600,
  textAlign: "right",
  whiteSpace: "nowrap",
  color: EMAIL_COLORS.ink,
} as const;
export const cellPad = { padding: "10px 0" } as const;
export const divider = {
  margin: "26px 0",
  borderColor: EMAIL_COLORS.border,
  borderWidth: "1px 0 0",
  borderStyle: "solid",
} as const;
export const button = {
  display: "inline-block",
  padding: "13px 26px",
  backgroundColor: EMAIL_COLORS.ink,
  borderRadius: "999px",
  fontSize: "14px",
  fontWeight: 600,
  color: EMAIL_COLORS.bg,
  textDecoration: "none",
} as const;
export const footer = {
  margin: "20px auto 0",
  maxWidth: "600px",
  fontSize: "12px",
  lineHeight: "1.6",
  textAlign: "center",
  color: EMAIL_COLORS.placeholder,
} as const;