import type { ReactNode } from "react";
import type { CalculatorType } from "@/lib/calculator";

export type CalculatorSlot<T extends string = string> = { id: T; content: ReactNode };
export type CalculatorAccent = "blue" | "peach" | "green";
export type ProjectType = {
  id: CalculatorType;
  label: string;
  desc: string;
  base: number;
  priceLabel: string;
  discount: number;
  accent: CalculatorAccent;
};
export type CalculatorExtra = {
  id: string;
  label: string;
  price: number;
};
export const ACCENT_STYLES: Record<CalculatorAccent, { bg: string; text: string; line: string }> = {
  blue: { bg: "bg-accent-blue-strong", text: "text-accent-blue-strong", line: "decoration-accent-blue-strong" },
  peach: { bg: "bg-accent-peach-strong", text: "text-accent-peach-strong", line: "decoration-accent-peach-strong" },
  green: { bg: "bg-accent-green", text: "text-accent-green", line: "decoration-accent-green" },
};
export const projectTypes: ProjectType[] = [
  {
    id: "static",
    label: "Statický web",
    desc: "Vizitka, do 3 stránek",
    base: 0,
    priceLabel: "od 0 Kč*",
    discount: 0,
    accent: "blue",
  },
  {
    id: "admin",
    label: "Web s vlastní administrací",
    desc: "Sami si měníte texty, fotky a obsah — bez programátora",
    base: 20000,
    priceLabel: "od 20 000 Kč",
    discount: 30,
    accent: "blue",
  },
  {
    id: "system",
    label: "Web s vlastním systémem",
    desc: "Web + váš vlastní systém na míru (rezervace, správa obsahu, e-mailové šablony…) — přesně po domluvě",
    base: 37000,
    priceLabel: "od 37 000 Kč",
    discount: 40,
    accent: "peach",
  },
  {
    id: "app",
    label: "Mobilní aplikace",
    desc: "React Native, iOS + Android",
    base: 55000,
    priceLabel: "od 55 000 Kč*",
    discount: 50,
    accent: "green",
  },
];
export const calculatorExtras: CalculatorExtra[] = [
  { id: "multilang", label: "Vícejazyčnost", price: 4000 },
  { id: "ai", label: "Napojení na AI (chatbot)", price: 8000 },
  { id: "eshop", label: "E-shop / platby (Stripe)", price: 12000 },
  { id: "blog", label: "Blog / články", price: 4000 },
  { id: "newsletter", label: "Newsletter / emailing", price: 3000 },
  { id: "seo", label: "SEO & výkon", price: 3500 },
];
export const DEFAULT_TYPE: CalculatorType = "admin";
export const PAGES_MIN = 1;
export const PAGES_MAX = 12;
export const PAGES_DEFAULT = 4;
export const RUSH_MULTIPLIER = 1.2;
export const YEARLY_PRICE = 5000;
export const RUSH_LABEL = "Spěchá to (dodání do 3 týdnů)";
export const RUSH_SUB = "+20 % k jednorázové ceně";
export const YEARLY_LABEL = "Roční správa";
export const YEARLY_NOTE = "hosting, e-mailová doména, opravy, aktualizace";