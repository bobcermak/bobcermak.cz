export const PROMO_STORAGE_KEY = "bc-promo-first-five-v1";
export const PROMO_DELAY = 3000;
export const PROMO_EYEBROW = "Prvních 5 zájemců";
export const PROMO_TITLE_BEFORE = "Dalších";
export const PROMO_TITLE_HIGHLIGHT = "10 %";
export const PROMO_TITLE_AFTER = "k ceně, ve které už sleva je.";
export const PROMO_LEAD = "Napiš mi přes formulář a slevu ti uplatním. Platí pro prvních pět zájemců.";
export const PROMO_CTA = "Uplatnit slevu";
export const PROMO_PARAM = "sleva";
export const PROMO_PARAM_VALUE = "5";
export const promoHref = (sectionId: string) =>
  `/?${PROMO_PARAM}=${PROMO_PARAM_VALUE}#${sectionId}`;
export const PROMO_CLAIM_LABEL = "Sleva 10 % pro prvních 5 zájemců";
export const PROMO_CLAIM_NOTE = "Nárok mám uplatněný — připomenu ho v nabídce.";