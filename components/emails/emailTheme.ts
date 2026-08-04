export const EMAIL_COLORS = {
  ink: "#111111",
  text2: "#6b6b6b",
  text3: "#9a9a9a",
  placeholder: "#b3b1af",
  bg: "#ffffff",
  bgSoft: "#fafaf8",
  bgTint: "#f4f3f1",
  border: "#e6e4e2",
  borderMid: "#dcdad8",
  blue: "#96ace8",
  blueStrong: "#6f86d6",
  peach: "#f3ccb2",
  peachStrong: "#e0a373",
  purple: "#cebeec",
  green: "#8ab98f",
} as const;
export const FONT_STACK = "Montserrat, -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif";
export const body = {
  margin: 0,
  padding: "32px 12px",
  backgroundColor: EMAIL_COLORS.bgSoft,
  fontFamily: FONT_STACK,
  color: EMAIL_COLORS.ink,
} as const;
export const card = {
  width: "100%",
  maxWidth: "560px",
  margin: "0 auto",
  backgroundColor: EMAIL_COLORS.bg,
  border: `1px solid ${EMAIL_COLORS.border}`,
  borderRadius: "18px",
  overflow: "hidden",
} as const;
export const inner = { padding: "28px 28px 32px" } as const;
export const eyebrow = {
  margin: "0 0 10px",
  fontSize: "11px",
  fontWeight: 600,
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  color: EMAIL_COLORS.text3,
} as const;
export const heading = {
  margin: "0 0 8px",
  fontSize: "26px",
  lineHeight: 1.15,
  fontWeight: 600,
  letterSpacing: "-0.02em",
  color: EMAIL_COLORS.ink,
} as const;
export const paragraph = {
  margin: "0 0 14px",
  fontSize: "15px",
  lineHeight: 1.6,
  color: EMAIL_COLORS.text2,
} as const;
export const priceBox = {
  margin: "18px 0",
  padding: "20px 22px",
  backgroundColor: EMAIL_COLORS.bgTint,
  borderRadius: "14px",
} as const;
export const price = {
  margin: 0,
  fontSize: "30px",
  lineHeight: 1.05,
  fontWeight: 700,
  letterSpacing: "-0.03em",
  color: EMAIL_COLORS.ink,
} as const;
export const rowLabel = {
  margin: 0,
  padding: "9px 0",
  fontSize: "14px",
  lineHeight: 1.4,
  color: EMAIL_COLORS.text2,
} as const;
export const rowValue = {
  margin: 0,
  padding: "9px 0",
  fontSize: "14px",
  lineHeight: 1.4,
  fontWeight: 600,
  textAlign: "right",
  whiteSpace: "nowrap",
  color: EMAIL_COLORS.ink,
} as const;
export const divider = { margin: "22px 0", borderColor: EMAIL_COLORS.border, borderWidth: "1px 0 0" } as const;
export const footer = {
  margin: "18px auto 0",
  maxWidth: "560px",
  fontSize: "12px",
  lineHeight: 1.5,
  textAlign: "center",
  color: EMAIL_COLORS.placeholder,
} as const;
export const link = { color: EMAIL_COLORS.ink, fontWeight: 600, textDecoration: "underline" } as const;