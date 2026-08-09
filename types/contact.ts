export const CONTACT_SECTION_ID = "napis-mi";
export const CONTACT_TOPICS = [
  "Spolupráce",
  "Projekt na míru",
  "Konzultace",
  "Dotaz",
  "Něco jiného",
] as const;
export type ContactTopic = (typeof CONTACT_TOPICS)[number];
export const DEFAULT_TOPIC: ContactTopic = "Spolupráce";
export const MESSAGE_MAX = 2000;
export const CONTACT_EMAIL = "bob.cermak.dev@gmail.com";
export const CONTACT_PHONE = "+420 774 377 630";
export const CONTACT_PHONE_HREF = `tel:${CONTACT_PHONE.replace(/\s/g, "")}`;
export const GITHUB_URL = "https://github.com/bobcermak";
export const LINKEDIN_URL = "https://www.linkedin.com/in/bob-%C4%8Derm%C3%A1k-0020ba376/";
export type ContactInfoIcon = "mail" | "phone" | "speed" | "place";
export type ContactInfoItem = {
  icon: ContactInfoIcon;
  label: string;
  href?: string;
};
export const CONTACT_INFO: ContactInfoItem[] = [
  { icon: "mail", label: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}` },
  { icon: "phone", label: CONTACT_PHONE, href: CONTACT_PHONE_HREF },
  { icon: "speed", label: "odpověď do 24 h" },
  { icon: "place", label: "Praha · Liberec · online" },
];
export const CONTACT_EYEBROW = "Spolupráce & dotazy";
export const CONTACT_TITLE = "Napiš mi.";
export const CONTACT_LEAD = "Chceš se domluvit na spolupráci, nebo se jen na něco zeptat? Sem s tím — ozvu se osobně do 24 hodin, nezávazně.";