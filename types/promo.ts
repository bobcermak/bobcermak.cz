export const PROMO_STORAGE_KEY = "bc-promo-first-five-v1";
export const PROMO_PARAM = "sleva";
export const PROMO_PARAM_VALUE = "5";
export const promoHref = (sectionId: string) =>
  `/?${PROMO_PARAM}=${PROMO_PARAM_VALUE}#${sectionId}`;