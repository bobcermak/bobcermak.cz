import type { FC, ReactNode } from "react";

type CalculatorStepProps = {
  num: string;
  title: string;
  last?: boolean;
  children: ReactNode;
};
const CalculatorStep: FC<CalculatorStepProps> = ({ num, title, last = false, children }) => (
  <div data-reveal className="flex items-stretch gap-3.5 xphone:gap-[18px]">
    <div className="flex w-7 flex-none flex-col items-center xphone:w-[30px]">
      <span className="grid size-7 flex-none place-items-center rounded-full bg-ink text-[12px] font-semibold text-white xphone:size-[30px] xphone:text-[13px]">
        {num}
      </span>
      {!last && <span aria-hidden="true" className="mt-1.5 w-0.5 flex-1 rounded-full bg-border"/>}
    </div>
    <div className={`min-w-0 flex-1 ${last ? "" : "pb-8"}`}>
      <h3 className="mb-4 text-[1.15rem] font-semibold tracking-[-0.01em] text-ink">{title}</h3>
      {children}
    </div>
  </div>
);
export default CalculatorStep;