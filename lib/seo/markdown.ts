import { yearsSince } from "@/lib/age";
import { formatCzk } from "@/lib/calculator";
import { ABOUT_BIRTH, ABOUT_STACK, aboutBio } from "@/types/about";
import { apis } from "@/types/apis";
import { calculatorExtras, projectTypes, RUSH_LABEL, RUSH_SUB, YEARLY_LABEL, YEARLY_NOTE, YEARLY_PRICE } from "@/types/calculator";
import { CONTACT_EMAIL, CONTACT_PHONE, GITHUB_URL, LINKEDIN_URL } from "@/types/contact";
import { PROJECT_GROUPS } from "@/types/projectCatalog";
import { services } from "@/types/services";
import { absoluteUrl, SITE_DESCRIPTION, SITE_NAME, SITE_NAME_LEGAL, SITE_ROUTES, SITE_TAGLINE } from "@/types/site";

const contactBlock = () => [
  `- E-mail: ${CONTACT_EMAIL}`,
  `- Telefon: ${CONTACT_PHONE}`,
  `- GitHub: ${GITHUB_URL}`,
  `- LinkedIn: ${LINKEDIN_URL}`,
  "- Působiště: Praha, Liberec, online",
  "- Odpověď na poptávku: do 24 hodin",
];
export const buildLlmsIndex = (): string =>
  [
    `# ${SITE_NAME}`,
    "",
    `> ${SITE_DESCRIPTION}`,
    "",
    `${SITE_NAME} (plným jménem ${SITE_NAME_LEGAL}) je ${yearsSince(ABOUT_BIRTH)}letý full stack developer. ${SITE_TAGLINE}.`,
    "Web je v češtině a slouží jako portfolio a poptávkový kanál.",
    "",
    "## Stránky",
    "",
    ...SITE_ROUTES.map((route) => `- [${route.label}](${absoluteUrl(route.path)}): ${route.summary}`),
    "",
    "## Kompletní obsah",
    "",
    `- [Vše v jednom souboru](${absoluteUrl("/llms-full.txt")}): služby, ceník, projekty a kontakt v Markdownu.`,
    "",
    "## Kontakt",
    "",
    ...contactBlock(),
    "",
  ].join("\n");
const servicesSection = () => [
  "## Služby",
  "",
  ...services.flatMap((service) => [
    `### ${service.title}`,
    "",
    `- Technologie: ${service.tag}`,
    `- ${service.desc}`,
    "",
  ]),
];
const pricingSection = () => [
  "## Ceník (orientační)",
  "",
  "Ceny jsou orientační, konečná nabídka vzniká po domluvě. Kalkulačka na webu",
  "sečte základ podle typu projektu, příplatek za rozsah a zvolené doplňky.",
  "",
  "### Typy projektu",
  "",
  ...projectTypes.map((type) => `- **${type.label}** — ${type.desc}: ${type.priceLabel}`),
  "",
  "### Rozsah",
  "",
  "- 1–3 stránky: bez příplatku",
  "- 4–7 stránek: +5 000 Kč",
  "- 8 a více stránek: +11 000 Kč",
  "",
  "### Doplňky",
  "",
  ...calculatorExtras.map((extra) => `- ${extra.label}: +${formatCzk(extra.price)} Kč`),
  "",
  "### Další podmínky",
  "",
  `- ${RUSH_LABEL}: ${RUSH_SUB}`,
  `- ${YEARLY_LABEL}: ${formatCzk(YEARLY_PRICE)} Kč/rok (${YEARLY_NOTE}), v ceně každé zakázky`,
  "",
];
const projectsSection = () => [
  "## Projekty",
  "",
  ...PROJECT_GROUPS.flatMap((group) => [
    `### ${group.title}`,
    "",
    `${group.meta}.`,
    "",
    ...group.projects.flatMap((project) => {
      const meta = [project.status, project.year].filter(Boolean).join(", ");
      const links = [
        project.href ? `[web](${project.href})` : null,
        project.github ? `[GitHub](${project.github})` : null,
        ...(project.links ?? []).map((link) => `[${link.label ?? link.kind}](${link.href})`),
      ].filter(Boolean);
      return [
        `#### ${project.title}${meta ? ` (${meta})` : ""}`,
        "",
        project.desc,
        "",
        `- Typ: ${project.types.join(", ")}`,
        `- Kontext: ${project.context}`,
        `- Stack: ${project.stack.join(", ")}`,
        ...(links.length ? [`- Odkazy: ${links.join(" · ")}`] : []),
        "",
      ];
    }),
  ]),
];
const apisSection = () => [
  "## Doporučená free API",
  "",
  "Služby, které Bob používá a doporučuje pro projekty s nulovým rozpočtem.",
  "",
  ...apis.map((api) => `- **${api.name}** (${api.cats.join(", ")}, ${api.free}) — ${api.desc} ${api.url}`),
  "",
];
export const buildLlmsFull = (): string =>
  [
    `# ${SITE_NAME} — kompletní obsah`,
    "",
    `Plné jméno: ${SITE_NAME_LEGAL}.`,
    "",
    `> ${SITE_DESCRIPTION}`,
    "",
    "## O mně",
    "",
    aboutBio(yearsSince(ABOUT_BIRTH)),
    "",
    `Stack: ${ABOUT_STACK.join(", ")}.`,
    "",
    ...servicesSection(),
    ...pricingSection(),
    ...projectsSection(),
    ...apisSection(),
    "## Kontakt",
    "",
    ...contactBlock(),
    "",
  ].join("\n");