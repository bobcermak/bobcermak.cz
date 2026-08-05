import type { CalculatorType } from "@/lib/calculator";

export type Service = {
  num: string;
  title: string;
  tag: string;
  desc: string;
  calc: CalculatorType;
};
export const services: Service[] = [
  {
    num: "01",
    title: "Weby s administrací",
    tag: "Next.js · CMS",
    desc: "Prezentační weby, kde si obsah (texty, fotky) měníte sami. Rychlé, čisté, žádný WordPress.",
    calc: "admin",
  },
  {
    num: "02",
    title: "Rezervační & vlastní systémy",
    tag: "Supabase · iCal",
    desc: "Rezervace, synchronizace obsazenosti s Booking.com a systémy na míru — přesně to, co potřebujete.",
    calc: "system",
  },
  {
    num: "03",
    title: "Mobilní appky",
    tag: "Expo · RN",
    desc: "React Native / Expo — iOS i Android z jednoho kódu. Nativní pocit, jedna codebase.",
    calc: "app",
  },
];