import type { ProjectContext, ProjectType } from "./projectFilters";

export const PROJECT_LINK_KINDS = [
  "web",
  "github",
  "youtube",
  "appstore",
  "googleplay",
  "figma",
  "instagram",
  "behance",
  "dribbble",
  "doc",
  "link",
] as const;
export type ProjectLinkKind = (typeof PROJECT_LINK_KINDS)[number];
export type ProjectLink = {
  kind: ProjectLinkKind;
  href: string;
  label?: string;
};
export type CatalogProject = {
  slug: string;
  title: string;
  year?: string;
  status?: string;
  desc: string;
  types: ProjectType[];
  context: ProjectContext;
  stack: string[];
  img?: string;
  href?: string;
  github?: string;
  links?: ProjectLink[];
  fit?: "cover" | "contain";
  imgBg?: string;
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
        title: "Běžecká škola Miloše Škorpila",
        desc: "Web běžecké školy — blog, tréninkové plány, e-shop a kalendář akcí.",
        types: ["Web", "Systém/CMS"],
        context: "Klientské",
        stack: ["Web", "E-shop"],
        img: "/images/content/bezecka-skola-mockup.png",
        fit: "contain",
        imgBg: "white",
        href: "https://bezeckaskola.cz/",
      },
      {
        slug: "chata-alexandra-redesign",
        title: "Chata Alexandra — redesign",
        year: "2026",
        status: "Rozpracované",
        desc: "Kompletní redesign webu horské chaty s vlastním rezervačním systémem — poptávka termínu s automatickým výpočtem ceny, iCal sync s Booking.com a chráněné CMS na obsazenost, akce i blog.",
        types: ["Web", "Systém/CMS"],
        context: "Klientské",
        stack: ["Next.js 16", "TypeScript", "Tailwind CSS", "Supabase", "GSAP", "Resend"],
        img: "/images/content/ab-redesign-mockup.png",
        fit: "contain",
        imgBg: "white",
        github: "https://github.com/bobcermak/alexandra-abertamy-redesign.cz",
      },
      {
        slug: "alexandra-abertamy",
        title: "Chata Alexandra",
        year: "2025-26",
        desc: "První verze webu horské chaty pro 15 hostů v Hřebečné — vybavení, fotky objektu a poptávka pobytu. Běží naostro, teď ji nahrazuje redesign.",
        types: ["Web"],
        context: "Klientské",
        stack: ["Vite", "HTML", "CSS", "JavaScript"],
        img: "/images/content/alexandra-abertamy-mockup.png",
        fit: "cover",
        href: "https://alexandra-abertamy.cz",
        github: "https://github.com/bobcermak/alexandra-abertamy.cz",
      },
      {
        slug: "3kprods",
        title: "3K Productions",
        year: "2025-26",
        desc: "Web produkční firmy na maturitní plesy a studentské akce na klíč — nabídka, reference a poptávkový formulář.",
        types: ["Web"],
        context: "Klientské",
        stack: ["Next.js", "TypeScript", "Tailwind CSS", "Resend"],
        img: "/images/content/3KProductions-mockup.jpg",
        fit: "cover",
        href: "https://3kprods.cz",
        github: "https://github.com/bobcermak/3kprods.cz",
      },
      {
        slug: "vladimir-wunsch",
        title: "Vladimír Wünsch",
        year: "2025-26",
        desc: "Prezentační web byznys sparing partnera — služby pro podnikatele, reference a kontakt.",
        types: ["Web"],
        context: "Klientské",
        stack: ["Vite", "HTML", "CSS", "JavaScript"],
        img: "/images/content/vladimirwunsch-mockup.png",
        fit: "cover",
        href: "https://vladimirwunsch.cz",
        github: "https://github.com/bobcermak/vladimirwunsch.cz",
      },
      {
        slug: "balancgate",
        title: "BalancGate",
        year: "2025-26",
        desc: "Web značky zaměřené na životní rovnováhu — „Vaše brána k životní rovnováze“.",
        types: ["Web"],
        context: "Klientské",
        stack: ["Vite", "HTML", "CSS", "JavaScript"],
        img: "/images/content/BalancGate-mockup.png",
        fit: "contain",
        imgBg: "white",
        href: "https://balancgate.cz",
        github: "https://github.com/bobcermak/balancgate.cz",
      },
      {
        slug: "blessed-barbershop",
        title: "Blessed Barbershop",
        status: "Jen design",
        desc: "Vizuál webu barbershopu — tmavá scéna, žlutá a fialová jako signální barvy a stékající lak přes celou hlavu stránky. Rezervace i voucher jsou první, co je vidět, na desktopu i na mobilu.",
        types: ["Design", "Web"],
        context: "Klientské",
        stack: ["Figma", "Web design", "Responzivní layout"],
        img: "/images/content/blessed-mockup.png",
        fit: "contain",
        imgBg: "white",
      },
      {
        slug: "balancgate-poster",
        title: "BalancGate — plakát",
        status: "Jen design",
        desc: "Vizuál pro masážní studio BalancGate. Ztmavená fotka z masáže nechá vyniknout claim, kaligrafické „R“ prořízne velká písmena a vnese do jinak strohé sazby klid.",
        types: ["Design"],
        context: "Klientské",
        stack: ["Plakát", "Sazba", "Sociální sítě"],
        img: "/images/content/balancgate-poster.png",
        fit: "contain",
        imgBg: "black",
      },
    ],
  },
  {
    id: "pro-zabavu",
    title: "Pro zábavu & soutěže",
    meta: "Vlastní produkty · škola · soutěže",
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
        imgBg: "#C5E384",
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
        img: "/images/content/lumio-mockup.png",
        fit: "contain",
        imgBg: "white",
      },
      {
        slug: "clash-of-brynza",
        title: "Clash of Brynza",
        year: "2026",
        desc: "Budovatelské RPG v prohlížeči — balancuješ ovce, populaci a půdu na hraně hladomoru. Vesnice se rozšiřuje po dlaždicích, došlé ovce znamenají hlad.",
        types: ["Hra", "Web"],
        context: "Škola",
        stack: ["ASP.NET Core", "C#", "React", "Konva.js", "Docker"],
        img: "/images/content/clash-of-brynza-mockup.png",
        fit: "contain",
        imgBg: "white",
        href: "https://id-117.pslib.cloud/",
        github: "https://github.com/bobcermak/ClashOfBrynza",
      },
      {
        slug: "ronins-curse",
        title: "Ronin's Curse",
        year: "2026",
        desc: "2D top-down akční hra v Unity — prokletý samuraj ztrácí život každé 3 sekundy a musí posbírat 20 krvavých mincí, než ho kletba dostane.",
        types: ["Hra"],
        context: "Škola",
        stack: ["Unity", "C#", "New Input System", "PlayerPrefs"],
        img: "/images/content/gameplay-mockup.png",
        fit: "contain",
        imgBg: "white",
        github: "https://github.com/bobcermak/Ronin-s-Curse",
      },
      {
        slug: "rkservis",
        title: "RKservis Jičín",
        year: "2024-25",
        desc: "Web autoservisu — STK, pneuservis, opravy a výměny oleje. Statický web bez frameworku, responzivní od základu.",
        types: ["Web"],
        context: "Škola",
        stack: ["HTML", "CSS", "JavaScript"],
        img: "/images/content/RKservis-mockup.png",
        fit: "contain",
        imgBg: "white",
        github: "https://github.com/bobcermak/RKservis",
      },
      {
        slug: "qrcode-generator",
        title: "QR Code generátor",
        year: "2025",
        desc: "Python nástroj, který z URL vyrobí PNG s QR kódem a vloží ho do HTML. Součástí je TCP server s vlákny.",
        types: ["Nástroj"],
        context: "Škola",
        stack: ["Python", "TCP server", "Threading"],
        img: "/images/content/qrcode-logo.jpg",
        fit: "cover",
        github: "https://github.com/bobcermak/QRCode-generator",
      },
      {
        slug: "robopomocnik",
        title: "Robopomocník",
        year: "2024",
        desc: "Rozšíření pro MakeCode s ukázkami chování robota TPBot — pět herních režimů včetně třídění míčků, objíždění překážek podle sonaru a mapování prostoru s AI Lens.",
        types: ["AI", "Nástroj"],
        context: "Škola",
        stack: ["TypeScript", "MakeCode", "micro:bit", "AI Lens"],
        img: "/images/content/robopomocnik.PNG",
        fit: "cover",
        github: "https://github.com/bobcermak/pxt-tpbot-robopomocnik",
      },
      {
        slug: "enerforce-labs",
        title: "Enerforce Labs",
        status: "Jen design",
        desc: "Obal pro laboratorní kapátkovou lahvičku — čistá bílá etiketa, znak ve štítu a jasná hierarchie: název, objem, doména. Nic navíc, aby produkt působil klinicky a důvěryhodně.",
        types: ["Design"],
        context: "Klientské",
        stack: ["Obalový design", "Logo", "Etiketa"],
        img: "/images/content/bottle-mockup.png",
        fit: "cover",
        imgBg: "white",
      },
    ],
  },
];
export const PROJECTS_TOTAL = PROJECT_GROUPS.reduce(
  (sum, group) => sum + group.projects.length,
  0
);
export const PROJECTS_TITLE = "Projekty";