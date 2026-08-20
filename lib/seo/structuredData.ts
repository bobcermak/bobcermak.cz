import { yearsSince } from "@/lib/age";
import { ABOUT_BIRTH, ABOUT_STACK } from "@/types/about";
import { projectTypes } from "@/types/calculator";
import { CONTACT_EMAIL, CONTACT_PHONE, GITHUB_URL, LINKEDIN_URL } from "@/types/contact";
import { PROJECT_GROUPS } from "@/types/projectCatalog";
import { services } from "@/types/services";
import { absoluteUrl, SITE_DESCRIPTION, SITE_FAMILY_NAME, SITE_GIVEN_NAME, SITE_NAME, SITE_NAME_ALTS, SITE_URL, SITE_LANG } from "@/types/site";

const PERSON_ID = `${SITE_URL}/#person`;
const SITE_ID = `${SITE_URL}/#website`;
export const personSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": PERSON_ID,
  name: SITE_NAME,
  alternateName: SITE_NAME_ALTS,
  givenName: SITE_GIVEN_NAME,
  familyName: SITE_FAMILY_NAME,
  url: SITE_URL,
  email: CONTACT_EMAIL,
  telephone: CONTACT_PHONE,
  jobTitle: "Full stack developer",
  description:
    "Full stack developer — weby s administrací, rezervační a vlastní systémy a mobilní aplikace v Next.js, React Native a Supabase.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Praha",
    addressRegion: "Liberec",
    addressCountry: "CZ",
  },
  sameAs: [GITHUB_URL, LINKEDIN_URL],
  knowsAbout: ABOUT_STACK,
});
export const websiteSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": SITE_ID,
  url: SITE_URL,
  name: SITE_NAME,
  description: SITE_DESCRIPTION,
  inLanguage: SITE_LANG,
  publisher: { "@id": PERSON_ID },
});
export const servicesSchema = () => ({
  "@context": "https://schema.org",
  "@type": "OfferCatalog",
  name: "Co dělám",
  url: absoluteUrl("/"),
  itemListElement: services.map((service, index) => {
    const type = projectTypes.find((item) => item.id === service.calc);
    return {
      "@type": "Offer",
      position: index + 1,
      itemOffered: {
        "@type": "Service",
        name: service.title,
        description: service.desc,
        provider: { "@id": PERSON_ID },
        areaServed: { "@type": "Country", name: "Česko" },
      },
      ...(type && type.base > 0
        ? { price: type.base, priceCurrency: "CZK", availability: "https://schema.org/InStock" }
        : {}),
    };
  }),
});
export const projectsSchema = () => {
  const projects = PROJECT_GROUPS.flatMap((group) => group.projects);
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${absoluteUrl("/projekty")}#collection`,
    url: absoluteUrl("/projekty"),
    name: "Projekty",
    inLanguage: SITE_LANG,
    isPartOf: { "@id": SITE_ID },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: projects.length,
      itemListElement: projects.map((project, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "CreativeWork",
          name: project.title,
          description: project.desc,
          creator: { "@id": PERSON_ID },
          keywords: [...project.types, ...project.stack].join(", "),
          ...(project.year ? { dateCreated: project.year.split("-")[0] } : {}),
          ...(project.img ? { image: absoluteUrl(project.img) } : {}),
          ...(project.href ? { url: project.href } : {}),
        },
      })),
    },
  };
};
export const breadcrumbSchema = (trail: { label: string; path: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Domů", item: SITE_URL },
    ...trail.map((step, index) => ({
      "@type": "ListItem",
      position: index + 2,
      name: step.label,
      item: absoluteUrl(step.path),
    })),
  ],
});
export const profileSchema = () => ({
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  url: absoluteUrl("/"),
  inLanguage: SITE_LANG,
  mainEntity: {
    "@id": PERSON_ID,
    "@type": "Person",
    name: SITE_NAME,
    alternateName: SITE_NAME_ALTS,
    description: `Full stack developer, ${yearsSince(ABOUT_BIRTH)} let, Praha a Liberec.`,
  },
});