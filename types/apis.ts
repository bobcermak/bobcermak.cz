export type ApiCategory = "Backend" | "AI" | "Data" | "Mapy" | "E-mail";
export type ApiIcon = "database" | "sparkle" | "envelope" | "barcode" | "map" | "film" | "fork";

export type Api = {
  num: string;
  name: string;
  free: string;
  icon: ApiIcon;
  cats: ApiCategory[];
  tags: string[];
  desc: string;
  url: string;
};
export const API_ALL = "Vše";
export const apiCategories: ApiCategory[] = ["Backend", "AI", "Data", "Mapy", "E-mail"];
export const apiFilters: string[] = [API_ALL, ...apiCategories];
export const apis: Api[] = [
  {
    num: "01",
    name: "Supabase",
    free: "Free tier navždy",
    icon: "database",
    cats: ["Backend"],
    tags: ["Backend", "Databáze", "Auth"],
    desc: "Postgres databáze, auth, storage a edge functions. Kompletní backend bez serveru.",
    url: "https://supabase.com",
  },
  {
    num: "02",
    name: "Google Gemini",
    free: "Štědrý free tier",
    icon: "sparkle",
    cats: ["AI"],
    tags: ["AI", "LLM", "Vision"],
    desc: "Flash modely mají velký free tier — ideální na prototypy a AI featury bez nákladů.",
    url: "https://ai.google.dev",
  },
  {
    num: "03",
    name: "Resend",
    free: "3 000 / měsíc",
    icon: "envelope",
    cats: ["E-mail"],
    tags: ["E-mail", "Transakční"],
    desc: "Transakční e-maily pro vývojáře. Čisté API, hezké React e-mail šablony.",
    url: "https://resend.com",
  },
  {
    num: "04",
    name: "Open Food Facts",
    free: "Zcela zdarma",
    icon: "barcode",
    cats: ["Data"],
    tags: ["Data", "Barcode", "Bez klíče"],
    desc: "Otevřená databáze potravin s čárovými kódy a nutričními hodnotami. Bez API klíče.",
    url: "https://world.openfoodfacts.org",
  },
  {
    num: "05",
    name: "OpenStreetMap",
    free: "Bez limitů Google",
    icon: "map",
    cats: ["Mapy"],
    tags: ["Mapy", "Geo", "Leaflet"],
    desc: "Mapy a geokódování bez placených limitů Google Maps. Skvělé přes Leaflet.",
    url: "https://www.openstreetmap.org",
  },
  {
    num: "06",
    name: "TMDB",
    free: "Zdarma nekomerčně",
    icon: "film",
    cats: ["Data"],
    tags: ["Data", "Média", "Obrázky"],
    desc: "Filmy, seriály, obsazení a plakáty. Bohaté API pro nekomerční projekty.",
    url: "https://www.themoviedb.org",
  },
  {
    num: "07",
    name: "USDA FoodData Central",
    free: "Zdarma s klíčem",
    icon: "fork",
    cats: ["Data"],
    tags: ["Data", "Nutrice", "Potraviny"],
    desc: "Oficiální nutriční databáze USDA — přesné hodnoty pro tisíce potravin. Klíč zdarma, 1 000 dotazů za hodinu.",
    url: "https://fdc.nal.usda.gov",
  },
];