import type { FC, ReactNode } from "react";

type CalculatorFieldProps = {
  num: string;
  label: string;
  last?: boolean;
  children: ReactNode;
};
const CalculatorField: FC<CalculatorFieldProps> = ({ num, label, last = false, children }) => (
  <div data-calc-step className={last ? "" : "mb-6 border-b border-border pb-6"}>
    <p className="mb-3 flex items-baseline gap-2.5 text-eyebrow font-semibold uppercase tracking-[0.14em] text-text-3">
      <span className="tabular-nums text-accent-blue-strong">{num}</span>
      {label}
    </p>
    {children}
  </div>
);
export default CalculatorField;