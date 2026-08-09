import type { ProjectContext, ProjectType } from "./projectFilters";

export type CatalogProject = {
  slug: string;
  title: string;
  year: string;
  desc: string;
  types: ProjectType[];
  context: ProjectContext;
  stack: string[];
  img?: string;
  href?: string;
  github?: string;
  fit?: "cover" | "contain";
};
export type GroupAccent = "blue" | "peach";
export type ProjectGroup = {
  id: string;
  title: string;
  meta: string;
  accent: GroupAccent;
  badge: string;
  projects: CatalogProject[];
};
export const PROJECT_GROUPS: ProjectGroup[] = [
  {
    id: "pro-klienty",
    title: "Pro klienty",
    meta: "Komerční · na zakázku",
    accent: "blue",
    badge: "Klient",
    projects: [
      {
        slug: "bezecka-skola",
        title: "Chata Abertamy",
        year: "2026",
        desc: "Web horské chaty s vlastním CMS a rezervačním systémem — iCal sync s Booking.com, správa obsazenosti.",
        types: ["Web", "Systém/CMS"],
        context: "Klientské",
        stack: ["Next.js", "Supabase", "iCal"],
      },
      {
        slug: "chata-abertamy",
        title: "Chata Abertamy",
        year: "2026",
        desc: "Web horské chaty s vlastním CMS a rezervačním systémem — iCal sync s Booking.com, správa obsazenosti.",
        types: ["Web", "Systém/CMS"],
        context: "Klientské",
        stack: ["Next.js", "Supabase", "iCal"],
      },
    ],
  },
  {
    id: "pro-zabavu",
    title: "Pro zábavu & soutěže",
    meta: "Vlastní produkty · AI olympiáda",
    accent: "peach",
    badge: "Vlastní",
    projects: [
      {
        slug: "yumi",
        title: "Yumi",
        year: "2025-26",
        desc: "React Native/Expo kalorická appka s AI skenováním jídla (Magic Scan), barcode scan, gamifikace, freemium.",
        types: ["Mobilní app", "AI"],
        context: "Vlastní produkt",
        stack: ["Expo", "Supabase Edge Functions", "Gemini Flash Lite", "GPT-4o Mini", "PostHog"],
        img: "/images/content/yumi-mockup.png",
        fit: "contain",
        href: "https://github.com/bobcermak/Yumi-App",
      },
      {
        slug: "lumio",
        title: "Lumio",
        year: "2026",
        desc: "Adaptivní bezdotyková herní platforma pro děti s autismem — MediaPipe hand tracking + Gemini 2.0 Flash. Vítěz regionálního kola.",
        types: ["AI"],
        context: "Soutěž",
        stack: ["MediaPipe", "Gemini 2.0 Flash"],
      },
    ],
  },
];
export const PROJECTS_TOTAL = PROJECT_GROUPS.reduce(
  (sum, group) => sum + group.projects.length,
  0
);
export const PROJECTS_TITLE = "Projekty";