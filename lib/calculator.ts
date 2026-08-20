import type { CalculatorExtra, ProjectType } from "@/types/calculator";
import { PAGES_MAX, RUSH_MULTIPLIER, YEARLY_PRICE } from "@/types/calculator";

export type CalculatorType = "static" | "admin" | "system" | "app";
export const CALCULATOR_SECTION_ID = "calculator";
export const CALCULATOR_SELECT_EVENT = "calculator:select";
export type CalculatorSelectDetail = { type: CalculatorType };
export const openCalculator = (type: CalculatorType) => {
  if (typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent<CalculatorSelectDetail>(CALCULATOR_SELECT_EVENT, { detail: { type } }),
  );
};
export const formatCzk = (value: number) =>
  String(Math.round(value)).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
export const pagesFee = (pages: number) => (pages <= 3 ? 0 : pages <= 7 ? 5000 : 11000);
export const pagesLabel = (pages: number) =>
  pages <= 3 ? "1–3 stránky" : pages <= 7 ? "4–7 stránek" : "8+ stránek";
export const isOpenScope = (pages: number) => pages > 7;
export const pagesFeeLabel = (pages: number) => {
  const fee = pagesFee(pages);
  if (!fee) return "×1";
  return isOpenScope(pages) ? `od ${formatCzk(fee)} Kč` : `+${formatCzk(fee)} Kč`;
};
export const pagesCountLabel = (pages: number) =>
  pages >= PAGES_MAX ? `${PAGES_MAX}+ stránek` : `${pages} ${pages === 1 ? "stránka" : "stránek"}`;
export const priceBeforeDiscount = (price: number, discount: number) =>
  price > 0 && discount > 0 ? Math.round(price / (1 - discount / 100) / 1000) * 1000 : 0;
export type BreakdownRow = { label: string; value: string };
export type CalculatorInput = {
  type: ProjectType;
  pages: number;
  extras: CalculatorExtra[];
  rush: boolean;
};
export const calculatePrice = ({ type, pages, extras, rush }: CalculatorInput) => {
  const scope = pagesFee(pages);
  const subtotal = type.base + scope + extras.reduce((sum, extra) => sum + extra.price, 0);
  const oneTime = rush ? Math.round((subtotal * RUSH_MULTIPLIER) / 500) * 500 : subtotal;
  const high = oneTime === 0 ? 0 : Math.round((oneTime * 1.18) / 1000) * 1000;
  const before = priceBeforeDiscount(oneTime, type.discount);
  const rows: BreakdownRow[] = [
    { label: type.label, value: type.base ? `${formatCzk(type.base)} Kč` : "od 0 Kč*" },
  ];
  if (scope) rows.push({ label: `Rozsah — ${pagesLabel(pages)} (${pages})`, value: `+${formatCzk(scope)} Kč` });
  extras.forEach((extra) => rows.push({ label: extra.label, value: `+${formatCzk(extra.price)} Kč` }));
  if (rush) rows.push({ label: "Spěchá to (+20 %)", value: `+${formatCzk(oneTime - subtotal)} Kč` });
  rows.push({
    label: "Celkem jednorázově",
    value: oneTime === 0 ? "od 0 Kč*" : `${formatCzk(oneTime)} Kč`,
  });
  rows.push({
    label: "Správa, hosting, e-mailová doména, opravy",
    value: `${formatCzk(YEARLY_PRICE)} Kč/rok`,
  });
  return {
    rangeLabel:
      oneTime === 0
        ? "od 0 Kč*"
        : oneTime === high
          ? `${formatCzk(oneTime)} Kč`
          : `${formatCzk(oneTime)} – ${formatCzk(high)} Kč`,
    showCompare: before > 0,
    beforeLabel: `${formatCzk(before)} Kč`,
    savedLabel: `${formatCzk(before - oneTime)} Kč`,
    discount: type.discount,
    accent: type.accent,
    rows,
  };
};
export type CalculatorResult = ReturnType<typeof calculatePrice>;