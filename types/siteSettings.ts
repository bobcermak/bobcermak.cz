export type SiteSettings = {
  updatedAt: string;
  heroEyebrow: string;
  heroAvailable: boolean;
  promoEnabled: boolean;
  promoEyebrow: string;
  promoTitleBefore: string;
  promoTitleHighlight: string;
  promoTitleAfter: string;
  promoLead: string;
  promoCta: string;
  promoDelayMs: number;
  promoClaimLabel: string;
  promoClaimNote: string;
  promoSubjectTag: string;
};
export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  updatedAt: "",
  heroEyebrow: "K dispozici pro nové projekty",
  heroAvailable: true,
  promoEnabled: true,
  promoEyebrow: "Prvních 5 zájemců",
  promoTitleBefore: "Dalších",
  promoTitleHighlight: "10 %",
  promoTitleAfter: "k ceně, ve které už sleva je.",
  promoLead: "Napiš mi přes formulář a slevu ti uplatním. Platí pro prvních pět zájemců.",
  promoCta: "Uplatnit slevu",
  promoDelayMs: 3000,
  promoClaimLabel: "Sleva 10 % pro prvních 5 zájemců",
  promoClaimNote: "Nárok mám uplatněný — připomenu ho v nabídce.",
  promoSubjectTag: "sleva 10 %",
};