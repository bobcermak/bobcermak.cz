export type CalculatorType = "static" | "admin" | "system" | "app";
export const CALCULATOR_SECTION_ID = "calculator";
export const CALCULATOR_SELECT_EVENT = "calculator:select";
export type CalculatorSelectDetail = { type: CalculatorType };
export const openCalculator = (type: CalculatorType) => {
  if (typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent<CalculatorSelectDetail>(CALCULATOR_SELECT_EVENT, { detail: { type } }),
  );
  document.getElementById(CALCULATOR_SECTION_ID)?.scrollIntoView({ behavior: "smooth" });
};