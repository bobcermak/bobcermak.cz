export type Project = {
  num: string;
  slug: string;
  title: string;
  desc: string;
  tags: string[];
  img?: string;
  href?: string;
  github?: string;
  fit?: "cover" | "contain";
  accent?: string;
};
export const featuredLead: Project = {
  num: "01",
  slug: "yumi",
  title: "Yumi",
  desc: "Kalorická appka s AI skenováním jídla — vyfotíte jídlo a dostanete nutriční hodnoty. Barcode scan, gamifikace, freemium.",
  tags: ["Mobilní app", "AI", "2025-26"],
  img: "/images/content/yumi-mockup.png",
  href: "https://github.com/bobcermak/Yumi-App",
  fit: "contain",
  accent: "#C5E384",
};
export const featuredRest: Project[] = [
  {
    num: "02",
    slug: "bezecka-skola",
    title: "Běžecká škola",
    desc: "Web běžecké školy Miloše Škorpila — blog, tréninky, e-shop a kalendář akcí.",
    tags: ["Web", "E-shop"],
    img: "/images/content/bezecka-skola-mockup.png",
    href: "https://bezeckaskola.cz/",
    fit: "contain",
    accent: "#bf311a",
  },
  {
    num: "03",
    slug: "clash-of-brynza",
    title: "Clash of Brynza",
    desc: "Budovatelské RPG v prohlížeči — balancuješ ovce, populaci a půdu na hraně hladomoru.",
    tags: ["Hra", "ASP.NET", "React"],
    img: "/images/content/game.webp",
    fit: "contain",
    href: "https://id-117.pslib.cloud/",
    github: "https://github.com/bobcermak/ClashOfBrynza",
    accent: "#4795a7",
  },
];